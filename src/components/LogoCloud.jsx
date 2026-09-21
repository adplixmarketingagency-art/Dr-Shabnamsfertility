function LogoCloud() {
  const logos = ['GIZMODO', 'Scientific American', 'sheknows', 'Healio', 'Communications Weekly'];

  return (
    <section className="logo-cloud" aria-label="Media mentions">
      <div className="container">
        <div className="logo-cloud-inner">
          {logos.map(logo => (
            <span key={logo} className="logo-cloud-item">{logo}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default LogoCloud;
