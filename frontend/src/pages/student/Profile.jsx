// src/pages/Profile.jsx
import React, { useState } from 'react';
import './Profile.css';
import { FaPen, FaSave, FaTimes } from 'react-icons/fa';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);

  // Mock User Data
  const [userData, setUserData] = useState({
    firstName: "Aditya",
    lastName: "Sharma",
    dob: "2002-08-15",
    gender: "Male",
    email: "aditya.sharma@adani.edu.in",
    phone: "+91 98765 43210",
    address: "B-402, Titanium City Centre",
    city: "Ahmedabad",
    state: "Gujarat",
    zip: "380015",
    rollNo: "AU210045",
    course: "B.Tech (CSE)",
    semester: "6th",
    cgpa: "8.9"
  });

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  // Helper Component for Fields to reduce repetition
  const InfoField = ({ label, name, value, type = "text" }) => (
    <div className="info-group">
      <span className="label">{label}</span>
      {isEditing ? (
        <input 
          type={type} 
          name={name} 
          value={value} 
          onChange={handleChange} 
          className="form-input"
        />
      ) : (
        <span className="value">{value}</span>
      )}
    </div>
  );

  return (
    <div className="profile-container">
      
      {/* 🟦 1. PROFILE HEADER CARD */}
      <div className="profile-header-card">
        <div className="profile-avatar-large">AS</div>
        <div className="header-info">
          <h2>{userData.firstName} {userData.lastName}</h2>
          <div className="id-text">Student ID: {userData.rollNo}</div>
          <div className="status-badge">Active Student</div>
        </div>
        
        <button 
          className={`edit-toggle-btn ${isEditing ? 'active' : ''}`} 
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? <><FaSave /> Save Profile</> : <><FaPen /> Edit Profile</>}
        </button>
      </div>

      <div className="profile-grid">
        
        {/* LEFT COLUMN */}
        <div className="left-column">
          
          {/* 🟩 2. PERSONAL INFORMATION */}
          <div className="section-card">
            <h3 className="section-title">Personal Information</h3>
            <div className="info-grid">
              <InfoField label="First Name" name="firstName" value={userData.firstName} />
              <InfoField label="Last Name" name="lastName" value={userData.lastName} />
              <InfoField label="Date of Birth" name="dob" value={userData.dob} type="date" />
              <InfoField label="Gender" name="gender" value={userData.gender} />
            </div>
          </div>

          {/* 🟨 3. CONTACT INFORMATION */}
          <div className="section-card">
            <h3 className="section-title">Contact Details</h3>
            <div className="info-grid">
              <InfoField label="Email Address" name="email" value={userData.email} />
              <InfoField label="Phone Number" name="phone" value={userData.phone} />
              <div className="info-group" style={{ gridColumn: 'span 2' }}>
                <span className="label">Address</span>
                {isEditing ? (
                  <textarea 
                    name="address" 
                    value={userData.address} 
                    onChange={handleChange} 
                    className="form-input" 
                    rows="2"
                  />
                ) : (
                  <span className="value">{userData.address}</span>
                )}
              </div>
              <InfoField label="City" name="city" value={userData.city} />
              <InfoField label="State" name="state" value={userData.state} />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="right-column">
          
          {/* 🟦 4. ACADEMIC INFORMATION (Read Only usually) */}
          <div className="section-card">
            <h3 className="section-title">Academic Information</h3>
            <div className="info-group" style={{ marginBottom: '16px' }}>
              <span className="label">Course</span>
              <span className="value">{userData.course}</span>
            </div>
            <div className="info-group" style={{ marginBottom: '16px' }}>
              <span className="label">Current Semester</span>
              <span className="value">{userData.semester} Semester</span>
            </div>
            <div className="info-group" style={{ marginBottom: '16px' }}>
              <span className="label">CGPA</span>
              <span className="value" style={{ color: '#0EA5E9', fontSize: '1.2rem' }}>{userData.cgpa}</span>
            </div>
            <div className="info-group">
              <span className="label">Admission Year</span>
              <span className="value">2021</span>
            </div>
          </div>

          {/* 🔐 5. SECURITY SETTINGS */}
          <div className="section-card">
            <h3 className="section-title">Security</h3>
            <button style={{ 
              width: '100%', padding: '10px', background: '#F1F5F9', 
              border: 'none', borderRadius: '6px', color: '#475569', 
              fontWeight: '600', cursor: 'pointer', marginBottom: '10px' 
            }}>
              Change Password
            </button>
            <button style={{ 
              width: '100%', padding: '10px', background: '#F1F5F9', 
              border: 'none', borderRadius: '6px', color: '#475569', 
              fontWeight: '600', cursor: 'pointer' 
            }}>
              Login Activity
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;