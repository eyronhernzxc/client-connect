import "./services-modal.css";
import React from 'react'
import {useState} from "react";

import Header from "./components/header";

export default function ServicesModal({
  isOpen,
  onClose,
  item,
}) {
  const [activeService, setActiveService] = useState("money-transfer");
  
  if (!isOpen) return null;

  const services = ["Money Transfer", "Bills Payment", "E-Loading"];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="services-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="modal-close"
          onClick={onClose}
        >
          ×
        </button>
        
        <Header item={item} />

        <div className="modal-content">
          {/* Current Status */}
          <div className="status-section">
            <label className="section-label">Current Status</label>
            <span className="status-badge pending">{item?.status}</span>
          </div>

          {/* Merchant Information */}
          <div className="info-section">
            <h3 className="section-title">
              Company Information
            </h3>
            <div className="info-grid">
              <div className="info-item">
                <label>Company Name</label>
                <p>{item?.company?.name || "N/A"}</p>
              </div>
              <div className="info-item">
                <label>Company Type</label>
                <p>{item?.company?.company_type?.name || "N/A"}</p>
              </div>
              <div className="info-item">
                 <label>Website Url</label>
                <p>{item?.company?.website_url || "N/A"}</p>
              </div>
              <div className="info-item">
                <label>Email</label>
                 <p>{item?.company?.email || "N/A"}</p>
              </div>
              <div className="info-item">
                <label>Phone Number</label>
                <p>{item?.company?.phone || "N/A"}</p>
              </div>
              <div className="info-item full-width">
                <label>Company Address</label>
                <p>{item?.company?.company_detail?.address || "N/A"}</p>
              </div>
            </div>
          </div>

          {/* Services Requested */}
          <div className="services-section">
            <h3 className="section-title">
              Services Requested
            </h3>
            <div className="services-tabs">
              {services.map((service, idx) => (
                <button
                  key={idx}
                  className={`service-tab ${activeService === service.toLowerCase().replace(/\s/g, '-') ? 'active' : ''}`}
                  onClick={() => setActiveService(service.toLowerCase().replace(/\s/g, '-'))}
                >
                  {service}
                </button>
              ))}
            </div>
          </div>

          {/* Submitted Documents */}
          <div className="documents-section">
            <h3 className="section-title">
              Submitted Documents
            </h3>
            <div className="documents-list">
              <div className="document-item">
                <span className="doc-type">PDF</span>
                <span className="doc-name">DTI Business Registration</span>
              </div>
              <div className="document-item">
                <span className="doc-type">PDF</span>
                <span className="doc-name">Mayor's Permit</span>
              </div>
              <div className="document-item">
                <span className="doc-type">PDF</span>
                <span className="doc-name">BIR Certificate of Registration</span>
              </div>
              <div className="document-item">
                <span className="doc-type">JPG</span>
                <span className="doc-name">Valid Government ID</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="notes-section">
            <h3 className="section-title">
              Notes
            </h3>
            <textarea
              className="notes-textarea"
              placeholder="Add notes here..."
              defaultValue=""
            />
          </div>

          {/*  Buttons */}
          <div className="action-buttons">
            <button className="btn-cancel" onClick={onClose}>Cancel</button>
            <button className="btn-reject">Reject</button>
            <button className="btn-approve">Approve</button>
          </div>
        </div>
      </div>
    </div>
  );
}