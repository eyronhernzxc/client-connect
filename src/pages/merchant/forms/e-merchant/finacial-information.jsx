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

  const submitFinancial = async (event) =>{
  event.preventDefault();
  setLoading(false);
  const formData = new FormData(event.currentTarget);

  try{

      const user = await getCurrentUser();
    
          console.log("Authenticated User:", user);
    
          if(!user?.data?.id){
    
            throw new Error("User not authenticated");
    
          }
    
          const personal_detail_id = user?.data?.personal_detail_id || user?.data?.personal_detail?.id;
    
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
  }finally{

    setLoading(false);
  }
}


  return (

    <div className="main-container">
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
              <hr/>
              <div className="form-field-grid">
                <div className="radio-field">
                  
                    <input
                      type="radio"
                      name="occupation"
                      value="employee"
                    />
                    <label htmlFor="occupation">
                    Employee
                  </label>
                </div>
                <div className="radio-field">
                  
                    <input
                      type="radio"
                      name="occupation"
                      value="ofw"
                    />
                     <label htmlFor="occupation">
                    OFW/Overseas Filipino
                  </label>
                </div>
                <div className="radio-field">
                  
                    <input
                      type="radio"
                      name="occupation"
                      value="farmer/fisher"
                    />
                     <label htmlFor="occupation">
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
                  
                    <input
                      type="radio"
                      name="occupation"
                      value="legal_professional"
                    />
                     <label htmlFor="occupation">
                    Lawyer/Independent Legal Professional/Accountant
                  </label>
                </div>
                <div className="radio-field">
                  
                    <input
                      type="radio"
                      name="occupation"
                      value="self_employed"
                    />
                     <label htmlFor="occupation">
                    Self Employed
                  </label>
                </div>
                <div className="radio-field">
                  
                    <input
                      type="radio"
                      name="occupation"
                      value="retired"
                    />
                     <label htmlFor="occupation">
                    Retired
                  </label>
                </div>
                <div className="radio-field">
                  
                    <input
                      type="radio"
                      name="occupation"
                      value="student/minor"
                    />
                     <label htmlFor="occupation">
                    Student/Minor
                  </label>
                </div>
                <div className="radio-field">
                  
                    <input
                      type="radio"
                      name="occupation"
                      value="housewife"
                    />
                     <label htmlFor="occupation">
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
                  
                    <input
                      type="radio"
                      name="occupation"
                      value="others"
                    />
                     <label htmlFor="occupation">
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
              <hr/>
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
                
                    <input
                      type="radio"
                      name="source_of_wealth"
                      value="business"
                    />
                    <label htmlFor="source_of_wealth">
                    Business
                  </label>
                </div>
                <div className="radio-field">
                
                    <input
                      type="radio"
                      name="source_of_wealth"
                      value="regular_remittance"
                    />
                    <label htmlFor="source_of_wealth">
                    Regular Remittance
                  </label>
                </div>
                <div className="radio-field">
                
                    <input
                      type="radio"
                      name="source_of_wealth"
                      value="professional_fees"
                    />
                    <label htmlFor="source_of_wealth">
                    Professional Fees
                  </label>
                </div>
                <div className="radio-field">
                
                    <input
                      type="radio"
                      name="source_of_wealth"
                      value="taxes_and_licenses"
                    />
                    <label htmlFor="source_of_wealth">
                    Taxes & Licenses
                  </label>
                </div>
                <div className="radio-field">
                
                    <input
                      type="radio"
                      name="source_of_wealth"
                      value="government_appropriations"
                    />
                    <label htmlFor="source_of_wealth">
                    Government Appropriations
                  </label>
                </div>
                <div className="radio-field">
                
                    <input
                      type="radio"
                      name="source_of_wealth"
                      value="interest_and_commission"
                    />
                    <label htmlFor="source_of_wealth">
                    Interest/Commission
                  </label>
                </div>
                <div className="radio-field">
                
                    <input
                      type="radio"
                      name="source_of_wealth"
                      value="pension"
                    />
                    <label htmlFor="source_of_wealth">
                    Pension
                  </label>
                </div>
                <div className="radio-field">
                
                    <input
                      type="radio"
                      name="source_of_wealth"
                      value="loans"
                    />
                    <label htmlFor="source_of_wealth">
                    Loans
                  </label>
                </div>
                <div className="radio-field">
                
                    <input
                      type="radio"
                      name="source_of_wealth"
                      value="sale_of_assets"
                    />
                    <label htmlFor="source_of_wealth">
                    Sale of Assets
                  </label>
                </div>
                <div className="radio-field">
                
                    <input
                      type="radio"
                      name="source_of_wealth"
                      value="scholarship_award_prizes"
                    />
                    <label htmlFor="source_of_wealth">
                    Prizes
                  </label>
                </div>
                <div className="radio-field">
                
                    <input
                      type="radio"
                      name="source_of_wealth"
                      value="others"
                    />
                    <label htmlFor="source_of_wealth">
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
              <hr/>
              <div className="form-field-grid">
                <div className="radio-field">
                
                    <input
                      type="radio"
                      name="monthly_gross"
                      value="30k_below"
                    />
                    <label htmlFor="monthly_gross">
                    Php 30,000.00 and below
                  </label>
                </div>

                <div className="radio-field">
                
                    <input
                      type="radio"
                      name="monthly_gross"
                      value="30k_50k"
                    />
                    <label htmlFor="monthly_gross">
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
                
                    <input
                      type="radio"
                      name="monthly_gross"
                      value="100k_500k"
                    />
                    <label htmlFor="monthly_gross">
                    Php 100,000.01-500,000.00
                  </label>
                </div>
                <div className="radio-field">
                
                    <input
                      type="radio"
                      name="monthly_gross"
                      value="over_500k"
                    />
                    <label htmlFor="monthly_gross">
                    Over Php 500,000.01
                  </label>
                </div>
              </div>
            </div>

            <div className="form-field">
              <label>
                Annual Gross Income/Pension/Allowance <span>*</span>
              </label>
              <hr/>

              <div className="form-field-grid">
                <div className="radio-field">
                  
                    <input
                      type="radio"
                      name="annual_gross"
                      value="360k_below"
                    />
                     <label htmlFor="annual_gross">
                    Php 360,000.00 and below
                  </label>
                </div>
                <div className="radio-field">
                       
                    <input
                      type="radio"
                      name="annual_gross"
                      value="360k_600K"
                    />
                     <label htmlFor="annual_gross">
                    Php 360,000.01-600,000.00
                  </label>
                </div>

                <div className="radio-field">
                  
                    <input
                      type="radio"
                      name="annual_gross"
                      value="600k_1.2M"
                    />
                     <label htmlFor="annual_gross">
                    Php 600,000.01-1,200,000.00
                  </label>
                </div>
                <div className="radio-field">
                  
                    <input
                      type="radio"
                      name="annual_gross"
                      value="1.2M-6M"
                    />
                     <label htmlFor="annual_gross">
                    Php 1,200,000.01-6,000,000.00
                  </label>
                </div>
                <div className="radio-field">
                  
                    <input
                      type="radio"
                      name="annual_gross"
                      value="over-6M"
                    />
                     <label htmlFor="annual_gross">
                    Over Php 6,000,000.01
                  </label>
                </div>
              </div>
            </div>

            <button type="submit">
            {loading ? (
            <Spinner/>
            ): (
            "Submit"
            )}
            </button>
          </form>
        </div>
      </div>
    </div>

  );
}