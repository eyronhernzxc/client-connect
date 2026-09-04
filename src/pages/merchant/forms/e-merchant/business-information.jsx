import React from "react";
import { postBusinessInfo } from "../../../../api/postBusinessInfo";
import Header from "../header/header";
import "../form-style.css";
import { getCurrentUser } from "../../../../api/auth";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../../../components/admin/header/page-header";

export default function BusinessInformation() {

const navigate = useNavigate();


const submitBusinessInformation  = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    try{

        const user = await getCurrentUser();

        console.log("Authenticated User:", user);

        if(!user?.id){

            throw new Error("User not authenticated");
            console.error("User not authenticated");        
        }

        console.log("Authenticated user ID:", user.id);
        console.log("Authenticated company ID:", user.company_id);

        const company_id = user.company_id || user.company?.id;

        if(!company_id){

            throw new Error("Unable to determine the user's company.");
        }

        const data = {

        company_id: company_id,
        name: formData.get("name"),
        years_in_business: formData.get("years_in_business"),
        product_types_services: formData.get("product_types_services"),
        website_url: formData.get("website_url"),
        target_market: formData.get("target_market"),
        estimated_sales: formData.get("estimated_sales"),
        transaction_fee: formData.get("transaction_fee"),
        average_billing_amount: formData.get("average_billing_amount"),
        highest_billing_amount: formData.get("highest_billing_amount"),
        current_payment_gateway: formData.get("current_payment_gateway"),
        chargeback_familiarity: formData.get("chargeback_familiarity"),
    }

    const response = await postBusinessInfo(data);
    alert("Business Information submitted successfully!");
    console.log("Business Information submitted successfully:", response);
    navigate("/form/business-question");

    }catch (error){
        
        console.error("STATUS:", error.response?.status);
        console.error("RESPONSE:", error.response?.data);
        console.error("ERRORS:", error.response?.data?.errors);
        console.error("Error Message:", error.message);
    }
};

  return (
<>
     <PageHeader>
                    <div className="name-container">
                      <h1 className="page-title">Hello,</h1>
                      <h1 className="admin-name">Jamaica</h1>
                    </div>
                    
                    <p className="page-desc">
                     We’re happy to have you here. Let’s get your merchant and company application started!
                    </p>
                </PageHeader>
    <div className="main-container">
      <div className="form-card">
        <Header>
          <h1>Online/E-commerce business Info</h1>
        </Header>

        <div className="form-container">
          <form className="form" onSubmit={(e) => submitBusinessInformation(e)}>

            <h3>Online/E-commerce business Info</h3>
            <hr/>

            <div className="form-field">
                <label>Trading name/ Doing business as <span>*</span></label>
                <input
                type="text"
                name="name"
                />
            </div>
            
            <div className="form-field">
                <label>Number of years in business <span>*</span></label>
                <input
                type="number"
                name="years_in_business"
                />
            </div>

            <div className="form-field">
                <label>Types of product and services <span>*</span></label>
                <input
                type="text"
                name="product_types_services"
                />
            </div>

            <div className="form-field">
                <label>URL / Website address <span>*</span></label>
                <input
                type="url"
                name="website_url"
                />
            </div>

            <div className="form-field">
                <label>Target Market / Countries <span>*</span></label>
                <input
                type="text"
                name="target_market"
                />
            </div>

            <div className="form-field">
                <label>Estimated Monthly Online Sales / Sales Forecast (Php) <span>*</span></label>
                <input
                type="number"
                name="estimated_sales"
                />
            </div>

            <div className="form-field">
                <label>Current Transaction Fee Charged (%) <span>*</span></label>
                <input
                type="text"
                name="transaction_fee"
                />
            </div>

            
            <div className="form-field">
                <label>Average Billing Amount <span>*</span></label>
                <input
                type="number"
                name="average_billing_amount"
                />
            </div>

             <div className="form-field">
                <label>Highest Billing Amount <span>*</span></label>
                <input
                type="number"
                name="highest_billing_amount"
                />
            </div>

            <div className="form-field">
                <label>Current Payment Gateway <span>*</span></label>
                <input
                type="text"
                name="current_payment_gateway"
                />
            </div>

            <div className="form-field">
                <label>Famialiar with chargeback? <span>*</span></label>
                <div className="form-field-grid">
                    <div className="radio-field">
                        <label><input
                        type="radio"
                        value="yes"
                        name="chargeback_familiarity"
                        />Yes</label>
                    </div>

                     <div className="radio-field">
                        <label><input
                        type="radio"
                        value="no"
                        name="chargeback_familiarity"
                        />No</label>
                    </div>
                    </div>
                </div>


    <button type="submit">Submit</button>

            
           
          </form>
        </div>
      </div>
    </div>
    </>
  );
}