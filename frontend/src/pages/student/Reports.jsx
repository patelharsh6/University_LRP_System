// src/pages/Reports.jsx
import React, { useState } from 'react';
import './Reports.css';
import { 
  FaSearch, FaDownload, FaEye, FaLock, 
  FaFileAlt, FaIdCard, FaMoneyCheckAlt, FaGraduationCap, FaFileInvoice 
} from 'react-icons/fa';

const Reports = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // --- MOCK DATA FOR REPORTS ---
  const reportsData = [
    // ACADEMIC
    {
      id: 1,
      title: "Semester Hall Ticket",
      description: "Admit card for the upcoming Winter 2026 Semester Examinations.",
      category: "Academic",
      status: "Available",
      date: "10 Feb 2026",
      icon: <FaIdCard />,
      iconColor: "icon-blue"
    },
    {
      id: 2,
      title: "Grade Card (Sem V)",
      description: "Official mark sheet for the previous semester including SGPA/CGPA.",
      category: "Academic",
      status: "Available",
      date: "15 Jan 2026",
      icon: <FaGraduationCap />,
      iconColor: "icon-purple"
    },
    {
      id: 3,
      title: "Exam Application Form",
      description: "Submission copy of your exam form for the current term.",
      category: "Academic",
      status: "Available",
      date: "01 Feb 2026",
      icon: <FaFileAlt />,
      iconColor: "icon-blue"
    },
    
    // FINANCE
    {
      id: 4,
      title: "Fee Receipt (Q1)",
      description: "Payment acknowledgement for Quarter 1 tuition fees.",
      category: "Finance",
      status: "Available",
      date: "12 Dec 2025",
      icon: <FaFileInvoice />,
      iconColor: "icon-green"
    },
    {
      id: 5,
      title: "Scholarship Status",
      description: "Application status report for Government Merit Scholarship.",
      category: "Finance",
      status: "Pending", // 🟡 Pending State
      date: "-",
      icon: <FaMoneyCheckAlt />,
      iconColor: "icon-green"
    },

    // ADMINISTRATIVE / OTHER
    {
      id: 6,
      title: "Bonafide Certificate",
      description: "Proof of enrollment for external verification purposes.",
      category: "Administrative",
      status: "Locked", // 🔒 Locked State
      date: "-",
      icon: <FaFileAlt />,
      iconColor: "icon-orange"
    },
    {
      id: 7,
      title: "Hostel Clearance",
      description: "No-dues certificate from the hostel warden.",
      category: "Administrative",
      status: "Available",
      date: "20 Jan 2026",
      icon: <FaFileAlt />,
      iconColor: "icon-orange"
    }
  ];

  // --- FILTER LOGIC ---
  const filteredReports = reportsData.filter(report => {
    const matchesCategory = activeCategory === 'All' || report.category === activeCategory;
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="reports-container">
      
      {/* 1. HEADER SECTION */}
      <div className="reports-header">
        <div className="header-title">
          <h2>Reports & Documents</h2>
          <p>Download and view your academic and administrative records.</p>
        </div>
        
        {/* Search Bar */}
        <div className="report-search-box">
          <FaSearch className="search-icon" />
          <input 
            type="text" 
            placeholder="Search reports..." 
            className="report-search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* 2. CATEGORY TABS */}
      <div className="category-tabs">
        {['All', 'Academic', 'Finance', 'Administrative'].map((cat) => (
          <button 
            key={cat}
            className={`cat-tab ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 3. REPORT CARDS GRID */}
      <div className="reports-grid">
        {filteredReports.map((report) => (
          <div key={report.id} className="report-card">
            
            {/* Top: Icon + Badge */}
            <div className="card-top">
              <div className={`report-icon-box ${report.iconColor}`}>
                {report.icon}
              </div>
              
              {/* Status Logic */}
              <span className={`status-pill status-${report.status.toLowerCase()}`}>
                {report.status}
              </span>
            </div>

            {/* Content */}
            <div className="card-content">
              <h3>{report.title}</h3>
              <p>{report.description}</p>
            </div>

            {/* Actions Footer */}
            <div className="card-actions">
              {/* View Button */}
              <button className="btn-view">
                <FaEye style={{ marginRight: '6px' }} /> View
              </button>

              {/* Download Button (Disabled if Locked/Pending) */}
              {report.status === 'Available' ? (
                <button className="btn-download">
                  <FaDownload /> Download
                </button>
              ) : (
                <button className="btn-download btn-disabled" disabled>
                  <FaLock /> Locked
                </button>
              )}
            </div>

          </div>
        ))}
      </div>

      {/* Empty State Message */}
      {filteredReports.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px', color: '#94A3B8' }}>
          <h3>No reports found matching your criteria.</h3>
        </div>
      )}

    </div>
  );
};

export default Reports;