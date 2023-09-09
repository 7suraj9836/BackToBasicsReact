import React, { useState } from 'react';
import { useEffect } from 'react';
import Sidebar from "../Sidebar/sidebar";
import "../../../assets/css/login.css";
import Header from "../../../components/Header/header.js";
import "../../../components/Header/header.scss";
import '../Sidebar/sidebar.scss';
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Axios from 'axios';
import apis from "../../../api/apis";


const ViewSupervisor = () => {

    const { id } = useParams();
    const [employeeName, setEmployeeName] = useState("");
    const [supervisorName, setSupervisorName] = useState("");
    const [showSidebar, SetShowSidebar] = useState(false);
    const updateSidebar = () => { SetShowSidebar(!showSidebar); }
    const navigate = useNavigate();



    useEffect(() => {
         console.log('control here')
        let aHeader = localStorage.getItem("BackToBasic-token");
        Axios
            .get(`http://122.176.101.76:9000/api/Supervisor/GetAssignedSupervisor?id=${id}`,
                {
                    headers: {
                        authorization: `Bearer ${aHeader}`,
                        "Access-Control-Allow-Origin": "*",
                    },
                })
            .then((res) => {
                setEmployeeName(res.data.response.employee_name);
                setSupervisorName(res.data.response.supervisor_name);
             
               
            }).catch((err) => {
                console.log(err);
            })
    
    }, [id])


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
                <div className="card-body">
                  <div className="row">
                    <div className="col">
                      <div className="card login-section">
                        <form className="form-box">
                          <div className="row">
                          <div className="form-box-inner col-lg-4 col-md-6 mb-4">
                                  <div className="input-box">
                                    <label className="form-label">
                                      Employee
                                    </label>
  
                                    <input
                                      disabled
                                      type="text"
                                      placeholder={"type your name"}
                                      value={employeeName}
                                      onChange={(e) => {
                                        setEmployeeName(e.target.value);
                                      }}
                                    />
                                  </div>
                                </div>

                                <div className="form-box-inner col-lg-4 col-md-6 mb-4">
                                  <div className="input-box">
                                    <label className="form-label">
                                      Supervisor
                                    </label>
  
                                    <input
                                      disabled
                                      type="text"
                                      placeholder={"type your name"}
                                      value={supervisorName}
                                      onChange={(e) => {
                                        setSupervisorName(e.target.value);
                                      }}
                                    />
                                  </div>
                                </div>
                          </div>
                          <button
                            style={{ marginLeft: 13 }}
                            type="button"
                            className="blue-btn-default"
                            onClick={() => {
                              navigate("/supervisor-management");
                            }}
                          >
                            Cancel
                          </button>

                        
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
  )
}

export default ViewSupervisor
