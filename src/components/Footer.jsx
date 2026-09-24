function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="#home" className="footer-logo-link" aria-label="Dr. Shabnam's Fertility & Gynec Centre">
              <img
                src="/images/SFGC_LOGO_FOOTER.png"
                alt="Dr. Shabnam's Fertility & Gynec Centre"
                className="footer-logo-img"
              />
            </a>
            <p>Compassionate gynaecology and fertility care for the people of Pondicherry and beyond. Your journey to parenthood begins here.</p>
          </div>
          <div>
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#gallery">Gallery</a></li>
              <li><a href="#about">Doctor</a></li>
              <li><a href="#testimonials">Reviews</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4>Services</h4>
            <ul className="footer-links">
              <li><a href="#services">IVF &amp; ICSI</a></li>
              <li><a href="#services">IUI Treatment</a></li>
              <li><a href="#services">Laparoscopy</a></li>
              <li><a href="#services">Hysteroscopy</a></li>
              <li><a href="#services">Antenatal Care</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>Copyright &copy; 2026 Dr. Shabnam Khan. All Rights Reserved.</p>
          <div className="footer-social">
            <a href="https://www.instagram.com/dr.shabnam_fertility?stkn=MWdrenF4cHRneXFpcA==" aria-label="Instagram" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-instagram"></i></a>
            <a href="#" aria-label="Facebook"><i className="fa-brands fa-facebook-f"></i></a>
            <a href="https://api.whatsapp.com/send?phone=+917695852669" aria-label="WhatsApp">
              <i className="fa-brands fa-whatsapp"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
