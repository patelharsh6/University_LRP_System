// login.jsx
// ADANI ERP — Login Page
// Features: role-detect, JWT-ready, lockout, show/hide pw, remember me, validation
// Drop-in: replace your current login route with <LoginPage onLoginSuccess={fn} />

import { useState, useEffect, useRef } from "react";
import "./Login.css";

// ─── Constants ────────────────────────────────────────────────────────────────
const MAX_ATTEMPTS  = 5;
const LOCKOUT_SECS  = 30;

// ─── Mock credentials (replace with real API call) ────────────────────────────
// Backend should: validate → return { token, role, user }
const MOCK_USERS = [
  { id: "student@adani.edu",  password: "student123", role: "student",  name: "Arjun Mehta",      redirect: "/student/dashboard" },
  { id: "21CS049",            password: "student123", role: "student",  name: "Arjun Mehta",      redirect: "/student/dashboard" },
  { id: "teacher@adani.edu",  password: "teacher123", role: "teacher",  name: "Dr. Ada Lovelace", redirect: "/teacher/dashboard" },
  { id: "EMP001",             password: "teacher123", role: "teacher",  name: "Dr. Ada Lovelace", redirect: "/teacher/dashboard" },
  { id: "admin@adani.edu",    password: "admin123",   role: "admin",    name: "System Admin",     redirect: "/admin/dashboard"   },
];

// ─── SVG Icons ────────────────────────────────────────────────────────────────
const Icon = ({ name, size = 18, color = "currentColor" }) => {
  const icons = {
    user: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
        stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    ),
    lock: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
        stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
    ),
    eye: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
        stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    ),
    eyeOff: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
        stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
        <line x1="1" y1="1" x2="23" y2="23"/>
      </svg>
    ),
    alertCircle: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
        stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="12"/>
        <line x1="12" y1="16" x2="12.01" y2="16" strokeWidth="3"/>
      </svg>
    ),
    checkCircle: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
        stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
    warning: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
        stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
        <line x1="12" y1="9" x2="12" y2="13"/>
        <line x1="12" y1="17" x2="12.01" y2="17" strokeWidth="3"/>
      </svg>
    ),
    chevronRight: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
        stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 18 15 12 9 6"/>
      </svg>
    ),
    shield: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
        stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    academic: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
        stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
        <path d="M6 12v5c3 3 9 3 12 0v-5"/>
      </svg>
    ),
    chart: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
        stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"/>
        <line x1="12" y1="20" x2="12" y2="4"/>
        <line x1="6"  y1="20" x2="6"  y2="14"/>
      </svg>
    ),
    calendar: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
        stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8"  y1="2" x2="8"  y2="6"/>
        <line x1="3"  y1="10" x2="21" y2="10"/>
      </svg>
    ),
  };
  return icons[name] || null;
};

