// export const validationRules = {
//   companyName: {
//     required: "Company name is required",
//   },
//   company_email: {
//     required: "Registered address is required",
//   },
//   zipCode: {
//     required: "ZIP code is required",
//     pattern: {
//       value: /^[0-9]{4}$/,
//       message: "ZIP code must be 4 digits",
//     },
//   },
//   natureOfBusiness: {
//     required: "Please select nature of business",
//   },
//   yearsInBusiness: {
//     required: "Please select years in business",
//   },
//   contactNumber: {
//     required: "Contact number is required",
//     pattern: {
//       value: /^(09|\+639)\d{9}$/,
//       message: "Invalid Philippine mobile number",
//     },
//   },
//   website: {
//     // optional field, walang required
//     pattern: {
//       value: /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/,
//       message: "Invalid website URL",
//     },
//   },
//   emailAddress: {
//     required: "Email address is required",
//     pattern: {
//       value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//       message: "Invalid email format",
//     },
//   },
//   dtiSecRegNo: {
//     required: "DTI/SEC registration number is required",
//   },
//   dateEstablished: {
//     required: "Date established is required",
//   },
//   companyTin: {
//     required: "TIN is required",
//     pattern: {
//       value: /^\d{3}-\d{3}-\d{3}(-\d{3})?$/,
//       message: "Format: 000-000-000",
//     },
//   },
//   taxType: {
//     required: "Please select tax type",
//   },
//   purpose: {
//     required: "Purpose of application is required",
//   },
//   expectedTransactionsPerDay: {
//     required: "This field is required",
//     pattern: {
//       value: /^[0-9]+$/,
//       message: "Numbers only",
//     },
//   },
//   expectedAmountPerDay: {
//     required: "This field is required",
//     pattern: {
//       value: /^[0-9]+(\.[0-9]{1,2})?$/,
//       message: "Invalid amount",
//     },
//   },
// };