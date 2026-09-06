import React, { useState } from "react";

export default function EMerchantForm({ company }) {

  const signatory = company?.personal_detail?.find(
  (detail) => detail.personal_detail_type_id === 1
);

  const handleChange = (e) => {
    const { company } = e.target;
    setFormData(prev => ({
      ...prev,
      [company]: value
    }));
  };

  const handleSaveDraft = () => {
    console.log('Save Draft:', formData);
  };

  const handleContinue = () => {
    console.log('Continue:', formData);
  };

  return (
    <div className="emerchant-form">
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="signatory">Signatory</label>
          <input
            type="text"
            name="signatory"
             value={`${signatory?.first_name || ""} ${signatory?.middle_name || ""} ${signatory?.last_name || ""}`}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address *</label>
          <input
            type="email"
            id="email"
            value={signatory?.email}
           
            onChange={handleChange}
            placeholder=""
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="text"
            id="phone"
            value={signatory?.phone_number}

            onChange={handleChange}
          />

        </div>

        <div className="form-group">
          <label htmlFor="birthdate">Birthdate</label>
          <input
            type="text"
            id="birthdate"
            value={signatory?.birthdate}

            onChange={handleChange}
            placeholder=""
          />

        </div>

        <div className="form-group">
          <label htmlFor="nationality">Nationality</label>
          <input
            type="text"
            id="nationality"
            value={signatory?.nationality}

            onChange={handleChange}
            placeholder=""
          />
        </div>

        <div className="form-group">
          <label htmlFor="submitted">Date Submitted</label>
          <input
            type="date"
            id="submitted"
            name="submitted"

            onChange={handleChange}
          />
        </div>

        <div className="form-group full-width">
          <label htmlFor="bankName">Bank Name *</label>
          <input
            type="text"
            id="bankName"
            name="bankName"

            onChange={handleChange}
            placeholder=""
          />
        </div>

        <div className="form-group">
          <label htmlFor="accountHolder">Account Holder Name *</label>
          <input
            type="text"
            id="accountHolder"
            name="accountHolder"
            onChange={handleChange}
            placeholder=""
          />
        </div>

        <div className="form-group">
          <label htmlFor="accountNumber">Account Number *</label>
          <input
            type="text"
            id="accountNumber"
            name="accountNumber"
            onChange={handleChange}
            placeholder=""
          />
        </div>
      </div>

      <div className="form-actions">
        <button className="btn-cancel">Cancel</button>
        <button className="btn-draft" onClick={handleSaveDraft}>Save Draft</button>
        <button className="btn-continue" onClick={handleContinue}>Continue</button>
      </div>
    </div>
  );
}