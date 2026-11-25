import { patientResources } from '../config/news';

function News() {
  return (
    <section className="news section" id="news">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Patient Resources</h2>
          <p className="section-subtitle">
            External information from the NHS and HFEA to help you prepare questions for your consultation.
          </p>
          <div className="accent-line"></div>
        </div>
        <div className="news-grid">
          {patientResources.map(resource => (
            <a
              key={resource.url}
              className="news-card"
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="news-source">{resource.source}</span>
              <h3 className="news-title">{resource.title}</h3>
              <p className="news-desc">{resource.description}</p>
              <span className="news-date">External information · opens in a new tab</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default News;
