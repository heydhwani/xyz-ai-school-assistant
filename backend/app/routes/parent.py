from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import (
    User,
    ParentChild,
    Enrollment,
    ClassRoom,
    Attendance,
    Assignment,
    AssignmentSubmission,
    Timetable,
)
from .trust import require_roles


router = APIRouter(
    prefix="/parent",
    tags=["Parent Dashboard"]
)


@router.get("/dashboard")
def parent_dashboard(
    current_user=Depends(
        require_roles("parent")
    ),
    db: Session = Depends(get_db)
):

    parent_id = current_user["id"]

    
    # Find parent's child
    

    parent_child = (
        db.query(ParentChild)
        .filter(
            ParentChild.parent_id == parent_id
        )
        .first()
    )

    if not parent_child:
        raise HTTPException(
            status_code=404,
            detail="No child linked to this parent"
        )

    child_id = parent_child.child_id

    
    # Get child
    

    child = (
        db.query(User)
        .filter(
            User.id == child_id,
            User.role == "student"
        )
        .first()
    )

    if not child:
        raise HTTPException(
            status_code=404,
            detail="Child not found"
        )

    
    # Get child's enrollment
    

    enrollment = (
        db.query(Enrollment)
        .filter(
            Enrollment.student_id == child_id
        )
        .first()
    )

    classroom_data = None

    if enrollment:

        classroom = (
            db.query(ClassRoom)
            .filter(
                ClassRoom.id == enrollment.class_id
            )
            .first()
        )

        if classroom:

            classroom_data = {
                "id": classroom.id,
                "name": classroom.name,
                "section": classroom.section,
                "grade": classroom.grade,
            }

    
    # Attendance
    

    attendance_records = (
        db.query(Attendance)
        .filter(
            Attendance.student_id == child_id
        )
        .all()
    )

    total_days = len(attendance_records)

    present_days = sum(
        1
        for record in attendance_records
        if record.status.lower() == "present"
    )

    attendance_percentage = (
        round(
            (present_days / total_days) * 100,
            2
        )
        if total_days > 0
        else 0
    )

    # Assignments
   
    assignments = []

    if enrollment:

        assignment_records = (
            db.query(Assignment)
            .filter(
                Assignment.class_id
                == enrollment.class_id
            )
            .all()
        )

        for assignment in assignment_records:

            submission = (
                db.query(AssignmentSubmission)
                .filter(
                    AssignmentSubmission.assignment_id
                    == assignment.id,
                    AssignmentSubmission.student_id
                    == child_id,
                )
                .first()
            )

            assignments.append({
                "id": assignment.id,
                "title": assignment.title,
                "description": assignment.description,
                "due_date": assignment.due_date,
                "submitted": (
                    submission.submitted
                    if submission
                    else False
                ),
                "score": (
                    submission.score
                    if submission
                    else None
                ),
            })

    
    # Timetable
    

    timetable = []

    if enrollment:

        timetable_records = (
            db.query(Timetable)
            .filter(
                Timetable.class_id
                == enrollment.class_id
            )
            .all()
        )

        for item in timetable_records:

            timetable.append({
                "day": item.day,
                "subject": item.subject,
                "start_time": item.start_time,
                "end_time": item.end_time,
            })

   
    # Final response
    

    return {
        "parent": {
            "id": current_user["id"],
            "role": current_user["role"],
        },

        "child": {
            "id": child.id,
            "name": child.name,
            "email": child.email,
        },

        "class": classroom_data,

        "attendance": {
            "total_days": total_days,
            "present_days": present_days,
            "percentage": attendance_percentage,
        },

        "assignments": assignments,

        "timetable": timetable,
    }