import React, { useEffect, useState } from "react";

import Header from "../header/header";
import "../form-style.css";

import { postPersonalDetails } from "../../../../api/postSignatoryDetail";
import { getCurrentUser } from "../../../../api/auth";

import { useNavigate } from "react-router-dom";
import { PenLine, Upload } from "lucide-react";

import PageHeader from "../../../../components/merchant/form/page-header";
import { getIdTypes } from "../../../../api/getIdTypes";

export default function SignatoryDetails() {
  const navigate = useNavigate();

  const [IdTypes, setIdTypes] = useState([]);
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState({});
  const [sameAsPresent, setSameAsPresent] = useState(false);

  // =========================================================
  // FETCH CURRENT USER
  // =========================================================

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getCurrentUser();

        console.log("Current User:", response);

        setUser(response?.data);
      } catch (error) {
        console.error("Failed to fetch current user:", error);
      }
    };

    fetchUser();
  }, []);

  // =========================================================
  // FETCH ID TYPES
  // =========================================================

  useEffect(() => {
    const fetchIdTypes = async () => {
      try {
        const types = await getIdTypes();

        setIdTypes(types);
      } catch (error) {
        console.error("Failed to fetch valid ID types:", error);
      }
    };

    fetchIdTypes();
  }, []);

  // =========================================================
  // NAME INPUT VALIDATION
  // =========================================================

  const handleNameInput = (event) => {
    event.target.value = event.target.value.replace(
      /[^\p{L}\s'-]/gu,
      ""
    );
  };

  // =========================================================
  // ADDRESS FIELD MAPPING
  // =========================================================

  const addressFields = [
    "address_number",
    "street",
    "barangay",
    "district",
    "municipality",
    "city",
    "province",
    "zip_code",
  ];

  // =========================================================
  // SAME AS PRESENT ADDRESS
  // =========================================================

  const handleSameAsPresent = (event) => {
    const checked = event.target.checked;

    setSameAsPresent(checked);

    if (checked) {
      const form = event.target.form;

      if (!form) return;

      addressFields.forEach((field) => {
        const presentInput =
          form.elements[`present_${field}`];

        const permanentInput =
          form.elements[`permanent_${field}`];

        if (presentInput && permanentInput) {
          permanentInput.value = presentInput.value;
        }
      });
    }
  };

  // =========================================================
  // LIVE COPY PRESENT → PERMANENT
  // =========================================================

  const handlePresentAddressChange = (event) => {
    if (!sameAsPresent) return;

    const field = event.target.name.replace("present_", "");

    const permanentInput =
      event.target.form?.elements[`permanent_${field}`];

    if (permanentInput) {
      permanentInput.value = event.target.value;
    }
  };

  // =========================================================
  // VALIDATION
  // =========================================================

  const validateForm = (formData) => {
    const newErrors = {};

    // =======================================================
    // NAME PATTERN
    // =======================================================

    const namePattern = /^[\p{L}\s'-]+$/u;

    // =======================================================
    // PERSONAL INFORMATION
    // =======================================================

    const firstName = formData.get("firstname")?.trim();
    const middleName = formData.get("middlename")?.trim();
    const lastName = formData.get("lastname")?.trim();

    if (!firstName) {
      newErrors.firstname = "First name is required.";
    } else if (!namePattern.test(firstName)) {
      newErrors.firstname =
        "First name can only contain letters, spaces, hyphens, and apostrophes.";
    }

    if (!lastName) {
      newErrors.lastname = "Last name is required.";
    } else if (!namePattern.test(lastName)) {
      newErrors.lastname =
        "Last name can only contain letters, spaces, hyphens, and apostrophes.";
    }

    if (!middleName) {
      newErrors.middlename = "Middle name is required.";
    } else if (!namePattern.test(middleName)) {
      newErrors.middlename =
        "Middle name can only contain letters, spaces, hyphens, and apostrophes.";
    }

    // =======================================================
    // EMAIL
    // =======================================================

    const email = formData.get("email")?.trim();

    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email =
        "Please enter a valid email address.";
    }

    // =======================================================
    // BIRTHDATE
    // =======================================================

    if (!formData.get("birthdate")) {
      newErrors.birthdate = "Birthdate is required.";
    }

    // =======================================================
    // BIRTHPLACE
    // =======================================================

    if (!formData.get("birth_place")?.trim()) {
      newErrors.birth_place = "Birth place is required.";
    }

    // =======================================================
    // NATIONALITY
    // =======================================================

    if (!formData.get("nationality")) {
      newErrors.nationality = "Nationality is required.";
    }

    // =======================================================
    // CITIZENSHIP
    // =======================================================

    if (!formData.get("citizenship")) {
      newErrors.citizenship =
        "Citizenship is required.";
    }

    // =======================================================
    // PHONE
    // =======================================================

    const phone =
      formData.get("phone_number")?.trim();

    if (!phone) {
      newErrors.phone_number =
        "Contact number is required.";
    } else if (!/^09\d{9}$/.test(phone)) {
      newErrors.phone_number =
        "Please enter a valid Philippine mobile number.";
    }

    // =======================================================
    // CIVIL STATUS
    // =======================================================

    const civilStatus =
      formData.get("civil_status");

    if (!civilStatus) {
      newErrors.civil_status =
        "Civil status is required.";
    }

    // =======================================================
    // GENDER
    // =======================================================

    if (!formData.get("gender")) {
      newErrors.gender =
        "Gender is required.";
    }

    // =======================================================
    // SIGNATURE
    // =======================================================

    const signature =
      formData.get("signature");

    if (!signature || signature.size === 0) {
      newErrors.signature =
        "E-signature is required.";
    }

    // =======================================================
    // PRESENT ADDRESS
    // =======================================================

    const presentFields = [
      "present_address_number",
      "present_street",
      "present_barangay",
      "present_district",
      "present_municipality",
      "present_city",
      "present_province",
      "present_zip_code",
    ];

    presentFields.forEach((field) => {
      if (!formData.get(field)?.trim()) {
        newErrors[field] =
          "This field is required.";
      }
    });

    // =======================================================
    // PERMANENT ADDRESS
    // =======================================================

    if (!sameAsPresent) {
      const permanentFields = [
        "permanent_address_number",
        "permanent_street",
        "permanent_barangay",
        "permanent_district",
        "permanent_municipality",
        "permanent_city",
        "permanent_province",
        "permanent_zip_code",
      ];

      permanentFields.forEach((field) => {
        if (!formData.get(field)?.trim()) {
          newErrors[field] =
            "This field is required.";
        }
      });
    }

    // =======================================================
    // VALID ID
    // =======================================================

    if (!formData.get("valid_id_type_id")) {
      newErrors.valid_id_type_id =
        "Valid ID type is required.";
    }

    const idImage =
      formData.get("image");

    if (!idImage || idImage.size === 0) {
      newErrors.image =
        "Valid ID image is required.";
    }

    if (!formData.get("number")?.trim()) {
      newErrors.number =
        "Valid ID number is required.";
    }

    if (!formData.get("expiration_date")) {
      newErrors.expiration_date =
        "Expiration date is required.";
    }

    // =======================================================
    // MOTHER INFORMATION
    // =======================================================

    const motherName =
      formData.get("mother_name")?.trim();

    if (!motherName) {
      newErrors.mother_name =
        "Mother's name is required.";
    } else if (!namePattern.test(motherName)) {
      newErrors.mother_name =
        "Mother's name can only contain letters, spaces, hyphens, and apostrophes.";
    }

    if (!formData.get("mother_birthdate")) {
      newErrors.mother_birthdate =
        "Mother's birthdate is required.";
    }

    if (!formData.get("mother_birthplace")?.trim()) {
      newErrors.mother_birthplace =
        "Mother's birthplace is required.";
    }

    if (!formData.get("mother_nationality")) {
      newErrors.mother_nationality =
        "Mother's nationality is required.";
    }

    if (!formData.get("mother_profession")?.trim()) {
      newErrors.mother_profession =
        "Mother's profession is required.";
    }

    // =======================================================
    // SPOUSE INFORMATION
    // =======================================================

    const spouseName =
      formData.get("spouse_name")?.trim();

    if (civilStatus === "married") {
      if (!spouseName) {
        newErrors.spouse_name =
          "Spouse's name is required.";
      } else if (!namePattern.test(spouseName)) {
        newErrors.spouse_name =
          "Spouse's name can only contain letters, spaces, hyphens, and apostrophes.";
      }

      if (!formData.get("spouse_birthdate")) {
        newErrors.spouse_birthdate =
          "Spouse's birthdate is required.";
      }

      if (!formData.get("spouse_birthplace")?.trim()) {
        newErrors.spouse_birthplace =
          "Spouse's birthplace is required.";
      }

      if (!formData.get("spouse_nationality")) {
        newErrors.spouse_nationality =
          "Spouse's nationality is required.";
      }

      if (!formData.get("spouse_profession")?.trim()) {
        newErrors.spouse_profession =
          "Spouse's profession is required.";
      }
    }

    return newErrors;
  };

  // =========================================================
  // SUBMIT
  // =========================================================

  const submitSignatory = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;

    const formData = new FormData(form);

    // =======================================================
    // ADD PERMANENT ADDRESS IF SAME AS PRESENT
    // =======================================================

    if (sameAsPresent) {
      addressFields.forEach((field) => {
        const presentValue =
          form.elements[
            `present_${field}`
          ]?.value || "";

        formData.set(
          `permanent_${field}`,
          presentValue
        );
      });
    }

    // =======================================================
    // VALIDATE
    // =======================================================

    const validationErrors =
      validateForm(formData);

    setErrors(validationErrors);

    if (
      Object.keys(validationErrors).length > 0
    ) {
      console.log(
        "Validation errors:",
        validationErrors
      );

      return;
    }

    // =======================================================
    // API REQUEST
    // =======================================================

    try {
      const currentUser =
        await getCurrentUser();

      console.log(
        "Authenticated User:",
        currentUser
      );

      if (!currentUser?.data?.id) {
        throw new Error(
          "User not authenticated"
        );
      }

      const companyId =
        currentUser?.company?.id ||
        currentUser?.data?.company?.id;

      console.log(
        "Authenticated user ID:",
        currentUser?.data?.id
      );

      console.log(
        "Authenticated company ID:",
        companyId
      );

      if (!companyId) {
        throw new Error(
          "Unable to determine the user's company."
        );
      }

      // =====================================================
      // CREATE API FORM DATA
      // =====================================================

      const data = new FormData();

      data.append(
        "company_id",
        companyId
      );

      data.append(
        "personal_detail_type_id",
        1
      );

      // =====================================================
      // PERSONAL INFORMATION
      // =====================================================

      data.append(
        "first_name",
        formData.get("firstname")
      );

      data.append(
        "middle_name",
        formData.get("middlename") || ""
      );

      data.append(
        "last_name",
        formData.get("lastname")
      );

      data.append(
        "birthdate",
        formData.get("birthdate")
      );

      data.append(
        "birthplace",
        formData.get("birth_place")
      );

      data.append(
        "nationality",
        formData.get("nationality")
      );

      data.append(
        "citizenship",
        formData.get("citizenship")
      );

      data.append(
        "phone_number",
        formData.get("phone_number")
      );

      data.append(
        "email",
        formData.get("email")
      );

      data.append(
        "civil_status",
        formData.get("civil_status")
      );

      data.append(
        "gender",
        formData.get("gender")
      );

      // =====================================================
      // SIGNATURE
      // =====================================================

      data.append(
        "signature",
        formData.get("signature")
      );

      // =====================================================
      // PRESENT ADDRESS
      // =====================================================

      data.append(
        "present_address_number",
        formData.get(
          "present_address_number"
        )
      );

      data.append(
        "present_street",
        formData.get("present_street")
      );

      data.append(
        "present_barangay",
        formData.get("present_barangay")
      );

      data.append(
        "present_district",
        formData.get("present_district")
      );

      data.append(
        "present_municipality",
        formData.get(
          "present_municipality"
        )
      );

      data.append(
        "present_city",
        formData.get("present_city")
      );

      data.append(
        "present_province",
        formData.get("present_province")
      );

      data.append(
        "present_zip_code",
        formData.get(
          "present_zip_code"
        )
      );

      // =====================================================
      // PERMANENT ADDRESS
      // =====================================================

      data.append(
        "permanent_address_number",
        formData.get(
          "permanent_address_number"
        )
      );

      data.append(
        "permanent_street",
        formData.get(
          "permanent_street"
        )
      );

      data.append(
        "permanent_barangay",
        formData.get(
          "permanent_barangay"
        )
      );

      data.append(
        "permanent_district",
        formData.get(
          "permanent_district"
        )
      );

      data.append(
        "permanent_municipality",
        formData.get(
          "permanent_municipality"
        )
      );

      data.append(
        "permanent_city",
        formData.get(
          "permanent_city"
        )
      );

      data.append(
        "permanent_province",
        formData.get(
          "permanent_province"
        )
      );

      data.append(
        "permanent_zip_code",
        formData.get(
          "permanent_zip_code"
        )
      );

      // =====================================================
      // VALID ID
      // =====================================================

      data.append(
        "valid_id_type_id",
        formData.get(
          "valid_id_type_id"
        )
      );

      data.append(
        "image",
        formData.get("image")
      );

      data.append(
        "number",
        formData.get("number")
      );

      data.append(
        "expiration_date",
        formData.get(
          "expiration_date"
        )
      );

      // =====================================================
      // MOTHER
      // =====================================================

      data.append(
        "mother_name",
        formData.get("mother_name")
      );

      data.append(
        "mother_birthdate",
        formData.get(
          "mother_birthdate"
        )
      );

      data.append(
        "mother_birthplace",
        formData.get(
          "mother_birthplace"
        )
      );

      data.append(
        "mother_nationality",
        formData.get(
          "mother_nationality"
        )
      );

      data.append(
        "mother_profession",
        formData.get(
          "mother_profession"
        )
      );

      // =====================================================
      // SPOUSE
      // =====================================================

      data.append(
        "spouse_name",
        formData.get(
          "spouse_name"
        ) || ""
      );

      data.append(
        "spouse_birthdate",
        formData.get(
          "spouse_birthdate"
        ) || ""
      );

      data.append(
        "spouse_birthplace",
        formData.get(
          "spouse_birthplace"
        ) || ""
      );

      data.append(
        "spouse_nationality",
        formData.get(
          "spouse_nationality"
        ) || ""
      );

      data.append(
        "spouse_profession",
        formData.get(
          "spouse_profession"
        ) || ""
      );

      console.log(
        "SIGNATORY DATA:",
        Object.fromEntries(
          data.entries()
        )
      );

      // =====================================================
      // POST
      // =====================================================

      await postPersonalDetails(data);

      alert(
        "Signatory details submitted successfully!"
      );

      navigate("/form/address");
    } catch (error) {
      console.log(
        "STATUS:",
        error.response?.status
      );

      console.log(
        "RESPONSE:",
        error.response?.data
      );

      console.log(
        "ERRORS:",
        error.response?.data?.errors
      );

      console.error(error);
    }
  };

  // =========================================================
  // ERROR COMPONENT
  // =========================================================

  const ErrorMessage = ({ field }) => {
    if (!errors[field]) return null;

    return (
      <small className="error-message">
        {errors[field]}
      </small>
    );
  };

  // =========================================================
  // INPUT CLASS
  // =========================================================

  const getInputClass = (field) => {
    return errors[field]
      ? "input-error"
      : "";
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <>
      <PageHeader>
        <div className="name-container">
          <h1 className="page-title">
            Hello,
          </h1>

          <h1 className="admin-name">
            {user?.userdetail?.first_name ||
              "Jamaica"}
          </h1>
        </div>

        <p className="page-desc">
          We’re happy to have you here. Let’s get
          your merchant and company application
          started!
        </p>
      </PageHeader>

      <div className="main-container">
        <div className="form-card">

          <Header>
            <h1>Signatory Details</h1>
          </Header>

          <div className="form-container">

            <form
              className="form"
              onSubmit={submitSignatory}
            >

              {/* =================================================
                  PERSONAL INFORMATION
              ================================================= */}

              <div className="form-row">

                <div className="input-field">
                  <label>
                    First name{" "}
                    <span>*</span>
                  </label>

                  <input
                    name="firstname"
                    type="text"
                    placeholder="Enter first name"
                    defaultValue={
                      user?.userdetail?.first_name ||
                      ""
                    }
                    onInput={handleNameInput}
                    className={getInputClass(
                      "firstname"
                    )}
                  />

                  <ErrorMessage
                    field="firstname"
                  />
                </div>

                <div className="input-field">
                  <label>
                    Last Name{" "}
                    <span>*</span>
                  </label>

                  <input
                    name="lastname"
                    type="text"
                    placeholder="Enter last name"
                    defaultValue={
                      user?.userdetail?.last_name ||
                      ""
                    }
                    onInput={handleNameInput}
                    className={getInputClass(
                      "lastname"
                    )}
                  />

                  <ErrorMessage
                    field="lastname"
                  />
                </div>

              </div>

              <div className="form-row">

                <div className="input-field">
                  <label>
                    Middle Name{" "}
                    <span>*</span>
                  </label>

                  <input
                    name="middlename"
                    type="text"
                    placeholder="Enter middle name"
                    defaultValue={
                      user?.userdetail?.middle_name ||
                      ""
                    }
                    onInput={handleNameInput}
                    className={getInputClass(
                      "middlename"
                    )}
                  />

                  <ErrorMessage
                    field="middlename"
                  />
                </div>

                <div className="input-field">
                  <label>
                    Email{" "}
                    <span>*</span>
                  </label>

                  <input
                    name="email"
                    type="email"
                    placeholder="Enter email"
                    defaultValue={
                      user?.email || ""
                    }
                    className={getInputClass(
                      "email"
                    )}
                  />

                  <ErrorMessage
                    field="email"
                  />
                </div>

              </div>

              <div className="form-row">

                <div className="input-field">
                  <label>
                    Birthdate{" "}
                    <span>*</span>
                  </label>

                  <input
                    name="birthdate"
                    type="date"
                    defaultValue={
                      user?.userdetail?.birth_date ||
                      ""
                    }
                    className={getInputClass(
                      "birthdate"
                    )}
                  />

                  <ErrorMessage
                    field="birthdate"
                  />
                </div>

                <div className="input-field">
                  <label>
                    Birth Place{" "}
                    <span>*</span>
                  </label>

                  <input
                    name="birth_place"
                    type="text"
                    placeholder="Enter birth place"
                    className={getInputClass(
                      "birth_place"
                    )}
                  />

                  <ErrorMessage
                    field="birth_place"
                  />
                </div>

              </div>

              <div className="form-row">

                <div className="input-field">
                  <label>
                    Nationality{" "}
                    <span>*</span>
                  </label>

                  <select
                    name="nationality"
                    className={getInputClass(
                      "nationality"
                    )}
                  >
                    <option value="">
                      Select Nationality
                    </option>

                    <option value="filipino">
                      Filipino
                    </option>
                  </select>

                  <ErrorMessage
                    field="nationality"
                  />
                </div>

                <div className="input-field">
                  <label>
                    Citizenship{" "}
                    <span>*</span>
                  </label>

                  <select
                    name="citizenship"
                    className={getInputClass(
                      "citizenship"
                    )}
                  >
                    <option value="">
                      Select Citizenship
                    </option>

                    <option value="filipino">
                      Filipino
                    </option>
                  </select>

                  <ErrorMessage
                    field="citizenship"
                  />
                </div>

              </div>

              <div className="form-row">

                <div className="input-field">
                  <label>
                    Contact Number{" "}
                    <span>*</span>
                  </label>

                  <input
                    name="phone_number"
                    type="tel"
                    placeholder="09XXXXXXXXX"
                    defaultValue={
                      user?.userdetail?.mobile_number ||
                      ""
                    }
                    maxLength="11"
                    onInput={(event) => {
                      event.target.value =
                        event.target.value.replace(
                          /\D/g,
                          ""
                        );
                    }}
                    className={getInputClass(
                      "phone_number"
                    )}
                  />

                  <ErrorMessage
                    field="phone_number"
                  />
                </div>

                <div className="input-field">
                  <label>
                    Civil Status{" "}
                    <span>*</span>
                  </label>

                  <select
                    name="civil_status"
                    className={getInputClass(
                      "civil_status"
                    )}
                  >
                    <option value="">
                      Select status
                    </option>

                    <option value="single">
                      Single
                    </option>

                    <option value="married">
                      Married
                    </option>

                    <option value="widowed">
                      Widowed
                    </option>
                  </select>

                  <ErrorMessage
                    field="civil_status"
                  />
                </div>

              </div>

              <div className="form-row">

                <div className="input-field">
                  <label>
                    Gender{" "}
                    <span>*</span>
                  </label>

                  <select
                    name="gender"
                    className={getInputClass(
                      "gender"
                    )}
                  >
                    <option value="">
                      Select gender
                    </option>

                    <option value="male">
                      Male
                    </option>

                    <option value="female">
                      Female
                    </option>

                    <option value="prefer_not_to_say">
                      Prefer not to say
                    </option>
                  </select>

                  <ErrorMessage
                    field="gender"
                  />
                </div>

                <div className="input-field">
                  <label>
                    Upload E-signature{" "}
                    <span>*</span>
                  </label>

                  <input
                    name="signature"
                    type="file"
                    id="signature"
                  />

                  <label
                    htmlFor="signature"
                    className="file-label"
                  >
                    <PenLine />
                  </label>

                  <ErrorMessage
                    field="signature"
                  />
                </div>

              </div>

              {/* =================================================
                  PRESENT ADDRESS
              ================================================= */}

              <h3>Present Address</h3>
              <hr />

              <div className="form-row">

                <div className="input-field">
                  <label>
                    Address Number{" "}
                    <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="present_address_number"
                    onChange={
                      handlePresentAddressChange
                    }
                    className={getInputClass(
                      "present_address_number"
                    )}
                  />

                  <ErrorMessage
                    field="present_address_number"
                  />
                </div>

                <div className="input-field">
                  <label>
                    Street{" "}
                    <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="present_street"
                    onChange={
                      handlePresentAddressChange
                    }
                    className={getInputClass(
                      "present_street"
                    )}
                  />

                  <ErrorMessage
                    field="present_street"
                  />
                </div>

              </div>

              <div className="form-row">

                <div className="input-field">
                  <label>
                    Barangay{" "}
                    <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="present_barangay"
                    onChange={
                      handlePresentAddressChange
                    }
                    className={getInputClass(
                      "present_barangay"
                    )}
                  />

                  <ErrorMessage
                    field="present_barangay"
                  />
                </div>

                <div className="input-field">
                  <label>
                    District{" "}
                    <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="present_district"
                    onChange={
                      handlePresentAddressChange
                    }
                    className={getInputClass(
                      "present_district"
                    )}
                  />

                  <ErrorMessage
                    field="present_district"
                  />
                </div>

              </div>

              <div className="form-row">

                <div className="input-field">
                  <label>
                    Municipality{" "}
                    <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="present_municipality"
                    onChange={
                      handlePresentAddressChange
                    }
                    className={getInputClass(
                      "present_municipality"
                    )}
                  />

                  <ErrorMessage
                    field="present_municipality"
                  />
                </div>

                <div className="input-field">
                  <label>
                    City{" "}
                    <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="present_city"
                    onChange={
                      handlePresentAddressChange
                    }
                    className={getInputClass(
                      "present_city"
                    )}
                  />

                  <ErrorMessage
                    field="present_city"
                  />
                </div>

              </div>

              <div className="form-row">

                <div className="input-field">
                  <label>
                    Province{" "}
                    <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="present_province"
                    onChange={
                      handlePresentAddressChange
                    }
                    className={getInputClass(
                      "present_province"
                    )}
                  />

                  <ErrorMessage
                    field="present_province"
                  />
                </div>

                <div className="input-field">
                  <label>
                    Zip Code{" "}
                    <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="present_zip_code"
                    maxLength="4"
                    onInput={(event) => {
                      event.target.value =
                        event.target.value.replace(
                          /\D/g,
                          ""
                        );
                    }}
                    onChange={
                      handlePresentAddressChange
                    }
                    className={getInputClass(
                      "present_zip_code"
                    )}
                  />

                  <ErrorMessage
                    field="present_zip_code"
                  />
                </div>

              </div>

              {/* =================================================
                  PERMANENT ADDRESS
              ================================================= */}

              <div className="permanent-address-header">

                <h3>
                  Permanent Address
                </h3>

                <label className="same-address-checkbox">

                  <input
                    type="checkbox"
                    checked={sameAsPresent}
                    onChange={
                      handleSameAsPresent
                    }
                  />

                  <span>
                    Same as Present Address
                  </span>

                </label>

              </div>

              <hr />

              <div className="form-row">

                <div className="input-field">
                  <label>
                    Address Number{" "}
                    <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="permanent_address_number"
                    disabled={sameAsPresent}
                    className={getInputClass(
                      "permanent_address_number"
                    )}
                  />

                  <ErrorMessage
                    field="permanent_address_number"
                  />
                </div>

                <div className="input-field">
                  <label>
                    Street{" "}
                    <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="permanent_street"
                    disabled={sameAsPresent}
                    className={getInputClass(
                      "permanent_street"
                    )}
                  />

                  <ErrorMessage
                    field="permanent_street"
                  />
                </div>

              </div>

              <div className="form-row">

                <div className="input-field">
                  <label>
                    Barangay{" "}
                    <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="permanent_barangay"
                    disabled={sameAsPresent}
                    className={getInputClass(
                      "permanent_barangay"
                    )}
                  />

                  <ErrorMessage
                    field="permanent_barangay"
                  />
                </div>

                <div className="input-field">
                  <label>
                    District{" "}
                    <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="permanent_district"
                    disabled={sameAsPresent}
                    className={getInputClass(
                      "permanent_district"
                    )}
                  />

                  <ErrorMessage
                    field="permanent_district"
                  />
                </div>

              </div>

              <div className="form-row">

                <div className="input-field">
                  <label>
                    Municipality{" "}
                    <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="permanent_municipality"
                    disabled={sameAsPresent}
                    className={getInputClass(
                      "permanent_municipality"
                    )}
                  />

                  <ErrorMessage
                    field="permanent_municipality"
                  />
                </div>

                <div className="input-field">
                  <label>
                    City{" "}
                    <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="permanent_city"
                    disabled={sameAsPresent}
                    className={getInputClass(
                      "permanent_city"
                    )}
                  />

                  <ErrorMessage
                    field="permanent_city"
                  />
                </div>

              </div>

              <div className="form-row">

                <div className="input-field">
                  <label>
                    Province{" "}
                    <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="permanent_province"
                    disabled={sameAsPresent}
                    className={getInputClass(
                      "permanent_province"
                    )}
                  />

                  <ErrorMessage
                    field="permanent_province"
                  />
                </div>

                <div className="input-field">
                  <label>
                    Zip Code{" "}
                    <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="permanent_zip_code"
                    maxLength="4"
                    disabled={sameAsPresent}
                    onInput={(event) => {
                      event.target.value =
                        event.target.value.replace(
                          /\D/g,
                          ""
                        );
                    }}
                    className={getInputClass(
                      "permanent_zip_code"
                    )}
                  />

                  <ErrorMessage
                    field="permanent_zip_code"
                  />
                </div>

              </div>

              {/* =================================================
                  VALID ID
              ================================================= */}

              <div className="form-row">

                <div className="input-field">
                  <label>
                    Valid Id Type{" "}
                    <span>*</span>
                  </label>

                  <select
                    name="valid_id_type_id"
                    className={getInputClass(
                      "valid_id_type_id"
                    )}
                  >
                    <option value="">
                      Select Id Type
                    </option>

                    {IdTypes.map((type) => (
                      <option
                        key={type.id}
                        value={type.id}
                      >
                        {type.name}
                      </option>
                    ))}
                  </select>

                  <ErrorMessage
                    field="valid_id_type_id"
                  />
                </div>

                <div className="input-field">
                  <label>
                    Valid Id Image{" "}
                    <span>*</span>
                  </label>

                  <input
                    type="file"
                    id="image"
                    name="image"
                  />

                  <label
                    htmlFor="image"
                    className="file-label"
                  >
                    <Upload />
                  </label>

                  <ErrorMessage
                    field="image"
                  />
                </div>

              </div>

              <div className="form-row">

                <div className="input-field">
                  <label>
                    Valid Id Number{" "}
                    <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="number"
                    placeholder="e.g XXX-XXX-XX"
                    className={getInputClass(
                      "number"
                    )}
                  />

                  <ErrorMessage
                    field="number"
                  />
                </div>

                <div className="input-field">
                  <label>
                    Expiration Date{" "}
                    <span>*</span>
                  </label>

                  <input
                    type="date"
                    name="expiration_date"
                    className={getInputClass(
                      "expiration_date"
                    )}
                  />

                  <ErrorMessage
                    field="expiration_date"
                  />
                </div>

              </div>

              {/* =================================================
                  MOTHER
              ================================================= */}

              <h3>
                Mother's Information
              </h3>

              <hr />

              <div className="form-row">

                <div className="input-field">
                  <label>
                    Name{" "}
                    <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="mother_name"
                    onInput={handleNameInput}
                    className={getInputClass(
                      "mother_name"
                    )}
                  />

                  <ErrorMessage
                    field="mother_name"
                  />
                </div>

                <div className="input-field">
                  <label>
                    Birthdate{" "}
                    <span>*</span>
                  </label>

                  <input
                    type="date"
                    name="mother_birthdate"
                    className={getInputClass(
                      "mother_birthdate"
                    )}
                  />

                  <ErrorMessage
                    field="mother_birthdate"
                  />
                </div>

              </div>

              <div className="form-row">

                <div className="input-field">
                  <label>
                    Birth Place{" "}
                    <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="mother_birthplace"
                    className={getInputClass(
                      "mother_birthplace"
                    )}
                  />

                  <ErrorMessage
                    field="mother_birthplace"
                  />
                </div>

                <div className="input-field">
                  <label>
                    Nationality{" "}
                    <span>*</span>
                  </label>

                  <select
                    name="mother_nationality"
                    className={getInputClass(
                      "mother_nationality"
                    )}
                  >
                    <option value="">
                      Select nationality
                    </option>

                    <option value="Filipino">
                      Filipino
                    </option>

                    <option value="American">
                      American
                    </option>

                    <option value="Canadian">
                      Canadian
                    </option>
                  </select>

                  <ErrorMessage
                    field="mother_nationality"
                  />
                </div>

              </div>

              <div className="form-field">

                <label>
                  Profession{" "}
                  <span>*</span>
                </label>

                <input
                  type="text"
                  name="mother_profession"
                  className={getInputClass(
                    "mother_profession"
                  )}
                />

                <ErrorMessage
                  field="mother_profession"
                />

              </div>

              {/* =================================================
                  SPOUSE
              ================================================= */}

              <h3>
                Spouse Information
              </h3>

              <hr />

              <div className="form-row">

                <div className="input-field">
                  <label>
                    Name
                  </label>

                  <input
                    type="text"
                    name="spouse_name"
                    onInput={handleNameInput}
                    className={getInputClass(
                      "spouse_name"
                    )}
                  />

                  <ErrorMessage
                    field="spouse_name"
                  />
                </div>

                <div className="input-field">
                  <label>
                    Birthdate
                  </label>

                  <input
                    type="date"
                    name="spouse_birthdate"
                    className={getInputClass(
                      "spouse_birthdate"
                    )}
                  />

                  <ErrorMessage
                    field="spouse_birthdate"
                  />
                </div>

              </div>

              <div className="form-row">

                <div className="input-field">
                  <label>
                    Birth Place
                  </label>

                  <input
                    type="text"
                    name="spouse_birthplace"
                    className={getInputClass(
                      "spouse_birthplace"
                    )}
                  />

                  <ErrorMessage
                    field="spouse_birthplace"
                  />
                </div>

                <div className="input-field">
                  <label>
                    Nationality
                  </label>

                  <select
                    name="spouse_nationality"
                    className={getInputClass(
                      "spouse_nationality"
                    )}
                  >
                    <option value="">
                      Select nationality
                    </option>

                    <option value="Filipino">
                      Filipino
                    </option>

                    <option value="American">
                      American
                    </option>

                    <option value="Canadian">
                      Canadian
                    </option>
                  </select>

                  <ErrorMessage
                    field="spouse_nationality"
                  />
                </div>

              </div>

              <div className="form-field">

                <label>
                  Profession
                </label>

                <input
                  type="text"
                  name="spouse_profession"
                  className={getInputClass(
                    "spouse_profession"
                  )}
                />

                <ErrorMessage
                  field="spouse_profession"
                />

              </div>

              {/* =================================================
                  SUBMIT
              ================================================= */}

              <button type="submit">
                Submit
              </button>

            </form>

          </div>
        </div>
      </div>
    </>
  );
}