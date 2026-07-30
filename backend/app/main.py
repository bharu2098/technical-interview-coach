from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.database import Base, engine
import app.models

from app.api.user import router as user_router
from app.api.auth import router as auth_router
from app.api.interview import router as interview_router

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="AI-powered Technical Interview Coach API"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://technical-interview-coach.vercel.app",
        "https://technical-interview-coach-rirvvjiks-bhgs-projects-019873cb.vercel.app",
    ],
    allow_origin_regex=r"https://.*\.vercel\.app",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user_router)
app.include_router(auth_router)
app.include_router(interview_router)


@app.get("/")
def root():
    return {
        "message": "Welcome to Technical Interview Coach API",
        "status": "Running"
    }


@app.get("/health")
def health():
    return {
        "status": "Healthy",
        "version": settings.APP_VERSION
    }