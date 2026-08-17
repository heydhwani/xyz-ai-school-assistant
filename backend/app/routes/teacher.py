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
    prefix="/teacher",
    tags=["Teacher Dashboard"]
)


@router.get("/dashboard")
def teacher_dashboard(
    current_user=Depends(
        require_roles("teacher")
    ),
    db: Session = Depends(get_db)
):

    teacher_id = current_user["id"]


    # 1. FIND TEACHER'S CLASS
    

    classroom = (
        db.query(ClassRoom)
        .filter(
            ClassRoom.teacher_id == teacher_id
        )
        .first()
    )

    if not classroom:
        raise HTTPException(
            status_code=404,
            detail="No class assigned to this teacher"
        )

    
    # 2. GET STUDENTS
    

    enrollments = (
        db.query(Enrollment)
        .filter(
            Enrollment.class_id == classroom.id
        )
        .all()
    )

    students = []

    for enrollment in enrollments:

        student = (
            db.query(User)
            .filter(
                User.id == enrollment.student_id,
                User.role == "student"
            )
            .first()
        )

        if not student:
            continue

        
        # Student attendance
        
        attendance_records = (
            db.query(Attendance)
            .filter(
                Attendance.student_id == student.id,
                Attendance.class_id == classroom.id,
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

        students.append({
            "id": student.id,
            "name": student.name,
            "email": student.email,
            "attendance": {
                "total_days": total_days,
                "present_days": present_days,
                "percentage": attendance_percentage,
            }
        })

    
    # 3. CLASS ATTENDANCE SUMMARY
    
    total_students = len(students)

    if total_students > 0:

        class_attendance = round(
            sum(
                student["attendance"]["percentage"]
                for student in students
            ) / total_students,
            2
        )

    else:
        class_attendance = 0


    # 4. ASSIGNMENTS
    

    assignment_records = (
        db.query(Assignment)
        .filter(
            Assignment.class_id == classroom.id,
            Assignment.teacher_id == teacher_id,
        )
        .all()
    )

    assignments = []

    for assignment in assignment_records:

        submissions = (
            db.query(AssignmentSubmission)
            .filter(
                AssignmentSubmission.assignment_id
                == assignment.id
            )
            .all()
        )

        total_submissions = len(submissions)

        submitted_count = sum(
            1
            for submission in submissions
            if submission.submitted
        )

        scores = [
            submission.score
            for submission in submissions
            if submission.submitted
            and submission.score is not None
        ]

        average_score = (
            round(
                sum(scores) / len(scores),
                2
            )
            if scores
            else None
        )

        assignments.append({
            "id": assignment.id,
            "title": assignment.title,
            "description": assignment.description,
            "due_date": assignment.due_date,
            "total_students": total_students,
            "submitted": submitted_count,
            "pending": (
                total_students - submitted_count
            ),
            "average_score": average_score,
        })

    
    # 5. TIMETABLE
    

    timetable_records = (
        db.query(Timetable)
        .filter(
            Timetable.class_id == classroom.id,
            Timetable.teacher_id == teacher_id,
        )
        .all()
    )

    timetable = []

    for item in timetable_records:

        timetable.append({
            "day": item.day,
            "subject": item.subject,
            "start_time": item.start_time,
            "end_time": item.end_time,
        })

    
    # 6. CLASS PERFORMANCE
    
    all_scores = []

    for assignment in assignment_records:

        submissions = (
            db.query(AssignmentSubmission)
            .filter(
                AssignmentSubmission.assignment_id
                == assignment.id,
                AssignmentSubmission.submitted == True,
            )
            .all()
        )

        for submission in submissions:

            if submission.score is not None:
                all_scores.append(
                    submission.score
                )

    class_average_score = (
        round(
            sum(all_scores) / len(all_scores),
            2
        )
        if all_scores
        else None
    )

    
    # 7. FINAL RESPONSE
    
    return {

        "teacher": {
            "id": current_user["id"],
            "name": current_user.get("name"),
            "role": current_user["role"],
        },

        "class": {
            "id": classroom.id,
            "name": classroom.name,
            "section": classroom.section,
            "grade": classroom.grade,
        },

        "summary": {
            "total_students": total_students,
            "attendance_percentage": class_attendance,
            "total_assignments": len(assignments),
            "class_average_score": class_average_score,
        },

        "students": students,

        "assignments": assignments,

        "timetable": timetable,
    }