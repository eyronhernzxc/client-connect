import Header from "../header/header";
import "../form-style.css";
import {useEffect, useState} from 'react';
import {getIdTypes} from "../../../../api/getIdTypes";
import {postValidId} from "../../../../api/postValidId";

export default function ValidId() {

const [IdTypes, setIdTypes] = useState([]);

useEffect(() => {

    const fetchIdTypes = async () => {

        try{

            const types = await getIdTypes();
            setIdTypes(types);
        } catch (error){

            console.error("Failed to Fetch valid Id types");
        }
    };

    fetchIdTypes();
}, []);

const submitValidId = async (event) => {
    event.preventDefault();

const formData = new FormData(event.currentTarget);

formData.append("personal_detail_id", 1);

    try{

      const response = await postValidId(formData);
      alert("Valid Id submitted successfully!");

    }

    catch(error){

    console.error("Failed to Fetch valid Id types");
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
          <h1>Valid Id</h1>
        </Header>

        <div className="form-container">
          <form className="form" onSubmit={submitValidId}>

            <div className="form-field">
              <label>Valid Id Type <span>*</span></label>
              <select name="valid_id_type_id" required>
                <option value="">Select Id Type</option>
                {IdTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-row">
              <div className="input-field">
                <label>Valid Id Image <span>*</span></label>
                <input
                type="file"
                name="image"
                required
                />
              </div>

              <div className="input-field">
                <label>Valid Id Number <span>*</span></label>
                <input
                  type="text"
                  name="number"
                  required
                />
              </div>
            </div>

            <div className="form-field">
              <label>Expiration Date <span>*</span></label>
              <input
                type="date"
                name="expiration_date"
                required
              />
            </div>

            <button type="submit">Submit</button>
            </form>
        </div>
      </div>
    </div>
  );
}