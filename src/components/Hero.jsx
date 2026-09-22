function Hero() {
  return (
    <header className="hero" id="home">
      <div className="container">
        <div className="hero-inner">
          <div className="hero-content">
            <h1 className="hero-title">
              Compassionate Care at Every Step of Your Journey
            </h1>
            <p className="hero-description">
              Dr. Shabnam's — Consultant Gynaec Laparoscopic Surgeon & Fertility Specialist — bringing expertise, warmth, and hope to families in Pondicherry for over 15 years.
            </p>
            <p className="hero-points">Hope · Faith · Miracle</p><br></br>
            <div className="hero-actions">
              <a href="#services" className="btn btn-primary">
                <i className="fa-solid fa-stethoscope"></i> Explore Services
              </a>
              <a href="#contact" className="btn btn-outline">
                <i className="fa-regular fa-calendar-check"></i> Book Appointment
              </a>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-image-wrapper">
              <img src="/images/mobile-portrait.png" alt="Dr. Shabnam" loading="eager" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Hero;
