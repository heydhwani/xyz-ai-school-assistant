from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import (
    User,
    ClassRoom,
    Enrollment,
    Attendance,
    Assignment,
    AssignmentSubmission,
)
from .trust import require_roles


router = APIRouter(
    prefix="/principal",
    tags=["Principal Dashboard"]
)


@router.get("/dashboard")
def principal_dashboard(
    current_user=Depends(
        require_roles("principal")
    ),
    db: Session = Depends(get_db)
):

    
    # 1. BASIC SCHOOL COUNTS
    

    total_students = (
        db.query(User)
        .filter(User.role == "student")
        .count()
    )

    total_teachers = (
        db.query(User)
        .filter(User.role == "teacher")
        .count()
    )

    total_classes = (
        db.query(ClassRoom)
        .count()
    )

    
    # 2. OVERALL ATTENDANCE
    

    attendance_records = (
        db.query(Attendance)
        .all()
    )

    total_days = len(attendance_records)

    present_days = sum(
        1
        for record in attendance_records
        if record.status.lower() == "present"
    )

    overall_attendance = (
        round(
            (present_days / total_days) * 100,
            2
        )
        if total_days > 0
        else 0
    )

   
    # 3. CLASS INFORMATION
    

    classes = []

    classroom_records = (
        db.query(ClassRoom)
        .all()
    )

    for classroom in classroom_records:

        teacher = (
            db.query(User)
            .filter(
                User.id == classroom.teacher_id,
                User.role == "teacher"
            )
            .first()
        )

        student_count = (
            db.query(Enrollment)
            .filter(
                Enrollment.class_id == classroom.id
            )
            .count()
        )

        classes.append({
            "id": classroom.id,
            "name": classroom.name,
            "section": classroom.section,
            "grade": classroom.grade,
            "teacher": (
                {
                    "id": teacher.id,
                    "name": teacher.name,
                    "email": teacher.email
                }
                if teacher
                else None
            ),
            "student_count": student_count
        })

    
    # 4. ASSIGNMENTS
    

    assignment_records = (
        db.query(Assignment)
        .all()
    )

    total_assignments = len(
        assignment_records
    )

    total_submissions = 0

    scores = []

    for assignment in assignment_records:

        submissions = (
            db.query(AssignmentSubmission)
            .filter(
                AssignmentSubmission.assignment_id
                == assignment.id
            )
            .all()
        )

        for submission in submissions:

            if submission.submitted:
                total_submissions += 1

            if (
                submission.submitted
                and submission.score is not None
            ):
                scores.append(
                    submission.score
                )

    average_score = (
        round(
            sum(scores) / len(scores),
            2
        )
        if scores
        else None
    )

    
    # 5. TEACHER LIST
    

    teacher_records = (
        db.query(User)
        .filter(User.role == "teacher")
        .all()
    )

    teachers = []

    for teacher in teacher_records:

        teacher_classes = (
            db.query(ClassRoom)
            .filter(
                ClassRoom.teacher_id == teacher.id
            )
            .all()
        )

        teachers.append({
            "id": teacher.id,
            "name": teacher.name,
            "email": teacher.email,
            "classes": [
                {
                    "id": classroom.id,
                    "name": classroom.name,
                    "section": classroom.section
                }
                for classroom in teacher_classes
            ]
        })

    
    # 6. FINAL RESPONSE
    

    return {

        "principal": {
            "id": current_user["id"],
            "name": current_user.get("name"),
            "role": current_user["role"]
        },

        "summary": {
            "total_students": total_students,
            "total_teachers": total_teachers,
            "total_classes": total_classes,
            "overall_attendance": overall_attendance,
            "total_assignments": total_assignments,
            "total_submissions": total_submissions,
            "average_assignment_score": average_score
        },

        "classes": classes,

        "teachers": teachers
    }