import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar/sidebar";
import "../../../assets/css/login.css";
import Header from "../../../components/Header/header.js";
import "../../../components/Header/header.scss";
import "../Sidebar/sidebar.scss";
import TextField from "@mui/material/TextField";
import Textarea from "@mui/joy/Textarea";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import apis from "../../../api/apis";
import { createEmployeeAction } from "../../../redux/actions/user";
import { Table } from "react-bootstrap";

const resetPasswordModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #dadada",
  boxShadow: 24,
  p: 3,
  borderRadius: 3,
};

const AddScheduleManagement = () => {
  const [showSidebar, SetShowSidebar] = useState(false);
  const token = localStorage.getItem("BackToBasic-token");
  const [client, setClient] = useState([]);
  const [clientId, setClientId] = useState(1);
  const [selectedClientDetails, setSelectedClientDetails] = useState(null);
  const [issueDescription, setIssueDescription] = useState();
  const [careRequire, setCareRequire] = useState();
  const [selectDate, setSelectDate] = useState();
  const [bhpIn, setBhpIn] = useState();
  const [bhpOut, setBhpOut] = useState();
  const [traineeName, setTraineeName] = useState();
  const [traineeIn, setTraineeIn] = useState();
  const [traineeOut, setTraineeOut] = useState();
  const [caregiver, setCaregiver] = useState([]);
  const [caregiverId, setCaregiverId] = useState(1);
  const [notes, setNotes] = useState();
  console.log(notes, "asdasf");
  const updateSidebar = () => {
    SetShowSidebar(!showSidebar);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const hanldeIssueDescription = (e) => {
    setIssueDescription(e.target.value);
  };
  const handleCareRequire = (e) => {
    setCareRequire(e.target.value);
  };
  const handleBhpIn = (e) => {
    setBhpIn(e.target.value);
  };
  const handleBhpOut = (e) => {
    setBhpOut(e.target.value);
  };
  const handleClientChange = (e) => {
    const selectedClientId = e.target.value;
    setClientId(selectedClientId);
    const selectedClient = client.find(
      (c) => c.id === parseInt(selectedClientId)
    );
    setSelectedClientDetails(selectedClient);
  };

  const getAllClient = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    apis
      .get(`/Shared/GetAllClients`, config)
      .then((res) => {
        setClient(res.data.response);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAllClient();
  }, []);

  const handleCaregiverChange = (e) => {
    const selectedClientId = e.target.value;
    setCaregiverId(selectedClientId);
  };

  const getAllCaregiver = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    apis
      .get(`/Shared/GetAllEmployees`, config)
      .then((res) => {
        setCaregiver(res.data.response);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAllCaregiver();
  }, []);

  let handleSubmit = async () => {
    if (true) {
      // let formData = new FormData();
      // formData.append("client_id", clientId);
      // formData.append("issue_description", issueDescription);
      // formData.append("type_of_care_required", careRequire);
      // formData.append("date", selectDate);
      // formData.append("note", notes);
      // formData.append("bhp_out", bhpOut);
      // formData.append("bhp_in", bhpIn);
      // formData.append("trainee_name", traineeName);
      // formData.append("trainee_in", traineeIn);
      // formData.append("trainee_out", traineeOut);
      // // formData.append("trainee_out", traineeOut);
      const jsonData = {
        client_id: clientId,
        issue_description: issueDescription,
        type_of_care_required: careRequire,
        date: selectDate,
        note: notes,
        bhp_out: bhpOut,
        bhp_in: bhpIn,
        trainee_name: traineeName,
        trainee_in: traineeIn,
        trainee_out: traineeOut,
      };

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      apis
        .post(`/Schedule/CreateSchedule`, jsonData, config)
        .then((res) => {
          if (res.status === 200) {
            Swal.fire({
              icon: "success",
              timer: 1500,
              text: `Schedule management added successfully`,
              showConfirmButton: false,
            });
            navigate("/schedule-management");
          } else {
            Swal.fire({
              icon: "success",
              timer: 1500,
              text: `Something went wrong`,
              showConfirmButton: false,
            });
            navigate("/schedule-management");
          }
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            timer: 1500,
            text: `Something went wrong`,
            showConfirmButton: false,
          });
        });
    }
  };

  return (
    <div class="container-fluid page-wrap">
      <div class="row height-100">
        <Sidebar showSidebar={showSidebar} updateSidebar={updateSidebar} />
        <div class="col main p-0">
          <Header
            title="Add/Edit Schedule Information"
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
                            <div className="card mb-3">
                              <div className="row">
                                <h6 className="form-label">Visit Schedule</h6>
                                <div className="form-box-inner col-lg-4 col-md-6 mb-4">
                                  <div className="input-box">
                                    <label className="form-label">
                                      Select client
                                    </label>
                                    <select
                                      className="custom-select"
                                      name=""
                                      id=""
                                      placeholder="Select Client"
                                      onChange={(e) => handleClientChange(e)}
                                    >
                                      {client.map((option) => (
                                        <option
                                          key={option.id}
                                          value={option.id}
                                        >
                                          {option.name}
                                        </option>
                                      ))}
                                      <option value={"Select Clent"}>
                                        Select Client
                                      </option>
                                    </select>
                                  </div>
                                </div>

                                {selectedClientDetails && (
                                  <Table responsive="sm">
                                    <thead>
                                      <tr>
                                        {/* <th>#</th> */}
                                        <th>Table heading</th>
                                        <th>Table heading</th>
                                        <th>Table heading</th>
                                        <th>Table heading</th>
                                        <th>Table heading</th>
                                        <th>Table heading</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        {/* <td>1</td> */}
                                        <td>{selectedClientDetails.name}</td>
                                        <td>{selectedClientDetails.id}</td>
                                        <td>Table cell</td>
                                        <td>Table cell</td>
                                        <td>Table cell</td>
                                        <td>Table cell</td>
                                      </tr>
                                    </tbody>
                                  </Table>
                                )}

                                <div className="form-box-inner col-12 mb-4">
                                  <div className="input-box">
                                    <label className="form-label">
                                      Issue Description
                                    </label>
                                    <div className="col-lg-8 col-md-8">
                                      <Textarea
                                        minRows={4}
                                        value={issueDescription}
                                        onChange={(e) =>
                                          hanldeIssueDescription(e)
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="form-box-inner col-12 mb-4">
                                  <div className="input-box">
                                    <label className="form-label">
                                      Type of Care required
                                    </label>
                                    <div className="col-lg-8 col-md-8">
                                      <Textarea
                                        minRows={4}
                                        value={careRequire}
                                        onChange={(e) => handleCareRequire(e)}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-8 col-12 mb-4">
                                  <div className="row">
                                    <div className="col-12 mb-4">
                                      <div className="row">
                                        <div className="form-box-inner col-12 col-md-6">
                                          <div className="input-box">
                                            <label className="form-label">
                                              Select Caregiver
                                            </label>
                                            <select
                                              className="custom-select"
                                              name=""
                                              id=""
                                              placeholder="Select Client"
                                              onChange={(e) =>
                                                handleCaregiverChange(e)
                                              }
                                            >
                                              {caregiver.map((option) => (
                                                <option
                                                  key={option.id}
                                                  value={option.id}
                                                >
                                                  {option.name}
                                                </option>
                                              ))}
                                              <option value={"Select Clent"}>
                                                Select Caregiver
                                              </option>
                                            </select>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="row">
                                      <div className="col-12 mb-4">
                                        <div className="row">
                                          <div className="form-box-inner col-12 col-md-6">
                                            <div className="input-box">
                                              <label className="form-label">
                                                Select Date
                                              </label>
                                              <div className="row">
                                                <div class="col-sm-12">
                                                  <LocalizationProvider
                                                    dateAdapter={AdapterDayjs}
                                                  >
                                                    <DesktopDatePicker
                                                      orientation="landscape"
                                                      openTo="day"
                                                      value={selectDate}
                                                      onChange={(date) => {
                                                        setSelectDate(date);
                                                      }}
                                                      renderInput={(params) => (
                                                        <TextField
                                                          {...params}
                                                        />
                                                      )}
                                                    />
                                                  </LocalizationProvider>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="form-box-inner col-md-6 col-12 mb-4">
                                      <div className="input-box">
                                        <label className="form-label">
                                          BPH In
                                        </label>
                                        <input
                                          type="time"
                                          name="time"
                                          value={bhpIn}
                                          onChange={(e) => handleBhpIn(e)}
                                        ></input>
                                      </div>
                                    </div>
                                    <div className="form-box-inner col-md-6 col-12 mb-4">
                                      <div className="input-box">
                                        <label className="form-label">
                                          BPH Out
                                        </label>
                                        <input
                                          type="time"
                                          name="time"
                                          value={bhpOut}
                                          onChange={(e) => handleBhpOut(e)}
                                        ></input>
                                      </div>
                                    </div>
                                    <div className="row">
                                      <div className="col-12 mb-4">
                                        <div className="row">
                                          <div className="form-box-inner col-md-6 col-12 ">
                                            <div className="input-box">
                                              <label className="form-label">
                                                Trainee Name
                                              </label>
                                              <input
                                                type="text"
                                                placeholder={"Employee Name"}
                                                value={traineeName}
                                                onChange={(e) =>
                                                  setTraineeName(e.target.value)
                                                }
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="form-box-inner col-12 col-md-6 mb-4">
                                      <div className="input-box">
                                        <label className="form-label">
                                          Trainee In
                                        </label>
                                        <input
                                          type="time"
                                          name="time"
                                          value={traineeIn}
                                          onChange={(e) =>
                                            setTraineeIn(e.target.value)
                                          }
                                        ></input>
                                      </div>
                                    </div>
                                    <div className="form-box-inner col-12 col-md-6 mb-4">
                                      <div className="input-box">
                                        <label className="form-label">
                                          Trainee Out
                                        </label>
                                        <input
                                          type="time"
                                          name="time"
                                          value={traineeOut}
                                          onChange={(e) =>
                                            setTraineeOut(e.target.value)
                                          }
                                        ></input>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="form-box-inner col-12 mb-4">
                                  <div className="input-box">
                                    <label className="form-label">Notes</label>
                                    <div className="col-lg-8 col-md-8">
                                      <Textarea
                                        minRows={4}
                                        value={notes}
                                        onChange={(e) =>
                                          setNotes(e.target.value)
                                        }
                                      />
                                    </div>
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
                                Save
                              </button>
                              <button
                                type="button"
                                className="blue-btn-default btn-sm btn-outline-gray"
                                onClick={(event) =>
                                  (window.location.href =
                                    "./employee-management")
                                }
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
export default AddScheduleManagement;
