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

const SupervisorManagement = () => {
  const [showSidebar, SetShowSidebar] = useState(false);
  const updateSidebar = () => {
    SetShowSidebar(!showSidebar);
  };
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [supervisor, setSupervisor] = useState([]);
  const token = localStorage.getItem("BackToBasic-token");

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    apis
      .get(
        `/Supervisor/GetAllAssignedSupervisors?pageNumber=1&pageSize=10&sortColumn=first_name&sortDirection=asc&searchName=${searchQuery}`,
        config
      )
      .then((res) => {
        console.log(res);
        setSupervisor(res.data.records);
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

  const handleEditSupervisor = (id) => {
    navigate(`/edit-Supervisor/${id}`);
  };

  const handleView = (id) => {
    navigate(`/view-Supervisor/${id}`);
  };

  //     const config = {
  //       headers:{
  //         Authorization: `Bearer ${token}`
  //       }
  //     }
  //     apis.delete(`/SubAdmin/DeleteSubAdmin?id=${itemId}`,config)
  //             .then((res) => {
  //               const updatedSubAdmin = subAdmin.filter(subadmin => subadmin.id !== itemId);
  //               setSubAdmin(updatedSubAdmin)
  //               Swal.fire({
  //                 title: "Do You Want To Delete SubAdmin?",
  //                 showCancelButton: true,
  //                 icon: "warning",
  //                 confirmButtonText: "Yes, delete it!",
  //                 confirmButtonColor: "#3085d6",
  //                 cancelButtonColor: "#d33",

  //               })

  //             })
  //             .catch((error) => {
  //               Swal.fire({
  //                 icon: 'error',
  //                 timer: 1500,
  //                 text: `Something went worng`,
  //                 showConfirmButton: false

  //               })
  //             })
  // };

  const handleDelete = async (itemId) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await Swal.fire({
        title: "Do you want to delete the Supervisor?",
        showCancelButton: true,
        icon: "warning",
        confirmButtonText: "Yes, delete it!",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
      });

      if (response.isConfirmed) {
        await apis.delete(
          `/Supervisor/DeleteSupervisorAssignment?id=${itemId}`,
          config
        );
        const updatedSupervisor = supervisor.filter(
          (supervisor) => supervisor.id !== itemId
        );
        setSupervisor(updatedSupervisor);

        Swal.fire({
          title: "Deleted!",
          text: "The Supervisor has been deleted.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        timer: 1500,
        text: "Something went wrong",
        showConfirmButton: false,
      });
    }
  };

  return (
    <div className="container-fluid page-wrap">
      <div className="row height-100">
        <Sidebar showSidebar={showSidebar} updateSidebar={updateSidebar} />
        <div className="col main p-0">
          <Header title="Supervisor Management" updateSidebar={updateSidebar} />
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
                            <Link to="/add-edit-SupervisorInformation">
                              <i className="addPage">
                                <img className="linkImg" src={plusIcon} />
                              </i>{" "}
                              Add New Supervisor
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
                                <th>Employee Name</th>
                                <th>Supervisor</th>
                                <th>Date Of Supervision</th>
                                <th>Time In</th>
                                <th>Time Out</th>
                                <th>Second Verification</th>
                                <th>Total Hours</th>
                                <th>EVV Name</th>

                                <th>Job</th>
                                <th>Date</th>
                                <th>Time In 2</th>
                                <th>Time Out 2</th>
                                <th className="text-center">Actions</th>
                              </tr>
                            </thead>

                            <tbody>
                              {supervisor.length > 0 ? (
                                supervisor.map((r) => (
                                  <tr>
                                    <td>
                                      {r.employee_name ? r.employee_name : "NA"}
                                    </td>

                                    <td>
                                      {r.supervisor_name
                                        ? r.supervisor_name
                                        : "NA"}
                                    </td>
                                    <td>
                                      {r.Date_Of_Supervision
                                        ? r.Date_Of_Supervision
                                        : "NA"}
                                    </td>
                                    <td>{r.Time_in ? r.Time_in : "NA"}</td>
                                    <td>{r.Time_Out ? r.Time_Out : "NA"}</td>
                                    <td>
                                      {r.Second_Verification
                                        ? r.Second_Verification
                                        : "NA"}
                                    </td>
                                    <td>
                                      {r.Total_Hours ? r.Total_Hours : "NA"}
                                    </td>
                                    <td>{r.EVV_Name ? r.EVV_Name : "NA"}</td>
                                    <td>{r.Job ? r.Job : "NA"}</td>
                                    <td>{r.Date ? r.Date : "NA"}</td>
                                    <td>{r.Time_In_2 ? r.Time_In_2 : "NA"}</td>
                                    <td>
                                      {r.Time_Out_2 ? r.Time_Out_2 : "NA"}
                                    </td>

                                    {/* <td><button className='btn btn-success btn-sm'>Yes</button></td> */}
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
                                              <VisibilityIcon /> Add{" "}
                                            </p>{" "}
                                          </li>
                                          <li>
                                            {" "}
                                            <p
                                              onClick={() =>
                                                handleEditSupervisor(r.id)
                                              }
                                              className="dropdown-item"
                                            >
                                              {" "}
                                              <EditIcon /> Edit
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

export default SupervisorManagement;
