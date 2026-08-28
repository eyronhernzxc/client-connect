import React, { useEffect, useState } from "react";
import "../../pages.css";
import Table from "../../../components/admin/table/table.jsx";
import Metrics from "../../../components/admin/metrics/metrics.jsx";
import PageHeader from "../../../components/admin/header/page-header.jsx";
import TableHeader from "../../../components/admin/table/table-header.jsx";
import SearchToolbar from "../../../components/admin/table/searchbar/searchbar.jsx";
import DashboardDrawer from "../../../components/drawer/dashboard-drawer/dashboard-drawer.jsx";

export default function Dashboard() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const data = [
    {
      ReferenceID: "LOG-20240808",
      CompanyName: "Voltex Tech",
      Category: "Merchant",
      Documents: "Complete",
      Status: "Under Review",
      Date: "Aug 08, 2026",
    },
  ];

  const handleRowClick = (item) => {
    setSelectedItem(item);
    setIsDrawerOpen(true);
  };

  useEffect(() => {
    document.title = "Pisopay | Admin Dashboard";
  }, []);

  return (
    <div className="admin-container">
      <PageHeader>
        <div className="name-container">
          <h1 className="page-title">Hello,</h1>
          <h1 className="admin-name">Jamaica</h1>
        </div>

        <p className="page-desc">
          Tracking current status and pending applications.
        </p>
      </PageHeader>

      <div className="page-gap"></div>

      <Metrics />

      <div className="table-container">
        <TableHeader tabletitle={<h1>Review Merchants</h1>} />

        <SearchToolbar
          searchtool={
            <>
              <input
                type="text"
                id="ob-search"
                className="searchbar"
                placeholder="Search name or ID"
              />

              <select id="category" className="dropdown" defaultValue="">
                <option disabled hidden value="">
                  Category
                </option>
                <option value="1">GOCC</option>
                <option value="2">Public</option>
                <option value="3">Government</option>
                <option value="4">SOLE</option>
                <option value="5">Private</option>
              </select>

              <select id="status" className="dropdown" defaultValue="">
                <option disabled value="">
                  Status
                </option>
                <option value="1">Under Review</option>
                <option value="2">Reviewed</option>
                <option value="3">Sent to Compliance</option>
                <option value="4">Rejected</option>
              </select>

              <div className="result-container">
                <p id="ob-result">5</p>
                <p>results</p>
              </div>
            </>
          }
        />

        <table className="table-content">
          <thead>
            <tr className="tbl-header">
              <th>REFERENCE ID</th>
              <th>COMPANY NAME</th>
              <th>CATEGORY</th>
              <th>DOCUMENTS</th>
              <th>STATUS</th>
              <th>DATE</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr
                key={item.ReferenceID}
                onClick={() => handleRowClick(item)}
                style={{ cursor: "pointer" }}
              >
                <td>{item.ReferenceID}</td>

                <td>{item.CompanyName}</td>

                <td>
                  <span className="category-span">
                    {item.Category}
                  </span>
                </td>

                <td>{item.Documents}</td>

                <td>
                  <span className="status-span review">
                    {item.Status}
                  </span>
                </td>

                <td>{item.Date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <DashboardDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        item={selectedItem}
      />
    </div>
  );
}
