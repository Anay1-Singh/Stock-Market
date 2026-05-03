import React, { useState, useEffect } from 'react';
import StockCard from '../components/StockCard';
import { fetchMarketSummary, fetchTrendingStocks, fetchTopGainers, fetchTopLosers } from '../services/api';
import './Markets.css';

const Markets = () => {
  const [marketSummary, setMarketSummary] = useState([]);
  const [trending, setTrending] = useState([]);
  const [gainers, setGainers] = useState([]);
  const [losers, setLosers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const [summary, trend, gain, loss] = await Promise.all([
        fetchMarketSummary(),
        fetchTrendingStocks(),
        fetchTopGainers(),
        fetchTopLosers()
      ]);
      setMarketSummary(summary);
      setTrending(trend);
      setGainers(gain);
      setLosers(loss);
      setLoading(false);
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
        <p>Loading market data...</p>
      </div>
    );
  }

  return (
    <div className="markets-page animate-fade-in">
      <header className="page-header">
        <h1>Market Overview</h1>
        <p>Your daily summary of the financial markets</p>
      </header>

      <section className="market-summary-grid">
        {marketSummary.map(index => (
          <StockCard key={index.symbol} stock={index} isSmall={true} />
        ))}
      </section>

      <div className="markets-grid">
        <section className="markets-column">
          <div className="section-header">
            <h2>Trending Stocks</h2>
          </div>
          <div className="card-list">
            {trending.map(stock => (
              <StockCard key={stock.symbol} stock={stock} />
            ))}
          </div>
        </section>

        <section className="markets-column">
          <div className="section-header">
            <h2>Top Gainers</h2>
          </div>
          <div className="card-list">
            {gainers.map(stock => (
              <StockCard key={stock.symbol} stock={stock} isSmall={true} />
            ))}
          </div>
          
          <div className="section-header" style={{ marginTop: '2rem' }}>
            <h2>Top Losers</h2>
          </div>
          <div className="card-list">
            {losers.map(stock => (
              <StockCard key={stock.symbol} stock={stock} isSmall={true} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Markets;