// ─── Simulated API call ────────────────────────────────────────────────────────
// Replace this function body with a real fetch('/api/auth/login', ...)
async function apiLogin(identifier, password) {
  await new Promise((r) => setTimeout(r, 1200)); // simulate network delay

  const user = MOCK_USERS.find(
    (u) => u.id === identifier && u.password === password
  );

  if (!user) {
    throw { code: "INVALID_CREDENTIALS", message: "Invalid email/ID or password." };
  }

  // Simulate inactive account for demo
  if (identifier === "inactive@adani.edu") {
    throw { code: "ACCOUNT_INACTIVE", message: "Your account is inactive. Contact the admin." };
  }

  // Return shape matches what a real JWT endpoint returns
  return {
    token: `eyJhbGciOiJIUzI1NiJ9.mock_${user.role}_token`,
    role:  user.role,
    name:  user.name,
    redirect: user.redirect,
  };
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function LoginPage({ onLoginSuccess }) {
  // Form state
  const [identifier, setIdentifier]   = useState("");
  const [password, setPassword]       = useState("");
  const [showPw, setShowPw]           = useState(false);
  const [rememberMe, setRememberMe]   = useState(false);

  // UI state
  const [loading, setLoading]         = useState(false);
  const [alert, setAlert]             = useState(null); // { type, message }
  const [fieldErrors, setFieldErrors] = useState({});

  // Security state
  const [attempts, setAttempts]       = useState(0);
  const [lockedUntil, setLockedUntil] = useState(null);
  const [countdown, setCountdown]     = useState(0);

  const identifierRef = useRef(null);

  // ── Restore saved identifier ────────────────────────────────────────────────
  useEffect(() => {
    const saved = localStorage.getItem("erp_remember_id");
    if (saved) { setIdentifier(saved); setRememberMe(true); }
    identifierRef.current?.focus();
  }, []);

  // ── Lockout countdown ───────────────────────────────────────────────────────
  useEffect(() => {
    if (!lockedUntil) return;
    const tick = () => {
      const remaining = Math.ceil((lockedUntil - Date.now()) / 1000);
      if (remaining <= 0) {
        setLockedUntil(null);
        setAttempts(0);
        setCountdown(0);
        setAlert(null);
      } else {
        setCountdown(remaining);
      }
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [lockedUntil]);

  // ── Validation ──────────────────────────────────────────────────────────────
  const validate = () => {
    const errs = {};
    if (!identifier.trim()) errs.identifier = "Please enter your email or ID.";
    if (!password)           errs.password   = "Please enter your password.";
    else if (password.length < 6) errs.password = "Password must be at least 6 characters.";
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // ── Submit ──────────────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert(null);

    // Locked out?
    if (lockedUntil && Date.now() < lockedUntil) return;

    if (!validate()) return;

    setLoading(true);
    try {
      const result = await apiLogin(identifier.trim(), password);

      // Remember me
      if (rememberMe) {
        localStorage.setItem("erp_remember_id", identifier.trim());
      } else {
        localStorage.removeItem("erp_remember_id");
      }

      // Store token (real app: use httpOnly cookie)
      sessionStorage.setItem("erp_token", result.token);
      sessionStorage.setItem("erp_role",  result.role);

      setAlert({ type: "success", message: `Welcome back, ${result.name}! Redirecting…` });
      setAttempts(0);

      // Redirect after brief feedback
      setTimeout(() => {
        if (onLoginSuccess) {
          onLoginSuccess(result);
        } else {
          // Fallback: use window navigation
          window.location.href = result.redirect;
        }
      }, 800);

    } catch (err) {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);

      if (newAttempts >= MAX_ATTEMPTS) {
        const until = Date.now() + LOCKOUT_SECS * 1000;
        setLockedUntil(until);
        setAlert({
          type: "error",
          message: `Too many failed attempts. Account locked for ${LOCKOUT_SECS} seconds.`,
        });
      } else {
        const remaining = MAX_ATTEMPTS - newAttempts;
        const msg =
          err.code === "ACCOUNT_INACTIVE"
            ? err.message
            : `${err.message} ${remaining} attempt${remaining !== 1 ? "s" : ""} remaining.`;
        setAlert({ type: "error", message: msg });
      }
    } finally {
      setLoading(false);
    }
  };

  // ── Forgot password ─────────────────────────────────────────────────────────
  const handleForgotPassword = () => {
    setAlert({
      type: "warning",
      message: "A password reset link has been sent to your registered email address.",
    });
  };

  const isLocked = lockedUntil && Date.now() < lockedUntil;

  // ─────────────────────────────────────────────────────────────────────────────
  return (
    <div className="login-page">

      {/* ══════════ LEFT BRAND PANEL ══════════ */}
      <aside className="login-brand">
        {/* Logo row */}
        <div className="brand-logo-row">
          <div className="brand-logo-icon">
            <Icon name="academic" size={24} color="#fff" />
          </div>
          <div className="brand-wordmark">
            <strong>ADANI ERP</strong>
            <span>University Portal</span>
          </div>
        </div>

        {/* Hero content */}
        <div className="brand-hero">
          <div className="brand-tag">
            <div className="brand-tag-dot" />
            Academic Year 2024–25
          </div>
          <div className="brand-divider" />
          <h1>
            Smart Academic<br />
            Management<br />
            <em>Simplified.</em>
          </h1>
          <p>
            One unified platform for students, faculty, and administrators to manage academics, assignments, attendance, and results.
          </p>

          {/* Features */}
          <div className="brand-features">
            {[
              { icon: "academic", text: "Course & Curriculum Management" },
              { icon: "calendar", text: "Timetable & Attendance Tracking" },
              { icon: "chart",    text: "Real-Time Results & Analytics"  },
              { icon: "shield",   text: "Secure Role-Based Access"       },
            ].map((f) => (
              <div className="brand-feature" key={f.text}>
                <div className="brand-feature-icon">
                  <Icon name={f.icon} size={16} />
                </div>
                <span>{f.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer note */}
        <div className="brand-footer">
          <p>© 2025 Adani University</p>
          <div className="brand-footer-dot" />
          <p>All rights reserved</p>
          <div className="brand-footer-dot" />
          <p>v2.4.1</p>
        </div>
      </aside>

      {/* ══════════ RIGHT LOGIN PANEL ══════════ */}
      <main className="login-right">
        <div className="login-card">

          {/* Mobile logo (visible only on mobile) */}
          <div className="mobile-brand-row">
            <div className="brand-logo-icon">
              <Icon name="academic" size={20} color="#fff" />
            </div>
            <strong>ADANI ERP</strong>
          </div>

          {/* Card header */}
          <div className="login-card__header">
            <h2>Login to ERP Portal</h2>
            <p>Enter your credentials to access your dashboard</p>
          </div>

          {/* Alert message */}
          {alert && (
            <div className={`login-alert login-alert--${alert.type}`}>
              <Icon
                name={alert.type === "success" ? "checkCircle" : alert.type === "warning" ? "warning" : "alertCircle"}
                size={16}
                color="currentColor"
              />
              {alert.message}
            </div>
          )}

          {/* Attempts badge */}
          {attempts > 0 && attempts < MAX_ATTEMPTS && !isLocked && (
            <div className="attempts-badge">
              <Icon name="warning" size={13} color="currentColor" />
              {MAX_ATTEMPTS - attempts} login attempt{MAX_ATTEMPTS - attempts !== 1 ? "s" : ""} remaining
            </div>
          )}

          {/* Lockout countdown */}
          {isLocked && (
            <div className="lockout-timer">
              🔒 Account locked. Try again in <strong>{countdown}s</strong>
            </div>
          )}

          {/* Form */}
          <form className="login-form" onSubmit={handleSubmit} noValidate>

            {/* Identifier */}
            <div className="form-group">
              <label className="form-label" htmlFor="identifier">
                Email / Enrollment ID / Employee ID
                <span className="required">*</span>
              </label>
              <div className="input-wrap">
                <span className="input-icon">
                  <Icon name="user" size={17} />
                </span>
                <input
                  ref={identifierRef}
                  id="identifier"
                  type="text"
                  className={`form-input${fieldErrors.identifier ? " form-input--error" : ""}`}
                  placeholder="e.g. 21CS049 or name@adani.edu"
                  value={identifier}
                  onChange={(e) => { setIdentifier(e.target.value); setFieldErrors((p) => ({ ...p, identifier: "" })); }}
                  disabled={loading || isLocked}
                  autoComplete="username"
                  spellCheck={false}
                />
              </div>
              {fieldErrors.identifier && (
                <span className="field-error">
                  <Icon name="alertCircle" size={12} color="currentColor" /> {fieldErrors.identifier}
                </span>
              )}
            </div>

            {/* Password */}
            <div className="form-group">
              <label className="form-label" htmlFor="password">
                Password <span className="required">*</span>
              </label>
              <div className="input-wrap">
                <span className="input-icon">
                  <Icon name="lock" size={17} />
                </span>
                <input
                  id="password"
                  type={showPw ? "text" : "password"}
                  className={`form-input${fieldErrors.password ? " form-input--error" : ""}`}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setFieldErrors((p) => ({ ...p, password: "" })); }}
                  disabled={loading || isLocked}
                  autoComplete="current-password"
                  style={{ paddingRight: 44 }}
                />
                <button
                  type="button"
                  className="pw-toggle"
                  onClick={() => setShowPw((v) => !v)}
                  tabIndex={-1}
                  aria-label={showPw ? "Hide password" : "Show password"}
                >
                  <Icon name={showPw ? "eyeOff" : "eye"} size={18} />
                </button>
              </div>
              {fieldErrors.password && (
                <span className="field-error">
                  <Icon name="alertCircle" size={12} color="currentColor" /> {fieldErrors.password}
                </span>
              )}
            </div>

            {/* Remember me + Forgot */}
            <div className="form-row-meta">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={loading || isLocked}
                />
                <span>Remember me</span>
              </label>
              <button
                type="button"
                className="forgot-link"
                onClick={handleForgotPassword}
                disabled={loading}
              >
                Forgot password?
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className={`login-btn${loading ? " login-btn--loading" : ""}`}
              disabled={loading || isLocked}
            >
              {loading ? (
                <><div className="btn-spinner" /> Verifying…</>
              ) : isLocked ? (
                <>🔒 Locked ({countdown}s)</>
              ) : (
                <>Sign In <Icon name="chevronRight" size={17} color="#fff" /></>
              )}
            </button>

            <div className="form-divider">
              <span>Role is detected automatically</span>
            </div>

            {/* Help */}
            <div className="login-help">
              Having trouble?&nbsp;
              <a href="mailto:erp-support@adani.edu">Contact IT Support</a>
            </div>

          </form>

          {/* Card footer */}
          <div className="login-card__footer">
            <p>© 2025 Adani University. All rights reserved.</p>
            <div style={{ display: "flex", gap: 14 }}>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Use</a>
            </div>
          </div>

        </div>
      </main>

    </div>
  );
}