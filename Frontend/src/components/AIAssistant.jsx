import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import './AIAssistant.css';

const AIAssistant = ({ stock }) => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi! I'm your AI Stock Assistant. Ask me anything about this stock!" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generatePrompt = (userMessage) => {
    const trend = stock.change > 0 ? "Upward" : stock.change < 0 ? "Downward" : "Stable";
    
    return `
You are an intelligent Stock Market Assistant designed for a professional stock dashboard application.
Your role is to help users understand stock performance, trends, and basic investment insights in a simple and beginner-friendly way.

---

## 🎯 YOUR RESPONSIBILITIES
1. Analyze stock data provided by the system (price, change %, trend)
2. Answer user queries about stocks
3. Give simple recommendations based on trend
4. Explain reasons clearly
5. Always include a risk disclaimer

---

## 📊 INPUT FORMAT
User Question: ${userMessage}

Stock Data:
* Stock Name: ${stock.name || stock.symbol} (${stock.symbol})
* Current Price: ${stock.price}
* Change Percentage: ${stock.changePercent}%
* Trend: ${trend}

---

## 🧠 RESPONSE FORMAT (STRICTLY FOLLOW)
### 📌 Stock Analysis
Explain in 2–3 simple lines what is happening with the stock.

### 📈 Recommendation
Give ONE:
* Buy
* Hold
* Avoid
with a short reason.

### ⚠️ Risk Note
Always include:
"This is not financial advice. The stock market involves risks."

---

## 💬 BEHAVIOR RULES
* Keep answers short and clear
* Avoid technical jargon
* Be helpful, not overconfident
* Do NOT guarantee future profits
* Do NOT say "100% sure" or similar claims
* Avoid predicting exact future prices
    `;
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || !stock) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
      if (!API_KEY) {
        throw new Error("Gemini API key is missing. Please check your .env file.");
      }

      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      
      const prompt = generatePrompt(userMsg);
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      setMessages(prev => [...prev, { role: 'assistant', content: text }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I'm having trouble connecting right now. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="ai-assistant card">
      <div className="ai-header">
        <Sparkles size={20} className="ai-icon text-accent" />
        <h3>AI Assistant</h3>
      </div>
      
      <div className="ai-chat-area">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message-wrapper ${msg.role}`}>
            <div className={`message-avatar ${msg.role}`}>
              {msg.role === 'assistant' ? <Bot size={16} /> : <User size={16} />}
            </div>
            <div className={`message-content ${msg.role}`}>
              {msg.content.split('\n').map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="message-wrapper assistant">
            <div className="message-avatar assistant"><Bot size={16} /></div>
            <div className="message-content assistant">
              <div className="typing-indicator">
                <span></span><span></span><span></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form className="ai-input-area" onSubmit={handleSendMessage}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about this stock..."
          disabled={isLoading}
        />
        <button type="submit" disabled={!input.trim() || isLoading} className="send-btn">
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};

export default AIAssistant;
