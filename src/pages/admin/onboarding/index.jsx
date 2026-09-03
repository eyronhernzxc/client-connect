import React, { useEffect, useState } from "react";
import "../../pages.css";
import "../../../components/admin/header/header.css";

import TableHeader from "../../../components/admin/table/table-header.jsx";
import PageHeader from "../../../components/admin/header/page-header.jsx";
import SearchToolbar from "../../../components/admin/table/searchbar/searchbar.jsx";
import Table from "../../../components/admin/table/table.jsx";
import OnboardingDrawer from "../../../components/admin/modals/onboarding-modal/onboarding-modal.jsx";

import { Dot, IdCard } from "lucide-react";

import {
  getCompanies,
  getCompanyTypes,
  getApplicationServices,
} from "../../../api/getOnboarding.js";

export default function Onboarding() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const [onboardingData, setOnboardingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleRowClick = (item) => {
    setSelectedItem(item);
    setIsDrawerOpen(true);
  };

  useEffect(() => {
    document.title = "Pisopay | Admin Onboarding";
  }, []);

  useEffect(() => {
    const fetchOnboardingData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch companies and company types first
        const [
          companiesResponse,
          companyTypesResponse,
        ] = await Promise.all([
          getCompanies(),
          getCompanyTypes(),
        ]);

        // Normalize API responses
        const companies =
          companiesResponse?.data ||
          companiesResponse ||
          [];

        const companyTypes =
          companyTypesResponse?.data ||
          companyTypesResponse ||
          [];

        // Fetch application services separately
        // so the other API calls do not fail because of it.
        let applicationServicesResponse;

        try {
          applicationServicesResponse =
            await getApplicationServices();
        } catch (applicationError) {
          console.error(
            "Failed to fetch application services:",
            applicationError
          );

          throw new Error(
            "Failed to fetch application services. Please check the backend endpoint."
          );
        }

        const applicationServices =
          applicationServicesResponse?.data ||
          applicationServicesResponse ||
          [];

        // Combine the three API responses
        const combinedData = applicationServices.map(
          (application) => {
            /*
             * APPLICATION -> COMPANY
             *
             * application-services:
             * company_id
             *
             * companies:
             * company_id OR id
             */
            const company = companies.find(
              (company) => {
                const companyId =
                  company.company_id ??
                  company.id;

                return (
                  String(companyId) ===
                  String(application.company_id)
                );
              }
            );

            /*
             * COMPANY -> COMPANY TYPE
             *
             * companies:
             * company_type_id
             *
             * company-types:
             * id OR company_type_id
             */
            const companyType = companyTypes.find(
              (type) => {
                const typeId =
                  type.id ??
                  type.company_type_id;

                return (
                  String(typeId) ===
                  String(company?.company_type_id)
                );
              }
            );

            return {
              /*
               * Reference ID
               *
               * API:
               * application_number
               *
               * Example:
               * APP-2026-00067
               */
              referenceId:
                application.application_number ||
                "—",

              /*
               * Company Name
               *
               * IMPORTANT:
               * Use the company record's name.
               * Do NOT use application.name because
               * that is the application name.
               */
              companyName:
                company?.name ||
                "N/A",

              /*
               * Company Category / Type
               */
              category:
                companyType?.name ||
                "N/A",

              /*
               * Application Status
               */
              status:
                application.status ||
                "N/A",

              /*
               * Application Date
               */
              date:
                application.confirmed_date ||
                application.onboarded_date ||
                application.created_at ||
                "N/A",

              /*
               * IDs for the drawer
               */
              companyId:
                application.company_id,

              applicationServiceId:
                application.application_service_id,

              /*
               * Keep the original application data
               * available to the drawer.
               */
              applicationNumber:
                application.application_number,

              remarks:
                application.remarks || "",

              designation:
                application.designation || "",

              signature:
                application.signature || "",
            };
          }
        );

        console.log(
          "Onboarding Data:",
          combinedData
        );

        setOnboardingData(combinedData);
      } catch (err) {
        console.error(
          "Error loading onboarding data:",
          err
        );

        setError(
          err.message ||
            "Failed to load onboarding data."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOnboardingData();
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

                <option value="1">
                  GOCC
                </option>

                <option value="2">
                  Compliance
                </option>

                <option value="3">
                  Business Dept
                </option>
              </select>

              <select
                id="status"
                className="dropdown"
                defaultValue=""
              >
                <option disabled hidden value="">
                  Role
                </option>

                <option value="1">
                  Merchant
                </option>

                <option value="2">
                  Compliance
                </option>

                <option value="3">
                  Business Dept
                </option>
              </select>

              <div className="result-container">
                <p id="ob-result">
                  {onboardingData.length}
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
                  <th>REFERENCE ID</th>
                  <th>COMPANY NAME</th>
                  <th>CATEGORY</th>
                  <th>STATUS</th>
                  <th>DATE</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6">
                      Loading...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan="6">
                      {error}
                    </td>
                  </tr>
                ) : onboardingData.length === 0 ? (
                  <tr>
                    <td colSpan="6">
                      No onboarding records found.
                    </td>
                  </tr>
                ) : (
                  onboardingData.map((item, index) => (
                    <tr
                      key={
                        item.applicationServiceId ||
                        index
                      }
                    >
                      {/* Reference ID */}
                      <td>
                        {item.referenceId}
                      </td>

                      {/* Company Name */}
                      <td>
                        {item.companyName}
                      </td>

                      {/* Category */}
                      <td>
                        <span className="category-span">
                          {item.category}
                        </span>
                      </td>

                      {/* Status */}
                      <td>
                        <span className="status-span review">
                          <Dot size={24} />
                          {item.status}
                        </span>
                      </td>

                      {/* Date */}
                      <td>
                        {item.date}
                      </td>

                      {/* View / Open */}
                      <td>
                        <button
                          className="onboard-prof"
                          onClick={() =>
                            handleRowClick(item)
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
        item={selectedItem}
      />
    </div>
  );
}