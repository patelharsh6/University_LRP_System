// src/pages/FacultyDashboard.jsx
import React from 'react';
import './FacultyDashboard.css';
import { 
  FaQrcode, FaPlus, FaBullhorn, FaBook, FaUsers, FaClock, 
  FaCheckDouble, FaExclamationTriangle, FaChartBar, FaMagic, 
  FaUserGraduate, FaTasks 
} from 'react-icons/fa';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, CartesianGrid, YAxis } from 'recharts';

const FacultyDashboard = () => {
  // --- MOCK DATA ---
  const facultyName = "Prof. Arvind Sharma";
  const department = "Computer Science Engineering";

  const stats = [
    { label: "Courses Assigned", value: "4", icon: <FaBook />, color: "icon-blue" },
    { label: "Total Students", value: "245", icon: <FaUsers />, color: "icon-purple" },
    { label: "Pending Grading", value: "32", icon: <FaCheckDouble />, color: "icon-orange" },
    { label: "Avg Attendance", value: "88%", icon: <FaUserGraduate />, color: "icon-green" },
  ];

  const todaysClasses = [
    { id: 1, time: "10:00 AM", subject: "Data Structures", room: "Lab 3", students: 60, status: "completed" },
    { id: 2, time: "12:00 PM", subject: "Database Mgmt (DBMS)", room: "Room 204", students: 55, status: "active" }, // Active
    { id: 3, time: "02:00 PM", subject: "Algorithms", room: "Hall B", students: 130, status: "upcoming" },
  ];

  const pendingGrading = [
    { id: 1, course: "Data Structures", task: "Assignment 2: Linked Lists", pending: 15 },
    { id: 2, course: "DBMS", task: "Mid-Term Project Phase 1", pending: 17 },
  ];

  const performanceData = [
    { name: 'CS101', avgMarks: 82 },
    { name: 'CS102', avgMarks: 76 },
    { name: 'CS201', avgMarks: 88 },
    { name: 'CS305', avgMarks: 71 },
  ];

  return (
    <div className="fac-dashboard-container">
      
      {/* 🟦 1. HEADER & QUICK ACTIONS */}
      <div className="fac-header">
        <div className="fac-welcome">
          <h1>Good Morning, {facultyName} 👋</h1>
          <p>{department} | Faculty Portal</p>
        </div>
        <div className="fac-quick-actions">
          <button className="fac-btn fac-btn-primary">
            <FaQrcode /> Start Attendance
          </button>
          <button className="fac-btn fac-btn-secondary">
            <FaPlus /> Create Assignment
          </button>
          <button className="fac-btn fac-btn-secondary">
            <FaBullhorn /> Post Notice
          </button>
        </div>
      </div>

      {/* 🟩 2. SUMMARY STATS */}
      <div className="fac-stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="fac-stat-card">
            <div className={`fac-stat-icon ${stat.color}`}>{stat.icon}</div>
            <div className="fac-stat-content">
              <h3>{stat.value}</h3>
              <p>{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 🟨 3. MAIN GRID */}
      <div className="fac-main-grid">
        
        {/* LEFT COLUMN (70%) */}
        <div className="fac-col-left">
          
          {/* Today's Schedule */}
          <div className="fac-section">
            <div className="fac-section-header">
              <h2 className="fac-section-title"><FaClock color="#0EA5E9" /> Today's Schedule</h2>
              <span style={{ fontSize: '0.85rem', color: '#64748B', fontWeight: '600' }}>12 Feb 2026</span>
            </div>
            
            <div>
              {todaysClasses.map(cls => (
                <div key={cls.id} className={`fac-class-card ${cls.status}`}>
                  <div className="fac-class-info">
                    <h4>{cls.subject}</h4>
                    <div className="fac-class-meta">
                      <span>{cls.time}</span>
                      <span>•</span>
                      <span>{cls.room}</span>
                      <span>•</span>
                      <span>{cls.students} Students</span>
                    </div>
                  </div>
                  <div>
                    {cls.status === 'active' && (
                      <button className="fac-btn fac-btn-primary pulse-btn">
                        <FaQrcode /> Accept Attendance
                      </button>
                    )}
                    {cls.status === 'completed' && <span style={{ color: '#10B981', fontWeight: '600', fontSize: '0.9rem' }}>Recorded</span>}
                    {cls.status === 'upcoming' && <span style={{ color: '#94A3B8', fontWeight: '600', fontSize: '0.9rem' }}>Upcoming</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Grading */}
          <div className="fac-section">
            <div className="fac-section-header">
              <h2 className="fac-section-title"><FaTasks color="#8B5CF6" /> Pending Evaluations</h2>
              <button style={{ background: 'none', border: 'none', color: '#0EA5E9', cursor: 'pointer', fontWeight: '600' }}>View All</button>
            </div>
            
            <div>
              {pendingGrading.map(task => (
                <div key={task.id} className="grading-item">
                  <div>
                    <h4 style={{ margin: '0 0 4px 0', color: '#0F172A', fontSize: '1rem' }}>{task.task}</h4>
                    <div style={{ fontSize: '0.85rem', color: '#64748B' }}>{task.course}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <span className="grade-badge">{task.pending} Pending</span>
                    <button className="fac-btn fac-btn-secondary" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>Grade Now</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN (30%) */}
        <div className="fac-col-right">
          
          {/* AI Insights Panel (Premium Feature) */}
          <div className="insight-card">
            <div className="insight-header"><FaMagic /> AI Class Insights</div>
            <div className="insight-text">
              <strong>CS102 (DBMS)</strong> is showing a 15% drop in assignment submissions this week. Consider extending the deadline or reviewing Chapter 3.
            </div>
          </div>

          {/* Alerts Section */}
          <div className="fac-section" style={{ padding: '20px' }}>
            <h2 className="fac-section-title" style={{ marginBottom: '16px' }}><FaExclamationTriangle color="#EF4444" /> Action Required</h2>
            
            <div className="alert-item">
              <div className="alert-icon"><FaExclamationTriangle /></div>
              <div className="alert-content">
                <h4>Low Attendance Alert</h4>
                <p>12 students in CS101 have fallen below 75% attendance.</p>
              </div>
            </div>
            <div className="alert-item" style={{ borderBottom: 'none' }}>
              <div className="alert-icon"><FaExclamationTriangle color="#F59E0B" /></div>
              <div className="alert-content">
                <h4>Missing Submissions</h4>
                <p>5 students haven't submitted Lab Report 2 (Past Due).</p>
              </div>
            </div>
          </div>

          {/* Performance Snapshot */}
          <div className="fac-section" style={{ padding: '20px' }}>
            <h2 className="fac-section-title" style={{ marginBottom: '16px' }}><FaChartBar color="#10B981" /> Avg Class Marks</h2>
            <div style={{ height: '180px', width: '100%' }}>
              <ResponsiveContainer>
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} dy={10} />
                  <YAxis domain={[0, 100]} hide />
                  <Tooltip cursor={{ fill: '#F8FAFC' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                  <Bar dataKey="avgMarks" fill="#0EA5E9" radius={[4, 4, 0, 0]} barSize={30} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;