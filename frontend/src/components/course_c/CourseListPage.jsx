// src/pages/CourseListPage.jsx
// "My Learning" page — shows all enrolled courses with search, filter, stats

import { useState, useMemo } from "react";
import { COURSES, getProgress } from "./courseData";
import CourseCard from "./CourseCard";
import Icon from "./Icon";
import "./courses.css";

export default function CourseListPage({ onSelectCourse }) {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterSemester, setFilterSemester] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [view, setView] = useState("grid");

  // ── Derived stats ────────────────────────────────────────────────────
  const totalCourses = COURSES.length;
  const inProgress = COURSES.filter((c) => c.status === "in_progress").length;
  const completed = COURSES.filter((c) => c.status === "completed").length;
  const avgProgress = Math.round(
    COURSES.reduce((s, c) => s + getProgress(c), 0) / totalCourses
  );

  // ── Filtered + sorted courses ────────────────────────────────────────
  const filtered = useMemo(() => {
    let list = COURSES.filter((c) => {
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.code.toLowerCase().includes(q) ||
        c.faculty.toLowerCase().includes(q);
      const matchStatus = filterStatus === "all" || c.status === filterStatus;
      const matchSemester =
        filterSemester === "all" || String(c.semester) === filterSemester;
      return matchSearch && matchStatus && matchSemester;
    });

    if (sortBy === "progress") list = [...list].sort((a, b) => getProgress(b) - getProgress(a));
    if (sortBy === "name") list = [...list].sort((a, b) => a.name.localeCompare(b.name));

    return list;
  }, [search, filterStatus, filterSemester, sortBy]);

  return (
    <div className="course-list-page">
      {/* ── Page Header ── */}
      <div className="page-header">
        <h1>My Learning</h1>
        <p>Continue your journey in computer science</p>
      </div>

      {/* ── Stats Row ── */}
      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-value">{totalCourses}</div>
          <div className="stat-label">Total Courses</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{inProgress}</div>
          <div className="stat-label">In Progress</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{completed}</div>
          <div className="stat-label">Completed</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{avgProgress}%</div>
          <div className="stat-label">Avg Progress</div>
        </div>
      </div>

      {/* ── Filter Bar ── */}
      <div className="filter-bar">
        {/* Search */}
        <div className="search-input-wrap">
          <Icon name="search" size={16} color="#9aa0a6" />
          <input
            className="search-input"
            type="text"
            placeholder="Search courses by name, code, or instructor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Filters + View toggle */}
        <div className="filter-row">
          <div className="filter-selects">
            <select
              className="filter-select"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>

            <select
              className="filter-select"
              value={filterSemester}
              onChange={(e) => setFilterSemester(e.target.value)}
            >
              <option value="all">All Semesters</option>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                <option key={s} value={s}>
                  Semester {s}
                </option>
              ))}
            </select>

            <select
              className="filter-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="recent">Most Recent</option>
              <option value="progress">By Progress</option>
              <option value="name">By Name</option>
            </select>
          </div>

          {/* View Toggle */}
          <div className="view-toggle">
            <button
              className={`view-btn ${view === "grid" ? "active" : ""}`}
              onClick={() => setView("grid")}
              title="Grid view"
            >
              <Icon name="grid" size={16} />
            </button>
            <button
              className={`view-btn ${view === "list" ? "active" : ""}`}
              onClick={() => setView("list")}
              title="List view"
            >
              <Icon name="list" size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Course Count ── */}
      <div className="courses-label">
        <span>{filtered.length} course{filtered.length !== 1 ? "s" : ""}</span>
        <span style={{ fontSize: 13, color: "#9aa0a6" }}>
          {view === "grid" ? "Grid" : "List"} view
        </span>
      </div>

      {/* ── Course Cards ── */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 20px", color: "#9aa0a6" }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>📚</div>
          <p style={{ fontWeight: 600, fontSize: 16 }}>No courses found</p>
          <p style={{ fontSize: 14, marginTop: 4 }}>Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className={view === "grid" ? "course-grid" : "course-list"}>
          {filtered.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onClick={onSelectCourse}
              view={view}
            />
          ))}
        </div>
      )}
    </div>
  );
}
