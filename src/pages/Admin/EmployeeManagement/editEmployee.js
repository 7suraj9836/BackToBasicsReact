import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar/sidebar";
import "../../../assets/css/login.css";
import Header from "../../../components/Header/header.js";
import "../../../components/Header/header.scss";
import "../Sidebar/sidebar.scss";
import TextField from "@mui/material/TextField";
import { Select, MenuItem, InputLabel } from "@mui/material";
import { LocalizationProvider, DesktopDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import apis from '../../../api/apis';
import dayjs from "dayjs";
import Axios from 'axios';
import plusIcon from "../../../assets/images/addIcon.png";
import { Cancel as CancelIcon, Add as AddIcon } from "@mui/icons-material";
import IconUpload from "../../../assets/images/ImgUpload.png";
import { Button, Form } from "react-bootstrap";

export default function EditEmployee() {
  const { id } = useParams();
  const [employeeName, setEmployeeName] = useState("");
  const [EvvName, setEvvName] = useState("");
  const [santraxID, setSantraxID] = useState();
  const [roleId, setRoleId] = useState(3);
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
  const [carInsuranceExpirationDate, setCarInsuranceExpirationDate] = useState("");
  const [licenseExpireDate, setLicenseExpireDate] = useState("");
  const [secondFormOfId, setSecondFormOfId] = useState("");
  const [mandatedReporterExpirationDate, setMandatedReporterExpirationDate] = useState("");
  const [professionalBHPOnFile, setProfessionalBHPOnFile] = useState("");
  const [fullBHPCertificationOnFile, setFullBHPCertificationOnFile] = useState("");
  const [cprFirstAidOnFile, setCprFirstAidOnFile] = useState("");
  const [bloodBorneOnFile, setBloodBorneOnFile] = useState("");
  const [directCareWorkerOnFile, setDirectCareWorkerOnFile] = useState("");
  const [sexOffenderCheckOnFile, setSexOffenderCheckOnFile] = useState("");
  const [debarmentCheckOnFile, setDebarmentCheckOnFile] = useState("");
  const [providerExclusionOnFile, setProviderExclusionOnFile] = useState("");
  const [criminalBackgroundCheckOnFile, setCriminalBackgroundCheckOnFile] = useState("");
  const [payrollEnrollmentFormOnFile, setPayrollEnrollmentFormOnFile] = useState("");
  const [timeOffOnFile, setTimeOffOnFile] = useState("");
  const [confidentialityOnFile, setConfidentialityOnFile] = useState("");
  const [employeeHandBookAcknowledgement, setEmployeeHandBookAcknowledgement] = useState("");
  const [i9, setI9] = useState("");
  const [w4, setW4] = useState("");
  const [motorVehicleExpirationDate, setMotorVehicleExpirationDate] = useState("");
  const [licenseState, setLicenseState] = useState("");
  const [pictureRelease, setPictureRelease] = useState("");
  const [notes, setNotes] = useState("");
  const [showSidebar, SetShowSidebar] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const token = localStorage.getItem("BackToBasic-token");
  const [changePassword, setChangePassword] = useState(false);
    const [documenttype, setDocumentType] = useState([]);
  const [filename, setFilename] = useState('default_filename.pdf');
    const [documents, setDocuments] = useState([ {
      Expiration_date: "",
      Document_type_id: null,
      Document: null,
      DocumentNane: ""
    }]);

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

  const DropdownOptions = [
    { label: "Yes", value: "Yes" },
    { label: "No", value: "No" },
    { label: "NA", value: "NA" },
  ];

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
  
    const handleDegreeFileChange = (e, index) => {
      const updatedDocuments = [...documents];
      updatedDocuments[index]["Document"] = e.target.files[0];
      updatedDocuments[index]["DocumentName"] = e.target.files[0].name;
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
        DocumentName: ""
      };
      setDocuments((prevDocuments) => [...prevDocuments, newDocument]);
    };

  const updateSidebar = () => {
    SetShowSidebar(!showSidebar);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }
  const getAllState = async () => {
    try {
      const result = await Axios.get(`http://122.176.101.76:9000/api/Shared/GetAllStates`, config);
      setStateDData(result.data.response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangePassword = (event) => {
    setChangePassword(event.target.checked);
  };

  useEffect(() => {
    getAllState();

  }, []);

  const handleStateChange = (selectedOption) => {
    setStateId(selectedOption.target.value);
  };

  const handleRoleChange = (event) => {
    setRoleId(event.target.value);
  };

  const handleProfessionalBHPDropdownChange = (event) => {
    setProfessionalBHPOnFile(event.target.value);
  };

  const handleFullBHPCertificationDropdownChange = (event) => {
    setFullBHPCertificationOnFile(event.target.value);
  }

  const handleCprFirstAidDropdownChange = (event) => {
    setCprFirstAidOnFile(event.target.value);
  }

  const handleBloodBorneDropdownChange = (event) => {
    setBloodBorneOnFile(event.target.value);
  }

  const handleDirectCareWorkerDropdownChange = (event) => {
    setDirectCareWorkerOnFile(event.target.value);
  }

  const handleSexOffenderCheckDropdownChange = (event) => {
    setSexOffenderCheckOnFile(event.target.value);
  }


  const handleDebarmentCheckDropdownChange = (event) => {
    setDebarmentCheckOnFile(event.target.value);
  }

  const handleProviderExclusionDropdownChange = (event) => {
    setProviderExclusionOnFile(event.target.value);
  }

  const handleCriminalBackgroundDropdownChange = (event) => {
    setCriminalBackgroundCheckOnFile(event.target.value);
  }

  const handlePayrollEnrollmentDropdownChange = (event) => {
    setPayrollEnrollmentFormOnFile(event.target.value);
  }

  const handleTimeOffDropdownChange = (event) => {
    setTimeOffOnFile(event.target.value);
  }

  const handleConfidentialityDropdownChange = (event) => {
    setConfidentialityOnFile(event.target.value);
  }
  const handleEmployeeHandBookAcknowledgementDropdownChange = (event) => {
    setEmployeeHandBookAcknowledgement(event.target.value);
  }

  const handleI9DropdownChange = (event) => {
    setI9(event.target.value);
  }
  const handleW4DropdownChange = (event) => {
    setW4(event.target.value);
  }

  const handlePictureReleaseDropdownChange = (event) => {
    setPictureRelease(event.target.value);
  }

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
        if(res.data.response?.role_id && res.data.response?.role_id !==null){
        setRoleId(res.data.response?.role_id);}
        setPhoneNumber(res.data.response.phone_number);
        setSocialSecurity(res.data.response.social_security_number);
        setSupervisorName(res.data.response.supervisorName);
        setConfirmPassword(res.data.response.password);
        setAddress1(res.data.response.address1);
        setAddress2(res.data.response.address2);
        setCity(res.data.response.city);
        setCounty(res.data.response.county);
        setZip(res.data.response.zipcode);
        if(res.data.response?.role_id && res.data.response?.stateId !==null){
        setStateId(res.data.response.stateId);}
        setEmail(res.data.response.email);
        setDegree(res.data.response.degree);
        setSecondFormOfId(res.data.response.second_form_of_identification);
        setProfessionalBHPOnFile(res.data.response.professional_bhp_certification_On_file);
        setFullBHPCertificationOnFile(res.data.response.bhp_certification_on_file);
        setCprFirstAidOnFile(res.data.response.cpr_first_aid_on_file);
        setBloodBorneOnFile(res.data.response.blood_borne_pathogens_training_certificate_on_file);
        setDirectCareWorkerOnFile(res.data.response.direct_care_worker_record_on_file);
        setSexOffenderCheckOnFile(res.data.response.sex_offender_check_on_file);
        setDebarmentCheckOnFile(res.data.response.debarment_check_on_file);
        setProviderExclusionOnFile(res.data.response.provider_exclusion_on_file);
        setCriminalBackgroundCheckOnFile(res.data.response.criminal_background_check_on_file);
        setPayrollEnrollmentFormOnFile(res.data.response.payroll_enrollment_form_on_file);
        setTimeOffOnFile(res.data.response.time_off_policy_on_file);
        setConfidentialityOnFile(res.data.response.confidentiality_agreement_on_file);
        setEmployeeHandBookAcknowledgement(res.data.response.employee_handBook_acknowledgement_on_file);
        setI9(res.data.response.i9_on_file);
        setW4(res.data.response.w4_on_file);
        setLicenseState(res.data.response.driver_license_state);
        setPictureRelease(res.data.response.picture_release_on_file);
        setNotes(res.data.response.notes);
       const arrayList=   res.data.response.uploaded_documents
        const transformedData = arrayList.map((doc) => {
        return {
        Expiration_date:doc.expiration_date,
        Document_type_id: doc.document_type_id,
        Document:null,
        DocumentName: doc.document_name,
          };
        });
        console.log(transformedData,"trans");
      
      setDocuments(transformedData)

        if ( res.data && res.data.response && res.data.response.car_insurance_expiration_date) {
          setCarInsuranceExpirationDate(dayjs(res.data.response.car_insurance_expiration_date));
        }
        if (res.data && res.data.response && res.data.response.date_of_birth) {
          setDOB(dayjs(res.data.response.date_of_birth));
        }
        if (res.data && res.data.response && res.data.response.license_expiration_date) {
          setLicenseExpireDate(dayjs(res.data.response.license_expiration_date));
        }
        if (res.data && res.data.response && res.data.response.hire_date) {
          setHireDate(dayjs(res.data.response.hire_date));
        }
        if (res.data && res.data.response && res.data.response.mandated_reporter_training_certificate_expiration_date) {
          setMandatedReporterExpirationDate(dayjs(res.data.response.mandated_reporter_training_certificate_expiration_date));
        }
        if (res.data && res.data.response && res.data.response.motor_vehicle_background_check_expiration_date) {
          setMotorVehicleExpirationDate(dayjs(res.data.response.motor_vehicle_background_check_expiration_date)
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  let handleSubmit = async () => {
    let formData = new FormData();
    formData.append("id", id)
    formData.append("employee_name_preferred_format", employeeName);
    formData.append("employee_name_sandata_format", EvvName);
    formData.append("santrax_id", santraxID);
    formData.append("Role_id", roleId);
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
    formData.append("car_insurance_expiration_date", carInsuranceExpirationDate);
    formData.append("license_expiration_date", licenseExpireDate);
    formData.append("second_form_of_identification", secondFormOfId);
    formData.append("mandated_reporter_training_certificate_expiration_date", mandatedReporterExpirationDate);
    formData.append("professional_bhp_certification_On_file", professionalBHPOnFile);
    formData.append("bhp_certification_on_file", fullBHPCertificationOnFile);
    formData.append("cpr_first_aid_on_file", cprFirstAidOnFile);
    formData.append("blood_borne_pathogens_training_certificate_on_file", bloodBorneOnFile);
    formData.append("direct_care_worker_record_on_file", directCareWorkerOnFile);
    formData.append("sex_offender_check_on_file", sexOffenderCheckOnFile);
    formData.append("debarment_check_on_file", debarmentCheckOnFile);
    formData.append("provider_exclusion_on_file", providerExclusionOnFile);
    formData.append("criminal_background_check_on_file", criminalBackgroundCheckOnFile);
    formData.append("payroll_enrollment_form_on_file", payrollEnrollmentFormOnFile);
    formData.append("time_off_policy_on_file", timeOffOnFile);
    formData.append("confidentiality_agreement_on_file", confidentialityOnFile);
    formData.append("employee_handBook_acknowledgement_on_file", employeeHandBookAcknowledgement);
    formData.append("i9_on_file", i9);
    formData.append("w4_on_file", w4);
    formData.append("motor_vehicle_background_check_expiration_date", motorVehicleExpirationDate);
    formData.append("driver_license_state", licenseState);
    formData.append("picture_release_on_file", pictureRelease);
    formData.append("notes", notes);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    apis.post(`/Employee/SaveEmployee`, formData, config)
      .then((res) => {
        Swal.fire({
          icon: 'success',
          timer: 1500,
          text: `Client updated successfully`,
          showConfirmButton: false
        })
        navigate("/employee-management")
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
          
          {/* {pageNo === 1 && (
            <div class="container-fluid page-content-box p-lg-5 p-md-4 p-3">
              <div class="row">
                <div class="col">
          
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
                                      placeholder={"Santrax ID"}
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
                                    <select
                                      value={roleId}
                                      onChange={handleRoleChange}
                                      className="custom-select"
                                      name=""
                                      id=""
                                      placeholder="Select gender"
                                    >
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
                                <div style={{ display: "flex" }}>
                                  <div className="form-box-inner col-lg-4 col-md-6 mb-3">
                                    <label>Change Password</label>
                                  </div>
                                  <div
                                    style={{
                                      marginLeft: "-312px",
                                      marginTop: "5px",
                                    }}
                                  >
                                    {" "}
                                    <input
                                      type="checkbox"
                                      checked={changePassword}
                                      onChange={handleChangePassword}
                                    />
                                  </div>
                                </div>

                                <div>
                                  {changePassword ? (
                                    <>
                                      {" "}
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
                                              setConfirmPassword(
                                                e.target.value
                                              );
                                            }}
                                          />
                                        </div>
                                      </div>{" "}
                                    </>
                                  ) : null}
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
            
                </div>
              </div>
            </div>
          )} */}
          
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
          {/* {pageNo === 2 && (
            <div class="container-fluid page-content-box p-lg-5 p-md-4 p-3">
              <div class="row">
                <div class="col">
               
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
                                      placeholder={"City"}
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
                                      placeholder={"County"}
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
                                      placeholder={"Zip"}
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
                                      placeholder={"Email"}
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
                                      placeholder={"Phone Number"}
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
                
                </div>
              </div>
            </div>
          )} */}
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

          {/* {pageNo === 3 && (
            <div class="container-fluid page-content-box p-lg-5 p-md-4 p-3">
              <div class="row">
                <div class="col">
          
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

                                    <select
                                      className="custom-select"
                                      name=""
                                      id=""
                                      onChange={(e) => handleStateChange(e)}
                                      placeholder="Select State"
                                    >
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

                                <div className="form-box-inner col-lg-4 col-md-6 mb-3">
                                  <div className="input-box">
                                    <label className="form-label">
                                      Full BHP Certification On File
                                    </label>
                                    <select
                                      value={fullBHPCertificationOnFile}
                                      onChange={
                                        handleFullBHPCertificationDropdownChange
                                      }
                                      className="custom-select"
                                      name=""
                                      id=""
                                      placeholder=" Full BHP Certification On File"
                                    >
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
                                <div className="form-box-inner col-lg-4 col-md-6 mb-3">
                                  <div className="input-box">
                                    <label className="form-label">
                                      Set Cpr First Aid On File
                                    </label>
                                    <select
                                      value={cprFirstAidOnFile}
                                      onChange={handleCprFirstAidDropdownChange}
                                      className="custom-select"
                                      name=""
                                      id=""
                                      placeholder="Select gender"
                                    >
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
                            </form>
                          </div>
                          <button
                            style={{}}
                            type="button"
                            className="blue-btn-default"
                            onClick={() => {
                              setPageNo(2);
                            }}
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
                 
                </div>
              </div>
            </div>
          )} */}
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
                                          onChange={(e) => handleProfessionalBHPDropdownChange(e)}
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

          {/* {pageNo === 4 && (
            <div class="container-fluid page-content-box p-lg-5 p-md-4 p-3">
              <div class="row">
                <div class="col">

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
                                    <select
                                      value={bloodBorneOnFile}
                                      onChange={handleBloodBorneDropdownChange}
                                      className="custom-select"
                                      name=""
                                      id=""
                                      placeholder="Select gender"
                                    >
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

                                <div className="form-box-inner col-lg-4 col-md-6 mb-3">
                                  <div className="input-box">
                                    <label className="form-label">
                                      Direct Care Worker On File
                                    </label>
                                    <select
                                      value={directCareWorkerOnFile}
                                      onChange={
                                        handleDirectCareWorkerDropdownChange
                                      }
                                      className="custom-select"
                                      name=""
                                      id=""
                                      placeholder="Select gender"
                                    >
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

                                <div className="form-box-inner col-lg-4 col-md-6 mb-3">
                                  <div className="input-box">
                                    <label className="form-label">
                                      Sex Offender Check On File
                                    </label>
                                    <select
                                      value={sexOffenderCheckOnFile}
                                      onChange={
                                        handleSexOffenderCheckDropdownChange
                                      }
                                      className="custom-select"
                                      name=""
                                      id=""
                                      placeholder="Select gender"
                                    >
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

                                <div className="form-box-inner col-lg-4 col-md-6 mb-3">
                                  <div className="input-box">
                                    <label className="form-label">
                                      Debarment Check On File
                                    </label>
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

                                <div className="form-box-inner col-lg-4 col-md-6 mb-3">
                                  <div className="input-box">
                                    <label className="form-label">
                                      Provider Exclusion On File
                                    </label>
                                    <select
                                      value={providerExclusionOnFile}
                                      onChange={
                                        handleProviderExclusionDropdownChange
                                      }
                                      className="custom-select"
                                      name=""
                                      id=""
                                    >
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

                                <div className="form-box-inner col-lg-4 col-md-6 mb-3">
                                  <div className="input-box">
                                    <label className="form-label">
                                      Criminal Background Check On File
                                    </label>
                                    <select
                                      value={criminalBackgroundCheckOnFile}
                                      onChange={
                                        handleCriminalBackgroundDropdownChange
                                      }
                                      className="custom-select"
                                      name=""
                                      id=""
                                    >
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
                            </form>
                          </div>
                          <button
                            style={{}}
                            type="button"
                            className="blue-btn-default"
                            onClick={() => {
                              setPageNo(3);
                            }}
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
               
                </div>
              </div>
            </div>
          )} */}
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
                                          <option value="" disabled selected>
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

          {/* {pageNo === 5 && (
            <div class="container-fluid page-content-box p-lg-5 p-md-4 p-3">
              <div class="row">
                <div class="col">
              
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
                                    <select
                                      value={payrollEnrollmentFormOnFile}
                                      onChange={
                                        handlePayrollEnrollmentDropdownChange
                                      }
                                      className="custom-select"
                                      name=""
                                      id=""
                                    >
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

                                <div className="form-box-inner col-lg-4 col-md-6 mb-3">
                                  <div className="input-box">
                                    <label className="form-label">
                                      Time Off On File
                                    </label>
                                    <select
                                      value={timeOffOnFile}
                                      onChange={handleTimeOffDropdownChange}
                                      className="custom-select"
                                      name=""
                                      id=""
                                    >
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

                                <div className="form-box-inner col-lg-4 col-md-6 mb-3">
                                  <div className="input-box">
                                    <label className="form-label">
                                      Confidentiality On File
                                    </label>
                                    <select
                                      value={confidentialityOnFile}
                                      onChange={
                                        handleConfidentialityDropdownChange
                                      }
                                      className="custom-select"
                                      name=""
                                      id=""
                                    >
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

                                <div className="form-box-inner col-lg-4 col-md-6 mb-3">
                                  <div className="input-box">
                                    <label className="form-label">
                                      Employee HandBook Acknowledgement
                                    </label>
                                    <select
                                      value={employeeHandBookAcknowledgement}
                                      onChange={
                                        handleEmployeeHandBookAcknowledgementDropdownChange
                                      }
                                      className="custom-select"
                                      name=""
                                      id=""
                                    >
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

                                <div className="form-box-inner col-lg-4 col-md-6 mb-3">
                                  <div className="input-box">
                                    <label className="form-label">I9</label>
                                    <select
                                      value={i9}
                                      onChange={handleI9DropdownChange}
                                      className="custom-select"
                                      name=""
                                      id=""
                                    >
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

                                <div className="form-box-inner col-lg-4 col-md-6 mb-3">
                                  <div className="input-box">
                                    <label className="form-label">W4</label>
                                    <select
                                      value={w4}
                                      onChange={handleW4DropdownChange}
                                      className="custom-select"
                                      name=""
                                      id=""
                                    >
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
                            </form>
                          </div>
                          <button
                            style={{}}
                            type="button"
                            className="blue-btn-default"
                            onClick={() => {
                              setPageNo(4);
                            }}
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
                
                </div>
              </div>
            </div>
          )} */}
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
                                          value={pictureRelease}
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
                                          value={notes}
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
                                        {/* {documents.map((document, index) => (
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
                                                <div className="UploadBox border-0">
                                                  <label
                                                    className="form-label mb-0"
                                                    htmlFor={`expireImg_${index}`}
                                                  >
                                                    Upload Document{" "}
                                                    <img
                                                      className="linkImg"
                                                      src={IconUpload}
                                                      alt="upload"
                                                    />
                                                  </label>
                                                  <input
                                                    type="file"
                                                    className="form-control d-none"
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
                                          </div>
                                        ))} */}
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
                                                      value={dayjs
                                                        (document.Expiration_date)
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
                                                <div className="UploadBox border-0 d-flex align-items-center">
                                                  <label
                                                    className="form-label mb-0"
                                                    htmlFor={`expireImg_${index}`}
                                                  >
                                                    Upload Document{" "}
                                                    <img
                                                      className="linkImg"
                                                      src={IconUpload}
                                                      alt="upload"
                                                    />
                                                  </label>
                                                  <input
                                                    type="file"
                                                    className="form-control d-none"
                                                    id={`expireImg_${index}`}
                                                    onChange={(e) =>
                                                      handleDegreeFileChange(
                                                        e,
                                                        index
                                                      )
                                                    }
                                                  /><div  className="UploadBox border-0 d-flex align-items-center">
                                                  <p className="custom-file-label align-items-center m-0" htmlFor="fileInput">
                                                   {document.DocumentName}
                                                </p></div>
                                                </div>
        
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
    </div>
  );
}