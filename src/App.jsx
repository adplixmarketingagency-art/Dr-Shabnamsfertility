import Nav from './components/Nav';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Features from './components/Features';
import Services from './components/Services';
import SplitSection from './components/SplitSection';
import Gallery from './components/Gallery';
import About from './components/About';
import Testimonials from './components/Testimonials';
import LogoCloud from './components/LogoCloud';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollTop from './components/ScrollTop';

function App() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Stats />
        <Features />
        <Services />
        <About />
        <SplitSection
          image="/images/gallery-01.jpg?v=20260919205610"
          imageAlt="Doctor consultation at Dr. Shabnam's clinic"
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
        <Gallery />
        <Testimonials />
        <LogoCloud />
        <Contact />
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
