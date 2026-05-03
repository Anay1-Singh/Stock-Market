export const MOCK_MARKET_SUMMARY = [
  { symbol: "NIFTY 50", price: 22450.35, change: 120.45, changePercent: 0.54 },
  { symbol: "SENSEX", price: 73850.10, change: 350.20, changePercent: 0.48 },
  { symbol: "BANK NIFTY", price: 47920.80, change: -105.30, changePercent: -0.22 },
  { symbol: "NASDAQ", price: 16250.60, change: 180.40, changePercent: 1.12 }
];

export const MOCK_TRENDING_STOCKS = [
  { symbol: "RELIANCE", name: "Reliance Industries", price: 2980.50, change: 45.20, changePercent: 1.54 },
  { symbol: "TCS", name: "Tata Consultancy Services", price: 3950.25, change: -15.40, changePercent: -0.39 },
  { symbol: "HDFCBANK", name: "HDFC Bank", price: 1520.10, change: 25.60, changePercent: 1.71 },
  { symbol: "INFY", name: "Infosys", price: 1480.75, change: 10.30, changePercent: 0.70 },
  { symbol: "AAPL", name: "Apple Inc.", price: 172.50, change: 2.10, changePercent: 1.23 }
];

export const MOCK_TOP_GAINERS = [
  { symbol: "ZOMATO", name: "Zomato Ltd", price: 190.20, change: 15.30, changePercent: 8.75 },
  { symbol: "TATAMOTORS", name: "Tata Motors", price: 1050.40, change: 65.20, changePercent: 6.62 },
  { symbol: "SUZLON", name: "Suzlon Energy", price: 42.50, change: 2.10, changePercent: 5.20 }
];

export const MOCK_TOP_LOSERS = [
  { symbol: "PAYTM", name: "One97 Communications", price: 380.10, change: -25.40, changePercent: -6.26 },
  { symbol: "WIPRO", name: "Wipro Ltd", price: 450.25, change: -18.50, changePercent: -3.95 },
  { symbol: "ITC", name: "ITC Ltd", price: 410.80, change: -12.30, changePercent: -2.91 }
];

export const MOCK_NEWS = [
  {
    id: 1,
    title: "Market hits new all-time high amidst tech rally",
    source: "MoneyControl",
    date: "2 mins ago",
    link: "#"
  },
  {
    id: 2,
    title: "Federal Reserve hints at possible rate cuts in upcoming quarter",
    source: "Bloomberg",
    date: "1 hour ago",
    link: "#"
  },
  {
    id: 3,
    title: "Tesla Q1 deliveries miss expectations, stock tumbles",
    source: "Reuters",
    date: "3 hours ago",
    link: "#"
  },
  {
    id: 4,
    title: "Reliance retail expansion plans push stock higher",
    source: "Economic Times",
    date: "5 hours ago",
    link: "#"
  }
];

export const generateChartData = (period) => {
  const data = [];
  let currentPrice = 150;
  let points = 0;

  switch (period) {
    case '1D': points = 24; break;
    case '1W': points = 7; break;
    case '1M': points = 30; break;
    case '1Y': points = 12; break;
    default: points = 30;
  }

  for (let i = 0; i < points; i++) {
    const volatility = (Math.random() - 0.5) * 5;
    currentPrice += volatility;
    
    let timeLabel = '';
    if (period === '1D') timeLabel = `${i}:00`;
    else if (period === '1Y') timeLabel = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i];
    else timeLabel = `Day ${i + 1}`;

    data.push({
      time: timeLabel,
      price: Number(currentPrice.toFixed(2))
    });
  }
  return data;
};
