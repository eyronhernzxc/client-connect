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

import { IoMenu } from "react-icons/io5";
import { PiUsersThreeBold } from "react-icons/pi";

export default function Sidebar() {

  const [isCollapse, setIsCollapse] = useState(true);

  return (
    <div className="sidebar-main">

  {!isCollapse && (

    <div 
   className="sidebar-overlay"
   onClick={() => setIsCollapse(true)}
   >

    </div>
  )}
<div className={`sidebar-container ${isCollapse? "" : "collapsed"}`}>
  <div className="menu-container">
    <img src = {PisoPayLogo} alt="PisoPayLigo"/>
    <button className="menu-btn" title="Menu" onClick={() => setIsCollapse(!isCollapse)}>
      <IoMenu />
    </button>
  </div>

  <nav className="navbar">
    <ul>
      <li>
        <NavLink  className={({ isActive }) =>
        `navlink ${isActive ? 'active' : ''}`
        }

        onClick={() => setIsCollapse(!isCollapse)}
         to="/merchant/home" title="Home">
          <House />
          <span>Home</span>
        </NavLink>
      </li>

      <li>
        <NavLink className={({isActive})=>
        `navlink ${isActive ? 'active': ''}`}
        onClick={() => setIsCollapse(!isCollapse)}
         to="/merchant/profile" title="Profile">
          <IdCard />
          <span>Profile</span>
        </NavLink>
      </li>

      <li>
        <NavLink className={({isActive})=>
        `navlink ${isActive ? 'active': ''}`}
        onClick={() => setIsCollapse(!isCollapse)}
        to="/merchant/forms" title="Forms">
        <FileText />
          <span>Forms</span>
        </NavLink>
      </li>

        <li>
        <NavLink className={({isActive})=>
        `navlink ${isActive ? 'active': ''}`}
        onClick={() => setIsCollapse(!isCollapse)}
         to="/merchant/services" title="Services">
          <Handshake />
          <span>Services</span>
        </NavLink>
      </li>

      <li>
        <NavLink className={({isActive})=>
        `navlink ${isActive ? 'active': ''}`}
        onClick={() => setIsCollapse(!isCollapse)}
         to="/merchant/settings" title="Settings">
          <Settings />
          <span>Settings</span>
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
</div>
);
}
