import './App.css'

const roles = [
  {
    icon: '🎓',
    title: 'Student',
    subtitle: 'Access your academic info',
  },
  {
    icon: '👨‍👩‍👧',
    title: 'Parent',
    subtitle: "Track your child's progress",
  },
  {
    icon: '👨‍🏫',
    title: 'Teacher',
    subtitle: 'Manage classes & attendance',
  },
  {
    icon: '🏫',
    title: 'Principal',
    subtitle: 'View school insights & analytics',
  },
]

function App() {
  return (
    <div className="xyz-app">
      <div className="glow glow-one"></div>
      <div className="glow glow-two"></div>

      <header className="navbar">
        <div className="brand">
          <div className="brand-logo">✦</div>

          <div>
            <h1>XYZ AI</h1>
            <p>Your School, One Conversation Away</p>
          </div>
        </div>

        <button className="language">
          English
          <span>⌄</span>
        </button>
      </header>

      <main className="welcome-page">
        <section className="hero-section">
          <div className="hero-content">
            <span className="hello">Hello! 👋</span>

            <h2>
              Meet <span>XYZ AI</span>
            </h2>

            <p>Your smart school assistant</p>
          </div>

          <div className="character-area">
            <div className="orbit"></div>

            <div className="character">
              <div className="character-face">
                👩🏻‍💼
              </div>

              <div className="character-body">
                <span>XYZ AI</span>
              </div>
            </div>

            <div className="spark spark-one">✦</div>
            <div className="spark spark-two">✦</div>
            <div className="spark spark-three">✦</div>
          </div>

          <div className="speech">
            <div>Hi! I'm XYZ AI</div>
            <span>How can I help you today?</span>
          </div>
        </section>

        <div className="wave">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <section className="role-section">
          <div className="section-heading">
            <p>Choose your role to continue</p>
          </div>

          <div className="role-grid">
            {roles.map((role) => (
              <button className="role-card" key={role.title}>
                <div className="role-icon">{role.icon}</div>

                <h3>{role.title}</h3>

                <p>{role.subtitle}</p>
              </button>
            ))}
          </div>
        </section>

        <footer className="footer">
          <span>◉ Secure</span>
          <span>•</span>
          <span>Private</span>
          <span>•</span>
          <span>Reliable</span>
        </footer>
      </main>
    </div>
  )
}

export default App