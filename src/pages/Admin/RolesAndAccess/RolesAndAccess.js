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

const RolesAndAccess = () => {
  const [showSidebar, SetShowSidebar] = useState(false);
  const updateSidebar = () => {
    SetShowSidebar(!showSidebar);
  };
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [rolesAndAccess, setRolesAndAccess] = useState([]);
  const token = localStorage.getItem("BackToBasic-token");

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    apis
      .get(
        `/RolesAndAccess/GetAllRolesAndAccess?pageNumber=1&pageSize=50&sortColumn=client_last_name&sortDirection=asc&searchName=${searchQuery}`,
        config
      )
      .then((res) => {
        console.log(res);
        setRolesAndAccess(res.data.records);
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

  const handleEditRoles = (id) => {
    navigate(`/edit-RoleAccessInformation/${id}`);
  };
  const handleView = (id) => {
    navigate(`/view-RoleAccessInformation/${id}`);
  };

  const handleDelete = async (itemId) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    apis
      .delete(`/RolesAndAccess/DeleteRolesAndAccess?id=${itemId}`, config)
      .then((res) => {
        const updatedRole = rolesAndAccess.filter((role) => role.id !== itemId);
        setRolesAndAccess(updatedRole);
        Swal.fire({
          icon: "Success",
          timer: 1500,
          text: `Role deleted successfully`,
          showConfirmButton: false,
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          timer: 1500,
          text: `Something went wrong`,
          showConfirmButton: false,
        });
      });
  };
  return (
    <div className="container-fluid page-wrap">
      <div className="row height-100">
        <Sidebar showSidebar={showSidebar} updateSidebar={updateSidebar} />
        <div className="col main p-0">
          <Header
            title="Manage Roles And Permission"
            updateSidebar={updateSidebar}
          />
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
                            <Link to="/add-edit-RoleAccessInformation">
                              <i className="addPage">
                                <img className="linkImg" src={plusIcon} />
                              </i>{" "}
                              Add New Role
                            </Link>
                            <Link to="" className="imgWithLink ms-2">
                              <img
                                className="linkImg"
                                src={downloadFile}
                                onClick={""}
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
                                <th>Role Name</th>
                                <th>Update Date</th>
                                <th>Action</th>
                                {/* <th>&nbsp;</th> */}
                              </tr>
                            </thead>

                            <tbody>
                              {rolesAndAccess.length > 0 ? (
                                rolesAndAccess.map((r) => (
                                  <tr>
                                    <td>{r.name}</td>

                                    <td className="text-start">N/A</td>

                                    <td className="">
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
                                              <VisibilityIcon /> View{" "}
                                            </p>{" "}
                                          </li>
                                          <li>
                                            {" "}
                                            <p
                                              onClick={() =>
                                                handleEditRoles(r.id)
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
                                              <DeleteIcon /> Delete
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

export default RolesAndAccess;
