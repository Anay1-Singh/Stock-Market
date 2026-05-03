import React, { useContext, useState, useEffect } from 'react';
import { Search, Bell, User, Moon, Sun } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { StockContext } from '../context/StockContext';
import { searchStocks } from '../services/api';
import './Navbar.css';

const Navbar = () => {
  const { theme, toggleTheme } = useContext(StockContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleSearch = async () => {
      if (searchQuery.trim().length > 0) {
        setIsSearching(true);
        const results = await searchStocks(searchQuery);
        setSearchResults(results);
      } else {
        setSearchResults([]);
        setIsSearching(false);
      }
    };
    
    const debounce = setTimeout(handleSearch, 300);
    return () => clearTimeout(debounce);
  }, [searchQuery]);

  const handleSelectStock = (symbol) => {
    setSearchQuery('');
    setSearchResults([]);
    setIsSearching(false);
    navigate(`/stock/${symbol}`);
  };

  return (
    <header className="navbar glass">
      <div className="search-container">
        <Search className="search-icon" size={18} />
        <input 
          type="text" 
          placeholder="Search stocks, indices (e.g. RELIANCE, AAPL)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        
        {isSearching && searchResults.length > 0 && (
          <div className="search-dropdown card animate-fade-in">
            {searchResults.map((stock) => (
              <div 
                key={stock.symbol} 
                className="search-result-item"
                onClick={() => handleSelectStock(stock.symbol)}
              >
                <div>
                  <h4>{stock.symbol}</h4>
                  <p>{stock.name}</p>
                </div>
                <div className={`text-${stock.change >= 0 ? 'green' : 'red'}`}>
                  ${stock.price.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="navbar-actions">
        <button className="icon-btn" onClick={toggleTheme}>
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <button className="icon-btn notification">
          <Bell size={20} />
          <span className="badge"></span>
        </button>
        <div className="profile-btn">
          <User size={20} />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
