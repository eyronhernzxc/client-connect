import React from "react";
import { useState, useEffect} from "react";
import { getBankCategory } from "../../../../api/getCompanyCategory";
import { postBank, postOrganization, postFatca, postCustomerSupport } from "../../../../api/postAdditionalInformation";

import Header from "../header/header";
import "../form-style.css";

export default function AdditionalInformation() {

    const [bankCategory, setBankCategory] = useState([]);

    useEffect(() => {
    
        const fetchBankCategory = async () => {
            try {
    
                const category = await getBankCategory();
                setBankCategory(category);
            } catch (error) {
    
                console.error("Failed to fetch bank category: ", error);
            }
        };
        fetchBankCategory();
    }, []);

    const submitInformation = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    try{
        const user = await getCurrentUser();

        console.log("Authenticated User:", user);
        
        if (!user?.id) {
            throw new Error("User not authenticated");
        }

        const company_id = user.company_id || user.company?.id;

        console.log("Authenticated user ID:", user.id);
        console.log("Authenticated company ID:", company_id);

        if(!company_id) {
            throw new Error("Unable to determine the user's company.");
        }

        const relatedCompanyList = {

            company_id: company_id,
            name: formData.get("related_company_list")
        }

        const bank = {

        company_id: company_id,
        bank_category_id: formData.get("bank_category_id"),
        name: formData.get("bank_name"),
        branch_name: formData.get("branch_name"),
        branch_address: formData.get("branch_address"),
        account_number: formData.get("account_number"),
        account_type: formData.get("account_type"),
        contact_person: formData.get("contact_person"),
        phone: formData.get("phone"),
        email: formData.get("email")
    }

    const organization = {

        company_id: company_id,
        fullname: formData.get("org_fullname"),
        relationship: formData.get("relationship"),
        position: formData.get("position"),
        organization_name: formData.get("organization_name")
        
    }

    const fatca = {

        company_id: company_id,
        us_address: formData.get("us_address"),
        zip_code: formData.get("us_zip_code"),
        us_phone: formData.get("us_phone"),
        length_of_stay: formData.get("length_of_stay"),
        us_tin: formData.get("us_tin"),
    }

    const customerSupport = {

        company_id: company_id,
        contact_number: formData.get("cs_number"),
        cs_schedule:  formData.get("cs_schedule")
    }

    console.log("Bank Data:", bank);
    console.log("Organization Data:", organization);
    console.log("FATCA Data:", fatca);
    console.log("Customer Support Data:", customerSupport);

    const relatedCompanies = await postRelatedCompanies(relatedCompanyList);
    const bankResponse = await postBank(bank);
    const organizationResponse = await postOrganization(organization);
    const fatcaResponse = await postFatca(fatca);
    const csResponse = await postCustomerSupport(customerSupport);

        
    } catch (error) {
        console.error("Error submitting additional information:", error);
        console.error("RESPONSE:", error.response?.data);
        console.error("STATUS:", error.response?.status);
    }

};

  return (
    <div className="form-overlay">
      <div className="form-card">
        <Header>
          <h1>Additional Information</h1>
        </Header>

        <div className="form-container">
          <form className="form" onSubmit={(e) => submitInformation(e)}>
            <div className="form-field">
                <label>List of Company/ies where you’re a Director/Officer/Stockholder/Authorized Signatory<span>*</span></label>
                <input
                type="text"
                name="related_company_list"
                />
            </div>
            <div className="form-field">
                <label>Bank Category<span>*</span></label>
               <select name="bank_category_id" required>
                <option value="">Select bank category</option>
                {bankCategory.map((category) => (

                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                                ))}

               </select>
            </div>

             <div className="form-field">
                <label>Bank Name<span>*</span></label>
                <input
                type="text"
                name="bank_name"     
                />
            </div>

            <div className="form-field">
                <label>Branch Name<span>*</span></label>
                <input
                type="text"
                name="branch_name"     
                />
            </div>

            <div className="form-field">
                <label>Branch Address<span>*</span></label>
                <input
                type="text"
                name="branch_address"     
                />
            </div>

             <div className="form-field">
                <label>Account Number<span>*</span></label>
                <input
                type="number"
                name="account_number"     
                />
            </div>

            <div className="form-field">
                <label>Account Type<span>*</span></label>
                <input
                type="text"
                name="account_type"     
                />
            </div>

             <div className="form-field">
                <label>Contact Person<span>*</span></label>
                <input
                type="text"
                name="contact_person"     
                />
            </div>

            <div className="form-field">
                <label>Phone Number <span>*</span></label>
                <input
                type="tel"
                name="phone"     
                />
            </div>

            <div className="form-field">
                <label>Email <span>*</span></label>
                <input
                type="email"
                name="email"     
                />
            </div>

            <h3>Organization Relationship</h3>
            <hr></hr>

             <div className="form-field">
                <label>Fullname <span>*</span></label>
                <input
                type="text"
                name="org_fullname"     
                />
            </div>

            <div className="form-field">
                <label>Relationship <span>*</span></label>
                <input
                type="text"
                name="relationship"     
                />
            </div>

            <div className="form-field">
                <label>Position <span>*</span></label>
                <input
                type="text"
                name="position"     
                />
            </div>

            <div className="form-field">
                <label>Organization Name <span>*</span></label>
                <input
                type="text"
                name="organization_name"     
                />
            </div>

            <h3>FATCA</h3>
            <hr></hr>

            <div className="form-field">
                <label>Are you U.S person? <span>*</span></label>
                <div className="form-field-grid">
                    <div className="radio-field">
                        <label>
                            <input
                            type="radio"
                            name="fatca_information_id"
                            value="yes"
                            />
                            Yes
                        </label>
                    </div>

                     <div className="radio-field">
                        <label>
                            <input
                            type="radio"
                            name="fatca_information_id"
                            value="no"
                            />
                            No
                        </label>
                    </div>

                </div>
            </div>
            <div className="form-field">
                <label>US Address <span>*</span></label>
                   <input
                    type="text"
                    name="us_address"       
                    />
            </div>

              <div className="form-field">
                <label>Zip Code <span>*</span></label>
                   <input
                    type="text"
                    name="us_zip_code"       
                    />
            </div>

              <div className="form-field">
                <label>U.S Phone number <span>*</span></label>
                   <input
                    type="tel"
                    name="us_phone"       
                    />
            </div>

             <div className="form-field">
                <label>Length of stay in U.S <span>*</span></label>
                   <input
                    type="number"
                    name="length_of_stay"       
                    />
            </div>

            <div className="form-field">
                <label>U.S Tin<span>*</span></label>
                   <input
                    type="number"
                    name="us_tin"       
                    />
            </div>

            {/* Customer Support*/}
            <h3>Customer Support Detail</h3>
            <hr></hr>

            <div className="form-field">
                <label>Customer Service Number<span>*</span></label>
                   <input
                    type="tel"
                    name="cs_number"       
                    />
            </div>

            <div className="form-field">
                <label>Customer Service Schedule<span>*</span></label>
                   <input
                    type="text"
                    name="cs_schedule"       
                    />
            </div>
            
    <button type="submit">Submit</button>

            
           
          </form>
        </div>
      </div>
    </div>
  );
}