// src/pages/CourseManagement.jsx
import React, { useState } from 'react';
import './CourseManagement.css';
import { 
  FaBookOpen, FaUsers, FaTasks, FaQrcode, 
  FaPlus, FaEdit, FaTrash, FaFilePdf, FaVideo, FaGripVertical
} from 'react-icons/fa';

const CourseManagement = () => {
  // --- STATE ---
  const [selectedCourseId, setSelectedCourseId] = useState(1);
  const [activeTab, setActiveTab] = useState('overview'); // overview, content, assignments, students, attendance

  // --- MOCK DATA ---
  const facultyCourses = [
    { 
      id: 1, name: "Data Structures & Algorithms", code: "CS101", sem: "Semester 6", 
      students: 120, progress: 65, pendingGrading: 15, status: "Active" 
    },
    { 
      id: 2, name: "Database Management Systems", code: "CS102", sem: "Semester 6", 
      students: 115, progress: 40, pendingGrading: 0, status: "Active" 
    },
    { 
      id: 3, name: "Operating Systems", code: "CS201", sem: "Semester 5", 
      students: 110, progress: 100, pendingGrading: 0, status: "Completed" 
    }
  ];

  const activeCourse = facultyCourses.find(c => c.id === parseInt(selectedCourseId)) || facultyCourses[0];

  return (
    <div className="management-wrapper">
      
      {/* 📱 MOBILE DROPDOWN (Replaces Sidebar on small screens) */}
      <select 
        className="mobile-course-selector"
        value={selectedCourseId}
        onChange={(e) => setSelectedCourseId(e.target.value)}
      >
        {facultyCourses.map(course => (
          <option key={course.id} value={course.id}>
            {course.code} - {course.name}
          </option>
        ))}
      </select>

      {/* 🟦 LEFT SIDEBAR (Desktop) */}
      <div className="course-sidebar">
        <div className="sidebar-header">
          <h3><FaBookOpen style={{ color: '#0EA5E9', marginRight: '8px' }}/> My Courses</h3>
        </div>
        <div className="course-list-scroll">
          {facultyCourses.map(course => (
            <div 
              key={course.id} 
              className={`sidebar-course-item ${selectedCourseId === course.id ? 'active' : ''}`}
              onClick={() => setSelectedCourseId(course.id)}
            >
              <div className="sc-title">{course.name}</div>
              <div className="sc-meta">
                <span>{course.code}</span>
                <span>{course.sem}</span>
              </div>
              <div className="sc-badges">
                <span className="sc-badge"><FaUsers/> {course.students}</span>
                {course.pendingGrading > 0 && (
                  <span className="sc-badge alert">{course.pendingGrading} to grade</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🟩 RIGHT PANEL (Management Area) */}
      <div className="management-panel">
        
        <div className="panel-header">
          <div className="panel-title">{activeCourse.name}</div>
          <div className="panel-meta">{activeCourse.code} • {activeCourse.sem} • {activeCourse.status}</div>
          
          {/* TABS */}
          <div className="panel-tabs">
            {['overview', 'content', 'assignments', 'students', 'attendance'].map(tab => (
              <button 
                key={tab}
                className={`p-tab ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
                style={{ textTransform: 'capitalize' }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* SCROLLABLE TAB CONTENT */}
        <div className="panel-content-scroll">
          
          {/* 📘 TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="tab-fade-in">
              <div className="overview-grid">
                <div className="o-card">
                  <div className="o-card-title">Total Students</div>
                  <div className="o-card-value">{activeCourse.students}</div>
                </div>
                <div className="o-card">
                  <div className="o-card-title">Syllabus Coverage</div>
                  <div className="o-card-value">{activeCourse.progress}%</div>
                </div>
                <div className="o-card">
                  <div className="o-card-title">Pending Grading</div>
                  <div className={`o-card-value ${activeCourse.pendingGrading > 0 ? 'text-red' : ''}`}>
                    {activeCourse.pendingGrading}
                  </div>
                </div>
              </div>

              <div className="quick-actions-bar">
                <button className="qa-btn primary"><FaPlus /> Add Content</button>
                <button className="qa-btn"><FaTasks /> New Assignment</button>
                <button className="qa-btn"><FaQrcode /> Start Attendance</button>
              </div>
            </div>
          )}

          {/* 📂 TAB 2: CONTENT MANAGEMENT */}
          {activeTab === 'content' && (
            <div className="tab-fade-in">
              <div className="mgmt-section-header">
                <h3 style={{ margin: 0, color: '#0F172A' }}>Chapter 1: Introduction</h3>
                <button className="qa-btn primary" style={{ padding: '8px 16px', flex: 'none' }}><FaPlus/> Add Item</button>
              </div>
              
              {/* Draggable Content Item Mock */}
              <div className="content-item-row">
                <div className="item-left">
                  <FaGripVertical style={{ color: '#CBD5E1', cursor: 'grab' }} />
                  <FaVideo style={{ color: '#8B5CF6', fontSize: '1.2rem' }} />
                  <div>
                    <div className="item-title">1.1 What are Data Structures?</div>
                    <div className="item-meta">Video • 45 mins • Visible to students</div>
                  </div>
                </div>
                <div className="action-links">
                  <button className="a-link"><FaEdit/> Edit</button>
                  <button className="a-link delete"><FaTrash/></button>
                </div>
              </div>

              <div className="content-item-row">
                <div className="item-left">
                  <FaGripVertical style={{ color: '#CBD5E1', cursor: 'grab' }} />
                  <FaFilePdf style={{ color: '#EF4444', fontSize: '1.2rem' }} />
                  <div>
                    <div className="item-title">1.2 Syllabus & Guidelines</div>
                    <div className="item-meta">PDF • 2 MB • Visible to students</div>
                  </div>
                </div>
                <div className="action-links">
                  <button className="a-link"><FaEdit/> Edit</button>
                  <button className="a-link delete"><FaTrash/></button>
                </div>
              </div>
            </div>
          )}

          {/* 📝 TAB 3: ASSIGNMENTS */}
          {activeTab === 'assignments' && (
            <div className="tab-fade-in">
              <div className="mgmt-section-header">
                <h3 style={{ margin: 0, color: '#0F172A' }}>Active Assignments</h3>
                <button className="qa-btn primary" style={{ padding: '8px 16px', flex: 'none' }}><FaPlus/> Create New</button>
              </div>

              <div className="content-item-row" style={{ borderLeft: '4px solid #0EA5E9' }}>
                <div className="item-left">
                  <FaTasks style={{ color: '#0EA5E9', fontSize: '1.2rem' }} />
                  <div>
                    <div className="item-title">Assignment 1: Linked Lists</div>
                    <div className="item-meta">Due: 20 Feb 2026 • Submissions: 105/120</div>
                  </div>
                </div>
                <div className="action-links">
                  {/* Highlighting urgent action */}
                  <button className="qa-btn primary" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>Grade (15 Pending)</button>
                  <button className="a-link"><FaEdit/></button>
                </div>
              </div>
            </div>
          )}

          {/* OTHER TABS (Placeholders for future implementation) */}
          {activeTab === 'students' && <div>Student List Table will go here...</div>}
          {activeTab === 'attendance' && <div>QR Generator and Attendance History will go here...</div>}

        </div>
      </div>
    </div>
  );
};

export default CourseManagement;