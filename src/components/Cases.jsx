import { useState, useRef } from 'react';

const casesData = [
  {
    id: 'case-1',
    caseNo: 'CASE #01',
    category: 'Fertility-Sparing Surgery',
    title: '49 Fibroids Removed — Complete Uterine Reconstruction',
    shortDesc:
      'A 36-year-old patient diagnosed with multiple fibroids, enlarging her uterus to the size of a 7-month pregnancy. With a courageous decision to preserve her uterus, 49 fibroids were meticulously removed and her uterus was fully reconstructed.',
    patientAge: '36 Years Old',
    clinicalPresentation:
      'Patient presented with chronic pelvic heaviness and severe uterine distension comparable to a 7-month pregnancy. Multiple imaging modalities confirmed numerous extensive myomas throughout the uterine myometrium.',
    clinicalChallenge:
      'Due to the immense volume and quantity of fibroids, typical surgical consultations had recommended total hysterectomy (removal of the uterus). The patient’s paramount objective was uterine preservation for reproductive and psychological well-being.',
    surgicalIntervention:
      'Precision Reconstructive Myomectomy. Under expert micro-dissection and advanced haemostatic control, Dr. Shabnam and her surgical team systematically excised 49 individual fibroids of varying dimensions while carefully reconstructing the multi-layered uterine walls.',
    clinicalOutcome:
      'Full preservation of the uterine organ with normal anatomical contour restored. Post-operative recovery was smooth and uneventful, maintaining hope for future fertility.',
    instagramUrl:
      'https://www.instagram.com/p/DS5KUyeE6Ym/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA%3D%3D&img_index=9',
    stats: [
      { label: 'Fibroids Extracted', value: '49' },
      { label: 'Uterus Status', value: '100% Preserved' },
      { label: 'Pre-Op Size', value: '7-Month Equiv.' },
    ],
    imageSlots: [
      { id: 1, title: 'Pre-Op Clinical Scan', caption: 'Ultrasound mapping of multiple uterine myomas' },
      { id: 2, title: 'Surgical Field', caption: 'Intra-operative precision myomectomy and reconstruction' },
      { id: 3, title: 'Excised Fibroids', caption: 'All 49 fibroids categorized and measured' },
      { id: 4, title: 'Post-Op Recovery', caption: 'Preserved uterine contour and healing follow-up' },
    ],
  },
  {
    id: 'case-2',
    caseNo: 'CASE #02',
    category: 'Advanced Minimally Invasive Laparoscopy',
    title: '4kg Uterine Mass & Fibroids Removed via Keyhole Surgery',
    shortDesc:
      'A rare and complex clinical milestone: removal of a massive 4-kilogram uterine fibroid pathology performed entirely through advanced laparoscopic (keyhole) surgery, avoiding open abdominal incisions.',
    patientAge: 'Adult Female',
    clinicalPresentation:
      'Patient presented with significant abdominal distension, palpable pelvic-abdominal mass, and compression symptoms secondary to massive uterine enlargement.',
    clinicalChallenge:
      'Giant pelvic masses exceeding 3 to 4 kilograms are routinely managed via open laparotomy with extensive abdominal incisions, substantial surgical trauma, and high potential blood loss. The challenge was executing complete removal purely laparoscopically.',
    surgicalIntervention:
      'Advanced Laparoscopic Surgery (Keyhole Surgery). Employing high-resolution optical magnification, specialized endoscopic morcellation techniques, and meticulous vascular control, 4 large fibroids and the 4kg pathology were successfully extracted through tiny incisions.',
    clinicalOutcome:
      'Outstanding cosmetic and clinical outcome. Patient experienced minimal blood loss, dramatically reduced post-operative pain, and early discharge within days, showcasing the power of minimally invasive excellence.',
    instagramUrl:
      'https://www.instagram.com/p/DQ6r8lGE8oI/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA%3D%3D',
    stats: [
      { label: 'Pathology Mass', value: '4.0 kg' },
      { label: 'Incision Type', value: 'Keyhole (Min. Invasive)' },
      { label: 'Major Fibroids', value: '4 Large' },
    ],
    imageSlots: [
      { id: 1, title: 'Diagnostic Imaging', caption: 'Pre-operative visualization of 4kg pelvic pathology' },
      { id: 2, title: 'Laparoscopic View', caption: 'High-definition keyhole surgical dissection' },
      { id: 3, title: 'Pathology Specimen', caption: 'Excised 4kg uterine mass and fibroids' },
      { id: 4, title: 'Micro-Incision Healing', caption: 'Rapid patient ambulation and recovery' },
    ],
  },
];

