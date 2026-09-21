import { useEffect, useState } from 'react';
import { fetchNews } from '../config/news';

/**
 * News — "Today's News".
 * Fetches the latest headlines from NewsAPI and displays them
 * as cards with source names (GIZMODO, Scientific American, etc.).
 * Shows fallback content when no API key is configured.
 */
function News() {
  const [articles, setArticles] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchNews();
        if (!cancelled) {
          setArticles(data);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
          setLoading(false);
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="news section" id="news">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Today's News</h2>
          <p className="section-subtitle">
            The latest in fertility, health, and women's care — from leading publications.
          </p>
          <div className="accent-line"></div>
        </div>

        {loading && (
          <div className="news-grid news-loading">
            {Array.from({ length: 6 }).map((_, i) => (
              <div className="news-card" key={i} aria-hidden="true">
                <div className="news-skeleton" />
                <div className="news-skeleton news-skeleton-title" />
                <div className="news-skeleton news-skeleton-text" />
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="news-error">
            <p>Unable to load news right now.</p>
            <p className="news-error-detail">{error}</p>
            <p className="news-error-hint">
              Check your API key in <code>.env</code> — get a free key at{' '}
              <a href="https://newsapi.org/register" target="_blank" rel="noopener noreferrer">
                newsapi.org
              </a>
            </p>
          </div>
        )}

        {!loading && !error && articles && (
          <div className="news-grid">
            {articles.map((article, index) => (
              <a
                key={index}
                className="news-card"
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="news-source">{article.source}</span>
                {article.image && (
                  <div className="news-image">
                    <img src={article.image} alt="" loading="lazy" />
                  </div>
                )}
                <h3 className="news-title">{article.title}</h3>
                {article.description && (
                  <p className="news-desc">{article.description}</p>
                )}
                <span className="news-date">
                  {new Date(article.publishedAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default News;
