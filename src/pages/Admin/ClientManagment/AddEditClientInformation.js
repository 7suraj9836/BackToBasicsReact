import React, { useState } from 'react';
import { useEffect } from 'react';
import Sidebar from "../Sidebar/sidebar";
import "../../../assets/css/login.css";
import Header from "../../../components/Header/header.js";
import "../../../components/Header/header.scss";
import '../Sidebar/sidebar.scss';
import TextField from '@mui/material/TextField';
import { LocalizationProvider, DesktopDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import apis from '../../../api/apis';
import { Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
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

const AddEditClientInformation = () => {
  const [client_name_preferred_format, setClientNamePreferredFormat] = useState("");
  const [sandata_id_no, setSandataIdNo] = useState(0);
  const [Client_last_name, setClientLastName] = useState("");
  const [Client_first_name, setClientFirstName] = useState("");
  const [Client_last_nameError, setClientLastNameError] = useState("");
  const [Client_first_nameError, setClientFirstNameError] = useState("");
  const [maine_care_no, setMaineCareNo] = useState(0);
  const [childName, setChildName] = useState("");
  const [client_gender_id, setClientGenderId] = useState(1);
  const [client_genderDData, setClientGenderDData] = useState([]);
  const [date_of_birth, setChildDOB] = useState(null);
  const [date_of_birthError, setChildDOBError] = useState(null);
  const [discharge_date, setDischargeDate] = useState("");
  const [ac_ok_expiration_date, setAcOkExpiration] = useState(null);
  const [Address1, setAddress1] = useState("");
  const [Address1Error, setAddress1Error] = useState("");
  const [Address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [county, setCounty] = useState("");
  const [zipcode, setZipCode] = useState(0);
  const [state_id, setStateId] = useState(0);
  const [stateDData, setStateDData] = useState([]);
  const [email, setEmail] = useState("");
  const [programManager, setProgramManager]= useState()
  const [comprehensive_assessment_expiration_date, setComprehensiveAssessmentExpirationDate] = useState(null);
  const [authorization_to_verify_prescription_medication, setAuthorizationToVerifyPrescriptionMedication] = useState(null);
  const [releases_expiration_date, setReleasesExpirationDate] = useState(null);
  const [guardian_phone_number, setGuardianPhoneNumber] = useState("");
  const [guardian_contact_name, setGuardianContactName] = useState("");
  const [electronic_signature_enrollment, setElectronicSignature] = useState(null);
  const [parent_handbook_date_signed, setParentHandBook] = useState(null);
  const [functional_assessment_expiration_date, setFunctionalAssesment] = useState(null);
  const [showSidebar, SetShowSidebar] = useState(false);
  const [pageNo, setPageNo] = useState(1);
 const [uploadedDocuments, setUploadedDocuments] = useState([]);
  const updateSidebar = () => { SetShowSidebar(!showSidebar); }
  const navigate = useNavigate();
  const token = localStorage.getItem("BackToBasic-token")
  const [open, setOpen] = useState(false);
  const [day, setDay] = useState("");
  const [activeIndex, setActiveIndex]=useState()

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
      Monday_in: "0:00",
      Monday_out: "0:00",
      Tuesday_in: "0:00",
      Tuesday_out: "0:00",
      Wednesday_in: "0:00",
      Wednesday_out: "0:00",
      Thursday_in: "0:00",
      Thursday_out: "0:00",
      Friday_in: "0:00",
      Friday_out: "0:00",
      Saturday_in: "0:00",
      Saturday_out: "0:00",
      Sunday_in: "0:00",
      Sunday_out: "0:00",
      hours: 0,
    },
  ]);

  const addMoreShift = () =>{
    const addShift = [...shift]
    addShift.push({
      Monday_in: "0:00",
      Monday_out: "0:00",
      Tuesday_in: "0:00",
      Tuesday_out: "0:00",
      Wednesday_in: "0:00",
      Wednesday_out: "0:00",
      Thursday_in: "0:00",
      Thursday_out: "0:00",
      Friday_in: "0:00",
      Friday_out: "0:00",
      Saturday_in: "0:00",
      Saturday_out: "0:00",
      Sunday_in: "0:00",
      Sunday_out: "0:00",
      hours: 0,
    });
    setShift(addShift)
    console.log(addShift,"add");
  }
  const removeShift = (index) => {
    
     let removeShift = [...shift];
     if(removeShift.length > 1){
       removeShift.splice(index, 1);
       setShift(removeShift); 
         console.log(removeShift, "r");
     }
     else{
              // Swal.fire({
              //   icon: "success",
              //   timer: 1000,
              //   text: `row removed`,
              //   showConfirmButton: false,
              // });
     }
     
  }
  const handleChangeDays = (value, state) => {
    let updatedShift = [...shift];
    updatedShift[activeIndex][`${day}_${state}`] = value.target.value;

    let totalHours = 0;
    for(let shift in updatedShift){
    for (const key in shift) {
      if (key.includes("_in")) {
        const dayName = key.replace("_in", "");
        const clockIn = updatedShift[activeIndex][key];
        const clockOut = updatedShift[activeIndex][key.replace("_in", "_out")];

        const hoursWorked = calculateTimeDifference(clockIn, clockOut);
     
        totalHours += hoursWorked;
      }
    }
    }
    updatedShift[activeIndex]["hours"] = totalHours.toFixed(2);
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
    setActiveIndex()
    setOpen(false);
  };

  const handleOpen = (day,i) => {
    setActiveIndex(i);
    setDay(day);
    setOpen(true);
  };
  const handleCloseModal2 = () => {
    setOpen(false);
  };

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
  
  const handleGenderChange = (selectedOption) => {
    setClientGenderId(selectedOption.target.value);
  };

  const handleDegreeFileChange = (e) => {
    const selectedFiles = e.target.files;
    setUploadedDocuments([...selectedFiles]);
  };

  const handleStateChange = (selectedOption) => {
    setStateId(selectedOption.target.value);
  };

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    apis.get(`Shared/GetAllStates`, config)
      .then((res) => {
        setStateDData(res.data.response);
      }).catch((err) => {
        console.log(err)
      })

    apis.get("Shared/GetAllGenders", config)
      .then((res) => {
        setClientGenderDData(res.data.response);
      }).catch((err) => {
        console.log(err);
      })
  }, []);

  const handleSubmit = () => {
    if (true) {
      let formData = new FormData();
      if (uploadedDocuments != null) {
        for (let index = 0; index < uploadedDocuments.length; index++) {
          const element = uploadedDocuments[index];
          formData.append(`uploadedDocuments`, element);
        }
      }

      formData.append("client_name_preferred_format", client_name_preferred_format);
      formData.append("client_last_name", Client_last_name);
      formData.append("client_first_name", Client_first_name);
      formData.append("maine_care_no", maine_care_no);
      formData.append("client_gender_id", client_gender_id);
      formData.append("address1", Address1);
      formData.append("address2", Address2);
      formData.append("city", city);
      formData.append("county", county);
      formData.append("zipcode", zipcode);
      formData.append("state_id", state_id);
      formData.append("email", email);
      formData.append("Program_manager", programManager);
      formData.append("guardian_phone_number", guardian_phone_number);
      formData.append("guardian_contact_name", guardian_contact_name);
      formData.append("sandata_id_no", sandata_id_no);
      formData.append("date_of_birth", date_of_birth);
            shift.map((shifts, i) => {
              formData.append(
                `Default_availabilities[${i}].Monday_in`,
                shifts.Monday_in
              );
              formData.append(
                `Default_availabilities[${i}].Monday_out`,
                shifts.Monday_out
              );
              formData.append(
                `Default_availabilities[${i}].Tuesday_in`,
                shifts.Tuesday_in
              );
              formData.append(
                `Default_availabilities[${i}].Tuesday_out`,
                shifts.Thursday_out
              );
              formData.append(
                `Default_availabilities[${i}].Wednesday_in`,
                shifts.Wednesday_in
              );
              formData.append(
                `Default_availabilities[${i}].Wednesday_out`,
                shifts.Wednesday_out
              );
              formData.append(
                `Default_availabilities[${i}].Thursday_in`,
                shifts.Thursday_in
              );
              formData.append(
                `Default_availabilities[${i}].Thursday_out`,
                shifts.Thursday_out
              );
              formData.append(
                `Default_availabilities[${i}].Friday_in`,
                shifts.Friday_in
              );
              formData.append(
                `Default_availabilities[${i}].Friday_out`,
                shifts.Friday_out
              );
              formData.append(
                `Default_availabilities[${i}].Saturday_in`,
                shifts.Saturday_in
              );
              formData.append(
                `Default_availabilities[${i}].Saturday_out`,
                shifts.Saturday_out
              );
              formData.append(
                `Default_availabilities[${i}].Sunday_in`,
                shifts.Sunday_in
              );
              formData.append(
                `Default_availabilities[${i}].Sunday_out`,
                shifts.Sunday_out
              );
              formData.append(
                `Default_availabilities[${i}].hours`,
                shifts.hours
              );
            });
      if (ac_ok_expiration_date)
        formData.append("ac_ok_expiration_date", ac_ok_expiration_date.toISOString());
      if (comprehensive_assessment_expiration_date)
        formData.append("comprehensive_assessment_expiration_date", comprehensive_assessment_expiration_date.toISOString());
      if (authorization_to_verify_prescription_medication)
        formData.append("authorization_to_verify_prescription_medication", authorization_to_verify_prescription_medication.toISOString());
      if (releases_expiration_date)
        formData.append("releases_expiration_date", releases_expiration_date.toISOString());
      if (electronic_signature_enrollment)
        formData.append("electronic_signature_enrollment", electronic_signature_enrollment.toISOString());
      if (parent_handbook_date_signed)
        formData.append("parent_handbook_date_signed", parent_handbook_date_signed.toISOString());
      if (functional_assessment_expiration_date)
        formData.append("functional_assessment_expiration_date", functional_assessment_expiration_date.toISOString());
      if (discharge_date)
        formData.append("discharge_date", discharge_date.toISOString());

  uploadedDocuments.forEach((file, index) => {
    formData.append(`uploadedDocuments${index}`, file);
  });

      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }

      apis.post(`/Client/SaveClient`, formData, config)
        .then((res) => {
          Swal.fire({
            icon: 'success',
            timer: 1500,
            text: `Client added successfully`,
            showConfirmButton: false

          })
          navigate("/client-management")
        }).catch((err) => {
          console.log(err)
          Swal.fire({
            icon: 'error',
            timer: 1500,
            text: `Something went worng`,
            showConfirmButton: false
          })
        })
    };
  }

  return (
    <div class="container-fluid page-wrap">
      <div class="row height-100">
        <Sidebar showSidebar={showSidebar} updateSidebar={updateSidebar} />
        <div class="col main p-0">
          <Header
            title="Add/Edit Client Information"
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
                              <div className="card">
                                <div className="row">
                                  <div className="form-box-inner col-lg-4 col-md-6 mb-4">
                                    <div className="input-box">
                                      <label className="form-label">
                                        Client First Name
                                      </label>
                                      <input
                                        type="text"
                                        placeholder={"type your name"}
                                        value={Client_first_name}
                                        onChange={(e) => {
                                          setClientFirstName(e.target.value);
                                          setClientFirstNameError("");
                                        }}
                                      />
                                      {Client_first_nameError && (
                                        <p
                                          style={{
                                            color: "red",
                                            fontSize: "14px",
                                          }}
                                        >
                                          *{Client_first_nameError}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                  <div className="form-box-inner col-lg-4 col-md-6 mb-4">
                                    <div className="input-box">
                                      <label className="form-label">
                                        Client Last Name
                                      </label>
                                      <input
                                        type="text"
                                        placeholder={"type your name"}
                                        value={Client_last_name}
                                        onChange={(e) => {
                                          setClientLastName(e.target.value);
                                          setClientLastNameError("");
                                        }}
                                      />
                                      {Client_last_nameError && (
                                        <p
                                          style={{
                                            color: "red",
                                            fontSize: "14px",
                                          }}
                                        >
                                          *{Client_last_nameError}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                  <div className="form-box-inner col-lg-4 col-md-6 mb-4">
                                    <div className="input-box">
                                      <label className="form-label">
                                        Client preferred Format
                                      </label>
                                      <input
                                        type="text"
                                        placeholder={"type your name"}
                                        value={client_name_preferred_format}
                                        onChange={(e) => {
                                          setClientNamePreferredFormat(
                                            e.target.value
                                          );
                                        }}
                                      />
                                    </div>
                                  </div>
                                  <div className="form-box-inner col-lg-4 col-md-6 mb-4">
                                    <div className="input-box">
                                      <label className="form-label">
                                        Maine Care Number
                                      </label>
                                      <input
                                        type="text"
                                        placeholder={"type your name"}
                                        value={maine_care_no}
                                        onChange={(e) => {
                                          setMaineCareNo(e.target.value);
                                        }}
                                      />
                                    </div>
                                  </div>
                                  <div className="form-box-inner col-lg-4 col-md-6 mb-4">
                                    <div className="input-box">
                                      <label className="form-label">
                                        Child Name
                                      </label>
                                      <input
                                        type="text"
                                        placeholder={"type your name"}
                                        value={childName}
                                        onChange={(e) => {
                                          setChildName(e.target.value);
                                        }}
                                      />
                                    </div>
                                  </div>
                                  <div className="form-box-inner col-lg-4 col-md-6 mb-4">
                                    <div className="input-box">
                                      <label className="form-label">
                                        Gender
                                      </label>
                                      <select
                                        className="custom-select"
                                        name=""
                                        id=""
                                        onChange={(e) => handleGenderChange(e)}
                                        placeholder="Select gender"
                                      >
                                        <option value="" disabled selected>
                                          Gender
                                        </option>
                                        {client_genderDData.map((g) => (
                                          <option value={g.id}>{g.name}</option>
                                        ))}
                                      </select>
                                    </div>
                                  </div>
                                  <div className="form-box-inner col-lg-4 col-md-6 mb-4">
                                    <div className="input-box">
                                      <label className="form-label">
                                        Date Of Birth
                                      </label>
                                      <div className="col-sm-10">
                                        <LocalizationProvider
                                          dateAdapter={AdapterDayjs}
                                        >
                                          <DesktopDatePicker
                                            orientation="landscape"
                                            openTo="day"
                                            value={date_of_birth}
                                            onChange={(date) => {
                                              setChildDOB(date);
                                              setChildDOBError("");
                                            }}
                                            renderInput={(params) => (
                                              <TextField {...params} />
                                            )}
                                          />
                                        </LocalizationProvider>
                                        {date_of_birthError && (
                                          <p
                                            style={{
                                              color: "red",
                                              fontSize: "14px",
                                            }}
                                          >
                                            *{date_of_birthError}
                                          </p>
                                        )}
                                      </div>
                                    </div>
                                  </div>

                                  <div className="form-box-inner col-lg-4 col-md-6 mb-3">
                                    <div className="input-box">
                                      <label className="form-label">
                                        Sandata ID Number
                                      </label>
                                      <input
                                        type="text"
                                        placeholder={"type your name"}
                                        value={sandata_id_no}
                                        onChange={(e) => {
                                          setSandataIdNo(e.target.value);
                                        }}
                                      />
                                    </div>
                                  </div>
                                  <div className="form-box-inner col-lg-4 col-md-6 mb-4">
                                    <div className="input-box">
                                      <label className="form-label">
                                        Discharge Date
                                      </label>
                                      <div className="col-sm-10">
                                        <LocalizationProvider
                                          dateAdapter={AdapterDayjs}
                                        >
                                          <DesktopDatePicker
                                            orientation="landscape"
                                            openTo="day"
                                            value={discharge_date}
                                            onChange={(date) =>
                                              setDischargeDate(date)
                                            }
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
                                        Ac Ok (Over 14) Expiration Date
                                      </label>
                                      <div className="col-sm-10">
                                        <LocalizationProvider
                                          dateAdapter={AdapterDayjs}
                                        >
                                          <DesktopDatePicker
                                            orientation="landscape"
                                            openTo="day"
                                            value={ac_ok_expiration_date}
                                            onChange={(date) =>
                                              setAcOkExpiration(date)
                                            }
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
                                        Comp Assesment Expiration Date
                                      </label>
                                      <div class="col-sm-10">
                                        <LocalizationProvider
                                          dateAdapter={AdapterDayjs}
                                        >
                                          <DesktopDatePicker
                                            orientation="landscape"
                                            openTo="day"
                                            defaultValue={
                                              comprehensive_assessment_expiration_date
                                            }
                                            onChange={(date) => {
                                              setComprehensiveAssessmentExpirationDate(
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
                                </div>
                              </div>
                              <div className="card">
                                <div className="table-responsive w-100">
                                  <div className="d-flex justify-content-between">
                                    <h6 className="form-label">
                                      Client default availabilities
                                    </h6>
                                    <button
                                      type="button"
                                      className="blue-btn-default btn-sm float-end mb-2 mt-0"
                                      onClick={() => addMoreShift()}
                                    >
                                      Add more Shift
                                    </button>
                                  </div>
                                  <table className="table m-0 butifyTable ">
                                    <thead>
                                      <tr>
                                        <th>S.No.</th>
                                        {daysOfWeek.map((day, index) => (
                                          <th key={index}>{day}</th>
                                        ))}
                                        <th></th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {shift.map((s, i) => (
                                        <tr>
                                          <td>{i + 1}</td>

                                          {daysOfWeek.map((day, index) => (
                                            <td
                                              className="text-center w-auto"
                                              key={index}
                                            >
                                              <Button
                                                onClick={() =>
                                                  handleOpen(day, i)
                                                }
                                                style={{
                                                  fontFamily: "Baskervville",
                                                  textTransform: "capitalize",
                                                  color: "#4f4f4fe6",
                                                  display: "flex",
                                                  gap: "10px",
                                                  justifyContent:
                                                    "space-between",
                                                  fontSize: "14px",
                                                  fontWeight: "600",
                                                }}
                                              >
                                                {s[`${day}_in`]} To{" "}
                                                {s[`${day}_out`]}
                                                <ModeEditRoundedIcon />
                                              </Button>
                                            </td>
                                          ))}
                                          <td>
                                            {" "}
                                            <OverlayTrigger
                                              placement="top"
                                              overlay={
                                                <Tooltip className="bg-info.bg-gradient mt-0">
                                                  Remove Shift
                                                </Tooltip>
                                              }
                                            >
                                              <Button
                                                type="button"
                                                className="btn-close"
                                                onClick={() => removeShift(i)}
                                              ></Button>
                                            </OverlayTrigger>
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                              <div className="btn-box d-flex">
                                <button
                                  type="button"
                                  className="blue-btn-default btn-outline-gray btn-sm"
                                  onClick={() => {
                                    navigate("/client-management");
                                  }}
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
                              <div className="card">
                                <div className="row">
                                  <div className="form-box-inner col-lg-4 col-md-6 mb-4">
                                    <div className="input-box">
                                      <label className="form-label">
                                        Address1
                                      </label>

                                      <input
                                        type="text"
                                        placeholder={"type your name"}
                                        value={Address1}
                                        onChange={(e) => {
                                          setAddress1(e.target.value);
                                        }}
                                      />
                                      {Address1Error && (
                                        <p
                                          style={{
                                            color: "red",
                                            fontSize: "14px",
                                          }}
                                        >
                                          *{Address1Error}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                  <div className="form-box-inner col-lg-4 col-md-6 mb-4">
                                    <div className="input-box">
                                      <label className="form-label">
                                        Address2
                                      </label>

                                      <input
                                        type="text"
                                        placeholder={"type your name"}
                                        value={Address2}
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
                                        placeholder={"type your name"}
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
                                        placeholder={"type your name"}
                                        value={county}
                                        onChange={(e) => {
                                          setCounty(e.target.value);
                                        }}
                                      />
                                    </div>
                                  </div>
                                  <div className="form-box-inner col-lg-4 col-md-6 mb-4">
                                    <div className="input-box">
                                      <label className="form-label">
                                        Zip Code
                                      </label>
                                      <input
                                        type="text"
                                        placeholder={"type your name"}
                                        value={zipcode}
                                        onChange={(e) => {
                                          setZipCode(e.target.value);
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
                                        onChange={(e) => handleStateChange(e)}
                                        placeholder="Select State"
                                      >
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
                                        placeholder={"type your name"}
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
                                        Guardian Phone Number
                                      </label>

                                      <input
                                        type="text"
                                        placeholder={"type your name"}
                                        value={guardian_phone_number}
                                        onChange={(e) => {
                                          setGuardianPhoneNumber(
                                            e.target.value
                                          );
                                        }}
                                      />
                                    </div>
                                  </div>
                                  <div className="form-box-inner col-lg-4 col-md-6 mb-4">
                                    <div className="input-box">
                                      <label className="form-label">
                                        Program Manager
                                      </label>

                                      <input
                                        type="text"
                                        placeholder={"Program Manager"}
                                        value={programManager}
                                        onChange={(e) => {
                                          setProgramManager(e.target.value);
                                        }}
                                      />
                                    </div>
                                  </div>
                                  {/* //uploadDocument */}
                                </div>
                              </div>
                              <div className="btn-box d-flex">
                                <button
                                  type="button"
                                  className="blue-btn-default btn-outline-gray btn-sm"
                                  onClick={() => setPageNo(1)}
                                >
                                  Back
                                </button>
                                <button
                                  type="button"
                                  className="blue-btn-default btn-outline-gray btn-sm"
                                  onClick={() => {
                                    navigate("/client-management");
                                  }}
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
                                  <label className="form-label">
                                    Parental Authorizations/Agreement/Releases
                                  </label>
                                  <div className="form-box-inner col-md-6 mb-4">
                                    <div className="input-box">
                                      <label className="form-label">
                                        Authorizations To Varify Prescribed
                                        Medical Exp Date
                                      </label>
                                      <div class="col-sm-12">
                                        <LocalizationProvider
                                          dateAdapter={AdapterDayjs}
                                        >
                                          <DesktopDatePicker
                                            orientation="landscape"
                                            openTo="day"
                                            defaultValue={
                                              authorization_to_verify_prescription_medication
                                            }
                                            onChange={(date) => {
                                              setAuthorizationToVerifyPrescriptionMedication(
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
                                  <div className="form-box-inner col-md-6 mb-4">
                                    <div className="input-box">
                                      <label className="form-label">
                                        Releases Expiration
                                      </label>
                                      <div className="col-sm-12">
                                        <LocalizationProvider
                                          dateAdapter={AdapterDayjs}
                                        >
                                          <DesktopDatePicker
                                            orientation="landscape"
                                            openTo="day"
                                            value={releases_expiration_date}
                                            onChange={(date) =>
                                              setReleasesExpirationDate(date)
                                            }
                                            renderInput={(params) => (
                                              <TextField {...params} />
                                            )}
                                          />
                                        </LocalizationProvider>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="form-box-inner col-md-6 mb-4">
                                    <div className="input-box">
                                      <label className="form-label">
                                        Electronic Signature Enrollment form
                                      </label>
                                      <div className="col-sm-12">
                                        <LocalizationProvider
                                          dateAdapter={AdapterDayjs}
                                        >
                                          <DesktopDatePicker
                                            orientation="landscape"
                                            openTo="day"
                                            value={
                                              electronic_signature_enrollment
                                            }
                                            onChange={(date) =>
                                              setElectronicSignature(date)
                                            }
                                            renderInput={(params) => (
                                              <TextField {...params} disabled />
                                            )}
                                          />
                                        </LocalizationProvider>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="form-box-inner col-md-6 mb-4">
                                    <div className="input-box">
                                      <label className="form-label">
                                        Parent Hand Hook Sign Date
                                      </label>
                                      <div class="col-sm-12">
                                        <LocalizationProvider
                                          dateAdapter={AdapterDayjs}
                                        >
                                          <DesktopDatePicker
                                            orientation="landscape"
                                            openTo="day"
                                            value={parent_handbook_date_signed}
                                            onChange={(date) => {
                                              setParentHandBook(date);
                                            }}
                                            renderInput={(params) => (
                                              <TextField {...params} />
                                            )}
                                          />
                                        </LocalizationProvider>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="form-box-inner col-md-6 mb-4">
                                    <div className="input-box">
                                      <label className="form-label">
                                        Functional Assessment Expiration Date
                                      </label>
                                      <div class="col-sm-12">
                                        <LocalizationProvider
                                          dateAdapter={AdapterDayjs}
                                        >
                                          <DesktopDatePicker
                                            orientation="landscape"
                                            openTo="day"
                                            value={
                                              functional_assessment_expiration_date
                                            }
                                            onChange={(date) => {
                                              setFunctionalAssesment(date);
                                            }}
                                            renderInput={(params) => (
                                              <TextField {...params} />
                                            )}
                                          />
                                        </LocalizationProvider>
                                      </div>
                                    </div>
                                  </div>
                                  {/* {uploadedDocuments.map((document, index) => (
                                    <div
                                      className="form-box-inner col-md-6 mb-4"
                                      key={index}
                                    >
                                      <div className="input-box">
                                        <label
                                          htmlFor={`expireImg_${index}`}
                                          className="form-label"
                                        >
                                          Upload Documents
                                        </label>
                                        <input
                                          className="form-control"
                                          type="file"
                                          name="file"
                                          id={`expireImg_${index}`}
                                          onChange={(e) =>
                                            handleDegreeFileChange(e, index)
                                          }
                                          multiple
                                        />
                                      </div>
                                    </div>
                                  ))} */}
                                  <div className="form-box-inner col-md-6 mb-4">
                                    <div className="input-box">
                                      <label
                                        htmlFor="fileInput"
                                        className="form-label"
                                      >
                                        Upload Documents
                                      </label>
                                      <input
                                        className="form-control"
                                        type="file"
                                        id="fileInput"
                                        onChange={handleDegreeFileChange}
                                        multiple
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="btn-box d-flex">
                                <button
                                  type="button"
                                  className="blue-btn-default btn-outline-gray btn-sm"
                                  onClick={() => {
                                    navigate("/client-management");
                                  }}
                                >
                                  Cancel
                                </button>

                                <button
                                  type="button"
                                  className="blue-btn-default btn-outline-gray btn-sm"
                                  onClick={() => setPageNo(2)}
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
}

export default AddEditClientInformation