import "./application-review-modal.css";
import React, { useState } from 'react'

export default function ApplicationReviewModal({
  isOpen,
  onClose,
  applicationData,
}) {
  const [remarks, setRemarks] = useState({});
  const [activeTab, setActiveTab] = useState("documents");
  const [selectedDoc, setSelectedDoc] = useState(null);
  
  if (!isOpen || !applicationData) return null;

  const documents = [
    {
      id: 1,
      name: 'Latest version of Enabling Law/Charter/Presidential Decree',
      status: 'verified',
      uploadedBy: 'merchant'
    },
    {
      id: 2,
      name: 'GOCC Website',
      status: 'verified',
      uploadedBy: 'merchant'
    },
    {
      id: 3,
      name: 'GOCC Profile/Background',
      status: 'verified',
      uploadedBy: 'merchant'
    },
    {
      id: 4,
      name: 'Latest Business Permit',
      status: 'verified',
      uploadedBy: 'merchant'
    },
    {
      id: 5,
      name: 'SEC Certificate of Registration w/ Articles of Incorporation',
      status: 'pending',
      uploadedBy: null
    },
    {
      id: 6,
      name: 'BIR Certificate of Registration (Form 2303)',
      status: 'pending',
      uploadedBy: null
    },
    {
      id: 7,
      name: 'Latest Government Corporate Information Sheet (GCIS)',
      status: 'pending',
      uploadedBy: null
    },
    {
      id: 8,
      name: 'Beneficial Owner Declaration Form',
      status: 'verified',
      uploadedBy: 'merchant'
    },
    {
      id: 9,
      name: 'Latest Audited Financial Statement',
      status: 'verified',
      uploadedBy: 'merchant'
    }
  ];

  const handleDocumentClick = (docId) => {
    setSelectedDoc(selectedDoc === docId ? null : docId);
  };

  const handleRemarksChange = (docId, text) => {
    setRemarks(prev => ({
      ...prev,
      [docId]: text
    }));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="review-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="modal-close"
          onClick={onClose}
        >
          ×
        </button>
        
        <div className="review-modal-header">
          <div className="header-top">
            <span className="date-info">2026-08-15 19:22</span>
            <h2>{applicationData.companyName}</h2>
          </div>
          <div className="tabs">
            <button 
              className={`tab-btn ${activeTab === 'documents' ? 'active' : ''}`}
              onClick={() => setActiveTab('documents')}
            >
              Document Review
            </button>
            <button 
              className={`tab-btn ${activeTab === 'submitted' ? 'active' : ''}`}
              onClick={() => setActiveTab('submitted')}
            >
              Submitted Forms
            </button>
          </div>
        </div>

        {activeTab === 'documents' && (
          <div className="review-modal-content">
            <div className="document-checklist">
              <div className="checklist-header">
                <h3>DOCUMENT CHECKLIST</h3>
                <span className="progress">{documents.filter(d => d.status === 'verified').length}/{documents.length} verified</span>
              </div>

              <div className="documents-container">
                {documents.map((doc) => (
                  <div key={doc.id}>
                    <div 
                      className={`document-item ${doc.status} ${selectedDoc === doc.id ? 'selected' : ''}`}
                      onClick={() => handleDocumentClick(doc.id)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="doc-checkbox">
                        <input type="checkbox" disabled />
                      </div>
                      <div className="doc-info">
                        <p className="doc-name">{doc.name}</p>
                        <p className={`doc-status ${doc.status}`}>
                          {doc.status === 'verified' ? (
                            <>
                              <span className="status-badge verified">✓ Verified</span>
                              <span className="uploaded-info">Not yet uploaded by merchant</span>
                            </>
                          ) : (
                            <span className="status-badge pending">Verify</span>
                          )}
                        </p>
                      </div>
                    </div>
                    {selectedDoc === doc.id && (
                      <div className="document-remarks">
                        <label htmlFor={`remarks-${doc.id}`}>ADD REMARK</label>
                        <textarea
                          id={`remarks-${doc.id}`}
                          className="remarks-input"
                          placeholder="Type a remark or reason for the merchant..."
                          value={remarks[doc.id] || ''}
                          onChange={(e) => handleRemarksChange(doc.id, e.target.value)}
                        />
                        <div className="doc-action-buttons">
                          <button className="btn-verify">✓ Verify</button>
                          <button className="btn-request">↻ Request Re-upload</button>
                          <button className="btn-report">⚠ Report</button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="decision-section">
                <h3>DECISION</h3>
                <p className="decision-text">Approve unlocks once all documents are verified.</p>
                <div className="decision-buttons">
                  <button className="btn-approve-decision">✓ Approve</button>
                  <button className="btn-reject-decision">✕ Reject</button>
                </div>
              </div>
          </div>
          </div>
        )}

        {activeTab === 'submitted' && (
          <div className="review-modal-content">
            <div className="submitted-forms">
              <p>No additional forms submitted</p>
            </div>
          </div>
        )}

        <div className="modal-footer">
          <button className="btn-cancel">Cancel</button>
          <button className="btn-save-assessment">Save Assessment</button>
        </div>
      </div>
    </div>
    );
}