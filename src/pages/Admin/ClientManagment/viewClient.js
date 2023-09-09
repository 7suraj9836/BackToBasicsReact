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
import { Link, useNavigate, useParams } from "react-router-dom";
import { Validation } from "../../../helpers/validation.js"
import { createClientAction, ViewClientAction } from "../../../redux/actions/user";
import Swal from "sweetalert2";
import { useDispatch } from 'react-redux';
import Axios from 'axios';
import Select from "react-select";
import dayjs from "dayjs";
import { MenuItem } from "@mui/material";

const ViewClient = () => {
    const { id } = useParams();
    const [client_name_preferred_format, setClientNamePreferredFormat] = useState("");
    const [sandata_id_no, setSandataIdNo] = useState(0);
    const [Client_last_name, setClientLastName] = useState("");
    const [Client_first_name, setClientFirstName] = useState("");
    const [maine_care_no, setMaineCareNo] = useState(0);
    const [childName, setChildName] = useState("");
    const [client_gender_id, setClientGenderId] = useState(0);
    const [client_genderDData, setClientGenderDData] = useState([]);
    //const [turning14On, setTurning14On] = useState(null);
    //const [year, setYear] = useState("");
    const [standardId, setStandardId] = useState(0);
    const [discharge_date, setDischargeDate] = useState(null);
    const [ac_ok_expiration_date, setAcOkExpiration] = useState(null);
    const [Address1, setAddress1] = useState("");
    const [Address2, setAddress2] = useState("");
    const [city, setCity] = useState("");
    const [county, setCounty] = useState("");
    const [zipcode, setZipCode] = useState(0);
    const [state_id, setStateId] = useState("");
    const [stateDData, setStateDData] = useState([]);
    const [email, setEmail] = useState("");
    const [age, setAge] = useState(0);
    const [date_of_birth, setChildDOB] = useState("");
    const [comprehensive_assessment_expiration_date, setComprehensiveAssessmentExpirationDate] = useState("");
    const [authorization_to_verify_prescription_medication, setAuthorizationToVerifyPrescriptionMedication] = useState(null);
    const [releases_expiration_date, setReleasesExpirationDate] = useState(null);
    const [guardian_phone_number, setGuardianPhoneNumber] = useState("");
    const [guardian_contact_name, setGuardianContactName] = useState("");
    const [electronic_signature_enrollment, setElectronicSignature] = useState(null);
    const [parent_handbook_date_signed, setParentHandBook] = useState(null);
    const [functional_assessment_expiration_date, setFunctionalAssesment] = useState(null);
    const [uploadedDocuments, setUploadedDocuments] = useState("");
    const [created_by, setcreatedBy] = useState("");
    const [modified_date, setModifiedDate] = useState("");
    const [created_date, setCreatedDate] = useState("");
    const [modified_by, setModifiedBy] = useState("");
    const [showSidebar, SetShowSidebar] = useState(false);
    const [pageNo, setPageNo] = useState(1);
    const [error, setError] = useState({});
    const updateSidebar = () => { SetShowSidebar(!showSidebar); }
    const navigate = useNavigate();
    const dispatch = useDispatch()
    // const [result, setResult] = useState("");

    const handleGenderChange = (selectedOption) => {
        setClientGenderId(selectedOption.target.value);
        console.log(selectedOption.target.value, "74")
    };

    const getAllGender = async () => {
        try {
            const result = await Axios.get(`http://122.176.101.76:9000/api/Shared/GetAllGenders`);
            setClientGenderDData(result.data.response);
        } catch (error) {
            console.error(error);
        }
    };

    const handleStateChange = (selectedOption) => {
        setStateId(selectedOption.target.value);
    };

    const getAllState = async () => {
        try {
            const result = await Axios.get(`http://122.176.101.76:9000/api/Shared/GetAllStates`);
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
            weekday: 'short',
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZone: 'GMT'
        };
        const revertedDate = date.toLocaleString('en-US', options);
        return revertedDate;
    }

    useEffect(() => {

        let aHeader = localStorage.getItem("BackToBasic-token");
        Axios
            .get(`http://122.176.101.76:9000/api/Client/GetClient?id=${id}`,
                {
                    headers: {
                        authorization: `Bearer ${aHeader}`,
                        "Access-Control-Allow-Origin": "*",
                    },
                })
            .then((res) => {
                setClientNamePreferredFormat(res.data.response.client_name_preferred_format);
                setClientLastName(res.data.response.client_last_name);
                setClientFirstName(res.data.response.client_first_name);
                setMaineCareNo(res.data.response.maine_care_no);
                // let genderId = client_genderDData.filter(x => x.name == res.data.response.client_gender)[0].id;
                // setClientGenderId(genderId);
                setClientGenderId(res.data.response.client_gender_id);
                setAddress1(res.data.response.address1);
                setAddress2(res.data.response.address2);
                setCity(res.data.response.city);
                setCounty(res.data.response.county);
                setZipCode(res.data.response.zipcode);
                setStateId(res.data.response.state);
                setEmail(res.data.response.email);
                setGuardianPhoneNumber(res.data.response.guardian_phone_number);
                setGuardianContactName(res.data.response.guardian_contact_name);
                setSandataIdNo(res.data.response.sandata_id_no);
                if (res.data && res.data.response && res.data.response.ac_ok_expiration_date) {
                    setAcOkExpiration(dayjs(res.data.response.ac_ok_expiration_date));
                   
                }
                if (res.data && res.data.response && res.data.response.date_of_birth) {
                    setChildDOB(dayjs(res.data.response.date_of_birth));

                }
                if (res.data && res.data.response && res.data.response.comprehensive_assessment_expiration_date) {
                    setComprehensiveAssessmentExpirationDate(dayjs(res.data.response.comprehensive_assessment_expiration_date));
                }
                if (res.data && res.data.response && res.data.response.authorization_to_verify_prescription_medication) {
                    setAuthorizationToVerifyPrescriptionMedication(dayjs(res.data.response.authorization_to_verify_prescription_medication));
                }
                if (res.data && res.data.response && res.data.response.releases_expiration_date) {
                    setReleasesExpirationDate(dayjs(res.data.response.releases_expiration_date));
                }
                if (res.data && res.data.response && res.data.response.electronic_signature_enrollment) {
                    setElectronicSignature(dayjs(res.data.response.electronic_signature_enrollment));
                }
                if (res.data && res.data.response && res.data.response.parent_handbook_date_signed) {
                    setParentHandBook(dayjs(res.data.response.parent_handbook_date_signed));
                }
                if (res.data && res.data.response && res.data.response.functional_assessment_expiration_date) {
                    setFunctionalAssesment(dayjs(res.data.response.functional_assessment_expiration_date));
                }
                if (res.data && res.data.response && res.data.response.discharge_date) {
                    setDischargeDate(dayjs(res.data.response.discharge_date));
                }
            }).catch((err) => {
                console.log(err);
            })

    }, [id])

    let handleSubmit = async () => {

        let formData = new FormData();
        formData.append("id", id);
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
        formData.append("guardian_phone_number", guardian_phone_number);
        formData.append("guardian_contact_name", guardian_contact_name);
        formData.append("sandata_id_no", sandata_id_no);
        formData.append("date_of_birth", date_of_birth);
        formData.append("ac_ok_expiration_date", ac_ok_expiration_date);
        // if (ac_ok_expiration_date === null || ac_ok_expiration_date === "") {
        //     formData.append("ac_ok_expiration_date", ""); // or provide a default value
        //   } else {
        //     formData.append("ac_ok_expiration_date", ac_ok_expiration_date);
        //   }
     
        formData.append("comprehensive_assessment_expiration_date", comprehensive_assessment_expiration_date);
        formData.append("authorization_to_verify_prescription_medication", authorization_to_verify_prescription_medication);
        formData.append("releases_expiration_date", releases_expiration_date);
        formData.append("electronic_signature_enrollment", electronic_signature_enrollment);
        formData.append("parent_handbook_date_signed", parent_handbook_date_signed);
        formData.append("functional_assessment_expiration_date", functional_assessment_expiration_date);
        formData.append("discharge_date", discharge_date);
        formData.append("uploadedDocuments", uploadedDocuments);

        let result = createClientAction(formData);
        
        result(dispatch).then((res) => {
            console.log(res, "126")
            if (res.status === 200) {
                Swal.fire({
                    icon: 'success',
                    timer: 2500,
                    text: `Client added successfully`,
                    showConfirmButton: false
                })
                navigate("/client-management")
            } else {
                Swal.fire({
                    icon: 'success',
                    timer: 2500,
                    text: `Client added successfully`,
                    showConfirmButton: false
                })
                navigate("/client-management")
            }
        })
            .catch((err) => {
                Swal.fire({
                    icon: 'success',
                    timer: 2500,
                    text: `Client added successfully`,
                    showConfirmButton: false
                })
                navigate("/client-management")
            })
    };
    return (
        <div class="container-fluid page-wrap">
            <div class="row height-100">
                <Sidebar showSidebar={showSidebar} updateSidebar={updateSidebar} />
                <div class="col main p-0">
                    <Header title="Edit Client Information" updateSidebar={updateSidebar} />
                    {/*--- firstPage--- */}

                    {pageNo === 1 && <div class="container-fluid page-content-box p-lg-5 p-md-4 p-3">
                        <div class="row">
                            <div class="col">
                                {/* [Card] */}
                                <div className="card dashboardCard height-100">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col">
                                                <div className='card login-section'>
                                                    <form className="form-box">
                                                        <div className="row">
                                                            <div className="form-box-inner col-lg-4 col-md-6 mb-3">
                                                                <div className='input-box'>
                                                                    <label className='form-label'>Client First Name</label>
                                                                    <input type='text' disabled placeholder={'Type your name'} value={Client_first_name} onChange={(e) => {
                                                                        setClientFirstName(e.target.value);
                                                                    }} />
                                                                </div>
                                                            </div>
                                                            <div className="form-box-inner col-lg-4 col-md-6 mb-3">
                                                                <div className='input-box'>
                                                                    <label className='form-label'>Client Last Name</label>
                                                                    <input type='text' disabled placeholder={'Type your name'} value={Client_last_name} onChange={(e) => {
                                                                        setClientLastName(e.target.value);
                                                                    }} />
                                                                </div>
                                                            </div>
                                                            <div className="form-box-inner col-lg-4 col-md-6 mb-3">
                                                                <div className='input-box'>
                                                                    <label className='form-label'>Client preferred Name</label>
                                                                    <input type='text' disabled placeholder={'Type your name'} value={client_name_preferred_format} onChange={(e) => {
                                                                        setClientNamePreferredFormat(e.target.value);
                                                                    }} />
                                                                </div>
                                                            </div>
                                                            <div className="form-box-inner col-lg-4 col-md-6 mb-3">
                                                                <div className='input-box'>
                                                                    <label className='form-label'>Maine Care</label>
                                                                    <input type='text' disabled placeholder={'Type your name'} value={maine_care_no} onChange={(e) => { setMaineCareNo(e.target.value) }} />
                                                                </div>
                                                            </div>
                                                            <div className="form-box-inner col-lg-4 col-md-6 mb-3">
                                                                <div className='input-box'>
                                                                    <label className='form-label'>Child Name</label>
                                                                    <input type='text' disabled placeholder={'Type your name'} value={childName} onChange={(e) => { setChildName(e.target.value) }} />
                                                                </div>
                                                            </div>
                                                            <div className="form-box-inner col-lg-4 col-md-6 mb-3">
                                                                <div className='input-box'>
                                                                    <label className='form-label'>Gender</label>
                                                                    <select className='custom-select' name="" id="" disabled onChange={(e) => handleGenderChange(e)} value={client_gender_id} placeholder='Select gender'>
                                                                        {client_genderDData.map((g) =>
                                                                            <option value={g.id}>{g.name}</option>)}
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
                                                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                            <DesktopDatePicker
                                                                                disabled
                                                                                orientation="landscape"
                                                                                openTo="day"
                                                                                value={date_of_birth}
                                                                                onChange={(date) => setChildDOB(date)}
                                                                                renderInput={(params) => <TextField {...params} />}
                                                                            />
                                                                        </LocalizationProvider>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {/* <div className="form-box-inner col-lg-4 col-md-6 mb-3">
                                <div className='input-box'>
                                  <label className='form-label'>Turing 14 On</label>
                                  <input type='text' disabled  placeholder={'Type your name'} value={turning14On} onChange={(e) => { setTurning14On(e.target.value) }} />
                                </div>
                              </div> */}
                                                            {/* <div className="form-box-inner col-lg-4 col-md-6 mb-3">
                                <div className='input-box'>
                                  <label className='form-label'>Year</label>
                                  <input type='text' disabled  placeholder={'Type your name'} value={year} onChange={(e) => { setYear(e.target.value) }} />
                                </div>
                              </div> */}
                                                            <div className="form-box-inner col-lg-4 col-md-6 mb-3">
                                                                <div className='input-box'>
                                                                    <label className='form-label'>Sandata Id No</label>
                                                                    <input type='text' disabled placeholder={'Type your name'} value={standardId} onChange={(e) => { setStandardId(e.target.value) }} />
                                                                </div>
                                                            </div>
                                                            <div className="form-box-inner col-lg-4 col-md-6 mb-3">
                                                                <div className="input-box">
                                                                    <label className="form-label">
                                                                        Discharge Date
                                                                    </label>
                                                                    <div className="col-sm-10">
                                                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                            <DesktopDatePicker
                                                                                disabled
                                                                                orientation="landscape"
                                                                                openTo="day"
                                                                                value={discharge_date}
                                                                                onChange={(date) => setDischargeDate(date)}
                                                                                renderInput={(params) => <TextField {...params} />}
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
                                                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                            <DesktopDatePicker
                                                                                disabled
                                                                                orientation="landscape"
                                                                                openTo="day"
                                                                                value={ac_ok_expiration_date}
                                                                                onChange={(date) => setAcOkExpiration(date)}
                                                                                renderInput={(params) => <TextField {...params} />}
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
                                                                                disabled
                                                                                orientation="landscape"
                                                                                openTo="day"
                                                                                value={comprehensive_assessment_expiration_date}
                                                                                onChange={(date) => {
                                                                                    setComprehensiveAssessmentExpirationDate(date);
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
                                                        <button style={{ marginLeft: 13 }}
                                                            type="button"
                                                            className="blue-btn-default"
                                                            onClick={() => { navigate("/client-management") }}
                                                        >
                                                            Cancel
                                                        </button>

                                                        <button style={{ marginLeft: 246, marginTop: -52 }}
                                                            type="button"
                                                            className="blue-btn-default"
                                                            onClick={() => { setPageNo(2) }}
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
                    </div>}

                    {/*--- SecondPage--- */}
                    {pageNo === 2 && <div class="container-fluid page-content-box p-lg-5 p-md-4 p-3">
                        <div class="row">
                            <div class="col">
                                {/* [Card] */}
                                <div className="card dashboardCard height-100">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col">
                                                <div className='card login-section'>
                                                    <form className="form-box">
                                                        <div className="row">
                                                            <div className="form-box-inner col-lg-4 col-md-6 mb-3">
                                                                <div className='input-box'>
                                                                    <label className='form-label'>Address1</label>
                                                                    <input type='text' disabled placeholder={'Type your name'} value={Address1} onChange={(e) => {
                                                                        setAddress1(e.target.value);
                                                                    }} />
                                                                </div>
                                                            </div>
                                                            <div className="form-box-inner col-lg-4 col-md-6 mb-3">
                                                                <div className='input-box'>
                                                                    <label className='form-label'>Address2</label>
                                                                    <input type='text' disabled placeholder={'Type your name'} value={Address2} onChange={(e) => {
                                                                        setAddress2(e.target.value);
                                                                    }} />
                                                                </div>
                                                            </div>
                                                            <div className="form-box-inner col-lg-4 col-md-6 mb-3">
                                                                <div className='input-box'>
                                                                    <label className='form-label'>City</label>
                                                                    <input type='text' disabled placeholder={'Type your name'} value={city} onChange={(e) => { setCity(e.target.value) }} />
                                                                </div>
                                                            </div>
                                                            <div className="form-box-inner col-lg-4 col-md-6 mb-3">
                                                                <div className='input-box'>
                                                                    <label className='form-label'>County</label>
                                                                    <input type='text' disabled placeholder={'Type your name'} value={county} onChange={(e) => { setCounty(e.target.value) }} />
                                                                </div>
                                                            </div>
                                                            <div className="form-box-inner col-lg-4 col-md-6 mb-3">
                                                                <div className='input-box'>
                                                                    <label className='form-label'>Zip</label>
                                                                    <input type='text' disabled placeholder={'Type your name'} value={zipcode} onChange={(e) => { setZipCode(e.target.value) }} />
                                                                </div>
                                                            </div>
                                                            <div className="form-box-inner col-lg-4 col-md-6 mb-3">
                                                                <div className='input-box'>
                                                                    <label className='form-label'>State</label>
                                                                    <select className='custom-select' name="" id="" disabled onChange={(e) => handleStateChange(e)} placeholder='Select State'>
                                                                        {stateDData.map((g) =>
                                                                            <option value={g.id}>{g.name}</option>)}
                                                                    </select>

                                                                </div>
                                                            </div>
                                                            <div className="form-box-inner col-lg-4 col-md-6 mb-3">
                                                                <div className='input-box'>
                                                                    <label className='form-label'>Email</label>
                                                                    <input type='text' disabled placeholder={'Type your name'} value={email} onChange={(e) => { setEmail(e.target.value) }} />
                                                                </div>
                                                            </div>
                                                            <div className="form-box-inner col-lg-4 col-md-6 mb-3">
                                                                <div className='input-box'>
                                                                    <label className='form-label'>Phone Number</label>
                                                                    <input type='text' disabled placeholder={'Type your name'} value={guardian_phone_number} onChange={(e) => { setGuardianPhoneNumber(e.target.value) }} />
                                                                </div>
                                                            </div>
                                                            {/* //uploadDocument */}
                                                        </div>
                                                        <button style={{ marginLeft: 13 }}
                                                            type="button"
                                                            className="blue-btn-default"
                                                            onClick={() => { navigate("/client-management") }}
                                                        >
                                                            Cancel
                                                        </button>

                                                        <button style={{ marginLeft: 246, marginTop: -52 }}
                                                            type="button"
                                                            className="blue-btn-default"
                                                            onClick={() => setPageNo(1)}
                                                        >
                                                            Back
                                                        </button>

                                                        <button style={{ marginLeft: 456, marginTop: -52 }}
                                                            type="button"
                                                            className="blue-btn-default"
                                                            onClick={() => { setPageNo(3) }}
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
                    </div>}
                    {/*--- third page--- */}

                    {pageNo === 3 && <div class="container-fluid page-content-box p-lg-5 p-md-4 p-3">
                        <div class="row">
                            <div class="col">
                                {/* [Card] */}
                                <div className="card dashboardCard height-100">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col">
                                                <div className='card login-section'>
                                                    <form className="form-box">
                                                        <div className="row">
                                                            <div className="form-box-inner col-lg-4 col-md-6 mb-3">
                                                                <div className="input-box">
                                                                    <label className="form-label">
                                                                        Authorizations To Varify Prescribed Medical Exp Date
                                                                    </label>
                                                                    <div class="col-sm-10">
                                                                        <LocalizationProvider
                                                                            dateAdapter={AdapterDayjs}
                                                                        >
                                                                            <DesktopDatePicker
                                                                                disabled
                                                                                orientation="landscape"
                                                                                openTo="day"
                                                                                defaultValue={authorization_to_verify_prescription_medication}
                                                                                onChange={(date) => {
                                                                                    setAuthorizationToVerifyPrescriptionMedication(date);
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
                                                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                            <DesktopDatePicker
                                                                                disabled
                                                                                orientation="landscape"
                                                                                openTo="day"
                                                                                value={releases_expiration_date}
                                                                                onChange={(date) => setReleasesExpirationDate(date)}
                                                                                renderInput={(params) => <TextField {...params} />}
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
                                                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                            <DesktopDatePicker
                                                                                disabled
                                                                                orientation="landscape"
                                                                                openTo="day"
                                                                                value={electronic_signature_enrollment}
                                                                                onChange={(date) => setElectronicSignature(date)}
                                                                                renderInput={(params) => <TextField {...params} />}
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
                                                                                disabled
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
                                                                                disabled
                                                                                orientation="landscape"
                                                                                openTo="day"
                                                                                value={functional_assessment_expiration_date}
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

                                                            {/* //uploadDocument */}


                                                        </div>
                                                        <button style={{ marginLeft: 13 }}
                                                            type="button"
                                                            className="blue-btn-default"
                                                            onClick={() => { navigate("/client-management") }}
                                                        >
                                                            Cancel
                                                        </button>

                                                        <button style={{ marginLeft: 246, marginTop: -52 }}
                                                            type="button"
                                                            className="blue-btn-default"
                                                            onClick={() => setPageNo(2)}
                                                        >
                                                            Back
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
                    </div>}
                </div>

            </div>

        </div>
    );
}

export default ViewClient