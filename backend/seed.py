from datetime import date, timedelta

from app.database import SessionLocal
from app.models import (
    User,
    ClassRoom,
    Enrollment,
    ParentChild,
    Attendance,
    Assignment,
    AssignmentSubmission,
    Timetable,
)
from app.auth import hash_password


db = SessionLocal()


def seed_database():

    # ========================================================
    # 1. USERS
    # ========================================================

    student = (
        db.query(User)
        .filter(User.email == "surbhi@example.com")
        .first()
    )

    if not student:
        student = User(
            name="Surbhi",
            email="surbhi@example.com",
            password_hash=hash_password("Test@12345"),
            role="student",
        )
        db.add(student)
        db.commit()
        db.refresh(student)

    teacher = (
        db.query(User)
        .filter(User.email == "teacher@xyzai.com")
        .first()
    )

    if not teacher:
        teacher = User(
            name="Mr. Sharma",
            email="teacher@xyzai.com",
            password_hash=hash_password("Teacher@123"),
            role="teacher",
        )
        db.add(teacher)
        db.commit()
        db.refresh(teacher)

    parent = (
        db.query(User)
        .filter(User.email == "parent@xyzai.com")
        .first()
    )

    if not parent:
        parent = User(
            name="Rahul's Parent",
            email="parent@xyzai.com",
            password_hash=hash_password("Parent@123"),
            role="parent",
        )
        db.add(parent)
        db.commit()
        db.refresh(parent)

    principal = (
        db.query(User)
        .filter(User.email == "principal@xyzai.com")
        .first()
    )

    if not principal:
        principal = User(
            name="Dr. Mehta",
            email="principal@xyzai.com",
            password_hash=hash_password("Principal@123"),
            role="principal",
        )
        db.add(principal)
        db.commit()
        db.refresh(principal)

    # ========================================================
    # 2. CLASSROOM
    # ========================================================

    classroom = (
        db.query(ClassRoom)
        .filter(
            ClassRoom.name == "Class 10",
            ClassRoom.section == "A",
        )
        .first()
    )

    if not classroom:
        classroom = ClassRoom(
            name="Class 10",
            section="A",
            grade=10,
            teacher_id=teacher.id,
        )
        db.add(classroom)
        db.commit()
        db.refresh(classroom)

    # ========================================================
    # 3. STUDENT ENROLLMENT
    # ========================================================

    enrollment = (
        db.query(Enrollment)
        .filter(
            Enrollment.student_id == student.id,
            Enrollment.class_id == classroom.id,
        )
        .first()
    )

    if not enrollment:
        enrollment = Enrollment(
            student_id=student.id,
            class_id=classroom.id,
        )
        db.add(enrollment)

    # ========================================================
    # 4. PARENT - CHILD
    # ========================================================

    parent_child = (
        db.query(ParentChild)
        .filter(
            ParentChild.parent_id == parent.id,
            ParentChild.child_id == student.id,
        )
        .first()
    )

    if not parent_child:
        parent_child = ParentChild(
            parent_id=parent.id,
            child_id=student.id,
        )
        db.add(parent_child)

    db.commit()

    # ========================================================
    # 5. ATTENDANCE
    # ========================================================

    existing_attendance = (
        db.query(Attendance)
        .filter(
            Attendance.student_id == student.id,
            Attendance.class_id == classroom.id,
        )
        .count()
    )

    if existing_attendance == 0:

        start_date = date.today() - timedelta(days=26)

        for i in range(27):

            attendance_date = start_date + timedelta(days=i)

            # 24 present, 3 absent
            status = "present" if i not in [4, 12, 20] else "absent"

            attendance = Attendance(
                student_id=student.id,
                class_id=classroom.id,
                date=attendance_date,
                status=status,
            )

            db.add(attendance)

        db.commit()

    # ========================================================
    # 6. ASSIGNMENTS
    # ========================================================

    math_assignment = (
        db.query(Assignment)
        .filter(
            Assignment.title == "Mathematics Assignment",
            Assignment.class_id == classroom.id,
        )
        .first()
    )

    if not math_assignment:

        math_assignment = Assignment(
            teacher_id=teacher.id,
            class_id=classroom.id,
            title="Mathematics Assignment",
            description="Complete exercises from Chapter 5.",
            due_date=date.today() + timedelta(days=3),
        )

        db.add(math_assignment)
        db.commit()
        db.refresh(math_assignment)

    science_assignment = (
        db.query(Assignment)
        .filter(
            Assignment.title == "Science Project",
            Assignment.class_id == classroom.id,
        )
        .first()
    )

    if not science_assignment:

        science_assignment = Assignment(
            teacher_id=teacher.id,
            class_id=classroom.id,
            title="Science Project",
            description="Prepare a project on renewable energy.",
            due_date=date.today() + timedelta(days=5),
        )

        db.add(science_assignment)
        db.commit()
        db.refresh(science_assignment)

    # ========================================================
    # 7. ASSIGNMENT SUBMISSIONS
    # ========================================================

    submission = (
        db.query(AssignmentSubmission)
        .filter(
            AssignmentSubmission.assignment_id
            == science_assignment.id,
            AssignmentSubmission.student_id
            == student.id,
        )
        .first()
    )

    if not submission:

        submission = AssignmentSubmission(
            assignment_id=science_assignment.id,
            student_id=student.id,
            submitted=True,
            score=9,
        )

        db.add(submission)

    math_submission = (
        db.query(AssignmentSubmission)
        .filter(
            AssignmentSubmission.assignment_id
            == math_assignment.id,
            AssignmentSubmission.student_id
            == student.id,
        )
        .first()
    )

    if not math_submission:

        math_submission = AssignmentSubmission(
            assignment_id=math_assignment.id,
            student_id=student.id,
            submitted=False,
        )

        db.add(math_submission)

    db.commit()

    # ========================================================
    # 8. TIMETABLE
    # ========================================================

    timetable_exists = (
        db.query(Timetable)
        .filter(
            Timetable.class_id == classroom.id
        )
        .count()
    )

    if timetable_exists == 0:

        timetable_data = [
            ("Monday", "Mathematics", "09:00", "10:00"),
            ("Monday", "Physics", "10:00", "11:00"),
            ("Monday", "Computer Science", "11:30", "12:30"),
            ("Tuesday", "English", "09:00", "10:00"),
            ("Tuesday", "Chemistry", "10:00", "11:00"),
            ("Tuesday", "Mathematics", "11:30", "12:30"),
            ("Wednesday", "Computer Science", "09:00", "10:00"),
            ("Wednesday", "Physics", "10:00", "11:00"),
            ("Thursday", "Mathematics", "09:00", "10:00"),
            ("Thursday", "English", "10:00", "11:00"),
            ("Friday", "Chemistry", "09:00", "10:00"),
            ("Friday", "Computer Science", "10:00", "11:00"),
        ]

        for day, subject, start_time, end_time in timetable_data:

            item = Timetable(
                class_id=classroom.id,
                day=day,
                subject=subject,
                start_time=start_time,
                end_time=end_time,
                teacher_id=teacher.id,
            )

            db.add(item)

        db.commit()

    print()
    print("==========================================")
    print(" XYZ AI SCHOOL DATABASE SEEDED SUCCESSFULLY ")
    print("==========================================")
    print()
    print(f"Student ID: {student.id}")
    print(f"Student: {student.name}")
    print(f"Class: {classroom.name}-{classroom.section}")
    print("Attendance: 24 / 27")
    print("Assignments: 2")
    print("Timetable: Added")
    print()
    print("Demo accounts:")
    print("Student   : surbhi@example.com")
    print("Teacher   : teacher@xyzai.com")
    print("Parent    : parent@xyzai.com")
    print("Principal : principal@xyzai.com")
    print()


if __name__ == "__main__":

    try:
        seed_database()

    except Exception as error:

        db.rollback()

        print()
        print("ERROR WHILE SEEDING DATABASE:")
        print(error)
        print()

    finally:
        db.close()