import React from "react";
import Header from "../header/header";
import "../form-style.css";
import { postDeclaration } from "../../../../api/postDeclaration";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../../../api/auth";
import PageHeader from "../../../../components/admin/header/page-header";
import { PenLine } from "lucide-react";


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

export default function Declaration() {

  const navigate = useNavigate();

  const submitDeclaration  = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    try{

      const user = await getCurrentUser();

      console.log("Authenticated User:", user);

      if(!user?.id){

        throw new Error("User not authenticated");
      }

      const business_information_id = user.business_information_id || user.business_information?.id;

      console.log("Authenticated business information ID:", business_information_id);

      if(!business_information_id){

        throw new Error("Unable to determine the user's business information.");
      }

      const data = new FormData();

      data.append("business_information_id", business_information_id);
      data.append("politically_exposed_person", formData.get("politically_exposed_person"));
      data.append("name", formData.get("name"));
      data.append("signature", formData.get("signature"));
      data.append("date", formData.get("date"));
      data.append("designation",formData.get("designation"));


    const response = await postDeclaration(data);

    alert("Declaration submitted successfully!");
    navigate("/merchant/home");

    } catch(error){

      console.log("STATUS:", error.response?.status);
      console.log("RESPONSE:", error.response?.data);
      console.log("ERRORS:", error.response?.data?.errors);
      console.log("Error:", error);
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
          <h1>Declaration</h1>
        </Header>

        <div className="form-container">
          <form className="form" onSubmit={(e) => submitDeclaration(e)}
                onInput={sanitizeMerchantText}>

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
</div>
<hr/>
                  </div>

                    <div className="form-row">
                      <div className="input-field">
                          <label>Full name <span>*</span></label>
                          <input
                          type="text"
                          name="name"
                          placeholder="e.g Juan Dela Cruz"
                          />
                      </div>
                      <div className="input-field">
                          <label>Signature <span>*</span></label>
                          <input
                          type="file"
                          name="signature"
                          id="signature"
                          />
                          <label htmlFor="signature" className="file-label">
                            <PenLine />
                          </label>
                      </div>
                    </div>

                     <div className="form-row">
                       <div className="input-field">
                          <label>Date <span>*</span></label>
                          <input
                          type="date"
                          name="date"
                          />
                                           </div>
                         <div className="input-field">
                          <label>Designation <span>*</span></label>
                          <input
                          type="text"
                          name="designation"
                          placeholder="e.g President"
                          />
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