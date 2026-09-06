import React from 'react'

export default function Header({ company }) {


  const companyName = company?.name || "Company";

  return (
    <div className="modal-header-bar">
      <div className="header-timestamp">
        Company Id: {company?.id}
      </div>
      <div className="header-company-name">
        {companyName}
      </div>
    </div>
  );
}
