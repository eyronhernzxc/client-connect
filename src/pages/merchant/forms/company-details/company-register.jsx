import { useEffect, useState } from 'react';
import {postCompany} from "../../../../api/postCompany";
import {getCompanyTypes} from "../../../../api/getCompanyTypes";
import Header from '../header/header';
import {useNavigate} from "react-router-dom";
import '../form-style.css'
import PageHeader from '../../../../components/admin/header/page-header';

export default function CompanyRegistration() {

const navigate = useNavigate();

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

    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.data?.id;
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
        transaction_total_amount: formData.get("transaction_total_amount"),
        status: status
    }

    try{
        const Companyresponse = await postCompany(data);
        console.log("Company Registration submitted successfully:", Companyresponse);
        alert("Company registration submitted successfully");
        navigate("/form/signatory");

    }

    catch(error){

         console.log("STATUS:", error.response?.status);
  console.log("DATA:", error.response?.data);
  console.log("MESSAGE:", error.response?.data?.message);
  console.log("FULL ERROR:", error);
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

<div className='main-container'>
<div className='form-card'>

<Header>
    <h1>Company Registration</h1>
    <span className="flex"></span>
    <button>Clear</button>
</Header>

<div className='form-container'>
<form onSubmit={handleCompanyRegistration} className='form'>


    <div className="form-row">
        <div className="input-field">
            <label>Company Name <span>*</span></label>
            <input
            type='text'
            name='name'
            placeholder="e.g Pisopay.com inc"
            />
        </div>
         <div className="input-field">
            <label>Company Email <span>*</span></label>
            <input
            type='email'
            name='email'
            placeholder="e.g sample@gmail.com"
            />
        </div>
    </div>

    <div className="form-row">

        <div className="input-field">
            <label>Website URL <span>*</span></label>
            <input
            type='url'
            placeholder="https://sample.com"
            name='website_url'
            />
        </div>

        <div className="input-field">
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

    </div>

    <div className="form-row">
        <div className="input-field">
            <label>Company Phone No. <span>*</span></label>
            <input
            type='tel'
            placeholder="e.g 09XXXXXXXXX"
            name='phone'
            />
        </div>

         <div className="input-field">
            <label>Company Address <span>*</span></label>
            <input
            type='text'
            name='address'
            placeholder="e.g Polaris, Makati City"
            />
        </div>
    </div>

    <div className="form-row">

        <div className="input-field">
            <label>Zip Code <span>*</span></label>
            <input
            type='number'
            placeholder="e.g 1090"
            name='zip_code'
            />
        </div>

        <div className="input-field">
            <label>Year Estabished<span>*</span></label>
            <input
            type='number'
            placeholder="e.g 2010"
            name='year_established'
            />
        </div>
    </div>

    <div className="form-row">
        <div className="input-field">
            <label>DTI no. <span>*</span></label>
            <input
            type='text'
            placeholder="e.g XXX-XXX-XXX"
            name='dti_registration_number'
            />
        </div>

        <div className="input-field">
            <label>Company TIN <span>*</span></label>
            <input
            type='text'
            placeholder="e.g XXX-XXX-XXX"
            name='company_tin'
            />
        </div>
    </div>

    <div className="form-row">
        <div className="input-field">
            <label>Tax type <span>*</span></label>
            <select name='tax_type'>
                <option value="">Tax type</option>
                <option value="1">Vat</option>
                <option value="2">Non-Vat</option>
            </select>
        </div>
    </div>

    <div className="form-row">
        <div className="input-field">
            <label>Expected Transaction per day <span>*</span></label>
            <input
            type='number'
            placeholder="e.g 3"
            name='expected_transaction'
            />
        </div>

        <div className="input-field">
            <label>Transaction Amount <span>*</span></label>
            <input
            type='number'
            placeholder="e.g XXX,XXX.XX"
            name='transaction_total_amount'
            />
        </div>
    </div>

    <div className="form-field">
        <label>Application purpose <span>*</span></label>
        <textarea
        
        placeholder="Type here..."
        name='application_purpose'/>
        
    </div>

    <button type='submit'>Submit</button>

</form>
</div>
</div>
</div>
</>
)
}
