import Header from "../header/header";
import "../form-style.css";
import {postAddress} from "../../../../api/postAddress";


export default function Address() {

const submitAddress = async (event) => {
    event.preventDefault();

const formData = new FormData(event.currentTarget);

const present_address = {

    personal_detail_id: 1,
    address_type_id: 1,
    address_number: formData.get("present_address_number"),
    street: formData.get("present_street"),
    barangay: formData.get("present_barangay"),
    district: formData.get("present_district"),
    municipality: formData.get("present_municipality"),
    city: formData.get("present_city"),
    province: formData.get("present_province"),
    zip_code: formData.get("present_zip_code")
}

const permanent_address = {

    personal_detail_id: 1,
    address_type_id: 2,
    address_number: formData.get("permanent_address_number"),
    street: formData.get("permanent_street"),
    barangay: formData.get("permanent_barangay"),
    district: formData.get("permanent_district"),
    municipality: formData.get("permanent_municipality"),
    city: formData.get("permanent_city"),
    province: formData.get("permanent_province"),
    zip_code: formData.get("permanent_zip_code")
}

    try{

      const response = await postAddress(present_address, permanent_address);
      alert("Address submitted successfully!");

    }

    catch(error){

    console.error("STATUS:", error.response?.status);
    console.error("RESPONSE:", error.response?.data);
    console.error("ERRORS:", error.response?.data?.errors);
    console.error("MESSAGE:", error.message);
    
    }

  };

  return (
    <div className="form-overlay">
      <div className="form-card">
        <Header>
          <h1>Address</h1>
        </Header>
        <div className="form-container">
          <form className="form" onSubmit={submitAddress}>

        <h3>Present Address</h3>
        <hr/>

               <div className="form-row">
            <div className="input-field">
                <label>Address Number <span>*</span></label>
                <input
                  type="text"
                  name="present_address_number"
                  required
                />
            </div>

             <div className="input-field">
                <label>Street <span>*</span></label>
                <input
                  type="text"
                  name="present_street"
                  required
                />
            </div>
        </div>

         <div className="form-row">
            <div className="input-field">
                <label>Barangay <span>*</span></label>
                <input
                  type="text"
                  name="present_barangay"
                  required
                />
            </div>

             <div className="input-field">
                <label>District <span>*</span></label>
                <input
                  type="text"
                  name="present_district"
                  required
                />
            </div>
        </div>

         <div className="form-row">
            <div className="input-field">
                <label>Municipality <span>*</span></label>
                <input
                  type="text"
                  name="present_municipality"
                  required
                />
            </div>

             <div className="input-field">
                <label>City <span>*</span></label>
                <input
                  type="text"
                  name="present_city"
                  required
                />
            </div>
        </div>

          <div className="form-row">
            <div className="input-field">
                <label>Province <span>*</span></label>
                <input
                  type="text"
                  name="present_province"
                  required
                />
            </div>

             <div className="input-field">
                <label>Zip Code <span>*</span></label>
                <input
                  type="text"
                  name="present_zip_code"
                  required
                />
            </div>
        </div>

        <h3>Permanent Address</h3>
        <hr/>

        <div className="form-row">
            <div className="input-field">
                <label>Address Number <span>*</span></label>
                <input
                  type="text"
                  name="permanent_address_number"
                  required
                />
            </div>

             <div className="input-field">
                <label>Street <span>*</span></label>
                <input
                  type="text"
                  name="permanent_street"
                  required
                />
            </div>
        </div>

         <div className="form-row">
            <div className="input-field">
                <label>Barangay <span>*</span></label>
                <input
                  type="text"
                  name="permanent_barangay"
                  required
                />
            </div>

             <div className="input-field">
                <label>District <span>*</span></label>
                <input
                  type="text"
                  name="permanent_district"
                  required
                />
            </div>
        </div>

         <div className="form-row">
            <div className="input-field">
                <label>Municipality <span>*</span></label>
                <input
                  type="text"
                  name="permanent_municipality"
                  required
                />
            </div>

             <div className="input-field">
                <label>City <span>*</span></label>
                <input
                  type="text"
                  name="permanent_city"
                  required
                />
            </div>
        </div>

          <div className="form-row">
            <div className="input-field">
                <label>Province <span>*</span></label>
                <input
                  type="text"
                  name="permanent_province"
                  required
                />
            </div>

             <div className="input-field">
                <label>Zip Code <span>*</span></label>
                <input
                  type="text"
                  name="permanent_zip_code"
                  required
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