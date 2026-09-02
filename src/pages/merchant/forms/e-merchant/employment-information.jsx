import React from "react";

import Header from "../header/header";
import "../form-style.css";
import { getCurrentUser } from "../../../../api/auth";
import { postEmployment } from "../../../../api/postEmployment";
import { useNavigate } from "react-router-dom";



export default function Employment() {

    const navigate = useNavigate();

    const submitEmployment = async (event) => {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);

  try {
    const user = await getCurrentUser();

    console.log("Authenticated User:", user);

    if (!user?.id) {
      throw new Error("User not authenticated");
    }

    const personal_detail_id =
      user.personal_detail_id || user.personal_detail?.id;

    console.log("Personal Detail ID:", personal_detail_id);

    if (!personal_detail_id) {
      throw new Error("Unable to determine the user's personal detail.");
    }

    const data = {
      personal_detail_id: personal_detail_id,
      employers_name: formData.get("employers_name"),
      employers_address: formData.get("employers_address"),
      job_title: formData.get("job_title"),
      employment_date: formData.get("employment_date"),
      telephone_number: formData.get("telephone_number"),
      business_nature: formData.getAll("business_nature[]"),
    };

    const response = await postEmployment(data);
    console.log("Employment Information submitted successfully:", response);
    alert("Employment Information submitted successfully");
    navigate("/form/business-info");
  } catch (error) {
    console.error("STATUS:", error.response?.status);
    console.error("RESPONSE:", error.response?.data);
    console.error("ERRORS:", error.response?.data?.errors);
    console.error("Error Message:", error.message);
  }
};

  return (
    <div className="form-overlay">
      <div className="form-card">
        <Header>
          <h1>Employment Information</h1>
        </Header>

        <div className="form-container">
          <form className="form" onSubmit={(e) => submitEmployment(e)}>
            <div className="form-field">
              <label>
                Employer's Name <span></span>
              </label>
              <input type="text" name="employers_name" />
            </div>

            <div className="form-field">
              <label>
                Employer's Address <span>*</span>
              </label>
              <input type="text" name="employers_address" />
            </div>

            <div className="form-field">
              <label>
                Job title <span>*</span>
              </label>
              <input type="text" name="job_title" />
            </div>

            <div className="form-field">
              <label>
                Employment Date <span>*</span>
              </label>
              <input type="date" name="employment_date" />
            </div>

            <div className="form-field">
              <label>
                Telephone Number <span>*</span>
              </label>
              <input type="tel" name="telephone_number" />
            </div>

            <div className="form-field">
              <label>
                NATURE OF BUSINESS/ECONOMIC ACTIVITY: <span>*</span>
              </label>
              <div className="form-field-grid">
                <div className="radio-field">
                  <label>
                    <input
                      type="checkbox"
                      value="Private Household with Employed Persons"
                      name="business_nature[]"
                    />
                    Private Household with Employed Persons{" "}
                  </label>
                </div>

                <div className="radio-field">
                  <label>
                    <input
                      type="checkbox"
                      value="Extra-territorial Organizations and Bodies"
                      name="business_nature[]"
                    />
                    Extra-territorial Organizations and Bodies{" "}
                  </label>
                </div>

                <div className="radio-field">
                  <label>
                    <input
                      type="checkbox"
                      value="Jewelry and Precious Stones Dealer"
                      name="business_nature[]"
                    />
                    Jewelry and Precious Stones Dealer{" "}
                  </label>
                </div>

                <div className="radio-field">
                  <label>
                    <input
                      type="checkbox"
                      value="Foreign Exchange Dealer/Money Changer/Remittance Agent"
                      name="business_nature[]"
                    />
                    Foreign Exchange Dealer/Money Changer/Remittance Agent{" "}
                  </label>
                </div>

                <div className="radio-field">
                  <label>
                    <input
                      type="checkbox"
                      value="Agriculture, Forestry, and Fishing"
                      name="business_nature[]"
                    />
                    Agriculture, Forestry, and Fishing{" "}
                  </label>
                </div>

                <div className="radio-field">
                  <label>
                    <input
                      type="checkbox"
                      value="Mining and Quarrying"
                      name="business_nature[]"
                    />
                    Mining and Quarrying{" "}
                  </label>
                </div>

                <div className="radio-field">
                  <label>
                    <input
                      type="checkbox"
                      value="Manufacturing"
                      name="business_nature[]"
                    />
                    Manufacturing{" "}
                  </label>
                </div>

                <div className="radio-field">
                  <label>
                    <input
                      type="checkbox"
                      value="Electricity, Gas, Steam, and Air-conditioning Supply"
                      name="business_nature[]"
                    />
                    Electricity, Gas, Steam, and Air-conditioning Supply{" "}
                  </label>
                </div>

                <div className="radio-field">
                  <label>
                    <input
                      type="checkbox"
                      value="Information and Communication"
                      name="business_nature[]"
                    />
                    Information and Communication{" "}
                  </label>
                </div>

                <div className="radio-field">
                  <label>
                    <input
                      type="checkbox"
                      value="Water Supply, Sewerage, Waste Management and Remediation Activities (e.g., Cleaning up of Oil Spills)"
                      name="business_nature[]"
                    />
                    Water Supply, Sewerage, Waste Management and Remediation
                    Activities (e.g., Cleaning up of Oil Spills){" "}
                  </label>
                </div>

                <div className="radio-field">
                  <label>
                    <input
                      type="checkbox"
                      value="Construction (e.g., Construction of Buildings, Railroad Infrastructures)"
                      name="business_nature[]"
                    />
                    Construction (e.g., Construction of Buildings, Railroad
                    Infrastructures){" "}
                  </label>
                </div>

                <div className="radio-field">
                  <label>
                    <input
                      type="checkbox"
                      value="Wholesale and Retail Trade, Repair of Motor Vehicles and Motorcycles"
                      name="business_nature[]"
                    />
                    Wholesale and Retail Trade, Repair of Motor Vehicles and
                    Motorcycles{" "}
                  </label>
                </div>

                <div className="radio-field">
                  <label>
                    <input
                      type="checkbox"
                      value="Transportation and Storage"
                      name="business_nature[]"
                    />
                    Transportation and Storage
                  </label>
                </div>

                <div className="radio-field">
                  <label>
                    <input
                      type="checkbox"
                      value="Accommodation and Food Service Activities"
                      name="business_nature[]"
                    />
                    Accommodation and Food Service Activities{" "}
                  </label>
                </div>

                <div className="radio-field">
                  <label>
                    <input
                      type="checkbox"
                      value="Professional, Scientific, and Technical Activities"
                      name="business_nature[]"
                    />
                    Professional, Scientific, and Technical Activities{" "}
                  </label>
                </div>

                <div className="radio-field">
                  <label>
                    <input
                      type="checkbox"
                      value="Administrative and Support Service Activities"
                      name="business_nature[]"
                    />
                    Administrative and Support Service Activities{" "}
                  </label>
                </div>

                <div className="radio-field">
                  <label>
                    <input
                      type="checkbox"
                      value="Public Administrative and Defense Education"
                      name="business_nature[]"
                    />
                    Public Administrative and Defense Education{" "}
                  </label>
                </div>

                <div className="radio-field">
                  <label>
                    <input
                      type="checkbox"
                      value="Human Health and Social Work Activities"
                      name="business_nature[]"
                    />
                    Human Health and Social Work Activities{" "}
                  </label>
                </div>

                <div className="radio-field">
                  <label>
                    <input
                      type="checkbox"
                      value="Activities of Private Households as Employers and Undifferentiated"
                      name="business_nature[]"
                    />
                    Activities of Private Households as Employers and
                    Undifferentiated
                  </label>
                </div>

                <div className="radio-field">
                  <label>
                    <input
                      type="checkbox"
                      value="Financial and Insurance Activities"
                      name="business_nature[]"
                    />
                    Financial and Insurance Activities{" "}
                  </label>
                </div>

                <div className="radio-field">
                  <label>
                    <input
                      type="checkbox"
                      value="Real Estate Activities"
                      name="business_nature[]"
                    />
                    Real Estate Activities
                  </label>
                </div>

                <div className="radio-field">
                  <label>
                    <input
                      type="checkbox"
                      value="Activities of Extraterritorial Organizations, and Bodies (e.g., Activities of International Organizations, such as, United Nations, ASEAN, Etc.)"
                      name="business_nature[]"
                    />
                    Activities of Extraterritorial Organizations, and Bodies
                    (e.g., Activities of International Organizations, such as,
                    United Nations, ASEAN, Etc.)
                  </label>
                </div>

                <div className="radio-field">
                  <label>
                    <input
                      type="checkbox"
                      value="Gambling and Betting Activities"
                      name="business_nature[]"
                    />
                    Gambling and Betting Activities{" "}
                  </label>
                </div>

                <div className="radio-field">
                  <label>
                    <input
                      type="checkbox"
                      value="Goods and Services and Producing Activities of Households for own use (e.g., Activities of Households as Employers of Domestic Personnel such as Maids, Cooks, Waiters, Valets, etc.)"
                      name="business_nature[]"
                    />
                    Goods and Services and Producing Activities of Households
                    for own use (e.g., Activities of Households as Employers of
                    Domestic Personnel such as Maids, Cooks, Waiters, Valets,
                    etc.)
                  </label>
                </div>

                <div className="radio-field">
                  <label>
                    <input
                      type="checkbox"
                      value="Others"
                      name="business_nature[]"
                    />
                    Others: __________{" "}
                  </label>
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
