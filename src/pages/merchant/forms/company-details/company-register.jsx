import React from 'react'
import { useEffect, useState } from 'react';
import {postCompany} from "../../../../api/postCompany";
import {getCompanyTypes} from "../../../../api/getCompanyTypes";
import Header from '../header/header';
import '../form-style.css'

export default function CompanyRegistration() {

const [companyTypes, setCompanyTypes] = useState([]);

useEffect(() => {
    
    document.title = "Pisopay | Company Registration"

    const fetchCompanyTypes = async () => {
        try {

            const types = await getCompanyTypes();
            setCompanyTypes(types);
        } catch (error) {

            console.error("Failed to fetch company types: ", error);
        }
    };
    fetchCompanyTypes();
}, []);

const handleCompanyRegistration = async (event) => {

    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const website_url = formData.get("website_url");
    const phone = formData.get("phone");
    const address = formData.get("address");
    const zip_code = formData.get("zip_code");
    const year_established = formData.get("year_established");
    const dti_registration_number = formData.get("dti_registration_number");
    const company_tin = formData.get("company_tin");
    const tax_type = formData.get("tax_type");
    const application_purpose = formData.get("application_purpose");
    const expected_transaction = formData.get("expected_transaction");
    const transaction_total_amount = formData.get("transaction_total_amount");

    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.id;
    const status = 'pending';


    const data = {

        user_id: userId,
        company_type_id: formData.get("company_type_id"),
        name: formData.get("name"),
        email: formData.get("email"),
        website_url: formData.get("website_url"),
        phone: formData.get("phone"),
        address: formData.get("address"),
        zip_code: formData.get("zip_code"),
        year_established: formData.get("year_established"),
        dti_registration_number: formData.get("dti_registration_number"),
        company_tin: formData.get("company_tin"),
        tax_type: formData.get("tax_type"),
        application_purpose: formData.get("application_purpose"),
        expected_transaction: formData.get("expected_transaction"),
        transaction_total_amount: formData.get("transaction_total_amount")   ,
        status: status
    }

    try{
        const response = await postCompany(data);
    }

    catch(error){

        console.error(error);
    }

}

return (

<div className='form-overlay'>
<div className='form-card'>

<Header>
    <h1>Company Registration</h1>
</Header>
<div className='form-container'>
<form onSubmit={handleCompanyRegistration} className='form'>


    <div className="form-field">
        <label>Company Name <span>*</span></label>
        <input
        type='text'
        name='name'
        placeholder="Enter company name"
        />
    </div>

    <div className="form-row">
        <div className="input-field">
            <label>Company Email <span>*</span></label>
            <input
            type='email'
            name='email'
            placeholder="Enter company email"
            />
        </div>

        <div className="input-field">
            <label>Website URL <span>*</span></label>
            <input
            type='url'
            placeholder="Enter website url"
            name='website_url'
            />
        </div>

    </div>

    <div className="form-field">
        <label>Company Type <span>*</span></label>
        <select name='company_type_id' required>
            <option value="">Select company type</option>
            {companyTypes.map((type) => (
                <option key={type.id} value={type.id}>
                    {type.name}
                </option>
            ))}
        </select>
    </div>

    <div className="form-field">
        <label>Company Phone No. <span>*</span></label>
        <input
        type='tel'
        placeholder="Enter phone"
        name='phone'
        />
    </div>

    <div className="form-field">
        <label>Company Address <span>*</span></label>
        <input
        type='text'
        name='address'
        placeholder="Enter company address"
        />
    </div>

    <div className="form-row">

        <div className="input-field">
            <label>Zip Code <span>*</span></label>
            <input
            type='number'
            placeholder="ZIP"
            name='zip_code'
            />
        </div>

        <div className="input-field">
            <label>Years in Business <span>*</span></label>
            <input
            type='number'
            placeholder="Enter years in business"
            name='year_established'
            />
        </div>
    </div>

    <div className="form-row">
        <div className="input-field">
            <label>DTI no. <span>*</span></label>
            <input
            type='text'
            placeholder="Enter dti"
            name='dti_registration_number'
            />
        </div>

        <div className="input-field">
            <label>Company TIN <span>*</span></label>
            <input
            type='text'
            placeholder="Enter company tin"
            name='company_tin'
            />
        </div>
    </div>

    <div className="form-field">
        <label>Tax type <span>*</span></label>
        <select name='tax_type'>
            <option disabled value="">Tax type</option>
            <option value="1">Vat</option>
            <option value="2">Non-Vat</option>
        </select>
    </div>

    <div className="form-field">
        <label>Application purpose <span>*</span></label>
        <input
        type='text'
        placeholder="Enter purpose"
        name='application_purpose'
        />
    </div>

    <div className="form-row">
        <div className="input-field">
            <label>Expected Transaction <span>*</span></label>
            <input
            type='number'
            placeholder="Enter expected transaction"
            name='expected_transaction'
            />
        </div>

        <div className="input-field">
            <label>Transaction Amount <span>*</span></label>
            <input
            type='number'
            placeholder="Enter transaction amount"
            name='transaction_total_amount'
            />
        </div>
    </div>
    <button type='submit'>Submit</button>

</form>
</div>
</div>
</div>
)
}
