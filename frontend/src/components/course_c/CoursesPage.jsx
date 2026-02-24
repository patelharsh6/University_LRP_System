// src/pages/CoursesPage.jsx
// Root component for the Courses module.
// Drop this wherever your existing router renders "My Courses".
// It manages the internal state: list view ↔ detail view.
//
// INTEGRATION:
//   Your existing routing setup just needs to render <CoursesPage />
//   when the user navigates to /courses or selects "My Courses" in the sidebar.
//   The Navbar and Sidebar remain your existing components — untouched.

import { useState } from "react";
import CourseListPage from "./CourseListPage";
import CourseDetailPage from "./CourseDetailPage";

export default function CoursesPage() {
  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleSelectCourse = (course) => {
    setSelectedCourse(course);
    // Scroll to top when opening detail
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setSelectedCourse(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (selectedCourse) {
    return (
      <CourseDetailPage
        course={selectedCourse}
        onBack={handleBack}
      />
    );
  }

  return (
    <CourseListPage onSelectCourse={handleSelectCourse} />
  );
}
