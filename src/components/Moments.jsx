import { useInView } from '../hooks/useInView';

/**
 * Moments — "Happy Moments".
 * A grid of 12 photos (2.jpg through 13.jpg) shown as 4 per row,
 * celebrating the joyful outcomes of our clinic's journey.
 */
function Moments() {
  const [ref, inView] = useInView({ threshold: 0.1 });
  const images = Array.from({ length: 11 }, (_, i) => {
    const num = i + 2;
    return {
      src: `/images/${num}.jpg`,
      alt: `Happy moment ${num}`,
    };
  });

  return (
    <section className="moments section" id="moments">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Happy Moments</h2>
          <p className="section-subtitle">
            Real smiles, real families, real joy — captured at every step of the journey.
          </p>
          <div className="accent-line"></div>
        </div>

        <div className={`moments-grid ${inView ? 'moments-zoom' : ''}`} ref={ref}>
          {images.map((img, i) => (
            <div
              className="moment-card"
              key={img.src}
              style={{ transitionDelay: `${(i % 4) * 70}ms` }}
            >
              <img src={img.src} alt={img.alt} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Moments;
