// src/components/course/CourseCard.jsx
// Renders a single course in grid OR list view

import Icon from "./Icon";
import { getProgress, getStatusLabel } from "./courseData";

// ─── helpers ─────────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  return (
    <span className={`status-badge badge--${status}`}>
      {getStatusLabel(status)}
    </span>
  );
}

function FacultyAvatar({ initials }) {
  return <div className="faculty-avatar">{initials}</div>;
}

function ProgressBar({ percent, status }) {
  return (
    <div className="progress-bar-track">
      <div
        className={`progress-bar-fill progress-bar-fill--${status}`}
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}

// ─── GRID CARD ────────────────────────────────────────────────────────────────
function GridCard({ course, onClick }) {
  const prog = getProgress(course);

  return (
    <div className="course-card" onClick={() => onClick(course)}>
      {/* Thumbnail */}
      <div className="course-card__thumbnail">
        {course.thumbnail ? (
          <img src={course.thumbnail} alt={course.name} />
        ) : (
          <div className="course-card__thumbnail-fallback">{course.code}</div>
        )}
        <span className="course-card__code-badge">{course.code}</span>
        {course.grade && (
          <span className={`course-card__grade-badge grade-badge--${prog === 100 ? "great" : "good"}`}>
            Grade: {course.grade}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="course-card__body">
        <h3 className="course-card__name">{course.name}</h3>

        <div className="course-card__meta">
          <div className="course-card__faculty">
            <FacultyAvatar initials={course.facultyAvatar} />
            <span className="faculty-name">{course.faculty}</span>
          </div>
          <div className="course-card__credits">
            <Icon name="book" size={13} color="#9aa0a6" />
            <span>{course.credits} Credit{course.credits !== 1 ? "s" : ""}</span>
          </div>
        </div>

        {/* Progress */}
        <div className="course-card__progress">
          <div className="progress-header">
            <StatusBadge status={course.status} />
            <span className="progress-pct">{prog}%</span>
          </div>
          <ProgressBar percent={prog} status={course.status} />
        </div>
      </div>
    </div>
  );
}

// ─── LIST CARD ────────────────────────────────────────────────────────────────
function ListCard({ course, onClick }) {
  const prog = getProgress(course);

  return (
    <div className="course-card--list" onClick={() => onClick(course)}>
      {/* Thumb */}
      <div className="list-card__thumb">
        {course.thumbnail ? (
          <img src={course.thumbnail} alt={course.name} />
        ) : (
          course.code
        )}
      </div>

      {/* Info */}
      <div className="list-card__info">
        <h3>{course.name}</h3>
        <p>
          {course.faculty} · {course.credits} Credits
        </p>
      </div>

      {/* Progress */}
      <div className="list-card__progress">
        <div className="progress-header">
          <span className="progress-pct" style={{ fontSize: 12, color: "#5f6368" }}>
            Progress
          </span>
          <span className="progress-pct" style={{ color: "#2196f3", fontWeight: 700 }}>
            {prog}%
          </span>
        </div>
        <ProgressBar percent={prog} status={course.status} />
      </div>

      <StatusBadge status={course.status} />
    </div>
  );
}

// ─── EXPORT ───────────────────────────────────────────────────────────────────
export default function CourseCard({ course, onClick, view = "grid" }) {
  return view === "list" ? (
    <ListCard course={course} onClick={onClick} />
  ) : (
    <GridCard course={course} onClick={onClick} />
  );
}
