import { useState } from 'react'
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

function Welcome({ onSelectRole }) {
  return (
    <>
      <header className="navbar">
        <div className="brand">
          <div className="brand-logo">✦</div>
          <div>
            <h1>XYZ AI</h1>
            <p>Your School, One Conversation Away</p>
          </div>
        </div>

        <button className="language">
          English <span>⌄</span>
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
              <div className="character-face">👩🏻‍💼</div>
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
          {Array.from({ length: 13 }).map((_, index) => (
            <span key={index}></span>
          ))}
        </div>

        <section className="role-section">
          <div className="section-heading">
            <p>Choose your role to continue</p>
          </div>

          <div className="role-grid">
            {roles.map((role) => (
              <button
                className="role-card"
                key={role.title}
                onClick={() => onSelectRole(role.title)}
              >
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
    </>
  )
}

function StudentDashboard({ onBack, onChat }) {
  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-logo">✦</div>
          <strong>XYZ AI</strong>
        </div>

        <div className="student-profile">
          <div className="profile-avatar">👩🏻</div>
          <div>
            <strong>Dhwani</strong>
            <span>Student</span>
            <small>● Online</small>
          </div>
        </div>

        <nav className="side-nav">
          <button className="active">⌂ Dashboard</button>

          <button onClick={onChat}>✦ AI Chat</button>

          <button>▣ My Classes</button>
          <button>◷ Attendance</button>
          <button>✓ Assignments</button>
          <button>▤ Timetable</button>
          <button>⚑ Announcements</button>
          <button>⚙ Settings</button>
        </nav>

        <button className="back-btn" onClick={onBack}>
          ← Change Role
        </button>
      </aside>

      <section className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <span>Student Dashboard</span>
            <h2>Good morning, Dhwani 👋</h2>
            <p>Here's what is happening with your academics.</p>
          </div>

          <div className="header-actions">
            <button>⌕</button>
            <button>♧</button>
            <div className="small-avatar">👩🏻</div>
          </div>
        </header>

        <div className="stats-grid">
          <div className="stat-card">
            <span>Overall Attendance</span>
            <strong className="green">91.2%</strong>
            <small>↑ 3.2% this month</small>
          </div>

          <div className="stat-card">
            <span>Assignments Due</span>
            <strong>4</strong>
            <small>2 due this week</small>
          </div>

          <div className="stat-card">
            <span>Classes Today</span>
            <strong>5</strong>
            <small>Next: AI/ML at 11:00</small>
          </div>

          <div className="stat-card">
            <span>Academic Score</span>
            <strong className="blue">87.6%</strong>
            <small>↑ 4.1% this semester</small>
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="panel attendance-panel">
            <div className="panel-heading">
              <div>
                <span>Attendance Overview</span>
                <h3>This Month</h3>
              </div>
              <button>View Report</button>
            </div>

            <div className="attendance-content">
              <div className="attendance-ring">
                <strong>91.2%</strong>
                <span>Present</span>
              </div>

              <div className="attendance-details">
                <div>
                  <span>Present Days</span>
                  <strong>24</strong>
                </div>

                <div>
                  <span>Total Days</span>
                  <strong>27</strong>
                </div>

                <div>
                  <span>Absent</span>
                  <strong className="red">3</strong>
                </div>
              </div>
            </div>
          </div>

          <div className="panel quick-panel">
            <div className="panel-heading">
              <div>
                <span>Quick Actions</span>
                <h3>What do you need?</h3>
              </div>
            </div>

            <div className="quick-actions">
              <button onClick={onChat}>✦ Ask XYZ AI</button>
              <button>◷ View Attendance</button>
              <button>✓ Check Assignments</button>
              <button>▤ View Timetable</button>
            </div>
          </div>

          <div className="panel assignments-panel">
            <div className="panel-heading">
              <div>
                <span>Assignments</span>
                <h3>Upcoming Work</h3>
              </div>
              <button>View All</button>
            </div>

            <div className="assignment">
              <div>
                <strong>Machine Learning Report</strong>
                <span>Due tomorrow • AI/ML</span>
              </div>
              <b className="warning">Pending</b>
            </div>

            <div className="assignment">
              <div>
                <strong>DBMS SQL Queries</strong>
                <span>Due 19 Aug • DBMS</span>
              </div>
              <b className="warning">Pending</b>
            </div>

            <div className="assignment">
              <div>
                <strong>Software Engineering</strong>
                <span>Submitted • SE</span>
              </div>
              <b className="success">Done</b>
            </div>
          </div>

          <div className="panel ai-panel">
            <div className="ai-icon">✦</div>
            <span>XYZ AI Insight</span>
            <h3>You're doing great!</h3>

            <p>
              Your attendance is above the school average. You have 2
              assignments coming up this week.
            </p>

            <button onClick={onChat}>Chat with XYZ AI →</button>
          </div>
        </div>
      </section>
    </div>
  )
}

function AIChat({ onBack }) {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([
    {
      type: 'ai',
      text: "Hi Dhwani! 👋 I'm XYZ AI. What would you like help with today?",
    },
  ])

  const quickActions = [
    'Check my attendance',
    'What assignments are due?',
    'Show my timetable',
    'Help me study',
  ]

  const getResponse = (text) => {
    const lower = text.toLowerCase()

    if (lower.includes('attendance')) {
      return "Your current attendance is 91.2%. You've attended 24 out of 27 working days. You're doing well! 🎯"
    }

    if (lower.includes('assignment')) {
      return 'You currently have 2 important assignments coming up: Machine Learning Report and DBMS SQL Queries. 📚'
    }

    if (lower.includes('timetable')) {
      return 'Today you have 5 classes. Your next class is AI/ML at 11:00 AM. I can show you the complete timetable too. 🗓️'
    }

    if (lower.includes('study')) {
      return 'Sure! Tell me the subject or topic you want to study, and I can explain it step-by-step, quiz you, or create a revision plan. 🧠'
    }

    return "I'd be happy to help! This is the local prototype response for now. Soon I'll be connected to the XYZ AI backend and Gemini. ✦"
  }

  const sendMessage = (text = message) => {
    const cleanMessage = text.trim()

    if (!cleanMessage) return

    setMessages((current) => [
      ...current,
      {
        type: 'user',
        text: cleanMessage,
      },
      {
        type: 'ai',
        text: getResponse(cleanMessage),
      },
    ])

    setMessage('')
  }

  return (
    <div className="chat-screen">
      <aside className="sidebar chat-sidebar">
        <div className="sidebar-brand">
          <div className="brand-logo">✦</div>
          <strong>XYZ AI</strong>
        </div>

        <div className="student-profile">
          <div className="profile-avatar">👩🏻</div>
          <div>
            <strong>Dhwani</strong>
            <span>Student</span>
            <small>● Online</small>
          </div>
        </div>

        <nav className="side-nav">
          <button onClick={onBack}>⌂ Dashboard</button>
          <button className="active">✦ AI Chat</button>
          <button>▣ My Classes</button>
          <button>◷ Attendance</button>
          <button>✓ Assignments</button>
          <button>▤ Timetable</button>
          <button>⚑ Announcements</button>
          <button>⚙ Settings</button>
        </nav>
      </aside>

      <main className="chat-main">
        <header className="chat-header">
          <div>
            <span>AI Assistant</span>
            <h2>XYZ AI <i>● Online</i></h2>
          </div>

          <div className="chat-header-actions">
            <button>🎙️</button>
            <button>⚙</button>
          </div>
        </header>

        <div className="chat-layout">
          <section className="conversation">
            <div className="conversation-messages">
              {messages.map((item, index) => (
                <div
                  className={`chat-message ${item.type}`}
                  key={`${item.text}-${index}`}
                >
                  {item.type === 'ai' && (
                    <div className="chat-avatar">✦</div>
                  )}

                  <div className="message-content">
                    <div className="message-bubble">{item.text}</div>
                    <small>{item.type === 'ai' ? 'XYZ AI' : 'You'} • now</small>
                  </div>
                </div>
              ))}
            </div>

            <div className="chat-suggestions">
              {quickActions.map((action) => (
                <button
                  key={action}
                  onClick={() => sendMessage(action)}
                >
                  {action}
                </button>
              ))}
            </div>

            <div className="chat-input">
              <input
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') sendMessage()
                }}
                placeholder="Ask XYZ anything..."
              />

              <button
                className="voice-button"
                title="Voice mode"
              >
                🎙
              </button>

              <button
                className="send-message"
                onClick={() => sendMessage()}
              >
                ➤
              </button>
            </div>
          </section>

          <aside className="chat-context">
            <div className="context-card">
              <span>Quick Actions</span>

              <button onClick={() => sendMessage('Check my attendance')}>
                ◷ View Attendance
              </button>

              <button onClick={() => sendMessage('What assignments are due?')}>
                ✓ Assignments
              </button>

              <button onClick={() => sendMessage('Show my timetable')}>
                ▤ View Timetable
              </button>
            </div>

            <div className="context-card overview-card">
              <span>Your Overview</span>

              <div className="overview-row">
                <label>Attendance</label>
                <strong>91.2%</strong>
              </div>

              <div className="mini-progress">
                <div></div>
              </div>

              <div className="overview-row">
                <label>Assignments Due</label>
                <strong>2</strong>
              </div>

              <div className="overview-row">
                <label>Academic Score</label>
                <strong>87.6%</strong>
              </div>
            </div>

            <div className="context-ai">
              <div>✦</div>
              <strong>XYZ AI</strong>
              <p>
                I can help you understand subjects, track academics and stay
                organized.
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}

function App() {
  const [selectedRole, setSelectedRole] = useState(null)
  const [showChat, setShowChat] = useState(false)

  if (selectedRole === 'Student' && showChat) {
    return <AIChat onBack={() => setShowChat(false)} />
  }

  if (selectedRole === 'Student') {
    return (
      <StudentDashboard
        onBack={() => setSelectedRole(null)}
        onChat={() => setShowChat(true)}
      />
    )
  }

  return (
    <div className="xyz-app">
      <div className="glow glow-one"></div>
      <div className="glow glow-two"></div>

      <Welcome onSelectRole={setSelectedRole} />
    </div>
  )
}

export default App