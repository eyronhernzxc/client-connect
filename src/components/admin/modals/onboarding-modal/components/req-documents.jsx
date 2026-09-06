import React, { useEffect, useState } from "react";

export default function ReqDocs({ company }) {
  const [documents, setDocuments] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const requirementsByCompanyType = {
    1: [
       {
      id: 1,
      name: "Latest version of Enabling Law/Charter/Presidential Decree (copy)",
    },
    {
      id: 2,
      name: "e-Merchant's Form (4 pages)",
    },
    {
      id: 3,
      name: "Risk Assessment Questionnaire",
    },
    {
      id: 4,
      name: "GOCC Website",
    },
    {
      id: 5,
      name: "GOCC Profile/Background",
    },
    {
      id: 6,
      name: "Latest Business Permit",
    },
    {
      id: 7,
      name: "SEC Certificate of Registration w/ Articles of Incorporation & By-Laws",
    },
    {
      id: 8,
      name: "BIR Certificate of Registration (Form 2303)",
    },
    {
      id: 9,
      name: "Latest Government Corporate Information Sheet (GCIS)/General Information Sheet",
    },
    {
      id: 10,
      name: "Beneficial Owner Declaration Form",
    },
    {
      id: 11,
      name: "Latest Audited Financial Statement",
    },
    {
      id: 12,
      name: "Latest Income Tax Return",
    },
    {
      id: 13,
      name: "(2) Valid ID of signatory/representative with 3 specimen signatures",
    },
    {
      id: 14,
      name: "Notarized approved resolution for authorized person/signatory & MOA engagement between Pisopay and GOCC",
    },

    // Additional requirements for Financial Institutions
    {
      id: 15,
      name: "BSP License",
      additional: true,
    },
    {
      id: 16,
      name: "AMLC Certificate of Registration",
      additional: true,
    },
    {
      id: 17,
      name: "KYC-AML Questionnaire for Financial Institution",
      additional: true,
    },
    {
      id: 18,
      name: "Latest MIPP",
      additional: true,
    },
    ],

    2: [
      {
        id: 9,
        name: "Government Authorization",
      },
      {
        id: 10,
        name: "BIR Certificate/Registration",
      },
      {
        id: 11,
        name: "Mayor's Permit/Business Permit",
      },
      {
        id: 12,
        name: "NBI Clearance",
      },
    ],

    3: [
      {
        id: 13,
        name: "DTI Certificate of Registration",
      },
      {
        id: 14,
        name: "BIR Certificate/Registration",
      },
      {
        id: 15,
        name: "Mayor's Permit/Business Permit",
      },
      {
        id: 16,
        name: "ITR (Certificate of Income Tax Return)",
      },
      {
        id: 17,
        name: "NBI Clearance",
      },
    ],
  };

  useEffect(() => {
    if (!company?.company_type_id) {
      setDocuments([]);
      return;
    }

    const requirements =
      requirementsByCompanyType[company.company_type_id] || [];

    setDocuments(requirements);
  }, [company]);

  const handleViewDocument = (docId) => {
    console.log("View document:", docId);
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);

    setUploadedFiles((prev) => [...prev, ...files]);
  };

  const handleRemoveFile = (index) => {
    setUploadedFiles((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  const handleSaveDraft = () => {
    console.log("Save Draft - Uploaded files:", uploadedFiles);
  };

  const handleUploadDocuments = () => {
    console.log("Upload documents:", uploadedFiles);
  };

  return (
    <div className="req-documents-form">

      <div className="documents-list">
        <h3 className="section-title">
          Required Documents
        </h3>

        {company?.company_type?.name && (
          <p>
            Requirements for:{" "}
            <strong>{company.company_type.name}</strong>
          </p>
        )}

        {documents.length === 0 ? (
          <p>No requirements available for this company type.</p>
        ) : (
          <div className="documents-grid">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="document-item"
              >
                <input
                  type="checkbox"
                  id={`doc-${doc.id}`}
                  className="doc-checkbox"
                />

                <label
                  htmlFor={`doc-${doc.id}`}
                  className="doc-name"
                >
                  {doc.name}
                </label>

                <button
                  type="button"
                  className="btn-view"
                  onClick={() =>
                    handleViewDocument(doc.id)
                  }
                >
                  VIEW
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="upload-section">
        <h3 className="section-title">
          Upload Documents
        </h3>

        <div className="file-upload-area">
          <label
            htmlFor="file-input"
            className="upload-label"
          >
            <div className="upload-icon">📁</div>

            <p>
              Drag and drop files here or click to select
            </p>

            <span className="upload-hint">
              Supported formats: PDF, DOC, DOCX, JPG, PNG
            </span>
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
            <h4>
              Uploaded Files ({uploadedFiles.length})
            </h4>

            <ul>
              {uploadedFiles.map((file, index) => (
                <li
                  key={`${file.name}-${index}`}
                  className="uploaded-file-item"
                >
                  <span>{file.name}</span>

                  <button
                    type="button"
                    className="btn-remove"
                    onClick={() =>
                      handleRemoveFile(index)
                    }
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
        <button
          type="button"
          className="btn-cancel"
        >
          Cancel
        </button>

        <button
          type="button"
          className="btn-draft"
          onClick={handleSaveDraft}
        >
          Save Draft
        </button>

        <button
          type="button"
          className="btn-continue"
          onClick={handleUploadDocuments}
        >
          Upload Documents
        </button>
      </div>
    </div>
  );
}