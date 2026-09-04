import React from 'react'

export default function Header({ item }) {
  const getFormattedDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  const companyName = item?.companyName || "Company";

  return (
    <div className="modal-header-bar">
      <div className="header-timestamp">
        {getFormattedDate()}
      </div>
      <div className="header-company-name">
        {companyName}
      </div>
    </div>
  );
}
