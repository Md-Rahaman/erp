from datetime import date
from sqlalchemy import select
from app.core.security import hash_password
from app.db.session import SessionLocal
from app.models.user import User
from app.models.employee import Employee

def seed():
    db = SessionLocal()
    try:
        if not db.scalar(select(User).where(User.email == "admin@example.com")):
            db.add(User(
                name="System Admin",
                email="admin@example.com",
                hashed_password=hash_password("Admin@123"),
                role="admin"
            ))

        if not db.scalar(select(User).where(User.email == "user@example.com")):
            db.add(User(
                name="Demo User",
                email="user@example.com",
                hashed_password=hash_password("User@123"),
                role="user"
            ))

        if not db.scalar(select(Employee).limit(1)):
            db.add_all([
                Employee(name="Rahul Sharma", email="rahul@example.com", department="IT",
                         job_title="Software Developer", salary=55000,
                         joining_date=date(2025, 5, 1), active=True),
                Employee(name="Priya Nair", email="priya@example.com", department="HR",
                         job_title="HR Executive", salary=42000,
                         joining_date=date(2025, 7, 15), active=True),
                Employee(name="Arun Kumar", email="arun@example.com", department="Finance",
                         job_title="Accountant", salary=48000,
                         joining_date=date(2024, 11, 10), active=False)
            ])

        db.commit()
        print("Seed completed.")
    finally:
        db.close()

if __name__ == "__main__":
    seed()
