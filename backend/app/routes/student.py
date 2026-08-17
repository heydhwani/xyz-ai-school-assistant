from datetime import date

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import (
    User,
    ClassRoom,
    Enrollment,
    Attendance,
    Assignment,
    AssignmentSubmission,
    Timetable,
)
from .trust import require_roles


router = APIRouter(
    prefix="/student",
    tags=["Student Dashboard"]
)


@router.get("/dashboard")
def student_dashboard(
    current_user=Depends(
        require_roles("student")
    ),
    db: Session = Depends(get_db)
):

    student_id = current_user["id"]

    # --------------------------------------------------------
    # Get student
    # --------------------------------------------------------

    student = (
        db.query(User)
        .filter(User.id == student_id)
        .first()
    )

    if not student:
        raise HTTPException(
            status_code=404,
            detail="Student not found"
        )

    # --------------------------------------------------------
    # Get student's enrollment
    # --------------------------------------------------------

    enrollment = (
        db.query(Enrollment)
        .filter(
            Enrollment.student_id == student_id
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

    # --------------------------------------------------------
    # Attendance
    # --------------------------------------------------------

    attendance_records = (
        db.query(Attendance)
        .filter(
            Attendance.student_id == student_id
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

    # --------------------------------------------------------
    # Assignments
    # --------------------------------------------------------

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
                db.query(
                    AssignmentSubmission
                )
                .filter(
                    AssignmentSubmission.assignment_id
                    == assignment.id,
                    AssignmentSubmission.student_id
                    == student_id
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

    # --------------------------------------------------------
    # Timetable
    # --------------------------------------------------------

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

    # --------------------------------------------------------
    # Final dashboard response
    # --------------------------------------------------------

    return {
        "student": {
            "id": student.id,
            "name": student.name,
            "email": student.email,
            "role": student.role,
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