import React, { useEffect, useState } from "react";
import Header from "../header/header";

import "../form-style.css";
import { postPersonalDetails } from "../../../../api/postSignatoryDetail";
import { getCurrentUser } from "../../../../api/auth";
import { useNavigate } from "react-router-dom";

import { PenLine, Upload } from "lucide-react";
import PageHeader from "../../../../components/merchant/form/page-header";
import { getIdTypes } from "../../../../api/getIdTypes";

export default function SignatoryDetails() {
  const navigate = useNavigate();

  const [IdTypes, setIdTypes] = useState([]);

  useEffect(() => {
    const fetchIdTypes = async () => {
      try {
        const types = await getIdTypes();
        setIdTypes(types);
      } catch (error) {
        console.error("Failed to Fetch valid Id types");
      }
    };

    fetchIdTypes();
  }, []);


  const submitSignatory = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    try {
      const user = await getCurrentUser();

      console.log("Authenticated User:", user);

      if (!user?.data?.id) {
        throw new Error("User not authenticated");
      }

      const companyId = user.company?.id || user?.data?.company?.id;

      console.log("Authenticated user ID:", user.id);
      console.log("Authenticated company ID:", companyId);

      if (!companyId) {
        throw new Error("Unable to determine the user's company.");
      }

      // Create FormData for API request
      const data = new FormData();

      data.append("company_id", companyId);
      data.append("personal_detail_type_id", 1);
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

      // Present Address
      data.append("present_address_number", formData.get("present_address_number"));
      data.append("present_street", formData.get("present_street"));
      data.append("present_barangay", formData.get("present_barangay"));
      data.append("present_district", formData.get("present_district"));
      data.append("present_municipality", formData.get("present_municipality"));
      data.append("present_city", formData.get("present_city"));
      data.append("present_province", formData.get("present_province"));
      data.append("present_zip_code", formData.get("present_zip_code"));

      // Permanent Address
      data.append("permanent_address_number", formData.get("permanent_address_number"));
      data.append("permanent_street", formData.get("permanent_street"));
      data.append("permanent_barangay", formData.get("permanent_barangay"));
      data.append("permanent_district", formData.get("permanent_district"));
      data.append("permanent_municipality", formData.get("permanent_municipality"));
      data.append("permanent_city", formData.get("permanent_city"));
      data.append("permanent_province", formData.get("permanent_province"));
      data.append("permanent_zip_code", formData.get("permanent_zip_code"));

      // Valid ID
      data.append("valid_id_type_id", formData.get("valid_id_type_id"));
      data.append("image", formData.get("image"));
      data.append("number", formData.get("number"));
      data.append("expiration_date", formData.get("expiration_date"));

      // Mother's Information
      data.append("mother_name", formData.get("mother_name"));
      data.append("mother_birthdate", formData.get("mother_birthdate"));
      data.append("mother_birthplace", formData.get("mother_birthplace"));
      data.append("mother_nationality", formData.get("mother_nationality"));
      data.append("mother_profession", formData.get("mother_profession"));

      // Spouse Information
      data.append("spouse_name", formData.get("spouse_name"));
      data.append("spouse_birthdate", formData.get("spouse_birthdate"));
      data.append("spouse_birthplace", formData.get("spouse_birthplace"));
      data.append("spouse_nationality", formData.get("spouse_nationality"));
      data.append("spouse_profession", formData.get("spouse_profession"));

      console.log("SIGNATURE:", formData.get("signature"));

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
          We’re happy to have you here. Let’s get your merchant and company
          application started!
        </p>
      </PageHeader>

      <div className="main-container">
        <div className="form-card">
          <Header>
            <h1>Signatory Details</h1>
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
                    Email <span>*</span>
                  </label>
                  <input name="email" type="email" placeholder="Enter email" />
                </div>
              </div>

              <div className="form-row">
                <div className="input-field">
                  <label>
                    Birthdate <span>*</span>
                  </label>
                  <input
                    name="birthdate"
                    type="date"
                    placeholder="Enter birthdate"
                  />
                </div>
                <div className="input-field">
                  <label>
                    Birth Place <span>*</span>
                  </label>
                  <input
                    name="birth_place"
                    type="text"
                    placeholder="Enter birth place"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="input-field">
                  <label>
                    Nationality <span>*</span>
                  </label>
                  <select name="nationality">
                    <option value="">Select Nationality</option>
                    <option value="filipino">Filipino</option>
                  </select>
                </div>
                <div className="input-field">
                  <label>
                    Citizenship <span>*</span>
                  </label>
                  <select name="citizenship">
                    <option value="">Select Citizenship</option>
                    <option value="filipino">Filipino</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="input-field">
                  <label>
                    Contact Number <span>*</span>
                  </label>
                  <input
                    name="phone_number"
                    type="tel"
                    placeholder="Enter phone number"
                  />
                </div>

                <div className="input-field">
                  <label>
                    Civil Status <span>*</span>
                  </label>
                  <select name="civil_status">
                    <option value="">Select status</option>
                    <option value="single">Single</option>
                    <option value="married">Married</option>
                    <option value="widowed">Widowed</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="input-field">
                  <label>
                    Gender <span>*</span>
                  </label>
                  <select name="gender">
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="prefer_not_to_say">Prefer not to say</option>
                  </select>
                </div>

                <div className="input-field">
                  <label>
                    Upload E-signature <span>*</span>
                  </label>
                  <input name="signature" type="file" id="signature" />
                  <label htmlFor="signature" className="file-label">
                    <PenLine />
                  </label>
                </div>
              </div>

              <h3>Present Address</h3>
              <hr />

              <div className="form-row">
                <div className="input-field">
                  <label>
                    Address Number <span>*</span>
                  </label>
                  <input type="text" name="present_address_number" required />
                </div>

                <div className="input-field">
                  <label>
                    Street <span>*</span>
                  </label>
                  <input type="text" name="present_street" required />
                </div>
              </div>

              <div className="form-row">
                <div className="input-field">
                  <label>
                    Barangay <span>*</span>
                  </label>
                  <input type="text" name="present_barangay" required />
                </div>

                <div className="input-field">
                  <label>
                    District <span>*</span>
                  </label>
                  <input type="text" name="present_district" required />
                </div>
              </div>

              <div className="form-row">
                <div className="input-field">
                  <label>
                    Municipality <span>*</span>
                  </label>
                  <input type="text" name="present_municipality" required />
                </div>

                <div className="input-field">
                  <label>
                    City <span>*</span>
                  </label>
                  <input type="text" name="present_city" required />
                </div>
              </div>

              <div className="form-row">
                <div className="input-field">
                  <label>
                    Province <span>*</span>
                  </label>
                  <input type="text" name="present_province" required />
                </div>

                <div className="input-field">
                  <label>
                    Zip Code <span>*</span>
                  </label>
                  <input type="text" name="present_zip_code" required />
                </div>
              </div>

              <h3>Permanent Address</h3>
              <hr />

              <div className="form-row">
                <div className="input-field">
                  <label>
                    Address Number <span>*</span>
                  </label>
                  <input type="text" name="permanent_address_number" required />
                </div>

                <div className="input-field">
                  <label>
                    Street <span>*</span>
                  </label>
                  <input type="text" name="permanent_street" required />
                </div>
              </div>

              <div className="form-row">
                <div className="input-field">
                  <label>
                    Barangay <span>*</span>
                  </label>
                  <input type="text" name="permanent_barangay" required />
                </div>

                <div className="input-field">
                  <label>
                    District <span>*</span>
                  </label>
                  <input type="text" name="permanent_district" required />
                </div>
              </div>

              <div className="form-row">
                <div className="input-field">
                  <label>
                    Municipality <span>*</span>
                  </label>
                  <input type="text" name="permanent_municipality" required />
                </div>

                <div className="input-field">
                  <label>
                    City <span>*</span>
                  </label>
                  <input type="text" name="permanent_city" required />
                </div>
              </div>

              <div className="form-row">
                <div className="input-field">
                  <label>
                    Province <span>*</span>
                  </label>
                  <input type="text" name="permanent_province" required />
                </div>

                <div className="input-field">
                  <label>
                    Zip Code <span>*</span>
                  </label>
                  <input type="text" name="permanent_zip_code" required />
                </div>
              </div>

              <div className="form-row">
                <div className="input-field">
                  <label>
                    Valid Id Type <span>*</span>
                  </label>
                  <select name="valid_id_type_id" required>
                    <option value="">Select Id Type</option>
                    {IdTypes.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="input-field">
                  <label>
                    Valid Id Image <span>*</span>
                  </label>
                  <input type="file" id="image" name="image" required />
                  <label htmlFor="image" className="file-label">
                    <Upload />
                  </label>
                </div>
              </div>

              <div className="form-row">
                <div className="input-field">
                  <label>
                    Valid Id Number <span>*</span>
                  </label>
                  <input
                    type="text"
                    name="number"
                    placeholder="e.g XXX-XXX-XX"
                    required
                  />
                </div>

                <div className="input-field">
                  <label>
                    Expiration Date
                  </label>
                  <input type="date" name="expiration_date" required />
                </div>
              </div>

              <h3>Mother's Information</h3>
              <hr />

              <div className="form-row">
                <div className="input-field">
                  <label>
                    Name <span>*</span>
                  </label>
                  <input type="text" name="mother_name" required />
                </div>

                <div className="input-field">
                  <label>
                    Birthdate <span>*</span>
                  </label>
                  <input type="date" name="mother_birthdate" required />
                </div>
              </div>

              <div className="form-row">
                <div className="input-field">
                  <label>
                    Birth Place <span>*</span>
                  </label>
                  <input type="text" name="mother_birthplace" required />
                </div>

                <div className="input-field">
                  <label>
                    Nationality <span>*</span>
                  </label>
                  <select name="mother_nationality" required>
                    <option value="">Select nationality</option>
                    <option value="Filipino">Filipino</option>
                    <option value="American">American</option>
                    <option value="Canadian">Canadian</option>
                  </select>
                </div>
              </div>

              <div className="form-field">
                <label>
                  Profession <span>*</span>
                </label>
                <input type="text" name="mother_profession" required />
              </div>

              <h3>Spouse Information</h3>
              <hr />

              <div className="form-row">
                <div className="input-field">
                  <label>
                    Name <span>*</span>
                  </label>
                  <input type="text" name="spouse_name" required />
                </div>

                <div className="input-field">
                  <label>
                    Birthdate <span>*</span>
                  </label>
                  <input type="date" name="spouse_birthdate" required />
                </div>
              </div>

              <div className="form-row">
                <div className="input-field">
                  <label>
                    Birth Place <span>*</span>
                  </label>
                  <input type="text" name="spouse_birthplace" required />
                </div>

                <div className="input-field">
                  <label>
                    Nationality <span>*</span>
                  </label>
                  <select name="spouse_nationality" required>
                    <option value="">Select nationality</option>
                    <option value="Filipino">Filipino</option>
                    <option value="American">American</option>
                    <option value="Canadian">Canadian</option>
                  </select>
                </div>
              </div>

              <div className="form-field">
                <label>
                  Profession <span>*</span>
                </label>
                <input type="text" name="spouse_profession" required />
              </div>

              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
