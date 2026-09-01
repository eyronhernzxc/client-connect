import React, { useState } from "react";

export default function Categorize({ item }) {
  const [formData, setFormData] = useState({
    category: item?.category || "",
    subcategory: "",
    reason: "",
    description: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveDraft = () => {
    console.log('Save Draft:', formData);
  };

  const handleContinue = () => {
    console.log('Continue:', formData);
  };

  const categories = [
    "Government",
    "Healthcare",
    "Retail",
    "Food & Beverage",
    "Transportation",
    "Technology",
    "Finance",
    "Education",
    "Manufacturing",
    "Entertainment",
    "Other"
  ];

  return (
    <div className="categorize-form">
      <div className="form-group full-width">
        <label htmlFor="category">Business Category *</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="">Select a category...</option>
          {categories.map((cat, idx) => (
            <option key={idx} value={cat.toLowerCase()}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group full-width">
        <label htmlFor="reason">Reason for Category *</label>
        <textarea
          id="reason"
          name="reason"
          value={formData.reason}
          onChange={handleChange}
          placeholder="Explain why this category best fits your business"
          rows="5"
        />
      </div>

      <div className="form-group full-width">
        <label htmlFor="description">Business Description *</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Provide a detailed description of your business activities and services"
          rows="5"
        />
      </div>

      <div className="form-actions">
        <button className="btn-cancel">Cancel</button>
        <button className="btn-draft" onClick={handleSaveDraft}>Save Draft</button>
        <button className="btn-continue" onClick={handleContinue}>Continue</button>
      </div>
    </div>
  );
}
