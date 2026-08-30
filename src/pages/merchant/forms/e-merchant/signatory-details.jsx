import React, { useEffect, useState } from "react";
import Header from "../header/header";
import { getPersonalDetailType } from "../../../../api/getPersonalDetailType";
import "../form-style.css";

export default function SignatoryDetails() {

  const [personalDetailType, setpersonalDetailType] = useState([]);

  useEffect(() => {

    const fetchPersonalDetailTypes = async () => {

      try{

        const types = await getPersonalDetailType();
        setpersonalDetailType(types);

      } catch(error) {

        console.log("Failed tp fetch personal detail type")
      }
    }
  })

  const submitSignatory = async (event) => {
    event.preventDefault();

    const formData = new formData(event.currentTraget);

    const data = {

      first_name: formData.get("firstname"),
      middle_name: formData.get("middlename"),
      last_name: formData.get("lastname"),
      e_signature: formData.get("esignature"),
      present_address: formData.get("present_address"),
      present_zip_code: formData.get("present_zip_code"),
      permanent_address: formData.get("permanent_address"),
      permanent_zip_code: formData.get("permanent_zip_code"),
      birthdate: formDta.get("birthdate"),
      birth_place: formData.get("birth_place"),
      civil_status: formData.get("civil_status"),
      gender: formData.get("gender"),
      contact_number: formData.get("contact_number"),
      email: formData.get("email"),
      valid_id_1: formData.get("valid_id_1"),
      valid_id_number_1: formData.get("valid_id_number_1"),
      id_expiration_1: formData.get("id_expiration_1"),
      valid_id_2: formData.get("valid_id_2"),
      valid_id_number_2: formData.get("valid_id_number_2"),
      id_expiration_2: formData.get("id_expiration_2"),
      mother_name: formData.get("mother_name"),
      mother_birthday: formData.get("mother_birthday"),
      mother_nationality: form_data.get("mother_nationality"),
      spouse_name: formData.get("spouse_name"),
      spouse_birthday: formData.get("spouse_birthday"),
      spouse_nationality: form_data.get("spouse_nationality"),
    };

    try{

      const response = await postSignatory(data);
    }

    catch(error){

      console.error(error);
    }

  };

  return (
    <div className="form-overlay">
      <div className="form-card">
        <Header>
          <h1>Signatory Details</h1>
        </Header>

        <div className="form-container">
          <form className="form" onClick={submitSignatory}>
            <div className="form-row">

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
                  name="esignature"
                  type="file"
                  placeholder="Upload e-signature"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="input-field-large">
                <label>
                  Present Address <span>*</span>
                </label>
                <input
                  name="present_address"
                  type="text"
                  placeholder="Enter present address"
                />
              </div>

              <div className="input-field-short">
                <label>
                  Zip Code <span>*</span>
                </label>
                <input
                  name="present_zip_code"
                  type="number"
                  placeholder="Enter zip code"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="input-field-large">
                <label>
                  Permanent Address <span>*</span>
                </label>
                <input
                  name="permanent_address"
                  type="text"
                  placeholder="Enter permanent address"
                />
              </div>
              <div className="input-field-short">
                <label>
                  Zip Code <span>*</span>
                </label>
                <input
                  name="permanent_zip_code"
                  type="number"
                  placeholder="Enter zip code"
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
            {/* select for nationality
                select for citizenship
              */}
            <div className="form-row">
              <div className="input-field">
                <label>Civil Status <span>*</span></label>
                <select name="civil_status">
                  <option disabled value="">
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
                <option disabled value="">
                  Select gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="prefer_not_to_say">Prefer not to say</option>
              </select>
            </div>
            </div>

            <div className="form-row">
              <div className="input-field">
                <label>Contact Number <span>*</span></label>
                <input
                  name="contact_number"
                  type="tel"
                  placeholder="Enter contact number"
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
            <h3>Valid Information</h3>
            <hr></hr>

            <div className="form-row">
              <div className="input-field">
                <label>1. Valid ID <span>*</span></label>
                <input
                    name="valid_id_1"
                    type="file"
                  />
              </div>
              <div className="input-field">
                <label>ID Number <span>*</span></label>
                <input
                    name="valid_id_number_1"
                    type="number"
                    placeholder="Enter ID number"
                  />
              </div>
            </div>

            <div className="form-row">
              <div className="input-field">
                <label>Expiration Date <span>*</span></label>
                <input
                    name="id_expiration_1"
                    type="number"
                    placeholder="Enter expiration date"
                  />
              </div>
            </div>

             <div className="form-row">
              <div className="input-field">
                <label>2. Valid ID <span>*</span></label>
                <input
                    name="valid_id_2"
                    type="file"
                  />
              </div>
              <div className="input-field">
                <label>ID Number <span>*</span></label>
                <input
                    name="valid_id_number_2"
                    type="number"
                    placeholder="Enter ID number"
                  />
              </div>
            </div>

            <div className="form-row">
              <div className="input-field">
                <label>Expiration Date <span>*</span></label>
                <input
                    name="id_expiration_2"
                    type="number"
                    placeholder="Enter expiration date"
                  />
              </div>
            </div>

            <h3>Mother's Information</h3>
            <hr></hr>
            <div className="form-field">
              <label>Mother's Name <span>*</span></label>
              <input
                name="mother_name"
                type="text"
                placeholder="Enter maiden name"
              />
            </div>
            <div className="form-row">
              <div className="input-field">
                <input
                  name="mother_birthday"
                  type="date"
                />
              </div>
              {/* select for mother nationality */}
              <div className="input-field">
                <select name="mother_nationality">
                  <option disabled value="">Select nationality</option>
                  <option value="filipino">Filipino</option>
                </select>
              </div>
            </div>

            <div className="form-field">
              <label>Profession <span>*</span></label>
              <input
                name="profession"
                type="text"
                placeholder="Enter profession"
              />
            </div>

            <h3>Spouse Information</h3>
            <hr></hr>
            <div className="form-field">
              <label>Spouse Name <span>*</span></label>
              <input
                name="spouse_name"
                type="text"
                placeholder="Enter spouse name"
              />
            </div>
            <div className="form-row">
              <div className="input-field">
                <label>Birthday <span>*</span></label>
                <input
                  name="spouse_birthday"
                  type="date"
                />
              </div>
              <div className="input-field">
                <label>Nationality <span>*</span></label>
                <select name="spouse_nationality">
                    <option disabled value="">Select nationality</option>
                    <option value="filipino">Filipino</option>
                  </select>
              </div>
            </div>

            <div className="form-field">
              <label>Profession <span>*</span></label>
              <input
                name="spouse_profession"
                type="text"
                placeholder="Enter profession"
              />
            </div>
            {/* select for spouse nationality */}
            <button type="submit">Submit</button>
            </form>
        </div>
      </div>
    </div>
  );
}