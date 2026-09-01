import React, { useState } from "react";

export default function ReqDocs({ item }) {
  const [documents, setDocuments] = useState([
    { id: 1, name: "Letter of Intent of DTI Franchising/Dealership Permit", status: "view" },
    { id: 2, name: "DTI Certificate of Registration", status: "view" },
    { id: 3, name: "BIR Certificate/Registration", status: "view" },
    { id: 4, name: "SEC Articles", status: "view" },
    { id: 5, name: "Bangko Sentral ng Pilipinas (BSP) Authorization", status: "view" },
    { id: 6, name: "Mayor's Permit/Business Permit", status: "view" },
    { id: 7, name: "ITR (Certificate of Income Tax Return)", status: "view" },
    { id: 8, name: "NBI Clearance", status: "view" },
  ]);

  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleViewDocument = (docId) => {
    console.log('View document:', docId);
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setUploadedFiles([...uploadedFiles, ...files]);
  };

  const handleSaveDraft = () => {
    console.log('Save Draft - Uploaded files:', uploadedFiles);
  };

  const handleUploadDocuments = () => {
    console.log('Upload documents:', uploadedFiles);
  };

  return (
    <div className="req-documents-form">
      <div className="documents-list">
        <h3 className="section-title">Required Documents</h3>
        <div className="documents-grid">
          {documents.map((doc) => (
            <div key={doc.id} className="document-item">
              <input type="checkbox" id={`doc-${doc.id}`} className="doc-checkbox" />
              <label htmlFor={`doc-${doc.id}`} className="doc-name">
                {doc.name}
              </label>
              <button
                className="btn-view"
                onClick={() => handleViewDocument(doc.id)}
              >
                VIEW
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="upload-section">
        <h3 className="section-title">Upload Documents</h3>
        <div className="file-upload-area">
          <label htmlFor="file-input" className="upload-label">
            <div className="upload-icon">📁</div>
            <p>Drag and drop files here or click to select</p>
            <span className="upload-hint">Supported formats: PDF, DOC, DOCX, JPG, PNG</span>
          </label>
          <input
            id="file-input"
            type="file"
            multiple
            onChange={handleFileUpload}
            className="file-input-hidden"
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          />
        </div>

        {uploadedFiles.length > 0 && (
          <div className="uploaded-files-list">
            <h4>Uploaded Files ({uploadedFiles.length})</h4>
            <ul>
              {uploadedFiles.map((file, idx) => (
                <li key={idx} className="uploaded-file-item">
                  <span>{file.name}</span>
                  <button
                    className="btn-remove"
                    onClick={() => {
                      setUploadedFiles(uploadedFiles.filter((_, i) => i !== idx));
                    }}
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="form-actions">
        <button className="btn-cancel">Cancel</button>
        <button className="btn-draft" onClick={handleSaveDraft}>Save Draft</button>
        <button className="btn-continue" onClick={handleUploadDocuments}>Upload Documents</button>
      </div>
    </div>
  );
}

