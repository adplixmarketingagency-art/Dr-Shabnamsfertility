function SplitSection({ image, imageAlt, title, children, variant = 'cream', cta, ctaHref, ctaIcon }) {
  return (
    <section className={`split-section ${variant === 'crimson' ? 'split-crimson' : 'split-cream'}`}>
      <div className="split-section-visual">
        <img src={image} alt={imageAlt} loading="lazy" />
      </div>
      <div className="split-section-content">
        <h2 className="section-title">{title}</h2>
        {children}
        {cta && (
          <a href={ctaHref} className="btn btn-primary">
            {ctaIcon && <i className={ctaIcon}></i>}
            {cta}
          </a>
        )}
      </div>
    </section>
  );
}

export default SplitSection;
