// src/pages/Fees.jsx
import React, { useState } from 'react';
import './Billing.css'
import { FaDownload, FaCreditCard, FaHistory, FaFileInvoiceDollar } from 'react-icons/fa';

const Fees = () => {
  const [activeTab, setActiveTab] = useState('All');

  // --- MOCK DATA ---
  const feeData = [
    {
      id: "INV-2026-001",
      title: "Semester 6 Tuition Fee",
      dueDate: "15 Mar 2026",
      amount: 85000,
      paid: 0,
      status: "Pending",
      semester: "Sem 6"
    },
    {
      id: "INV-2025-089",
      title: "Hostel Fee (Annual)",
      dueDate: "10 Jan 2026",
      amount: 45000,
      paid: 45000,
      status: "Paid",
      semester: "Sem 5"
    },
    {
      id: "INV-2025-055",
      title: "Library Fine",
      dueDate: "20 Dec 2025",
      amount: 500,
      paid: 500,
      status: "Paid",
      semester: "Sem 5"
    },
    {
      id: "INV-2026-002",
      title: "Exam Fee (Regular)",
      dueDate: "01 Apr 2026",
      amount: 2500,
      paid: 0,
      status: "Pending",
      semester: "Sem 6"
    }
  ];

  // --- CALCULATE TOTALS ---
  const totalAmount = feeData.reduce((acc, item) => acc + item.amount, 0);
  const paidAmount = feeData.reduce((acc, item) => acc + item.paid, 0);
  const dueAmount = totalAmount - paidAmount;

  // --- FILTER LOGIC ---
  const filteredFees = feeData.filter(fee => {
    if (activeTab === 'All') return true;
    return fee.status === activeTab;
  });

  // Helper for Currency Formatting
  const formatCurrency = (amount) => {
    return "₹" + amount.toLocaleString('en-IN');
  };

  return (
    <div className="fees-container">
      
      {/* 1. HEADER */}
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#0F172A' }}>Fees & Billing</h2>
        <p style={{ color: '#64748B' }}>Manage your semester fees and download receipts.</p>
      </div>

      {/* 2. FINANCIAL SUMMARY CARDS */}
      <div className="fees-summary">
        {/* Total Card */}
        <div className="fee-card">
          <div className="fee-card-title">Total Invoiced</div>
          <div className="fee-amount text-blue">{formatCurrency(totalAmount)}</div>
        </div>

        {/* Paid Card */}
        <div className="fee-card">
          <div className="fee-card-title">Paid Amount</div>
          <div className="fee-amount text-green">{formatCurrency(paidAmount)}</div>
        </div>

        {/* Due Card */}
        <div className="fee-card">
          <div className="fee-card-title">Outstanding Due</div>
          <div className="fee-amount text-red">{formatCurrency(dueAmount)}</div>
        </div>

        {/* Upcoming Card */}
        <div className="fee-card">
          <div className="fee-card-title">Next Due Date</div>
          <div className="fee-amount text-orange" style={{ fontSize: '1.4rem' }}>15 Mar 2026</div>
        </div>
      </div>

      {/* 3. TABS & FILTERS */}
      <div className="fees-controls">
        <div className="fee-tabs">
          {['All', 'Pending', 'Paid'].map(tab => (
            <button 
              key={tab}
              className={`fee-tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        
        {/* Optional Action on Right */}
        {dueAmount > 0 && (
          <button className="btn-pay" style={{ padding: '10px 24px', fontSize: '1rem' }}>
            Pay All Due {formatCurrency(dueAmount)}
          </button>
        )}
      </div>

      {/* 4. DESKTOP TABLE VIEW */}
      <div className="fees-table-container">
        <table className="fees-table">
          <thead>
            <tr>
              <th>Invoice No</th>
              <th>Description</th>
              <th>Due Date</th>
              <th className="amount-col">Amount</th>
              <th>Status</th>
              <th style={{ textAlign: 'center' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredFees.map((fee) => (
              <tr key={fee.id}>
                <td style={{ fontWeight: '500' }}>{fee.id}</td>
                <td>
                  <div style={{ fontWeight: '600' }}>{fee.title}</div>
                  <div style={{ fontSize: '0.8rem', color: '#94A3B8' }}>{fee.semester}</div>
                </td>
                <td>{fee.dueDate}</td>
                <td className="amount-col">{formatCurrency(fee.amount)}</td>
                <td>
                  <span className={`status-badge badge-${fee.status.toLowerCase()}`}>
                    {fee.status}
                  </span>
                </td>
                <td style={{ textAlign: 'center' }}>
                  {fee.status === 'Pending' ? (
                    <button className="btn-pay">Pay Now</button>
                  ) : (
                    <button className="btn-receipt">
                      <FaDownload size={12} /> Receipt
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 5. MOBILE CARD VIEW (Replaces Table on small screens) */}
      <div className="fees-mobile-list">
        {filteredFees.map((fee) => (
          <div key={fee.id} className="mobile-fee-card">
            <div className="mobile-card-header">
              <div style={{ fontWeight: '700', fontSize: '1rem' }}>{fee.title}</div>
              <span className={`status-badge badge-${fee.status.toLowerCase()}`}>
                {fee.status}
              </span>
            </div>
            
            <div className="mobile-card-row">
              <span className="mobile-label">Invoice ID</span>
              <span className="mobile-value">{fee.id}</span>
            </div>
            <div className="mobile-card-row">
              <span className="mobile-label">Due Date</span>
              <span className="mobile-value">{fee.dueDate}</span>
            </div>
            <div className="mobile-card-row">
              <span className="mobile-label">Amount</span>
              <span className="mobile-value" style={{ fontSize: '1.1rem' }}>
                {formatCurrency(fee.amount)}
              </span>
            </div>

            <div style={{ marginTop: '16px' }}>
              {fee.status === 'Pending' ? (
                <button className="btn-pay" style={{ width: '100%' }}>Pay Now</button>
              ) : (
                <button className="btn-receipt" style={{ width: '100%', justifyContent: 'center' }}>
                  <FaDownload /> Download Receipt
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredFees.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px', color: '#94A3B8' }}>
          <h3>No {activeTab} bills found.</h3>
        </div>
      )}

    </div>
  );
};

export default Fees;