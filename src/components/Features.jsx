function Features() {
  const features = [
    { icon: 'fa-solid fa-microscope', title: 'Science-Backed', desc: 'Evidence-based treatments with clinical research at the core.' },
    { icon: 'fa-solid fa-heart', title: 'Tailored for You', desc: 'Personalised protocols designed around your unique needs.' },
    { icon: 'fa-solid fa-shield-halved', title: 'Clean & Safe', desc: 'Sterile environments and internationally approved procedures.' },
    { icon: 'fa-solid fa-certificate', title: 'Clinically Validated', desc: 'Proven outcomes across thousands of successful cases.' },
  ];

  return (
    <section className="features section">
      <div className="container">
        <div className="features-grid">
          {features.map(feature => (
            <div key={feature.title} className="feature-item">
              <div className="feature-icon"><i className={feature.icon}></i></div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
