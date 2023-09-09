import React, { useState } from "react";
import { useEffect } from "react";
import Sidebar from "../Sidebar/sidebar";
import "../../../assets/css/login.css";
import Header from "../../../components/Header/header.js";
import "../../../components/Header/header.scss";
import "../Sidebar/sidebar.scss";
import downloadIcon from "../../../assets/images/downloadIcon.png";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Axios from "axios";

const ClientViewDetail = () => {
  const { id } = useParams();
  const [showSidebar, SetShowSidebar] = useState(false);
  const updateSidebar = () => {
    SetShowSidebar(!showSidebar);
  };
  const [result, setResult] = useState({});
  

  useEffect(() => {
    let aHeader = localStorage.getItem("BackToBasic-token");
    Axios.get(`http://122.176.101.76:9000/api/Client/GetClient?id=${id}`, {
      headers: {
        authorization: `Bearer ${aHeader}`,
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => {
        setResult(res.data.response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <div class="container-fluid page-wrap">
      <div class="row height-100">
        <Sidebar showSidebar={showSidebar} updateSidebar={updateSidebar} />
        <div class="col main p-0">
          <Header
            title="Edit Client Information"
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
                            <div className="card mb-4">
                              <div className="row">
                                <div className="col-xl-5 col-12 mb-xl-0 mb-3 ">
                                  <div className="card bg-white h-100">
                                    <div className="infoBox h-100">
                                      <div className="row h-100 d-flex align-content-between">
                                        <div className="col-md-6 mb-4">
                                          <h5 className="infoHeading">
                                            Guardian Name
                                          </h5>
                                          <p className="text-primary mb-0">
                                            Ralph Edwards
                                          </p>
                                        </div>
                                        <div className="col-md-6 mb-4">
                                          <h5 className="infoHeading">
                                            Child Name
                                          </h5>
                                          <p className="mb-0">Kristin Watson</p>
                                        </div>
                                        <div className="col-md-6 mb-md-0 mb-4">
                                          <h5 className="infoHeading">
                                            Gender
                                          </h5>
                                          <p className="mb-0">Female</p>
                                        </div>
                                        <div className="col-md-6">
                                          <h5 className="infoHeading">Age</h5>
                                          <p className="mb-0">5 Years</p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-xl-7 col-12">
                                  <div className="card bg-white">
                                    <div className="infoBox">
                                      <div className="row">
                                        <div className="col-md-6 mb-4">
                                          <h5 className="infoHeading">
                                            Address
                                          </h5>
                                          <p className="text-primary mb-0">
                                            Flat-1001, 813 Howard Street Oswego
                                            NY 13126 USA
                                          </p>
                                        </div>
                                        <div className="col-md-6 mb-4">
                                          <h5 className="infoHeading">
                                            Total Authorized hours
                                          </h5>
                                          <p className="mb-0">75 hours/week</p>
                                        </div>
                                        <div className="col-md-6 mb-md-0 mb-4">
                                          <h5 className="infoHeading">
                                            Phone Number
                                          </h5>
                                          <p className="mb-0">
                                            +1-532-364-3547
                                          </p>
                                        </div>
                                        <div className="col-md-6">
                                          <h5 className="infoHeading">
                                            Status
                                          </h5>
                                          <butoon className="btn btn-outline-warning rounded-5 text-uppercase">
                                            Visit scheduled
                                          </butoon>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="row mt-4">
                                <div className="col-md-6">
                                  <h5>Confidentiality Statement</h5>
                                </div>
                                <div className="col-md-6 text-end">
                                  <Link
                                    to={""}
                                    download
                                    className="text-primary d-flex align-center gap-2 justify-content-end"
                                  >
                                    Download current ITP{" "}
                                    <img src={downloadIcon} alt="download" />
                                  </Link>{" "}
                                </div>
                              </div>
                              <div className="row mt-2">
                                <div className="col-12">
                                  <div className="card bg-white p-3">
                                    <p>
                                      All client info should be treated as
                                      confidential communication of Back to
                                      Basics Behavioral Health Services Inc. It
                                      may include information that is privileged
                                      and/or confidential under both state and
                                      federal regulations.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="card ">
                              <div className="row">
                                <h3 className="form-label mb-3">
                                  Specific Medically Necessary Treatment
                                  Schedule
                                </h3>
                                <div className="col-12">
                                  <div className="card p-0 border rounded-3">
                                    <div className="table-responsive overflow-hidden">
                                      <table className="table m-0 butifyTable rounded-3 overflow-hidden">
                                        <thead>
                                          <tr>
                                            <th>days</th>
                                            <th>time</th>
                                            <th>hours</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          <tr>
                                            <td>Thursday</td>
                                            <td>7: 30 am-2:30PM</td>
                                            <td>7: 30 am-2:30PM</td>
                                          </tr>
                                          <tr>
                                            <td>Wednesday</td>
                                            <td>7: 30 am-2:30PM</td>
                                            <td>7: 30 am-2:30PM</td>
                                          </tr>
                                          <tr>
                                            <td>Friday</td>
                                            <td>7: 30 am-2:30PM</td>
                                            <td>7: 30 am-2:30PM</td>
                                          </tr>
                                          <tr>
                                            <td>Monday</td>
                                            <td>7: 30 am-2:30PM</td>
                                            <td>7: 30 am-2:30PM</td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          {/* 
                            {result.map((res) => {
                              return (
                                <>
                                  <div className="card mb-4">
                                    <div className="row">
                                      <div className="col-xl-5 col-12 mb-xl-0 mb-3 ">
                                        <div className="card bg-white h-100">
                                          <div className="infoBox h-100">
                                            <div className="row h-100 d-flex align-content-between">
                                              <div className="col-md-6 mb-4">
                                                <h5 className="infoHeading">
                                                  Guardian_Name
                                                </h5>
                                                <p className="text-primary mb-0">
                                                  {res.Ralph_Edwards}
                                                </p>
                                              </div>
                                              <div className="col-md-6 mb-4">
                                                <h5 className="infoHeading"></h5>
                                                <p className="mb-0">
                                                  Kristin Watson
                                                </p>
                                              </div>
                                              <div className="col-md-6 mb-md-0 mb-4">
                                                <h5 className="infoHeading">
                                                  Gender
                                                </h5>
                                                <p className="mb-0">{res.gender}</p>
                                              </div>
                                              <div className="col-md-6">
                                                <h5 className="infoHeading">
                                                  Age
                                                </h5>
                                                <p className="mb-0">{res.age}</p>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-xl-7 col-12">
                                        <div className="card bg-white">
                                          <div className="infoBox">
                                            <div className="row">
                                              <div className="col-md-6 mb-4">
                                                <h5 className="infoHeading">
                                                  Address
                                                </h5>
                                                <p className="text-primary mb-0">
                                                  {res.address}
                                                </p>
                                              </div>
                                              <div className="col-md-6 mb-4">
                                                <h5 className="infoHeading">
                                                  Total Authorized hours
                                                </h5>
                                                <p className="mb-0">
                                                  {res.totalAuthourizedHours}
                                                </p>
                                              </div>
                                              <div className="col-md-6 mb-md-0 mb-4">
                                                <h5 className="infoHeading">
                                                  Phone Number
                                                </h5>
                                                <p className="mb-0">
                                                  {res.phoneNumber}
                                                </p>
                                              </div>
                                              <div className="col-md-6">
                                                <h5 className="infoHeading">
                                                  Status
                                                </h5>
                                                <butoon className="btn btn-outline-warning rounded-5 text-uppercase">
                                                  {res.status}
                                                </butoon>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="row mt-4">
                                      <div className="col-md-6">
                                        <h5>Confidentiality Statement</h5>
                                      </div>
                                      <div className="col-md-6 text-end">
                                        <Link
                                          to={""}
                                          download
                                          className="text-primary d-flex align-center gap-2 justify-content-end"
                                        >
                                          Download current ITP{" "}
                                          <img
                                            src={downloadIcon}
                                            alt="download"
                                          />
                                        </Link>{" "}
                                      </div>
                                    </div>
                                    <div className="row mt-2">
                                      <div className="col-12">
                                        <div className="card bg-white p-3">
                                          <p>
                                            All client info should be treated as
                                            confidential communication of Back
                                            to Basics Behavioral Health Services
                                            Inc. It may include information that
                                            is privileged and/or confidential
                                            under both state and federal
                                            regulations.
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="card ">
                                    <div className="row">
                                      <h3 className="form-label mb-3">
                                        Specific Medically Necessary Treatment
                                        Schedule
                                      </h3>

                                      <div className="col-12">
                                        <div className="card p-0 border rounded-3">
                                          <div className="table-responsive overflow-hidden">
                                            <table className="table m-0 butifyTable rounded-3 overflow-hidden">
                                              <thead>
                                                <tr>
                                                  <th>days</th>
                                                  <th>time</th>
                                                  <th>hours</th>
                                                </tr>
                                              </thead>
                                              <tbody>
                                                {
                                                  result.medicallyNecessaryTreatmentSchedule.map((schedule,index)=>(
  
                                                <tr key={index}>
                                                  <td>{schedule.day}</td>
                                                  <td>{schedule.time}</td>
                                                  <td>{schedule.hours}</td>
                                                </tr>
                                                  ))
                                                }
                                               
                                              </tbody>
                                            </table>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </>
                              );
                            })} */}
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

export default ClientViewDetail;
