import React, { useState } from "react";

export default function CompanyDetails({ item }) {
  const [formData, setFormData] = useState({
    companyName: item?.companyName || "",
    businessType: "",
    dtiSecRegNo: "",
    dateOfRegistration: "",
    tinNumber: "",
    industryNature: "",
    businessAddress: "",
    cityProvince: "",
    contactNumber: "",
    emailAddress: "",
    remarks: ""
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

  return (
    <div className="company-details-form">
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="companyName">Company Name *</label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder=""
          />
        </div>

        <div className="form-group">
          <label htmlFor="businessType">Business Type *</label>
          <select
            id="businessType"
            name="businessType"
            value={formData.businessType}
            onChange={handleChange}
          >
            <option value="">Select...</option>
            <option value="sole-proprietorship">Sole Proprietorship</option>
            <option value="partnership">Partnership</option>
            <option value="corporation">Corporation</option>
            <option value="llc">LLC</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="dtiSecRegNo">DTI / SEC Registration No. *</label>
          <input
            type="text"
            id="dtiSecRegNo"
            name="dtiSecRegNo"
            value={formData.dtiSecRegNo}
            onChange={handleChange}
            placeholder=""
          />
        </div>

        <div className="form-group">
          <label htmlFor="dateOfRegistration">Date of Registration</label>
          <input
            type="date"
            id="dateOfRegistration"
            name="dateOfRegistration"
            value={formData.dateOfRegistration}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="tinNumber">Tax Identification No. (TIN) *</label>
          <input
            type="text"
            id="tinNumber"
            name="tinNumber"
            value={formData.tinNumber}
            onChange={handleChange}
            placeholder=""
          />
        </div>

        <div className="form-group">
          <label htmlFor="industryNature">Industry / Nature of Business *</label>
          <input
            type="text"
            id="industryNature"
            name="industryNature"
            value={formData.industryNature}
            onChange={handleChange}
            placeholder=""
          />
        </div>

        <div className="form-group full-width">
          <label htmlFor="businessAddress">Business Address *</label>
          <input
            type="text"
            id="businessAddress"
            name="businessAddress"
            value={formData.businessAddress}
            onChange={handleChange}
            placeholder=""
          />
        </div>

        <div className="form-group">
          <label htmlFor="cityProvince">City / Province *</label>
          <input
            type="text"
            id="cityProvince"
            name="cityProvince"
            value={formData.cityProvince}
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
            value={formData.contactNumber}
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
            value={formData.emailAddress}
            onChange={handleChange}
            placeholder=""
          />
        </div>

        <div className="form-group full-width">
          <label htmlFor="remarks">Remarks</label>
          <textarea
            id="remarks"
            name="remarks"
            value={formData.remarks}
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