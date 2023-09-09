import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/sidebar";
import Header from "../../../components/Header/header.js";
import "../../../components/Header/header.scss";
import "../Sidebar/sidebar.scss";
import downloadFile from "../../../assets/images/download-file.png";
import plusIcon from "../../../assets/images/plusIcon.png";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Swal from "sweetalert2";
import apis from "../../../api/apis";

const EmployeeAvailability = () => {
  const [showSidebar, SetShowSidebar] = useState(false);
  const updateSidebar = () => {
    SetShowSidebar(!showSidebar);
  };
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [clients, setClients] = useState([]);
  const token = localStorage.getItem("BackToBasic-token");

  const handleDownload = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    apis
      .get("/Client/DownloadClientDataReport", config)
      .then((response) => {
        console.log(response, "res");
        return response.data;
      })
      .then((base64) => {
        const link = document.createElement("a");
        console.log(base64, "base64");
        link.href = base64;
        link.target = "_blank";
        link.setAttribute("download", "client-report.pdf");
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      })
      .catch((error) => {
        console.log("Error occurred during file download:", error);
      });
  };

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    apis
      .get(
        `/EmployeeAvailability/GetAllEmployeeAvailabilities?pageNumber=1&pageSize=10&sortColumn=employee&sortDirection=asc&searchName=${searchQuery}`,
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

  const handleEditClient = (id) => {
    navigate(`/edit-employee-schedule/${id}`);
  };
  const handleView = (id) => {
    navigate(`/view-Client/${id}`);
  };

  const handleDelete = async (itemId) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    apis
      .delete(
        `/EmployeeAvailability/DeleteEmployeeAvailability?id=${itemId}`,
        config
      )
      .then((res) => {
        const updatedClient = clients.filter((client) => client.id !== itemId);
        setClients(updatedClient);
        Swal.fire({
          icon: "success",
          timer: 1500,
          text: `Employee schedule delete successfully`,
          showConfirmButton: false,
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          timer: 1500,
          text: `Something went worng`,
          showConfirmButton: false,
        });
      });
  };
  return (
    <div className="container-fluid page-wrap">
      <div className="row height-100">
        <Sidebar showSidebar={showSidebar} updateSidebar={updateSidebar} />
        <div className="col main p-0">
          <Header title="Client Managment" updateSidebar={updateSidebar} />
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
                            <Link to="/add-new-employee-schedule">
                              <i className="addPage">
                                <img className="linkImg" src={plusIcon} />
                              </i>{" "}
                              Add Employee Schedule
                            </Link>
                            <Link to="" className="imgWithLink ms-2">
                              <img
                                className="linkImg"
                                src={downloadFile}
                                onClick={handleDownload}
                              />{" "}
                              Download Report
                            </Link>
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
                                <th>Client NAME</th>
                                <th>Start Time</th>
                                <th>Start End</th>
                                <th>Date</th>
                                <th>&nbsp;</th>
                              </tr>
                            </thead>

                            <tbody>
                              {clients.length > 0 ? (
                                clients.map((r) => (
                                  <tr>
                                    <td>
                                      {r.employee}
                                    </td>

                                    <td className="text-start">{r.clock_in}</td>
                                    <td>{r.clock_out}</td>
                                    <td>{r.availability_date}</td>
                                    <td className="text-center">
                                      <div className="btn-group dropstart table-action">
                                        <button
                                          type="button"
                                          className="dropdown-toggle"
                                          data-bs-toggle="dropdown"
                                          aria-expanded="false"
                                        >
                                          <span></span>
                                        </button>
                                        <ul className="dropdown-menu">
                                          <li>
                                            {" "}
                                            <p
                                              onClick={() => handleView(r.id)}
                                              className="dropdown-item"
                                            >
                                              {" "}
                                              <VisibilityIcon /> View
                                            </p>{" "}
                                          </li>
                                          <li>
                                            {" "}
                                            <p
                                              onClick={() =>
                                                handleEditClient(r.id)
                                              }
                                              className="dropdown-item"
                                            >
                                              {" "}
                                              <EditIcon /> Edit{" "}
                                            </p>{" "}
                                          </li>
                                          <li>
                                            {" "}
                                            <p
                                              onClick={() => handleDelete(r.id)}
                                              className="dropdown-item"
                                            >
                                              {" "}
                                              <DeleteIcon /> Delete{" "}
                                            </p>{" "}
                                          </li>
                                        </ul>
                                      </div>
                                    </td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td>No data to show</td>
                                </tr>
                              )}
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

export default EmployeeAvailability;
