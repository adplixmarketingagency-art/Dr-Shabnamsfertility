function About() {
  const qualifications = [
    'Graduated and post-graduated (M.S) in OBG from Maharashtra with exclusive training in reproductive medicine',
    'Advanced laparoscopy training under renowned experts Dr. PG. Paul and Dr. Dipak Limbachiya',
    'Expert in IVF / ICSI, associated with various IVF centres across Pondicherry and Chennai',
    'Specialises in adolescent PCOD care and high-risk obstetric cases',
    'Skilled in total laparoscopic hysterectomy, hysteroscopic surgeries, and gynaec laparoscopy',
    'Manages pregnancy with medical disorders — diabetes, hypertension, cardiac issues, thyroid, and obesity',
  ];

  return (
    <section className="about section" id="about">
      <div className="container">
        <div className="split-section">
          <div className="split-section-visual">
            <img src="/images/Dr_Shabnam.png" alt="Dr. Shabnam Khan consulting with a patient at her fertility clinic" loading="lazy" />
            <div className="about-experience">
              <div className="about-number">15+</div>
              <div className="about-label">Years of<br />Experience</div>
            </div>
          </div>
          <div className="split-section-content">
            <h2 className="section-title">About Dr. Shabnam Khan</h2>
            <p>
              Consultant Gynaec Laparoscopic Surgeon & Fertility Specialist — Fellowship in Advanced Laparoscopy & Reproductive Medicine.
            </p>
            <ul className="about-list">
              {qualifications.map((q) => (
                <li key={q}>
                  <span className="about-check">✓</span>
                  {q}
                </li>
              ))}
            </ul>
            <a href="#contact" className="btn btn-primary">
              <i className="fa-regular fa-calendar-check"></i> Book a Consultation
            </a>
            <div className="about-social">
              <div className="about-social-row">
                <p>Meet Dr. Shabnam:</p>
                <a href="https://www.instagram.com/dr.shabnam_fertility?stkn=MWdrenF4cHRneXFpcA==" target="_blank" rel="noopener noreferrer" aria-label="Dr Shabnam Instagram">
                  <i className="fa-brands fa-instagram"></i>
                </a>
              </div>
              <div className="about-social-row">
                <p>Visit our clinic:</p>
                <a href="https://www.instagram.com/dr.shabnams_fertility_center?stkn=MTc3M3NxbDl1bDVw" target="_blank" rel="noopener noreferrer" aria-label="Clinic Instagram">
                  <i className="fa-brands fa-instagram"></i>
                </a>
              </div>
              <div className="about-social-row">
                <p>Watch on YouTube:</p>
                <a href="https://youtube.com/@dr.shabnam_fertility?si=l3-ms20OfDayoEwh" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                  <i className="fa-brands fa-youtube"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
