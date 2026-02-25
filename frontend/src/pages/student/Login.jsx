// src/pages/Login.jsx
import React, { useState } from 'react';
import './Login.css';
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // 🧠 SIMULATED BACKEND DELAY
    setTimeout(() => {
      // 🔐 ROLE BASED LOGIC
      if (email === 'admin@adani.edu' && password === 'admin123') {
        onLogin('admin'); // Tell App.js to switch to Admin
      } else if (email === 'student@adani.edu' && password === 'student123') {
        onLogin('student'); // Tell App.js to switch to Student
      } else {
        setError('Invalid credentials. Try student@adani.edu / student123');
        setLoading(false);
      }
    }, 1500); // 1.5s fake loading
  };

  return (
    <div className="login-page">
      
      {/* 🟦 LEFT SIDE: BRANDING */}
      <div className="login-brand-section">
        <div className="brand-content">
          <div className="brand-logo">ADANI ERP</div>
          <p className="brand-tagline">
            Empowering Education Through Technology.<br />
            Manage your academic journey seamlessly.
          </p>
        </div>
      </div>

      {/* 🟩 RIGHT SIDE: LOGIN FORM */}
      <div className="login-form-section">
        <div className="login-card">
          
          <div className="login-header">
            <h2>Welcome Back!</h2>
            <p>Please login to access your dashboard.</p>
          </div>

          {error && <div className="error-msg">{error}</div>}

          <form onSubmit={handleSubmit}>
            
            {/* Email Input */}
            <div className="input-group">
              <label className="input-label">Email Address / Enrollment ID</label>
              <div className="input-wrapper">
                <FaUser className="input-icon" />
                <input 
                  type="email" 
                  className="form-input" 
                  placeholder="e.g. student@adani.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="input-group">
              <label className="input-label">Password</label>
              <div className="input-wrapper">
                <FaLock className="input-icon" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  className="form-input" 
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button 
                  type="button" 
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Options */}
            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" /> Remember me
              </label>
              <a href="#" className="forgot-link">Forgot Password?</a>
            </div>

            {/* Login Button */}
            <button type="submit" className="btn-login" disabled={loading}>
              {loading ? 'Authenticating...' : 'Login'}
            </button>
          </form>

          <div className="login-footer">
            Don't have an account? <a href="#">Contact Admin</a>
            <div style={{ marginTop: '10px', fontSize: '0.75rem', color: '#CBD5E1' }}>
              Demo: student@adani.edu / student123
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Login;