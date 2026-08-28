import "./dashboard-drawer.css";
import React from "react";
import {useState} from "react";

import Header from "./components/header";
import Navigation from "./components/navigation";

import CompanyDetails from "./components/company-details";
import EMerchantForm from "./components/emerchant-form";
import DocumentStats from "./components/document-stats";
import AppStats from "./components/app-stats";

export default function DashboardDrawer({ isOpen, onClose, item}) {
  const [activeTab, setActiveTab] = useState("company");

  return (  
    <>
    {isOpen && (
        <div
          className="drawer-overlay"
          onClick={onClose}
        />
     )} 

  <div className={`drawer ${isOpen ? "open" : ""}`}>
        <button
          className="drawer-close"
          onClick={onClose}
        >
          ×
        </button>

        {item && (
    <div className="drawer-container">
      <Header />
      <Navigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
         />
      <div className="content">
        {activeTab === "company" && <CompanyDetails /> }
        {activeTab === "emerchant" && <EMerchantForm />}
        {activeTab === "documents-stats" && <DocumentStats />}
        {activeTab === "app-stats" && <AppStats />}
      </div>
    </div>
     )}
    </div>
    </>
  );
}
            

      //   <h2>Merchant Details</h2>


      //     <div className="drawer-content">
      //       <div>
      //         <strong>Reference ID</strong>
      //         <p>{item.ReferenceID}</p>
      //       </div>

      //       <div>
      //         <strong>Company Name</strong>
      //         <p>{item.CompanyName}</p>
      //       </div>

      //       <div>
      //         <strong>Category</strong>
      //         <p>{item.Category}</p>
      //       </div>

      //       <div>
      //         <strong>Documents</strong>
      //         <p>{item.Documents}</p>
      //       </div>

      //       <div>
      //         <strong>Status</strong>
      //         <p>{item.Status}</p>
      //       </div>

      //       <div>
      //         <strong>Date</strong>
      //         <p>{item.Date}</p>
      //       </div>
      //     </div>

      // </div>
        
