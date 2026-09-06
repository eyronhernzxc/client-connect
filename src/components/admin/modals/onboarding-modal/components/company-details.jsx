import React, { useState } from "react";

export default function CompanyDetails({ company }) {


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
    <div className="company-details-form">
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="companyName">Company Name *</label>
          <input
            type="text"
            id="companyName"
            value={company?.name}
            onChange={handleChange}
            
          />
        </div>

        <div className="form-group">
          <label htmlFor="type">Company Type*</label>
          <input
            type="text"
            id="type"
            value={company?.company_type?.name}
            onChange={handleChange}
            
          />
        </div>

        <div className="form-group">
          <label htmlFor="dtiSecRegNo">DTI / SEC Registration No. *</label>
          <input
            type="text"
            id="dtiSecRegNo"
           value={company?.company_detail?.dti_registration_number}
            onChange={handleChange}
            placeholder=""
          />
        </div>

        <div className="form-group">
          <label htmlFor="dateOfRegistration">Date of Registration</label>
          <input
            type="text"
            id="dateOfRegistration"
            value={company?.created_at || ""}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="tinNumber">Tax Identification No. (TIN) *</label>
          <input
            type="text"
            id="tinNumber"
            name="tinNumber"
            value={company?.company_detail?.company_tin}
            onChange={handleChange}
            placeholder=""
          />
        </div>

        <div className="form-group">
          <label htmlFor="website">Company website *</label>
          <input
            type="text"
            name="website"
            value={company?.website_url}
            
            onChange={handleChange}
            placeholder=""
          />
        </div>

        <div className="form-group full-width">
          <label htmlFor="businessAddress">Company Address *</label>
          <input
            type="text"
            id="businessAddress"
            name="businessAddress"
            value={company?.company_detail?.address}
            
            onChange={handleChange}
            placeholder=""
          />
        </div>

        <div className="form-group">
          <label htmlFor="zip">Zip Code *</label>
          <input
            type="text"
            id="zip"
            value={company?.company_detail?.zip_code}
            
            onChange={handleChange}
            placeholder=""
          />
        </div>

        <div className="form-group">
          <label htmlFor="contactNumber">Contact Number *</label>
          <input
            type="tel"
            id="contactNumber"
            name="contactNumber"
            value={company?.phone}
            
            onChange={handleChange}
            placeholder=""
          />
        </div>

        <div className="form-group full-width">
          <label htmlFor="emailAddress">Email Address *</label>
          <input
            type="email"
            id="emailAddress"
            name="emailAddress"
            value={company?.email}
            
            onChange={handleChange}
            placeholder=""
          />
        </div>

        <div className="form-group full-width">
          <label htmlFor="remarks">Remarks</label>
          <textarea
            id="remarks"
            name="remarks"
            
            onChange={handleChange}
            placeholder=""
            rows="4"
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