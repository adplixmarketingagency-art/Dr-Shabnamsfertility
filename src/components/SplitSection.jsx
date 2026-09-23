function SplitSection({
  image,
  imageAlt,
  title,
  children,
  variant = 'cream',
  cta,
  ctaHref,
  ctaIcon,
}) {
  return (
    <section
      className={`split-section-wrap section ${variant === 'crimson' ? 'split-crimson' : variant === 'white' ? 'split-white' : 'split-cream'}`}
      id="precision-care"
    >
      <div className="container">
        <div className="split-section">
          <div className="split-section-visual reveal-image">
            <img src={image} alt={imageAlt} loading="lazy" />
          </div>
          <div className="split-section-content">
            <h2 className="section-title">{title}</h2>
            <div className="accent-line"></div>
            <div className="split-section-body">
              {children}
            </div>
            {cta && (
              <a href={ctaHref} className="btn btn-primary">
                {ctaIcon && <i className={ctaIcon}></i>}
                {cta}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default SplitSection;
