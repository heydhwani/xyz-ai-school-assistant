from fastapi import FastAPI
from .routes.student import router as student_router
from .routes.parent import router as parent_router
from .routes.teacher import router as teacher_router
from .routes.principal import router as principal_router
from .database import Base, engine
from . import models

from .routes.auth import router as auth_router
from .routes.protected import router as protected_router
from .routes.ai import router as ai_router



Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="XYZ AI",
    description="Human-Like AI School Assistant",
    version="0.3.0"
)


app.include_router(auth_router)
app.include_router(protected_router)
app.include_router(ai_router)
app.include_router(student_router)
app.include_router(parent_router)
app.include_router(teacher_router)
app.include_router(principal_router)


@app.get("/")
def root():

    return {
        "message": "XYZ AI backend is running ..",
        "status": "online"
    }


@app.get("/health")
def health():

    return {
        "status": "healthy"
    }