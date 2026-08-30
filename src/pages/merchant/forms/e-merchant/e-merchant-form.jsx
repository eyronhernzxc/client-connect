// import React from 'react'
// import { useState } from 'react'
// import {useForm, FormProvider} from "react-hook-form";
// import SignatoryDetails from './signatory-details';
// import '../form-style.css'
// import FinancialInformation from './finacial-information';

// export default function EMerchantForm() {
//   const [step, setStep] = useState(1);


//   const nextStep = async () => {

//     if (isValid) setStep((s) => s + 1);
//   };

//     const prevStep = () => setStep((s) => s - 1);

//     const onSubmit = (data) => {

//       console.log("Submitted: ", data);
//     };

//   return (
//       <div>
//         {step === 1 && <SignatoryDetails/>}
//         {step === 2 && <FinancialInformation />}

//         <div>
//           {step > 1 && <button type="button" onClick={prevStep}>Back</button>}
//           {step < 4 && <button type='button' onClick={nextStep}>Next</button>}
//           {step === 4 && <button type="submit">Submit</button>}
//         </div>
//       </div>
//   );
// }

