import React, { useState } from "react";
import {useRef} from 'react';
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
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import Axios from "axios";
import dayjs from "dayjs";
import apis from "../../../api/apis";
import { Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import Button from "@mui/material/Button";
import ModeEditRoundedIcon from "@mui/icons-material/ModeEditRounded";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "./Client.css";

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

const EditClient = () => {
  const { id } = useParams();
  const [client_name_preferred_format, setClientNamePreferredFormat] =
    useState("");
  const [sandata_id_no, setSandataIdNo] = useState(0);
  const [Client_last_name, setClientLastName] = useState("");
  const [Client_first_name, setClientFirstName] = useState("");
  const [maine_care_no, setMaineCareNo] = useState(0);
  const [childName, setChildName] = useState("");
  const [client_gender_id, setClientGenderId] = useState(1);
  const [client_genderDData, setClientGenderDData] = useState([]);
  const [standardId, setStandardId] = useState(0);
  const [discharge_date, setDischargeDate] = useState();
  const [ac_ok_expiration_date, setAcOkExpiration] = useState("");
  const [Address1, setAddress1] = useState("");
  const [Address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [county, setCounty] = useState("");
  const [zipcode, setZipCode] = useState(0);
  const [state_id, setStateId] = useState(1);
  const [stateDData, setStateDData] = useState([]);
  const [email, setEmail] = useState("");
  const [programManager, setProgramManager] = useState();
  const [date_of_birth, setChildDOB] = useState("");
  const [
    comprehensive_assessment_expiration_date,
    setComprehensiveAssessmentExpirationDate,
  ] = useState("");
  const [
    authorization_to_verify_prescription_medication,
    setAuthorizationToVerifyPrescriptionMedication,
  ] = useState("");
  const [releases_expiration_date, setReleasesExpirationDate] = useState("");
  const [guardian_phone_number, setGuardianPhoneNumber] = useState("");
  const [guardian_contact_name, setGuardianContactName] = useState("");
  const [electronic_signature_enrollment, setElectronicSignature] =
    useState("");
  const [parent_handbook_date_signed, setParentHandBook] = useState("");
  const [functional_assessment_expiration_date, setFunctionalAssesment] =
    useState("");
  const [uploadedDocument, setUploadedDocument] = useState([]);
  // const [uploadedDocument, setUploadedDocument] = useState([
  //   { Document: null, DocumentName: "" },
  // ]);
  const [showSidebar, SetShowSidebar] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const updateSidebar = () => {
    SetShowSidebar(!showSidebar);
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [Client_last_nameError, setClientLastNameError] = useState("");
  const [Client_first_nameError, setClientFirstNameError] = useState("");
  const token = localStorage.getItem("BackToBasic-token");
  const [open, setOpen] = useState(false);
  const [day, setDay] = useState("");
  const [activeIndex, setActiveIndex] = useState();

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

const inputRef=useRef(null);
const[isButtonClicked,setIsButtonClicked]=useState(false);

// useEffect(()=>{

// },[isButtonClicked])

  const addMoreShift = () => {
    const addShift = [...shift];
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
    setShift(addShift);
    console.log(addShift, "add");
  };
  const removeShift = (index) => {
    let removeShift = [...shift];
    if (removeShift.length > 1) {
      removeShift.splice(index, 1);
      setShift(removeShift);
      console.log(removeShift, "r");
    } else {
      // Swal.fire({
      //   icon: "success",
      //   timer: 1000,
      //   text: `row removed`,
      //   showConfirmButton: false,
      // });
    }
  };
  const handleChangeDays = (value, state) => {
    let updatedShift = [...shift];
    updatedShift[activeIndex][`${day}_${state}`] = value.target.value;

    let totalHours = 0;
    for (let shift in updatedShift) {
      for (const key in shift) {
        if (key.includes("_in")) {
          const dayName = key.replace("_in", "");
          const clockIn = updatedShift[activeIndex][key];
          const clockOut =
            updatedShift[activeIndex][key.replace("_in", "_out")];

          const hoursWorked = calculateTimeDifference(clockIn, clockOut);

          totalHours += hoursWorked;
        }
      }
    }
    updatedShift[activeIndex]["hours"] = totalHours.toFixed(2);
    setShift(updatedShift);
  };

  const handleDegreeFileChange = (e, index) => {
    const updatedDocuments = [...uploadedDocument];
    if (!updatedDocuments[index]) {
      updatedDocuments[index] = { Document: null };
    }
    updatedDocuments[index]["Document"] = e.target.files[0];
    updatedDocuments[index]["DocumentName"] = e.target.files[0].name;
    setUploadedDocument(updatedDocuments);
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
    setActiveIndex();
    setOpen(false);
  };

  const handleOpen = (day, i) => {
    setActiveIndex(i);
    setDay(day);
    setOpen(true);
  };
  const handleCloseModal2 = () => {
    setOpen(false);
  };

  // const handleFileChange = (e) => {
  //   setUploadedDocuments(e.target.files);
  // };

  const handleGenderChange = (e) => {
    setClientGenderId(e.target.value);
  };

  const getAllGender = async () => {
    try {
      const result = await Axios.get(
        `http://122.176.101.76:9000/api/Shared/GetAllGenders`
      );
      setClientGenderDData(result.data.response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleStateChange = (e) => {
    setStateId(e.target.value);
  };

  const getAllState = async () => {
    try {
      const result = await Axios.get(
        `http://122.176.101.76:9000/api/Shared/GetAllStates`
      );
      setStateDData(result.data.response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllGender();
    getAllState();
  }, []);
  function revertDateFormat(isoDate) {
    const date = new Date(isoDate);
    const options = {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "GMT",
    };
    const revertedDate = date.toLocaleString("en-US", options);
    return revertedDate;
  }

  // useEffect(() => {
  //   console.log(uploadedDocument); // This will log the updated value
  // }, [uploadedDocument]);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    apis
      .get(`/Client/GetClient?id=${id}`, config)
      .then((res) => {
        setClientNamePreferredFormat(
          res.data.response.client_name_preferred_format
        );
        setClientLastName(res.data.response.client_last_name);
        setClientFirstName(res.data.response.client_first_name);
        setMaineCareNo(res.data.response.maine_care_no);
        setClientGenderId(
          !res.data.response.client_gender_id === 0
            ? 1
            : res.data.response.client_gender_id
        );
        setAddress1(res.data.response.address1);
        setAddress2(res.data.response.address2);
        setCity(res.data.response.city);
        setCounty(res.data.response.county);
        setZipCode(res.data.response.zipcode);
        setStateId(
          res.data.response.state_id === 0 ? 1 : res.data.response.state_id
        );
        setEmail(res.data.response.email);
        setProgramManager(res.data.response.program_manager);
        setGuardianPhoneNumber(res.data.response.guardian_phone_number);
        setGuardianContactName(res.data.response.guardian_contact_name);
        setSandataIdNo(res.data.response.sandata_id_no);

        let y = [];
        const arrayList = res.data.response.uploadedDocuments;
        arrayList.map((doc) => {
          y.push({ DocumentName: doc.document_name });
        });
        setUploadedDocument(y);

        //       console.log(arrayList);
        //       const transformedData = arrayList.map((doc) => {
        //         return {
        //           Document: null,
        //           DocumentName: doc.document_name,
        //         };
        //       });
        //       console.log(transformedData);
        // setUploadedDocument(transformedData);

        const setTime = res.data.response.default_availabilities;
        const b = setTime.map((i) => {
          return {
            Monday_in: i.monday_in.split(":00"),
            Monday_out: i.monday_out.split(":00"),
            Tuesday_in: i.tuesday_in.split(":00"),
            Tuesday_out: i.tuesday_out.split(":00"),
            Wednesday_in: i.wednesday_in.split(":00"),
            Wednesday_out: i.wednesday_out.split(":00"),
            Thursday_in: i.thursday_in.split(":00"),
            Thursday_out: i.thursday_out.split(":00"),
            Friday_in: i.friday_in.split(":00"),
            Friday_out: i.friday_out.split(":00"),
            Saturday_in: i.saturday_in.split(":00"),
            Saturday_out: i.saturday_out.split(":00"),
            Sunday_in: i.sunday_in.split(":00"),
            Sunday_out: i.sunday_out.split(":00"),
          };
        });
        setShift(b);
        if (
          res.data &&
          res.data.response &&
          res.data.response.ac_ok_expiration_date
        ) {
          setAcOkExpiration(dayjs(res.data.response.ac_ok_expiration_date));
        }
        if (res.data && res.data.response && res.data.response.date_of_birth) {
          setChildDOB(dayjs(res.data.response.date_of_birth));
        }
        if (
          res.data &&
          res.data.response &&
          res.data.response.comprehensive_assessment_expiration_date
        ) {
          setComprehensiveAssessmentExpirationDate(
            dayjs(res.data.response.comprehensive_assessment_expiration_date)
          );
        }
        if (
          res.data &&
          res.data.response &&
          res.data.response.authorization_to_verify_prescription_medication
        ) {
          setAuthorizationToVerifyPrescriptionMedication(
            dayjs(
              res.data.response.authorization_to_verify_prescription_medication
            )
          );
        }
        if (
          res.data &&
          res.data.response &&
          res.data.response.releases_expiration_date
        ) {
          setReleasesExpirationDate(
            dayjs(res.data.response.releases_expiration_date)
          );
        }
        if (
          res.data &&
          res.data.response &&
          res.data.response.electronic_signature_enrollment
        ) {
          setElectronicSignature(
            dayjs(res.data.response.electronic_signature_enrollment)
          );
        }
        if (
          res.data &&
          res.data.response &&
          res.data.response.parent_handbook_date_signed
        ) {
          setParentHandBook(
            dayjs(res.data.response.parent_handbook_date_signed)
          );
        }
        if (
          res.data &&
          res.data.response &&
          res.data.response.functional_assessment_expiration_date
        ) {
          setFunctionalAssesment(
            dayjs(res.data.response.functional_assessment_expiration_date)
          );
        }
        if (res.data && res.data.response && res.data.response.discharge_date) {
          setDischargeDate(dayjs(res.data.response.discharge_date));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleSubmit = async () => {
    let formData = new FormData();
    formData.append("id", id);
    formData.append(
      "client_name_preferred_format",
      client_name_preferred_format
    );
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
    formData.append("ac_ok_expiration_date", ac_ok_expiration_date);
    formData.append(
      "comprehensive_assessment_expiration_date",
      comprehensive_assessment_expiration_date
    );
    formData.append(
      "authorization_to_verify_prescription_medication",
      authorization_to_verify_prescription_medication
    );
    formData.append("releases_expiration_date", releases_expiration_date);
    formData.append(
      "electronic_signature_enrollment",
      electronic_signature_enrollment
    );
    formData.append("parent_handbook_date_signed", parent_handbook_date_signed);
    formData.append(
      "functional_assessment_expiration_date",
      functional_assessment_expiration_date
    );
    formData.append("discharge_date", discharge_date);
   formData.append("uploadedDocuments", uploadedDocument);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    apis
      .post(`/Client/SaveClient`, formData, config)
      .then((res) => {
        Swal.fire({
          icon: "success",
          timer: 1500,
          text: `Client updated successfully`,
          showConfirmButton: false,
        });
        navigate("/client-management");
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          timer: 1500,
          text: `Something went worng`,
          showConfirmButton: false,
        });
      });
  };

  //UseRef is used
  const handleClick = () => {
    // open file input box on click of another element
    console.log(inputRef.current);
    if (inputRef.current) {
      inputRef.current.click();
    }
   
  };

//Handle Button Click
const handleButtonClick=()=>{
  setIsButtonClicked(true);
}

  return (
    <div class="container-fluid page-wrap">
      <div class="row height-100">
        <Sidebar showSidebar={showSidebar} updateSidebar={updateSidebar} />
        <div class="col main p-0">
          <Header
            title="Edit Client Information"
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
                                  </div>
                                </div>
                                <div className="form-box-inner col-lg-4 col-md-6 mb-3">
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
                                  </div>
                                </div>
                                <div className="form-box-inner col-lg-4 col-md-6 mb-3">
                                  <div className="input-box">
                                    <label className="form-label">
                                      Client preferred Name
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
                                <div className="form-box-inner col-lg-4 col-md-6 mb-3">
                                  <div className="input-box">
                                    <label className="form-label">
                                      Maine Care
                                    </label>
                                    <input
                                      type="text"
                                      placeholder={"Maine Care"}
                                      value={maine_care_no}
                                      onChange={(e) => {
                                        setMaineCareNo(e.target.value);
                                      }}
                                    />
                                  </div>
                                </div>
                                <div className="form-box-inner col-lg-4 col-md-6 mb-3">
                                  <div className="input-box">
                                    <label className="form-label">
                                      Child Name
                                    </label>
                                    <input
                                      type="text"
                                      placeholder={"type Child Name"}
                                      value={childName}
                                      onChange={(e) => {
                                        setChildName(e.target.value);
                                      }}
                                    />
                                  </div>
                                </div>
                                <div className="form-box-inner col-lg-4 col-md-6 mb-3">
                                  <div className="input-box">
                                    <label className="form-label">Gender</label>
                                    <select
                                      className="custom-select"
                                      name=""
                                      id=""
                                      onChange={(e) => handleGenderChange(e)}
                                      value={client_gender_id}
                                      placeholder="Select gender"
                                    >
                                      {client_genderDData.map((g) => (
                                        <option value={g.id}>{g.name}</option>
                                      ))}
                                    </select>
                                  </div>
                                </div>
                                <div className="form-box-inner col-lg-4 col-md-6 mb-3">
                                  <div className="input-box">
                                    <label className="form-label">
                                      Child Date Of Birth
                                    </label>
                                    <div className="col-sm-10">
                                      {console.log}
                                      <LocalizationProvider
                                        dateAdapter={AdapterDayjs}
                                      >
                                        <DesktopDatePicker
                                          orientation="landscape"
                                          openTo="day"
                                          value={date_of_birth}
                                          onChange={(date) => setChildDOB(date)}
                                          renderInput={(params) => (
                                            <TextField {...params} />
                                          )}
                                        />
                                      </LocalizationProvider>
                                    </div>
                                  </div>
                                </div>
                                {/* <div className="form-box-inner col-lg-4 col-md-6 mb-3">
                                <div className='input-box'>
                                  <label className='form-label'>Turing 14 On</label>
                                  <input type='text' placeholder={'type your name'} value={turning14On} onChange={(e) => { setTurning14On(e.target.value) }} />
                                </div>
                              </div> */}
                                {/* <div className="form-box-inner col-lg-4 col-md-6 mb-3">
                                <div className='input-box'>
                                  <label className='form-label'>Year</label>
                                  <input type='text' placeholder={'type your name'} value={year} onChange={(e) => { setYear(e.target.value) }} />
                                </div>
                              </div> */}
                                <div className="form-box-inner col-lg-4 col-md-6 mb-3">
                                  <div className="input-box">
                                    <label className="form-label">
                                      Sandata Id No
                                    </label>
                                    <input
                                      type="text"
                                      placeholder={"type your name"}
                                      value={standardId}
                                      onChange={(e) => {
                                        setStandardId(e.target.value);
                                      }}
                                    />
                                  </div>
                                </div>
                                <div className="form-box-inner col-lg-4 col-md-6 mb-3">
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
                                          // onChange={(e) => setDischargeDate(e.target.value)}
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
                                <div className="form-box-inner col-lg-4 col-md-6 mb-3">
                                  <div className="input-box">
                                    <label className="form-label">
                                      Ac Ok(Over 14)Exp Date
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
                                <div className="form-box-inner col-lg-4 col-md-6 mb-3">
                                  <div className="input-box">
                                    <label className="form-label">
                                      Comp Assesment Exp Date
                                    </label>
                                    <div class="col-sm-10">
                                      <LocalizationProvider
                                        dateAdapter={AdapterDayjs}
                                      >
                                        <DesktopDatePicker
                                          orientation="landscape"
                                          openTo="day"
                                          value={
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
                              <button
                                style={{ marginLeft: 13 }}
                                type="button"
                                className="blue-btn-default"
                                onClick={() => {
                                  navigate("/client-management");
                                }}
                              >
                                Cancel
                              </button>

                              <button
                                style={{ marginLeft: 246, marginTop: -52 }}
                                type="button"
                                className="blue-btn-default"
                                onClick={() => {
                                  setPageNo(2);
                                }}
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
                                      value={Address1}
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
                                      value={Address2}
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
                                      value={zipcode}
                                      onChange={(e) => {
                                        setZipCode(e.target.value);
                                      }}
                                    />
                                  </div>
                                </div>
                                <div className="form-box-inner col-lg-4 col-md-6 mb-3">
                                  <div className="input-box">
                                    <label className="form-label">State</label>
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
                                      value={guardian_phone_number}
                                      onChange={(e) => {
                                        setGuardianPhoneNumber(e.target.value);
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
                              <button
                                style={{ marginLeft: 13 }}
                                type="button"
                                className="blue-btn-default"
                                onClick={() => {
                                  navigate("/client-management");
                                }}
                              >
                                Cancel
                              </button>

                              <button
                                style={{ marginLeft: 246, marginTop: -52 }}
                                type="button"
                                className="blue-btn-default"
                                onClick={() => setPageNo(1)}
                              >
                                Back
                              </button>

                              <button
                                style={{ marginLeft: 456, marginTop: -52 }}
                                type="button"
                                className="blue-btn-default"
                                onClick={() => {
                                  setPageNo(3);
                                }}
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
                                      Authorizations To Varify Prescribed
                                      Medical Exp Date
                                    </label>
                                    <div class="col-sm-10">
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
                                <div className="form-box-inner col-lg-4 col-md-6 mb-3">
                                  <div className="input-box">
                                    <label className="form-label">
                                      Releases Expiration
                                    </label>
                                    <div className="col-sm-10">
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
                                <div className="form-box-inner col-lg-4 col-md-6 mb-3">
                                  <div className="input-box">
                                    <label className="form-label">
                                      Electronic Signature Enrollment form
                                    </label>
                                    <div className="col-sm-10">
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
                                      Parent Hand Hook Sign Date
                                    </label>
                                    <div class="col-sm-10">
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
                                <div className="form-box-inner col-lg-4 col-md-6 mb-3">
                                  <div className="input-box">
                                    <label className="form-label">
                                      Functional Assessment Expiration Date
                                    </label>
                                    <div class="col-sm-10">
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
                                
                             
                               <div
                                    className="form-box-inner col-md-6 mb-4"
                                  style={{display:"none"}} >
                                    <div className="input-box">
                                      <label
                                       // htmlFor={`expireImg_${index}`}
                                        className="form-label"
                                      >
                                        Upload Documents
                                      </label>
                                      <input
                                        className="form-control"
                                        type="file"
                                      //  name="file"
                                        ref={inputRef}
                                        //id={`expireImg_${index}`}
                                        onChange={(e) =>
                                          handleDegreeFileChange(e)
                                        }
                                        multiple
                                      />

                                      
                                    </div>
                                  </div> 
                                  
                                   <div
                                className="form-box-inner col-md-6 mb-4"
                                // key={index}
                              >
                                <div className="input-box">
                                  <label
                                    // htmlFor={`expireImg_${index}`}
                                    className="form-label"
                                  >
                                    Upload Documents
                                  </label>
                                  <div className="form-control">
                                    <button
                                      style={{
                                        borderRadius: "5px",
                                        marginRight: "10px",
                                      }}
                                      type="button"
                                      onClick={(e)=>{
                                        handleClick(e);
                                        //handleButtonClick(e);
                                      }}
                                    >
                                      Choose File
                                    </button>
                                    {uploadedDocument.map((document, index) => (
                                      <span style={{ marginRight: "10px" }}>
                                        {document.DocumentName}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                              
                           </div>

                            
                            </form>
                          </div>
                          <button
                            style={{ marginLeft: 13 }}
                            type="button"
                            className="blue-btn-default"
                            onClick={() => {
                              navigate("/client-management");
                            }}
                          >
                            Cancel
                          </button>

                          <button
                            style={{ marginLeft: 246, marginTop: -52 }}
                            type="button"
                            className="blue-btn-default"
                            onClick={() => setPageNo(2)}
                          >
                            Back
                          </button>
                          <button
                            style={{ marginLeft: 456, marginTop: -52 }}
                            type="button"
                            className="blue-btn-default"
                            onClick={handleSubmit}
                          >
                            Submit
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
                    value={
                      shift[activeIndex] && shift[activeIndex][`${day}_in`]
                    }
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
                    value={
                      shift[activeIndex] && shift[activeIndex][`${day}_out`]
                    }
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

export default EditClient;
