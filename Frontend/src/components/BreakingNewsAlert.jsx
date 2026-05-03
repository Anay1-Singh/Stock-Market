import React, { useContext, useEffect, useState } from 'react';
import { AlertOctagon, X, ExternalLink } from 'lucide-react';
import { StockContext } from '../context/StockContext';
import './BreakingNewsAlert.css';

const BreakingNewsAlert = () => {
  const { breakingNews, dismissBreakingNews } = useContext(StockContext);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (breakingNews) {
      setIsVisible(true);
      // Auto-hide after 15 seconds
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(dismissBreakingNews, 300); // Wait for exit animation
      }, 15000);
      
      return () => clearTimeout(timer);
    }
  }, [breakingNews, dismissBreakingNews]);

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(dismissBreakingNews, 300);
  };

  if (!breakingNews) return null;

  return (
    <div className={`breaking-news-overlay ${isVisible ? 'show' : 'hide'}`}>
      <div className="breaking-news-banner card">
        <div className="signal-ring"></div>
        <div className="signal-dot"></div>
        
        <div className="breaking-news-content">
          <div className="breaking-header">
            <AlertOctagon size={20} className="text-red" />
            <span className="breaking-tag">BREAKING NEWS</span>
            <span className="breaking-source">• {breakingNews.source}</span>
          </div>
          <h3 className="breaking-title">{breakingNews.title}</h3>
          <a href={breakingNews.link} target="_blank" rel="noopener noreferrer" className="read-more-btn">
            Read Full Story <ExternalLink size={14} />
          </a>
        </div>

        <button className="dismiss-btn" onClick={handleDismiss}>
          <X size={24} />
        </button>
      </div>
    </div>
  );
};

export default BreakingNewsAlert;
