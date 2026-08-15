from fastapi import APIRouter, Depends

from .trust import (
    get_current_user,
    require_roles
)


router = APIRouter(
    prefix="/protected",
    tags=["Trust Gateway"]
)


@router.get("/me")
def get_my_access(
    current_user=Depends(get_current_user)
):

    return {
        "message": "Access granted",
        "user": current_user
    }


@router.get("/student")
def student_area(
    current_user=Depends(
        require_roles("student")
    )
):

    return {
        "message": "Student access granted",
        "user": current_user
    }


@router.get("/teacher")
def teacher_area(
    current_user=Depends(
        require_roles("teacher")
    )
):

    return {
        "message": "Teacher access granted",
        "user": current_user
    }


@router.get("/principal")
def principal_area(
    current_user=Depends(
        require_roles("principal")
    )
):

    return {
        "message": "Principal access granted",
        "user": current_user
    }