import React, { useEffect, useState } from "react";

import { getCompanyTypes } from "../../../../../api/getCompanyTypes";
import { putCompany } from "../../../../../api/putCompany";

export default function Categorize({ company }) {
  const [category, setCategory] = useState([]);
  const [companyType, setCompanyType] = useState("");

  useEffect(() => {
    if (company?.company_type_id) {
      setCompanyType(company.company_type_id);
    }
  }, [company]);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const data = await getCompanyTypes();
        setCategory(data);
       
      } catch (error) {
        console.error("Failed to fetch company types:", error);
      }
    };

    fetchCategory();
  }, []);

  const handleChange = (e) => {
    setCompanyType(e.target.value);
  };

  const handleSaveDraft = () => {
    console.log("Save Draft");
  };

  const updateCategory = async (event) => {
    event.preventDefault();

    try {
      const data = await putCompany(company.id, {
        company_type_id: Number(companyType),
      });

      console.log("Company updated:", data);
       alert("Categorized Successfully")
    } catch (error) {
      console.error(
        "Failed to update company:",
        error.response?.data || error
      );
    }
  };

  return (
    <form className="categorize-form" onSubmit={updateCategory}>
      <div className="form-group full-width">
        <label htmlFor="category">Company Type</label>

        <select
          id="category"
          name="category"
          value={companyType}
          onChange={handleChange}
        >
          <option value="">Select a category...</option>

          {category.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-actions">
        <button type="button" className="btn-cancel">
          Cancel
        </button>

        <button
          type="button"
          className="btn-draft"
          onClick={handleSaveDraft}
        >
          Save Draft
        </button>

        <button type="submit" className="btn-continue">
          Submit
        </button>
      </div>
    </form>
  );
}