import { useRef, useEffect, useState, useCallback } from 'react';

function Services() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [progressPercent, setProgressPercent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const services = [
    {
      idx: '01',
      category: 'Fertility · ART',
      icon: 'fa-solid fa-baby',
      title: 'IVF & ICSI',
      desc: 'In vitro fertilization and intracytoplasmic sperm injection with advanced lab techniques and personalised protocols.',
      highlight: 'Advanced Lab Protocols',
    },
    {
      idx: '02',
      category: 'Assisted Conception',
      icon: 'fa-solid fa-syringe',
      title: 'IUI Treatment',
      desc: 'Intrauterine insemination with monitored cycles, ideal for couples seeking less invasive fertility solutions.',
      highlight: 'Monitored Cycles',
    },
    {
      idx: '03',
      category: 'Key-Hole Surgery',
      icon: 'fa-solid fa-microscope',
      title: 'Laparoscopy',
      desc: 'Key-hole surgery for endometriosis, fibroids, and ovarian cysts with smaller incisions and faster recovery.',
      highlight: 'Rapid Healing',
    },
    {
      idx: '04',
      category: 'Diagnostic Endoscopy',
      icon: 'fa-solid fa-magnifying-glass',
      title: 'Hysteroscopy',
      desc: 'Minimally invasive examination of the uterine cavity for polyps, fibroids, and structural abnormalities.',
      highlight: 'High Precision Imaging',
    },
    {
      idx: '05',
      category: 'Maternal Health',
      icon: 'fa-solid fa-heart',
      title: 'Antenatal Care',
      desc: 'Tailormade protocols for IVF-conceived and natural pregnancies, ensuring the best maternal and neonatal outcomes.',
      highlight: 'Tailored Protocols',
    },
    {
      idx: '06',
      category: 'Gynaecological Care',
      icon: 'fa-solid fa-procedures',
      title: 'Hysterectomy',
      desc: 'Laparoscopic and vaginal hysterectomy for fibroids, bleeding disorders, and precancerous conditions with day-care options available.',
      highlight: 'Day-Care Available',
    },
    {
      idx: '07',
      category: 'Reproductive Health',
      icon: 'fa-solid fa-user-doctor',
      title: 'Male Fertility Clinic',
      desc: 'Comprehensive evaluation and treatment of male factor infertility, including semen analysis and reproductive counselling.',
      highlight: 'Comprehensive Analysis',
    },
    {
      idx: '08',
      category: 'Fertility Support',
      icon: 'fa-solid fa-dna',
      title: 'Assisted Conception',
      desc: 'Natural conception support, fertility-enhancing surgeries, and advanced reproductive technologies.',
      highlight: 'Holistic Management',
    },
    {
      idx: '09',
      category: 'Cosmetic Surgery',
      icon: 'fa-solid fa-spa',
      title: 'Cosmetic Gynaecology',
      desc: 'Hymenoplasty, vaginoplasty, labiaplasty, and monsplasty performed with discretion and clinical excellence.',
      highlight: 'Absolute Discretion',
    },
  ];

  const totalCards = services.length;

  // Track window resizing and viewport width for mobile stacked mode vs desktop horizontal mode
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (mobile && trackRef.current) {
        trackRef.current.style.transform = 'none';
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Desktop Scroll-Driven Horizontal Translation
  const updateDesktopScroll = useCallback(() => {
    if (window.innerWidth <= 768) return;

    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const rect = container.getBoundingClientRect();
    const containerHeight = rect.height;
    const windowHeight = window.innerHeight;
    const totalScrollable = containerHeight - windowHeight;

    if (totalScrollable <= 0) return;

    // Smooth buffer at start and end to avoid sudden jerks on first and last card
    const buffer = 30;
    const effectiveDistance = Math.max(1, totalScrollable - buffer * 2);
    const rawProgress = (-rect.top - buffer) / effectiveDistance;
    const progress = Math.max(0, Math.min(1, rawProgress));

    const trackWidth = track.scrollWidth;
    const viewportWidth = window.innerWidth;
    const maxTranslate = Math.max(0, trackWidth - viewportWidth + 60);
    const currentTranslate = progress * maxTranslate;

    track.style.transform = `translateX(-${currentTranslate}px)`;

    const currentPercent = Math.round(progress * 100);
    setProgressPercent(currentPercent);

    const calculatedIdx = Math.min(totalCards - 1, Math.floor(progress * totalCards));
    setActiveIdx(calculatedIdx);
  }, [totalCards]);

  useEffect(() => {
    if (isMobile) return;

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateDesktopScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateDesktopScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile, updateDesktopScroll]);

  return (
    <section ref={containerRef} className="services-scroll-wrapper" id="services">
      <div className="services-sticky-viewport">
        {/* Top Header */}
        <div className="services-top-bar">
          <div className="section-header">
            <span className="services-eyebrow">
              <span className="services-eyebrow-dash"></span>
              Our Specialities
            </span>
            <h2 className="section-title">Comprehensive Clinical Care</h2>
            <p className="section-subtitle">
              Comprehensive women&apos;s health and fertility treatments delivered with expertise and compassion.
            </p>
            <div className="accent-line"></div>
          </div>

          {/* Subtle mobile stacking indicator
          <div className="services-mobile-stack-badge">
            <i className="fa-solid fa-layer-group"></i>
            <span>9 Specialities · Scroll down to reveal</span>
          </div> */}
        </div>

        {/* Track Container (Stacked one by one on mobile, horizontal scroll on desktop) */}
        <div className="services-track-container">
          <div ref={trackRef} className="services-horizontal-track">
            {services.map((service, index) => (
              <article
                key={service.title}
                className={`service-card-huge ${index === activeIdx ? 'is-active' : ''}`}
                style={{ '--card-index': index }}
              >
                <div>
                  <div className="service-card-huge-top">
                    {/* <span className="service-card-idx">{service.idx}</span> */}
                    <span className="service-card-category">{service.category}</span>
                  </div>

                  <div className="service-icon">
                    <i className={service.icon}></i>
                  </div>

                  <h3>{service.title}</h3>
                  <p>{service.desc}</p>
                </div>

                {/* <div className="service-card-huge-footer">
                  <span className="service-card-tag">{service.highlight}</span> 
                  <a href="#contact" className="service-card-link">
                    Enquire <span>→</span>
                  </a>
                </div> */}
              </article>
            ))}
          </div>
        </div>

        {/* Bottom Progress Bar (Desktop only) */}
        <div className="services-bottom-bar">
          <div className="services-progress-track">
            <span className="services-progress-label">01</span>
            <div className="services-progress-line">
              <div
                className="services-progress-fill"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            <span className="services-progress-label">09</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Services;
