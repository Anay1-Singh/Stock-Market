import axios from 'axios';
import { 
  MOCK_MARKET_SUMMARY, 
  MOCK_TRENDING_STOCKS, 
  MOCK_TOP_GAINERS, 
  MOCK_TOP_LOSERS, 
  generateChartData
} from '../utils/mockData';

const FINNHUB_API_KEY = import.meta.env.VITE_FINNHUB_API_KEY;
const FINNHUB_BASE_URL = 'https://finnhub.io/api/v1';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Keep mock data for indices and dashboard summaries to avoid rate limits
export const fetchMarketSummary = async () => {
  await delay(500);
  return MOCK_MARKET_SUMMARY;
};

export const fetchTrendingStocks = async () => {
  await delay(600);
  return MOCK_TRENDING_STOCKS;
};

export const fetchTopGainers = async () => {
  await delay(400);
  return MOCK_TOP_GAINERS;
};

export const fetchTopLosers = async () => {
  await delay(400);
  return MOCK_TOP_LOSERS;
};

const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const NEWS_API_URL = 'https://newsapi.org/v2/top-headlines';

// Real NewsAPI Integration
export const fetchNews = async () => {
  try {
    const response = await axios.get(NEWS_API_URL, {
      params: { 
        country: 'us',
        category: 'business',
        apiKey: NEWS_API_KEY 
      }
    });
    
    // Map to our expected format
    return response.data.articles.slice(0, 10).map((item, index) => ({
      id: index,
      title: item.title,
      source: item.source.name,
      date: new Date(item.publishedAt).toLocaleString(),
      link: item.url
    }));
  } catch (error) {
    console.error("Error fetching news from NewsAPI", error);
    // Fallback to mock news on error
    const { MOCK_NEWS } = await import('../utils/mockData');
    return MOCK_NEWS;
  }
};

export const checkBreakingNews = async () => {
  try {
    const news = await fetchNews();
    if (!news || news.length === 0) return null;

    // Define keywords that indicate breaking or big news
    const breakingKeywords = ['crash', 'surge', 'plunge', 'record', 'crisis', 'emergency', 'breaking', 'urgent', 'soars', 'dives'];
    
    // Check top 5 news items for keywords
    for (let i = 0; i < Math.min(5, news.length); i++) {
      const item = news[i];
      const titleLower = item.title.toLowerCase();
      
      for (const word of breakingKeywords) {
        if (titleLower.includes(word)) {
          return item; // Return the first breaking news found
        }
      }
    }
    
    return null;
  } catch (error) {
    console.error("Error checking breaking news", error);
    return null;
  }
};

export const fetchStockDetails = async (symbol) => {
  try {
    // Fetch quote and profile in parallel
    const [quoteRes, profileRes] = await Promise.all([
      axios.get(`${FINNHUB_BASE_URL}/quote`, { params: { symbol, token: FINNHUB_API_KEY } }),
      axios.get(`${FINNHUB_BASE_URL}/stock/profile2`, { params: { symbol, token: FINNHUB_API_KEY } })
    ]);

    const quote = quoteRes.data;
    const profile = profileRes.data;

    // Finnhub returns c: 0, d: null, dp: null for invalid symbols
    if (quote.c === 0 || quote.d === null || quote.dp === null) {
      throw new Error("Invalid quote data from Finnhub");
    }

    return {
      symbol: symbol.toUpperCase(),
      name: profile.name || `${symbol.toUpperCase()} Inc.`,
      price: quote.c, // Current price
      change: quote.d, // Change
      changePercent: quote.dp // Percent change
    };
  } catch (error) {
    console.error(`Error fetching stock details for ${symbol} from Finnhub`, error);
    // Fallback to mock
    const stock = MOCK_TRENDING_STOCKS.find(s => s.symbol.toUpperCase() === symbol.toUpperCase()) || 
      { symbol: symbol.toUpperCase(), name: `${symbol.toUpperCase()} Inc.`, price: 150.00, change: 2.50, changePercent: 1.69 };
    return stock;
  }
};

export const searchStocks = async (query) => {
  if (!query) return [];
  try {
    const response = await axios.get(`${FINNHUB_BASE_URL}/search`, {
      params: { q: query, token: FINNHUB_API_KEY }
    });
    
    // Finnhub returns an array of result objects
    return response.data.result.slice(0, 5).map(item => ({
      symbol: item.symbol,
      name: item.description,
      price: 0, // Search API doesn't return price
      change: 0,
      changePercent: 0
    }));
  } catch (error) {
    console.error("Error searching stocks from Finnhub", error);
    return [];
  }
};

// Finnhub free tier does not support intraday candles, keep mock for chart to maintain UI
export const fetchChartData = async (symbol, period = '1M') => {
  await delay(500);
  return generateChartData(period);
};
