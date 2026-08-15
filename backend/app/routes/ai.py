from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field

from ..services.ai_service import generate_ai_response
from .trust import get_current_user


router = APIRouter(
    prefix="/ai",
    tags=["AI Assistant"]
)


class ChatRequest(BaseModel):
    message: str = Field(
        min_length=1,
        max_length=2000
    )


class ChatResponse(BaseModel):
    response: str
    user_id: int
    role: str


@router.post("/chat", response_model=ChatResponse)
def chat(
    data: ChatRequest,
    current_user=Depends(get_current_user)
):
    try:
        ai_response = generate_ai_response(
            message=data.message,
            user_role=current_user["role"]
        )

        return {
            "response": ai_response,
            "user_id": current_user["id"],
            "role": current_user["role"]
        }

    except Exception as exc:
        raise HTTPException(
            status_code=503,
            detail=f"AI service unavailable: {str(exc)}"
        )