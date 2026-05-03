import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BookmarkPlus, BookmarkMinus, TrendingUp, TrendingDown, ArrowLeft } from 'lucide-react';
import Chart from '../components/Chart';
import AIAssistant from '../components/AIAssistant';
import { StockContext } from '../context/StockContext';
import { fetchStockDetails, fetchChartData } from '../services/api';
import './StockDetails.css';

const StockDetails = () => {
  const { symbol } = useParams();
  const navigate = useNavigate();
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useContext(StockContext);
  
  const [stock, setStock] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [period, setPeriod] = useState('1M');
  const [loading, setLoading] = useState(true);

  const periods = ['1D', '1W', '1M', '1Y'];

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const [stockData, data] = await Promise.all([
        fetchStockDetails(symbol),
        fetchChartData(symbol, period)
      ]);
      setStock(stockData);
      setChartData(data);
      setLoading(false);
    };
    
    loadData();
  }, [symbol, period]);

  if (loading && !stock) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
      </div>
    );
  }

  const isPositive = stock?.change >= 0;
  const inWatchlist = isInWatchlist(stock?.symbol);

  return (
    <div className="stock-details animate-fade-in">
      <button className="back-btn" onClick={() => navigate(-1)}>
        <ArrowLeft size={16} />
        Back
      </button>

      <header className="stock-header card">
        <div className="stock-title-section">
          <div>
            <h1 className="stock-symbol-lg">{stock.symbol}</h1>
            <p className="stock-name-lg">{stock.name}</p>
          </div>
          
          <button 
            className={`watchlist-btn ${inWatchlist ? 'active' : ''}`}
            onClick={() => inWatchlist ? removeFromWatchlist(stock.symbol) : addToWatchlist(stock)}
          >
            {inWatchlist ? <BookmarkMinus size={20} /> : <BookmarkPlus size={20} />}
            {inWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
          </button>
        </div>

        <div className="stock-price-section">
          <h2 className="stock-price-xl">${stock.price?.toFixed(2) ?? '0.00'}</h2>
          <div className={`stock-change-lg ${isPositive ? 'text-green' : 'text-red'}`}>
            {isPositive ? <TrendingUp size={24} /> : <TrendingDown size={24} />}
            <span>{isPositive ? '+' : ''}{stock.change?.toFixed(2) ?? '0.00'} ({stock.changePercent?.toFixed(2) ?? '0.00'}%)</span>
          </div>
        </div>
      </header>

      <div className="stock-details-grid">
        <div className="stock-details-main">
          <section className="chart-section card">
            <div className="chart-header">
              <h3>Price Chart</h3>
              <div className="period-filters">
                {periods.map(p => (
                  <button 
                    key={p} 
                    className={`period-btn ${period === p ? 'active' : ''}`}
                    onClick={() => setPeriod(p)}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="chart-wrapper">
              {loading ? (
                <div className="loading-container"><div className="loader"></div></div>
              ) : (
                <Chart data={chartData} isPositive={isPositive} />
              )}
            </div>
          </section>

          <section className="stats-section card">
            <h3>Key Statistics</h3>
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-label">Previous Close</span>
                <span className="stat-value">${(stock.price - stock.change).toFixed(2)}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Open</span>
                <span className="stat-value">${(stock.price - stock.change + (Math.random() * 2 - 1)).toFixed(2)}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Day's Range</span>
                <span className="stat-value">
                  ${(stock.price * 0.98).toFixed(2)} - ${(stock.price * 1.02).toFixed(2)}
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Volume</span>
                <span className="stat-value">{(Math.random() * 10 + 1).toFixed(2)}M</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Market Cap</span>
                <span className="stat-value">{(Math.random() * 500 + 50).toFixed(2)}B</span>
              </div>
            </div>
          </section>
        </div>

        <div className="stock-details-sidebar">
          <AIAssistant stock={stock} />
        </div>
      </div>
    </div>
  );
};

export default StockDetails;
