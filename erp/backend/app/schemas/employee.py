from datetime import date, datetime
from pydantic import BaseModel, ConfigDict, EmailStr, Field

class EmployeeBase(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    department: str = Field(min_length=2, max_length=100)
    job_title: str = Field(min_length=2, max_length=120)
    salary: float = Field(ge=0)
    joining_date: date
    active: bool = True

class EmployeeCreate(EmployeeBase):
    pass

class EmployeeUpdate(EmployeeBase):
    pass

class EmployeeResponse(EmployeeBase):
    id: int
    created_at: datetime
    updated_at: datetime
    model_config = ConfigDict(from_attributes=True)

class EmployeePage(BaseModel):
    items: list[EmployeeResponse]
    total: int
    page: int
    page_size: int
    pages: int
