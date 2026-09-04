import "./onboarding-modal.css";
import React from 'react'
import {useState} from "react";

import Header from "./components/header";
import Navigation from "./components/navigation";

import CompanyDetails from "./components/company-details";
import EMerchantForm from "./components/emerchant-form";
import Categorize from "./components/categorize";
import ReqDocs from "./components/req-documents";

export default function OnboardingDrawer({
  isOpen,
  onClose,
  item,
}) {
  const [activeTab, setActiveTab] = useState("company");
  
  if (!isOpen) return null;

  const getFormattedDate = () => {
    const date = new Date();
    return date.toISOString().split('T')[0].replace(/-/g, '-') + ' ' + date.toTimeString().slice(0, 5);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="onboarding-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="modal-close"
          onClick={onClose}
        >
          ×
        </button>
        
        <Header item={item} />
        
        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <div className="modal-content">
          {activeTab === "company" && <CompanyDetails item={item} />}
          {activeTab === "emerchant" && <EMerchantForm item={item} />}
          {activeTab === "categorize" && <Categorize item={item} />}
          {activeTab === "req-documents" && <ReqDocs item={item} />}
        </div>
      </div>
    </div>
  );
}