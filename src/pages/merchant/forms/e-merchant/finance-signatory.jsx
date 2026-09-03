import React, { useEffect, useState } from "react";
import Header from "../header/header";

import "../form-style.css";
import { postPersonalDetails } from "../../../../api/postSignatoryDetail";
import { getCurrentUser } from "../../../../api/auth";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../../../components/admin/header/page-header";
import { PenLine } from "lucide-react";

export default function SignatoryDetails() {

  const navigate = useNavigate();


 const submitSignatory = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    try {
        const user = await getCurrentUser();

        console.log("Authenticated User:", user);

        if (!user?.id) {
            throw new Error("User not authenticated");
        }

        const companyId =
            user.company_id ||
            user.company?.id;

        console.log("Authenticated user ID:", user.id);
        console.log("Authenticated company ID:", companyId);

        if (!companyId) {
            throw new Error(
                "Unable to determine the user's company."
            );
        }

        // Create FormData for API request
        const data = new FormData();

        data.append("company_id", companyId);
        data.append("personal_detail_type_id", 2);
        data.append("first_name", formData.get("firstname"));
        data.append("middle_name", formData.get("middlename") || "");
        data.append("last_name", formData.get("lastname"));

        // FILE
        data.append("signature", formData.get("signature"));

        data.append("birthdate", formData.get("birthdate"));
        data.append("birthplace", formData.get("birth_place"));
        data.append("nationality", formData.get("nationality"));
        data.append("citizenship", formData.get("citizenship"));
        data.append("phone_number", formData.get("phone_number"));
        data.append("email", formData.get("email"));
        data.append("civil_status", formData.get("civil_status"));
        data.append("gender", formData.get("gender"));

        console.log("SIGNATURE:", formData.get("signature"));

        const response = await postPersonalDetails(data);

        console.log("RESPONSE:", response);

        alert("Signatory details submitted successfully!");
        navigate("/form/address");

    } catch (error) {
        console.log("STATUS:", error.response?.status);
        console.log("RESPONSE:", error.response?.data);
        console.log("ERRORS:", error.response?.data?.errors);
        console.error(error);
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
          <h1>FINANCE / ACCOUNTING CONTACT PERSON</h1>
        </Header>

        <div className="form-container">
          <form className="form" onSubmit={(e) => submitSignatory(e)}>
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
                  type="file"
                  id="signature"
                />
                <label htmlFor="signature" className="file-label">
                  <PenLine />
                </label>
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
  </>
  );
}