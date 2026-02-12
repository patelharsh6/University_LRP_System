// src/pages/Attendance.jsx
import React, { useState } from 'react';
import './Attendance.css';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell 
} from 'recharts';
import { FaInfoCircle } from 'react-icons/fa';

const Attendance = () => {
  // Default tab is 'subject-wise'
  const [activeTab, setActiveTab] = useState('subject-wise');

  // --- MOCK DATA ---
  const summary = { overall: 82, totalClasses: 120, present: 98, absent: 22 };
  const subjectData = [
    { subject: 'Data Structures', attended: 28, total: 30, pct: 93, status: 'Good' },
    { subject: 'DBMS', attended: 24, total: 30, pct: 80, status: 'Good' },
    { subject: 'Operating Sys', attended: 18, total: 30, pct: 60, status: 'Warning' },
    { subject: 'Mathematics', attended: 12, total: 30, pct: 40, status: 'Critical' },
  ];
  const pieData = [
    { name: 'Present', value: 98, color: '#10B981' }, 
    { name: 'Absent', value: 22, color: '#EF4444' }, 
  ];

  const getStatusClass = (status) => {
    if (status === 'Good') return 'status-good';
    if (status === 'Warning') return 'status-warning';
    return 'status-critical';
  };

  return (
    <div className="attendance-container">
      
      {/* 🟢 1. SUMMARY CARDS */}
      <div className="attendance-summary">
        <div className="summary-card">
          <div className="summary-title">Overall Attendance</div>
          <div>
            <div className={`summary-value ${summary.overall < 75 ? 'color-red' : 'color-green'}`}>
              {summary.overall}%
            </div>
            <div className="progress-track">
              <div 
                className={`progress-fill ${summary.overall < 75 ? 'bg-red' : 'bg-green'}`} 
                style={{ width: `${summary.overall}%` }}
              ></div>
            </div>
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-title">Total Classes</div>
          <div className="summary-value color-blue">{summary.totalClasses}</div>
        </div>
        <div className="summary-card">
          <div className="summary-title">Present</div>
          <div className="summary-value color-green">{summary.present}</div>
        </div>
        <div className="summary-card">
          <div className="summary-title">Absent</div>
          <div className="summary-value color-red">{summary.absent}</div>
        </div>
      </div>

      {/* 📊 2. GRAPHS SECTION */}
      <div className="charts-grid">
        <div className="chart-card">
          <div className="chart-header">
            <h3>Subject-wise Attendance</h3>
            <p style={{color:'#64748B', fontSize:'0.9rem'}}>Performance across all courses</p>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={subjectData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <XAxis dataKey="subject" axisLine={false} tickLine={false} tick={{fill:'#64748B', fontSize:12}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill:'#64748B'}} />
              <Tooltip cursor={{fill: '#F1F5F9'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
              <Bar dataKey="pct" fill="#0EA5E9" radius={[4, 4, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="chart-card">
          <div className="chart-header">
            <h3>Overall Split</h3>
            <p style={{color:'#64748B', fontSize:'0.9rem'}}>Present vs Absent Ratio</p>
          </div>
          <div style={{ position: 'relative', height: '250px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {pieData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0F172A' }}>{summary.overall}%</div>
              <div style={{ fontSize: '0.8rem', color: '#64748B' }}>Average</div>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ 3. FOUR DISTINCT TABS */}
      <div style={{ paddingBottom: '40px' }}>
        <div className="attendance-filter-tabs">
          <button 
            className={`filter-tab-btn ${activeTab === 'subject-wise' ? 'active' : ''}`}
            onClick={() => setActiveTab('subject-wise')}
          >
            Subject-wise
          </button>
          
          <button 
            className={`filter-tab-btn ${activeTab === 'log' ? 'active' : ''}`}
            onClick={() => setActiveTab('log')}
          >
            Log
          </button>

          <button 
            className={`filter-tab-btn ${activeTab === 'monthly' ? 'active' : ''}`}
            onClick={() => setActiveTab('monthly')}
          >
            Monthly
          </button>
          
          <button 
            className={`filter-tab-btn ${activeTab === 'overall' ? 'active' : ''}`}
            onClick={() => setActiveTab('overall')}
          >
            Over All
          </button>
        </div>

        {/* CONTENT AREA */}
        <div className="table-card" style={{ borderTop: 'none', borderRadius: '0 0 16px 16px' }}>
          
          {/* 1. SUBJECT-WISE TABLE */}
          {activeTab === 'subject-wise' && (
            <table className="styled-table">
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Total Classes</th>
                  <th>Attended</th>
                  <th>Percentage</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {subjectData.map((row, index) => (
                  <tr key={index}>
                    <td style={{ fontWeight: '600' }}>{row.subject}</td>
                    <td>{row.total}</td>
                    <td>{row.attended}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontWeight: '700', width: '30px' }}>{row.pct}%</span>
                        <div className="progress-track" style={{ width: '80px', marginTop: 0, height: '6px' }}>
                          <div 
                            className="progress-fill" 
                            style={{ 
                              width: `${row.pct}%`, 
                              background: row.pct < 60 ? '#EF4444' : (row.pct < 75 ? '#F59E0B' : '#10B981') 
                            }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={`status-badge ${getStatusClass(row.status)}`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* 2. LOG VIEW (Matches your image exactly) */}
          {activeTab === 'log' && (
            <div className="tab-content-placeholder">
              {/* Filter Controls */}
              <div className="filter-controls-container">
                <div className="radio-group">
                  <span className="radio-title">Show :</span>
                  <label className="radio-label">
                    <input type="radio" name="showFilter" defaultChecked /> Absent
                  </label>
                  <label className="radio-label">
                    <input type="radio" name="showFilter" /> Present
                  </label>
                  <label className="radio-label">
                    <input type="radio" name="showFilter" /> Both
                  </label>
                </div>

                <select className="subject-select">
                  <option>ECSAJ24303 - Prototype Modeling</option>
                  <option>CS101 - Data Structures</option>
                  <option>CS102 - DBMS</option>
                </select>
              </div>

              {/* No Log Found Message */}
              <div className="info-box-blue">
                <FaInfoCircle size={20} />
                <span>No log found!</span>
              </div>
            </div>
          )}

          {/* 3. MONTHLY VIEW (Separate) */}
          {activeTab === 'monthly' && (
            <div className="tab-content-placeholder">
               <div className="info-box-blue">
                <FaInfoCircle size={20} />
                <span>Select a month to view the summary.</span>
              </div>
            </div>
          )}

          {/* 4. OVER ALL VIEW (Separate) */}
          {activeTab === 'overall' && (
            <div className="tab-content-placeholder">
               <div className="info-box-blue">
                <FaInfoCircle size={20} />
                <span>Detailed overall report generation.</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Attendance;