import { useState, useRef } from 'react';

const casesData = [
  {
    id: 'case-1',
    caseNo: 'CASE #01',
    category: 'Fertility-Preserving Laparoscopy',
    title: '9cm Ovarian Dermoid & Para-Ovarian Cysts Excision',
    shortDesc:
      'A 24-year-old patient presented with persistent lower abdominal and back pain. Diagnosed with a 9cm right ovarian dermoid cyst and para-ovarian cyst, both were excised via fertility-preserving laparoscopic cystectomy with 100% healthy ovarian tissue protected.',
    patientAge: '24 Years Old',
    clinicalPresentation:
      'A 24-year-old female presented with persistent, debilitating lower abdominal pain and chronic back pain. Comprehensive diagnostic ultrasonography and clinical workup revealed a prominent 9 cm right ovarian dermoid cyst accompanied by an adjacent right para-ovarian cyst.',
    clinicalChallenge:
      'Given the patient’s young age and reproductive aspirations, the paramount surgical priority was complete excision of the extensive 9 cm dermoid cyst without spillage or chemical peritonitis, while meticulously sparing healthy ovarian cortex and follicular reserve.',
    surgicalIntervention:
      'Fertility-Preserving Laparoscopic Cystectomy. Utilizing high-definition laparoscopic visualization and precision microsurgical dissection, Dr. Shabnam cleanly enucleated both the 9cm dermoid cyst and the para-ovarian cyst, carefully preserving all surrounding healthy ovarian parenchyma.',
    clinicalOutcome:
      'Successful intact cystectomy with full preservation of normal ovarian anatomy and future fertility. The patient experienced a smooth, rapid recovery and was discharged in excellent, stable condition.',
    instagramUrl:
      'https://www.instagram.com/p/Dbm5Cydk_AA/?img_index=3&stkn=eTRpa2hrNmpqcGhs',
    stats: [
      { label: 'Dermoid Cyst Size', value: '9.0 cm' },
      { label: 'Ovarian Reserve', value: '100% Protected' },
      { label: 'Surgical Approach', value: 'Keyhole Lap.' },
    ],
    imageSlots: [
      {
        id: 1,
        title: '9cm Dermoid Cyst Inspection',
        caption: 'High-definition laparoscopic monitor view of the 9cm right ovarian dermoid cyst with probe elevation',
        imageUrl: '/images/cases/case1-1-dermoid-cyst.jpg',
      },
      {
        id: 2,
        title: 'Bilateral Adnexal Anatomy',
        caption: 'Panoramic endoscopic view displaying uterus, contralateral ovary, and dual cyst presentation',
        imageUrl: '/images/cases/case1-2-pelvic-anatomy.jpg',
      },
      {
        id: 3,
        title: 'Preserved Healthy Ovarian Bed',
        caption: 'Post-enucleation pelvic bed showing complete cyst removal with 100% healthy ovarian tissue spared',
        imageUrl: '/images/cases/case1-3-ovarian-bed.jpg',
      },
      {
        id: 4,
        title: 'Excised Specimen Confirmation',
        caption: 'Surgical kidney dish holding the intact 9cm excised dermoid cyst alongside the para-ovarian cyst',
        imageUrl: '/images/cases/case1-4-excised-specimen.jpg',
      },
    ],
  },
  {
    id: 'case-2',
    caseNo: 'CASE #02',
    category: 'Advanced Laparoscopic Myomectomy',
    title: '10-Hour Laparoscopy: Giant 1.66kg FIGO 6–7 Fibroid & Uterine Preservation',
    shortDesc:
      'A monumental 10-hour laparoscopic milestone: complete keyhole removal of a giant 1.66 kg FIGO Type 6–7 fibroid. Despite the immense complexity, the patient’s uterus was 100% preserved, leading to early discharge on Day 3.',
    patientAge: 'Adult Female',
    clinicalPresentation:
      'Patient presented with chronic pelvic fullness, significant abdominal distension, and severe compression symptoms secondary to an enormous exophytic uterine neoplasm. Imaging delineated a massive FIGO Type 6–7 fibroid.',
    clinicalChallenge:
      'Giant pelvic tumors exceeding 1.5 kg conventionally prompt open laparotomy and high rates of hysterectomy. Preserving the uterus purely laparoscopically demanded 10 hours of surgical precision, continuous vascular control, and reconstructive endurance.',
    surgicalIntervention:
      '10-Hour Complex Laparoscopic Myomectomy. Through minimally invasive keyhole ports, Dr. Shabnam devascularized and dissected the giant FIGO Type 6–7 fibroid, executed multi-layered uterine wall reconstruction (myorrhaphy), and safely morcellated the 1.660 kg pathology.',
    clinicalOutcome:
      'Complete excision with 100% uterine preservation. The patient had minimal blood loss, minimal scarring, experienced an exceptionally fast post-operative recovery, and was safely discharged home on Day 3.',
    instagramUrl:
      'https://www.instagram.com/p/Dao-Ppuk4pT/?img_index=6&stkn=MTRoNmw0NW1mY2QycA%3D%3D',
    stats: [
      { label: 'Excised Specimen', value: '1.660 kg' },
      { label: 'Procedure Duration', value: '10 Hours' },
      { label: 'Hospital Stay', value: 'Discharged Day 3' },
    ],
    imageSlots: [
      {
        id: 1,
        title: 'Giant FIGO 6–7 Fibroid',
        caption: 'High-definition endoscopic view of the massive vascular uterine tumor in pelvis',
        imageUrl: '/images/cases/case2-1-giant-fibroid.jpg',
      },
      {
        id: 2,
        title: 'Intra-Op Dissection & Morcellation',
        caption: 'Precision endoscopic dissection and controlled morcellation without open incision',
        imageUrl: '/images/cases/case2-2-lap-dissection.jpg',
      },
      {
        id: 3,
        title: 'Multi-Layer Uterine Reconstruction',
        caption: 'Meticulous laparoscopic suturing (myorrhaphy) restoring full uterine integrity',
        imageUrl: '/images/cases/case2-3-uterine-reconstruction.jpg',
      },
      {
        id: 4,
        title: 'Pathology Weight Confirmation',
        caption: 'Hospital electronic scale verifying excised fibroid tissue weighing 1.660 kg',
        imageUrl: '/images/cases/case2-4-specimen-scale.jpg',
      },
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
                    {/* <span className="case-media-count">
                      {activeCase.imageSlots.some((s) => s.imageUrl)
                        
                        }
                    </span> */}
                  </div>

                  <div className="case-image-slots-grid">
                    {activeCase.imageSlots.map((slot) => (
                      <div
                        key={slot.id}
                        className={`case-image-slot ${slot.imageUrl ? 'has-image' : ''}`}
                        tabIndex={0}
                      >
                        
                        {slot.imageUrl ? (
                          <div className="case-slot-img-wrapper">
                            <img
                              src={slot.imageUrl}
                              alt={slot.title}
                              className="case-slot-actual-img"
                              loading="lazy"
                            />
                          </div>
                        ) : (
                          <div className="case-image-slot-placeholder">
                            <div className="case-slot-icon-ring">
                              <i className="fa-regular fa-image" aria-hidden="true"></i>
                            </div>
                            <span className="case-slot-action">
                              <i className="fa-solid fa-plus" aria-hidden="true"></i> Image Slot
                            </span>
                          </div>
                        )}
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
