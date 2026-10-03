from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import auth, dashboard, employees, users
from app.core.config import settings

app = FastAPI(
    title="Employee Management API",
    version="1.0.0",
    description="Internship Employee Management REST API"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(auth.router, prefix="/api")
app.include_router(users.router, prefix="/api")
app.include_router(employees.router, prefix="/api")
app.include_router(dashboard.router, prefix="/api")

@app.get("/api/health", tags=["Health"])
def health():
    return {"status": "ok"}
