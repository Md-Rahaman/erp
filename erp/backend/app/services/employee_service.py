from fastapi import HTTPException
from sqlalchemy import or_, select, func
from sqlalchemy.orm import Session
from app.models.employee import Employee
from app.schemas.employee import EmployeeCreate, EmployeeUpdate

def list_employees(db: Session, search, department, page, page_size):
    query = select(Employee)
    if search:
        term = f"%{search.strip()}%"
        query = query.where(or_(
            Employee.name.ilike(term),
            Employee.email.ilike(term),
            Employee.job_title.ilike(term)
        ))
    if department:
        query = query.where(Employee.department == department)

    total = db.scalar(select(func.count()).select_from(query.subquery())) or 0
    items = db.scalars(
        query.order_by(Employee.id.desc())
        .offset((page - 1) * page_size)
        .limit(page_size)
    ).all()

    pages = max(1, (total + page_size - 1) // page_size)
    return {"items": items, "total": total, "page": page, "page_size": page_size, "pages": pages}

def get_employee(db: Session, employee_id: int):
    employee = db.get(Employee, employee_id)
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    return employee

def create_employee(db: Session, payload: EmployeeCreate):
    email = payload.email.lower()
    if db.scalar(select(Employee).where(Employee.email == email)):
        raise HTTPException(status_code=409, detail="Employee email already exists")
    employee = Employee(**payload.model_dump())
    employee.email = email
    db.add(employee)
    db.commit()
    db.refresh(employee)
    return employee

def update_employee(db: Session, employee_id: int, payload: EmployeeUpdate):
    employee = get_employee(db, employee_id)
    email = payload.email.lower()
    if db.scalar(select(Employee).where(Employee.email == email, Employee.id != employee_id)):
        raise HTTPException(status_code=409, detail="Employee email already exists")
    for key, value in payload.model_dump().items():
        setattr(employee, key, value)
    employee.email = email
    db.commit()
    db.refresh(employee)
    return employee

def delete_employee(db: Session, employee_id: int):
    employee = get_employee(db, employee_id)
    db.delete(employee)
    db.commit()
