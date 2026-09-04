import React, { useState } from "react";

export default function EMerchantForm({ item }) {
  const [formData, setFormData] = useState({
    companyType: "",
    email: item?.email || "",
    category: item?.category || "",
    contactPerson: "",
    phone: item?.phone || "",
    submitted: item?.date || "",
    accountNumber: "",
    bankName: "",
    accountHolder: ""
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
    <div className="emerchant-form">
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="companyType">Company Type *</label>
          <select
            id="companyType"
            name="companyType"
            value={formData.companyType}
            onChange={handleChange}
          >
            <option value="">Select...</option>
            <option value="retail">Retail</option>
            <option value="wholesale">Wholesale</option>
            <option value="service">Service</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder=""
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category *</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Select...</option>
            <option value="government">Government</option>
            <option value="private">Private</option>
            <option value="nonprofit">Non-Profit</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="contactPerson">Contact Person *</label>
          <input
            type="text"
            id="contactPerson"
            name="contactPerson"
            value={formData.contactPerson}
            onChange={handleChange}
            placeholder=""
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number *</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
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
            value={formData.submitted}
            onChange={handleChange}
          />
        </div>

        <div className="form-group full-width">
          <label htmlFor="bankName">Bank Name *</label>
          <input
            type="text"
            id="bankName"
            name="bankName"
            value={formData.bankName}
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
            value={formData.accountHolder}
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
            value={formData.accountNumber}
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