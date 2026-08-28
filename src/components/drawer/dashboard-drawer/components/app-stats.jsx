import React from "react";

function AppStats() {
  return (
    <div className="outer-main-box">
      <h1 className="box-header">APPLICATION STATUS</h1>

      <div className="app-main">
        <div className="app-content">
          <div className="app-check"></div>
          <div className="app-step">
            <h1>Application Submitted</h1>
            <p>date and time</p>
          </div>
        </div>

        <div className="app-content">
          <div className="app-check"></div>
          <div className="app-step">
            <h1>Company Details</h1>
            <p>date and time</p>
          </div>
        </div>
      </div>

      <div className="app-main">
        <div className="app-content">
          <div className="app-check"></div>
          <div className="app-step">
            <h1>E-Merchant Form</h1>
            <p>date and time</p>
          </div>
        </div>

        <div className="app-content">
          <div className="app-check"></div>
          <div className="app-step">
            <h1>Categorized & Documents Assigned</h1>
            <p>date and time</p>
          </div>
        </div>
      </div>

      <div className="app-main">
        <div className="app-content">
          <div className="app-check"></div>
          <div className="app-step">
            <h1>Sent to Compliance</h1>
            <p>date and time</p>
          </div>
        </div>

        <div className="app-content">
          <div className="app-check"></div>
          <div className="app-step">
            <h1>Document Review</h1>
            <p>5/8 verified</p>
          </div>
        </div>
      </div>

      <div className="app-content">
        <div className="app-check"></div>
        <div className="app-step">
          <h1>Final Decision</h1>
          <p>pending</p>
        </div>
      </div>
    </div>
  );
}

export default AppStats;
