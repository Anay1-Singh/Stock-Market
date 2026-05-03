import React from 'react';
import { TrendingUp, TrendingDown, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './StockCard.css';

const StockCard = ({ stock, isSmall = false }) => {
  const navigate = useNavigate();
  const isPositive = stock.change >= 0;

  const handleClick = () => {
    navigate(`/stock/${stock.symbol}`);
  };

  if (isSmall) {
    return (
      <div className="card stock-card-small animate-fade-in" onClick={handleClick}>
        <div className="stock-info">
          <h4 className="stock-symbol">{stock.symbol}</h4>
          <span className="stock-price">${stock.price.toFixed(2)}</span>
        </div>
        <div className={`stock-change ${isPositive ? 'text-green' : 'text-red'}`}>
          {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
          <span>{isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%</span>
        </div>
      </div>
    );
  }

  return (
    <div className="card stock-card animate-fade-in" onClick={handleClick}>
      <div className="flex-between" style={{ marginBottom: '1rem' }}>
        <div>
          <h3 className="stock-symbol">{stock.symbol}</h3>
          <p className="stock-name">{stock.name}</p>
        </div>
        <div className="stock-action">
          <ChevronRight size={20} className="text-secondary" />
        </div>
      </div>
      
      <div className="flex-between align-end">
        <h2 className="stock-price-lg">${stock.price.toFixed(2)}</h2>
        <div className={`stock-change badge-style ${isPositive ? 'bg-green-light text-green' : 'bg-red-light text-red'}`}>
          {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
          <span>{isPositive ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)</span>
        </div>
      </div>
    </div>
  );
};

export default StockCard;
