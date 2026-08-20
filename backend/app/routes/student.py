from datetime import date

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel

from ..database import get_db
from ..services.ai_service import generate_student_insight
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


class AssignmentSubmitRequest(BaseModel):
    assignment_id: int


@router.get("/dashboard")
def student_dashboard(
    current_user=Depends(
        require_roles("student")
    ),
    db: Session = Depends(get_db)
):

    student_id = current_user["id"]

    student = (
        db.query(User)
        .filter(
            User.id == student_id
        )
        .first()
    )

    if not student:
        raise HTTPException(
            status_code=404,
            detail="Student not found"
        )

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

    assignments = []

    if enrollment:

        assignment_records = (
            db.query(Assignment)
            .filter(
                Assignment.class_id == enrollment.class_id
            )
            .all()
        )

        for assignment in assignment_records:

            submission = (
                db.query(AssignmentSubmission)
                .filter(
                    AssignmentSubmission.assignment_id == assignment.id,
                    AssignmentSubmission.student_id == student_id
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

    timetable = []

    if enrollment:

        timetable_records = (
            db.query(Timetable)
            .filter(
                Timetable.class_id == enrollment.class_id
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


@router.post("/assignments/submit")
def submit_assignment(
    data: AssignmentSubmitRequest,
    current_user=Depends(
        require_roles("student")
    ),
    db: Session = Depends(get_db)
):

    student_id = current_user["id"]

    assignment = (
        db.query(Assignment)
        .filter(
            Assignment.id == data.assignment_id
        )
        .first()
    )

    if not assignment:
        raise HTTPException(
            status_code=404,
            detail="Assignment not found"
        )

    enrollment = (
        db.query(Enrollment)
        .filter(
            Enrollment.student_id == student_id,
            Enrollment.class_id == assignment.class_id
        )
        .first()
    )

    if not enrollment:
        raise HTTPException(
            status_code=403,
            detail="You are not enrolled in this class"
        )

    submission = (
        db.query(AssignmentSubmission)
        .filter(
            AssignmentSubmission.assignment_id == assignment.id,
            AssignmentSubmission.student_id == student_id
        )
        .first()
    )

    if not submission:
        raise HTTPException(
            status_code=404,
            detail="Submission record not found"
        )

    if submission.submitted:
        raise HTTPException(
            status_code=400,
            detail="Assignment already submitted"
        )

    submission.submitted = True

    db.commit()
    db.refresh(submission)

    return {
        "message": "Assignment submitted successfully",
        "submission": {
            "assignment_id": assignment.id,
            "assignment_title": assignment.title,
            "student_id": student_id,
            "submitted": submission.submitted,
            "score": submission.score
        }
    }


@router.get("/ai-insight")
def student_ai_insight(
    current_user=Depends(
        require_roles("student")
    ),
    db: Session = Depends(get_db)
):

    student_id = current_user["id"]

    student = (
        db.query(User)
        .filter(
            User.id == student_id,
            User.role == "student"
        )
        .first()
    )

    if not student:
        raise HTTPException(
            status_code=404,
            detail="Student not found"
        )

    enrollment = (
        db.query(Enrollment)
        .filter(
            Enrollment.student_id == student_id
        )
        .first()
    )

    if not enrollment:
        raise HTTPException(
            status_code=404,
            detail="Student is not enrolled in any class"
        )

    attendance_records = (
        db.query(Attendance)
        .filter(
            Attendance.student_id == student_id,
            Attendance.class_id == enrollment.class_id
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

    assignment_records = (
        db.query(Assignment)
        .filter(
            Assignment.class_id == enrollment.class_id
        )
        .all()
    )

    pending_assignments = []
    completed_assignments = []
    scores = []

    for assignment in assignment_records:

        submission = (
            db.query(AssignmentSubmission)
            .filter(
                AssignmentSubmission.assignment_id == assignment.id,
                AssignmentSubmission.student_id == student_id
            )
            .first()
        )

        assignment_data = {
            "id": assignment.id,
            "title": assignment.title,
            "due_date": str(assignment.due_date)
        }

        if submission and submission.submitted:

            assignment_data["score"] = submission.score

            completed_assignments.append(
                assignment_data
            )

            if submission.score is not None:
                scores.append(submission.score)

        else:

            pending_assignments.append(
                assignment_data
            )

    average_score = (
        round(
            sum(scores) / len(scores),
            2
        )
        if scores
        else None
    )

    risk_factors = []
    urgent_assignments = []

    today = date.today()

    for assignment in pending_assignments:

        due_date = date.fromisoformat(
            assignment["due_date"]
        )

        days_remaining = (
            due_date - today
        ).days

        assignment["days_remaining"] = days_remaining

        if days_remaining < 0:

            risk_factors.append(
                f"Assignment '{assignment['title']}' is overdue"
            )

            urgent_assignments.append(
                assignment["title"]
            )

        elif days_remaining <= 2:

            risk_factors.append(
                f"Assignment '{assignment['title']}' is due within {days_remaining} days"
            )

            urgent_assignments.append(
                assignment["title"]
            )

    if attendance_percentage < 75:

        risk_factors.append(
            "Attendance is below 75%"
        )

    elif attendance_percentage < 85:

        risk_factors.append(
            "Attendance needs improvement"
        )

    if average_score is not None:

        if average_score < 5:

            risk_factors.append(
                "Assignment performance is low"
            )

        elif average_score < 7:

            risk_factors.append(
                "Assignment performance can be improved"
            )

    if len(pending_assignments) >= 3:

        risk_factors.append(
            "Multiple assignments are pending"
        )

    elif (
        len(pending_assignments) > 0
        and not urgent_assignments
    ):

        risk_factors.append(
            "An assignment is still pending"
        )

    overdue_assignment = any(
        (
            date.fromisoformat(
                assignment["due_date"]
            ) - today
        ).days < 0
        for assignment in pending_assignments
    )

    if (
        attendance_percentage < 75
        or (
            average_score is not None
            and average_score < 5
        )
        or len(pending_assignments) >= 3
        or overdue_assignment
    ):

        risk_level = "HIGH"

    elif (
        attendance_percentage < 85
        or (
            average_score is not None
            and average_score < 7
        )
        or len(pending_assignments) > 0
    ):

        risk_level = "MEDIUM"

    else:

        risk_level = "LOW"

    if not risk_factors:

        risk_factors.append(
            "No major academic risk detected"
        )

    timetable_records = (
        db.query(Timetable)
        .filter(
            Timetable.class_id == enrollment.class_id
        )
        .all()
    )

    timetable = []

    for item in timetable_records:

        timetable.append({
            "day": item.day,
            "subject": item.subject,
            "start_time": item.start_time,
            "end_time": item.end_time
        })

    insight = generate_student_insight(
        student_name=student.name,
        attendance_percentage=attendance_percentage,
        pending_assignments=pending_assignments,
        completed_assignments=completed_assignments,
        average_score=average_score,
        timetable=timetable,
        risk_level=risk_level,
        risk_factors=risk_factors,
        urgent_assignments=urgent_assignments
    )

    return {
        "student": {
            "id": student.id,
            "name": student.name
        },
        "performance": {
            "attendance_percentage": attendance_percentage,
            "average_score": average_score,
            "pending_assignments": len(
                pending_assignments
            ),
            "completed_assignments": len(
                completed_assignments
            )
        },
        "risk_analysis": {
            "level": risk_level,
            "factors": risk_factors,
            "urgent_assignments": urgent_assignments
        },
        "ai_insight": insight
    }