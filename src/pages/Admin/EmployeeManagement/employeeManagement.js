import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/sidebar";
import Header from "../../../components/Header/header.js";
import "../../../components/Header/header.scss";
import "../Sidebar/sidebar.scss";
import downloadFile from "../../../assets/images/download-file.png";
import plusIcon from "../../../assets/images/plusIcon.png"
import { useDispatch, connect } from "react-redux";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import apis from '../../../api/apis';
import Swal from "sweetalert2";

const EmployeeManagment = ({ employeeAction }) => {
  const [showSidebar, SetShowSidebar] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const updateSidebar = () => {
    SetShowSidebar(!showSidebar);
  };
  const [employee, setEmployee] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("BackToBasic-token")

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    apis.get(`/Employee/GetAllEmployees?pageNumber=1&pageSize=15&sortColumn=client_last_name&sortDirection=asc&searchName=${searchQuery}`, config)
      .then((res) => {
        console.log(res);
        setEmployee(res.data.records)

      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          timer: 1500,
          text: `Something went worng`,
          showConfirmButton: false

        })
      })
  }, [searchQuery]);

  const handleDownload = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    apis.get("/Employee/DownloadEmployeeDataReport", config)
      .then((response) => {
    
        return response.data;
      })
      .then(base64 => {
        const link = document.createElement('a');
        console.log(base64, 'base64');
        link.href = base64;
        link.target = '_blank';
        link.setAttribute('download', 'client-report.pdf');
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      })
      .catch(error => {
        console.log('Error occurred during file download:', error);
      });
  };

  const handleView = (id) => {
    navigate(`/view-Employee/${id}`)
  }

  const handleEditEmployee = (id) => {
    navigate(`/edit-Employee/${id}`)
  }

  const dispatch = useDispatch();

  const handleDelete = async (itemId) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    apis.delete(`/Employee/DeleteEmployee?id=${itemId}`, config)

      .then((res) => {
        const updatedEmployee = employee.filter(employee => employee.id !== itemId);
        setEmployee(updatedEmployee)
        Swal.fire({
          icon: 'success',
          timer: 1500,
          text: `Employee deleted successfully`,
          showConfirmButton: false

        })

      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          timer: 1500,
          text: `Something went worng`,
          showConfirmButton: false

        })
      })
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
                              <input type="text" value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)} className="search-input" placeholder="Search Here..." />
                              <input type="submit" className="searchIcon" />
                            </div>
                          </div>
                          {/* [/Table Search] */}

                          {/* Right Filter */}
                          <div className="tableRightLink d-flex ">
                            <Link to="/addemployeeinformation">
                              <i className="addPage">
                                <img className="linkImg" src={plusIcon} />
                              </i>{" "}
                              Add New Employee
                            </Link>
                            <Link to="" className="imgWithLink ms-2">
                              <img className="linkImg" src={downloadFile} onClick={handleDownload}/>{" "}
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
                                <th>Employee Name Preferred Format</th>
                                <th>Employee Name Sandata Format</th>
                                <th>Santrax ID</th>
                                <th>DOB</th>
                                <th>Phone Number</th>
                                <th>E-mail</th>
                                <th>Address</th>
                                <th>Date Of Discharge</th>
                                <th>Degree</th>
                                <th>Actions</th>
                              </tr>
                            </thead>

                            <tbody>
                              {employee &&
                                employee.map((r) => {
                                  return (
                                    <tr>
                                      <td>
                                        {r.employee_name_preferred_format}
                                      </td>

                                      <td className="text-start">
                                        {r.employee_name_sandata_format}
                                      </td>
                                      <td>{r.santrax_id}</td>
                                      <td>{r.date_of_birth}</td>
                                      <td>{r.phone_number}</td>
                                      <td>{r.email}</td>
                                      <td>{r.address1}</td>
                                      <td>{r.date_of_discharge}</td>
                                      <td>{r.degree}</td>
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
                                                <VisibilityIcon />{" "}
                                                View
                                              </p>{" "}
                                            </li>
                                            <li>
                                              {" "}
                                              <p
                                                onClick={() => handleEditEmployee(r.id)}
                                                className="dropdown-item"
                                              >
                                                {" "}
                                                <EditIcon />{" "}
                                                Edit
                                              </p>{" "}
                                            </li>
                                            <li>
                                              {" "}
                                              <p
                                                onClick={() => handleDelete(r.id)}
                                                className="dropdown-item"
                                              >
                                                {" "}
                                                <DeleteIcon />{" "}
                                                Delete
                                              </p>{" "}
                                            </li>
                                          </ul>
                                        </div>
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

export default EmployeeManagment
