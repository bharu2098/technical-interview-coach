from sqlalchemy.orm import Session

from app.database import SessionLocal


def get_db():
    """
    Creates a new database session for each request.
    Automatically closes the session after the request completes.
    """
    db: Session = SessionLocal()
    try:
        yield db
    finally:
        db.close()