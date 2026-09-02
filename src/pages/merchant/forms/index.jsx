import React, { useEffect, useState } from "react";
import "./form.css";
import "../../../components/merchant/header/header.css";
import PageHeader from "../../../components/merchant/header/page-header.jsx";
import Table from "../../../components/merchant/table/table.jsx";
import SearchToolbar from "../../../components/merchant/table/searchbar/searchbar.jsx";

export default function Forms() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    document.title = "Pisopay | Forms";
  }, []);

  const handleRowClick = (item) => {
    setSelectedItem(item);
    setIsDrawerOpen(true);
  };

  return (
    <div className="merchant-container">
      
      {/* PAGE HEADER */}
      <PageHeader>
        <div className="name-container">
          <h1 className="page-title">Forms</h1>
        </div>

        <p className="page-desc">
          Select a form to view its details and submit it.
        </p>
      </PageHeader>

      <div className="page-gap"></div>

      {/* TABLE */}
      <div className="table-container">
        <SearchToolbar
          searchtool={
            <>
              <input
                type="text"
                id="ob-search"
                className="searchbar"
                placeholder="Search personnel"
              />

              <span className="flex"></span>

            </>
          }
        />

        <Table
          tablecontent={
            <table className="table-content">
              <thead>
                <tr className="tbl-header">
                  <th>KYC</th>
                  <th>DATE ACCOMPLISHED</th>
                  <th>DEADLINE</th>
                  <th>REFERENCE</th>
                  <th>STATUS</th>
                  <th>REMARKS</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>FILE</td>
                  <td>01-11-2026</td>
                  <td>02-11-206</td>
                  <td> <span className="view-file">View File</span></td>
                  <td ><span className="status">Verified</span></td>
                  <td>For revisions</td>
                </tr>
              </tbody>
            </table>
          }
        />
      </div>

    </div>
  );
}