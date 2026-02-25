// src/pages/Timetable.jsx
import React, { useState } from 'react';
import './Timetable.css';
import { FaChevronLeft, FaChevronRight, FaQrcode, FaCheckCircle, FaClock } from 'react-icons/fa';

const Timetable = () => {
  // Mock Date State
  const [currentDate, setCurrentDate] = useState("12 Feb 2026");

  // --- MOCK SCHEDULE DATA ---
  // Matches the fields seen in your reference image
  const scheduleData = [
    {
      id: 1,
      subject: "Cloud Computing",
      code: "ECSDI24304",
      type: "Lecture",
      faculty: "Aarti Dadheech",
      time: "09:10 AM - 10:00 AM",
      duration: "50 min",
      status: "completed", // Past class
      attendance: "Present"
    },
    {
      id: 2,
      subject: "Agile Software Development and DevOps",
      code: "ECSCI24304",
      type: "Lecture",
      faculty: "Vaishali Chourey",
      time: "10:00 AM - 10:50 AM",
      duration: "50 min",
      status: "completed",
      attendance: "Present"
    },
    {
      id: 3,
      subject: "Agile Software Development (Tutorial)",
      code: "ECSCI24304",
      type: "Practical",
      faculty: "Himani Dharmesh Prajapati",
      time: "11:00 AM - 12:40 PM",
      duration: "100 min",
      status: "active", // 🟢 THIS IS HAPPENING NOW (Show QR)
      attendance: "Pending"
    },
    {
      id: 4,
      subject: "Data Visualization",
      code: "ECSEI24302",
      type: "Lecture",
      faculty: "Indu Chandran",
      time: "01:30 PM - 02:20 PM",
      duration: "50 min",
      status: "upcoming", // Future class
      attendance: null
    }
  ];

  return (
    <div className="timetable-container">
      
      {/* 1. HEADER (Matches Reference Image) */}
      <div className="timetable-header">
        <div className="header-text">
          <h2>Timetable</h2>
          <div className="semester-badge">SEMESTER-VI | 2025-26</div>
        </div>
        <button className="weekly-btn">Weekly schedule</button>
      </div>

      {/* 2. DATE NAVIGATOR */}
      <div className="date-navigator">
        <button className="nav-arrow"><FaChevronLeft /></button>
        <span className="current-date-display">{currentDate}</span>
        <button className="nav-arrow"><FaChevronRight /></button>
      </div>

      {/* 3. CLASS LIST */}
      <div className="class-list">
        {scheduleData.map((cls) => (
          <div key={cls.id} className={`schedule-card ${cls.status}`}>
            <div className="card-content">
              
              {/* LEFT: Class Details */}
              <div className="info-section">
                <div className="subject-title">
                  {cls.subject} <span className="subject-code">({cls.code})</span>
                </div>
                
                <div className="time-row">
                  {cls.time} <span className="duration-span">({cls.duration})</span>
                </div>

                <div className="faculty-row">
                  {cls.faculty}
                </div>

                <div className="type-badge">{cls.type}</div>
              </div>

              {/* RIGHT: Status / QR Action */}
              <div className="action-area">
                
                {/* 🔵 CASE 1: ACTIVE CLASS (Show QR Button) */}
                {cls.status === 'active' && (
                  <button className="btn-qr" onClick={() => alert("Opening Camera Scanner...")}>
                    <FaQrcode /> Scan QR
                  </button>
                )}

                {/* 🟢 CASE 2: PAST CLASS (Attendance Recorded) */}
                {cls.status === 'completed' && (
                  <div className="status-text recorded">
                    <FaCheckCircle /> Attendance recorded
                  </div>
                )}

                {/* ⚪ CASE 3: FUTURE CLASS */}
                {cls.status === 'upcoming' && (
                  <div className="status-text upcoming">
                    <FaClock /> Scheduled
                  </div>
                )}

              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Timetable;