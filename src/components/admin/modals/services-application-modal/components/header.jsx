import React from 'react'

export default function Header({ item }) {
  return (
    <div className="modal-header-bar">
      <div className="header-title">
        Application Review
      </div>
      <div className="header-subtitle">
        {item?.application_number} · Submitted {item?.created_at?.split("T")[0] || ""}
      </div>
    </div>
  );
}
