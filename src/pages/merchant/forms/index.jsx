import React, { useEffect, useState } from "react";

import "./form.css";

import "../../../components/merchant/header/header.css";

import PageHeader from "../../../components/merchant/header/page-header.jsx";

import Table from "../../../components/merchant/table/table.jsx";

import SearchToolbar from "../../../components/merchant/table/searchbar/searchbar.jsx";

import { getCurrentUser } from "../../../api/auth";

import { getRequirements } from "../../../api/getRequirements.js";

import { postDocument } from "../../../api/postDocument.js";

import {api} from "../../../api/api.js";


export default function Forms() {
  const [user, setUser] = useState(null);

  const [requirements, setRequirements] = useState([]);

  const [loading, setLoading] = useState(true);

  const [selectedRequirement, setSelectedRequirement] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [file, setFile] = useState(null);


  useEffect(() => {
    document.title = "Pisopay | Forms";

    const fetchUserAndRequirements = async () => {
      try {
        const response = await getCurrentUser();

        const userData = response?.data;

        setUser(userData);

        const companyTypeId =
          userData?.company?.company_type_id;

        if (!companyTypeId) {
          setRequirements([]);
          return;
        }

        const requirementsResponse =
          await getRequirements(companyTypeId);

        setRequirements(
          requirementsResponse?.data || []
        );

      } catch (error) {
        console.error(
          "Failed to fetch user or requirements:",
          error
        );

        setRequirements([]);

      } finally {
        setLoading(false);
      }
    };

    fetchUserAndRequirements();
  }, []);


  const company = user?.company;


  // =========================
  // OPEN UPLOAD MODAL
  // =========================

  const handleOpenRequirement = (requirement) => {
    setSelectedRequirement(requirement);

    setFile(null);

    setIsModalOpen(true);
  };


  // =========================
  // CLOSE MODAL
  // =========================

  const handleCloseModal = () => {
    setSelectedRequirement(null);

    setFile(null);

    setIsModalOpen(false);
  };


  // =========================
  // FILE CHANGE
  // =========================

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };


  // =========================
  // SUBMIT DOCUMENT
  // =========================

  const handleSave = async () => {
    if (!file) {
      alert("Please upload a file.");
      return;
    }

    if (!company?.id) {
      alert("Company ID not found.");
      return;
    }

    if (!selectedRequirement?.id) {
      alert("Requirement ID not found.");
      return;
    }

    try {
      const formData = new FormData();

      formData.append(
        "company_id",
        company.id
      );

      formData.append(
        "requirement_id",
        selectedRequirement.id
      );

      formData.append(
        "status",
        "processing"
      );

      formData.append(
        "document",
        file
      );

      const response =
        await postDocument(formData);

      console.log(
        "Document uploaded:",
        response
      );

      alert(
        "Document submitted successfully."
      );

      handleCloseModal();

    } catch (error) {
      console.error(
        "Failed to upload document:",
        error
      );

      console.error(
        "API error:",
        error?.response?.data
      );

      alert(
        "Failed to submit document."
      );
    }
  };


  // =========================
  // VIEW FORM PDF
  // =========================

  const handleViewForm = async (formId) => {
    try {
      const response = await api.get(
        `/pdf/generate/${formId}`,
        {
          responseType: "blob",
        }
      );

      const pdfUrl =
        URL.createObjectURL(response.data);

      window.open(
        pdfUrl,
        "_blank"
      );

    } catch (error) {
      console.error(
        "Failed to generate PDF:",
        error
      );

      alert(
        "Failed to open the form."
      );
    }
  };


  return (
    <div className="merchant-container">

      <PageHeader>

        <div className="name-container">
          <h1 className="page-title">
            Forms
          </h1>
        </div>

        <p className="page-desc">
          Select a form to view its details and submit it.
        </p>

      </PageHeader>


      <div className="page-gap"></div>


      <div className="table-container">

        <SearchToolbar
          searchtool={
            <>
              <input
                type="text"
                id="ob-search"
                className="searchbar"
                placeholder="Search forms"
              />

              <span className="flex"></span>
            </>
          }
        />


        <Table
          tablecontent={
            <table className="table-content">

              <thead>
                <tr className="tbl-header">

                  <th>FORM</th>

                  <th>DATE ACCOMPLISHED</th>

                  <th>DEADLINE</th>

                  <th>REFERENCE</th>

                  <th>STATUS</th>

                  <th>ACTION</th>

                </tr>
              </thead>


              <tbody>

                {/* =========================
                    E-MERCHANT
                ========================= */}

                <tr>

                  <td>
                    E-Merchant
                  </td>

                  <td>
                    -
                  </td>

                  <td>
                    -
                  </td>

                  <td>
                    -
                  </td>

                  <td>
                    <span className="status">
                      Pending
                    </span>
                  </td>

                  <td>

                    <button
                      type="button"
                      className="btn-view"
                      onClick={() =>
                        handleViewForm(1)
                      }
                    >
                      VIEW
                    </button>

                  </td>

                </tr>


                {/* =========================
                    COMPANY DETAILS
                ========================= */}

                <tr>

                  <td>
                    Company Details
                  </td>

                  <td>
                    -
                  </td>

                  <td>
                    -
                  </td>

                  <td>
                    -
                  </td>

                  <td>
                    <span className="status">
                      Pending
                    </span>
                  </td>

                  <td>

                    <button
                      type="button"
                      className="btn-view"
                      onClick={() =>
                        handleViewForm(2)
                      }
                    >
                      VIEW
                    </button>

                  </td>

                </tr>


                {/* =========================
                    UPLOAD REQUIREMENTS
                ========================= */}

                {loading ? (

                  <tr>

                    <td colSpan="6">
                      Loading requirements...
                    </td>

                  </tr>

                ) : requirements.length === 0 ? (

                  <tr>

                    <td colSpan="6">
                      No requirements found.
                    </td>

                  </tr>

                ) : (

                  requirements.map((requirement) => (

                    <tr key={requirement.id}>

                      <td>
                        {requirement.name}
                      </td>

                      <td>
                        -
                      </td>

                      <td>
                        -
                      </td>

                      <td>
                        -
                      </td>

                      <td>

                        <span className="status">
                          Pending
                        </span>

                      </td>

                      <td>

                        <button
                          type="button"
                          className="btn-open"
                          onClick={() =>
                            handleOpenRequirement(
                              requirement
                            )
                          }
                        >
                          OPEN
                        </button>

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>
          }
        />

      </div>


      {/* =========================
          UPLOAD MODAL
      ========================= */}

      {isModalOpen &&
        selectedRequirement && (

        <div
          className="modal-overlay"
          onClick={handleCloseModal}
        >

          <div
            className="requirement-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="modal-header">

              <h2>
                {selectedRequirement.name}
              </h2>

              <button
                type="button"
                className="modal-close"
                onClick={handleCloseModal}
              >
                ✕
              </button>

            </div>


            <div className="modal-body">

              <label>
                Upload Requirement
              </label>

              <input
                type="file"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                onChange={handleFileChange}
              />


              {file && (

                <p>
                  Selected file:{" "}
                  <strong>
                    {file.name}
                  </strong>
                </p>

              )}

            </div>


            <div className="modal-actions">

              <button
                type="button"
                className="btn-cancel"
                onClick={handleCloseModal}
              >
                Cancel
              </button>


              <button
                type="button"
                className="btn-continue"
                onClick={handleSave}
              >
                Save
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}