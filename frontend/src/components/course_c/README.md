# Course Module — ADANI ERP

Drop-in course module for your existing LRP system.
Navbar and Sidebar are **not included** — they stay as your existing components.

---

## 📁 File Structure

```
src/
├── data/
│   └── courseData.js          ← All mock data + helpers (replace with API calls)
│
├── styles/
│   └── courses.css            ← All CSS for the course module
│
├── components/
│   └── course/
│       ├── Icon.jsx           ← Lightweight SVG icon component
│       ├── ProgressRing.jsx   ← Circular SVG progress ring
│       ├── CourseCard.jsx     ← Grid + List card variants
│       ├── ContentItem.jsx    ← Individual content row (video/pdf/quiz etc.)
│       ├── ChapterSection.jsx ← Collapsible chapter accordion
│       └── ContentModal.jsx   ← Popup when clicking a content item
│
└── pages/
    ├── CoursesPage.jsx        ← ⭐ ROOT: handles list ↔ detail routing
    ├── CourseListPage.jsx     ← "My Learning" grid/list with search+filter
    └── CourseDetailPage.jsx   ← Full course view: chapters, tabs, progress
```

---

## ⚡ Integration (3 steps)

### 1. Copy files into your project
Copy the entire `src/` structure above into your existing project.

### 2. Import CSS once (in your App.jsx or index.js)
```js
import "./styles/courses.css";
// OR if you already have a global CSS entry:
// @import './courses.css'; in your main CSS file
```

### 3. Replace your existing course page with CoursesPage
In your router file (e.g. App.jsx):
```jsx
import CoursesPage from "./pages/CoursesPage";

// In your routes:
<Route path="/courses" element={<CoursesPage />} />

// OR if you're using conditional rendering:
{activePage === "courses" && <CoursesPage />}
```

Your **Navbar** and **Sidebar** wrap CoursesPage as normal — no changes needed.

---

## 🔌 Connecting to Your Backend

Replace the mock data in `src/data/courseData.js` with real API calls.

### Courses List
```js
// Instead of COURSES array, fetch from your API:
const [courses, setCourses] = useState([]);
useEffect(() => {
  fetch(`/api/students/${userId}/enrolled-courses`)
    .then(r => r.json())
    .then(setCourses);
}, [userId]);
```

### Progress Tracking
```js
// When a student opens content, POST to mark as viewed:
fetch(`/api/progress`, {
  method: "POST",
  body: JSON.stringify({
    studentId, contentId, status: "viewed"
  })
});
```

### Required API Endpoints
| Endpoint | Description |
|---|---|
| `GET /api/students/:id/courses` | Enrolled courses with progress |
| `GET /api/courses/:id/chapters` | Chapters + content items |
| `GET /api/progress/:studentId/:courseId` | Student progress per content |
| `POST /api/progress` | Mark content as viewed/submitted |
| `POST /api/submissions` | Submit assignment |

---

## 🗄️ Database Schema (recommended)

```sql
-- Enrollment
enrollments (id, student_id, course_id, semester, status, enrolled_at)

-- Content hierarchy
courses     (id, code, name, credits, faculty_id, semester, department)
chapters    (id, course_id, title, order, unlock_condition)
content     (id, chapter_id, type, title, url, duration, due_date)

-- Progress (the critical table)
progress    (id, student_id, content_id, status, completed_at, score)

-- Progress formula:
-- course_progress = COUNT(completed) / COUNT(total_content) * 100
```

---

## 🎨 Matching Your Design System

The CSS uses CSS variables at `:root`. Override any variable to match your ERP:

```css
:root {
  --primary: #2196f3;      /* Your brand blue */
  --primary-dark: #1976d2;
  --primary-light: #e3f2fd;
  /* etc. */
}
```
