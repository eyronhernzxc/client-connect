import React from "react";

export default function Header() {
  return (
    <div className="drawer-header">
      <div className="profile-container">
        <button class="profile-btn" title="profile">
          <h2>JM</h2>
        </button>
        <div className="info-container">
          <h1 className="user-name" id="user-name">
            Marvin Soleybar
          </h1>
          <div className="info">
            <p className="type">Uncategorized</p>
            <p className="stats">Pending</p>
          </div>
        </div>
      </div>
    </div>
  );
}
