import React, { useEffect, useState } from "react";
import "../../pages.css";
import "../../../components/merchant/header/header.css";
import TableHeader from "../../../components/merchant/table/table-header.jsx";
import PageHeader from "../../../components/merchant/header/page-header.jsx";
import Table from "../../../components/merchant/table/table.jsx";
import SearchToolbar from "../../../components/merchant/table/searchbar/searchbar.jsx";
import {
  Dot,
  Smartphone,
  Mail,
  MapPin,
  Link,
  Send,
  CalendarDays,
  Check,
  Edit3,
} from "lucide-react";
import { getCurrentUser } from "../../../api/auth.js";

export default function Profile() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
   const [user, setUser] = useState(null);



  const handleRowClick = (item) => {
    setSelectedItem(item);
    setIsDrawerOpen(true);
  };

  useEffect(() => {
    document.title = "Pisopay | Merchant Profile";
 const fetchUser = async () => {
         try {
             const data = await getCurrentUser();
             setUser(data);
         } catch (error) {
             console.error(error);
         }
     };
 
     fetchUser();
 }, []);

  return (
    <div className="admin-container">
      <PageHeader>
        <h1 className="page-title">Profile</h1>
        <p className="page-desc">
          View and manage your profile information.
        </p>
      </PageHeader>

      <div className="profile-page-gap"></div>

      {/* =========================
          MERCHANT PROFILE CARD
      ========================== */}
      <div className="merchant-profile-card">

        {/* Top Blue Section */}
        <div className="merchant-profile-top">

          {/* Logo / Profile */}
          <div className="merchant-avatar">
            <div className="avatar-head"></div>
            <div className="avatar-body"></div>
          </div>

          {/* Merchant Information */}
          <div className="merchant-main-info">
            <h2>{user?.data?.company?.name}</h2>

            <p>
              PisoPay Merchant
              <span> • </span>
              ClientConnect
            </p>

            <div className="merchant-actions">
              <button className="profile-btn categorized">
                <Check size={15} />
                Categorized
              </button>
{/* 
              <button className="profile-btn">
                <Edit3 size={14} />
                Edit Company Profile
              </button> */}

              <button className="profile-btn active">
                <span className="active-dot"></span>
                Account Active
              </button>
            </div>
          </div>

          {/* PisoPay Logo */}
          <div className="pisopay-logo">
            <div className="logo-shape logo-one"></div>
            <div className="logo-shape logo-two"></div>
            <div className="logo-shape logo-three"></div>
          </div>
        </div>

        {/* Information Grid */}
        <div className="merchant-info-grid">

          {/* Contact Number */}
          <div className="merchant-info-item">
            <Smartphone size={18} />
            <div>
              <span>Contact No.</span>
              <p>{user?.data?.company?.phone}</p>
            </div>
          </div>

          {/* Email */}
          <div className="merchant-info-item">
            <Mail size={18} />
            <div>
              <span>Contact Email Address</span>
              <p>{user?.data?.company?.email}</p>
            </div>
          </div>

          {/* Address */}
          <div className="merchant-info-item">
            <MapPin size={18} />
            <div>
              <span>Company Address</span>
              <p>{user?.data?.company?.company_detail?.address}</p>
            </div>
          </div>

          {/* Website */}
          <div className="merchant-info-item">
            <Link size={18} />
            <div>
              <span>Website URL</span>
              <p>{user?.data?.company?.website_url}</p>
            </div>
          </div>

          {/* Zip Code */}
          <div className="merchant-info-item">
            <Send size={18} />
            <div>
              <span>Zip Code</span>
              <p>{user?.data?.company?.company_detail?.zip_code}</p>
            </div>
          </div>

          {/* Year Established */}
          <div className="merchant-info-item">
            <CalendarDays size={18} />
            <div>
              <span>Year Established</span>
              <p>{user?.data?.company?.company_detail?.year_established}</p>
            </div>
          </div>

        </div>
      </div>

      <div className="page-gap"></div>

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
              <div className="add-person-container">
                <button className="add-person">
                  <p>+ Add Signatory</p>
                </button>
              </div>
            </>
          }
        />

        <Table
          tablecontent={
            <table className="table-content">
              <thead>
                <tr className="tbl-header">
                  <th>CONTACT PERSON</th>
                  <th>POSITION</th>
                  <th>ID #</th>
                  <th>CONTACT NUMBER</th>
                  <th>EMAIL ADDRESS</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>Ryan Dexter Libres</td>
                  <td>Manager</td>
                  <td>
                    {/* <span className="category-span">
                    </span> */}
                    #12456
                  </td>
                  <td>
                    {/* <span className="status-span review">
                      <Dot size={24} /> 
                    </span> */}
                    +6397529023956
                  </td>
                  <td>ryan.libres@example.com</td>
                  <td>
                    <button
                      className="onboard-prof"
                      onClick={() => handleRowClick()}
                    >
                      <p>⋮</p>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          }
        />
      </div>
    </div>
  );
}
