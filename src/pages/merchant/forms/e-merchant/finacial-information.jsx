import React from "react";

import Header from "../header/header";
import "../form-style.css";
import { getCurrentUser } from "../../../../api/auth";
import { postFinancial } from "../../../../api/postFinancial";
import { useNavigate } from "react-router-dom";


export default function FinancialInformation() {

  const navigate = useNavigate();

  const submitFinancial = async (event) =>{
  event.preventDefault();

  const formData = new FormData(event.currentTarget);

  try{

      const user = await getCurrentUser();
    
          console.log("Authenticated User:", user);
    
          if(!user?.id){
    
            throw new Error("User not authenticated");
    
          }
    
          const personal_detail_id = user.personal_detail_id || user.personal_detail?.id;
    
          console.log("Personal Detail ID:", personal_detail_id);
    
          if(!personal_detail_id){
    
            throw new Error("Unable to determine the user's personal detail.");
          }

          const data = {

            personal_detail_id: personal_detail_id,
            occupation: formData.get("occupation"),
            tax_id_number: formData.get("tax_id_number"),
            source_of_wealth: formData.get("source_of_wealth"),
            monthly_gross_income: formData.get("monthly_gross"),
            annual_gross_income: formData.get("annual_gross"),

          }

          const response = await postFinancial(data);
          console.log("Financial Information submitted successfully:", response);
        alert("Financial Information submitted successfully");
        navigate("/form/employment");


  }catch(error){

     console.error("STATUS:", error.response?.status);
        console.error("RESPONSE:", error.response?.data);
        console.error("ERRORS:", error.response?.data?.errors);
        console.error("Error Message:", error.message);
  }
}


  return (
    <div className="form-overlay">
      <div className="form-card">
        <Header>
          <h1>Personal Financial Information</h1>
        </Header>

        <div className="form-container">
          <form className="form" onSubmit={(e) => submitFinancial(e)}>
            <div className="form-field">
              <label>
                Occupation <span>*</span>
              </label>
              <div className="form-field-grid">
                <div className="radio-field">
                  <label htmlFor="occupation">
                    <input
                      type="radio"
                      name="occupation"
                      value="employee"
                    />
                    Employee
                  </label>
                </div>
                <div className="radio-field">
                  <label htmlFor="occupation">
                    <input
                      type="radio"
                      name="occupation"
                      value="ofw"
                    />
                    OFW/Overseas Filipino
                  </label>
                </div>
                <div className="radio-field">
                  <label htmlFor="occupation">
                    <input
                      type="radio"
                      name="occupation"
                      value="farmer/fisher"
                    />
                    Farmer/Fisher
                  </label>
                </div>
                <div className="radio-field">
                  <label htmlFor="occupation">
                    <input
                      type="radio"
                      name="occupation"
                      value="unemployed"
                    />
                    Unemployed
                  </label>
                </div>
                <div className="radio-field">
                  <label htmlFor="occupation">
                    <input
                      type="radio"
                      name="occupation"
                      value="legal_professional"
                    />
                    Lawyer/Independent Legal Professional/Accountant
                  </label>
                </div>
                <div className="radio-field">
                  <label htmlFor="occupation">
                    <input
                      type="radio"
                      name="occupation"
                      value="self_employed"
                    />
                    Self Employed
                  </label>
                </div>
                <div className="radio-field">
                  <label htmlFor="occupation">
                    <input
                      type="radio"
                      name="occupation"
                      value="retired"
                    />
                    Retired
                  </label>
                </div>
                <div className="radio-field">
                  <label htmlFor="occupation">
                    <input
                      type="radio"
                      name="occupation"
                      value="student/minor"
                    />
                    Student/Minor
                  </label>
                </div>
                <div className="radio-field">
                  <label htmlFor="occupation">
                    <input
                      type="radio"
                      name="occupation"
                      value="housewife"
                    />
                    Housewife
                  </label>
                </div>
                <div className="radio-field">
                  <label htmlFor="occupation">
                    <input
                      type="radio"
                      name="occupation"
                      value="government_official"
                    />
                    Government Official
                  </label>
                </div>
                <div className="radio-field">
                  <label htmlFor="occupation">
                    <input
                      type="radio"
                      name="occupation"
                      value="others"
                    />
                    Others
                  </label>
                </div>
              </div>
              <div className="form-field">
                <label>
                  Others <span>*</span>
                </label>
                <input
                  type="text"
                  name="occupation_other"
                  placeholder="Please specify"
                />
              </div>
            </div>

            <div className="form-field">
              <label>
                Tax ID Number <span>*</span>
              </label>

              <input
                type="number"
                name="tax_id_number"
                placeholder="Enter tax id"
              />
            </div>

            <div className="form-field">
              <label>
                Source of Wealth <span>*</span>
              </label>
              <div className="form-field-grid">
                <div className="radio-field">
                  <input
                    type="radio"
                    name="source_of_wealth"
                    value="salary"
                  />
                  <label htmlFor="source_of_wealth">Salary</label>
                </div>
                <div className="radio-field">
                  <label htmlFor="source_of_wealth">
                    <input
                      type="radio"
                      name="source_of_wealth"
                      value="business"
                    />
                    Business
                  </label>
                </div>
                <div className="radio-field">
                  <label htmlFor="source_of_wealth">
                    <input
                      type="radio"
                      name="source_of_wealth"
                      value="regular_remittance"
                    />
                    Regular Remittance
                  </label>
                </div>
                <div className="radio-field">
                  <label htmlFor="source_of_wealth">
                    <input
                      type="radio"
                      name="source_of_wealth"
                      value="professional_fees"
                    />
                    Professional Fees
                  </label>
                </div>
                <div className="radio-field">
                  <label htmlFor="source_of_wealth">
                    <input
                      type="radio"
                      name="source_of_wealth"
                      value="taxes_and_licenses"
                    />
                    Taxes & Licenses
                  </label>
                </div>
                <div className="radio-field">
                  <label htmlFor="source_of_wealth">
                    <input
                      type="radio"
                      name="source_of_wealth"
                      value="government_appropriations"
                    />
                    Government Appropriations
                  </label>
                </div>
                <div className="radio-field">
                  <label htmlFor="source_of_wealth">
                    <input
                      type="radio"
                      name="source_of_wealth"
                      value="interest_and_commission"
                    />
                    Interest/Commission
                  </label>
                </div>
                <div className="radio-field">
                  <label htmlFor="source_of_wealth">
                    <input
                      type="radio"
                      name="source_of_wealth"
                      value="pension"
                    />
                    Pension
                  </label>
                </div>
                <div className="radio-field">
                  <label htmlFor="source_of_wealth">
                    <input
                      type="radio"
                      name="source_of_wealth"
                      value="loans"
                    />
                    Loans
                  </label>
                </div>
                <div className="radio-field">
                  <label htmlFor="source_of_wealth">
                    <input
                      type="radio"
                      name="source_of_wealth"
                      value="sale_of_assets"
                    />
                    Sale of Assets
                  </label>
                </div>
                <div className="radio-field">
                  <label htmlFor="source_of_wealth">
                    <input
                      type="radio"
                      name="source_of_wealth"
                      value="scholarship_award_prizes"
                    />
                    Prizes
                  </label>
                </div>
                <div className="radio-field">
                  <label htmlFor="source_of_wealth">
                    <input
                      type="radio"
                      name="source_of_wealth"
                      value="others"
                    />
                    Others
                  </label>
                </div>
              </div>
            </div>

            <div className="form-field">
              <label>
                Others <span>*</span>
              </label>
              <input
                type="text"
                name="source_of_wealth_other"
                placeholder="Please specify"
              />
            </div>

            <div className="form-field">
              <label>
                Monthly Gross Income/Pension/Allowance <span>*</span>
              </label>
              <div className="form-field-grid">
                <div className="radio-field">
                  <label htmlFor="monthly_gross">
                    <input
                      type="radio"
                      name="monthly_gross"
                      value="30k_below"
                    />
                    Php 30,000.00 and below
                  </label>
                </div>

                <div className="radio-field">
                  <label htmlFor="monthly_gross">
                    <input
                      type="radio"
                      name="monthly_gross"
                      value="30k_50k"
                    />
                    Php 30,000.01-50,000.00
                  </label>
                </div>
                <div className="radio-field">
                  <label htmlFor="monthly_gross">
                    <input
                      type="radio"
                      name="monthly_gross"
                      value="50k_100k"
                    />
                    Php 50,000.01-100,000.00
                  </label>
                </div>
                <div className="radio-field">
                  <label htmlFor="monthly_gross">
                    <input
                      type="radio"
                      name="monthly_gross"
                      value="100k_500k"
                    />
                    Php 100,000.01-500,000.00
                  </label>
                </div>
                <div className="radio-field">
                  <label htmlFor="monthly_gross">
                    <input
                      type="radio"
                      name="monthly_gross"
                      value="over_500k"
                    />
                    Over Php 500,000.01
                  </label>
                </div>
              </div>
            </div>

            <div className="form-field">
              <label>
                Annual Gross Income/Pension/Allowance <span>*</span>
              </label>

              <div className="form-field-grid">
                <div className="radio-field">
                  <label htmlFor="annual_gross">
                    <input
                      type="radio"
                      name="annual_gross"
                      value="360k_below"
                    />
                    Php 360,000.00 and below
                  </label>
                </div>
                <div className="radio-field">
                  <label htmlFor="annual_gross">
                    <input
                      type="radio"
                      name="annual_gross"
                      value="360k_600K"
                    />
                    Php 360,000.01-600,000.00
                  </label>
                </div>

                <div className="radio-field">
                  <label htmlFor="annual_gross">
                    <input
                      type="radio"
                      name="annual_gross"
                      value="600k_1.2M"
                    />
                    Php 600,000.01-1,200,000.00
                  </label>
                </div>
                <div className="radio-field">
                  <label htmlFor="annual_gross">
                    <input
                      type="radio"
                      name="annual_gross"
                      value="1.2M-6M"
                    />
                    Php 1,200,000.01-6,000,000.00
                  </label>
                </div>
                <div className="radio-field">
                  <label htmlFor="annual_gross">
                    <input
                      type="radio"
                      name="annual_gross"
                      value="over-6M"
                    />
                    Over Php 6,000,000.01
                  </label>
                </div>
              </div>
            </div>

            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}