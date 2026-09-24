import Nav from './components/Nav';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Services from './components/Services';
import SplitSection from './components/SplitSection';
import Gallery from './components/Gallery';
import Cases from './components/Cases';
import Moments from './components/Moments';
import About from './components/About';
import News from './components/News';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollTop from './components/ScrollTop';
import ScrollReveal from './components/ScrollReveal';

function App() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <ScrollReveal><Stats /></ScrollReveal>
        <Services />
        <ScrollReveal><About /></ScrollReveal>
        <ScrollReveal>
          <SplitSection
            image="/images/Splitsection.jpeg"
            imageAlt="Dr. Shabnam and surgical team in operating theatre"
            title="Precision Care for Every Patient"
            variant="cream"
            cta="Book a Consultation"
            ctaHref="#contact"
            ctaIcon="fa-regular fa-calendar-check"
          >
            <p>
              Every pregnancy, every fertility journey, and every gynaecological concern deserves individual attention. Our team combines advanced medical expertise with genuine compassion.
            </p>
            <p>
              From routine checkups to complex IVF procedures, we are committed to helping you achieve the best possible outcomes.
            </p>
          </SplitSection>
        </ScrollReveal>
        <ScrollReveal><Gallery /></ScrollReveal>
        <ScrollReveal><Cases /></ScrollReveal>
        <ScrollReveal><Moments /></ScrollReveal>
        <ScrollReveal><Testimonials /></ScrollReveal>
        <ScrollReveal><News /></ScrollReveal>
        <ScrollReveal><Contact /></ScrollReveal>
      </main>
      <Footer />
      <a
        href="https://api.whatsapp.com/send?phone=+917695852669&text=Hi,%20I%20contacted%20you%20through%20your%20website%20for%20an%20appointment."
        className="whatsapp-float"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <i className="fa-brands fa-whatsapp"></i>
      </a>
      <ScrollTop />
    </>
  );
}

export default App;
