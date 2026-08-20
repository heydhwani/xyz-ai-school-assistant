# XYZ AI — Human-Like AI School Assistant

XYZ AI is an AI-powered school assistant designed to connect students, parents, teachers, and principals through one intelligent platform.

The platform combines role-based authentication, academic tracking, attendance monitoring, assignment management, and AI-powered academic insights in one place.

## Features

- Role-based authentication
- Student, Parent, Teacher and Principal roles
- User registration and login
- JWT-based authentication
- Password hashing
- Role-based access control
- Student academic dashboard
- Attendance tracking
- Assignment tracking
- Assignment deadlines
- Assignment scores
- Timetable information
- AI-powered academic insights
- Academic risk-level detection
- Personalized AI recommendations
- AI Chat assistant
- Modern dark-themed user interface

## AI Academic Insight

XYZ AI analyzes verified student academic information such as:

- Attendance percentage
- Average assignment score
- Pending assignments
- Completed assignments
- Assignment deadlines
- Timetable
- System-detected academic risk
- Risk factors

The AI generates:

- Overall academic assessment
- Risk explanation
- Priority task
- Personalized recommendations

The AI is instructed to use only the information provided by the application and avoid inventing private academic information.

## Technology Stack

### Frontend

- React
- Vite
- JavaScript
- CSS

### Backend

- Python
- FastAPI
- SQLAlchemy
- Pydantic
- Uvicorn

### Database

- SQLite

### AI

- Google Gemini API
- Google GenAI SDK

### Authentication

- JWT
- Password hashing
- Role-based authorization

## Project Structure

XYZ AI — Human-Like AI School Assistant/
│
├── backend/
│   ├── app/
│   │   ├── routes/
│   │   │   ├── auth.py
│   │   │   └── student.py
│   │   │
│   │   ├── services/
│   │   │   └── ai_service.py
│   │   │
│   │   ├── auth.py
│   │   ├── database.py
│   │   ├── models.py
│   │   ├── schemas.py
│   │   └── main.py
│   │
│   ├── seed.py
│   ├── xyz_ai.db
│   └── .env
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── .gitignore
└── README.md

## How to Run

### Backend

Open a terminal and run:

    cd backend

Create a virtual environment:

    python -m venv venv

Activate the virtual environment on Windows:

    ..\venv\Scripts\activate

Install dependencies:

    pip install -r requirements.txt

Create a `.env` file inside the backend folder:

    GEMINI_API_KEY=your_gemini_api_key
    GEMINI_MODEL=gemini-3.6-flash

Start the backend:

    uvicorn app.main:app --reload

Backend URL:

    http://127.0.0.1:8000

FastAPI documentation:

    http://127.0.0.1:8000/docs

### Frontend

Open another terminal:

    cd frontend

Install dependencies:

    npm install

Start the frontend:

    npm run dev

Frontend URL:

    http://localhost:5173

## Authentication Flow

1. User selects a role.
2. User can register a new account or login.
3. Backend validates the credentials.
4. Password is securely verified.
5. JWT access token is generated.
6. User information and token are stored in the browser.
7. The appropriate dashboard is displayed.

Supported roles:

- Student
- Parent
- Teacher
- Principal

## Student Dashboard

The Student Dashboard provides personalized academic information including:

- Attendance percentage
- Present days
- Total attendance days
- Completed assignments
- Pending assignments
- Assignment deadlines
- Assignment scores
- AI Academic Insight

Example:

    Attendance: 89.29%
    Completed Assignments: 2
    Pending Assignments: 1

Students can view their assignments and submission status directly from the dashboard.

## Academic Risk Detection

The system analyzes student academic information and assigns a risk level.

### HIGH Risk

Possible conditions include:

- Attendance below 75%
- Average assignment score below 5
- Three or more pending assignments

### MEDIUM Risk

Possible conditions include:

- Attendance below 85%
- Average assignment score below 7
- One or more pending assignments

### LOW Risk

If none of the major risk conditions are detected, the student is classified as LOW risk.

The detected risk level and risk factors are provided to the AI for generating a personalized explanation and recommendations.

## AI Academic Insight Example

    Overall:

    Surbhi is performing well academically with a strong
    average assignment score and a solid attendance rate.

    Risk:

    The current risk level is MEDIUM because an assignment
    is due today.

    Priority:

    Complete and submit the pending Mathematics Assignment.

    Recommendations:

    - Complete the urgent assignment.
    - Maintain regular attendance.
    - Continue the current study routine.

## API Endpoints

### Authentication

    POST /auth/register
    POST /auth/login

### Student

    GET /student/dashboard
    GET /student/ai-insight

More API endpoints can be explored through the FastAPI Swagger documentation:

    http://127.0.0.1:8000/docs

## Database

The application uses SQLite with SQLAlchemy.

The database manages information such as:

- Users
- Classes
- Enrollments
- Attendance
- Assignments
- Assignment submissions
- Timetable information

## Security

The application includes:

- Password hashing
- JWT authentication
- Role-based authorization
- Protected API endpoints
- Environment variables for API keys
- Pydantic validation
- Database-based user management

Never commit your real Gemini API key to GitHub.

## Frontend Interface

The application provides a modern dark-themed interface with:

- XYZ AI branding
- AI avatar
- Role selection
- Login screen
- Registration screen
- Student dashboard
- Academic statistics
- Assignment tracking
- AI Academic Insight
- Sidebar navigation

## Future Scope

- Complete Teacher Dashboard
- Complete Parent Dashboard
- Complete Principal Dashboard
- Teacher attendance management
- Parent child-performance tracking
- Principal school analytics
- AI-powered study planning
- Automated reminders
- Assignment notifications
- Voice-based AI interaction
- Advanced academic prediction
- Cloud deployment
- Mobile application

## Project Goal

The goal of XYZ AI is to create a human-like school assistant that brings academic information and AI assistance together in a single platform.

Instead of students manually checking different academic resources, XYZ AI provides relevant academic information and personalized guidance through one intelligent assistant.

## Author

Dhwani Jain

B.Tech CSE

## Project

XYZ AI — Human-Like AI School Assistant

## License

This project is developed for educational and project demonstration purposes.