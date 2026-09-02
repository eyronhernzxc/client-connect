import React from "react";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import "./sidebar.css";
import {
  LayoutDashboard,
  Timer,
  ChartNoAxesColumnIncreasing,
  LogOut,
  Handshake,
  StickyNote,
} from "lucide-react";
import { IoMenu } from "react-icons/io5";
import { PiUsersThreeBold } from "react-icons/pi";
import PisopayLogo from "../../../assets/pisopay_logo.png";
import PisopayName from "../../../assets/pisopay_name.png";

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
    <img src={PisopayLogo} alt="pisopay logo" className="logo"/>
    <img src={PisopayName} alt="pisopay name" className="name"/>
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
         to="/dashboard" title="Dashboard">
          <LayoutDashboard />
          <span>Dashboard</span>
        </NavLink>
      </li>

      <li>
        <NavLink className={({isActive})=>
        `navlink ${isActive ? 'active': ''}`}
         to="/onboarding"title="Onboarding">
          <Timer />
          <span>Onboarding</span>
        </NavLink>
      </li>

      <li>
        <NavLink className={({isActive})=>
        `navlink ${isActive ? 'active': ''}`}
        to="/applications" title="Applications">
        <PiUsersThreeBold />
          <span>Applications</span>
        </NavLink>
      </li>
        <li>
        <NavLink className={({isActive})=>
        `navlink ${isActive ? 'active': ''}`}
         to="/services" title="Services">
          <Handshake />
          <span>Services</span>
        </NavLink>
      </li>

       <li>
        <NavLink className={({isActive})=>
        `navlink ${isActive ? 'active': ''}`}
         to="/merchants" title="Services">
          <StickyNote />
          <span>Merchants</span>
        </NavLink>
      </li>

      <li>
        <NavLink className={({isActive})=>
        `navlink ${isActive ? 'active': ''}`}
         to="/activity-log" title="Activity Logs">
          <ChartNoAxesColumnIncreasing />
          <span>Activities</span>
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
