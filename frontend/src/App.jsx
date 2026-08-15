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

function StudentDashboard({ onBack }) {
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
          <button>✦ AI Chat</button>
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
              <button>✦ Ask XYZ AI</button>
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
            <button>Chat with XYZ AI →</button>
          </div>
        </div>
      </section>
    </div>
  )
}

function App() {
  const [selectedRole, setSelectedRole] = useState(null)

  if (selectedRole === 'Student') {
    return <StudentDashboard onBack={() => setSelectedRole(null)} />
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