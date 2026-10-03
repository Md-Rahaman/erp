from fastapi import APIRouter, Depends
from sqlalchemy import func, select
from sqlalchemy.orm import Session
from app.api.deps import get_current_user
from app.db.session import get_db
from app.models.employee import Employee
from app.models.user import User

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])

@router.get("/summary")
def summary(_: User = Depends(get_current_user), db: Session = Depends(get_db)):
    total = db.scalar(select(func.count(Employee.id))) or 0
    active = db.scalar(select(func.count(Employee.id)).where(Employee.active.is_(True))) or 0
    average_salary = db.scalar(select(func.avg(Employee.salary))) or 0

    rows = db.execute(
        select(Employee.department, func.count(Employee.id))
        .group_by(Employee.department)
        .order_by(func.count(Employee.id).desc())
    ).all()

    return {
        "total_employees": total,
        "active_employees": active,
        "inactive_employees": total - active,
        "average_salary": round(float(average_salary), 2),
        "departments": [{"department": d, "count": c} for d, c in rows]
    }
