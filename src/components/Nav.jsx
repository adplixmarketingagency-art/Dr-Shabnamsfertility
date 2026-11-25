import { useState, useEffect } from 'react';
import { smoothScrollTo } from '../utils/smoothScroll';

function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#services', label: 'Services' },
    { href: '#about', label: 'Doctor' },
    { href: '#gallery', label: 'Gallery' },
    { href: '#testimonials', label: 'Reviews' },
    { href: '#news', label: 'News' },
    { href: '#contact', label: 'Contact' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    smoothScrollTo(href);
    setIsOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`} role="navigation" aria-label="Main navigation">
      <div className="nav-inner">
        <a href="#home" className="nav-logo" onClick={(e) => handleNavClick(e, '#home')}>
          <img src="/images/sfgc-logo.png" alt="Dr. Shabnam's Fertility & Gynec Centre" />
        </a>
        <button
          className={`nav-toggle ${isOpen ? 'active' : ''}`}
          onClick={() => {
            setIsOpen(!isOpen);
            document.body.style.overflow = isOpen ? '' : 'hidden';
          }}
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
          aria-controls="navMenu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div className={`nav-menu ${isOpen ? 'active' : ''}`} id="navMenu" role="menubar">
          {navLinks.map(link => (
            <a key={link.href} href={link.href} role="menuitem" onClick={(e) => handleNavClick(e, link.href)}>
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Nav;
