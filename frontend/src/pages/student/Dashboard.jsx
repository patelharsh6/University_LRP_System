// src/pages/Dashboard.jsx
import React from 'react';
import './Dashboard.css';
import { 
  FaUserGraduate, FaCalendarCheck, FaMoneyBillWave, FaChartLine, 
  FaQrcode, FaBell, FaCheckCircle, FaExclamationTriangle 
} from 'react-icons/fa';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  
  // --- MOCK DATA ---
  const studentName = "Harsh";
  const currentDate = "Thu, 12 Feb 2026";
  
  const stats = [
    { title: "Attendance", value: "82%", icon: <FaCalendarCheck />, color: "stat-green", sub: "Good" },
    { title: "SGPA (Sem 5)", value: "8.72", icon: <FaUserGraduate />, color: "stat-purple", sub: "Excellent" },
    { title: "Pending Fees", value: "₹45k", icon: <FaMoneyBillWave />, color: "stat-red", sub: "Due Soon" },
    { title: "Credits Earned", value: "124", icon: <FaChartLine />, color: "stat-blue", sub: "Total" },
  ];

  const upcomingClasses = [
    { id: 1, subject: "Data Structures", time: "10:00", ampm: "AM", faculty: "Prof. Sharma", room: "Lab 3", isLive: false },
    { id: 2, subject: "DBMS (Lecture)", time: "12:00", ampm: "PM", faculty: "Prof. Verma", room: "Room 204", isLive: true }, // LIVE
    { id: 3, subject: "Operating Systems", time: "02:00", ampm: "PM", faculty: "Prof. Gupta", room: "Hall B", isLive: false },
  ];

  const announcements = [
    { id: 1, title: "Mid-Sem Exam Schedule Released", date: "Today" },
    { id: 2, title: "TechFest Registration Open", date: "Yesterday" },
    { id: 3, title: "Holiday on Friday declared", date: "10 Feb" },
  ];

  const performanceData = [
    { name: 'Sem 1', sgpa: 7.2 },
    { name: 'Sem 2', sgpa: 7.8 },
    { name: 'Sem 3', sgpa: 8.1 },
    { name: 'Sem 4', sgpa: 8.5 },
    { name: 'Sem 5', sgpa: 8.7 },
  ];

  return (
    <div className="dashboard-container">
      
      {/* 🟦 1. WELCOME HEADER */}
      <div className="welcome-header">
        <div className="welcome-text">
          <h1>Good Morning, {studentName} 👋</h1>
          <p>Semester 6 • Computer Science Engineering</p>
        </div>
        <div className="header-right">
          <span className="date-badge">{currentDate}</span>
          <button className="quick-action-btn">
            <FaQrcode /> Scan QR
          </button>
        </div>
      </div>

      {/* 🟩 2. SUMMARY STATS */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-header">
              <span className="stat-label">{stat.title}</span>
              <div className={`stat-icon ${stat.color}`}>{stat.icon}</div>
            </div>
            <div className="stat-value">{stat.value}</div>
            <div style={{ fontSize: '0.8rem', color: '#94A3B8', marginTop: '4px' }}>
              {stat.sub}
            </div>
          </div>
        ))}
      </div>

      {/* 🟨 3. MAIN CONTENT GRID */}
      <div className="dashboard-grid">
        
        {/* LEFT COLUMN (70%) */}
        <div className="left-column">
          
          {/* Upcoming Classes */}
          <div className="section-title">
            <span>📅 Today's Schedule</span>
            <span style={{ fontSize: '0.85rem', color: '#0EA5E9', cursor: 'pointer' }}>View Timetable</span>
          </div>
          <div className="dashboard-card" style={{ marginBottom: '24px' }}>
            {upcomingClasses.map((cls) => (
              <div key={cls.id} className={`class-item ${cls.isLive ? 'live' : ''}`}>
                <div className="class-time-box">
                  <div className="time-start">{cls.time}</div>
                  <div className="time-ampm">{cls.ampm}</div>
                </div>
                <div className="class-details">
                  <div className="subject-name">
                    {cls.subject}
                    {cls.isLive && <span style={{ color: '#0EA5E9', marginLeft: '8px', fontSize: '0.8rem' }}>● LIVE</span>}
                  </div>
                  <div className="faculty-name">{cls.faculty} • {cls.room}</div>
                </div>
                {cls.isLive && (
                  <button className="btn-scan-small">
                    <FaQrcode /> Mark
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Recent Announcements */}
          <div className="section-title">
            <span>📢 Notice Board</span>
            <span style={{ fontSize: '0.85rem', color: '#0EA5E9', cursor: 'pointer' }}>View All</span>
          </div>
          <div className="dashboard-card">
            {announcements.map((item) => (
              <div key={item.id} className="announce-item">
                <div className="announce-title">{item.title}</div>
                <div className="announce-meta">{item.date} • Admin Office</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN (30%) */}
        <div className="right-column">
          
          {/* Performance Graph */}
          <div className="section-title">📊 Performance</div>
          <div className="dashboard-card" style={{ height: '220px', padding: '10px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Tooltip />
                <Area type="monotone" dataKey="sgpa" stroke="#0EA5E9" fillOpacity={1} fill="url(#colorPv)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Fee Reminder */}
          <div className="fee-warning-card">
            <div style={{ color: '#7F1D1D', fontWeight: '600' }}>⚠️ Pending Fees</div>
            <div className="due-amount">₹45,000</div>
            <p style={{ fontSize: '0.85rem', color: '#B91C1C', marginBottom: '12px' }}>Due by 15 Mar 2026</p>
            <button className="btn-pay-now">Pay Now</button>
          </div>

          {/* 🟪 4. RECENT ACTIVITY */}
          <div className="section-title" style={{ marginTop: '32px' }}>Recent Activity</div>
          <div className="activity-timeline">
            <div className="activity-item">
              <div className="activity-icon" style={{ background: '#DCFCE7', color: '#166534' }}><FaCheckCircle /></div>
              <div className="activity-content">
                <h4>Attendance Marked</h4>
                <p>Data Structures (Lab)</p>
                <div className="activity-time">10:05 AM Today</div>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-icon" style={{ background: '#FEF3C7', color: '#92400E' }}><FaExclamationTriangle /></div>
              <div className="activity-content">
                <h4>Assignment Due</h4>
                <p>Cloud Computing Unit 3</p>
                <div className="activity-time">Tomorrow, 11:59 PM</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;