import React from "react";
import { useState, useEffect} from "react";
import { getBankCategory } from "../../../../api/getCompanyCategory";
import { postBank, postOrganization, postFatca, postCustomerSupport } from "../../../../api/postAdditionalInformation";

import Header from "../header/header";
import "../form-style.css";
import PageHeader from "../../../../components/admin/header/page-header";

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
            <div className="form-row">
                <div className="input-field">
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
                 <div className="input-field">
                    <label>Bank Name<span>*</span></label>
                    <input
                    type="text"
                    name="bank_name"
                    placeholder="e.g Banco de Oro"
                    />
                </div>
            </div>

            <div className="form-row">
                <div className="input-field">
                    <label>Branch Name<span>*</span></label>
                    <input
                    type="text"
                    name="branch_name"
                    placeholder="e.g BDO Makati"
                    />
                </div>
                <div className="input-field">
                    <label>Branch Address<span>*</span></label>
                    <input
                    type="text"
                    name="branch_address"
                    placeholder="e.g Ayala Avenue Branch"
                    />
                </div>
            </div>

             <div className="form-row">
                 <div className="input-field">
                    <label>Account Number<span>*</span></label>
                    <input
                    type="number"
                    name="account_number"
                    placeholder="e.g XXX-XXX-XXX"
                    />
                             </div>
                 
                             <div className="input-field">
                    <label>Account Type<span>*</span></label>
                    <input
                    type="text"
                    name="account_type"
                    placeholder="e.g Savings Account"
                    />
                             </div>
             </div>

             <div className="form-row">
                 <div className="input-field">
                    <label>Contact Person<span>*</span></label>
                    <input
                    type="text"
                    name="contact_person"
                    placeholder="e.g Juan"
                    />
                             </div>
                 
                             <div className="input-field">
                    <label>Phone Number <span>*</span></label>
                    <input
                    type="tel"
                    name="phone"
                    placeholder="e.g 09XXXXXXXXX"
                    />
                             </div>
             </div>

            <div className="form-field">
                <label>Email <span>*</span></label>
                <input
                type="email"
                name="email"     
                placeholder="e.g sample@gmail.com"
                />
            </div>

            <h3>Organization Relationship</h3>
            <hr></hr>

             <div className="form-row">
                 <div className="input-field">
                    <label>Fullname <span>*</span></label>
                    <input
                    type="text"
                    name="org_fullname"
                    placeholder="e.g Juan Dela Cruz"
                    />
                             </div>
                 
                             <div className="input-field">
                    <label>Relationship <span>*</span></label>
                    <input
                    type="text"
                    name="relationship"
                    placeholder="e.g Shareholder"
                    />
                             </div>
             </div>

            <div className="form-row">
                <div className="input-field">
                    <label>Position <span>*</span></label>
                    <input
                    type="text"
                    name="position"
                    placeholder="e.g Owner"
                    />
                </div>
                <div className="input-field">
                    <label>Organization Name <span>*</span></label>
                    <input
                    type="text"
                    name="organization_name"
                    placeholder="e.g XYZ Trading Company"
                    />
                </div>
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
                <hr/>
            </div>
            <div className="form-row">
                <div className="input-field-large">
                    <label>US Address <span>*</span></label>
                       <input
                        type="text"
                        name="us_address"
                        placeholder="e.g 1234 Sunset Boulevard, Los Angeles, CA 90026, USA"
                        />
                </div>
                  <div className="input-field-short">
                    <label>Zip Code <span>*</span></label>
                       <input
                        type="text"
                        name="us_zip_code"
                        placeholder="e.g 1100"
                        />
                </div>
            </div>

              <div className="form-field">
                <label>U.S Phone number <span>*</span></label>
                   <input
                    type="tel"
                    name="us_phone"   
                    placeholder="e.g +1 202-555-0147"    
                    />
            </div>

             <div className="form-field">
                <label>Length of stay in U.S <span>*</span></label>
                   <input
                    type="number"
                    name="length_of_stay" 
                    placeholder="e.g 7 years"      
                    />
            </div>

            <div className="form-field">
                <label>U.S Tin<span>*</span></label>
                   <input
                    type="number"
                    name="us_tin"     
                    placeholder="e.g XXX-XXX-XXXX"  
                    />
            </div>

            {/* Customer Support*/}
            <h3>Customer Support Detail</h3>
            <hr></hr>
<div className="form-row">
    
                <div className="input-field">
                    <label>Customer Service Number<span>*</span></label>
                       <input
                        type="tel"
                        name="cs_number"
                        placeholder="e.g 09XXXXXXXXX"
                        />
                </div>
    
                <div className="input-field">
                    <label>Customer Service Schedule<span>*</span></label>
                       <input
                        type="text"
                        name="cs_schedule"
                        placeholder="e.g Monday to Friday, 8:00 am to 6:00 pm"
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