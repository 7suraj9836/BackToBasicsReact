import React, { useState } from "react";
import { useEffect } from "react";
import Sidebar from "../Sidebar/sidebar";
import "../../../assets/css/login.css";
import Header from "../../../components/Header/header.js";
import "../../../components/Header/header.scss";
import "../Sidebar/sidebar.scss";
import TextField from "@mui/material/TextField";
import { LocalizationProvider, DesktopDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Link, useNavigate } from "react-router-dom";
import { Validation } from "../../../helpers/validation.js";
import Swal from "sweetalert2";
import apis from "../../../api/apis";

const AddEditSupervisorInformation = () => {
    const [supervisorId, setSupervisorId] = useState(0);
    const [supervisorDdata, setSupervisorDdata] = useState([]);
    const [employeeId, setEmployeeId] = useState(0);
    const [employeeDdata, setEmployeeDdata] = useState([]);
    const [showSidebar, SetShowSidebar] = useState(false);
    const updateSidebar = () => { SetShowSidebar(!showSidebar); }
    const navigate = useNavigate();
    const token = localStorage.getItem("BackToBasic-token")
    const getAllSupervisors = async () => {
    const config =  {
        headers: {
            authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*",
        },
    
      }
      apis.get(`Shared/GetAllSupervisors`,config)
        .then((res) => {
            setSupervisorDdata(res.data.response);
        }).catch((err) => {
          console.log(err)
        })
    }
    const getAllEmployees = async () => {
        const config =  {
          headers: {
              authorization: `Bearer ${token}`,
              "Access-Control-Allow-Origin": "*",
          },
      
        }
        apis.get(`Shared/GetAllEmployees`,config)
          .then((res) => {
              setEmployeeDdata(res.data.response);
          }).catch((err) => {
            console.log(err)
          })
      }
    useEffect(() => {
        getAllSupervisors();
        getAllEmployees();
    }, []);
    const handleSupervisorChange = (selectedOption) => {
      
        setSupervisorId(selectedOption.target.value);
    };
    const handleEmployeeChange = (event) => {
        setEmployeeId(event.target.value);
    };
    const handleSubmit =()=> {
        const payload={
        supervisor_id: supervisorId,
        employee_id: employeeId
        }
    const config =  {
        headers: {
            authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*",
        },
        }
        apis.post(`/Supervisor/AssignSupervisor`,payload,config,)
        .then((res) => {
          Swal.fire({
            icon: 'success',
            timer: 1500,
            text: `SubAdmin added successfully`,
            showConfirmButton: false
          })
          navigate("/supervisor-management")
        }).catch((err) => {
          console.log(err)
          Swal.fire({
            icon: 'error',
            timer: 1500,
            text: `Something went worng`,
            showConfirmButton: false
          })
        })
    }
    return (
      <div class="container-fluid page-wrap">
        <div class="row height-100">
          <Sidebar showSidebar={showSidebar} updateSidebar={updateSidebar} />
          <div class="col main p-0">
            <Header
              title="Add/Edit SubAdmin Information"
              updateSidebar={updateSidebar}
            />
  
            <div class="container-fluid page-content-box p-lg-5 p-md-4 p-3">
              <div class="row">
                <div class="col">
                  {/* [Card] */}
                  <div className="card dashboardCard height-100">
                    <div className="card-body p-0">
                      <div className="row">
                        <div className="col">
                          <div className="login-section p-0">
                            <form className="form-box p-0">
                              <div className="card">
                                <div className="row">
                                <div className="form-box-inner col-lg-4 col-md-6 mb-md-2 mb-4">
                                    <div className='input-box'>
                                      <label className='form-label'>Select Employee</label>
                                      <select value={employeeId} className='custom-select' name="" id=""
                                        onChange={handleEmployeeChange} placeholder='Select Employee'>
                                          <option value="">-- Select Employee --</option>
                                        {employeeDdata.map((g) =>
                                          <option value={g.id}>{g.name}</option>
                                        )}
                                      </select>
                                    </div>
                                  </div>
                                  <div className="form-box-inner col-lg-4 col-md-6 mb-md-2 mb-3">
                                    <div className="input-box">
                                      <label className="form-label">Select Supervisor</label>
                                    
                                      <select value={supervisorId} onChange={handleSupervisorChange} className='custom-select' name="" id="" placeholder='Select Supervisor'>
                                      <option value="">-- Select Supervisor --</option>
                                        {supervisorDdata.map((option) => (
                                          <option  value={option.id}>
                                            {option.name}
                                          </option>
                                        ))}
                                      </select>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="btn-box d-flex">
                                <button
                                  type="button"
                                  className="blue-btn-default btn-sm"
                                  onClick={handleSubmit}
                                >
                                  Submit
                                </button>
                                <button 
                                  type="button"
                                  className="blue-btn-default btn-sm btn-outline-gray"
                                  onClick={() => {
                                    navigate("/supervisor-management");
                                  }}
                                >
                                  Cancel
                                </button>
                              </div>
                            </form>
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

export default AddEditSupervisorInformation
