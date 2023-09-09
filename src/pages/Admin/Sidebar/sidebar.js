import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../../assets/images/logoBig.png";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import GroupIcon from "@mui/icons-material/Group";
import EventNoteOutlinedIcon from "@mui/icons-material/EventNoteOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import GppGoodOutlinedIcon from "@mui/icons-material/GppGoodOutlined";
import FilePresentIcon from "@mui/icons-material/FilePresent";
import MuseumIcon from "@mui/icons-material/Museum";

const Sidebar = ({ showSidebar }) => {
  const menuItems = [
    {
      to: "/dashboard",
      className: "dashboard",
      text: "Dashboard",
      icon: <DashboardOutlinedIcon />,
    },
    {
      to: "/client-management",
      className: "order-manage",
      text: "Client Management",
      icon: <PermIdentityOutlinedIcon />,
    },
    {
      to: "/employee-management",
      className: "inventory-manage",
      text: "Employee Management",
      icon: <GroupIcon />,
    },
    {
      to: "/schedule-management",
      className: "product-manage",
      text: "Schedule Management",
      icon: <EventNoteOutlinedIcon />,
    },
    {
      to: "/authorization-management",
      className: "authorization-management",
      text: "Authorization Management",
      icon: <GroupIcon />,
    },
    {
      to: "/individual-treatment-plan",
      className: "routes-manage",
      text: "Individual Treatment Plan",
      icon: <AddBoxOutlinedIcon />,
    },
    {
      to: "/supervisor-management",
      className: "shipment",
      text: "Supervisor management",
      icon: <ManageAccountsOutlinedIcon />,
    },
    {
      to: "/subAdmin-management",
      className: "supplier-manage",
      text: "Sub admin management",
      icon: <EventNoteOutlinedIcon />,
    },
    {
      to: "/roles-and-access",
      className: "retailer-manage",
      text: "Roles & Access",
      icon: <GppGoodOutlinedIcon />,
    },
    {
      to: "/report-management",
      className: "user-manage",
      text: "Report Management",
      icon: <FilePresentIcon />,
    },
    {
      to: "/add-client-schedule",
      className: "user-manage",
      text: "Client Availability",
      icon: <MuseumIcon />,
    },
    {
      to: "/add-employee-schedule",
      className: "user-manage",
      text: "Employee Availability",
      icon: <EventNoteOutlinedIcon />,
    },
    {
      to: "/add-town",
      className: "user-manage",
      text: "Select Town",
      icon: <GroupIcon />,
    }
  ];

  return (
    <div className={showSidebar ? "sidebar-menu show" : "sidebar-menu"}>
      <div className="sidebar-inner bg-white height-100">
        <div className="closeMenu">
          <span></span>
        </div>
        <div className="logo-box">
          <img src={logo} className="logo" alt="" />
        </div>
        <nav>
          <ul>
            {menuItems.map((item, index, icon) => (
              <li key={index}>
                <NavLink
                  to={item.to}
                  className={item.className}
                  exact
                  activeClassName="active"
                >
                  <span className="">{item.icon} </span>
                  {item.text}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
