# Stock Market Dashboard

A professional, real-time stock market dashboard built with React and Vite. This application provides users with comprehensive market data, personalized portfolio tracking, and an integrated AI assistant to help analyze stock trends.

## Features

- Real-Time Market Data: Integrates with the Finnhub API to display live stock quotes, market indices, top gainers, and top losers.
- Breaking News Engine: Pulls the latest business and finance headlines using the NewsAPI, featuring an automatic alert system that scans for major market events and displays a global banner when critical news breaks.
- AI Stock Assistant: Features an integrated chat interface powered by the Gemini API. The assistant is contextually aware of the stock you are currently viewing and provides professional investment insights and risk warnings.
- Personalized Dashboard: A home screen that displays a mock portfolio balance, recent market news, and a quick preview of your saved stocks.
- Watchlist Management: Allows users to save specific stocks to a personal watchlist that persists across sessions using local storage.
- Interactive Charting: Visualizes stock price history across different timeframes using Recharts.
- Modern UI Design: Built from scratch with a custom CSS design system, featuring a dark and light mode toggle, responsive grid layouts, and smooth animations.

## Setup and Installation

1. Clone the repository to your local machine.
2. Run `npm install` to install all dependencies.
3. Create a `.env` file in the root directory and add your API keys:
   - VITE_FINNHUB_API_KEY
   - VITE_GEMINI_API_KEY
   - VITE_NEWS_API_KEY
4. Run `npm run dev` to start the local development server.

## Technologies Used

- Frontend Framework: React (Vite)
- Routing: React Router
- State Management: Context API
- Charting: Recharts
- API Client: Axios
- AI Integration: Google Generative AI (Gemini)
- Styling: Custom Vanilla CSS with CSS Variables
