import { useState } from 'react';
import React from 'react';


export default function Navigation({ activeTab, setActiveTab }) {
//   const navList = [
//     "Company Details",
//     "E-Merchant Form",
//     "Documents",
//     "Application Process"
// ]
  return (
    <div className='nav-container'>
        <button
          className={`nav ${activeTab === "company" ? "active" : ""}`}
          onClick={() => setActiveTab("company")}
          >
            <p>Company Details</p>
          </button>

          <button
           className={`nav ${activeTab === "emerchant" ? "active" : ""}`}
           onClick={() => setActiveTab("emerchant")}
          >
            <p>E-Merchant Form</p>
          </button>

          <button 
            className={`nav ${activeTab === "documents-stats" ? "active" : ""}`}
            onClick={() => setActiveTab("documents-stats")}
          >
            <p>Documents</p>
          </button>

          <button 
            className={`nav ${activeTab === "app-stats" ? "active" : ""}`}
            onClick={() => setActiveTab("app-stats")}
          >
            <p>Application Status</p>
          </button>
      </div>
  );
}
//           <>
//           <div className='nav disable active'>
//             <p>Company Details</p>
//           </div>
//           <div className='nav disable'>
//             <p>E-Merchant Form</p>
//           </div>
//           <div className='nav disable'>
//             <p>Documents</p>
//           </div>
//           <div className='nav disable'>
//             <p>Application Process</p>
//           </div>
//           </>
//     </div>
//   )
// }
