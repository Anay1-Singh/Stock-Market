import React, { useContext } from 'react';
import { StockContext } from '../context/StockContext';
import StockCard from '../components/StockCard';
import { Bookmark } from 'lucide-react';
import './Watchlist.css';

const Watchlist = () => {
  const { watchlist } = useContext(StockContext);

  return (
    <div className="watchlist-page animate-fade-in">
      <header className="page-header">
        <h1>Your Watchlist</h1>
        <p>Keep track of your favorite stocks</p>
      </header>

      {watchlist.length === 0 ? (
        <div className="empty-state card">
          <Bookmark size={48} className="text-secondary mb-4" />
          <h3>Your watchlist is empty</h3>
          <p>Search for stocks and add them to your watchlist to monitor them here.</p>
        </div>
      ) : (
        <div className="watchlist-grid">
          {watchlist.map(stock => (
            <StockCard key={stock.symbol} stock={stock} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Watchlist;
