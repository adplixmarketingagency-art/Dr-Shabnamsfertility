function Services() {
  const services = [
    { icon: 'fa-solid fa-baby', title: 'IVF & ICSI', desc: 'In vitro fertilization and intracytoplasmic sperm injection with advanced lab techniques and personalised protocols.' },
    { icon: 'fa-solid fa-syringe', title: 'IUI Treatment', desc: 'Intrauterine insemination with monitored cycles, ideal for couples seeking less invasive fertility solutions.' },
    { icon: 'fa-solid fa-microscope', title: 'Laparoscopy', desc: 'Key-hole surgery for endometriosis, fibroids, and ovarian cysts — smaller incisions, faster recovery.' },
    { icon: 'fa-solid fa-magnifying-glass', title: 'Hysteroscopy', desc: 'Minimally invasive examination of the uterine cavity for polyps, fibroids, and structural abnormalities.' },
    { icon: 'fa-solid fa-heart', title: 'Antenatal Care', desc: 'Tailormade protocols for IVF-conceived and natural pregnancies, ensuring the best maternal and neonatal outcomes.' },
    { icon: 'fa-solid fa-procedures', title: 'Hysterectomy', desc: 'Laparoscopic and vaginal hysterectomy for fibroids, bleeding disorders, and precancerous conditions — day-care options available.' },
    { icon: 'fa-solid fa-user-doctor', title: 'Male Fertility Clinic', desc: 'Comprehensive evaluation and treatment of male factor infertility, including semen analysis and reproductive counselling.' },
    { icon: 'fa-solid fa-dna', title: 'Assisted Conception', desc: 'Natural conception support, fertility-enhancing surgeries, and advanced reproductive technologies.' },
    { icon: 'fa-solid fa-spa', title: 'Cosmetic Gynaecology', desc: 'Hymenoplasty, vaginoplasty, labiaplasty, and monsplasty — performed with discretion and clinical excellence.' },
  ];

  return (
    <section className="services section" id="services">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Our Specialities</h2>
          <p className="section-subtitle">Comprehensive women&apos;s health and fertility treatments delivered with expertise and compassion.</p>
          <div className="accent-line"></div>
        </div>
        <div className="services-grid">
          {services.map(service => (
            <article key={service.title} className="service-card">
              <div className="service-icon"><i className={service.icon}></i></div>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
