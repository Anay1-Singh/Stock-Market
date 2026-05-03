import React, { createContext, useState, useEffect } from 'react';
import { checkBreakingNews } from '../services/api';

export const StockContext = createContext();

export const StockProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem('watchlist');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [breakingNews, setBreakingNews] = useState(null);

  // Update document theme attribute
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Persist watchlist
  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  // Check for breaking news on load
  useEffect(() => {
    const checkForNews = async () => {
      const newsItem = await checkBreakingNews();
      if (newsItem) {
        setBreakingNews(newsItem);
      }
    };
    checkForNews();
    
    // Optional: Check every 5 minutes
    const intervalId = setInterval(checkForNews, 5 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  const dismissBreakingNews = () => {
    setBreakingNews(null);
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const addToWatchlist = (stock) => {
    setWatchlist(prev => {
      if (prev.find(s => s.symbol === stock.symbol)) return prev;
      return [...prev, stock];
    });
  };

  const removeFromWatchlist = (symbol) => {
    setWatchlist(prev => prev.filter(s => s.symbol !== symbol));
  };
  
  const isInWatchlist = (symbol) => {
    return watchlist.some(s => s.symbol === symbol);
  };

  return (
    <StockContext.Provider value={{ 
      theme, 
      toggleTheme, 
      watchlist, 
      addToWatchlist, 
      removeFromWatchlist,
      isInWatchlist,
      breakingNews,
      dismissBreakingNews
    }}>
      {children}
    </StockContext.Provider>
  );
};
