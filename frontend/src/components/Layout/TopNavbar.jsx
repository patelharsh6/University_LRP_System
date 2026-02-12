// src/components/Layout/TopNavbar.jsx
import React from 'react';
import { FaBars, FaBell } from 'react-icons/fa';
import './Layout.css';

const TopNavbar = ({ toggleSidebar, userRole }) => {
  return (
    <header className="top-navbar">
      {/* LEFT: Only visible on mobile (controlled by CSS) */}
      <div className="nav-left">
        <button className="hamburger-btn" onClick={toggleSidebar}>
          <FaBars />
        </button>
      </div>

      {/* RIGHT: Always visible (Profile & Icons) */}
      <div className="nav-right">
        {/* Notification Icon */}
        <div className="icon-btn">
          <FaBell />
        </div>
        
        {/* Profile Dropdown */}
        <div className="profile-box">
          <div className="profile-img">
            {userRole === 'admin' ? 'AD' : 'ST'}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#0F172A' }}>
              {userRole === 'student' ? 'Student' : 'Admin User'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;