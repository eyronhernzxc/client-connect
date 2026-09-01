import React from "react";
import { postBusinessQuestion } from "../../../../api/postBusinessInfo";


import Header from "../header/header";
import "../form-style.css";

export default function BusinessQuestion() {

   const submitBusinessQuestion  = async (event) => {

    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const business_information_id = 1;

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

    try{

        const response = await postBusinessQuestion(data);
        alert("Submit successfully");
    }catch (error){

    console.log("STATUS:", error.response?.status);
    console.log("RESPONSE:", error.response?.data);
    console.log("ERRORS:", error.response?.data?.errors);
    }
   } 

  return (
    <div className="form-overlay">
      <div className="form-card">
        <Header>
          <h1>Additional Online/E-commerce business Info</h1>
        </Header>

        <div className="form-container">
          <form className="form" onSubmit={submitBusinessQuestion}>

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
                name="days_product_received"
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
  );
}