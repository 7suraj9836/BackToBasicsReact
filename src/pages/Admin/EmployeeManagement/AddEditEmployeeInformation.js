import React, { useState, useEffect, useMemo } from "react";
import Sidebar from "../Sidebar/sidebar";
import "../../../assets/css/login.css";
import Header from "../../../components/Header/header.js";
import "../../../components/Header/header.scss";
import "../Sidebar/sidebar.scss";
import TextField from "@mui/material/TextField";
import { LocalizationProvider, DesktopDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import apis from "../../../api/apis";
import { createEmployeeAction } from "../../../redux/actions/user";
import plusIcon from "../../../assets/images/addIcon.png";
import { Cancel as CancelIcon, Add as AddIcon } from "@mui/icons-material";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import { Modal } from "react-bootstrap";
import Button from "@mui/material/Button";
import ModeEditRoundedIcon from "@mui/icons-material/ModeEditRounded";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

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

const AddEditEmployeeInformation = () => {
  const [employeeName, setEmployeeName] = useState("");
  const [EvvName, setEvvName] = useState("");
  const [santraxID, setSantraxID] = useState();
  const [roleId, setRoleId] = useState(1);
  const [DOB, setDOB] = useState("");
  const [hireDate, setHireDate] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [socialSecurity, setSocialSecurity] = useState("");
  const [supervisorName, setSupervisorName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [county, setCounty] = useState("");
  const [zip, setZip] = useState("");
  const [stateId, setStateId] = useState(1);
  const [stateDData, setStateDData] = useState([]);
  const [email, setEmail] = useState("");
  const [degree, setDegree] = useState("");
  const [carInsuranceExpirationDate, setCarInsuranceExpirationDate] =
    useState("");
  const [licenseExpireDate, setLicenseExpireDate] = useState("");
  const [secondFormOfId, setSecondFormOfId] = useState("");
  const [mandatedReporterExpirationDate, setMandatedReporterExpirationDate] =
    useState("");
  const [professionalBHPOnFile, setProfessionalBHPOnFile] = useState("");
  const [fullBHPCertificationOnFile, setFullBHPCertificationOnFile] =
    useState(1);
  const [cprFirstAidOnFile, setCprFirstAidOnFile] = useState(1);
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
    useState("");
  const [licenseState, setLicenseState] = useState("");
  const [pictureRelease, setPictureRelease] = useState("");
  const [notes, setNotes] = useState("");
  const [uploadedDocuments, setUploadedDocuments] = useState([]);
  const [documenttype, setDocumentType] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [day, setDay] = useState("");
  const [showSidebar, SetShowSidebar] = useState(false);
  const [totalHours, setTotalHours] = useState();
  const token = localStorage.getItem("BackToBasic-token");
  const [documents, setDocuments] = useState([
    {
      Expiration_date: "",
      Document_type_id: null,
      Document: null,
    },
  ]);
  const [pageNo, setPageNo] = useState(1);
  const updateSidebar = () => {
    SetShowSidebar(!showSidebar);
  };
const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

  const [shift, setShift] = useState([
    {
      Monday_in: "8:00",
      Monday_out: "8:00",
      Tuesday_in: "8:00",
      Tuesday_out: "8:00",
      Wednesday_in: "8:00",
      Wednesday_out: "8:00",
      Thursday_in: "8:00",
      Thursday_out: "8:00",
      Friday_in: "8:00",
      Friday_out: "8:00",
      Saturday_in: "8:00",
      Saturday_out: "8:00",
      Sunday_in: "8:00",
      Sunday_out: "8:00",
      hours: 0,
    },
  ]);

  const handleChangeDays = (value, state) => {
    const updatedShift = [...shift ];
    updatedShift[0][`${day}_${state}`] = value.target.value;

    let totalHours = 0;
    for (const key in updatedShift[0]) {
      if (key.includes("_in")) {
        const dayName = key.replace("_in", "");
        const clockIn = updatedShift[0][key];
        const clockOut = updatedShift[0][key.replace("_in", "_out")];

        const hoursWorked = calculateTimeDifference(clockIn, clockOut);
        console.log();
        totalHours += hoursWorked;
      }
    }

    updatedShift[0]["hours"] = totalHours.toFixed(2);
    setShift(updatedShift);
  };

  function calculateTimeDifference(clockIn, clockOut) {
    if (!clockIn || !clockOut) {
      return 0;
    }
    const [hoursIn, minutesIn] = clockIn.split(":").map(Number);
    const [hoursOut, minutesOut] = clockOut.split(":").map(Number);

    const dateIn = new Date();
    dateIn.setHours(hoursIn);
    dateIn.setMinutes(minutesIn);

    const dateOut = new Date();
    dateOut.setHours(hoursOut);
    dateOut.setMinutes(minutesOut);

    const timeDifferenceMillis = dateOut - dateIn;
    return timeDifferenceMillis / (1000 * 60 * 60);
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = (day) => {
    setDay(day);
    setOpen(true);
  };
  const handleCloseModal2 = () => {
    setOpen(false);
  };

  const DropdownOptions = [
    { label: "Yes", value: "Yes" },
    { label: "No", value: "No" },
    { label: "NA", value: "NA" },
  ];

  const roleOptions = [
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

  const handleRoleChange = (event) => {
    setRoleId(event.target.value);
    console.log(event.target.value);
  };

  const handleDegreeFileChange = (e, index) => {
    const updatedDocuments = [...documents];
    updatedDocuments[index]["Document"] = e.target.files[0];
    setDocuments(updatedDocuments);
  };

  const handleCancelDocument = () => {
    const updatedDocuments = [...documents];
    updatedDocuments.pop();
    setDocuments(updatedDocuments);
  };

  const handleDocumentType = (index, field, value) => {
    setDocuments((prevDocuments) => {
      const updatedDocuments = [...prevDocuments];
      if (field === "Document_type_id") {
        updatedDocuments[index][field] = Number(value);
      } else {
        updatedDocuments[index][field] = value;
      }
      return updatedDocuments;
    });
  };

  const addMoreDocument = () => {
    const newDocument = {
      Expiration_date: "",
      Document_type_id: null,
      Document: null,
    };
    setDocuments((prevDocuments) => [...prevDocuments, newDocument]);
  };

  const getAllState = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    apis
      .get(`Shared/GetAllStates`, config)
      .then((res) => {
        setStateDData(res.data.response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getDocumentType = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    apis
      .get("/Shared/GetAllDocumentTypes", config)
      .then((res) => {
        console.log(res, "sgarew");
        setDocumentType(res.data.response);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAllState();
    getDocumentType();
  }, []);

  const handleStateChange = (e) => {
    setStateId(e.target.value);
    console.log(e.target.value, "jhgadadas");
  };
  console.log(stateId, "dfsfsdf");

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

  let handleSubmit = async () => {
    if (true) {
      let formData = new FormData();
      if (uploadedDocuments != null) {
        for (let index = 0; index < uploadedDocuments.length; index++) {
          const element = uploadedDocuments[index];
          formData.append(`uploadedDocuments`, element);
        }
      }

      formData.append("employee_name_preferred_format", employeeName);
      formData.append("employee_name_sandata_format", EvvName);
      formData.append("santrax_id", santraxID);
      formData.append("role_id", roleId);
      formData.append("date_of_birth", DOB);
      formData.append("hire_date", hireDate);
      formData.append("phone_number", phoneNumber);
      formData.append("social_security_number", socialSecurity);
      formData.append("supervisorName", supervisorName);
      formData.append("password", password);
      formData.append("address1", address1);
      formData.append("address2", address2);
      formData.append("city", city);
      formData.append("county", county);
      formData.append("zipcode", zip);
      formData.append("state_id", stateId);
      formData.append("email", email);
      formData.append("degree", degree);
      formData.append(
        "car_insurance_expiration_date",
        carInsuranceExpirationDate
      );
      formData.append("license_expiration_date", licenseExpireDate);
      formData.append("second_form_of_identification", secondFormOfId);
      formData.append(
        "mandated_reporter_training_certificate_expiration_date",
        mandatedReporterExpirationDate
      );
      formData.append(
        "professional_bhp_certification_On_file",
        professionalBHPOnFile
      );
      formData.append("bhp_certification_on_file", fullBHPCertificationOnFile);
      formData.append("cpr_first_aid_on_file", cprFirstAidOnFile);
      formData.append(
        "blood_borne_pathogens_training_certificate_on_file",
        bloodBorneOnFile
      );
      formData.append(
        "direct_care_worker_record_on_file",
        directCareWorkerOnFile
      );
      formData.append("sex_offender_check_on_file", sexOffenderCheckOnFile);
      formData.append("debarment_check_on_file", debarmentCheckOnFile);
      formData.append("provider_exclusion_on_file", providerExclusionOnFile);
      formData.append(
        "criminal_background_check_on_file",
        criminalBackgroundCheckOnFile
      );
      formData.append(
        "payroll_enrollment_form_on_file",
        payrollEnrollmentFormOnFile
      );
      formData.append("time_off_policy_on_file", timeOffOnFile);
      formData.append(
        "confidentiality_agreement_on_file",
        confidentialityOnFile
      );
      formData.append(
        "employee_handBook_acknowledgement_on_file",
        employeeHandBookAcknowledgement
      );
      formData.append("i9_on_file", i9);
      formData.append("w4_on_file", w4);
      formData.append(
        "motor_vehicle_background_check_expiration_date",
        motorVehicleExpirationDate
      );
      formData.append("driver_license_state", licenseState);
      formData.append("picture_release_on_file", pictureRelease);
      formData.append("notes", notes);

      shift.map((shifts, i)=>{
         formData.append(`Default_availabilities[${i}].Monday_in`,shifts.Monday_in);
         formData.append(`Default_availabilities[${i}].Monday_out`,shifts.Monday_out);
         formData.append( `Default_availabilities[${i}].Tuesday_in`,shifts.Tuesday_in);
         formData.append(`Default_availabilities[${i}].Tuesday_out`, shifts.Thursday_out);
         formData.append(`Default_availabilities[${i}].Wednesday_in`, shifts.Wednesday_in);
         formData.append(`Default_availabilities[${i}].Wednesday_out`, shifts.Wednesday_out);
         formData.append(`Default_availabilities[${i}].Thursday_in`, shifts.Thursday_in);
         formData.append(`Default_availabilities[${i}].Thursday_out`, shifts.Thursday_out);
         formData.append( `Default_availabilities[${i}].Friday_in`, shifts.Friday_in);
         formData.append( `Default_availabilities[${i}].Friday_out`, shifts.Friday_out);
         formData.append( `Default_availabilities[${i}].Saturday_in`, shifts.Saturday_in);
         formData.append( `Default_availabilities[${i}].Saturday_out`, shifts.Saturday_out);
         formData.append( `Default_availabilities[${i}].Sunday_in`, shifts.Sunday_in);
         formData.append( `Default_availabilities[${i}].Sunday_out`, shifts.Sunday_out);
         formData.append( `Default_availabilities[${i}].hours`, shifts.hours);
      })
      documents.forEach((x, i) => {
        formData.append(
          `Uploaded_documents[${i}].Expiration_date`,
          documents[i].Expiration_date
        );
        formData.append(
          `Uploaded_documents[${i}].Document_type_id`,
          documents[i].Document_type_id
        );
        formData.append(
          `Uploaded_documents[${i}].Document`,
          documents[i].Document
        );
      });

      let result = createEmployeeAction(formData);
      result(dispatch)
        .then((res) => {
          if (res.status === 200) {
            Swal.fire({
              icon: "success",
              timer: 1500,
              text: `Employee added successfully`,
              showConfirmButton: false,
            });
            navigate("/employeeManagement");
          } else {
            Swal.fire({
              icon: "error",
              timer: 1500,
              text: `Something went wrong`,
              showConfirmButton: false,
            });
            navigate("/employee-management");
          }
        })
        .catch((err) => {
          Swal.fire({
            icon: "success",
            timer: 1500,
            text: ` Employee added successfully`,
            showConfirmButton: false,
          });
          navigate("/employee-management");
        });
    }
  };

  // Login Time Attendance modal function
  // const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

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
                    <div className="card-body p-0">
                      <div className="row">
                        <div className="col">
                          <div className="login-section p-0">
                            <form className="form-box p-0">
                              <div className="card mb-4">
                                <div className="row">
                                  <div className="form-box-inner col-lg-4 col-md-6 mb-4">
                                    <div className="input-box">
                                      <label className="form-label">
                                        Employee Name
                                      </label>
                                      <input
                                        type="text"
                                        placeholder={"Employee Name"}
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
                                        EVV Name
                                      </label>
                                      <input
                                        type="text"
                                        placeholder={"EVV Name"}
                                        value={EvvName}
                                        onChange={(e) => {
                                          setEvvName(e.target.value);
                                        }}
                                      />
                                    </div>
                                  </div>
                                  <div className="form-box-inner col-lg-4 col-md-6 mb-4">
                                    <div className="input-box">
                                      <label className="form-label">
                                        Santrax ID
                                      </label>
                                      <input
                                        type="text"
                                        placeholder={"Santrax ID"}
                                        value={santraxID}
                                        onChange={(e) => {
                                          setSantraxID(e.target.value);
                                        }}
                                      />
                                    </div>
                                  </div>

                                  <div className="form-box-inner col-lg-4 col-md-6 mb-4">
                                    <div className="input-box">
                                      <label className="form-label">Role</label>
                                      <select
                                        value={roleId}
                                        onChange={handleRoleChange}
                                        className="custom-select"
                                        name=""
                                        id=""
                                        placeholder="Select gender"
                                      >
                                        <option value="" disabled selected>
                                          Select State
                                        </option>
                                        {roleOptions.map((option) => (
                                          <option
                                            key={option.id}
                                            value={option.id}
                                          >
                                            {option.value}
                                          </option>
                                        ))}
                                      </select>
                                    </div>
                                  </div>

                                  <div className="form-box-inner col-lg-4 col-md-6 mb-4">
                                    <div className="input-box">
                                      <label className="form-label">
                                        Date Of Birth
                                      </label>
                                      <div class="col-sm-12">
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

                                  <div className="form-box-inner col-lg-4 col-md-6 mb-4">
                                    <div className="input-box">
                                      <label className="form-label">
                                        Hire Date
                                      </label>
                                      <div class="col-sm-12">
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

                                  <div className="form-box-inner col-lg-4 col-md-6 mb-4">
                                    <div className="input-box">
                                      <label className="form-label">
                                        Phone Number
                                      </label>
                                      <input
                                        type="text"
                                        placeholder={"Phone Number"}
                                        value={phoneNumber}
                                        onChange={(e) => {
                                          setPhoneNumber(e.target.value);
                                        }}
                                      />
                                    </div>
                                  </div>
                                  <div className="form-box-inner col-lg-4 col-md-6 mb-4">
                                    <div className="input-box">
                                      <label className="form-label">
                                        Social Security
                                      </label>
                                      <input
                                        type="text"
                                        placeholder={"Social Security"}
                                        value={socialSecurity}
                                        onChange={(e) => {
                                          setSocialSecurity(e.target.value);
                                        }}
                                      />
                                    </div>
                                  </div>
                                  <div className="form-box-inner col-lg-4 col-md-6 mb-4">
                                    <div className="input-box">
                                      <label className="form-label">
                                        BHP Supervisor
                                      </label>
                                      <input
                                        type="text"
                                        placeholder={"Supervisor Name"}
                                        value={supervisorName}
                                        onChange={(e) => {
                                          setSupervisorName(e.target.value);
                                        }}
                                      />
                                    </div>
                                  </div>
                                  <div className="form-box-inner col-lg-4 col-md-6 mb-4">
                                    <div className="input-box">
                                      <label className="form-label">
                                        Password
                                      </label>
                                      <input
                                        type="password"
                                        placeholder={"Password"}
                                        value={password}
                                        onChange={(e) => {
                                          setPassword(e.target.value);
                                        }}
                                      />
                                    </div>
                                  </div>
                                  <div className="form-box-inner col-lg-4 col-md-6 mb-4">
                                    <div className="input-box">
                                      <label className="form-label">
                                        Confirm Password
                                      </label>
                                      <input
                                        type="password"
                                        placeholder={"Confirm Password"}
                                        value={confirmPassword}
                                        onChange={(e) => {
                                          setConfirmPassword(e.target.value);
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="card">
                                <div className="table-responsive w-100">
                                  <h6 className="form-label">
                                    Employee default availabilities
                                  </h6>
                                  <table className="table m-0 butifyTable ">
                                    <thead>
                                      <tr>
                                        <th>S.No.</th>
                                        {daysOfWeek.map((day, index) => (
                                          <th key={index}>{day}</th>
                                        ))}
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td>1</td>
                                        {daysOfWeek.map((day, index) => (
                                          <td
                                            className="text-center w-auto"
                                            key={index}
                                          >
                                            <Button
                                              onClick={() => handleOpen(day)}
                                              style={{
                                                fontFamily: "Baskervville",
                                                textTransform: "capitalize",
                                                color: "#4f4f4fe6",
                                                display: "flex",
                                                gap: "10px",
                                                justifyContent: "space-between",
                                                fontSize: "14px",
                                                fontWeight: "600",
                                              }}
                                            >
                                              {shift[0][`${day}_in`]} To{" "}
                                              {shift[0][`${day}_out`]}
                                              <ModeEditRoundedIcon />
                                            </Button>
                                          </td>
                                        ))}
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                              <div className="btn-box d-flex">
                                <button
                                  type="button"
                                  className="blue-btn-default btn-sm"
                                  onClick={() => setPageNo(2)}
                                >
                                  Next
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
          )}

          {/*--- SecondPage--- */}
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
                              <div className="card mb-4">
                                <div className="row">
                                  <h6 className="form-label">Client Address</h6>
                                  <div className="form-box-inner col-lg-4 col-md-6 mb-4">
                                    <div className="input-box">
                                      <label className="form-label">
                                        Address1
                                      </label>
                                      <input
                                        type="text"
                                        placeholder={"Address1"}
                                        value={address1}
                                        onChange={(e) => {
                                          setAddress1(e.target.value);
                                        }}
                                      />
                                    </div>
                                  </div>
                                  <div className="form-box-inner col-lg-4 col-md-6 mb-4">
                                    <div className="input-box">
                                      <label className="form-label">
                                        Address2
                                      </label>
                                      <input
                                        type="text"
                                        placeholder={"Address2"}
                                        value={address2}
                                        onChange={(e) => {
                                          setAddress2(e.target.value);
                                        }}
                                      />
                                    </div>
                                  </div>
                                  <div className="form-box-inner col-lg-4 col-md-6 mb-4">
                                    <div className="input-box">
                                      <label className="form-label">City</label>
                                      <input
                                        type="text"
                                        placeholder={"City"}
                                        value={city}
                                        onChange={(e) => {
                                          setCity(e.target.value);
                                        }}
                                      />
                                    </div>
                                  </div>
                                  <div className="form-box-inner col-lg-4 col-md-6 mb-4">
                                    <div className="input-box">
                                      <label className="form-label">
                                        County
                                      </label>
                                      <input
                                        type="text"
                                        placeholder={"County"}
                                        value={county}
                                        onChange={(e) => {
                                          setCounty(e.target.value);
                                        }}
                                      />
                                    </div>
                                  </div>
                                  <div className="form-box-inner col-lg-4 col-md-6 mb-4">
                                    <div className="input-box">
                                      <label className="form-label">Zip</label>
                                      <input
                                        type="text"
                                        placeholder={"Zip"}
                                        value={zip}
                                        onChange={(e) => {
                                          setZip(e.target.value);
                                        }}
                                      />
                                    </div>
                                  </div>
                                  <div className="form-box-inner col-lg-4 col-md-6 mb-4">
                                    <div className="input-box">
                                      <label className="form-label">
                                        State
                                      </label>
                                      <select
                                        className="custom-select"
                                        name=""
                                        id=""
                                        value={stateId}
                                        onChange={(e) => handleStateChange(e)}
                                        placeholder="Select State"
                                      >
                                        <option value="" disabled selected>
                                          Select State
                                        </option>
                                        {stateDData.map((g) => (
                                          <option value={g.id}>{g.name}</option>
                                        ))}
                                      </select>
                                    </div>
                                  </div>
                                  <div className="form-box-inner col-lg-4 col-md-6 mb-4">
                                    <div className="input-box">
                                      <label className="form-label">
                                        Email
                                      </label>
                                      <input
                                        type="text"
                                        placeholder={"Email"}
                                        value={email}
                                        onChange={(e) => {
                                          setEmail(e.target.value);
                                        }}
                                      />
                                    </div>
                                  </div>
                                  <div className="form-box-inner col-lg-4 col-md-6 mb-4">
                                    <div className="input-box">
                                      <label className="form-label">
                                        Phone Number
                                      </label>
                                      <input
                                        type="text"
                                        placeholder={"Phone Number"}
                                        value={phoneNumber}
                                        onChange={(e) => {
                                          setPhoneNumber(e.target.value);
                                        }}
                                      />
                                    </div>
                                  </div>
                                  {/* //uploadDocument */}
                                </div>
                              </div>
                              <div className="card">
                                <div className="row">
                                  <h6 className="form-label">Education</h6>
                                  <div className="form-box-inner col-lg-4 col-md-6 mb-4">
                                    <div className="input-box">
                                      <label className="form-label">
                                        Degree
                                      </label>
                                      <input
                                        type="text"
                                        placeholder={"Degree"}
                                        value={degree}
                                        onChange={(e) => {
                                          setDegree(e.target.value);
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
                                  Back
                                </button>
                                <button
                                  type="button"
                                  className="blue-btn-default btn-sm "
                                  onClick={() => setPageNo(3)}
                                >
                                  Next
                                </button>
                                <button
                                  type="button"
                                  className="blue-btn-default btn-sm btn-outline-gray"
                                  onClick={() => setPageNo(1)}
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
                </div>
              </div>
              {/* [/Card] */}
            </div>
          )}
          {/*--- third page--- */}

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
                              <div className="card">
                                <div className="row">
                                  <div className="form-box-inner col-8 mb-4">
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
                                              setCarInsuranceExpirationDate(
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

                                  <div className="form-box-inner col-8 mb-4">
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

                                  <div className="form-box-inner col-8 mb-4">
                                    <div className="input-box">
                                      <label className="form-label">
                                        2nd Form Of ID
                                      </label>
                                      <div class="col-sm-10">
                                        <input
                                          type="text"
                                          placeholder={"2nd Form Of ID"}
                                          value={secondFormOfId}
                                          onChange={(e) => {
                                            setSecondFormOfId(e.target.value);
                                          }}
                                        />
                                      </div>
                                    </div>
                                  </div>

                                  <div className="form-box-inner col-8 mb-4">
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
                                            value={
                                              mandatedReporterExpirationDate
                                            }
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

                                  <div className="form-box-inner col-8 mb-4">
                                    <div className="input-box">
                                      <label className="form-label">
                                        Professional BHP On File
                                      </label>
                                      <div class="col-sm-10">
                                        <select
                                          className="custom-select"
                                          name=""
                                          id=""
                                          onChange={(e) =>
                                            handleProfessionalBHPDropdownChange(
                                              e
                                            )
                                          }
                                          placeholder="Select State"
                                        >
                                          <option
                                            value=""
                                            disabled
                                            selected
                                            className="form-label"
                                          >
                                            Select Professional BHP On File
                                          </option>
                                          {DropdownOptions.map((option) => (
                                            <option
                                              key={option.value}
                                              value={option.value}
                                            >
                                              {" "}
                                              {option.label}
                                            </option>
                                          ))}
                                        </select>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="form-box-inner col-8 mb-4">
                                    <div className="input-box">
                                      <label className="form-label">
                                        Full BHP Certification On File
                                      </label>
                                      <div class="col-sm-10">
                                        <select
                                          value={fullBHPCertificationOnFile}
                                          onChange={
                                            handleFullBHPCertificationDropdownChange
                                          }
                                          className="custom-select"
                                          name=""
                                          id=""
                                          placeholder="Select gender"
                                        >
                                          <option value="" disabled selected>
                                            Select Full BHP Certification On
                                            File
                                          </option>
                                          {DropdownOptions.map((option) => (
                                            <option
                                              key={option.label}
                                              value={option.label}
                                            >
                                              {option.value}
                                            </option>
                                          ))}
                                        </select>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="form-box-inner col-8 mb-4">
                                    <div className="input-box">
                                      <label className="form-label">
                                        Set Cpr First Aid On File
                                      </label>
                                      <div class="col-sm-10">
                                        <select
                                          value={cprFirstAidOnFile}
                                          onChange={
                                            handleCprFirstAidDropdownChange
                                          }
                                          className="custom-select"
                                          name=""
                                          id=""
                                        >
                                          <option value="" disabled selected>
                                            Select Set Cpr First Aid On File
                                          </option>
                                          {DropdownOptions.map((option) => (
                                            <option
                                              key={option.label}
                                              value={option.label}
                                            >
                                              {option.value}
                                            </option>
                                          ))}
                                        </select>
                                      </div>
                                    </div>
                                  </div>

                                  {/* //uploadDocument */}
                                </div>
                              </div>
                              <div className="btn-box d-flex">
                                <button
                                  type="button"
                                  className="blue-btn-default btn-sm btn-outline-gray"
                                  onClick={() => {
                                    setPageNo(2);
                                  }}
                                >
                                  Back
                                </button>
                                <button
                                  type="button"
                                  className="blue-btn-default btn-sm"
                                  onClick={() => setPageNo(4)}
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

          {pageNo === 4 && (
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
                                  <div className="form-box-inner col-8 mb-4">
                                    <div className="input-box">
                                      <label className="form-label">
                                        Blood Borne On File
                                      </label>
                                      <div class="col-sm-10">
                                        <select
                                          value={bloodBorneOnFile}
                                          onChange={
                                            handleBloodBorneDropdownChange
                                          }
                                          className="custom-select"
                                          name=""
                                          id=""
                                        >
                                          <option value="" disabled selected>
                                            Select Blood Borne On File
                                          </option>
                                          {DropdownOptions.map((option) => (
                                            <option
                                              key={option.label}
                                              value={option.label}
                                            >
                                              {option.value}
                                            </option>
                                          ))}
                                        </select>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="form-box-inner col-8 mb-4">
                                    <div className="input-box">
                                      <label className="form-label">
                                        Direct Care Worker On File
                                      </label>
                                      <div class="col-sm-10">
                                        <select
                                          value={directCareWorkerOnFile}
                                          onChange={
                                            handleDirectCareWorkerDropdownChange
                                          }
                                          className="custom-select"
                                          name=""
                                          id=""
                                        >
                                          <option
                                            value=""
                                            hidden
                                            disabled
                                            selected
                                          >
                                            Select Direct Care Worker On File
                                          </option>
                                          {DropdownOptions.map((option) => (
                                            <option
                                              key={option.label}
                                              value={option.label}
                                            >
                                              {option.value}
                                            </option>
                                          ))}
                                        </select>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="form-box-inner col-8 mb-4">
                                    <div className="input-box">
                                      <label className="form-label">
                                        Sex Offender Check On File
                                      </label>
                                      <div class="col-sm-10">
                                        <select
                                          value={sexOffenderCheckOnFile}
                                          onChange={
                                            handleSexOffenderCheckDropdownChange
                                          }
                                          className="custom-select"
                                          name=""
                                          id=""
                                        >
                                          <option value="" disabled selected>
                                            Select Sex Offender Check On File
                                          </option>
                                          {DropdownOptions.map((option) => (
                                            <option
                                              key={option.label}
                                              value={option.label}
                                            >
                                              {option.value}
                                            </option>
                                          ))}
                                        </select>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="form-box-inner col-8 mb-4">
                                    <div className="input-box">
                                      <label className="form-label">
                                        Debarment Check On File
                                      </label>
                                      <div class="col-sm-10">
                                        <select
                                          value={debarmentCheckOnFile}
                                          onChange={
                                            handleDebarmentCheckDropdownChange
                                          }
                                          className="custom-select"
                                          name=""
                                          id=""
                                          placeholder="Select gender"
                                        >
                                          <option value="" disabled selected>
                                            Select Debarment Check On File
                                          </option>
                                          {DropdownOptions.map((option) => (
                                            <option
                                              key={option.label}
                                              value={option.label}
                                            >
                                              {option.value}
                                            </option>
                                          ))}
                                        </select>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="form-box-inner col-8 mb-4">
                                    <div className="input-box">
                                      <label className="form-label">
                                        Provider Exclusion On File
                                      </label>
                                      <div class="col-sm-10">
                                        <select
                                          value={providerExclusionOnFile}
                                          onChange={
                                            handleProviderExclusionDropdownChange
                                          }
                                          className="custom-select"
                                          name=""
                                          id=""
                                        >
                                          <option value="" disabled selected>
                                            Select Provider Exclusion On File
                                          </option>
                                          {DropdownOptions.map((option) => (
                                            <option
                                              key={option.label}
                                              value={option.label}
                                            >
                                              {option.value}
                                            </option>
                                          ))}
                                        </select>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="form-box-inner col-8 mb-4">
                                    <div className="input-box">
                                      <label className="form-label">
                                        Criminal Background Check On File
                                      </label>
                                      <div class="col-sm-10">
                                        <select
                                          value={criminalBackgroundCheckOnFile}
                                          onChange={
                                            handleCriminalBackgroundDropdownChange
                                          }
                                          className="custom-select"
                                          name=""
                                          id=""
                                        >
                                          <option value="" disabled selected>
                                            Select Criminal Background Check On
                                            File
                                          </option>
                                          {DropdownOptions.map((option) => (
                                            <option
                                              key={option.label}
                                              value={option.label}
                                            >
                                              {option.value}
                                            </option>
                                          ))}
                                        </select>
                                      </div>
                                    </div>
                                  </div>

                                  {/* //uploadDocument */}
                                </div>
                              </div>
                              <div className="btn-box d-flex">
                                <button
                                  type="button"
                                  className="blue-btn-default btn-sm btn-outline-gray"
                                  onClick={() => {
                                    setPageNo(3);
                                  }}
                                >
                                  Back
                                </button>
                                <button
                                  type="button"
                                  className="blue-btn-default btn-sm"
                                  onClick={() => setPageNo(5)}
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

          {pageNo === 5 && (
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
                                  <div className="form-box-inner col-8 mb-4">
                                    <div className="input-box">
                                      <label className="form-label">
                                        Payroll Enrollment Form On File
                                      </label>
                                      <div className="col-sm-10">
                                        <select
                                          value={payrollEnrollmentFormOnFile}
                                          onChange={
                                            handlePayrollEnrollmentDropdownChange
                                          }
                                          className="custom-select"
                                          name=""
                                          id=""
                                        >
                                          <option value="" disabled selected>
                                            Select Payroll Enrollment Form On
                                            File
                                          </option>
                                          {DropdownOptions.map((option) => (
                                            <option
                                              key={option.label}
                                              value={option.label}
                                            >
                                              {option.value}
                                            </option>
                                          ))}
                                        </select>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="form-box-inner col-8 mb-4">
                                    <div className="input-box">
                                      <label className="form-label">
                                        Time Off On File
                                      </label>
                                      <div className="col-sm-10">
                                        <select
                                          value={timeOffOnFile}
                                          onChange={handleTimeOffDropdownChange}
                                          className="custom-select"
                                          name=""
                                          id=""
                                        >
                                          <option value="" disabled selected>
                                            Select Time Off On File
                                          </option>
                                          {DropdownOptions.map((option) => (
                                            <option
                                              key={option.label}
                                              value={option.label}
                                            >
                                              {option.value}
                                            </option>
                                          ))}
                                        </select>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="form-box-inner col-8 mb-4">
                                    <div className="input-box">
                                      <label className="form-label">
                                        Confidentiality On File
                                      </label>
                                      <div className="col-sm-10">
                                        <select
                                          value={confidentialityOnFile}
                                          onChange={
                                            handleConfidentialityDropdownChange
                                          }
                                          className="custom-select"
                                          name=""
                                          id=""
                                        >
                                          <option value="" disabled selected>
                                            Select Confidentiality On File
                                          </option>
                                          {DropdownOptions.map((option) => (
                                            <option
                                              key={option.label}
                                              value={option.label}
                                            >
                                              {option.value}
                                            </option>
                                          ))}
                                        </select>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="form-box-inner col-8 mb-4">
                                    <div className="input-box">
                                      <label className="form-label">
                                        Employee HandBook Acknowledgement
                                      </label>
                                      <div className="col-sm-10">
                                        <select
                                          value={
                                            employeeHandBookAcknowledgement
                                          }
                                          onChange={
                                            handleEmployeeHandBookAcknowledgementDropdownChange
                                          }
                                          className="custom-select"
                                          name=""
                                          id=""
                                        >
                                          <option value="" disabled selected>
                                            Select Employee HandBook
                                            Acknowledgement
                                          </option>
                                          {DropdownOptions.map((option) => (
                                            <option
                                              key={option.label}
                                              value={option.label}
                                            >
                                              {option.value}
                                            </option>
                                          ))}
                                        </select>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="form-box-inner col-8 mb-4">
                                    <div className="input-box">
                                      <label className="form-label">I9</label>
                                      <div className="col-sm-10">
                                        <select
                                          value={i9}
                                          onChange={handleI9DropdownChange}
                                          className="custom-select"
                                          name=""
                                          id=""
                                        >
                                          <option value="" disabled selected>
                                            Select I9
                                          </option>
                                          {DropdownOptions.map((option) => (
                                            <option
                                              key={option.label}
                                              value={option.label}
                                            >
                                              {option.value}
                                            </option>
                                          ))}
                                        </select>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="form-box-inner col-8 mb-4">
                                    <div className="input-box">
                                      <label className="form-label">W4</label>
                                      <div className="col-sm-10">
                                        <select
                                          value={w4}
                                          onChange={handleW4DropdownChange}
                                          className="custom-select"
                                          name=""
                                          id=""
                                        >
                                          <option value="" disabled selected>
                                            Select W4
                                          </option>
                                          {DropdownOptions.map((option) => (
                                            <option
                                              key={option.label}
                                              value={option.label}
                                            >
                                              {option.value}
                                            </option>
                                          ))}
                                        </select>
                                      </div>
                                    </div>
                                  </div>

                                  {/* //uploadDocument */}
                                </div>
                              </div>
                              <div className="btn-box d-flex">
                                <button
                                  type="button"
                                  className="blue-btn-default btn-sm btn-outline-gray"
                                  onClick={() => {
                                    setPageNo(4);
                                  }}
                                >
                                  Back
                                </button>
                                <button
                                  type="button"
                                  className="blue-btn-default btn-sm"
                                  onClick={() => setPageNo(6)}
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

          {pageNo === 6 && (
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
                                  <div className="form-box-inner col-8 mb-4">
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
                                              setMotorVehicleExpirationDate(
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

                                  <div className="form-box-inner col-8 mb-4">
                                    <div className="input-box">
                                      <label className="form-label">
                                        license State
                                      </label>
                                      <div className="col-sm-10">
                                        <input
                                          type="text"
                                          placeholder={" license State"}
                                          value={licenseState}
                                          onChange={(e) => {
                                            setLicenseState(e.target.value);
                                          }}
                                        />
                                      </div>
                                    </div>
                                  </div>

                                  <div className="form-box-inner col-8 mb-4">
                                    <div className="input-box">
                                      <label className="form-label">
                                        Picture Release
                                      </label>
                                      <div className="col-sm-10">
                                        <select
                                          className="custom-select"
                                          name=""
                                          id=""
                                          onChange={(e) =>
                                            handlePictureReleaseDropdownChange(
                                              e
                                            )
                                          }
                                          placeholder=" Picture Release"
                                        >
                                          <option value="" disabled selected>
                                            Select Picture Release
                                          </option>
                                          {pictureReleaseDropdownOptions.map(
                                            (g) => (
                                              <option value={g.label}>
                                                {g.label}
                                              </option>
                                            )
                                          )}
                                        </select>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="form-box-inner col-8 mb-4">
                                    <div className="input-box">
                                      <label className="form-label">
                                        Notes
                                      </label>
                                      <div className="col-sm-10">
                                        <input
                                          type="text"
                                          placeholder={"Notes"}
                                          // value={title}
                                          onChange={(e) => {
                                            setNotes(e.target.value);
                                          }}
                                        />
                                      </div>
                                    </div>
                                  </div>

                                  {/* //uploadDocument */}
                                </div>
                              </div>
                              <div className="btn-box d-flex">
                                <button
                                  type="button"
                                  className="blue-btn-default btn-sm btn-outline-gray"
                                  onClick={() => {
                                    setPageNo(5);
                                  }}
                                >
                                  Back
                                </button>
                                <button
                                  type="button"
                                  className="blue-btn-default btn-sm"
                                  onClick={() => setPageNo(7)}
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

          {pageNo === 7 && (
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
                                  <div className="form-box-inner col-8 mb-4">
                                    <div className="col-auto mb-4">
                                      <div className="input-box">
                                        {documents.map((document, index) => (
                                          <div key={index} className="row">
                                            <div className="form-box-inner col-12 mb-4">
                                              <div className="input-box">
                                                <label className="form-label">
                                                  Expiration Date
                                                </label>
                                                <div className="col-sm-10">
                                                  <LocalizationProvider
                                                    dateAdapter={AdapterDayjs}
                                                  >
                                                    <DesktopDatePicker
                                                      orientation="landscape"
                                                      openTo="day"
                                                      value={
                                                        document.Expiration_date
                                                      }
                                                      onChange={(value) =>
                                                        handleDocumentType(
                                                          index,
                                                          "Expiration_date",
                                                          value
                                                        )
                                                      }
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
                                            <div className="form-box-inner col-lg-6 col-md-6 mb-4">
                                              <select
                                                value={
                                                  document.Document_type_id
                                                }
                                                onChange={(e) =>
                                                  handleDocumentType(
                                                    index,
                                                    "Document_type_id",
                                                    e.target.value
                                                  )
                                                }
                                                className="custom-select"
                                                name=""
                                                id={`expireDocument_${index}`}
                                              >
                                                <option value=""></option>
                                                {documenttype.map((option) => (
                                                  <option
                                                    key={option.id}
                                                    value={option.id}
                                                  >
                                                    {option.name}
                                                  </option>
                                                ))}
                                              </select>
                                            </div>
                                            <div className="form-box-inner col-lg-auto col-md-6 mb-4 align-self-end">
                                              <div className="tableRightLink d-flex pb-2 gap-3">
                                                <label
                                                  class="form-label"
                                                  for="customFile"
                                                ></label>
                                                <input
                                                  type="file"
                                                  class="form-control"
                                                  id={`expireImg_${index}`}
                                                  onChange={(e) =>
                                                    handleDegreeFileChange(
                                                      e,
                                                      index
                                                    )
                                                  }
                                                />
                                              </div>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  


                                    <div className="col-auto d-flex gap-3">
                                      <button
                                        className="imgWithLink ms-2 bg-white border-0"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          addMoreDocument();
                                        }}
                                      >
                                        <i className="addPage me-0">
                                          <img
                                            className="linkImg"
                                            src={plusIcon}
                                            alt="upload"
                                          />
                                        </i>
                                        Add More Document
                                      </button>
                                      <button
                                        type="button"
                                        className="imgWithLink ms-2 bg-white border-0"
                                        onClick={handleCancelDocument}
                                      >
                                        <CancelIcon fontSize="small" /> Cancel
                                        Last Document
                                      </button>
                                    </div>
                                  
                                    
                                  
                                  </div>
                                </div>
                                {/* //uploadDocument */}
                              </div>
                              <div className="btn-box d-flex">
                                <button
                                  type="button"
                                  className="blue-btn-default btn-sm btn-outline-gray"
                                  onClick={() => {
                                    setPageNo(6);
                                  }}
                                >
                                  Back
                                </button>
                                <button
                                  type="button"
                                  className="blue-btn-default btn-sm"
                                  onClick={handleSubmit}
                                >
                                  Submit
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
      <Modal show={open} onClose={handleClose} className="modal fade" centered>
        <Box sx={resetPasswordModal}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{
              fontFamily: "Baskervville",
              fontWeight: "700",
            }}
          >
            Change Your Attendance
          </Typography>
          <div
            className="login-section"
            id="modal-modal-description"
            style={{ padding: "0" }}
          >
            <div
              className="form-box"
              style={{
                paddingTop: "15px",
                paddingBottom: "0px",
              }}
            >
              <div className="form-box-inner col-12 mb-3">
                <div className="input-box">
                  <label className="form-label">Clock In</label>
                  <input
                    type="time"
                    name="time"
                    onChange={(event) => handleChangeDays(event, "in")}
                  ></input>
                </div>
              </div>
              <div className="form-box-inner col-12 mb-2">
                <div className="input-box">
                  <label className="form-label">Clock Out</label>
                  <input
                    type="time"
                    name="time"
                    onChange={(event) => handleChangeDays(event, "out")}
                  ></input>
                </div>
              </div>
            </div>
            <div className="btn-box d-flex">
              <button
                type="reset"
                className="blue-btn-default btn-sm btn-outline-gray"
                onClick={handleCloseModal2}
              >
                Cancel
              </button>
              <button
                type="button"
                className="blue-btn-default btn-sm"
                onClick={handleCloseModal2}
              >
                Submit
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default AddEditEmployeeInformation;
