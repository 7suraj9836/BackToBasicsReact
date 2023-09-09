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
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import apis from "../../../api/apis";

const AddAuthorizationManagement = () => {
const [client, setClient] = useState([]);
const [clientId, setClientId] = useState(1);
const[programManager, setProgramManger]= useState("")
const[totalUnit, setTotalUnit]= useState()
const[startDate, setStartDate]= useState()
const[endDate, setEndDate]= useState()
const[authorizationNumber, setAuthorizationNumber]= useState()
const[diagnosisCode, setDiagnosisCode]= useState()
const[schoolBased, setSchoolBased]= useState()
const[epModifier, setEPModifier]= useState()
const[verifiedInMHMS , setVerifiedInMHMS ]= useState()
const[secondVerified, setSecondVerified]= useState()
const [address1, setAddress1] = useState("");
const [address2, setAddress2] = useState("");
const [city, setCity] = useState("");
const [zip, setZip] = useState("");
const [approvedHoursWeek, setApprovedHoursWeek] = useState("");
const [totalApprovedHours, setTotalApprovedHours] = useState("");
const [totalUnitWorked, setTotalUnitWorked] = useState("");
const [totalHouresWorked, setTotalHouresWorked] = useState("");
const [totalHouresWeekWorked, setTotalHouresWeekWorked] = useState("");
const [roleId, setRoleId] = useState(1);
const [showSidebar, SetShowSidebar] = useState(false);
const [pageNo, setPageNo] = useState(1);
  // const [selectedName, setSelectedName] = useState("");
const unitRemaining= totalUnit-totalUnitWorked
const totalHoursRemaining= totalApprovedHours-totalHouresWorked
const totalhoursWeekWorked= approvedHoursWeek-totalHouresWeekWorked
const token = localStorage.getItem("BackToBasic-token"); 

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
 
 const handleClientChange = (select) => {
   const selectedClientId = parseInt(select.target.value);
   setClientId(selectedClientId);
   const selectedClient = client.find((c) => c.id === selectedClientId);
   if (selectedClient) {
     setProgramManger(selectedClient.program_manager);
   } else {
     setProgramManger("");
   }
 };

 const handleOptionChange = (event) => {
    setSchoolBased(event.target.value);
    
  };

  const handleEPModifierOptionChange = (event) => {
     setEPModifier(event.target.value);
  };

 const handleVerifiedInMHMSOptionChange = (event) => {
    setVerifiedInMHMS(event.target.value);
  };

  const handleSecondVerifiedOptionChange = (event) => {
     setSecondVerified(event.target.value);
  };

  const updateSidebar = () => {
    SetShowSidebar(!showSidebar);
  };

  const navigate = useNavigate();

  const handleRoleChange = (event) => {
    setRoleId(event.target.value);
    console.log(event.target.value);
  };


let handleSubmit = async () => {
    if (true) {
      let formData = new FormData();
      formData.append("client_id", clientId);
      formData.append("Program_manager", programManager);
      formData.append("Authorization_start_date", startDate); 
      formData.append("Authorization_end_date", endDate);
      formData.append("Total_units_authorized", totalUnit);
      formData.append("Authorization_number", authorizationNumber);
      formData.append("Diagnosis_code", diagnosisCode);
      formData.append("Ep_modifier_on_kepro_authorization", epModifier);
      formData.append("School_based", schoolBased);
      formData.append("Verified_in_mhms", verifiedInMHMS);
      formData.append("Address1", address1);
      formData.append("Address2", address2);
      formData.append("Address_city_on_kepro_authorization", city);
      formData.append("Address_zipcode_on_kepro_authorization", zip);
      formData.append("Approved_hours_per_week", approvedHoursWeek);
      formData.append("Total_approved_hours", totalApprovedHours);
      formData.append("Total_units_worked", totalUnitWorked);
      formData.append("Total_hours_worked", totalHouresWorked);
      formData.append("Total_hours_per_week_worked", totalHouresWeekWorked);
      formData.append(" Units_remaining", unitRemaining);
      formData.append("Total_hours_remaining", totalHoursRemaining);
      formData.append("Weeks_remaining",totalhoursWeekWorked);

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      apis
        .post(
          `/Authorization/SaveAuthorization`,
          formData,
          config
        )
        .then((res) => {
          if (res.status === 200) {
            Swal.fire({
              icon: "success",
              timer: 1500,
              text: `Authorization added successfully`,
              showConfirmButton: false,
            });
            navigate("/authorization-management");
          } else {
            Swal.fire({
              icon: "error",
              timer: 1500,
              text: `Somthing went wrong`,
              showConfirmButton: false,
            });
            navigate("/authorization-management");
          }
        })
        .catch((err) => {
          Swal.fire({
            icon: "success",
            timer: 1500,
            text: ` Authorization added successfully`,
            showConfirmButton: false,
          });
          navigate("/authorization-management");
        });
     }
  };

  return (
    <div class="container-fluid page-wrap">
      <div class="row height-100">
        <Sidebar showSidebar={showSidebar} updateSidebar={updateSidebar} />
        <div class="col main p-0">
          <Header title="Create Visit Schedule" updateSidebar={updateSidebar} />
          {pageNo === 1 && (
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
                                        Client Name
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
                                  <div className="form-box-inner col-lg-4 col-md-6 mb-4">
                                    <div className="input-box">
                                      <label className="form-label">
                                        Program Manager
                                      </label>
                                      <input
                                        readOnly
                                        type="text"
                                        placeholder={"Program Manager"}
                                        value={programManager}

                                        // onChange={(e)=>{
                                        //   setProgramManger(e.target.value)
                                        // }}
                                      />
                                    </div>
                                  </div>
                                  <div className="form-box-inner col-lg-4 col-md-6 mb-4">
                                    <div className="input-box">
                                      <label className="form-label">
                                        Total Units
                                      </label>
                                      <input
                                        type="text"
                                        placeholder={"Enter Unit Authorized"}
                                        value={totalUnit}
                                        onChange={(e) =>
                                          setTotalUnit(e.target.value)
                                        }
                                      />
                                    </div>
                                  </div>

                                  <div className="form-box-inner col-lg-4 col-md-6 mb-4">
                                    <div className="input-box">
                                      <label className="form-label">
                                        Start Date
                                      </label>
                                      <LocalizationProvider
                                        dateAdapter={AdapterDayjs}
                                      >
                                        <DesktopDatePicker
                                          orientation="landscape"
                                          openTo="day"
                                          value={startDate}
                                          onChange={(date) => {
                                            setStartDate(date);
                                          }}
                                          renderInput={(params) => (
                                            <TextField {...params} />
                                          )}
                                        />
                                      </LocalizationProvider>
                                    </div>
                                  </div>
                                  <div className="form-box-inner col-lg-4 col-md-6 mb-4">
                                    <div className="input-box">
                                      <label className="form-label">
                                        End Date
                                      </label>
                                      <LocalizationProvider
                                        dateAdapter={AdapterDayjs}
                                      >
                                        <DesktopDatePicker
                                          orientation="landscape"
                                          openTo="day"
                                          value={endDate}
                                          onChange={(date) => {
                                            setEndDate(date);
                                          }}
                                          renderInput={(params) => (
                                            <TextField {...params} />
                                          )}
                                        />
                                      </LocalizationProvider>
                                    </div>
                                  </div>
                                  <div className="form-box-inner col-lg-4 col-md-6 mb-4">
                                    <div className="input-box">
                                      <label className="form-label">
                                        Authoriztion Number
                                      </label>
                                      <input
                                        type="number"
                                        placeholder={"Enter Unit Authorized"}
                                        value={authorizationNumber}
                                        onChange={(e) => {
                                          setAuthorizationNumber(
                                            e.target.value
                                          );
                                        }}
                                      />
                                    </div>
                                  </div>
                                  <div className="form-box-inner col-lg-4 col-md-6 mb-4">
                                    <div className="input-box">
                                      <label className="form-label">
                                        Diagnosis Code
                                      </label>
                                      <input
                                        type="text"
                                        placeholder={"Enter Diagnosis Code"}
                                        value={diagnosisCode}
                                        onChange={(e) => {
                                          setDiagnosisCode(e.target.value);
                                        }}
                                      />
                                    </div>
                                  </div>
                                  <div className="form-box-inner col-lg-4 col-md-6 mb-4">
                                    <div className="input-box">
                                      <label className="form-label">
                                        Client Status
                                      </label>
                                      <select
                                        value={roleId}
                                        onChange={handleRoleChange}
                                        className="custom-select"
                                        name=""
                                        id=""
                                        placeholder="Select gender"
                                      >
                                        <option>Select status</option>
                                        <option value="active">Active</option>
                                        <option value="Inactive">
                                          Inactive
                                        </option>
                                      </select>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="card">
                                <div className="row">
                                  <div className="form-box-inner col-lg-12 col-md-12 mb-0">
                                    <div className="input-box row align-items-center">
                                      <label className="form-label col-md-4">
                                        School Based ?
                                      </label>
                                      <FormControl className="col">
                                        <RadioGroup
                                          row
                                          aria-labelledby="demo-row-radio-buttons-group-label"
                                          name="row-radio-buttons-group"
                                          value={schoolBased}
                                          onChange={handleOptionChange}
                                        >
                                          <FormControlLabel
                                            value="true"
                                            control={<Radio />}
                                            label="Yes"
                                          />
                                          <FormControlLabel
                                            value="false"
                                            control={<Radio />}
                                            label="No"
                                          />
                                        </RadioGroup>
                                      </FormControl>
                                    </div>
                                  </div>
                                  <div className="form-box-inner col-lg-12 col-md-12 mb-0">
                                    <div className="input-box row align-items-center">
                                      <label className="form-label col-md-4">
                                        EP Modifier ?
                                      </label>
                                      <FormControl className="col">
                                        <RadioGroup
                                          row
                                          aria-labelledby="demo-row-radio-buttons-group-label"
                                          name="row-radio-buttons-group"
                                          value={epModifier}
                                          onChange={
                                            handleEPModifierOptionChange
                                          }
                                        >
                                          <FormControlLabel
                                            value="true"
                                            control={<Radio />}
                                            label="Yes"
                                          />
                                          <FormControlLabel
                                            value="false"
                                            control={<Radio />}
                                            label="No"
                                          />
                                        </RadioGroup>
                                      </FormControl>
                                    </div>
                                  </div>
                                  <div className="form-box-inner col-lg-12 col-md-12 mb-0">
                                    <div className="input-box row align-items-center">
                                      <label className="form-label col-md-4">
                                        Verified in MHMS ?
                                      </label>
                                      <FormControl className="col">
                                        <RadioGroup
                                          row
                                          aria-labelledby="demo-row-radio-buttons-group-label"
                                          name="row-radio-buttons-group"
                                          value={verifiedInMHMS}
                                          onChange={
                                            handleVerifiedInMHMSOptionChange
                                          }
                                        >
                                          <FormControlLabel
                                            value="true"
                                            control={<Radio />}
                                            label="Yes"
                                          />
                                          <FormControlLabel
                                            value="false"
                                            control={<Radio />}
                                            label="No"
                                          />
                                        </RadioGroup>
                                      </FormControl>
                                    </div>
                                  </div>
                                  <div className="form-box-inner col-lg-12 col-md-12 mb-0">
                                    <div className="input-box row align-items-center">
                                      <label className="form-label col-md-4">
                                        Second Verified ?
                                      </label>
                                      <FormControl className="col">
                                        <RadioGroup
                                          row
                                          aria-labelledby="demo-row-radio-buttons-group-label"
                                          name="row-radio-buttons-group"
                                          handleSecondVerifiedOptionChange
                                          value={secondVerified}
                                          onChange={
                                            handleSecondVerifiedOptionChange
                                          }
                                        >
                                          <FormControlLabel
                                            value="true"
                                            control={<Radio />}
                                            label="Yes"
                                          />
                                          <FormControlLabel
                                            value="false"
                                            control={<Radio />}
                                            label="No"
                                          />
                                        </RadioGroup>
                                      </FormControl>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="btn-box d-flex">
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

                                <button
                                  type="button"
                                  className="blue-btn-default btn-sm"
                                  onClick={() => setPageNo(2)}
                                >
                                  Next
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
          )}
          {pageNo === 2 && (
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
                                  <h6 className="form-label">Client Address</h6>

                                  <div className="form-box-inner col-lg-6 col-md-6 mb-4">
                                    <div className="input-box">
                                      <label className="form-label">
                                        Address 1
                                      </label>
                                      <Textarea
                                        minRows={3}
                                        value={address1}
                                        onChange={(e) => {
                                          setAddress1(e.target.value);
                                        }}
                                      />
                                    </div>
                                  </div>
                                  <div className="form-box-inner col-lg-6 col-md-6 mb-4">
                                    <div className="input-box">
                                      <label className="form-label">
                                        Address 2
                                      </label>
                                      <Textarea
                                        minRows={3}
                                        value={address2}
                                        onChange={(e) => {
                                          setAddress2(e.target.value);
                                        }}
                                      />
                                    </div>
                                  </div>
                                  <div className="form-box-inner col-lg-6 col-md-6 mb-4">
                                    <div className="input-box">
                                      <label className="form-label">City</label>
                                      <input
                                        type="text"
                                        placeholder={"Enter City"}
                                        value={city}
                                        onChange={(e) => {
                                          setCity(e.target.value);
                                        }}
                                      />
                                    </div>
                                  </div>
                                  <div className="form-box-inner col-lg-6 col-md-6 mb-4">
                                    <div className="input-box">
                                      <label className="form-label">Zip</label>
                                      <input
                                        type="text"
                                        placeholder={"Enter Zip Code"}
                                        value={zip}
                                        onChange={(e) => {
                                          setZip(e.target.value);
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="card">
                                <div className="row">
                                  <div className="form-box-inner col-lg-6 col-md-6 mb-4">
                                    <div className="input-box">
                                      <label className="form-label">
                                        Approved Hours/Week
                                      </label>
                                      <input
                                        type="text"
                                        placeholder={
                                          "Enter Approved Hours/Week"
                                        }
                                        value={approvedHoursWeek}
                                        onChange={(e) => {
                                          setApprovedHoursWeek(e.target.value);
                                        }}
                                      />
                                    </div>
                                  </div>
                                  <div className="form-box-inner col-lg-6 col-md-6 mb-4">
                                    <div className="input-box">
                                      <label className="form-label">
                                        total Approved Hours
                                      </label>
                                      <input
                                        type="number"
                                        placeholder={"Enter Approved Hours"}
                                        value={totalApprovedHours}
                                        onChange={(e) => {
                                          setTotalApprovedHours(e.target.value);
                                        }}
                                      />
                                    </div>
                                  </div>
                                  <div className="form-box-inner col-lg-6 col-md-6 mb-4">
                                    <div className="input-box">
                                      <label className="form-label">
                                        Total Unit Worked
                                      </label>
                                      <input
                                        type="text"
                                        placeholder={"Enter Total Unit Worked"}
                                        value={totalUnitWorked}
                                        onChange={(e) => {
                                          setTotalUnitWorked(e.target.value);
                                        }}
                                      />
                                    </div>
                                  </div>
                                  <div className="form-box-inner col-lg-6 col-md-6 mb-4">
                                    <div className="input-box">
                                      <label className="form-label">
                                        Total Houres Worked
                                      </label>
                                      <input
                                        type="text"
                                        placeholder={"Enter Total Unit Worked"}
                                        value={totalHouresWorked}
                                        onChange={(e) => {
                                          setTotalHouresWorked(e.target.value);
                                        }}
                                      />
                                    </div>
                                  </div>
                                  <div className="form-box-inner col-lg-6 col-md-6 mb-4">
                                    <div className="input-box">
                                      <label className="form-label">
                                        Total Houres/Week Worked (EVV)
                                      </label>
                                      <input
                                        type="text"
                                        placeholder={
                                          "Enter Total Houres/Week Worked"
                                        }
                                        value={totalHouresWeekWorked}
                                        onChange={(e) => {
                                          setTotalHouresWeekWorked(
                                            e.target.value
                                          );
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="btn-box d-flex">
                                <button
                                  type="button"
                                  className="blue-btn-default btn-sm btn-outline-gray"
                                  onClick={() => setPageNo(1)}
                                >
                                  Cancel
                                </button>
                                <button
                                  type="button"
                                  className="blue-btn-default btn-sm"
                                  onClick={() => setPageNo(3)}
                                >
                                  Next
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
          )}
          {pageNo === 3 && (
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
                                  <h6 className="form-label">
                                    Remaning Authorization
                                  </h6>

                                  <div className="form-box-inner col-lg-6 col-md-6 mb-4">
                                    <div className="input-box">
                                      <label className="form-label">
                                        Unit Remaning
                                      </label>
                                      <input
                                        type="text"
                                        placeholder={"Enter Unit Remaning"}
                                        value={unitRemaining}
                                        readOnly
                                      />
                                    </div>
                                  </div>
                                  <div className="form-box-inner col-lg-6 col-md-6 mb-4">
                                    <div className="input-box">
                                      <label className="form-label">
                                        Total Hours Remaning
                                      </label>
                                      <input
                                        type="text"
                                        placeholder={
                                          "Enter Total Hours Remaning"
                                        }
                                        value={totalHoursRemaining}
                                        readOnly
                                      />
                                    </div>
                                  </div>
                                  <div className="form-box-inner col-lg-6 col-md-6 mb-4">
                                    <div className="input-box">
                                      <label className="form-label">
                                        Total Hours/Week Worked (EVV)
                                      </label>
                                      <input
                                        type="text"
                                        placeholder={
                                          "Enter Total Hours/Week Worked"
                                        }
                                        value={totalhoursWeekWorked}
                                        readOnly
                                      />
                                    </div>
                                  </div>
                                  <div className="form-box-inner col-lg-6 col-md-6 mb-4">
                                    <div className="input-box">
                                      <label className="form-label">
                                        Week Remaning
                                      </label>
                                      <input
                                        type="text"
                                        value={totalHoursRemaining}
                                        placeholder={"Enter Week Remaning"}
                                        readOnly
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="btn-box d-flex">
                                <button
                                  type="button"
                                  className="blue-btn-default btn-sm btn-outline-gray"
                                  onClick={() => setPageNo(2)}
                                >
                                  Cancel
                                </button>
                                <button
                                  type="button"
                                  className="blue-btn-default btn-sm"
                                  onClick={handleSubmit}
                                >
                                  Save
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
          )}
        </div>
      </div>
    </div>
  );
};

export default AddAuthorizationManagement;
