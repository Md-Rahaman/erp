from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session
from app.api.deps import get_current_user
from app.db.session import get_db
from app.models.user import User
from app.schemas.auth import UserResponse
from app.schemas.user import ProfileUpdate

router = APIRouter(prefix="/users", tags=["Users"])

@router.get("/me", response_model=UserResponse)
def profile(user: User = Depends(get_current_user)):
    return user

@router.put("/me", response_model=UserResponse)
def update_profile(
    payload: ProfileUpdate,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    duplicate = db.scalar(select(User).where(User.email == payload.email.lower(), User.id != user.id))
    if duplicate:
        raise HTTPException(status_code=409, detail="Email already in use")
    user.name = payload.name.strip()
    user.email = payload.email.lower()
    db.commit()
    db.refresh(user)
    return user
