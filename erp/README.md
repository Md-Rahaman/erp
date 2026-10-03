# Employee Management System — Internship Project

A complete integrated full-stack project for seven interns.

## Stack

Frontend:
- React 18
- Vite
- React Router
- Axios
- Recharts
- CSS

Backend:
- FastAPI
- SQLAlchemy 2
- Alembic
- SQLite for easy training setup
- PostgreSQL-compatible database configuration
- JWT
- Argon2 password hashing
- Pydantic

## Intern Responsibilities

| Intern | Responsibility |
|---|---|
| Pratiksha | React Login/Register + validation + auth state |
| Muskan | Dashboard + charts + Profile |
| Ayan | Employee CRUD UI + search/filter/pagination |
| Suhail | Axios integration + loading/errors + responsive design |
| Mustakhim | FastAPI architecture + SQLAlchemy + migrations |
| Shilpa | JWT + password hashing + protected APIs + RBAC |
| Furqan | Employee REST CRUD APIs + validation |

## Features

- User registration
- Login/logout
- JWT authentication
- Password hashing
- Protected routes
- Admin/User roles
- Dashboard cards
- Department chart
- Profile update
- Employee CRUD
- Search
- Department filter
- Pagination
- Loading indicators
- Error messages
- Axios interceptor
- Responsive UI
- SQLAlchemy models
- Alembic migration
- Swagger/OpenAPI documentation

## Demo users

After running the seed script:

Admin:
`admin@example.com`
`Admin@123`

User:
`user@example.com`
`User@123`

These credentials are for training only.

# BACKEND SETUP

Open terminal 1:

```bash
cd backend
python -m venv .venv
```

Windows PowerShell:

```powershell
.venv\Scripts\Activate.ps1
```

CMD:

```cmd
.venv\Scripts\activate
```

macOS/Linux:

```bash
source .venv/bin/activate
```

Install:

```bash
pip install -r requirements.txt
```

Create `.env` from `.env.example`.

Run migration:

```bash
alembic upgrade head
```

Seed data:

```bash
python -m app.seed
```

Start backend:

```bash
uvicorn app.main:app --reload
```

API:
http://127.0.0.1:8000

Swagger:
http://127.0.0.1:8000/docs

# FRONTEND SETUP

Open terminal 2:

```bash
cd frontend
npm install
npm run dev
```

Frontend:
http://localhost:5173

If needed create `.env`:

```text
VITE_API_URL=http://127.0.0.1:8000/api
```

# REQUEST FLOW

React page
→ Axios
→ FastAPI route
→ JWT dependency
→ Pydantic validation
→ Service layer
→ SQLAlchemy
→ Database
→ JSON response
→ React state
→ UI

# API ENDPOINTS

Authentication:
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me

Profile:
- GET /api/users/me
- PUT /api/users/me

Dashboard:
- GET /api/dashboard/summary

Employees:
- GET /api/employees
- POST /api/employees
- GET /api/employees/{id}
- PUT /api/employees/{id}
- DELETE /api/employees/{id}

Health:
- GET /api/health

# GIT BRANCHING

Recommended:

```text
main
dev

feature/pratiksha-auth
feature/muskan-dashboard
feature/ayan-employee-ui
feature/suhail-integration
feature/mustakhim-backend
feature/shilpa-jwt
feature/furqan-employee-api
```

Each intern should create a branch, commit their work and create a pull request to `dev`.

# IMPORTANT

This is an internship/training project. Before production:
- Use PostgreSQL
- Use a strong secret stored outside source control
- Use HTTPS
- Restrict CORS
- Add automated tests
- Add audit logging
- Add rate limiting
- Add refresh tokens if required
- Never commit `.env`
