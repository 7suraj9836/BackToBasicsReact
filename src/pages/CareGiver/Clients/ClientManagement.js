import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/sidebar";
import Header from "../../../components/Header/header.js";
import "../../../components/Header/header.scss";
import "../Sidebar/sidebar.scss";
import filterIcon from "../../../assets/images/filter.png";
import axios from "axios";
import { Navigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";
import apis from "../../../api/apis";

//Popper imports
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import Fade from "@mui/material/Fade";
import IconButton from "@mui/joy/IconButton";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
// Code Without Redux

const ClientManagement = () => {
  const [showSidebar, SetShowSidebar] = useState(false);
  const updateSidebar = () => {
    SetShowSidebar(!showSidebar);
  };
  const [result, setResult] = useState("");
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [clients, setClients] = useState([]);
  const token = localStorage.getItem("BackToBasic-token");

  //Filter Popper Logic
  const [openFilter, setOpenFilter] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [filterOption, setFilterOption] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenFilter((previousOpen) => !previousOpen);
  };

  const canBeOpen = openFilter && Boolean(anchorEl);
  const FilterBox = canBeOpen ? "transition-popper" : undefined;

  const handleClose = () => {
    setOpen(false);
  };

  const handleClose1 = () => {
    setOpenFilter(false);
  };

  //Call the API to render data on caregiver client homePage

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    apis
      .get(
        `/Client/GetAllClients?pageNumber=1&pageSize=10&sortColumn=client_last_name&sortDirection=asc&searchName=${searchQuery}`,
        config
      )
      .then((res) => {
        console.log(res);
        setClients(res.data.records);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          timer: 1500,
          text: `Something went worng`,
          showConfirmButton: false,
        });
      });
  }, [searchQuery]);

  //Dummy Client Data

  const clientDetails = [
    {
      id: 1,
      client_Name: "Meryem Celik",
      status: "VISIT COMPLETED",
    },
    {
      id: 2,
      client_Name: "Kemal Serbetci",
      status: "VISIT SCHEDULED",
    },

    {
      id: 3,
      client_Name: "Mehmet Talay",
      status: "DISCHARGED",
    },

    {
      id: 4,
      client_Name: "Burhan Caliskan",
      status: "VISIT COMPLETED",
    },
    {
      id: 5,
      client_Name: "Ismi Eser",
      status: "DISCHARGED",
    },
  ];

  // const pageRedirect = useState();

  //Filter Data Based On Status
  const [filterData, setFilterData] = useState(clientDetails);

  const filterRecords = (status) => {
    const updatedRecords = clientDetails.filter((currentRecord) => {
      console.log(currentRecord);
      return currentRecord.status === status;
    });
    setFilterData(updatedRecords);
  };

  useEffect(() => {
    console.log(filterData);
  }, [filterData]);

  return (
    <div className="container-fluid page-wrap">
      <div className="row height-100">
        <Sidebar showSidebar={showSidebar} updateSidebar={updateSidebar} />
        <div className="col main p-0">
          <Header title="Clients" updateSidebar={updateSidebar} />
          <div className="container-fluid page-content-box p-lg-5 p-md-4 p-3">
            <div className="row">
              <div className="col">
                {/* [Card] */}
                <div className="card user-card height-100">
                  <div className="card-body">
                    <div className="row">
                      <div className="col">
                        <div className="card-top-filter-box p-3">
                          {/* [Table Search] */}
                          <div className="search-table">
                            <div className="form-group">
                              <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="search-input"
                                placeholder="Search Here..."
                              />
                              <input type="submit" className="searchIcon" />
                            </div>
                          </div>
                          {/* [/Table Search] */}

                          {/* Right Filter */}
                          <div className="tableRightLink d-flex ">
                            <div>
                              <Button
                                id="demo-customized-button"
                                onClick={handleClick}
                              >
                                <img src={filterIcon} alt="filterIcon" /> Filter
                              </Button>

                              <Popper
                                id={FilterBox}
                                open={openFilter}
                                onClose={handleClose1}
                                placement="bottom-end"
                                anchorEl={anchorEl}
                                transition
                              >
                                {({ TransitionProps }) => (
                                  <Fade {...TransitionProps} timeout={350}>
                                    <Box
                                      sx={{
                                        border: 1,
                                        bgcolor: "background.paper",
                                        width: "365px",
                                        "@media only screen and (max-width: 600px)":
                                          {
                                            width: "300px",
                                          },
                                      }}
                                      style={{
                                        borderColor: "#dadada",
                                        borderWidth: "2px",
                                        borderRadius: "10px",
                                        height: "auto",
                                        padding: "20px",
                                        display: "flex",
                                        flexFlow: "column",
                                        alignItems: "end",
                                      }}
                                    >
                                      <IconButton
                                        aria-label="delete"
                                        size="small"
                                        onClick={handleClose1}
                                        style={{ background: "transparent" }}
                                      >
                                        <CloseRoundedIcon
                                          fontSize="inherit"
                                          style={{ color: "#231F20" }}
                                        />
                                      </IconButton>
                                      <div className="login-section w-100 pt-0">
                                        <div className="form-box p-0 mb-3">
                                          <div className="input-box">
                                            <label
                                              htmlFor="viewReport"
                                              className="form-label"
                                            >
                                              Select Filter
                                            </label>
                                            <select
                                              name="viewReport"
                                              id="viewReport"
                                              className="form-select"
                                              value={filterOption}
                                              onChange={(e) =>
                                                setFilterOption(e.target.value)
                                              }
                                            >
                                              <option value="" disabled>
                                                Select Filter
                                              </option>
                                              <option value="VISIT COMPLETED">
                                                Visit Completed
                                              </option>
                                              <option value="VISIT SCHEDULED">
                                                Visit Scheduled
                                              </option>
                                              <option value="DISCHARGED">
                                                Discharged
                                              </option>
                                            </select>
                                          </div>
                                        </div>

                                        <div className="btn-box d-flex justify-content-end">
                                          <button
                                            type="button"
                                            className="blue-btn-default btn-sm mt-3"
                                            onClick={() => {
                                              handleClose1();
                                              filterRecords(filterOption);
                                            }}
                                          >
                                            Apply
                                          </button>
                                          <button
                                            type="button"
                                            className="blue-btn-default btn-sm btn-outline-gray mt-3"
                                            onClick={handleClose1}
                                          >
                                            Clear
                                          </button>
                                        </div>
                                      </div>
                                    </Box>
                                  </Fade>
                                )}
                              </Popper>
                            </div>
                          </div>
                          {/* Right Filter */}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <div className="table-responsive">
                          <table className="table m-0 butifyTable">
                            <thead>
                              <tr>
                                <th>CLIENT NAME</th>
                                <th>STATUS</th>
                                <th>&nbsp;</th>
                              </tr>
                            </thead>

                            <tbody>
                              {filterData.length > 0 &&
                                filterData.map((client) => {
                                  return (
                                    <tr key={client.id}>
                                      <td>{client.client_Name}</td>
                                      <td>
                                        {/* <span
                                          className="btn btn-sm rounded-4"
                                          // style={{
                                          //   //cursor: "hidden",
                                          //   padding: "10px",
                                          //   color:
                                          //     client.status === "VISIT COMPLETED"
                                          //       ? "#28a745" // Green color for VISIT COMPLETED
                                          //       : client.status === "VISIT SCHEDULED"
                                          //       ? "#ffc107" // Yellow color for VISIT SCHEDULED
                                          //       : client.status === "DISCHARGED"
                                          //       ? "#007bff" // Blue color for DISCHARGED
                                          //       : "transparent" // Default transparent background
                                          // }}
                                        >
                                          {client.status}
                                        </span> */}
                                        <span
                                          className={
                                            client.status === "VISIT COMPLETED"
                                              ? "btn btn-success btn-sm rounded-4"
                                              : client.status ===
                                                "VISIT SCHEDULED"
                                              ? "btn btn-warning btn-sm rounded-4"
                                              : client.status === "DISCHARGED"
                                              ? "btn btn-primary btn-sm rounded-4"
                                              : ""
                                          }
                                          style={{
                                            cursor: "default",
                                            padding: "10px",
                                            width: "180px",
                                          }}
                                        >
                                          {client.status}
                                        </span>
                                      </td>
                                      <td className="text-end">
                                        <Link
                                          className="btn btn-sm btn-outline-secondary btn-outline-gray m-auto w-auto"
                                          to="/client-view-detail"
                                        >
                                          View Detail
                                        </Link>
                                      </td>
                                    </tr>
                                  );
                                })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* [/Card] */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientManagement;
