import React from 'react'
import { useState } from 'react'
import {useForm, FormProvider} from "react-hook-form";
import SignatoryDetails from './signatory-details';

export default function EMerchantForm() {
  const [step, setStep] = useState(1);

  const methods = useForm ({

    defaultValues:{

    firstname: "",
    middlename: "",
    lastname: "",
    "esignature": null,

    present_address: "",
    present_zip_code: "",

    permanent_address: "",
    permanent_zip_code: "",

    birthdate: "",
    birth_place: "",

    // nationality: "",
    // citizenship: "",

    contact_number: "",
    email: "",

    civil_status: "",
    gender: "",

    mother_name: "",
    mother_birthday: "",
    profession: "",
    // mother_nationality: "",

    spouse_name: "",
    spouse_birthday: "",
    spouse_profession: "",
    },
  });

  const nextStep = async () => {

    const fieldsToValidate = getFieldsForStep(step);
    const isValid = await methods.trigger(fieldsToValidate);
    if (isValid) setStep((s) => s + 1);
  };

    const prevStep = () => setStep((s) => s - 1);

    const onSubmit = (data) => {

      console.log("Submitted: ", data);
    };
  return (
    <FormProvider {...methods}>
      <form onSubmit= {methods.handleSubmit(onSubmit)}>
        {step === 1 && <SignatoryDetails/>}

        <div>
          {step > 1 && <button type="button" onClick={prevStep}>Back</button>}
          {step < 4 && <button type='button' onClick={nextStep}>Next</button>}
          {step === 4 && <button type="submit">Submit</button>}
        </div>
      </form>
    </FormProvider>
  );
}

function getFieldsForStep(step) {
  if (step === 1) return [
  "firstname",
  "middlename",
  "lastname",
  "esignature",
  "present_address",
  "present_zip_code",
  "permanent_address",
  "permanent_zip_code",
  "birthdate",
  "birth_place",
  "contact_number",
  "email",
  "civil_status",
  "gender",
  "mother_name",
  "mother_birthday",
  "profession",
  "spouse_name",
  "spouse_birthday",
  "spouse_profession",
];
//   if (step === 2) return ["signatoryName" /* ... */];
//   if (step === 3) return ["bankName" /* ... */];
  return [];
}
