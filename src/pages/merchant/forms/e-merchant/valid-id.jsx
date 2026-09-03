import Header from "../header/header";
import "../form-style.css";
import {useEffect, useState} from 'react';
import {getIdTypes} from "../../../../api/getIdTypes";
import {postValidId} from "../../../../api/postValidId";
import { getCurrentUser } from "../../../../api/auth";
import { useNavigate } from "react-router-dom";
import { Upload } from "lucide-react";
import PageHeader from "../../../../components/admin/header/page-header";

export default function ValidId() {
  const navigate = useNavigate();

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

const submitValidId = async (event) =>{
event.preventDefault();

const formData = new FormData(event.currentTarget);

try{

  const user = await getCurrentUser();

  console.log("Authenticated User:", user);

  if(!user?.id){

    throw new Error("User not authenticated");
  }

  const personal_detail_id = user.personal_detail_id || user.personal_detail?.id;

  if(!personal_detail_id){

    throw new Error("Unable to determine personal details");
  }

  const data = new FormData();

  data.append("personal_detail_id", personal_detail_id);
  data.append("valid_id_type_id", formData.get("valid_id_type_id"));
  data.append("image", formData.get("image"));
  data.append("number", formData.get("number"));
  data.append("expiration_date", formData.get("expiration_date"));

  console.log("Image", formData.get("image"));

  const response = await postValidId(data);

  console.log("RESPONSE:", response);

  alert("Signatory details submitted successfully!");
  navigate("form/reference");

}catch(error){

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
             We’re happy to have you here. Let’s get your merchant and company application started!
            </p>
        </PageHeader>
    <div className="main-container">
      <div className="form-card">
        <Header>
          <h1>Valid Id</h1>
        </Header>

        <div className="form-container">
          <form className="form" onSubmit={(e) => submitValidId(e)}>

            <div className="form-row">
              <div className="input-field">
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

               <div className="input-field">
                <label>Valid Id Image <span>*</span></label>
                <input
                type="file"
                id="image"
                name="image"
                required
                
                />
              <label htmlFor="image" className="file-label">
                <Upload />
              </label>
              </div>
            </div>

            <div className="form-row">

              <div className="input-field">
                <label>Valid Id Number <span>*</span></label>
                <input
                  type="text"
                  name="number"
                  placeholder="e.g XXX-XXX-XX"
                  required
                />
              </div>

               <div className="input-field">
              <label>Expiration Date <span>*</span></label>
              <input
                type="date"
                name="expiration_date"
                required

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