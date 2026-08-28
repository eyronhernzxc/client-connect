import React from "react";
import { useFormContext } from "react-hook-form";
import Header from "../header/header";
import "../form-style.css";

export default function SignatoryDetails() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="form-overlay">
      <div className="form-card">
        <Header>
          <h1>Signatory Details</h1>
        </Header>

        <div className="form-container">
          <div className="form">
            <div className="form-row">
              <div className="input-field">
                <label>
                  First name <span>*</span>
                </label>
                <input
                  {...register("firstname")}
                  type="text"
                  placeholder="Enter first name"
                  className={errors.firstname ? "input-error" : "input-normal"}
                />
              </div>

              <div className="input-field">
                <label>
                  Last Name <span>*</span>
                </label>
                <input
                  {...register("lastname")}
                  type="text"
                  placeholder="Enter Last name"
                  className={errors.lastname ? "input-error" : "input-normal"}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="input-field">
                <label>
                  Middle Name <span>*</span>
                </label>
                <input
                  {...register("middlename")}
                  type="text"
                  placeholder="Enter Middle name"
                  className={errors.middlename ? "input-error" : "input-normal"}
                />
              </div>

              <div className="input-field">
                <label>
                  Upload E-signature <span>*</span>
                </label>
                <input
                  {...register("esignature")}
                  type="file"
                  placeholder="Upload E-signature"
                  className={errors.esignature ? "input-error" : "input-normal"}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="input-field-large">
                <label>
                  Present Address <span>*</span>
                </label>
                <input
                  {...register("present_address")}
                  type="text"
                  placeholder="Enter present Address"
                  className={
                    errors.present_address ? "input-error" : "input-normal"
                  }
                />
              </div>

              <div className="input-field-short">
                <label>
                  Zip code <span>*</span>
                </label>
                <input
                  {...register("present_zip_code")}
                  type="number"
                  placeholder="Enter Zip code"
                  className={
                    errors.present_zip_code ? "input-error" : "input-normal"
                  }
                />
              </div>
            </div>

            <div className="form-row">
              <div className="input-field-large">
                <label>
                  Permanent Address <span>*</span>
                </label>
                <input
                  {...register("permanent_address")}
                  type="text"
                  placeholder="Enter permanent Address"
                  className={
                    errors.permanent_address ? "input-error" : "input-normal"
                  }
                />
              </div>
              <div className="input-field-short">
                <label>
                  Zip Code <span>*</span>
                </label>
                <input
                  {...register("permanent_zip_code")}
                  type="number"
                  placeholder="Enter Zip code"
                  className={
                    errors.permanent_zip_code ? "input-error" : "input-normal"
                  }
                />
              </div>
            </div>

            <div className="form-row">
              <div className="input-field">
                <label>Birthdate <span>*</span></label>
                <input
                  {...register("birthdate")}
                  type="date"
                  placeholder="Enter Birthdate"
                  className={errors.birthdate ? "input-error" : "input-normal"}
                />
              </div>
              <div className="input-field">
                <label>Birth place <span>*</span></label>
                <input
                  {...register("birth_place")}
                  type="text"
                  placeholder="Enter Birth place"
                  className={errors.birth_place ? "input-error" : "input-normal"}
                />
              </div>
            </div>
            {/* select for nationality
                select for citizenship
              */}
            <div className="form-row">
              <div className="input-field">
                <label>Civi status <span>*</span></label>
                <select {...register("civil_status")}>
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
              <select {...register("gender")}>
                <option disabled value="">
                  Select Gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option>Prefer not to say</option>
              </select>
            </div>
            </div>

            <div className="form-row">
              <div className="input-field">
                <label>Contact number <span>*</span></label>
                <input
                  {...register("contact_number")}
                  type="tel"
                  placeholder="Enter Contact Number"
                  className={errors.contact_number ? "input-error" : "input-normal"}
                />
              </div>
              <div className="input-field">
                <label>Email <span>*</span></label>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="Enter email"
                  className={errors.email ? "input-error" : "input-normal"}
                />
              </div>
            </div>
            <h3>Mother's Information</h3>
            <hr></hr>
            <div className="form-field">
              <label>Mother's name <span>*</span></label>
              <input
                {...register("mother_name")}
                type="text"
                placeholder="Enter maiden name"
                className={errors.mother_name ? "input-error" : "input-normal"}
              />
            </div>
            <div className="form-row">
              <div className="input-field">
                <input
                  {...register("mother_birthday")}
                  type="date"
                  className={
                    errors.mother_birthday ? "input-error" : "input-normal"
                  }
                />
              </div>
              {/* select for mother nationality */}
              <select>
                <option disabled value="">Select Nationality</option>
                <option>Filipino</option>
              </select>
            </div>

            <div className="form-field">
              <label>Profession <span>*</span></label>
              <input
                {...register("profession")}
                type="text"
                placeholder="Enter profession"
                className={errors.profession ? "input-error" : "input-normal"}
              />
            </div>

            <h3>Spouse Information</h3>
            <hr></hr>
            <input
              {...register("spouse_name")}
              type="text"
              placeholder="Enter spouse name"
              className={errors.spouse_name ? "input-error" : "input-normal"}
            />
            <input
              {...register("spouse_birthday")}
              type="date"
              className={
                errors.spouse_birthday ? "input-error" : "input-normal"
              }
            />
            <input
              {...register("spouse_profession")}
              type="profession"
              placeholder="Enter profession"
              className={
                errors.spouse_profession ? "input-error" : "input-normal"
              }
            />
            {/* select for spouse nationality */}
          </div>
        </div>
      </div>
    </div>
  );
}
