import React from 'react';
import { FaGraduationCap, FaChalkboardTeacher, FaCalendarCheck, FaRupeeSign } from 'react-icons/fa';
// Make sure to include the CSS we made

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      {/* 1. Welcome Banner */}
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#1E293B' }}>Hello, Student! 👋</h1>
        <p style={{ color: '#64748B', marginTop: '5px' }}>Here is what's happening with your academics today.</p>
      </div>

      {/* 2. Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', marginBottom: '40px' }}>
        
        {/* Card 1 */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
            <div>
              <h3>Attendance</h3>
              <div className="value">85%</div>
            </div>
            <div style={{ padding: '10px', background: '#D1FAE5', borderRadius: '10px', color: '#10B981' }}>
              <FaCalendarCheck size={20} />
            </div>
          </div>
          <p style={{ fontSize: '0.85rem', color: '#10B981', marginTop: '10px', fontWeight: '600' }}>+2% this week</p>
        </div>

        {/* Card 2 */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
            <div>
              <h3>CGPA</h3>
              <div className="value">8.4</div>
            </div>
            <div style={{ padding: '10px', background: '#DBEAFE', borderRadius: '10px', color: '#3B82F6' }}>
              <FaGraduationCap size={20} />
            </div>
          </div>
          <p style={{ fontSize: '0.85rem', color: '#64748B', marginTop: '10px' }}>Last updated: Yesterday</p>
        </div>

        {/* Card 3 */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
            <div>
              <h3>Fees Due</h3>
              <div className="value">₹0</div>
            </div>
            <div style={{ padding: '10px', background: '#FEE2E2', borderRadius: '10px', color: '#EF4444' }}>
              <FaRupeeSign size={20} />
            </div>
          </div>
          <p style={{ fontSize: '0.85rem', color: '#10B981', marginTop: '10px', fontWeight: '600' }}>No dues pending</p>
        </div>

        {/* Card 4 */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
            <div>
              <h3>Active Courses</h3>
              <div className="value">6</div>
            </div>
            <div style={{ padding: '10px', background: '#FEF3C7', borderRadius: '10px', color: '#F59E0B' }}>
              <FaChalkboardTeacher size={20} />
            </div>
          </div>
          <p style={{ fontSize: '0.85rem', color: '#64748B', marginTop: '10px' }}>2 classes today</p>
        </div>
      </div>

      {/* 3. Section Split (Notices & Timetable) */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        
        {/* Big Card: Recent Activity */}
        <div className="card" style={{ height: '300px' }}>
          <h3 style={{ color: '#1E293B', marginBottom: '20px' }}>📢 Notice Board</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ padding: '15px', borderLeft: '4px solid #3B82F6', background: '#F8FAFC', borderRadius: '0 8px 8px 0' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#334155' }}>Mid-Sem Exam Schedule Released</h4>
              <p style={{ fontSize: '0.85rem', color: '#64748B', marginTop: '4px' }}>The exam timetable for Oct 2026 has been published.</p>
            </div>
            <div style={{ padding: '15px', borderLeft: '4px solid #10B981', background: '#F8FAFC', borderRadius: '0 8px 8px 0' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#334155' }}>Holiday Declaration</h4>
              <p style={{ fontSize: '0.85rem', color: '#64748B', marginTop: '4px' }}>University will remain closed on Friday.</p>
            </div>
          </div>
        </div>

        {/* Side Card: Quick Timetable */}
        <div className="card">
          <h3 style={{ color: '#1E293B', marginBottom: '20px' }}>⏳ Today's Classes</h3>
          <ul style={{ listStyle: 'none' }}>
            <li style={{ marginBottom: '15px', borderBottom: '1px solid #F1F5F9', paddingBottom: '10px' }}>
              <div style={{ fontWeight: '700', fontSize: '0.9rem', color: '#334155' }}>10:00 AM - Data Structures</div>
              <div style={{ fontSize: '0.8rem', color: '#94A3B8' }}>Lab 3 • Prof. Sharma</div>
            </li>
            <li style={{ marginBottom: '15px', borderBottom: '1px solid #F1F5F9', paddingBottom: '10px' }}>
              <div style={{ fontWeight: '700', fontSize: '0.9rem', color: '#334155' }}>12:00 PM - Database Mgmt</div>
              <div style={{ fontSize: '0.8rem', color: '#94A3B8' }}>Room 204 • Prof. Gupta</div>
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;