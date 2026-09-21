/**
 * Gallery — "Our Journey".
 * Milestone image cards placed at scattered positions across the
 * Gallery_bg.png background image. Cards scale up on hover.
 */
function Gallery() {
  const milestones = [
    { year: 2011, image: '/images/gallery-09.jpg', alt: 'Clinic milestone 2011' },
    { year: 2013, image: '/images/gallery-02.jpg', alt: 'Clinic milestone 2013' },
    { year: 2015, image: '/images/gallery-03.jpg', alt: 'Clinic milestone 2015' },
    { year: 2017, image: '/images/gallery-04.jpg', alt: 'Clinic milestone 2017' },
    { year: 2019, image: '/images/gallery-05.jpg', alt: 'Clinic milestone 2019' },
    { year: 2021, image: '/images/gallery-06.jpg', alt: 'Clinic milestone 2021' },
    { year: 2023, image: '/images/gallery-07.jpg', alt: 'Clinic milestone 2023' },
    { year: 2025, image: '/images/gallery-08.jpg', alt: 'Clinic milestone 2025' },
    { year: 2026, image: '/images/gallery-01.jpg', alt: 'Clinic milestone 2026' },
  ];

  /** Scattered positions (top/left %) across the background image. */
  const positions = [
    { top: '6%', left: '3%' }, //2011
    { top: '5%', left: '30%' }, //2013
    { top: '-1%', left: '62%' }, //2015
    //{ top: '16%', left: '71%' },
    { top: '19%', left: '81%' }, //2017
    { top: '36%', left: '51%' }, //2019
    { top: '43%', left: '-0.01%' }, //2021
    { top: '70%', left: '18%' }, //2023
    { top: '66%', left: '43%' }, //2025
    { top: '70%', left: '77%' }, //2026
  ];

  return (
    <section className="gallery section" id="gallery">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Our Journey</h2>
          <p className="section-subtitle">
            A thread from 2011 to 2026 — the milestones that shaped our clinic.
          </p>
          <div className="accent-line"></div>
        </div>

        <div className="gallery-stage">
          <img
            className="gallery-bg"
            src="/images/Gallery_bg.png"
            alt=""
            loading="lazy"
          />

          {milestones.map((m, index) => (
            <div
              key={m.year}
              className="gallery-card"
              style={{ top: positions[index].top, left: positions[index].left }}
            >
              <span className="gallery-card-year">{m.year}</span>
              <div className="gallery-card-image">
                <img src={m.image} alt={m.alt} loading="lazy" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Gallery;
