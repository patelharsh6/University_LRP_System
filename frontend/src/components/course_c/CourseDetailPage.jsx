// src/pages/CourseDetailPage.jsx
// Full detail view for a single course: hero, stats, tabs (content/assignments/grades)

import { useState } from "react";
import { CHAPTERS, getProgress } from "./courseData";
import ChapterSection from "./ChapterSection";
import ContentModal from "./ContentModal";
import ProgressRing from "./ProgressRing";
import Icon from "./Icon";
import "./courses.css";

// ─── Tabs ─────────────────────────────────────────────────────────────────────
const TABS = [
  { key: "content",     label: "Course Content", icon: "book" },
  { key: "assignments", label: "Assignments",     icon: "assignment" },
  { key: "grades",      label: "Grades",          icon: "bar-chart" },
];

// ─── Assignments Tab ──────────────────────────────────────────────────────────
function AssignmentsTab({ chapters }) {
  const assignments = chapters.flatMap((ch) =>
    ch.items.filter((i) => i.type === "assignment" || i.type === "quiz")
  );

  const statusClass = (s) => ({
    submitted:   "assignment-status--submitted",
    completed:   "assignment-status--completed",
    not_started: "assignment-status--not_started",
    locked:      "assignment-status--locked",
  }[s] || "assignment-status--not_started");

  const statusLabel = (s) => ({
    submitted: "Submitted", completed: "Completed",
    not_started: "Pending", locked: "Locked",
  }[s] || s);

  const typeIconClass = (t) =>
    ({ assignment: "type-icon--assignment", quiz: "type-icon--quiz" }[t] || "");

  return (
    <div className="assignments-list">
      {assignments.map((item) => (
        <div key={item.id} className="assignment-row">
          <div className={`assignment-row__icon content-type-icon ${typeIconClass(item.type)}`}>
            <Icon name={item.type} size={18} />
          </div>
          <div className="assignment-row__info">
            <h4>{item.title}</h4>
            <p>
              {item.due ? `Due: ${item.due}` : ""}
              {item.questions ? `${item.questions} questions` : ""}
            </p>
          </div>
          {item.grade && (
            <span className="score-chip score-chip--grade">Grade: {item.grade}</span>
          )}
          {item.score && (
            <span className="score-chip score-chip--score">{item.score}%</span>
          )}
          <span className={`assignment-row__status ${statusClass(item.status)}`}>
            {statusLabel(item.status)}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Grades Tab ───────────────────────────────────────────────────────────────
function GradesTab() {
  const gradeItems = [
    { label: "Assignments", value: "A (92%)", color: "#2196f3" },
    { label: "Quizzes",     value: "85%",     color: "#9c27b0" },
    { label: "Labs",        value: "Pass",    color: "#4caf50" },
    { label: "Overall",     value: "89%",     color: "#ff9800" },
  ];

  return (
    <div>
      <div className="grades-grid">
        {gradeItems.map((g) => (
          <div className="grade-card" key={g.label}>
            <div className="grade-card__value" style={{ color: g.color }}>
              {g.value}
            </div>
            <div className="grade-card__label">{g.label}</div>
          </div>
        ))}
      </div>
      <div style={{
        background: "#fff", border: "1px solid #e0e0e0", borderRadius: 14,
        padding: "20px 24px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)"
      }}>
        <p style={{ fontWeight: 700, color: "#1a1a2e", marginBottom: 14 }}>
          Grade Breakdown
        </p>
        {[
          { label: "Chapter Quizzes (2 completed)", score: 85, color: "#9c27b0" },
          { label: "Lab Sessions (2 completed)", score: 100, color: "#4caf50" },
          { label: "Assignments (1 submitted)", score: 92, color: "#2196f3" },
          { label: "Overall Completion", score: 58, color: "#ff9800" },
        ].map((item) => (
          <div key={item.label} style={{ marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
              <span style={{ fontSize: 13, color: "#5f6368" }}>{item.label}</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: item.color }}>{item.score}%</span>
            </div>
            <div style={{ background: "#f0f0f0", borderRadius: 999, height: 6 }}>
              <div style={{
                width: `${item.score}%`, background: item.color,
                borderRadius: 999, height: "100%",
                transition: "width 0.8s cubic-bezier(.4,0,.2,1)"
              }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function CourseDetailPage({ course, onBack }) {
  const [activeTab, setActiveTab] = useState("content");
  const [activeItem, setActiveItem] = useState(null);

  const chapters = CHAPTERS[course.id] || [];
  const prog = getProgress(course);

  const totalItems = chapters.reduce((s, c) => s + c.items.length, 0);
  const doneItems = chapters.reduce(
    (s, c) => s + c.items.filter((i) => i.status === "completed" || i.status === "submitted").length,
    0
  );

  return (
    <div className="course-detail-page">
      {/* ── Back Button ── */}
      <button className="back-btn" onClick={onBack}>
        <Icon name="back" size={15} />
        Back to Courses
      </button>

      {/* ── Hero ── */}
      <div className="detail-hero">
        {course.thumbnail ? (
          <img className="detail-hero__img" src={course.thumbnail} alt={course.name} />
        ) : (
          <div className="detail-hero__img" style={{
            background: "linear-gradient(135deg, #1565c0, #42a5f5)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 40, fontWeight: 900, color: "#fff"
          }}>
            {course.code}
          </div>
        )}

        <div className="detail-hero__overlay">
          {/* Left content */}
          <div className="detail-hero__content">
            <span className="detail-hero__code">{course.code} · Semester {course.semester}</span>
            <h1 className="detail-hero__title">{course.name}</h1>
            <div className="detail-hero__meta">
              <div className="detail-hero__meta-item">
                <div className="faculty-avatar faculty-avatar--sm" style={{ background: "rgba(255,255,255,0.25)" }}>
                  {course.facultyAvatar}
                </div>
                {course.faculty}
              </div>
              <div className="detail-hero__meta-item">
                <Icon name="book" size={14} color="rgba(255,255,255,0.8)" />
                {course.credits} Credits
              </div>
              <div className="detail-hero__meta-item">
                <Icon name="clock" size={14} color="rgba(255,255,255,0.8)" />
                {course.schedule}
              </div>
            </div>
          </div>

          {/* Progress ring */}
          <div className="detail-hero__progress-box">
            <div className="progress-ring-wrap">
              <ProgressRing
                percent={prog}
                size={80}
                stroke={7}
                color="#fff"
                trackColor="rgba(255,255,255,0.25)"
              />
              <div className="progress-ring-label">{prog}%</div>
            </div>
            <p>Your Progress</p>
            <p style={{ marginTop: 4, fontSize: 10 }}>
              {doneItems}/{totalItems} items
            </p>
          </div>
        </div>
      </div>

      {/* ── Quick Stats ── */}
      <div className="detail-stats-strip">
        {[
          { icon: "book", iconClass: "detail-stat__icon--blue", label: "Total Chapters", value: course.chapters },
          { icon: "eye",  iconClass: "detail-stat__icon--green", label: "Items Completed", value: `${doneItems}/${totalItems}` },
          { icon: "clock", iconClass: "detail-stat__icon--orange", label: "Schedule", value: course.schedule.split("·")[0].trim() },
          { icon: "award", iconClass: "detail-stat__icon--purple", label: "Current Grade", value: course.grade || "—" },
        ].map((s) => (
          <div className="detail-stat" key={s.label}>
            <div className={`detail-stat__icon ${s.iconClass}`}>
              <Icon name={s.icon} size={20} />
            </div>
            <div>
              <div className="detail-stat__value">{s.value}</div>
              <div className="detail-stat__label">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Tabs ── */}
      <div className="detail-tabs">
        {TABS.map((t) => (
          <button
            key={t.key}
            className={`tab-btn ${activeTab === t.key ? "active" : ""}`}
            onClick={() => setActiveTab(t.key)}
          >
            <Icon name={t.icon} size={15} />
            {t.label}
          </button>
        ))}
      </div>

      {/* ── Tab Content ── */}
      {activeTab === "content" && (
        <div>
          {chapters.length === 0 ? (
            <div style={{ textAlign: "center", padding: 60, color: "#9aa0a6" }}>
              <p style={{ fontSize: 16, fontWeight: 600 }}>No chapters available yet</p>
            </div>
          ) : (
            chapters.map((ch, i) => (
              <ChapterSection
                key={ch.id}
                chapter={ch}
                defaultOpen={i < 2}
                onItemOpen={setActiveItem}
              />
            ))
          )}
        </div>
      )}

      {activeTab === "assignments" && <AssignmentsTab chapters={chapters} />}
      {activeTab === "grades" && <GradesTab />}

      {/* ── Modal ── */}
      <ContentModal item={activeItem} onClose={() => setActiveItem(null)} />
    </div>
  );
}
