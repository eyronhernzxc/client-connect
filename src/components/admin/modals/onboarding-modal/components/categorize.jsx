import React, { useEffect, useState } from "react";
import { updateCompanyType } from "../../../../../api/updateCompanyType.js";

const API_BASE_URL = "http://192.168.122.200:8000/api";

export default function Categorize({ item }) {
  const [companyTypes, setCompanyTypes] = useState([]);
  const [companyTypeId, setCompanyTypeId] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadCategorizeData = async () => {
      if (!item?.companyId) {
        setLoading(false);
        setError("Company ID is not available.");
        return;
      }

      try {
        setLoading(true);
        setError("");

        /*
         * ============================================================
         * GET /api/company-types
         * ============================================================
         *
         * Holds: name, description (and presumably id, following the
         * same shape as every other list endpoint in this project).
         */
        const companyTypesResponse = await fetch(
          `${API_BASE_URL}/company-types`
        );

        if (!companyTypesResponse.ok) {
          throw new Error("Failed to fetch company types");
        }

        const companyTypesData = await companyTypesResponse.json();

        const companyTypesDataValue =
          companyTypesData?.data ?? companyTypesData;

        const companyTypesList = Array.isArray(companyTypesDataValue)
          ? companyTypesDataValue
          : companyTypesDataValue
          ? [companyTypesDataValue]
          : [];

        setCompanyTypes(companyTypesList);

        /*
         * ============================================================
         * GET /api/companies
         * ============================================================
         *
         * Used only to find this company's current company_type_id,
         * so the dropdown starts on the right value.
         */
        const companiesResponse = await fetch(`${API_BASE_URL}/companies`);

        if (!companiesResponse.ok) {
          throw new Error("Failed to fetch companies");
        }

        const companiesData = await companiesResponse.json();

        const companiesDataValue = companiesData?.data ?? companiesData;

        const companies = Array.isArray(companiesDataValue)
          ? companiesDataValue
          : companiesDataValue
          ? [companiesDataValue]
          : [];

        const company = companies.find(
          (c) => Number(c.id) === Number(item.companyId)
        );

        console.log("COMPANY (categorize):", company);

        const currentTypeId = company?.company_type_id
          ? String(company.company_type_id)
          : "";

        setCompanyTypeId(currentTypeId);

        // Pre-fill Company Description with the current type's description.
        const currentType = companyTypesList.find(
          (type) => String(type.id) === currentTypeId
        );

        setDescription(currentType?.description || "");
      } catch (err) {
        console.error("Error loading categorize data:", err);

        setError(err.message || "Failed to load company type data.");
      } finally {
        setLoading(false);
      }
    };

    loadCategorizeData();
  }, [item?.companyId]);

  const handleTypeChange = (e) => {
    const newTypeId = e.target.value;
    setCompanyTypeId(newTypeId);

    // Auto-fill Company Description with the newly selected type's description.
    const newType = companyTypes.find(
      (type) => String(type.id) === newTypeId
    );

    setDescription(newType?.description || "");
  };

  const persistCompanyType = async () => {
    if (!item?.companyId || !companyTypeId) return;

    try {
      setSaving(true);
      setError("");

      await updateCompanyType(item.companyId, Number(companyTypeId));
    } catch (err) {
      console.error("Failed to save company type:", err);

      setError(err.message || "Failed to save company type.");
    } finally {
      setSaving(false);
    }
  };

  const handleSaveDraft = async () => {
    console.log("Save Draft:", { companyTypeId, description });

    await persistCompanyType();
  };

  const handleContinue = async () => {
    console.log("Continue:", { companyTypeId, description });

    await persistCompanyType();
  };

  if (loading) {
    return (
      <div className="categorize-form">
        <p>Loading company type...</p>
      </div>
    );
  }

  return (
    <div className="categorize-form">

      {error && (
        <p style={{ color: "red" }}>{error}</p>
      )}

      <div className="form-group full-width">
        <label htmlFor="companyType">Company Type *</label>
        <select
          id="companyType"
          name="companyType"
          value={companyTypeId}
          onChange={handleTypeChange}
        >
          <option value="">Select a company type...</option>
          {companyTypes.map((type) => (
            <option key={type.id} value={String(type.id)}>
              {type.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group full-width">
        <label htmlFor="description">Company Description *</label>
        <textarea
          id="description"
          name="description"
          value={description}
          placeholder="Provide a detailed description of your business activities and services"
          rows="5"
          readOnly
        />
      </div>

      <div className="form-actions">
        <button className="btn-cancel" type="button">Cancel</button>
        <button
          className="btn-draft"
          type="button"
          onClick={handleSaveDraft}
          disabled={saving}
        >
          {saving ? "Saving..." : "Save Draft"}
        </button>
        <button
          className="btn-continue"
          type="button"
          onClick={handleContinue}
          disabled={saving}
        >
          {saving ? "Saving..." : "Continue"}
        </button>
      </div>
    </div>
  );
}