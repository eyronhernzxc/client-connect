import React, { useEffect, useState } from "react";
import { getCompanyDetails } from "../../../../../api/getCompanyDetails.js";

const API_BASE_URL = "http://192.168.122.200:8000/api";

/*
 * year_established may come back as either:
 *   - a full date string, e.g. "2020-01-01"
 *   - a bare year, e.g. 2020 or "2020"
 *
 * <input type="date"> needs a YYYY-MM-DD string, so normalize
 * a bare year into Jan 1 of that year.
 */
function toDateInputValue(yearEstablished) {
  if (!yearEstablished) return "";

  const value = String(yearEstablished);

  // Already looks like a full YYYY-MM-DD date.
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return value;
  }

  // Bare 4-digit year.
  if (/^\d{4}$/.test(value)) {
    return `${value}-01-01`;
  }

  return "";
}

function formatCurrency(value) {
  if (value === null || value === undefined || value === "") return "";

  const number = Number(value);
  if (Number.isNaN(number)) return String(value);

  return number.toLocaleString("en-PH", {
    style: "currency",
    currency: "PHP",
  });
}

export default function CompanyDetails({ item }) {
  const [formData, setFormData] = useState({
    companyName: "",
    companyType: "",
    dtiSecRegNo: "",
    dateOfRegistration: "",
    tinNumber: "",
    companyAddress: "",
    zipCode: "",
    contactNumber: "",
    emailAddress: "",
    websiteUrl: "",
    taxType: "",
    applicationPurpose: "",
    expectedTransaction: "",
    transactionTotalAmount: "",
  });

  const [companyTypes, setCompanyTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCompanyDetails = async () => {
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
         * GET /api/companies
         * ============================================================
         *
         * Holds: name, email, phone, website_url, company_type_id.
         * (This endpoint does NOT have address/tin/tax fields.)
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

        console.log("COMPANY:", company);

        /*
         * ============================================================
         * GET /api/company-details
         * ============================================================
         *
         * Holds: address, zip_code, year_established,
         * dti_registration_number, company_tin, tax_type,
         * application_purpose, expected_transaction,
         * transaction_total_amount. Keyed by company_id, not id.
         * (This endpoint does NOT have name/email/phone.)
         */
        const companyDetailsResponse = await getCompanyDetails();

        const companyDetailsList =
          companyDetailsResponse?.data ?? companyDetailsResponse;

        const companyDetailsArray = Array.isArray(companyDetailsList)
          ? companyDetailsList
          : companyDetailsList
          ? [companyDetailsList]
          : [];

        const companyDetail = companyDetailsArray.find(
          (detail) => Number(detail.company_id) === Number(item.companyId)
        );

        console.log("COMPANY DETAIL:", companyDetail);

        if (!company && !companyDetail) {
          setError(
            `No company details found for company ID ${item.companyId}.`
          );
          return;
        }

        /*
         * ============================================================
         * GET /api/company-types
         * ============================================================
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

        const companyType = companyTypesList.find(
          (type) =>
            Number(type.id) ===
            Number(
              company?.company_type_id ?? companyDetail?.company_type_id
            )
        );

        /*
         * ============================================================
         * POPULATE FORM
         * ============================================================
         *
         * name / type / contact / email / website come from
         * /api/companies. Everything else comes from
         * /api/company-details.
         */
        setFormData({
          companyName: company?.name || "",

          companyType: companyType?.id ? String(companyType.id) : "",

          dtiSecRegNo: companyDetail?.dti_registration_number || "",

          dateOfRegistration: toDateInputValue(
            companyDetail?.year_established
          ),

          tinNumber: companyDetail?.company_tin || "",

          companyAddress: companyDetail?.address || "",

          zipCode: companyDetail?.zip_code || "",

          contactNumber: company?.phone || "",

          emailAddress: company?.email || "",

          websiteUrl: company?.website_url || "",

          taxType: companyDetail?.tax_type || "",

          applicationPurpose: companyDetail?.application_purpose || "",

          expectedTransaction:
            companyDetail?.expected_transaction !== undefined &&
            companyDetail?.expected_transaction !== null
              ? String(companyDetail.expected_transaction)
              : "",

          transactionTotalAmount: formatCurrency(
            companyDetail?.transaction_total_amount
          ),
        });
      } catch (err) {
        console.error("Error loading company details:", err);

        setError(err.message || "Failed to load company details.");
      } finally {
        setLoading(false);
      }
    };

    loadCompanyDetails();
  }, [item?.companyId]);

  if (loading) {
    return (
      <div className="company-details-form">
        <p>Loading company details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="company-details-form">
        <p style={{ color: "red" }}>{error}</p>
      </div>
    );
  }

  return (
    <div className="company-details-form">
      <div className="form-grid">

        {/* COMPANY NAME */}
        <div className="form-group">
          <label htmlFor="companyName">
            Company Name *
          </label>

          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            readOnly
          />
        </div>

        {/* COMPANY TYPE */}
        <div className="form-group">
          <label htmlFor="companyType">
            Company Type *
          </label>

          <select
            id="companyType"
            name="companyType"
            value={formData.companyType}
            disabled
          >
            <option value="">
              Select Company Type
            </option>

            {companyTypes.map((type) => (
              <option
                key={type.id}
                value={String(type.id)}
              >
                {type.name}
              </option>
            ))}
          </select>
        </div>

        {/* DTI / SEC REGISTRATION */}
        <div className="form-group">
          <label htmlFor="dtiSecRegNo">
            DTI / SEC Registration No. *
          </label>

          <input
            type="text"
            id="dtiSecRegNo"
            name="dtiSecRegNo"
            value={formData.dtiSecRegNo}
            readOnly
          />
        </div>

        {/* DATE OF REGISTRATION */}
        <div className="form-group">
          <label htmlFor="dateOfRegistration">
            Date of Registration
          </label>

          <input
            type="date"
            id="dateOfRegistration"
            name="dateOfRegistration"
            value={formData.dateOfRegistration}
            readOnly
          />
        </div>

        {/* TIN */}
        <div className="form-group">
          <label htmlFor="tinNumber">
            Tax Identification No. (TIN) *
          </label>

          <input
            type="text"
            id="tinNumber"
            name="tinNumber"
            value={formData.tinNumber}
            readOnly
          />
        </div>

        {/* TAX TYPE */}
        <div className="form-group">
          <label htmlFor="taxType">
            Tax Type
          </label>

          <input
            type="text"
            id="taxType"
            name="taxType"
            value={formData.taxType}
            readOnly
          />
        </div>

        {/* COMPANY ADDRESS */}
        <div className="form-group full-width">
          <label htmlFor="companyAddress">
            Company Address *
          </label>

          <input
            type="text"
            id="companyAddress"
            name="companyAddress"
            value={formData.companyAddress}
            readOnly
          />
        </div>

        {/* ZIP CODE */}
        <div className="form-group">
          <label htmlFor="zipCode">
            Zip Code
          </label>

          <input
            type="text"
            id="zipCode"
            name="zipCode"
            value={formData.zipCode}
            readOnly
          />
        </div>

        {/* CONTACT NUMBER */}
        <div className="form-group">
          <label htmlFor="contactNumber">
            Contact Number *
          </label>

          <input
            type="tel"
            id="contactNumber"
            name="contactNumber"
            value={formData.contactNumber}
            readOnly
          />
        </div>

        {/* EMAIL */}
        <div className="form-group">
          <label htmlFor="emailAddress">
            Email Address *
          </label>

          <input
            type="email"
            id="emailAddress"
            name="emailAddress"
            value={formData.emailAddress}
            readOnly
          />
        </div>

        {/* WEBSITE URL */}
        <div className="form-group">
          <label htmlFor="websiteUrl">
            Website URL
          </label>

          <input
            type="text"
            id="websiteUrl"
            name="websiteUrl"
            value={formData.websiteUrl}
            readOnly
          />
        </div>

        {/* APPLICATION PURPOSE */}
        <div className="form-group full-width">
          <label htmlFor="applicationPurpose">
            Application Purpose
          </label>

          <input
            type="text"
            id="applicationPurpose"
            name="applicationPurpose"
            value={formData.applicationPurpose}
            readOnly
          />
        </div>

        {/* EXPECTED TRANSACTIONS */}
        <div className="form-group">
          <label htmlFor="expectedTransaction">
            Expected Transactions
          </label>

          <input
            type="text"
            id="expectedTransaction"
            name="expectedTransaction"
            value={formData.expectedTransaction}
            readOnly
          />
        </div>

        {/* TRANSACTION TOTAL AMOUNT */}
        <div className="form-group">
          <label htmlFor="transactionTotalAmount">
            Transaction Total Amount
          </label>

          <input
            type="text"
            id="transactionTotalAmount"
            name="transactionTotalAmount"
            value={formData.transactionTotalAmount}
            readOnly
          />
        </div>

      </div>

      <div className="form-actions">
        <button
          className="btn-cancel"
          type="button"
        >
          Cancel
        </button>

        <button
          className="btn-draft"
          type="button"
        >
          Save Draft
        </button>

        <button
          className="btn-continue"
          type="button"
        >
          Continue
        </button>
      </div>
    </div>
  );
} 