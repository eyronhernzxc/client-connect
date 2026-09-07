import React, { useState } from "react";

import Header from "../header/header";
import "../form-style.css";
import { getCurrentUser } from "../../../../api/auth";
import { postFinancial } from "../../../../api/postFinancial";
import { useNavigate } from "react-router-dom";
import Spinner from "../../../../loader/spinner";

export default function FinancialInformation() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitFinancial = async (event) => {
    event.preventDefault();
    setLoading(false);
    const formData = new FormData(event.currentTarget);

    try {
      const user = await getCurrentUser();

      console.log("Authenticated User:", user);

      if (!user?.data?.id) {
        throw new Error("User not authenticated");
      }

      const personal_detail_id =
        user?.data?.personal_detail_id || user?.data?.personal_detail?.id;

      console.log("Personal Detail ID:", personal_detail_id);

      if (!personal_detail_id) {
        throw new Error("Unable to determine the user's personal detail.");
      }

      const data = {
        personal_detail_id: personal_detail_id,
        occupation: formData.get("occupation"),
        tax_id_number: formData.get("tax_id_number"),
        source_of_wealth: formData.get("source_of_wealth"),
        monthly_gross_income: formData.get("monthly_gross"),
        annual_gross_income: formData.get("annual_gross"),
      };

      const response = await postFinancial(data);

      console.log("Financial Information submitted successfully:", response);

      alert("Financial Information submitted successfully");

      navigate("/form/employment");
    } catch (error) {
      console.error("STATUS:", error.response?.status);
      console.error("RESPONSE:", error.response?.data);
      console.error("ERRORS:", error.response?.data?.errors);
      console.error("Error Message:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-container">
      <div className="form-card">
        <Header>
          <h1>Personal Financial Information</h1>
        </Header>

        <div className="form-container">
          <form className="form" onSubmit={(e) => submitFinancial(e)}>
            <div className="form-field">
              <label
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                }}
              >
                Occupation <span>*</span>
              </label>

              <hr />

              <div className="form-field-grid">
                <div className="radio-field">
                  <input
                    type="radio"
                    id="occupation_employee"
                    name="occupation"
                    value="employee"
                  />
                  <label htmlFor="occupation_employee">Employee</label>
                </div>

                <div className="radio-field">
                  <input
                    type="radio"
                    id="occupation_ofw"
                    name="occupation"
                    value="ofw"
                  />
                  <label htmlFor="occupation_ofw">OFW/Overseas Filipino</label>
                </div>

                <div className="radio-field">
                  <input
                    type="radio"
                    id="occupation_farmer"
                    name="occupation"
                    value="farmer/fisher"
                  />
                  <label htmlFor="occupation_farmer">Farmer/Fisher</label>
                </div>

                <div className="radio-field">
                  <input
                    type="radio"
                    id="occupation_unemployed"
                    name="occupation"
                    value="unemployed"
                  />
                  <label htmlFor="occupation_unemployed">Unemployed</label>
                </div>

                <div className="radio-field">
                  <input
                    type="radio"
                    id="occupation_legal"
                    name="occupation"
                    value="legal_professional"
                  />
                  <label htmlFor="occupation_legal">
                    Lawyer/Independent Legal Professional/Accountant
                  </label>
                </div>

                <div className="radio-field">
                  <input
                    type="radio"
                    id="occupation_self_employed"
                    name="occupation"
                    value="self_employed"
                  />
                  <label htmlFor="occupation_self_employed">
                    Self Employed
                  </label>
                </div>

                <div className="radio-field">
                  <input
                    type="radio"
                    id="occupation_retired"
                    name="occupation"
                    value="retired"
                  />
                  <label htmlFor="occupation_retired">Retired</label>
                </div>

                <div className="radio-field">
                  <input
                    type="radio"
                    id="occupation_student"
                    name="occupation"
                    value="student/minor"
                  />
                  <label htmlFor="occupation_student">Student/Minor</label>
                </div>

                <div className="radio-field">
                  <input
                    type="radio"
                    id="occupation_housewife"
                    name="occupation"
                    value="housewife"
                  />
                  <label htmlFor="occupation_housewife">Housewife</label>
                </div>

                <div className="radio-field">
                  <input
                    type="radio"
                    id="occupation_government"
                    name="occupation"
                    value="government_official"
                  />
                  <label htmlFor="occupation_government">
                    Government Official
                  </label>
                </div>

                <div className="radio-field">
                  <input
                    type="radio"
                    id="occupation_others"
                    name="occupation"
                    value="others"
                  />
                  <label htmlFor="occupation_others">Others</label>
                </div>
              </div>
            </div>

            <div className="form-field">
              <label
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                }}
              >
                Source of Wealth <span>*</span>
              </label>
              <hr />
            </div>
            <div className="form-field-grid">
              <div className="radio-field">
                <input
                  type="radio"
                  id="wealth_salary"
                  name="source_of_wealth"
                  value="salary"
                />
                <label htmlFor="wealth_salary">Salary</label>
              </div>

              <div className="radio-field">
                <input
                  type="radio"
                  id="wealth_business"
                  name="source_of_wealth"
                  value="business"
                />
                <label htmlFor="wealth_business">Business</label>
              </div>

              <div className="radio-field">
                <input
                  type="radio"
                  id="wealth_remittance"
                  name="source_of_wealth"
                  value="regular_remittance"
                />
                <label htmlFor="wealth_remittance">Regular Remittance</label>
              </div>

              <div className="radio-field">
                <input
                  type="radio"
                  id="wealth_professional"
                  name="source_of_wealth"
                  value="professional_fees"
                />
                <label htmlFor="wealth_professional">Professional Fees</label>
              </div>

              <div className="radio-field">
                <input
                  type="radio"
                  id="wealth_taxes"
                  name="source_of_wealth"
                  value="taxes_and_licenses"
                />
                <label htmlFor="wealth_taxes">Taxes & Licenses</label>
              </div>

              <div className="radio-field">
                <input
                  type="radio"
                  id="wealth_government"
                  name="source_of_wealth"
                  value="government_appropriations"
                />
                <label htmlFor="wealth_government">
                  Government Appropriations
                </label>
              </div>

              <div className="radio-field">
                <input
                  type="radio"
                  id="wealth_interest"
                  name="source_of_wealth"
                  value="interest_and_commission"
                />
                <label htmlFor="wealth_interest">Interest/Commission</label>
              </div>

              <div className="radio-field">
                <input
                  type="radio"
                  id="wealth_pension"
                  name="source_of_wealth"
                  value="pension"
                />
                <label htmlFor="wealth_pension">Pension</label>
              </div>

              <div className="radio-field">
                <input
                  type="radio"
                  id="wealth_loans"
                  name="source_of_wealth"
                  value="loans"
                />
                <label htmlFor="wealth_loans">Loans</label>
              </div>

              <div className="radio-field">
                <input
                  type="radio"
                  id="wealth_assets"
                  name="source_of_wealth"
                  value="sale_of_assets"
                />
                <label htmlFor="wealth_assets">Sale of Assets</label>
              </div>

              <div className="radio-field">
                <input
                  type="radio"
                  id="wealth_prizes"
                  name="source_of_wealth"
                  value="scholarship_award_prizes"
                />
                <label htmlFor="wealth_prizes">Prizes</label>
              </div>

              <div className="radio-field">
                <input
                  type="radio"
                  id="wealth_others"
                  name="source_of_wealth"
                  value="others"
                />
                <label htmlFor="wealth_others">Others</label>
              </div>
            </div>

            <div className="form-field">
              <label
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                }}
              >
                Others <span>*</span>
              </label>
              <input
                type="text"
                name="source_of_wealth_other"
                placeholder="Please specify"
              />
            </div>

            <div className="form-field">
              <label
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                }}
              >
                Monthly Gross Income/Pension/Allowance <span>*</span>
              </label>
              <hr />
              <div className="form-field-grid">
                <div className="radio-field">
                  <input
                    type="radio"
                    id="monthly_30k_below"
                    name="monthly_gross"
                    value="30k_below"
                  />
                  <label htmlFor="monthly_30k_below">
                    Php 30,000.00 and below
                  </label>
                </div>

                <div className="radio-field">
                  <input
                    type="radio"
                    id="monthly_30k_50k"
                    name="monthly_gross"
                    value="30k_50k"
                  />
                  <label htmlFor="monthly_30k_50k">
                    Php 30,000.01-50,000.00
                  </label>
                </div>

                <div className="radio-field">
                  <input
                    type="radio"
                    id="monthly_50k_100k"
                    name="monthly_gross"
                    value="50k_100k"
                  />
                  <label htmlFor="monthly_50k_100k">
                    Php 50,000.01-100,000.00
                  </label>
                </div>

                <div className="radio-field">
                  <input
                    type="radio"
                    id="monthly_100k_500k"
                    name="monthly_gross"
                    value="100k_500k"
                  />
                  <label htmlFor="monthly_100k_500k">
                    Php 100,000.01-500,000.00
                  </label>
                </div>

                <div className="radio-field">
                  <input
                    type="radio"
                    id="monthly_over_500k"
                    name="monthly_gross"
                    value="over_500k"
                  />
                  <label htmlFor="monthly_over_500k">Over Php 500,000.01</label>
                </div>
              </div>
            </div>

            <div className="form-field">
              <label
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                }}
              >
                Annual Gross Income/Pension/Allowance <span>*</span>
              </label>
              <hr />

              <div className="form-field-grid">
                <div className="radio-field">
                  <input
                    type="radio"
                    id="annual_360k_below"
                    name="annual_gross"
                    value="360k_below"
                  />
                  <label htmlFor="annual_360k_below">
                    Php 360,000.00 and below
                  </label>
                </div>

                <div className="radio-field">
                  <input
                    type="radio"
                    id="annual_360k_600k"
                    name="annual_gross"
                    value="360k_600K"
                  />
                  <label htmlFor="annual_360k_600k">
                    Php 360,000.01-600,000.00
                  </label>
                </div>

                <div className="radio-field">
                  <input
                    type="radio"
                    id="annual_600k_1_2m"
                    name="annual_gross"
                    value="600k_1.2M"
                  />
                  <label htmlFor="annual_600k_1_2m">
                    Php 600,000.01-1,200,000.00
                  </label>
                </div>

                <div className="radio-field">
                  <input
                    type="radio"
                    id="annual_1_2m_6m"
                    name="annual_gross"
                    value="1.2M-6M"
                  />
                  <label htmlFor="annual_1_2m_6m">
                    Php 1,200,000.01-6,000,000.00
                  </label>
                </div>

                <div className="radio-field">
                  <input
                    type="radio"
                    id="annual_over_6m"
                    name="annual_gross"
                    value="over-6M"
                  />
                  <label htmlFor="annual_over_6m">Over Php 6,000,000.01</label>
                </div>
              </div>
            </div>
            <button type="submit">{loading ? <Spinner /> : "Submit"}</button>
          </form>
        </div>
      </div>
    </div>
  );
}
