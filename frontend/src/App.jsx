import { useEffect, useState } from 'react'
import './App.css'

const API_URL = 'http://127.0.0.1:8000'

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

function VoiceWave() {
  return (
    <div className="voice-wave">
      {Array.from({ length: 15 }).map((_, index) => (
        <span key={index}></span>
      ))}
    </div>
  )
}

function Welcome({ onSelectRole }) {
  return (
    <div className="welcome-page">
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

      <main>
        <section className="hero-section">
          <div className="hero-content">
            <span className="hello">Hello! 👋</span>

            <h2>
              Meet
              <br />
              <span>XYZ AI</span>
            </h2>

            <p>Your smart school assistant</p>
          </div>

          <div className="character-column">
            <div className="character-area">
              <div className="orbit"></div>

              <img
                src="/xyz-avatar.png"
                alt="XYZ AI"
                className="hero-avatar"
              />

              <div className="spark spark-one">✦</div>
              <div className="spark spark-two">✦</div>
              <div className="spark spark-three">✦</div>
            </div>

            <VoiceWave />
          </div>

          <div className="speech">
            <strong>Hi! I'm XYZ AI</strong>
            <span>How can I help you today?</span>
          </div>
        </section>

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
    </div>
  )
}

function Login({
  role,
  onBack,
  onLogin,
  onRegister,
}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()

    setError('')

    if (!email || !password) {
      setError('Please enter email and password.')
      return
    }

    setLoading(true)

    try {
      const response = await fetch(
        `${API_URL}/auth/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.detail || 'Invalid email or password'
        )
      }

      if (data.user.role !== role.toLowerCase()) {
        throw new Error(
          `This account is registered as ${data.user.role}. Please select the correct role.`
        )
      }

      localStorage.setItem(
        'access_token',
        data.access_token
      )

      localStorage.setItem(
        'user',
        JSON.stringify(data.user)
      )

      onLogin(data)
    } catch (err) {
      setError(
        err.message ||
        'Unable to connect to the server.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="xyz-app">
      <div className="glow glow-one"></div>
      <div className="glow glow-two"></div>

      <div className="welcome-page">
        <header className="navbar">
          <div className="brand">
            <div className="brand-logo">✦</div>

            <div>
              <h1>XYZ AI</h1>
              <p>Your School, One Conversation Away</p>
            </div>
          </div>
        </header>

        <main>
          <section className="role-section">
            <div className="section-heading">
              <p>Secure {role} Login</p>
            </div>

            <div
              className="login-card"
              style={{
                maxWidth: '430px',
                margin: '30px auto',
                padding: '35px',
                borderRadius: '24px',
                background: 'rgba(255,255,255,0.06)',
                backdropFilter: 'blur(16px)',
              }}
            >
              <div
                style={{
                  textAlign: 'center',
                  marginBottom: '25px',
                }}
              >
                <div
                  style={{
                    fontSize: '48px',
                    marginBottom: '10px',
                  }}
                >
                  {roles.find(
                    (item) =>
                      item.title === role
                  )?.icon}
                </div>

                <h2>{role} Login</h2>

                <p>
                  Sign in to continue to your
                  XYZ AI dashboard.
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  style={{
                    width: '100%',
                    padding: '14px',
                    marginBottom: '14px',
                    borderRadius: '10px',
                    border: '1px solid rgba(255,255,255,0.15)',
                    background: 'rgba(0,0,0,0.2)',
                    color: 'white',
                    boxSizing: 'border-box',
                  }}
                />

                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  style={{
                    width: '100%',
                    padding: '14px',
                    marginBottom: '14px',
                    borderRadius: '10px',
                    border: '1px solid rgba(255,255,255,0.15)',
                    background: 'rgba(0,0,0,0.2)',
                    color: 'white',
                    boxSizing: 'border-box',
                  }}
                />

                {error && (
                  <p
                    style={{
                      color: '#ff7b7b',
                      marginBottom: '15px',
                    }}
                  >
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: '10px',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: '600',
                  }}
                >
                  {loading
                    ? 'Signing in...'
                    : 'Login'}
                </button>
              </form>

              <button
                onClick={onRegister}
                style={{
                  display: 'block',
                  margin: '18px auto 0',
                  background: 'none',
                  border: 'none',
                  color: 'inherit',
                  cursor: 'pointer',
                }}
              >
                New user? Register
              </button>

              <button
                onClick={onBack}
                style={{
                  display: 'block',
                  margin: '10px auto 0',
                  background: 'none',
                  border: 'none',
                  color: 'inherit',
                  cursor: 'pointer',
                }}
              >
                ← Change Role
              </button>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

function Register({
  role,
  onBack,
  onLogin,
}) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()

    setError('')
    setLoading(true)

    try {
      const response = await fetch(
        `${API_URL}/auth/register`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            password,
            role: role.toLowerCase(),
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.detail || 'Registration failed'
        )
      }

      const loginResponse = await fetch(
        `${API_URL}/auth/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      )

      const loginData =
        await loginResponse.json()

      if (!loginResponse.ok) {
        throw new Error(
          loginData.detail ||
          'Registration successful. Please login.'
        )
      }

      localStorage.setItem(
        'access_token',
        loginData.access_token
      )

      localStorage.setItem(
        'user',
        JSON.stringify(loginData.user)
      )

      onLogin(loginData)
    } catch (err) {
      setError(
        err.message ||
        'Unable to connect to the server.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="xyz-app">
      <div className="glow glow-one"></div>
      <div className="glow glow-two"></div>

      <div className="welcome-page">
        <header className="navbar">
          <div className="brand">
            <div className="brand-logo">✦</div>

            <div>
              <h1>XYZ AI</h1>
              <p>Your School, One Conversation Away</p>
            </div>
          </div>
        </header>

        <main>
          <section className="role-section">
            <div className="section-heading">
              <p>Create {role} Account</p>
            </div>

            <div
              style={{
                maxWidth: '430px',
                margin: '30px auto',
                padding: '35px',
                borderRadius: '24px',
                background: 'rgba(255,255,255,0.06)',
                backdropFilter: 'blur(16px)',
              }}
            >
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Full name"
                  value={name}
                  onChange={(event) =>
                    setName(event.target.value)
                  }
                  required
                  style={{
                    width: '100%',
                    padding: '14px',
                    marginBottom: '14px',
                    borderRadius: '10px',
                    boxSizing: 'border-box',
                  }}
                />

                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  required
                  style={{
                    width: '100%',
                    padding: '14px',
                    marginBottom: '14px',
                    borderRadius: '10px',
                    boxSizing: 'border-box',
                  }}
                />

                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  required
                  style={{
                    width: '100%',
                    padding: '14px',
                    marginBottom: '14px',
                    borderRadius: '10px',
                    boxSizing: 'border-box',
                  }}
                />

                {error && (
                  <p
                    style={{
                      color: '#ff7b7b',
                      marginBottom: '15px',
                    }}
                  >
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: '10px',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  {loading
                    ? 'Creating account...'
                    : 'Create Account'}
                </button>
              </form>

              <button
                onClick={onBack}
                style={{
                  display: 'block',
                  margin: '18px auto 0',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'inherit',
                }}
              >
                ← Back to Login
              </button>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

function RoleDashboard({ user, onLogout }) {
  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-logo">✦</div>
          <strong>XYZ AI</strong>
        </div>

        <div className="student-profile">
          <img
            src="/xyz-avatar.png"
            alt={user.name}
            className="profile-avatar"
          />

          <div>
            <strong>{user.name}</strong>
            <span>{user.role}</span>
            <small>● Online</small>
          </div>
        </div>

        <nav className="side-nav">
          <button className="active">
            ▣
            <span>Dashboard</span>
          </button>

          <button>
            ✦
            <span>AI Chat</span>
          </button>

          <button>
            ▣
            <span>My Classes</span>
          </button>

          <button>
            ◷
            <span>Attendance</span>
          </button>

          <button>
            ✓
            <span>Assignments</span>
          </button>

          <button>
            ▤
            <span>Timetable</span>
          </button>

          <button>
            ⚑
            <span>Announcements</span>
          </button>

          <button>
            ⚙
            <span>Settings</span>
          </button>
        </nav>

        <button
          className="back-btn"
          onClick={onLogout}
        >
          ← Logout
        </button>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <span>
              {user.role.charAt(0).toUpperCase() +
                user.role.slice(1)} Dashboard
            </span>

            <h2>
              Welcome, {user.name}
            </h2>
          </div>
        </header>

        <section className="dashboard-content">
          <div className="stat-grid">
            <div className="stat-card">
              <span>Role</span>
              <strong>
                {user.role.charAt(0).toUpperCase() +
                  user.role.slice(1)}
              </strong>
              <p>Active account</p>
            </div>

            <div className="stat-card">
              <span>AI Assistant</span>
              <strong>Ready</strong>
              <p>Available to help</p>
            </div>

            <div className="stat-card">
              <span>Account</span>
              <strong>Active</strong>
              <p>Successfully signed in</p>
            </div>
          </div>

          <div
            className="dashboard-card"
            style={{
              marginTop: '25px',
              padding: '30px',
              borderRadius: '20px',
              background: 'rgba(255,255,255,0.05)',
            }}
          >
            <h3>
              ✦ XYZ AI Assistant
            </h3>

            <p>
              Welcome to your {user.role} workspace.
              Your personalized school tools will
              appear here.
            </p>

            <button>
              Start with XYZ AI
            </button>
          </div>
        </section>
      </main>
    </div>
  )
}



function StudentDashboard({
  user,
  dashboard,
  onBack,
}) {
  const [insight, setInsight] = useState(null)
  const [loadingInsight, setLoadingInsight] = useState(false)
  const [activePage, setActivePage] = useState('dashboard')

  async function loadInsight() {
    setLoadingInsight(true)

    try {
      const token = localStorage.getItem('access_token')

      const response = await fetch(
        `${API_URL}/student/ai-insight`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const data = await response.json()

      if (response.ok) {
        setInsight(data)
      }
    } catch {
      setInsight(null)
    } finally {
      setLoadingInsight(false)
    }
  }

  const menuItems = [
    { id: 'dashboard', icon: '▣', label: 'Dashboard' },
    { id: 'chat', icon: '✦', label: 'AI Chat' },
    { id: 'classes', icon: '▣', label: 'My Classes' },
    { id: 'attendance', icon: '◷', label: 'Attendance' },
    { id: 'assignments', icon: '✓', label: 'Assignments' },
    { id: 'timetable', icon: '▤', label: 'Timetable' },
    { id: 'announcements', icon: '⚑', label: 'Announcements' },
    { id: 'settings', icon: '⚙', label: 'Settings' },
  ]

  function renderPage() {
    if (activePage === 'dashboard') {
      return (
        <>
          <section className="dashboard-content">
            <div className="stat-grid">
              <div className="stat-card">
                <span>Attendance</span>
                <strong>
                  {dashboard.attendance.percentage}%
                </strong>
                <p>
                  {dashboard.attendance.present_days} /{' '}
                  {dashboard.attendance.total_days} days present
                </p>
              </div>

              <div className="stat-card">
                <span>Assignments</span>
                <strong>
                  {
                    dashboard.assignments.filter(
                      (item) => item.submitted
                    ).length
                  }
                </strong>
                <p>completed</p>
              </div>

              <div className="stat-card">
                <span>Pending</span>
                <strong>
                  {
                    dashboard.assignments.filter(
                      (item) => !item.submitted
                    ).length
                  }
                </strong>
                <p>assignments</p>
              </div>
            </div>

            <div
              className="dashboard-card"
              style={{
                marginTop: '25px',
                padding: '25px',
                borderRadius: '20px',
                background: 'rgba(255,255,255,0.05)',
              }}
            >
              <h3>My Assignments</h3>

              {dashboard.assignments.map((assignment) => (
                <div
                  key={assignment.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '15px 0',
                    borderBottom:
                      '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <div>
                    <strong>{assignment.title}</strong>
                    <p>Due: {assignment.due_date}</p>
                  </div>

                  <div>
                    {assignment.submitted
                      ? `Submitted ${
                          assignment.score !== null
                            ? `• ${assignment.score}/10`
                            : ''
                        }`
                      : 'Pending'}
                  </div>
                </div>
              ))}
            </div>

            <div
              className="dashboard-card"
              style={{
                marginTop: '25px',
                padding: '25px',
                borderRadius: '20px',
                background: 'rgba(255,255,255,0.05)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <h3>✦ AI Academic Insight</h3>
                  <p>Personalized analysis from XYZ AI</p>
                </div>

                <button
                  onClick={loadInsight}
                  disabled={loadingInsight}
                >
                  {loadingInsight
                    ? 'Analyzing...'
                    : 'Get AI Insight'}
                </button>
              </div>

              {insight && (
                <div
                  style={{
                    marginTop: '20px',
                    whiteSpace: 'pre-line',
                    lineHeight: '1.7',
                  }}
                >
                  {insight.ai_insight}
                </div>
              )}
            </div>
          </section>
        </>
      )
    }

    if (activePage === 'chat') {
      return (
        <section className="dashboard-content">
          <div className="dashboard-card">
            <h2>✦ AI Chat</h2>
            <p>
              Ask XYZ AI about your studies, assignments,
              attendance and timetable.
            </p>

            <div
              style={{
                marginTop: '25px',
                padding: '25px',
                borderRadius: '15px',
                background: 'rgba(255,255,255,0.05)',
              }}
            >
              <strong>Hi {user.name}! 👋</strong>
              <p>
                Your AI school assistant is ready to help
                you with your academic work.
              </p>
            </div>
          </div>
        </section>
      )
    }

    if (activePage === 'classes') {
      return (
        <section className="dashboard-content">
          <div className="dashboard-card">
            <h2>▣ My Classes</h2>

            {dashboard.class ? (
              <div
                style={{
                  marginTop: '20px',
                  padding: '25px',
                  borderRadius: '15px',
                  background: 'rgba(255,255,255,0.05)',
                }}
              >
                <h3>{dashboard.class.name}</h3>
                <p>Section: {dashboard.class.section}</p>
                <p>Grade: {dashboard.class.grade}</p>
              </div>
            ) : (
              <p>No class information available.</p>
            )}
          </div>
        </section>
      )
    }

    if (activePage === 'attendance') {
      return (
        <section className="dashboard-content">
          <div className="dashboard-card">
            <h2>◷ Attendance</h2>

            <div
              style={{
                marginTop: '20px',
                padding: '25px',
                borderRadius: '15px',
                background: 'rgba(255,255,255,0.05)',
              }}
            >
              <h1>{dashboard.attendance.percentage}%</h1>
              <p>
                Present: {dashboard.attendance.present_days}
              </p>
              <p>
                Total Days: {dashboard.attendance.total_days}
              </p>
              <p>
                Absent:{' '}
                {dashboard.attendance.total_days -
                  dashboard.attendance.present_days}
              </p>
            </div>
          </div>
        </section>
      )
    }

    if (activePage === 'assignments') {
      return (
        <section className="dashboard-content">
          <div className="dashboard-card">
            <h2>✓ Assignments</h2>

            {dashboard.assignments.map((assignment) => (
              <div
                key={assignment.id}
                style={{
                  marginTop: '15px',
                  padding: '20px',
                  borderRadius: '15px',
                  background: 'rgba(255,255,255,0.05)',
                }}
              >
                <h3>{assignment.title}</h3>
                <p>{assignment.description}</p>
                <p>Due: {assignment.due_date}</p>

                <strong>
                  {assignment.submitted
                    ? `Submitted • ${
                        assignment.score ?? 'Not graded'
                      }/10`
                    : 'Pending'}
                </strong>
              </div>
            ))}
          </div>
        </section>
      )
    }

    if (activePage === 'timetable') {
      return (
        <section className="dashboard-content">
          <div className="dashboard-card">
            <h2>▤ Timetable</h2>

            {dashboard.timetable.map((item, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '15px',
                  marginTop: '10px',
                  borderRadius: '10px',
                  background: 'rgba(255,255,255,0.05)',
                }}
              >
                <strong>{item.day}</strong>
                <span>{item.subject}</span>
                <span>
                  {item.start_time} - {item.end_time}
                </span>
              </div>
            ))}
          </div>
        </section>
      )
    }

    if (activePage === 'announcements') {
      return (
        <section className="dashboard-content">
          <div className="dashboard-card">
            <h2>⚑ Announcements</h2>

            <div
              style={{
                marginTop: '20px',
                padding: '20px',
                borderRadius: '15px',
                background: 'rgba(255,255,255,0.05)',
              }}
            >
              <h3>Academic Reminder</h3>
              <p>
                Complete your pending Mathematics Assignment
                before the deadline.
              </p>
            </div>
          </div>
        </section>
      )
    }

    if (activePage === 'settings') {
      return (
        <section className="dashboard-content">
          <div className="dashboard-card">
            <h2>⚙ Settings</h2>

            <div
              style={{
                marginTop: '20px',
                padding: '20px',
                borderRadius: '15px',
                background: 'rgba(255,255,255,0.05)',
              }}
            >
              <p>
                <strong>Name:</strong> {user.name}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Role:</strong> {user.role}
              </p>
            </div>
          </div>
        </section>
      )
    }
  }

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-logo">✦</div>
          <strong>XYZ AI</strong>
        </div>

        <div className="student-profile">
          <img
            src="/xyz-avatar.png"
            alt={user.name}
            className="profile-avatar"
          />

          <div>
            <strong>{user.name}</strong>
            <span>{user.role}</span>
            <small>● Online</small>
          </div>
        </div>

        <nav className="side-nav">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={
                activePage === item.id ? 'active' : ''
              }
              onClick={() => setActivePage(item.id)}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <button
          className="back-btn"
          onClick={onBack}
        >
          ← Change Role
        </button>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <span>Student Dashboard</span>
            <h2>
              Welcome, {user.name}
            </h2>
          </div>
        </header>

        {renderPage()}
      </main>
    </div>
  )
}

function App() {
  const [selectedRole, setSelectedRole] =
    useState(null)

  const [screen, setScreen] =
    useState('welcome')

  const [user, setUser] =
    useState(null)

  const [dashboard, setDashboard] =
    useState(null)

  useEffect(() => {
    const savedUser =
      localStorage.getItem('user')

    if (savedUser) {
      setUser(
        JSON.parse(savedUser)
      )
    }
  }, [])

  async function handleLogin(data) {
    setUser(data.user)

    if (data.user.role === 'student') {
      const response = await fetch(
        `${API_URL}/student/dashboard`,
        {
          headers: {
            Authorization:
              `Bearer ${data.access_token}`,
          },
        }
      )

      const dashboardData =
        await response.json()

      if (response.ok) {
        setDashboard(
          dashboardData
        )
      }
    }

    setScreen('dashboard')
  }

  function handleLogout() {
    localStorage.removeItem(
      'access_token'
    )

    localStorage.removeItem(
      'user'
    )

    setUser(null)
    setDashboard(null)
    setSelectedRole(null)
    setScreen('welcome')
  }

  if (
    screen === 'login' &&
    selectedRole
  ) {
    return (
      <Login
        role={selectedRole}
        onBack={() =>
          setScreen('welcome')
        }
        onLogin={handleLogin}
        onRegister={() =>
          setScreen('register')
        }
      />
    )
  }

  if (
    screen === 'register' &&
    selectedRole
  ) {
    return (
      <Register
        role={selectedRole}
        onBack={() =>
          setScreen('login')
        }
        onLogin={handleLogin}
      />
    )
  }

  if (
    screen === 'dashboard' &&
    user &&
    dashboard &&
    user.role === 'student'
  ) {
    return (
      <StudentDashboard
        user={user}
        dashboard={dashboard}
        onBack={handleLogout}
        
      />
    )
  }

  if (
    screen === 'dashboard' &&
    user &&
    user.role !== 'student'
  ) {
    return (
      <RoleDashboard
        user={user}
        onLogout={handleLogout}
      />
    ) 
  }

  return (
    <div className="xyz-app">
      <div className="glow glow-one"></div>
      <div className="glow glow-two"></div>

      <Welcome
        onSelectRole={(role) => {
          setSelectedRole(role)
          setScreen('login')
        }}
      />
    </div>
  )
}

export default App