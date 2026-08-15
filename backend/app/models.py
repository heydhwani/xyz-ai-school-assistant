from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    Date,
    ForeignKey,
    Boolean,
    UniqueConstraint,
)

from .database import Base


class User(Base):

    __tablename__ = "users"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    name = Column(
        String,
        nullable=False
    )

    email = Column(
        String,
        unique=True,
        index=True,
        nullable=False
    )

    password_hash = Column(
        String,
        nullable=False
    )

    role = Column(
        String,
        nullable=False,
        default="student"
    )



class ClassRoom(Base):

    __tablename__ = "classrooms"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    name = Column(
        String(50),
        nullable=False
    )

    section = Column(
        String(10),
        nullable=False
    )

    grade = Column(
        Integer,
        nullable=False
    )

    teacher_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=True
    )



class Enrollment(Base):

    __tablename__ = "enrollments"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    student_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    class_id = Column(
        Integer,
        ForeignKey("classrooms.id"),
        nullable=False
    )

    __table_args__ = (
        UniqueConstraint(
            "student_id",
            "class_id",
            name="unique_student_class"
        ),
    )



class ParentChild(Base):

    __tablename__ = "parent_children"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    parent_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    child_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    __table_args__ = (
        UniqueConstraint(
            "parent_id",
            "child_id",
            name="unique_parent_child"
        ),
    )



class Attendance(Base):

    __tablename__ = "attendance"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    student_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    class_id = Column(
        Integer,
        ForeignKey("classrooms.id"),
        nullable=False
    )

    date = Column(
        Date,
        nullable=False
    )

    status = Column(
        String(20),
        nullable=False
    )

    __table_args__ = (
        UniqueConstraint(
            "student_id",
            "class_id",
            "date",
            name="unique_daily_attendance"
        ),
    )


class Assignment(Base):

    __tablename__ = "assignments"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    teacher_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    class_id = Column(
        Integer,
        ForeignKey("classrooms.id"),
        nullable=False
    )

    title = Column(
        String(200),
        nullable=False
    )

    description = Column(
        Text,
        nullable=True
    )

    due_date = Column(
        Date,
        nullable=False
    )



class AssignmentSubmission(Base):

    __tablename__ = "assignment_submissions"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    assignment_id = Column(
        Integer,
        ForeignKey("assignments.id"),
        nullable=False
    )

    student_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    submitted = Column(
        Boolean,
        default=False
    )

    score = Column(
        Integer,
        nullable=True
    )

    __table_args__ = (
        UniqueConstraint(
            "assignment_id",
            "student_id",
            name="unique_assignment_student"
        ),
    )



class Timetable(Base):

    __tablename__ = "timetable"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    class_id = Column(
        Integer,
        ForeignKey("classrooms.id"),
        nullable=False
    )

    day = Column(
        String(20),
        nullable=False
    )

    subject = Column(
        String(100),
        nullable=False
    )

    start_time = Column(
        String(10),
        nullable=False
    )

    end_time = Column(
        String(10),
        nullable=False
    )

    teacher_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )