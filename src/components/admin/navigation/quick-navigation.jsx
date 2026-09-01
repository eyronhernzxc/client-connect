import React from "react";
import { useNavigate } from "react-router-dom";
import "./quick-navigation.css";

export default function QuickNavigation() {
  const navigate = useNavigate();
  const navigationItems = [
    {
      title: "Onboarding",
      description: "Manage the onboarding process for new merchants.",
      path: "/onboarding",
    },
    {
      title: "Applications",
      description: "View and manage merchant applications.",
      path: "/applications",
    },
    {
      title: "Services",
      description: "Review and manage service applications.",
      path: "/services",
    },
    {
      title: "Merchants",
      description: "Manage merchant status and details.",
      path: "/merchants",
    },
    // {
    //   title: "Activity Logs",
    //   description: "View logs of merchant activities.",
    //   path: "/activity-logs",
    // },
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <section className="quick-navigation">
      {/* Header */}
      <div className="quick-navigation-header">
        <h2>Quick Navigation</h2>
        <p>Quick access to frequently used sections.</p>
      </div>

      {/* Navigation Cards */}
      <div className="quick-navigation-grid">
        {navigationItems.map((item, index) => (
          <button
            key={index}
            className="quick-navigation-card"
            onClick={() => handleNavigation(item.path)}
          >
            <div className="quick-nav-content">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>

            <span className="quick-nav-arrow">→</span>
          </button>
        ))}
      </div>
    </section>
  );
}
