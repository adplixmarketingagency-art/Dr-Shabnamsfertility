/**
 * News API configuration.
 * Uses NewsAPI.org (free tier: 100 requests/day).
 * Get your API key at https://newsapi.org/register
 */
const NEWS_API_KEY = import.meta.env.ITE_NEWS_API_KEY || '';

/**
 * Fetch fertility/health news from NewsAPI.
 * Only fertility, women's health, and reproductive medicine articles are returned.
 */
export async function fetchNews(pageSize = 10) {
  if (!NEWS_API_KEY) {
    return getFallbackNews();
  }

  const url = new URL('https://newsapi.org/v2/everything');
  url.searchParams.set('q', 'fertility IVF gynecology reproductive women health pregnancy');
  url.searchParams.set('language', 'en');
  url.searchParams.set('sortBy', 'publishedAt');
  url.searchParams.set('pageSize', String(pageSize));

  const res = await fetch(url.toString(), {
    headers: { 'X-Api-Key': NEWS_API_KEY },
  });

  if (!res.ok) {
    throw new Error(`News API error: ${res.status}`);
  }

  const data = await res.json();
  return (data.articles || [])
    .filter((a) => {
      const text = `${a.title || ''} ${a.description || ''}`.toLowerCase();
      const fertilityKeywords = [
        'fertility', 'ivf', 'gynecology', 'gynaecology', 'reproductive',
        'pregnancy', 'women', 'health', 'medical', 'clinic', 'baby',
        'conception', 'infertility', 'obgyn', 'ovarian', 'uterus',
      ];
      return fertilityKeywords.some((kw) => text.includes(kw));
    })
    .map((a) => ({
      title: a.title || 'Untitled',
      description: a.description || '',
      source: a.source?.name || 'Unknown',
      url: a.url || '#',
      image: a.urlToImage || '',
      publishedAt: a.publishedAt || '',
    }));
}

/**
 * Fallback articles shown when no API key is configured.
 * Replace with real content once the API key is set.
 */
function getFallbackNews() {
  return [
    {
      title: 'New Fertility Treatment Shows 70% Success Rate in Clinical Trial',
      description: 'Researchers announce promising results for a novel IVF protocol.',
      source: 'Scientific American',
      url: '#',
      image: '',
      publishedAt: new Date().toISOString(),
    },
    {
      title: 'How Technology Is Reshaping Women\'s Healthcare',
      description: 'From AI diagnostics to telemedicine, tech is transforming care delivery.',
      source: 'GIZMODO',
      url: '#',
      image: '',
      publishedAt: new Date().toISOString(),
    },
    {
      title: 'Mental Health Support for Expecting Mothers Gains Momentum',
      description: 'New programs integrate mental wellness into prenatal care.',
      source: 'SheKnows',
      url: '#',
      image: '',
      publishedAt: new Date().toISOString(),
    },
    {
      title: 'Minimally Invasive Procedures See Surge in Demand',
      description: 'Patients increasingly opt for laparoscopic and hysteroscopic options.',
      source: 'Healio',
      url: '#',
      image: '',
      publishedAt: new Date().toISOString(),
    },
    {
      title: 'Communications Health Weekly: Fertility Coverage Expands',
      description: 'Major insurers broaden fertility treatment coverage nationwide.',
      source: 'Communications Weekly',
      url: '#',
      image: '',
      publishedAt: new Date().toISOString(),
    },
  ];
}
