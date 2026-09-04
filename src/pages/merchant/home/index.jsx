import React from "react";
import PageHeader from "../../../components/merchant/header/page-header";
import "../../pages.css";
import { NavLink } from "react-router-dom";

export default function Home() {
  const application = {
    id: "APP-2026-0078",
    type: "Merchant Registration",
    status: "Approved",
    submitted: "Aug 15, 2026",
    lastUpdated: "Aug 30, 2026",
  };

  const steps = [
    { label: "Submitted", completed: true },
    { label: "Company Details", completed: true },
    { label: "E-Merchant Form", completed: true },
    { label: "Categorized", completed: true },
    { label: "Document Review", incomplete: false },
    { label: "Approval", incomplete: false },
  ];

  const activities = [
    {
      title: "Application submitted online",
      actor: "You",
      date: "Aug 15, 2026",
      time: "9:02 AM",
      type: "blue",
    },
    {
      title: "Application received and logged",
      actor: "System",
      date: "Aug 15, 2026",
      time: "9:05 AM",
      type: "purple",
    },
    {
      title: "Categorized",
      actor: "Admin ( BD )",
      date: "Aug 30, 2026",
      time: "10:15 AM",
      type: "orange",
    },
    {
      title: "Application approved — account activated",
      actor: "Admin ( BD )",
      date: "Aug 30, 2026",
      time: "2:30 PM",
      type: "green",
    },
  ];

  return (
    <div className="merchant-container">
      {/* Page Header */}
      <PageHeader>
        <div className="name-container">
          <h1 className="page-title">Hello,</h1>
          <h1 className="admin-name">Jamaica</h1>
        </div>

        <p className="page-desc">
          Welcome to your merchant dashboard. Here you can track your current
          status and view pending applications.
        </p>
      </PageHeader>

      {/* Dashboard */}
      <div className="merchant-dashboard">
        {/* Application Header */}
        <section className="application-card">
          <div className="application-main">
            <div>
              <div className="application-title-row">
                <h2>{application.type}</h2>

                <span className="status-badge">
                  <span className="status-dot"></span>
                  {application.status}
                </span>
              </div>

              <p className="application-id">{application.id}</p>

              <p className="application-description">
                Your merchant account has been successfully approved and
                activated.
              </p>
            </div>

            <div className="application-icon">✓</div>
          </div>
        </section>

        {/* Application Progress */}
        <section className="dashboard-card">
          <div className="section-header">
            <div>
              <h3>Application Progress</h3>
              <p>Track the progress of your merchant registration.</p>
            </div>

            <span className="progress-label">100% Complete</span>
          </div>

          <div className="progress-container">
            {steps.map((step, index) => (
              <React.Fragment key={step.label}>
                <div className="progress-step">
                  <div
                    className={`progress-circle ${
                      step.completed ? "completed" : ""
                    }`}
                  >
                    {step.completed ? "✓" : index + 1}
                  </div>

                  <span>{step.label}</span>
                </div>

                {index < steps.length - 1 && (
                  <div className="progress-line completed-line"></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </section>

        {/* Information + Quick Actions */}
        <div className="dashboard-grid">
          {/* Application Information */}
          <section className="dashboard-card">
            <div className="section-header">
              <div>
                <h3>Application Information</h3>
                <p>Details about your merchant application.</p>
              </div>
            </div>

            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Application ID</span>

                <strong>{application.id}</strong>
              </div>

              <div className="info-item">
                <span className="info-label">Application Type</span>

                <strong>{application.type}</strong>
              </div>

              <div className="info-item">
                <span className="info-label">Submitted</span>

                <strong>{application.submitted}</strong>
              </div>

              <div className="info-item">
                <span className="info-label">Last Updated</span>

                <strong>{application.lastUpdated}</strong>
              </div>
            </div>
          </section>

          {/* Quick Actions */}
          <section className="dashboard-card">
            <div className="section-header">
              <div>
                <h3>Quick Actions</h3>
                <p>Manage your application.</p>
              </div>
            </div>

            <div className="action-list">
              {/* <button type="button" className="action-button"> */}
                <NavLink
                  className={({ isActive }) =>
                    `action-button ${isActive ? "active" : ""}`
                  }
                  to="/merchant/profile"
                  title="Profile">
                  <span>Company Details</span>
                  <span className="action-arrow">→</span>
                </NavLink>
              {/* </button> */}

                <NavLink
                  className={({ isActive }) =>
                    `action-button ${isActive ? "active" : ""}`
                  }
                  to="/merchant/forms"
                  title="Forms">
                  <span>Forms</span>
                  <span className="action-arrow">→</span>
                </NavLink>

              <button type="button" className="action-button">
                <span>Services</span>
                <span className="action-arrow">→</span>
              </button>

                <NavLink
                  className={({ isActive }) =>
                    `action-button ${isActive ? "active" : ""}`
                  }
                  to="/merchant/settings"
                  title="Settings">
                  <span>Settings</span>
                  <span className="action-arrow">→</span>
                </NavLink>
            </div>
          </section>
        </div>

        {/* Activity Timeline */}
        <section className="dashboard-card timeline-card">
          <div className="section-header">
            <div>
              <h3>Activity Timeline</h3>
              <p>Recent updates and actions on your application.</p>
            </div>
          </div>

          <div className="timeline">
            {activities.map((activity, index) => (
              <div className="timeline-item" key={activity.title}>
                <div className={`timeline-marker ${activity.type}`}>
                  {index === activities.length - 1 && "✓"}
                </div>

                {index < activities.length - 1 && (
                  <div className="timeline-line"></div>
                )}

                <div className="timeline-content">
                  <h4>{activity.title}</h4>

                  <p>
                    {activity.actor}
                    <span>•</span>
                    {activity.date}
                    <span>•</span>
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
