import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wallet, TrendingUp, ArrowRight, Activity, Newspaper } from 'lucide-react';
import { StockContext } from '../context/StockContext';
import StockCard from '../components/StockCard';
import { fetchNews } from '../services/api';
import './Dashboard.css';

const Dashboard = () => {
  const { watchlist } = useContext(StockContext);
  const navigate = useNavigate();
  const [recentNews, setRecentNews] = useState([]);

  useEffect(() => {
    const loadNews = async () => {
      const news = await fetchNews();
      setRecentNews(news.slice(0, 3)); // Only show top 3 news on dashboard
    };
    loadNews();
  }, []);

  return (
    <div className="dashboard-page animate-fade-in">
      <header className="page-header">
        <h1>Welcome Back</h1>
        <p>Here is your portfolio overview</p>
      </header>

      {/* Portfolio Overview Section */}
      <section className="portfolio-overview card">
        <div className="portfolio-balance">
          <div className="balance-icon-wrapper">
            <Wallet size={24} className="text-accent" />
          </div>
          <div>
            <p className="balance-label">Total Balance</p>
            <h2 className="balance-amount">$124,500.00</h2>
          </div>
        </div>
        
        <div className="portfolio-stats">
          <div className="stat-box">
            <p className="stat-label">Today's Profit</p>
            <div className="stat-value text-green">
              <TrendingUp size={16} />
              <span>+$1,250.50 (1.02%)</span>
            </div>
          </div>
          <div className="stat-box">
            <p className="stat-label">Buying Power</p>
            <div className="stat-value">
              <span>$45,200.00</span>
            </div>
          </div>
        </div>
      </section>

      <div className="dashboard-layout-grid">
        {/* Watchlist Preview */}
        <section className="dashboard-section">
          <div className="section-header flex-between">
            <div className="flex-center gap-2">
              <Activity size={20} className="text-accent" />
              <h2>Your Watchlist</h2>
            </div>
            <button className="view-all-btn" onClick={() => navigate('/watchlist')}>
              View All <ArrowRight size={16} />
            </button>
          </div>
          
          {watchlist.length === 0 ? (
            <div className="empty-widget card">
              <p>Your watchlist is empty.</p>
              <button className="btn-primary" onClick={() => navigate('/markets')}>
                Explore Markets
              </button>
            </div>
          ) : (
            <div className="widget-card-list">
              {watchlist.slice(0, 4).map(stock => (
                <StockCard key={stock.symbol} stock={stock} isSmall={true} />
              ))}
            </div>
          )}
        </section>

        {/* Recent News Preview */}
        <section className="dashboard-section">
          <div className="section-header flex-between">
            <div className="flex-center gap-2">
              <Newspaper size={20} className="text-accent" />
              <h2>Latest News</h2>
            </div>
            <button className="view-all-btn" onClick={() => navigate('/news')}>
              View All <ArrowRight size={16} />
            </button>
          </div>
          
          <div className="widget-card-list">
            {recentNews.map((item, idx) => (
              <a key={idx} href={item.link} target="_blank" rel="noopener noreferrer" className="news-widget-item card">
                <p className="news-widget-source">{item.source}</p>
                <h4 className="news-widget-title">{item.title}</h4>
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
