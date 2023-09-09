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
import { Link, useNavigate, useParams } from "react-router-dom";
import { Validation } from "../../../helpers/validation.js";
import {
  createClientAction,
  ViewClientAction,
} from "../../../redux/actions/user";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import Axios from "axios";
import { Select, MenuItem, InputLabel } from "@mui/material";
import dayjs from "dayjs";

const ViewEmployee = () => {
    const { id } = useParams();
  const [employeeName, setEmployeeName] = useState("");

  const [EvvName, setEvvName] = useState("");

  const [santraxID, setSantraxID] = useState();
  const [roleId, setRoleId] = useState(0);
  const [DOB, setDOB] = useState(null);
  const [hireDate, setHireDate] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [socialSecurity, setSocialSecurity] = useState("");
  const [supervisorName, setSupervisorName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState(""); /*not used in payload */

  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [county, setCounty] = useState("");
  const [zip, setZip] = useState("");
  const [stateDropdownData, setStateDropdownData] = useState([]);
  const [stateId, setStateId] = useState("");
  const [email, setEmail] = useState("");
  const [degree, setDegree] = useState("");

  const [carInsuranceExpirationDate, setCarInsuranceExpirationDate] =
    useState(null);
  const [licenseExpireDate, setLicenseExpireDate] = useState(null);
  const [secondFormOfId, setSecondFormOfId] = useState("");
  const [mandatedReporterExpirationDate, setMandatedReporterExpirationDate] =
    useState(null);
  const [professionalBHPOnFile, setProfessionalBHPOnFile] = useState("");
  const [fullBHPCertificationOnFile, setFullBHPCertificationOnFile] =
    useState("");
  const [cprFirstAidOnFile, setCprFirstAidOnFile] = useState("");

  const [bloodBorneOnFile, setBloodBorneOnFile] = useState("");
  const [directCareWorkerOnFile, setDirectCareWorkerOnFile] = useState("");
  const [sexOffenderCheckOnFile, setSexOffenderCheckOnFile] = useState("");
  const [debarmentCheckOnFile, setDebarmentCheckOnFile] = useState("");
  const [providerExclusionOnFile, setProviderExclusionOnFile] = useState("");
  const [criminalBackgroundCheckOnFile, setCriminalBackgroundCheckOnFile] =
    useState("");

  const [payrollEnrollmentFormOnFile, setPayrollEnrollmentFormOnFile] =
    useState("");
  const [timeOffOnFile, setTimeOffOnFile] = useState("");
  const [confidentialityOnFile, setConfidentialityOnFile] = useState("");
  const [employeeHandBookAcknowledgement, setEmployeeHandBookAcknowledgement] =
    useState("");
  const [i9, setI9] = useState("");
  const [w4, setW4] = useState("");

  const [motorVehicleExpirationDate, setMotorVehicleExpirationDate] =
    useState(null);
  const [licenseState, setLicenseState] = useState("");
  const [pictureRelease, setPictureRelease] = useState("");
  const [notes, setNotes] = useState("");

  const [selectDocumentType, setSelectDocumentType] = useState("");
  const [selectExpirationDate, setSelectExpirationDate] = useState(null);
  // const [fullBHPCertificationOnFile, setFullBHPCertificationOnFile] = useState("");

  const [showSidebar, SetShowSidebar] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const updateSidebar = () => {
    SetShowSidebar(!showSidebar);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const roleDropdownOptions = [
    { id: 4, value: "caregiver" },
    { id: 3, value: "supervisor" },
  ];

  const pictureReleaseDropdownOptions = [
    { label: "All", value: "all" },
    { label: "NA", value: "NA" },
    { label: "None", value: "none" },
    { label: "Office Only", value: "office only" },
    { label: "Yes", value: "yes" },
  ];

  const handleRoleDropdownChange = (event) => {
    setRoleId(event.target.value);
  };

  const DropdownOptions = [
    { label: "Yes", value: "Yes" },
    { label: "No", value: "No" },
    { label: "NA", value: "NA" },
  ];

  const handleProfessionalBHPDropdownChange = (event) => {
    setProfessionalBHPOnFile(event.target.value);
  };

  const handleFullBHPCertificationDropdownChange = (event) => {
    setFullBHPCertificationOnFile(event.target.value);
  };

  const handleCprFirstAidDropdownChange = (event) => {
    setCprFirstAidOnFile(event.target.value);
  };

  const handleBloodBorneDropdownChange = (event) => {
    setBloodBorneOnFile(event.target.value);
  };

  const handleDirectCareWorkerDropdownChange = (event) => {
    setDirectCareWorkerOnFile(event.target.value);
  };

  const handleSexOffenderCheckDropdownChange = (event) => {
    setSexOffenderCheckOnFile(event.target.value);
  };

  const handleDebarmentCheckDropdownChange = (event) => {
    setDebarmentCheckOnFile(event.target.value);
  };

  const handleProviderExclusionDropdownChange = (event) => {
    setProviderExclusionOnFile(event.target.value);
  };

  const handleCriminalBackgroundDropdownChange = (event) => {
    setCriminalBackgroundCheckOnFile(event.target.value);
  };

  const handlePayrollEnrollmentDropdownChange = (event) => {
    setPayrollEnrollmentFormOnFile(event.target.value);
  };

  const handleTimeOffDropdownChange = (event) => {
    setTimeOffOnFile(event.target.value);
  };

  const handleConfidentialityDropdownChange = (event) => {
    setConfidentialityOnFile(event.target.value);
  };
  const handleEmployeeHandBookAcknowledgementDropdownChange = (event) => {
    setEmployeeHandBookAcknowledgement(event.target.value);
  };

  const handleI9DropdownChange = (event) => {
    setI9(event.target.value);
  };
  const handleW4DropdownChange = (event) => {
    setW4(event.target.value);
  };

  const handlePictureReleaseDropdownChange = (event) => {
    setPictureRelease(event.target.value);
  };

  useEffect(() => {
    let aHeader = localStorage.getItem("BackToBasic-token");
    Axios.get(`http://122.176.101.76:9000/api/Employee/GetEmployee?id=${id}`, {
      headers: {
        authorization: `Bearer ${aHeader}`,
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => {
        setEmployeeName(res.data.response.employee_name_preferred_format);
        setEvvName(res.data.response.employee_name_sandata_format);
        setSantraxID(res.data.response.santrax_id);
        setRoleId(res.data.response.role_id);
        // let genderId = client_genderDData.filter(x => x.name == res.data.response.client_gender)[0].id;
        // setClientGenderId(genderId);
        setPhoneNumber(res.data.response.phone_number);
        setSocialSecurity(res.data.response.social_security_number);
        setSupervisorName(res.data.response.supervisorName);
        setConfirmPassword(res.data.response.password);

        setAddress1(res.data.response.address1);
        setAddress2(res.data.response.address2);
        setCity(res.data.response.city);
        setCounty(res.data.response.county);
        setZip(res.data.response.zipcode);
        setStateId(res.data.response.state);
        setEmail(res.data.response.email);
        setDegree(res.data.response.degree);
        setSecondFormOfId(res.data.response.second_form_of_identification);
        setProfessionalBHPOnFile(
          res.data.response.professional_bhp_certification_On_file
        );
        setFullBHPCertificationOnFile(
          res.data.response.bhp_certification_on_file
        );
        setCprFirstAidOnFile(res.data.response.cpr_first_aid_on_file);
        setBloodBorneOnFile(
          res.data.response.blood_borne_pathogens_training_certificate_on_file
        );
        setDirectCareWorkerOnFile(
          res.data.response.direct_care_worker_record_on_file
        );
        setSexOffenderCheckOnFile(res.data.response.sex_offender_check_on_file);
        setDebarmentCheckOnFile(res.data.response.debarment_check_on_file);
        setProviderExclusionOnFile(
          res.data.response.provider_exclusion_on_file
        );
        setCriminalBackgroundCheckOnFile(
          res.data.response.criminal_background_check_on_file
        );
        setPayrollEnrollmentFormOnFile(
          res.data.response.payroll_enrollment_form_on_file
        );
        setTimeOffOnFile(res.data.response.time_off_policy_on_file);
        setConfidentialityOnFile(
          res.data.response.confidentiality_agreement_on_file
        );
        setEmployeeHandBookAcknowledgement(
          res.data.response.employee_handBook_acknowledgement_on_file
        );
        setI9(res.data.response.i9_on_file);
        setW4(res.data.response.w4_on_file);
        setLicenseState(res.data.response.driver_license_state);
        setPictureRelease(res.data.response.picture_release_on_file);
        setNotes(res.data.response.notes);

        if (
          res.data &&
          res.data.response &&
          res.data.response.car_insurance_expiration_date
        ) {
          setCarInsuranceExpirationDate(
            dayjs(res.data.response.car_insurance_expiration_date)
          );
        }
        if (res.data && res.data.response && res.data.response.date_of_birth) {
          setDOB(dayjs(res.data.response.date_of_birth));
        }
        if (
          res.data &&
          res.data.response &&
          res.data.response.license_expiration_date
        ) {
          setLicenseExpireDate(
            dayjs(res.data.response.license_expiration_date)
          );
        }
        if (res.data && res.data.response && res.data.response.hire_date) {
          setHireDate(dayjs(res.data.response.hire_date));
        }
        if (
          res.data &&
          res.data.response &&
          res.data.response
            .mandated_reporter_training_certificate_expiration_date
        ) {
          setMandatedReporterExpirationDate(
            dayjs(
              res.data.response
                .mandated_reporter_training_certificate_expiration_date
            )
          );
        }
        if (
          res.data &&
          res.data.response &&
          res.data.response.motor_vehicle_background_check_expiration_date
        ) {
          setMotorVehicleExpirationDate(
            dayjs(
              res.data.response.motor_vehicle_background_check_expiration_date
            )
          );
        }
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
            title="Add/Edit Employee Information"
            updateSidebar={updateSidebar}
          />
          {/*--- firstPage--- */}

          {pageNo === 1 && (
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
                                <div className="form-box-inner col-lg-4 col-md-6 mb-3">
                                  <div className="input-box">
                                    <label className="form-label">
                                      Employee Name
                                    </label>
                                    <input
                                      type="text"
                                      placeholder={"type your name"}
                                      value={employeeName}
                                      onChange={(e) => {
                                        setEmployeeName(e.target.value);
                                      }}
                                    />
                                  </div>
                                </div>
                                <div className="form-box-inner col-lg-4 col-md-6 mb-3">
                                  <div className="input-box">
                                    <label className="form-label">
                                      EVV Name
                                    </label>
                                    <input
                                      type="text"
                                      placeholder={"type your name"}
                                      value={EvvName}
                                      onChange={(e) => {
                                        setEvvName(e.target.value);
                                      }}
                                    />
                                  </div>
                                </div>
                                <div className="form-box-inner col-lg-4 col-md-6 mb-3">
                                  <div className="input-box">
                                    <label className="form-label">
                                      Santrax ID
                                    </label>
                                    <input
                                      type="text"
                                      placeholder={"type your name"}
                                      value={santraxID}
                                      onChange={(e) => {
                                        setSantraxID(e.target.value);
                                      }}
                                    />
                                  </div>
                                </div>
                                <div className="form-box-inner col-lg-4 col-md-6 mb-3">
                                  <div className="input-box">
                                    <label className="form-label">Role</label>
                                    {/* <input
                                          type="text"
                                          placeholder={"type your name"}
                                          value={role}
                                          onChange={(e) => {
                                            setRole(e.target.value);
                                          }}
                                        /> */}
                                    <Select
                                      value={roleId}
                                      onChange={handleRoleDropdownChange}
                                      sx={{ width: 300 }}
                                      //displayEmpty
                                    >
                                      {roleDropdownOptions.map((option) => (
                                        <MenuItem
                                          key={option.id}
                                          value={option.id}
                                        >
                                          {option.value}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  </div>
                                </div>
                                <div className="form-box-inner col-lg-4 col-md-6 mb-3">
                                  <div className="input-box">
                                    <label className="form-label">
                                      Date Of Birth
                                    </label>
                                    <div class="col-sm-10">
                                      <LocalizationProvider
                                        dateAdapter={AdapterDayjs}
                                      >
                                        <DesktopDatePicker
                                          orientation="landscape"
                                          openTo="day"
                                          value={DOB}
                                          onChange={(date) => {
                                            setDOB(date);
                                          }}
                                          renderInput={(params) => (
                                            <TextField {...params} />
                                          )}
                                        />
                                      </LocalizationProvider>
                                    </div>
                                  </div>
                                </div>

                                <div className="form-box-inner col-lg-4 col-md-6 mb-3">
                                  <div className="input-box">
                                    <label className="form-label">
                                      Hire Date
                                    </label>
                                    <div class="col-sm-10">
                                      <LocalizationProvider
                                        dateAdapter={AdapterDayjs}
                                      >
                                        <DesktopDatePicker
                                          orientation="landscape"
                                          openTo="day"
                                          value={hireDate}
                                          onChange={(date) => {
                                            setHireDate(date);
                                          }}
                                          renderInput={(params) => (
                                            <TextField {...params} />
                                          )}
                                        />
                                      </LocalizationProvider>
                                    </div>
                                  </div>
                                </div>

                                <div className="form-box-inner col-lg-4 col-md-6 mb-3">
                                  <div className="input-box">
                                    <label className="form-label">
                                      Phone Number
                                    </label>
                                    <input
                                      type="text"
                                      placeholder={"type your name"}
                                      value={phoneNumber}
                                      onChange={(e) => {
                                        setPhoneNumber(e.target.value);
                                      }}
                                    />
                                  </div>
                                </div>
                                <div className="form-box-inner col-lg-4 col-md-6 mb-3">
                                  <div className="input-box">
                                    <label className="form-label">
                                      Social Security
                                    </label>
                                    <input
                                      type="text"
                                      placeholder={"type your name"}
                                      value={socialSecurity}
                                      onChange={(e) => {
                                        setSocialSecurity(e.target.value);
                                      }}
                                    />
                                  </div>
                                </div>
                                <div className="form-box-inner col-lg-4 col-md-6 mb-3">
                                  <div className="input-box">
                                    <label className="form-label">
                                      Supervisor Name
                                    </label>
                                    <input
                                      type="text"
                                      placeholder={"type your name"}
                                      value={supervisorName}
                                      onChange={(e) => {
                                        setSupervisorName(e.target.value);
                                      }}
                                    />
                                  </div>
                                </div>
                                <div className="form-box-inner col-lg-4 col-md-6 mb-3">
                                  <div className="input-box">
                                    <label className="form-label">
                                      Password
                                    </label>
                                    <input
                                      type="text"
                                      placeholder={"type your name"}
                                      value={password}
                                      onChange={(e) => {
                                        setPassword(e.target.value);
                                      }}
                                    />
                                  </div>
                                </div>
                                <div className="form-box-inner col-lg-4 col-md-6 mb-3">
                                  <div className="input-box">
                                    <label className="form-label">
                                      Confirm Password
                                    </label>
                                    <input
                                      type="text"
                                      placeholder={"type your name"}
                                      value={confirmPassword}
                                      onChange={(e) => {
                                        setConfirmPassword(e.target.value);
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </form>
                          </div>

                          <button
                            style={{}}
                            type="button"
                            className="blue-btn-default"
                            onClick={() => setPageNo(2)}
                          >
                            Next
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* [/Card] */}
                </div>
              </div>
            </div>
          )}

          {/*--- SecondPage--- */}
          {pageNo === 2 && (
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
                                <div className="form-box-inner col-lg-4 col-md-6 mb-3">
                                  <div className="input-box">
                                    <label className="form-label">
                                      Address1
                                    </label>
                                    <input
                                      type="text"
                                      placeholder={"type your name"}
                                      value={address1}
                                      onChange={(e) => {
                                        setAddress1(e.target.value);
                                      }}
                                    />
                                  </div>
                                </div>
                                <div className="form-box-inner col-lg-4 col-md-6 mb-3">
                                  <div className="input-box">
                                    <label className="form-label">
                                      Address2
                                    </label>
                                    <input
                                      type="text"
                                      placeholder={"type your name"}
                                      value={address2}
                                      onChange={(e) => {
                                        setAddress2(e.target.value);
                                      }}
                                    />
                                  </div>
                                </div>
                                <div className="form-box-inner col-lg-4 col-md-6 mb-3">
                                  <div className="input-box">
                                    <label className="form-label">City</label>
                                    <input
                                      type="text"
                                      placeholder={"type your name"}
                                      value={city}
                                      onChange={(e) => {
                                        setCity(e.target.value);
                                      }}
                                    />
                                  </div>
                                </div>
                                <div className="form-box-inner col-lg-4 col-md-6 mb-3">
                                  <div className="input-box">
                                    <label className="form-label">County</label>
                                    <input
                                      type="text"
                                      placeholder={"type your name"}
                                      value={county}
                                      onChange={(e) => {
                                        setCounty(e.target.value);
                                      }}
                                    />
                                  </div>
                                </div>
                                <div className="form-box-inner col-lg-4 col-md-6 mb-3">
                                  <div className="input-box">
                                    <label className="form-label">Zip</label>
                                    <input
                                      type="text"
                                      placeholder={"type your name"}
                                      value={zip}
                                      onChange={(e) => {
                                        setZip(e.target.value);
                                      }}
                                    />
                                  </div>
                                </div>
                                <div className="form-box-inner col-lg-4 col-md-6 mb-3">
                                  <div className="input-box">
                                    <label className="form-label">State</label>
                                    <input
                                      type="text"
                                      placeholder={"type your name"}
                                      value={stateId}
                                      onChange={(e) => {
                                        setStateId(e.target.value);
                                      }}
                                    />
                                  </div>
                                </div>
                                <div className="form-box-inner col-lg-4 col-md-6 mb-3">
                                  <div className="input-box">
                                    <label className="form-label">Email</label>
                                    <input
                                      type="text"
                                      placeholder={"type your name"}
                                      value={email}
                                      onChange={(e) => {
                                        setEmail(e.target.value);
                                      }}
                                    />
                                  </div>
                                </div>
                                <div className="form-box-inner col-lg-4 col-md-6 mb-3">
                                  <div className="input-box">
                                    <label className="form-label">
                                      Phone Number
                                    </label>
                                    <input
                                      type="text"
                                      placeholder={"type your name"}
                                      value={phoneNumber}
                                      onChange={(e) => {
                                        setPhoneNumber(e.target.value);
                                      }}
                                    />
                                  </div>
                                </div>
                                <div className="form-box-inner col-lg-4 col-md-6 mb-3">
                                  <div className="input-box">
                                    <label className="form-label">Degree</label>
                                    <input
                                      type="text"
                                      placeholder={"type your name"}
                                      value={degree}
                                      onChange={(e) => {
                                        setDegree(e.target.value);
                                      }}
                                    />
                                  </div>
                                </div>
                                {/* //uploadDocument */}
                              </div>
                              <button
                                type="button"
                                className="blue-btn-default"
                                onClick={() => setPageNo(1)}
                              >
                                Back
                              </button>
                              <button
                                style={{ marginLeft: 246, marginTop: -52 }}
                                type="button"
                                className="blue-btn-default"
                                onClick={() => setPageNo(3)}
                              >
                                Next
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
          )}
          {/*--- third page--- */}

          {pageNo === 3 && (
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
                                <div className="form-box-inner col-lg-4 col-md-6 mb-3">
                                  <div className="input-box">
                                    <label className="form-label">
                                      Car Insurance Expiration Date
                                    </label>
                                    <div class="col-sm-10">
                                      <LocalizationProvider
                                        dateAdapter={AdapterDayjs}
                                      >
                                        <DesktopDatePicker
                                          orientation="landscape"
                                          openTo="day"
                                          value={carInsuranceExpirationDate}
                                          onChange={(date) => {
                                            setCarInsuranceExpirationDate(date);
                                          }}
                                          renderInput={(params) => (
                                            <TextField {...params} />
                                          )}
                                        />
                                      </LocalizationProvider>
                                    </div>
                                  </div>
                                </div>

                                <div className="form-box-inner col-lg-4 col-md-6 mb-3">
                                  <div className="input-box">
                                    <label className="form-label">
                                      License Expire Date
                                    </label>
                                    <div class="col-sm-10">
                                      <LocalizationProvider
                                        dateAdapter={AdapterDayjs}
                                      >
                                        <DesktopDatePicker
                                          orientation="landscape"
                                          openTo="day"
                                          value={licenseExpireDate}
                                          onChange={(date) => {
                                            setLicenseExpireDate(date);
                                          }}
                                          renderInput={(params) => (
                                            <TextField {...params} />
                                          )}
                                        />
                                      </LocalizationProvider>
                                    </div>
                                  </div>
                                </div>

                                <div className="form-box-inner col-lg-4 col-md-6 mb-3">
                                  <div className="input-box">
                                    <label className="form-label">
                                      2nd Form Of ID
                                    </label>
                                    <input
                                      type="text"
                                      placeholder={"type your name"}
                                      value={secondFormOfId}
                                      onChange={(e) => {
                                        setSecondFormOfId(e.target.value);
                                      }}
                                    />
                                  </div>
                                </div>

                                <div className="form-box-inner col-lg-4 col-md-6 mb-3">
                                  <div className="input-box">
                                    <label className="form-label">
                                      Mandated Reporter Expiration Date
                                    </label>
                                    <div class="col-sm-10">
                                      <LocalizationProvider
                                        dateAdapter={AdapterDayjs}
                                      >
                                        <DesktopDatePicker
                                          orientation="landscape"
                                          openTo="day"
                                          value={mandatedReporterExpirationDate}
                                          onChange={(date) => {
                                            setMandatedReporterExpirationDate(
                                              date
                                            );
                                          }}
                                          renderInput={(params) => (
                                            <TextField {...params} />
                                          )}
                                        />
                                      </LocalizationProvider>
                                    </div>
                                  </div>
                                </div>

                                <div className="form-box-inner col-lg-4 col-md-6 mb-3">
                                  <div className="input-box">
                                    <label className="form-label">
                                      Professional BHP On File
                                    </label>

                                    <Select
                                      value={professionalBHPOnFile}
                                      onChange={
                                        handleProfessionalBHPDropdownChange
                                      }
                                      sx={{ width: 300 }}
                                      //displayEmpty
                                    >
                                      {DropdownOptions.map((option) => (
                                        <MenuItem
                                          key={option.value}
                                          value={option.value}
                                        >
                                          {option.label}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  </div>
                                </div>

                                <div className="form-box-inner col-lg-4 col-md-6 mb-3">
                                  <div className="input-box">
                                    <label className="form-label">
                                      Full BHP Certification On File
                                    </label>
                                    <Select
                                      value={fullBHPCertificationOnFile}
                                      onChange={
                                        handleFullBHPCertificationDropdownChange
                                      }
                                      sx={{ width: 300 }}
                                      //displayEmpty
                                    >
                                      {DropdownOptions.map((option) => (
                                        <MenuItem
                                          key={option.value}
                                          value={option.value}
                                        >
                                          {option.label}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  </div>
                                </div>
                                <div className="form-box-inner col-lg-4 col-md-6 mb-3">
                                  <div className="input-box">
                                    <label className="form-label">
                                      Set Cpr First Aid On File
                                    </label>
                                    <Select
                                      value={cprFirstAidOnFile}
                                      onChange={handleCprFirstAidDropdownChange}
                                      sx={{ width: 300 }}
                                      //displayEmpty
                                    >
                                      {DropdownOptions.map((option) => (
                                        <MenuItem
                                          key={option.value}
                                          value={option.value}
                                        >
                                          {option.label}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  </div>
                                </div>

                                {/* //uploadDocument */}
                              </div>
                            </form>
                          </div>
                          <button
                            style={{}}
                            type="button"
                            className="blue-btn-default"
                            onClick={() => setPageNo(2)}
                          >
                            Back
                          </button>
                          <button
                            style={{ marginLeft: 246, marginTop: -52 }}
                            type="button"
                            className="blue-btn-default"
                            onClick={() => setPageNo(4)}
                          >
                            Next
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* [/Card] */}
                </div>
              </div>
            </div>
          )}

          {pageNo === 4 && (
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
                                <div className="form-box-inner col-lg-4 col-md-6 mb-3">
                                  <div className="input-box">
                                    <label className="form-label">
                                      Blood Borne On File
                                    </label>
                                    <Select
                                      value={bloodBorneOnFile}
                                      onChange={handleBloodBorneDropdownChange}
                                      sx={{ width: 300 }}
                                      //displayEmpty
                                    >
                                      {DropdownOptions.map((option) => (
                                        <MenuItem
                                          key={option.value}
                                          value={option.value}
                                        >
                                          {option.label}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  </div>
                                </div>

                                <div className="form-box-inner col-lg-4 col-md-6 mb-3">
                                  <div className="input-box">
                                    <label className="form-label">
                                      Direct Care Worker On File
                                    </label>
                                    <Select
                                      value={directCareWorkerOnFile}
                                      onChange={
                                        handleDirectCareWorkerDropdownChange
                                      }
                                      sx={{ width: 300 }}
                                      //displayEmpty
                                    >
                                      {DropdownOptions.map((option) => (
                                        <MenuItem
                                          key={option.value}
                                          value={option.value}
                                        >
                                          {option.label}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  </div>
                                </div>

                                <div className="form-box-inner col-lg-4 col-md-6 mb-3">
                                  <div className="input-box">
                                    <label className="form-label">
                                      Sex Offender Check On File
                                    </label>
                                    <Select
                                      value={sexOffenderCheckOnFile}
                                      onChange={
                                        handleSexOffenderCheckDropdownChange
                                      }
                                      sx={{ width: 300 }}
                                      //displayEmpty
                                    >
                                      {DropdownOptions.map((option) => (
                                        <MenuItem
                                          key={option.value}
                                          value={option.value}
                                        >
                                          {option.label}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  </div>
                                </div>

                                <div className="form-box-inner col-lg-4 col-md-6 mb-3">
                                  <div className="input-box">
                                    <label className="form-label">
                                      Debarment Check On File
                                    </label>
                                    <Select
                                      value={debarmentCheckOnFile}
                                      onChange={
                                        handleDebarmentCheckDropdownChange
                                      }
                                      sx={{ width: 300 }}
                                      //displayEmpty
                                    >
                                      {DropdownOptions.map((option) => (
                                        <MenuItem
                                          key={option.value}
                                          value={option.value}
                                        >
                                          {option.label}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  </div>
                                </div>

                                <div className="form-box-inner col-lg-4 col-md-6 mb-3">
                                  <div className="input-box">
                                    <label className="form-label">
                                      Provider Exclusion On File
                                    </label>
                                    <Select
                                      value={providerExclusionOnFile}
                                      onChange={
                                        handleProviderExclusionDropdownChange
                                      }
                                      sx={{ width: 300 }}
                                      //displayEmpty
                                    >
                                      {DropdownOptions.map((option) => (
                                        <MenuItem
                                          key={option.value}
                                          value={option.value}
                                        >
                                          {option.label}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  </div>
                                </div>

                                <div className="form-box-inner col-lg-4 col-md-6 mb-3">
                                  <div className="input-box">
                                    <label className="form-label">
                                      Criminal Background Check On File
                                    </label>
                                    <Select
                                      value={criminalBackgroundCheckOnFile}
                                      onChange={
                                        handleCriminalBackgroundDropdownChange
                                      }
                                      sx={{ width: 300 }}
                                      //displayEmpty
                                    >
                                      {DropdownOptions.map((option) => (
                                        <MenuItem
                                          key={option.value}
                                          value={option.value}
                                        >
                                          {option.label}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  </div>
                                </div>

                                {/* //uploadDocument */}
                              </div>
                            </form>
                          </div>
                          <button
                            style={{}}
                            type="button"
                            className="blue-btn-default"
                            onClick={() => setPageNo(3)}
                          >
                            Back
                          </button>
                          <button
                            style={{ marginLeft: 246, marginTop: -52 }}
                            type="button"
                            className="blue-btn-default"
                            onClick={() => setPageNo(5)}
                          >
                            Next
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* [/Card] */}
                </div>
              </div>
            </div>
          )}

          {pageNo === 5 && (
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
                                <div className="form-box-inner col-lg-4 col-md-6 mb-3">
                                  <div className="input-box">
                                    <label className="form-label">
                                      Payroll Enrollment Form On File
                                    </label>
                                    <Select
                                      value={payrollEnrollmentFormOnFile}
                                      onChange={
                                        handlePayrollEnrollmentDropdownChange
                                      }
                                      sx={{ width: 300 }}
                                      //displayEmpty
                                    >
                                      {DropdownOptions.map((option) => (
                                        <MenuItem
                                          key={option.value}
                                          value={option.value}
                                        >
                                          {option.label}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  </div>
                                </div>

                                <div className="form-box-inner col-lg-4 col-md-6 mb-3">
                                  <div className="input-box">
                                    <label className="form-label">
                                      Time Off On File
                                    </label>
                                    <Select
                                      value={timeOffOnFile}
                                      onChange={handleTimeOffDropdownChange}
                                      sx={{ width: 300 }}
                                      //displayEmpty
                                    >
                                      {DropdownOptions.map((option) => (
                                        <MenuItem
                                          key={option.value}
                                          value={option.value}
                                        >
                                          {option.label}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  </div>
                                </div>

                                <div className="form-box-inner col-lg-4 col-md-6 mb-3">
                                  <div className="input-box">
                                    <label className="form-label">
                                      Confidentiality On File
                                    </label>
                                    <Select
                                      value={confidentialityOnFile}
                                      onChange={
                                        handleConfidentialityDropdownChange
                                      }
                                      sx={{ width: 300 }}
                                      //displayEmpty
                                    >
                                      {DropdownOptions.map((option) => (
                                        <MenuItem
                                          key={option.value}
                                          value={option.value}
                                        >
                                          {option.label}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  </div>
                                </div>

                                <div className="form-box-inner col-lg-4 col-md-6 mb-3">
                                  <div className="input-box">
                                    <label className="form-label">
                                      Employee HandBook Acknowledgement
                                    </label>
                                    <Select
                                      value={employeeHandBookAcknowledgement}
                                      onChange={
                                        handleEmployeeHandBookAcknowledgementDropdownChange
                                      }
                                      sx={{ width: 300 }}
                                      //displayEmpty
                                    >
                                      {DropdownOptions.map((option) => (
                                        <MenuItem
                                          key={option.value}
                                          value={option.value}
                                        >
                                          {option.label}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  </div>
                                </div>

                                <div className="form-box-inner col-lg-4 col-md-6 mb-3">
                                  <div className="input-box">
                                    <label className="form-label">I9</label>
                                    <Select
                                      value={i9}
                                      onChange={handleI9DropdownChange}
                                      sx={{ width: 300 }}
                                      //displayEmpty
                                    >
                                      {DropdownOptions.map((option) => (
                                        <MenuItem
                                          key={option.value}
                                          value={option.value}
                                        >
                                          {option.label}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  </div>
                                </div>

                                <div className="form-box-inner col-lg-4 col-md-6 mb-3">
                                  <div className="input-box">
                                    <label className="form-label">W4</label>
                                    <Select
                                      value={w4}
                                      onChange={handleW4DropdownChange}
                                      sx={{ width: 300 }}
                                      //displayEmpty
                                    >
                                      {DropdownOptions.map((option) => (
                                        <MenuItem
                                          key={option.value}
                                          value={option.value}
                                        >
                                          {option.label}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  </div>
                                </div>

                                {/* //uploadDocument */}
                              </div>
                            </form>
                          </div>
                          <button
                            style={{}}
                            type="button"
                            className="blue-btn-default"
                            onClick={() => setPageNo(4)}
                          >
                            Back
                          </button>
                          <button
                            style={{ marginLeft: 246, marginTop: -52 }}
                            type="button"
                            className="blue-btn-default"
                            onClick={() => setPageNo(6)}
                          >
                            Next
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* [/Card] */}
                </div>
              </div>
            </div>
          )}

          {pageNo === 6 && (
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
                                <div className="form-box-inner col-lg-4 col-md-6 mb-3">
                                  <div className="input-box">
                                    <label className="form-label">
                                      Motor Vehicle Expiration Date
                                    </label>
                                    <div class="col-sm-10">
                                      <LocalizationProvider
                                        dateAdapter={AdapterDayjs}
                                      >
                                        <DesktopDatePicker
                                          orientation="landscape"
                                          openTo="day"
                                          value={motorVehicleExpirationDate}
                                          onChange={(date) => {
                                            setMotorVehicleExpirationDate(date);
                                          }}
                                          renderInput={(params) => (
                                            <TextField {...params} />
                                          )}
                                        />
                                      </LocalizationProvider>
                                    </div>
                                  </div>
                                </div>

                                <div className="form-box-inner col-lg-4 col-md-6 mb-3">
                                  <div className="input-box">
                                    <label className="form-label">
                                      license State
                                    </label>
                                    <input
                                      type="text"
                                      placeholder={"type your name"}
                                      value={licenseState}
                                      onChange={(e) => {
                                        setLicenseState(e.target.value);
                                      }}
                                    />
                                  </div>
                                </div>

                                <div className="form-box-inner col-lg-4 col-md-6 mb-3">
                                  <div className="input-box">
                                    <label className="form-label">
                                      Picture Release
                                    </label>
                                    <Select
                                      value={pictureRelease}
                                      onChange={
                                        handlePictureReleaseDropdownChange
                                      }
                                      sx={{ width: 300 }}
                                      //displayEmpty
                                    >
                                      {pictureReleaseDropdownOptions.map(
                                        (option) => (
                                          <MenuItem
                                            key={option.value}
                                            value={option.value}
                                          >
                                            {option.label}
                                          </MenuItem>
                                        )
                                      )}
                                    </Select>
                                  </div>
                                </div>

                                <div className="form-box-inner col-lg-4 col-md-6 mb-3">
                                  <div className="input-box">
                                    <label className="form-label">Notes</label>
                                    <input
                                      type="text"
                                      placeholder={"type your name"}
                                      value={notes}
                                      onChange={(e) => {
                                        setNotes(e.target.value);
                                      }}
                                    />
                                  </div>
                                </div>

                                {/* //uploadDocument */}
                              </div>
                            </form>
                          </div>
                          <button
                            style={{}}
                            type="button"
                            className="blue-btn-default"
                            onClick={() => setPageNo(5)}
                          >
                            Back
                          </button>
                          <button
                            style={{ marginLeft: 246, marginTop: -52 }}
                            type="button"
                            className="blue-btn-default"
                            onClick={() => setPageNo(7)}
                          >
                            Next
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* [/Card] */}
                </div>
              </div>
            </div>
          )}

          {pageNo === 7 && (
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
                                <div className="form-box-inner col-lg-4 col-md-6 mb-3">
                                  <div className="input-box">
                                    <label className="form-label">
                                      Select Document Type
                                    </label>
                                    <input
                                      type="text"
                                      placeholder={"type your name"}
                                      value={selectDocumentType}
                                      onChange={(e) => {
                                        setSelectDocumentType(e.target.value);
                                      }}
                                    />
                                  </div>
                                </div>

                                <div className="form-box-inner col-lg-4 col-md-6 mb-3">
                                  <div className="input-box">
                                    <label className="form-label">
                                      Select Expiration Date
                                    </label>
                                    <div class="col-sm-10">
                                      <LocalizationProvider
                                        dateAdapter={AdapterDayjs}
                                      >
                                        <DesktopDatePicker
                                          orientation="landscape"
                                          openTo="day"
                                          value={selectExpirationDate}
                                          onChange={(e) => {
                                            setSelectExpirationDate(
                                              e.target.value
                                            );
                                          }}
                                          renderInput={(params) => (
                                            <TextField {...params} />
                                          )}
                                        />
                                      </LocalizationProvider>
                                    </div>
                                  </div>
                                </div>

                                {/* //uploadDocument */}
                              </div>
                            </form>
                          </div>
                          <button
                            style={{ marginLeft: 13 }}
                            type="button"
                            className="blue-btn-default"
                            onClick={() => {
                              navigate("/employeeManagement");
                            }}
                          >
                            Cancel
                          </button>

                          <button
                            style={{ marginLeft: 246, marginTop: -52 }}
                            type="button"
                            className="blue-btn-default"
                            onClick={() => setPageNo(6)}
                          >
                            Back
                          </button>
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

export default ViewEmployee;
