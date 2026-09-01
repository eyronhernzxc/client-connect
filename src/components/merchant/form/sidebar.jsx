import React from "react";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import "./sidebar.css";
import { 
  Timer,
  Settings,
  LogOut,
  Handshake,
} from "lucide-react";

import {
  House,
  IdCard,
  FileText,
} from "lucide-react";

import PisoPayLogo from "../../../assets/pisopay_logo.png";
import PisopayName from "../../../assets/pisopay_name.png"


export default function Sidebar() {

  const [isCollapse, setIsCollapse] = useState(true);

  return (

<div className="sidebar-container">
  <div className="menu-container">
    <img src = {PisoPayLogo} alt="PisoPay Logo" className="logo"/>
    <img src = {PisopayName} alt="Client Connect" className="name"/>
  
  </div>

  <nav className="navbar">
    <ul>
      <li>
        <NavLink   className={({ isActive }) =>
        `navlink ${isActive ? 'active' : ''}`
        }
         to="/form/company" title="Home">
          <House />
          <span>Company Details</span>
        </NavLink>
      </li>

      <li>
        <NavLink className={({ isActive }) =>
        `navlink ${isActive ? 'active' : ''}`
        }
         to="/form/signatory" title="Profile">
          <IdCard />
          <span>E-merchant Form</span>
        </NavLink>
      </li>
    </ul>
  </nav>

  <span className="flex"></span>
  <div className="logout-container">
    <button className="logout-btn" title="Log Out">
      <LogOut />
      <span>Logout</span>
    </button>
  </div>
  
</div>
);
}
