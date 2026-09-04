import React from "react";
import { postBusinessQuestion } from "../../../../api/postBusinessInfo";


import Header from "../header/header";
import "../form-style.css";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../../../api/auth";
import PageHeader from "../../../../components/admin/header/page-header";


const sanitizeMerchantText = (event) => {
    const input = event.target;
    const { name } = input;

    if (!name) return;

    if (["phone", "cs_number", "us_phone", "telephone_number"].includes(name)) {
        input.value = input.value.replace(/[^0-9+()\-\s]/g, "").slice(0, 20);
    }

    if (["us_zip_code"].includes(name)) {
        input.value = input.value.replace(/\D/g, "").slice(0, 5);
    }

    if (name === "us_tin") {
        input.value = input.value.replace(/\D/g, "").slice(0, 12);
    }

    if (["account_number"].includes(name)) {
        input.value = input.value.replace(/\D/g, "");
    }

    if (["years_in_business", "estimated_sales", "average_billing_amount", "highest_billing_amount", "days_product_received"].includes(name)) {
        input.value = input.value.replace(/[^0-9.]/g, "");
    }

    if (name === "transaction_fee") {
        input.value = input.value.replace(/[^0-9.]/g, "");
    }
};

export default function BusinessQuestion() {

const navigate = useNavigate();

const submitBusinessQuestion  = async (event) => {
    event.preventDefault();
 
    const formData = new FormData(event.currentTarget);

    try{

        const user = await getCurrentUser();
        
        console.log("Authenticated User:", user);

        if(!user?.id){

            throw new Error("User not authenticated");
        }

        const company_id = user.company_id || user.company?.id;

        console.log("Authenticated user ID:", user.id);
        console.log("Authenticated company ID:", company_id);

        if(!company_id){
            throw new Error("Unable to determine the user's company.");
        }

        const business_information_id = user.business_information_id || user.business_information?.id;

        console.log("Authenticated business information ID:", business_information_id);

        if(!business_information_id){

            throw new Error("Unable to determine the user's business information.");
        }

        const data = {

        business_information_id: business_information_id,
        creditcard: formData.get("creditcard"),
        proof_of_delivery: formData.get("proof_of_delivery"),
        refund_policy: formData.get("refund_policy"),
        days_product_recieved:formData.get("days_product_received"),
        transactions_accepted: formData.get("transactions_accepted"),
        offer_extended_services: formData.get("offer_extended_services"),
        shopping_cart: formData.get("shopping_cart"),
        mobile_app_sale: formData.get("mobile_app_sale"),
    }

    const response = await postBusinessQuestion(data);
    alert("Business Question submitted successfully!");
    console.log("Business Question submitted successfully:", response);
    navigate("/form/declaration");

    }catch(error){

        console.error("STATUS:", error.response?.status);
        console.error("RESPONSE:", error.response?.data);
        console.error("ERRORS:", error.response?.data?.errors);
        console.error("Error Message:", error.message);
    }
}

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
          <h1>Additional Online/E-commerce business Info</h1>
        </Header>

        <div className="form-container">
          <form className="form" onSubmit={(e) => submitBusinessQuestion(e)} onInput={sanitizeMerchantText}>

            <h3>Online/E-commerce business Info</h3>
            <hr/>

            <div className="form-field">
                <label>Currently accepting Credit Card Payments? <span>*</span></label>
                <div className="form-field-grid">
                    <div className="radio-field">
                       <label> <input
                        type="radio"
                        value="yes"
                        name="creditcard"
                        />Yes </label>
                    </div>

                    <div className="radio-field">
                        <label><input
                        type="radio"
                        value="no"
                        name="creditcard"
                        />No </label>
                    </div>
                </div>
            </div>

             <div className="form-field">
                <label>Which Brand? <span>*</span></label>
                <div className="form-field-grid">
                    <div className="radio-field">
                       <label><input
                        type="checkbox"
                        value="credit-card"
                        name="transactions_accepted"
                        />Credit Card</label> 
                    </div>

                    <div className="radio-field">
                        <label><input
                        type="checkbox"
                        value="debit-card"
                        name="transactions_accepted"
                        />Debit Card </label>
                    </div>

                     <div className="radio-field">
                        <label><input
                        type="checkbox"
                        value="bank-transfer"
                        name="transactions_accepted"
                        />Bank Transfer </label>
                    </div>

                     <div className="radio-field">
                        <label><input
                        type="checkbox"
                        value="others"
                        name="transactions_accepted"
                        />Others </label>
                    </div>

                </div>
            </div>

              <div className="form-field">
                <label>Do you get proof of delivery? <span>*</span></label>
                <div className="form-field-grid">
                    <div className="radio-field">
                       <label> <input
                        type="radio"
                        value="yes"
                        name="proof_of_delivery"
                        />Yes </label>
                    </div>

                    <div className="radio-field">
                        <label><input
                        type="radio"
                        value="no"
                        name="proof_of_delivery"
                        />No </label>
                    </div>
                </div>
            </div>

            <div className="form-field">
                <label>Do you have refund policy? <span>*</span></label>
                <div className="form-field-grid">
                    <div className="radio-field">
                       <label> <input
                        type="radio"
                        value="yes"
                        name="refund_policy"
                        />Yes </label>
                    </div>

                    <div className="radio-field">
                        <label><input
                        type="radio"
                        value="no"
                        name="refund_policy"
                        />No </label>
                    </div>
                </div>
            </div>

              <div className="form-field">
                <label>How long does customer wait before product is received? (No. of days) <span>*</span></label>
                <input
                type="number"
                name="days_product_received" min="0" step="1"
                />
            </div>

            <div className="form-field">
                <label>Does company offer warranties, dues, subscriptions, memberships or other extended services? <span>*</span></label>
                <div className="form-field-grid">
                    <div className="radio-field">
                       <label> <input
                        type="radio"
                        value="yes"
                        name="offer_extended_services"
                        />Yes </label>
                    </div>

                    <div className="radio-field">
                        <label><input
                        type="radio"
                        value="no"
                        name="offer_extended_services"
                        />No </label>
                    </div>
                </div>
            </div>

            <div className="form-field">
                <label>Are you using any shopping cart? <span>*</span></label>
                <div className="form-field-grid">
                    <div className="radio-field">
                       <label> <input
                        type="radio"
                        value="yes"
                        name="shopping_cart"
                        />Yes </label>
                    </div>

                    <div className="radio-field">
                        <label><input
                        type="radio"
                        value="no"
                        name="shopping_cart"
                        />No </label>
                    </div>
                </div>
            </div>

            <div className="form-field">
                <label>Are you selling via Mobile App? <span>*</span></label>
                <div className="form-field-grid">
                    <div className="radio-field">
                       <label> <input
                        type="radio"
                        value="yes"
                        name="mobile_app_sale"
                        />Yes </label>
                    </div>

                    <div className="radio-field">
                        <label><input
                        type="radio"
                        value="no"
                        name="mobile_app_sale"
                        />No </label>
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