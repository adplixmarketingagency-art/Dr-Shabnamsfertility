import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';

const MOMENT_IMAGES = [
  { id: 1, src: '/images/1.jpg', alt: 'Dr. Shabnam celebrating with newborn twin babies' },
  { id: 2, src: '/images/2.jpg', alt: 'Dr. Shabnam smiling with twin toddlers' },
  { id: 3, src: '/images/3.jpg', alt: 'Happy parents holding newborn baby with Dr. Shabnam' },
  { id: 4, src: '/images/4.jpg', alt: 'Joyful family with baby at Dr. Shabnam clinic' },
  { id: 5, src: '/images/5.jpg', alt: 'Newborn baby in clinic care' },
  { id: 7, src: '/images/7.jpg', alt: 'Blessed family moment with baby' },
  { id: 8, src: '/images/8.jpg', alt: 'Parent holding newborn infant with joy' },
  { id: 9, src: '/images/9.jpg', alt: 'Smiling mother and baby with clinic team' },
  { id: 10, src: '/images/10.jpg', alt: 'Newborn twins wrapped in gentle blankets' },
  { id: 11, src: '/images/11.jpg', alt: 'Happy mother with newborn baby in clinic' },
  { id: 12, src: '/images/12.jpg', alt: 'Dr. Shabnam holding precious newborn twins' },
];

/**
 * Moments — "Happy Moments"
 * A continuous, smooth infinite marquee showing real patient and family moments
 * in their full natural aspect ratio (9:16 portrait), with touch-safe scrolling
 * and interactive lightbox view centered in the viewport via React Portal.
 */
function Moments() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState(null);

  const openLightbox = (index) => {
    setSelectedIndex(index);
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
  };

  const showPrev = useCallback(() => {
    setSelectedIndex((prev) => (prev === 0 ? MOMENT_IMAGES.length - 1 : prev - 1));
  }, []);

  const showNext = useCallback(() => {
    setSelectedIndex((prev) => (prev === MOMENT_IMAGES.length - 1 ? 0 : prev + 1));
  }, []);

  // Keyboard navigation & body scroll locking when modal is open
  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [selectedIndex, showPrev, showNext]);

  // Touch swipe support inside lightbox modal
  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (diff > 45) {
      showNext();
    } else if (diff < -45) {
      showPrev();
    }
    setTouchStartX(null);
  };

  // Render 3 tracks so marquee seamlessly loops across any screen size without gaps
  const tracks = [0, 1, 2];

  return (
    <section className="moments section" id="moments">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Happy Moments</h2>
          <p className="section-subtitle">
            Real smiles, real families, real joy, captured at every step of the journey.
          </p>
          <div className="accent-line"></div>
        </div>
      </div>

      <div className="moments-marquee-wrapper">
        <div
          className={`moments-marquee ${isPaused ? 'is-paused' : ''}`}
          aria-label="Happy moments photo marquee"
        >
          {tracks.map((trackIdx) => (
            <div
              key={`track-${trackIdx}`}
              className="moments-track"
              aria-hidden={trackIdx > 0 ? 'true' : undefined}
            >
              {MOMENT_IMAGES.map((img, i) => (
                <div
                  className="moment-card"
                  key={`track-${trackIdx}-img-${img.id}`}
                  onClick={() => openLightbox(i)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      openLightbox(i);
                    }
                  }}
                  tabIndex={trackIdx === 0 ? 0 : -1}
                  role="button"
                  aria-label={`View photo: ${img.alt}`}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading={trackIdx === 0 && i < 4 ? 'eager' : 'lazy'}
                  />
                  <div className="moment-card-overlay">
                    {/* <span className="moment-card-badge">
                      <i className="fa-solid fa-heart"></i>
                      <span>Precious Moment</span>
                    </span> */}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="container">
          <div className="moments-controls">
            <button
              type="button"
              className="moments-toggle-btn"
              onClick={() => setIsPaused((prev) => !prev)}
              aria-label={isPaused ? 'Resume auto-scroll' : 'Pause auto-scroll'}
            >
              <i className={isPaused ? 'fa-solid fa-play' : 'fa-solid fa-pause'}></i>
              <span>{isPaused ? 'Resume Scroll' : 'Pause Scroll'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox Modal rendered via Portal directly to document.body */}
      {selectedIndex !== null &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            className="moments-modal-backdrop"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label="Expanded photo view"
          >
            <button
              type="button"
              className="moments-modal-close"
              onClick={closeLightbox}
              aria-label="Close photo view"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>

            <button
              type="button"
              className="moments-modal-nav prev"
              onClick={(e) => {
                e.stopPropagation();
                showPrev();
              }}
              aria-label="Previous photo"
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>

            <div
              className="moments-modal-content"
              onClick={(e) => e.stopPropagation()}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <div className="moments-modal-image-wrapper">
                <img
                  src={MOMENT_IMAGES[selectedIndex].src}
                  alt={MOMENT_IMAGES[selectedIndex].alt}
                />
              </div>
            </div>

            <button
              type="button"
              className="moments-modal-nav next"
              onClick={(e) => {
                e.stopPropagation();
                showNext();
              }}
              aria-label="Next photo"
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>,
          document.body
        )}
    </section>
  );
}

export default Moments;
