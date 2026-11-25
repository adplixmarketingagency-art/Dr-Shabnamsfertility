import { patientResources } from '../config/news.js';

export const clinic = {
  name: "Dr. Shabnam's Fertility & Gynec Centre",
  origin: 'https://drshabnamsfertility.com',
  telephone: '+917695852669',
  language: 'en-IN',
  logo: '/images/sfgc-logo.png',
  image: '/images/mobile-portrait.png',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'No.162/1, 3rd Floor, Pointcare Street, Nellithope',
    addressLocality: 'Puducherry',
    addressRegion: 'Puducherry',
    postalCode: '605005',
    addressCountry: 'IN',
  },
};

export const clinicSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalClinic',
  '@id': `${clinic.origin}/#clinic`,
  name: clinic.name,
  url: `${clinic.origin}/`,
  telephone: clinic.telephone,
  address: clinic.address,
  logo: `${clinic.origin}${clinic.logo}`,
  image: `${clinic.origin}${clinic.image}`,
};

// Describe the same clinic and page for every crawler. Unverified credentials,
// treatment outcomes, reviews and on-site IVF facilities are deliberately omitted.
export function getPageSchema(page) {
  const canonical = new URL(page.path, clinic.origin).href;
  const clinicId = clinicSchema['@id'];
  const websiteId = `${clinic.origin}/#website`;
  const pageId = `${canonical}#webpage`;
  const { '@context': _context, ...business } = clinicSchema;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        ...business,
        mainEntityOfPage: { '@id': pageId },
      },
      {
        '@type': 'WebSite',
        '@id': websiteId,
        url: `${clinic.origin}/`,
        name: clinic.name,
        inLanguage: clinic.language,
        publisher: { '@id': clinicId },
      },
      {
        '@type': 'WebPage',
        '@id': pageId,
        url: canonical,
        name: page.title,
        description: page.description,
        inLanguage: clinic.language,
        isPartOf: { '@id': websiteId },
        about: { '@id': clinicId },
        mainEntity: { '@id': clinicId },
        relatedLink: patientResources.map(resource => resource.url),
      },
    ],
  };
}
