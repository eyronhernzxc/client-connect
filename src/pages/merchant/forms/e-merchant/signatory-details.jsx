import React, { useEffect, useState } from "react";
import Header from "../header/header";
import { getPersonalDetailType } from "../../../../api/getPersonalDetailType";

import "../form-style.css";
import { postPersonalDetails } from "../../../../api/postSignatoryDetail";

export default function SignatoryDetails() {

  const [personalDetailType, setpersonalDetailType] = useState([]);

  useEffect(() => {

    const fetchPersonalDetailTypes = async () => {

      try{

        const types = await getPersonalDetailType();
        setpersonalDetailType(types);

      } catch(error) {

        console.error("Failed tp fetch personal detail type")
      console.log("STATUS:", error.response?.status);
    console.log("RESPONSE:", error.response?.data);
    console.log("ERRORS:", error.response?.data?.errors);
      }
    };

    fetchPersonalDetailTypes();
  }, []);

  const submitSignatory = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const data = {

      company_id: 1,
      personal_detail_type_id: formData.get("personal_detail_type_id"),
      first_name: formData.get("firstname"),
      middle_name: formData.get("middlename"),
      last_name: formData.get("lastname"),
      signature: formData.get("signature"),
      birthdate: formData.get("birthdate"),
      birthplace: formData.get("birth_place"),
      nationality: formData.get("nationality"),
      citizenship: formData.get("citizenship"),
      phone_number: formData.get("phone_number"),
      email: formData.get("email"),
      civil_status: formData.get("civil_status"),
      gender: formData.get("gender"),
    };

    try{

      const response = await postPersonalDetails(data);
      alert("Signatory details submitted successfully!");
    }

    catch(error){

    console.log("STATUS:", error.response?.status);
    console.log("RESPONSE:", error.response?.data);
    console.log("ERRORS:", error.response?.data?.errors);
    
    }

  };

  return (
    <div className="form-overlay">
      <div className="form-card">
        <Header>
          <h1>Signatory Details</h1>
        </Header>

        <div className="form-container">
          <form className="form" onSubmit={submitSignatory}>
           

          <div className="form-field">
        <label>Personal detail type <span>*</span></label>
        <select name='personal_detail_type_id' required>
            <option value="">Select Personal detail type</option>
            {personalDetailType.map((type) =>(
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
        </select>
    </div>
          <div className="form-row">
              <div className="input-field">
                <label>
                  First name <span>*</span>
                </label>
                <input
                  name="firstname"
                  type="text"
                  placeholder="Enter first name"
                />
              </div>

              <div className="input-field">
                <label>
                  Last Name <span>*</span>
                </label>
                <input
                  name="lastname"
                  type="text"
                  placeholder="Enter last name"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="input-field">
                <label>
                  Middle Name <span>*</span>
                </label>
                <input
                  name="middlename"
                  type="text"
                  placeholder="Enter middle name"
                />
              </div>

              <div className="input-field">
                <label>
                  Upload E-signature <span>*</span>
                </label>
                <input
                  name="signature"
                  type="text"
                  placeholder="Upload e-signature"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="input-field">
                <label>Birthdate <span>*</span></label>
                <input
                  name="birthdate"
                  type="date"
                  placeholder="Enter birthdate"
                />
              </div>
              <div className="input-field">
                <label>Birth Place <span>*</span></label>
                <input
                  name="birth_place"
                  type="text"
                  placeholder="Enter birth place"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="input-field">
                <label>Nationality <span>*</span></label>
                <select name="nationality">
                  <option value="">Select Nationality</option>
                  <option value="filipino">Filipino</option>
                </select>
                </div>
                <div className="input-field">
                <label>Citizenship <span>*</span></label>
                <select name="citizenship">
                  <option value="">Select Citizenship</option>
                  <option value="filipino">Filipino</option>
                </select>
                </div>
            </div>

              <div className="form-row">
              <div className="input-field">
                <label>Contact Number <span>*</span></label>
                <input
                  name="phone_number"
                  type="tel"
                  placeholder="Enter phone number"
                />
              </div>
              <div className="input-field">
                <label>Email <span>*</span></label>
                <input
                  name="email"
                  type="email"
                  placeholder="Enter email"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="input-field">
                <label>Civil Status <span>*</span></label>
                <select name="civil_status">
                  <option value="">
                    Select status
                  </option>
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                  <option value="widowed">Widowed</option>
                </select>
              </div>
            

            <div className="input-field">
              <label>Gender <span>*</span></label>
              <select name="gender">
                <option value="">
                  Select gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="prefer_not_to_say">Prefer not to say</option>
              </select>
            </div>
            </div>


            <button type="submit">Submit</button>
            </form>
        </div>
      </div>
    </div>
  );
}