import React, { useState } from "react";
import Header from "../header/header";
import "../form-style.css";
import { postDeclaration } from "../../../../api/postDeclaration";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../../../api/auth";
import { PenLine } from "lucide-react";

export default function Declaration() {

  const [loading, setLoading] = useState(false);  

  const navigate = useNavigate();

  const submitDeclaration  = async (event) => {
    event.preventDefault();
    setLoading(true);

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
    }finally{

      setLoading(false);
    }


  }


  return (

    <div className="main-container">
      <div className="form-card">
        <Header>
          <h1>Declaration</h1>
        </Header>

        <div className="form-container">
          <form className="form" onSubmit={(e) => submitDeclaration(e)}>

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

  );
}