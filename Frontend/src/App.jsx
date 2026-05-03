import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Markets from './pages/Markets';
import StockDetails from './pages/StockDetails';
import Watchlist from './pages/Watchlist';
import News from './pages/News';
import BreakingNewsAlert from './components/BreakingNewsAlert';
import { StockProvider } from './context/StockContext';
import './index.css';

function App() {
  return (
    <StockProvider>
      <BreakingNewsAlert />
      <Router>
        <div className="app-container">
          <Sidebar />
          <div className="main-content">
            <Navbar />
            <main className="page-content">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/markets" element={<Markets />} />
                <Route path="/stock/:symbol" element={<StockDetails />} />
                <Route path="/watchlist" element={<Watchlist />} />
                <Route path="/news" element={<News />} />
                <Route path="/settings" element={<Dashboard />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </StockProvider>
  );
}

export default App;
