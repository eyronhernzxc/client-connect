
import React, { useEffect, useState } from "react";

import { getRequirements } from "../../../../../api/getRequirements.js";

export default function ReqDocs({ company }) {
  const [documents, setDocuments] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const companyTypeId = company?.company_type_id;

  useEffect(() => {
    const fetchRequirements = async () => {
      if (!companyTypeId) {
        setDocuments([]);
        return;
      }

      try {
        setLoading(true);

        const response = await getRequirements(companyTypeId);

        setDocuments(response?.data || []);
      } catch (error) {
        console.error("Failed to fetch requirements:", error);
        setDocuments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRequirements();
  }, [companyTypeId]);

  const handleViewDocument = (doc) => {
    console.log("View document:", doc);
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);

    setUploadedFiles((prev) => [...prev, ...files]);

    e.target.value = "";
  };

  const handleRemoveFile = (index) => {
    setUploadedFiles((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  const handleSaveDraft = () => {
    console.log("Save Draft");
    console.log("Uploaded files:", uploadedFiles);
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

        {loading ? (
          <p>Loading requirements...</p>
        ) : documents.length === 0 ? (
          <p>
            No requirements available for this company type.
          </p>
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

                {doc.additional && (
                  <span className="additional-badge">
                    Additional
                  </span>
                )}

                <button
                  type="button"
                  className="btn-view"
                  onClick={() => handleViewDocument(doc)}
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
            <div className="upload-icon">
              📁
            </div>

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
                  <span>
                    {file.name}
                  </span>

                  <button
                    type="button"
                    className="btn-remove"
                    onClick={() => handleRemoveFile(index)}
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

