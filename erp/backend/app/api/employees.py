from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.orm import Session
from app.api.deps import get_current_user, require_admin
from app.db.session import get_db
from app.models.user import User
from app.schemas.employee import EmployeeCreate, EmployeePage, EmployeeResponse, EmployeeUpdate
from app.services.employee_service import create_employee, delete_employee, get_employee, list_employees, update_employee

router = APIRouter(prefix="/employees", tags=["Employees"])

@router.get("", response_model=EmployeePage)
def list_api(
    search: str | None = None,
    department: str | None = None,
    page: int = Query(1, ge=1),
    page_size: int = Query(10, ge=1, le=100),
    _: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return list_employees(db, search, department, page, page_size)

@router.get("/{employee_id}", response_model=EmployeeResponse)
def get_api(employee_id: int, _: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return get_employee(db, employee_id)

@router.post("", response_model=EmployeeResponse, status_code=status.HTTP_201_CREATED)
def create_api(payload: EmployeeCreate, _: User = Depends(require_admin), db: Session = Depends(get_db)):
    return create_employee(db, payload)

@router.put("/{employee_id}", response_model=EmployeeResponse)
def update_api(employee_id: int, payload: EmployeeUpdate, _: User = Depends(require_admin), db: Session = Depends(get_db)):
    return update_employee(db, employee_id, payload)

@router.delete("/{employee_id}", status_code=204)
def delete_api(employee_id: int, _: User = Depends(require_admin), db: Session = Depends(get_db)):
    delete_employee(db, employee_id)
