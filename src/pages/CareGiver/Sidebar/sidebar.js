import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../../assets/images/logoBig.png";
import DashboardShiftIcon from "@mui/icons-material/AccessAlarms";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import CopyAllOutlinedIcon from "@mui/icons-material/CopyAllOutlined";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const Sidebar = ({ showSidebar }) => {
  const menuItems = [
    {
      to: "/view-your-shift",
      className: "Shifts",
      text: "Shifts",
      icon: <DashboardShiftIcon />,
    },
    {
      to: "/view-assigned-clients",
      className: "Clients",
      text: "Clients",
      icon: <PeopleAltOutlinedIcon />,
    },
    {
      to: "/my-reports",
      className: "Reports",
      text: "Reports",
      icon: <CopyAllOutlinedIcon />,
    },
    {
      to: "/caregiver-calendar",
      className: "My Calendar",
      text: "My Calendar",
      icon: <DateRangeOutlinedIcon />,
    },
    {
      to: "/caregiver-my-profile",
      className: "My Profile",
      text: "My Profile",
      icon: <AccountCircleOutlinedIcon />,
    },

    {
      to: "/",
      className: "Logout",
      text: "Logout",
      icon: <ExitToAppIcon />,
    },
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
