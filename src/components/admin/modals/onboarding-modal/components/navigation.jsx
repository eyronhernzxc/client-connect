import { useState } from 'react';
import React from 'react'

export default function Navigation({activeTab, setActiveTab}) {
  return (
    <div className='nav-container'>
      <button
        className={`nav ${activeTab === "company" ? "active" : ""}`}
        onClick={() => setActiveTab("company")}
        >
          <span className="nav-number">1</span>
          <p>Company Details</p>
        </button>
      
      <button
        className={`nav ${activeTab === "emerchant" ? "active" : ""}`}
        onClick={() => setActiveTab("emerchant")}
        >
          <span className="nav-number">2</span>
          <p>E-Merchant Form</p>
        </button>

      <button
        className={`nav ${activeTab === "categorize" ? "active" : ""}`}
        onClick={() => setActiveTab("categorize")}
        >
          <span className="nav-number">3</span>
          <p>Categorize</p>
        </button>
      
      <button
        className={`nav ${activeTab === "req-documents" ? "active" : ""}`}
        onClick={() => setActiveTab("req-documents")}
        >
          <span className="nav-number">4</span>
          <p>Required Documents</p>
        </button>
    </div>
  )
}
