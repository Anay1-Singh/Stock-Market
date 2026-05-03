import React, { useState, useEffect } from 'react';
import { ExternalLink } from 'lucide-react';
import { fetchNews } from '../services/api';
import './News.css';

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNews = async () => {
      setLoading(true);
      const data = await fetchNews();
      setNews(data);
      setLoading(false);
    };

    loadNews();
  }, []);

  return (
    <div className="news-page animate-fade-in">
      <header className="page-header">
        <h1>Market News</h1>
        <p>Latest updates and financial news</p>
      </header>

      {loading ? (
        <div className="loading-container">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="news-list">
          {news.map(item => (
            <a key={item.id} href={item.link} target="_blank" rel="noopener noreferrer" className="news-card card">
              <div className="news-content">
                <div className="news-meta">
                  <span className="news-source">{item.source}</span>
                  <span className="news-date">{item.date}</span>
                </div>
                <h3 className="news-title">{item.title}</h3>
              </div>
              <ExternalLink size={20} className="news-icon text-secondary" />
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default News;
