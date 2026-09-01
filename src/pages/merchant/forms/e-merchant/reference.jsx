import Header from "../header/header";
import "../form-style.css";
import { postReference } from "../../../../api/postReference";

export default function Reference() {

const submitReference = async (event) => {
    event.preventDefault();

const formData = new FormData(event.currentTarget);

const mother = {

    personal_detail_id: 1,
    reference_type_id: 1,
    name: formData.get("mother_name"),
    birthdate: formData.get("mother_birthdate"),
    birthplace: formData.get("mother_birthplace"),
    nationality: formData.get("mother_nationality"),
    profession: formData.get("mother_profession")
    
}

const spouse = {

    personal_detail_id: 1,
    reference_type_id: 2,
    name: formData.get("spouse_name"),
    birthdate: formData.get("spouse_birthdate"),
    birthplace: formData.get("spouse_birthplace"),
    nationality: formData.get("spouse_nationality"),
    profession: formData.get("spouse_profession")
}

    try{

      const response = await postReference(mother, spouse);
      alert("Reference submitted successfully!");

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
          <h1>Reference</h1>
        </Header>
        <div className="form-container">
          <form className="form" onSubmit={submitReference}>

        <h3>Mother's Information</h3>
        <hr/>

               <div className="form-row">
            <div className="input-field">
                <label>Name <span>*</span></label>
                <input
                  type="text"
                  name="mother_name"
                  required
                />
            </div>

             <div className="input-field">
                <label>Birthdate <span>*</span></label>
                <input
                  type="date"
                  name="mother_birthdate"
                  required
                />
            </div>
        </div>

         <div className="form-row">
            <div className="input-field">
                <label>Birth Place <span>*</span></label>
                <input
                  type="text"
                  name="mother_birthplace"
                  required
                />
            </div>

             <div className="input-field">
                <label>Nationality <span>*</span></label>
                <select name="mother_nationality" required>
                    <option value="">Select nationality</option>
                    <option value="Filipino">Filipino</option>
                    <option value="American">American</option>
                    <option value="Canadian">Canadian</option>
                </select>
            </div>
        </div>

        <div className="form-field">
            <label>Profession <span>*</span></label>
            <input
              type="text"
              name="mother_profession"
              required
            />
        </div>

        <h3>Spouse Information</h3>
        <hr/>

            <div className="form-row">
            <div className="input-field">
                <label>Name <span>*</span></label>
                <input
                  type="text"
                  name="spouse_name"
                  required
                />
            </div>

             <div className="input-field">
                <label>Birthdate <span>*</span></label>
                <input
                  type="date"
                  name="spouse_birthdate"
                  required
                />
            </div>
        </div>

         <div className="form-row">
            <div className="input-field">
                <label>Birth Place <span>*</span></label>
                <input
                  type="text"
                  name="spouse_birthplace"
                  required
                />
            </div>

             <div className="input-field">
                <label>Nationality <span>*</span></label>
                <select name="spouse_nationality" required>
                    <option value="">Select nationality</option>
                    <option value="Filipino">Filipino</option>
                    <option value="American">American</option>
                    <option value="Canadian">Canadian</option>
                </select>
            </div>
        </div>

        <div className="form-field">
            <label>Profession <span>*</span></label>
            <input
              type="text"
              name="spouse_profession"
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