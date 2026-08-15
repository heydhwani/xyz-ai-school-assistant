from fastapi import FastAPI

from .database import Base, engine
from . import models


Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="XYZ AI",
    description="Human-Like AI School Assistant",
    version="0.1.0"
)


@app.get("/")
def root():
    return {
        "message": "XYZ AI backend is running 🚀",
        "status": "online"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }