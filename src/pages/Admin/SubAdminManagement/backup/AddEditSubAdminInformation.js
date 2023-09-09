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
import { Link, useNavigate } from "react-router-dom";
import { Validation } from "../../../helpers/validation.js";
import Swal from "sweetalert2";
import apis from "../../../api/apis";

const AddEditSubAdminInformation = () => {
  //const [Id, setId] = useState(false); 
  const [isUser, setIsUser] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [county, setCounty] = useState("");
  const [state_id, setStateId] = useState(0);
  const [stateDData, setStateDData] = useState([]);
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [roleId, setRoleId] = useState(0);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [showSidebar, SetShowSidebar] = useState(false);
  const updateSidebar = () => { SetShowSidebar(!showSidebar); }
  const navigate = useNavigate();
  const token = localStorage.getItem("BackToBasic-token")

  const passwordMatch = password === confirmPassword;
  const passwordError = !passwordMatch && password !== "" && confirmPassword !== "";
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
  };

  const validateForm = () => {
    let isValid = true;

    if (!email) {
      setEmailError("Email is required");
      isValid = false;
    }
    else if (!emailPattern.test(email)) {
      setEmailError("Please enter a valid email");
      isValid = false;
    }
    else {
      setEmailError("");
    }

    if (!phoneNumber) {
      setPhoneError("Phone number is required");
      isValid = false;
    } else {
      setPhoneError("");
    }
    return isValid;
  };

  const getAllState = async () => {

    const config = {
      headers: {
        authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "*",
      },
    }
    apis.get(`Shared/GetAllStates`, config)
      .then((res) => {
        setStateDData(res.data.response);
      }).catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    getAllState();
  }, []);

  const handleStateChange = (selectedOption) => {
    setStateId(selectedOption.target.value);
  };

  const roleOptions = [
    { id: 1, value: "Super-Admin" },
    { id: 2, value: "Sub-Admin" },
  ];

  const handleRoleChange = (event) => {
    setRoleId(event.target.value);
  };

  const handleSubmit = () => {
    const isValidForm = validateForm();
    if (isValidForm) {
      let formData = new FormData();

      if (password != confirmPassword) {
        Swal.fire({
          icon: 'error',
          timer: 1500,
          text: `Password and Confirm Password does not match`,
          showConfirmButton: false

        })
        return;
      }

      formData.append("first_name", firstName);
      formData.append("last_name", lastName);
      formData.append("address", address);
      formData.append("city", city);
      formData.append("county", county);
      formData.append("city", city);
      formData.append("county", county);
      formData.append("state_id", state_id);
      formData.append("email", email);
      formData.append("phone_number", phoneNumber);
      formData.append("role_id", roleId);
      formData.append("password", password);
      formData.append("profile_picture", profilePicture);

      const config = {
        headers: {
          authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
        },
      }

      apis.post(`/SubAdmin/SaveSubAdmin`, formData, config)
        .then((res) => {
          Swal.fire({
            icon: 'success',
            timer: 1500,
            text: `SubAdmin added successfully`,
            showConfirmButton: false

          })
          navigate("/subAdmin-management")
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
                                <div className='input-box'>
                                  <label for="formFile" className='form-label'>
                                    Upload Profile Picture
                                  </label>
                                  <input
                                    className="form-control"
                                    type="file"
                                    id="formFile"
                                    onChange={handleFileChange}
                                    multiple
                                  />
                                </div>
                              </div>

                              <div className="form-box-inner col-lg-4 col-md-6 mb-4">
                                <div className="input-box">
                                  <label className="form-label">
                                    First Name
                                  </label>

                                  <input
                                    type="text"
                                    placeholder={"type your name"}
                                    value={firstName}
                                    onChange={(e) => {
                                      setFirstName(e.target.value);
                                    }}
                                  />
                                </div>
                              </div>
                              <div className="form-box-inner col-lg-4 col-md-6 mb-4">
                                <div className="input-box">
                                  <label className="form-label">
                                    Last Name
                                  </label>

                                  <input
                                    type="text"
                                    placeholder={"type your name"}
                                    value={lastName}
                                    onChange={(e) => {
                                      setLastName(e.target.value);
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
                                    placeholder={"type your County Name"}
                                    value={county}
                                    onChange={(e) => {
                                      setCounty(e.target.value);
                                    }}
                                  />
                                </div>
                              </div>
                              <div className="form-box-inner col-lg-4 col-md-6 mb-4">
                                <div className='input-box'>
                                  <label className='form-label'>State</label>
                                  <select className='custom-select' name="" id=""
                                    onChange={handleStateChange} placeholder='Select State'>
                                    <option value="">-- Select State --</option>
                                    {stateDData.map((g) =>
                                      <option value={g.id}>{g.name}</option>
                                    )}
                                  </select>
                                </div>
                              </div>

                              <div className="form-box-inner col-lg-4 col-md-6 mb-4">
                                <div className="input-box">
                                  <label className="form-label">
                                    Address
                                  </label>

                                  <input
                                    type="text"
                                    placeholder={"type your name"}
                                    value={address}
                                    onChange={(e) => {
                                      setAddress(e.target.value);
                                    }}
                                  />

                                </div>
                              </div>

                              <div className="form-box-inner col-lg-4 col-md-6 mb-4">
                                <div className="input-box">
                                  <label className="form-label">
                                    City
                                  </label>

                                  <input
                                    type="text"
                                    placeholder={"type your City Name"}
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
                                    Email
                                  </label>

                                  <input
                                    type="email"
                                    placeholder={"type your Email"}
                                    value={email}
                                    onChange={(e) => {
                                      setEmail(e.target.value);
                                      setEmailError("");
                                    }}
                                  />
                                  {emailError && <span style={{ color: "red" }} className="error">{emailError}</span>}
                                </div>
                              </div>

                              <div className="form-box-inner col-lg-4 col-md-6 mb-4">
                                <div className="input-box">
                                  <label className="form-label">
                                    Phone Number
                                  </label>

                                  <input
                                    type="text"
                                    placeholder={"type your Phone Number"}
                                    value={phoneNumber}
                                    onChange={(e) => {
                                      setPhoneNumber(e.target.value);
                                      setPhoneError("");
                                    }}
                                  />
                                  {phoneError && <span style={{ color: "red" }} className="error">{phoneError}</span>}
                                </div>
                              </div>

                              <div className="form-box-inner col-lg-4 col-md-6 mb-3">
                                <div className="input-box">
                                  <label className="form-label">Role</label>

                                  <select value={roleId} onChange={handleRoleChange} className='custom-select' name="" id="" placeholder='Select role'>
                                    <option value="">-- Select Role --</option>
                                    {roleOptions.map((option) => (
                                      <option key={option.id} value={option.id}>
                                        {option.value}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </div>


                              <div className="form-box-inner col-lg-4 col-md-6 mb-4">
                                <div className="input-box">
                                  <label className="form-label">
                                    Password
                                  </label>

                                  <input
                                    type="text"
                                    placeholder={"type your Password"}
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
                                    type="text"
                                    placeholder={"type your Password"}
                                    value={confirmPassword}
                                    onChange={(e) => {
                                      setConfirmPassword(e.target.value);
                                    }}
                                  />
                                  {passwordError && <span className="error" style={{ color: "red" }}>Password and confirm password do not match</span>}

                                </div>
                              </div>

                            </div>
                            <button
                              style={{ marginLeft: 13 }}
                              type="button"
                              className="blue-btn-default"
                              onClick={() => {
                                navigate("/subAdmin-management");
                              }}
                            >
                              Cancel
                            </button>


                            <button
                              style={{ marginLeft: 456, marginTop: -52 }}
                              type="button"
                              className="blue-btn-default"
                              onClick={handleSubmit}
                            >
                              Submit
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
  );
};

export default AddEditSubAdminInformation;
