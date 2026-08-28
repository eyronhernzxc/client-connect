import React from "react";
import { useEffect } from "react";
import "../../pages.css";
import "../../../components/admin/header/header.css";
import TableHeader from "../../../components/admin/table/table-header.jsx";
import PageHeader from "../../../components/admin/header/page-header.jsx";
import SearchToolbar from "../../../components/admin/table/searchbar/searchbar.jsx";
import Table from "../../../components/admin/table/table.jsx";
import CompanyDetails from "../../../components/drawer/onboarding-drawer/company-details.jsx"
import { Dot } from "lucide-react";

export default function Onboarding() {
  useEffect(() => {
    document.title = "Pisopay | Admin Onboarding";
  });
  return (
    <div className="admin-container">
      <PageHeader>
        <h1 className="page-title">Onboarding</h1>
        <p className="page-desc">
          Review, validate documents and manage merchant onboarding status.
        </p>
      </PageHeader>

      <div className="page-gap"></div>

      <div className="table-container">
        <TableHeader tabletitle={<h1>Verify</h1>} />

        <SearchToolbar
          searchtool={
            <>
              <input
                type="text"
                id="ob-search"
                className="searchbar"
                placeholder="Search name or Id"
              />

              <select id="category" className="dropdown">
                <option selected disabled hidden value="">
                  Category
                </option>
                <option value="1">GOCC</option>
                <option value="2">Compliance</option>
                <option value="3">Business Dept</option>
              </select>

              <select id="status" className="dropdown">
                <option selected disabled hidden value="">
                  Role
                </option>
                <option value="1">Merchant</option>
                <option value="2">Compliance</option>
                <option value="3">Business Dept</option>
              </select>

              <div className="result-container">
                <p id="ob-result">5</p>
                <p>results</p>
              </div>
            </>
          }
        />

        <Table
          tablecontent={
            <>
              <table className="table-content">
                <thead>
                  <tr className="tbl-header">
                    <th>REFERENCE ID</th>
                    <th>COMPANY NAME</th>
                    <th>CATEGORY</th>
                    <th>STATUS</th>
                    <th>DATE</th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>LOG-20240808</td>
                    <td>Voltex Tech</td>
                    <td>
                      <span className="category-span">Government</span>
                    </td>
                    <td>
                      <span className="status-span review">
                        <Dot size={24} />
                        Under Review
                      </span>
                    </td>
                    <td>Aug 08, 2026</td>
                    <td>⋮</td>
                  </tr>
                </tbody>
              </table>
            </>
          }
        />
      </div>
      <CompanyDetails/>
    </div>

  );
}
