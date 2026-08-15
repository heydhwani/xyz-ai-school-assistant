function App() {
  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <div className="logo">✦</div>
          <div>
            <h1>XYZ AI</h1>
            <span>Human-Like AI School Assistant</span>
          </div>
        </div>

        <div className="status">
          <span className="status-dot"></span>
          Online
        </div>
      </header>

      <main className="chat-container">
        <section className="welcome">
          <div className="welcome-icon">✦</div>
          <h2>Hey! I'm XYZ 👋</h2>
          <p>
            Your AI school assistant. Ask me about your studies,
            assignments, schedule, or anything you need help with.
          </p>
        </section>

        <div className="suggestions">
          <button>📚 Help me study</button>
          <button>📝 Explain a topic</button>
          <button>📅 What's my schedule?</button>
          <button>💡 Give me an idea</button>
        </div>

        <div className="messages">
          <div className="message assistant">
            <div className="avatar">✦</div>
            <div className="bubble">
              Hi! I'm here to help you. What would you like to work on today?
            </div>
          </div>
        </div>

        <div className="input-area">
          <input
            type="text"
            placeholder="Message XYZ AI..."
          />
          <button className="send-btn">➤</button>
        </div>
      </main>
    </div>
  )
}

export default App