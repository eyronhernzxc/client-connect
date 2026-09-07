import React, { useEffect, useState } from "react";
import "../../pages.css";
import "../../../components/admin/header/header.css";

import TableHeader from "../../../components/admin/table/table-header.jsx";
import PageHeader from "../../../components/admin/header/page-header.jsx";
import SearchToolbar from "../../../components/admin/table/searchbar/searchbar.jsx";
import Table from "../../../components/admin/table/table.jsx";
import OnboardingDrawer from "../../../components/admin/modals/onboarding-modal/onboarding-modal.jsx";

import { Dot, IdCard } from "lucide-react";
import { BarLoader } from "react-spinners";
import { getCompany } from "../../../api/getCompany.js";


export default function Onboarding() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
 

  const handleRowClick = (item) => {
    setSelectedItem(item);
    setIsDrawerOpen(true);
  };


  useEffect(() => {
    document.title = "Pisopay | Admin Onboarding";

    const fetchCompany = async () => {

      try{

        const data = await getCompany();
        setCompanies(data);
      }catch(error){

        console.error("Failed to fetch company", error);
      }finally{

        setLoading(false);
      }
    }

    fetchCompany();
  }, []);


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

              <select
                id="category"
                className="dropdown"
                defaultValue=""
              >
                <option disabled hidden value="">
                  Category
                </option>
                <option value="1">GOCC</option>
                <option value="2">Government</option>
                <option value="3">Private</option>
              </select>

              <select
                id="status"
                className="dropdown"
                defaultValue=""
              >
                <option disabled hidden value="">
                  Status
                </option>
                <option value="1">Under Review</option>
                <option value="2">Review</option>
                <option value="3">Business Dept</option>
              </select>

              <div className="result-container">
                <p id="ob-result">
                  {companies.length}
                </p>

                <p>results</p>
              </div>
            </>
          }
        />

        <Table
          tablecontent={
            <table className="table-content">
              <thead>
                <tr className="tbl-header">
                  <th>USER ID</th>
                  <th>COMPANY ID</th>
                  <th>COMPANY NAME</th>
                  <th>STATUS</th>
                  <th>CREATED AT</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                 {loading ? (
    <tr>
      <td colSpan="7" style={{ padding: "30px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <BarLoader color="#0090FF" />
        </div>
      </td>
    </tr>
  ) : companies.length === 0 ? (
    <tr>
      <td
        colSpan="6"
        style={{
          textAlign: "center",
          padding: "30px",
        }}
      >
        No Onboarding found.
      </td>
    </tr>
  )  : (
                  companies.map((company) => (
                    <tr key={company.id?.status === "Pending"} 
                    onClick={() => handleRowClick(company)}
                    style={{ cursor: "pointer" }}>
        <td>{company.user_id}</td>
        <td>{company.id}</td>
        <td>{company.name}</td>
        <td>{company.status}</td>
        <td>{company.created_at?.split("T")[0]}</td>
        
                      {/* View / Open */}
                      <td>
                        <button
                          className="onboard-prof"
                          onClick={() =>
                            handleRowClick(companies)
                          }
                        >
                          <IdCard />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          }
        />
      </div>

      {/* ONBOARDING DRAWER */}
      <OnboardingDrawer
        isOpen={isDrawerOpen}
        onClose={() =>
          setIsDrawerOpen(false)
        }
        company={selectedItem}
      />
    </div>
  );
}