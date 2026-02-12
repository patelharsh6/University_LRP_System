// src/components/Layout/Layout.jsx
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';
import './Layout.css';

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userRole, setUserRole] = useState('student'); // 'student', 'admin', 'faculty'

  // Toggle Function
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="app-container">
      {/* Sidebar with Mobile Logic */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        userRole={userRole} 
        toggleSidebar={() => setIsSidebarOpen(false)} // Close when item clicked
      />

      {/* Overlay for Mobile (Click to close sidebar) */}
      {isSidebarOpen && (
        <div className="overlay" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* Main Area */}
      <div className="main-content">
        <TopNavbar 
          toggleSidebar={toggleSidebar} 
          userRole={userRole}
        />

        {/* Dynamic Content */}
        <div className="content-wrapper">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;