function Cases() {
  // expandedCaseId: null means folders in grid/swipe.
  // 'case-1' or 'case-2' means that folder expands full page.
  const [expandedCaseId, setExpandedCaseId] = useState(null);
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);

  const foldersContainerRef = useRef(null);
  const touchStartXRef = useRef(null);

  const activeCase = casesData.find((c) => c.id === expandedCaseId);
  const otherCase = casesData.find((c) => c.id !== expandedCaseId);

  const handleMobileScroll = () => {
    if (!foldersContainerRef.current) return;
    const container = foldersContainerRef.current;
    const scrollLeft = container.scrollLeft;
    const firstCard = container.querySelector('.case-grid-folder');
    const cardWidth = firstCard ? firstCard.offsetWidth : container.clientWidth * 0.85;
    const gap = 16;
    const index = Math.round(scrollLeft / (cardWidth + gap));
    const clampedIndex = Math.min(Math.max(index, 0), casesData.length - 1);
    if (clampedIndex !== activeMobileIndex) {
      setActiveMobileIndex(clampedIndex);
    }
  };

  const scrollToCase = (index) => {
    if (!foldersContainerRef.current) return;
    const container = foldersContainerRef.current;
    const cards = container.querySelectorAll('.case-grid-folder');
    if (cards[index]) {
      const card = cards[index];
      const targetLeft = card.offsetLeft - (container.clientWidth - card.offsetWidth) / 2;
      container.scrollTo({
        left: Math.max(0, targetLeft),
        behavior: 'smooth',
      });
      setActiveMobileIndex(index);
    }
  };

  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchStartXRef.current - touchEndX;
    // Swipe left -> next card
    if (diffX > 45 && activeMobileIndex < casesData.length - 1) {
      scrollToCase(activeMobileIndex + 1);
    } else if (diffX < -45 && activeMobileIndex > 0) {
      // Swipe right -> prev card
      scrollToCase(activeMobileIndex - 1);
    }
    touchStartXRef.current = null;
  };

  const handleOpenCase = (id) => {
    setExpandedCaseId(id);
    // Smooth scroll to the pink accent line below the section title & description,
    // ensuring the pink line and "CASE #01 / Fertility-Sparing Surgery" tab are right in view
    setTimeout(() => {
      const lineEl = document.getElementById('cases-accent-line') || document.getElementById('cases-dossier');
      if (lineEl) {
        const navOffset = window.innerWidth >= 768 ? 92 : 75;
        const targetPos = lineEl.getBoundingClientRect().top + window.pageYOffset - navOffset;
        window.scrollTo({
          top: Math.max(0, targetPos),
          behavior: 'smooth',
        });
      }
    }, 60);
  };

  const handleClose = () => {
    setExpandedCaseId(null);
    setTimeout(() => {
      const lineEl = document.getElementById('cases-accent-line') || document.getElementById('cases-folders-grid');
      if (lineEl) {
        const navOffset = window.innerWidth >= 768 ? 92 : 75;
        const targetPos = lineEl.getBoundingClientRect().top + window.pageYOffset - navOffset;
        window.scrollTo({
          top: Math.max(0, targetPos),
          behavior: 'smooth',
        });
      }
    }, 40);
  };

  return (
    <section className="cases-section section" id="cases" aria-labelledby="cases-title">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <h2 className="section-title" id="cases-title">Stories of Hope</h2>
          <p className="section-subtitle">
            Real patient journeys, complex surgical breakthroughs, and life-changing fertility victories led by Dr. Shabnam. Click each folder below to expand full clinical records.
          </p>
          <div className="accent-line" id="cases-accent-line"></div>
        </div>

        {/* View 1: Two Separate Folders in a 1 - 2 Grid (Desktop) or Horizontal Swipe (Mobile) */}
        {!expandedCaseId && (
          <div className="cases-grid-wrapper">
            {/* Mobile Floating Swipe Indicator Bar */}
            <div className="case-mobile-swipe-bar" aria-label="Mobile case swipe navigator">
              {/* <button
                type="button"
                className="case-swipe-hint-pill"
                onClick={() => scrollToCase(activeMobileIndex === 0 ? 1 : 0)}
                aria-label={activeMobileIndex === 0 ? "Swipe to view Case #02" : "Swipe back to Case #01"}
              >
                <span className="case-swipe-hand-icon" aria-hidden="true">
                  <i className={`fa-solid ${activeMobileIndex === 0 ? 'fa-hand-point-right' : 'fa-hand-point-left'}`}></i>
                </span>
                <span className="case-swipe-hint-text">
                  {activeMobileIndex === 0 ? 'Swipe for Case #02' : 'Swipe back for Case #01'}
                </span>
                <span className="case-swipe-arrow" aria-hidden="true">
                  <i className={`fa-solid ${activeMobileIndex === 0 ? 'fa-chevron-right' : 'fa-chevron-left'}`}></i>
                </span>
              </button> */}

              <div className="case-mobile-dots" role="tablist" aria-label="Cases pagination">
                {casesData.map((item, idx) => (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={activeMobileIndex === idx}
                    className={`case-dot ${activeMobileIndex === idx ? 'case-dot-active' : ''}`}
                    onClick={() => scrollToCase(idx)}
                    aria-label={`View ${item.caseNo}`}
                  />
                ))}
              </div>
            </div>

            <div
              className="cases-folders-grid"
              id="cases-folders-grid"
              ref={foldersContainerRef}
              onScroll={handleMobileScroll}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              role="region"
              aria-label="Clinical Case Folders"
            >
              {casesData.map((item) => (
                <article
                  key={item.id}
                  className="case-grid-folder"
                  onClick={() => handleOpenCase(item.id)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Open ${item.caseNo}: ${item.title}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleOpenCase(item.id);
                    }
                  }}
                >
                  {/* Physical Folder Top Tab Bar */}
                  <div className="case-grid-tab-bar">
                    <div className="case-grid-tab">
                      <span className="case-tab-badge">
                        <i className="fa-solid fa-folder" aria-hidden="true"></i>
                        {item.caseNo}
                      </span>
                      <span className="case-tab-category">{item.category}</span>
                    </div>
                  </div>

                {/* Folder Body Card */}
                <div className="case-grid-body">
                  <div className="case-grid-content">
                    <h3 className="case-title">{item.title}</h3>
                    <p className="case-summary">{item.shortDesc}</p>

                    {/* Metric Pills */}
                    <div className="case-metrics-bar">
                      {item.stats.map((st, i) => (
                        <div key={i} className="case-metric-item">
                          <span className="case-metric-val">{st.value}</span>
                          <span className="case-metric-lbl">{st.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Open Prompt Button */}
                  <div className="case-grid-footer">
                    <span className="case-grid-open-btn">
                      <span>Open Case File</span>
                      <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                    </span>
                  </div>
                </div>
              </article>
            ))}
            </div>
          </div>
        )}

        {/* View 2: Full Page Expanded Case Details Overlapping Grid */}
        {expandedCaseId && activeCase && (
          <div
            key={activeCase.id}
            className="case-expanded-container"
            id="cases-dossier"
            role="region"
            aria-label="Expanded Case Dossier"
          >
            {/* Top Bar: Clicking tab or cross closes the folder */}
            <header
              className="case-expanded-top-bar"
              onClick={handleClose}
              role="button"
              tabIndex={0}
              title="Click tab or cross to close file"
              aria-label="Click to close folder"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleClose();
                }
              }}
            >
              {/* Folder Tab on Top with Inline Close Cross */}
              <div className="case-expanded-tab">
                <span className="case-tab-badge">
                  <i className="fa-solid fa-folder-open" aria-hidden="true"></i>
                  {activeCase.caseNo}
                </span>
                <span className="case-tab-category">{activeCase.category}</span>
                <button
                  type="button"
                  className="case-tab-close-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClose();
                  }}
                  aria-label="Close case file"
                  title="Close file"
                >
                  <i className="fa-solid fa-xmark" aria-hidden="true"></i>
                </button>
              </div>
            </header>

            {/* Full-Width Dossier Card */}
            <article className="case-expanded-card">
              {/* Cover Preview Area */}
              <div className="case-expanded-header">
                <div className="case-expanded-header-text">
                  <h3 className="case-title" id="active-case-title">{activeCase.title}</h3>
                  <p className="case-summary">{activeCase.shortDesc}</p>
                </div>

                {/* Metric Pills */}
                <div className="case-metrics-bar">
                  {activeCase.stats.map((st, i) => (
                    <div key={i} className="case-metric-item">
                      <span className="case-metric-val">{st.value}</span>
                      <span className="case-metric-lbl">{st.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Detailed Clinical Docket Sheets */}
              <div className="case-body-inner">
                <div className="case-docket-grid">
                  <div className="case-docket-cell">
                    <div className="case-docket-header">
                      <i className="fa-solid fa-hospital-user" aria-hidden="true"></i>
                      <h4>Patient Profile</h4>
                    </div>
                    <p className="case-docket-highlight">{activeCase.patientAge}</p>
                    <p>{activeCase.clinicalPresentation}</p>
                  </div>

                  <div className="case-docket-cell">
                    <div className="case-docket-header">
                      <i className="fa-solid fa-triangle-exclamation" aria-hidden="true"></i>
                      <h4>Clinical Challenge</h4>
                    </div>
                    <p>{activeCase.clinicalChallenge}</p>
                  </div>

                  <div className="case-docket-cell">
                    <div className="case-docket-header">
                      <i className="fa-solid fa-notes-medical" aria-hidden="true"></i>
                      <h4>Surgical Intervention</h4>
                    </div>
                    <p>{activeCase.surgicalIntervention}</p>
                  </div>

                  <div className="case-docket-cell">
                    <div className="case-docket-header">
                      <i className="fa-solid fa-heart-pulse" aria-hidden="true"></i>
                      <h4>Clinical Outcome</h4>
                    </div>
                    <p>{activeCase.clinicalOutcome}</p>
                  </div>
                </div>

                {/* 4 Image Slots Grid */}
                <div className="case-media-section">
                  <div className="case-media-header">
                    <div className="case-media-title-group">
                      <i className="fa-solid fa-camera" aria-hidden="true"></i>
                      <h4>Clinical Gallery &amp; Scan Records</h4>
                    </div>
                    <span className="case-media-count">4 Image Spaces Reserved</span>
                  </div>

                  <div className="case-image-slots-grid">
                    {activeCase.imageSlots.map((slot) => (
                      <div key={slot.id} className="case-image-slot" tabIndex={0}>
                        <div className="case-image-slot-badge">Space #{slot.id}</div>
                        <div className="case-image-slot-placeholder">
                          <div className="case-slot-icon-ring">
                            <i className="fa-regular fa-image" aria-hidden="true"></i>
                          </div>
                          <span className="case-slot-action">
                            <i className="fa-solid fa-plus" aria-hidden="true"></i> Image Slot
                          </span>
                        </div>
                        <div className="case-image-slot-meta">
                          <span className="case-slot-title">{slot.title}</span>
                          <span className="case-slot-caption">{slot.caption}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer with Instagram Link & Close / Switcher */}
                <div className="case-folder-footer">
                  <a
                    href={activeCase.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline case-ig-btn"
                    aria-label={`View ${activeCase.title} post on Instagram`}
                  >
                    <i className="fa-brands fa-instagram" aria-hidden="true"></i>
                    View Post on Instagram
                  </a>

                  <div className="case-footer-actions">
                    {otherCase && (
                      <button
                        type="button"
                        className="btn btn-outline case-switch-btn"
                        onClick={() => handleOpenCase(otherCase.id)}
                      >
                        <span>Switch to {otherCase.caseNo}</span>
                        <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                      </button>
                    )}

                    <button
                      type="button"
                      className="btn btn-primary case-close-action-btn"
                      onClick={handleClose}
                    >
                      <i className="fa-solid fa-chevron-up" aria-hidden="true"></i>
                      <span>Close File</span>
                    </button>
                  </div>
                </div>
              </div>
            </article>
          </div>
        )}
      </div>
    </section>
  );
}

export default Cases;
