// src/pages/Results.jsx
import React, { useState } from 'react';
import './Results.css';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { FaFilePdf, FaPrint, FaTrophy, FaChartLine } from 'react-icons/fa';

const Results = () => {
  const [selectedSem, setSelectedSem] = useState(6);

  // --- MOCK DATA: SGPA TREND (For Graph) ---
  const sgpaTrend = [
    { semester: 'Sem 1', sgpa: 7.8 },
    { semester: 'Sem 2', sgpa: 8.1 },
    { semester: 'Sem 3', sgpa: 7.9 },
    { semester: 'Sem 4', sgpa: 8.4 },
    { semester: 'Sem 5', sgpa: 8.6 },
    { semester: 'Sem 6', sgpa: 8.8 },
  ];

  // --- MOCK DATA: SUBJECT RESULTS (For Table) ---
  const resultsData = [
    { code: "CS601", subject: "Advanced Web Tech", internal: 28, external: 58, total: 86, grade: "A", credits: 4, result: "PASS" },
    { code: "CS602", subject: "Cloud Computing", internal: 25, external: 50, total: 75, grade: "B", credits: 4, result: "PASS" },
    { code: "CS603", subject: "Data Analytics", internal: 29, external: 65, total: 94, grade: "A+", credits: 4, result: "PASS" },
    { code: "CS604", subject: "Software Engineering", internal: 12, external: 20, total: 32, grade: "F", credits: 3, result: "FAIL" }, // Fail Example
    { code: "CS605", subject: "Project Phase I", internal: 48, external: 45, total: 93, grade: "A+", credits: 6, result: "PASS" },
  ];

  // Calculate Summary Logic (Mock)
  const currentSummary = {
    sgpa: 8.72,
    cgpa: 8.45,
    totalCredits: 21,
    status: "PASS" // Or "FAIL" if any subject is F
  };

  // Helper for Badge Colors
  const getGradeClass = (grade) => {
    if (grade === 'A' || grade === 'A+') return 'grade-A';
    if (grade === 'B') return 'grade-B';
    if (grade === 'C') return 'grade-C';
    return 'grade-F';
  };

  return (
    <div className="results-container">
      
      {/* 1. HEADER & SEMESTER SELECT */}
      <div className="results-header">
        <h2><FaTrophy style={{ color: '#F59E0B' }} /> Examination Results</h2>
        <select 
          className="semester-select" 
          value={selectedSem} 
          onChange={(e) => setSelectedSem(e.target.value)}
        >
          <option value={6}>Semester 6 (Winter 2026)</option>
          <option value={5}>Semester 5 (Summer 2025)</option>
          <option value={4}>Semester 4 (Winter 2025)</option>
        </select>
      </div>

      {/* 2. PERFORMANCE SUMMARY CARDS */}
      <div className="performance-summary">
        <div className="result-card">
          <div className="result-label">Semester SGPA</div>
          <div className="result-value" style={{ color: '#0EA5E9' }}>{currentSummary.sgpa}</div>
        </div>
        <div className="result-card">
          <div className="result-label">Overall CGPA</div>
          <div className="result-value" style={{ color: '#8B5CF6' }}>{currentSummary.cgpa}</div>
        </div>
        <div className="result-card">
          <div className="result-label">Total Credits</div>
          <div className="result-value" style={{ color: '#64748B' }}>{currentSummary.totalCredits}</div>
        </div>
        <div className="result-card">
          <div className="result-label">Final Result</div>
          <div className={`result-value ${currentSummary.status === 'PASS' ? 'status-pass' : 'status-fail'}`}>
            {currentSummary.status}
          </div>
        </div>
      </div>

      {/* 3. PERFORMANCE GRAPH (Premium Feature) */}
      <div className="result-chart-section">
        <div className="chart-title"><FaChartLine /> Academic Performance Trend</div>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={sgpaTrend}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
            <XAxis dataKey="semester" axisLine={false} tickLine={false} tick={{fill:'#64748B'}} dy={10} />
            <YAxis domain={[0, 10]} axisLine={false} tickLine={false} tick={{fill:'#64748B'}} />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            />
            <Line type="monotone" dataKey="sgpa" stroke="#0EA5E9" strokeWidth={3} dot={{r: 4, fill: '#0EA5E9'}} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 4. SUBJECT MARKS TABLE (Desktop) */}
      <div className="marks-table-container">
        <table className="marks-table">
          <thead>
            <tr>
              <th>Subject Code</th>
              <th>Subject Name</th>
              <th className="num-col">Internal (50)</th>
              <th className="num-col">External (100)</th>
              <th className="num-col">Total (150)</th>
              <th style={{ textAlign: 'center' }}>Grade</th>
              <th style={{ textAlign: 'center' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {resultsData.map((row, index) => (
              <tr key={index} className={row.result === 'FAIL' ? 'row-fail' : ''}>
                <td style={{ fontWeight: '600', color: '#64748B' }}>{row.code}</td>
                <td style={{ fontWeight: '600', color: '#0F172A' }}>{row.subject}</td>
                <td className="num-col">{row.internal}</td>
                <td className="num-col">{row.external}</td>
                <td className="num-col" style={{ fontWeight: '700' }}>{row.total}</td>
                <td style={{ textAlign: 'center' }}>
                  <span className={`grade-badge ${getGradeClass(row.grade)}`}>{row.grade}</span>
                </td>
                <td style={{ textAlign: 'center', fontWeight: '700', color: row.result === 'PASS' ? '#166534' : '#991B1B' }}>
                  {row.result}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 5. MOBILE CARD VIEW (Phone) */}
      <div className="mobile-result-list">
        {resultsData.map((row, index) => (
          <div key={index} className={`mobile-subject-card ${row.result === 'PASS' ? 'pass' : 'fail'}`}>
            <div className="m-card-header">
              <span>{row.subject}</span>
              <span className={`grade-badge ${getGradeClass(row.grade)}`}>{row.grade}</span>
            </div>
            
            <div className="m-card-row">
              <span className="m-label">Subject Code</span>
              <span className="m-value">{row.code}</span>
            </div>
            <div className="m-card-row">
              <span className="m-label">Internal / External</span>
              <span className="m-value">{row.internal} / {row.external}</span>
            </div>
            <div className="m-card-row">
              <span className="m-label">Total Marks</span>
              <span className="m-value">{row.total}</span>
            </div>
            <div className="m-card-row">
              <span className="m-label">Result Status</span>
              <span className="m-value" style={{ color: row.result === 'PASS' ? '#10B981' : '#EF4444' }}>
                {row.result}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* 6. DOWNLOAD ACTIONS */}
      <div className="result-actions">
        <button className="btn-print" onClick={() => window.print()}>
          <FaPrint /> Print Result
        </button>
        <button className="btn-download-pdf">
          <FaFilePdf /> Download Marksheet (PDF)
        </button>
      </div>

    </div>
  );
};

export default Results;