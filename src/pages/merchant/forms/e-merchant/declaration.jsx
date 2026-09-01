import React from "react";
import Header from "../header/header";
import "../form-style.css";
import { postDeclaration } from "../../../../api/postDeclaration";

export default function Declaration() {

   const submitDeclaration  = async (event) => {

    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const business_information_id = 1;

    const data = {

        business_information_id: business_information_id,
        politically_exposed_person: formData.get("politically_exposed_person"),
        name: formData.get("name"),
        signature:formData.get("signature"),
        date: formData.get("date"),
        designation: formData.get("designation"),
    }

    try{

        const response = await postDeclaration(data);
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
          <h1>Declaration</h1>
        </Header>

        <div className="form-container">
          <form className="form" onSubmit={submitDeclaration}>

            <h3>Declarations</h3>
            <hr/>

            <div className="form-field">
                <label>Politically exposed person <span>*</span></label>
                <div className="form-field-grid">
                    <div className="radio-field">
                       <label> <input
                        type="radio"
                        value="yes"
                        name="politically_exposed_person"
                        />Yes </label>
                    </div>

                    <div className="radio-field">
                        <label><input
                        type="radio"
                        value="no"
                        name="politically_exposed_person"
                        />No </label>
                    </div>

                    <div className="form-field">
                        <label>Full name <span>*</span></label>
                        <input 
                        type="text"
                        name="name"
                        />
                    </div>

                    <div className="form-field">
                        <label>Signature <span>*</span></label>
                        <input 
                        type="text"
                        name="signature"
                        />
                    </div>

                     <div className="form-field">
                        <label>Date <span>*</span></label>
                        <input 
                        type="date"
                        name="date"
                        />
                    </div>

                       <div className="form-field">
                        <label>Designation <span>*</span></label>
                        <input 
                        type="text"
                        name="designation"
                        />
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