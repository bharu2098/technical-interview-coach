from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.dependencies import get_db
from app.models.user import User
from app.schemas.user import UserLogin, Token
from app.utils.security import verify_password
from app.utils.jwt import create_access_token

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.post("/login", response_model=Token)
def login(user: UserLogin, db: Session = Depends(get_db)):
    print("\n========== LOGIN ATTEMPT ==========")
    print("Email Entered:", user.email)

    db_user = (
        db.query(User)
        .filter(User.email == user.email)
        .first()
    )

    print("User Found:", db_user is not None)

    if not db_user:
        print("❌ User does not exist in database.")
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    print("User ID:", db_user.id)
    print("Stored Email:", db_user.email)
    print("Stored Password Hash:", db_user.hashed_password)

    password_match = verify_password(
        user.password,
        db_user.hashed_password
    )

    print("Password Match:", password_match)

    if not password_match:
        print("❌ Password verification failed.")
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    print("✅ Login Successful")

    access_token = create_access_token(
        {"sub": str(db_user.id)}
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user_id": db_user.id,
        "email": db_user.email
    }