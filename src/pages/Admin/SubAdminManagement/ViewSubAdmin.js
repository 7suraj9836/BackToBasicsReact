import React, { useState } from "react";
import { useEffect } from "react";
import Sidebar from "../Sidebar/sidebar";
import "../../../assets/css/login.css";
import Header from "../../../components/Header/header.js";
import "../../../components/Header/header.scss";
import "../Sidebar/sidebar.scss";
import { useNavigate, useParams, Link } from "react-router-dom";
import Swal from "sweetalert2";
import Axios from "axios";
import apis from "../../../api/apis";
import Fab from "@mui/material/Fab";
import EditIcon from "@mui/icons-material/Edit";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import userIcon from "../../../assets/images/user-img.png";

const ViewSubAdmin = () => {
  const { id } = useParams();
  const [isUser, setIsUser] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [county, setCounty] = useState("");
  const [state_id, setStateId] = useState(0);
  const [stateDData, setStateDData] = useState([]);
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [roleId, setRoleId] = useState(0);
  const [roleName, setRoleName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showSidebar, SetShowSidebar] = useState(false);
  const updateSidebar = () => {
    SetShowSidebar(!showSidebar);
  };
  const navigate = useNavigate();
  const navigateToEditUser = () => {
    navigate("/edit-SubAdmin/:id");
  };
  const token = localStorage.getItem("BackToBasic-token");

  const getAllState = async () => {
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "*",
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
  useEffect(() => {
    getAllState();
  }, []);

  const handleStateChange = (selectedOption) => {
    setStateId(selectedOption.target.value);
  };

  const roleOptions = [
    { id: 1, value: "Super-Admin 1" },
    { id: 2, value: "Sub-Admin 2" },
  ];
  const handleRoleChange = (event) => {
    setRoleId(event.target.value);
  };

  useEffect(() => {
    let aHeader = localStorage.getItem("BackToBasic-token");
    Axios.get(`http://122.176.101.76:9000/api/SubAdmin/GetSubAdmin?id=${id}`, {
      headers: {
        authorization: `Bearer ${aHeader}`,
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => {
        setFirstName(res.data.response.first_name);
        setLastName(res.data.response.last_name);
        setAddress(res.data.response.address);
        setCity(res.data.response.city);
        // let genderId = client_genderDData.filter(x => x.name == res.data.response.client_gender)[0].id;
        // setClientGenderId(genderId);
        setCounty(res.data.response.county);
        setStateId(res.data.response.state_id);
        setEmail(res.data.response.email);
        setPhoneNumber(res.data.response.phone_number);
        setRoleId(res.data.response.roleId);
        setRoleName(res.data.response.role_name);
        setPassword(res.data.response.password);
        setState(res.data.response.state);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  const [profilePictureURL, setProfilePictureURL] = useState(null);

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
                <div className="login-section p-0">
                  {/* [Card] */}
                  <div className="card dashboardCard height-100">
                    <div className="card-body p-0">
                      <div className="row">
                        <div className="col">
                          <form className="form-box p-0">
                            <div className="row">
                              <div className="col-md-4 mb-3">
                                <div className="card px-2 px-lg-4">
                                  <div className="userinfo">
                                    <div className="userImgBox">
                                      <div className="userImg">
                                        {profilePictureURL ? (
                                          <img
                                            src={profilePictureURL}
                                            alt="user-icon"
                                          />
                                        ) : (
                                          <img src={userIcon} alt="user-icon" />
                                        )}
                                      </div>
                                    </div>
                                    <h3 className="userName">
                                      Anthony Adewumi
                                    </h3>
                                    <h6 className="userEmail">
                                      anthony.adewumi@outlook.com
                                    </h6>
                                    <div className="userPermission">
                                      <FormGroup>
                                        <FormControlLabel
                                          sx={{
                                            margin: 0,
                                            marginY: 1,
                                            borderTop: 2,
                                            borderColor:
                                              "rgba(134, 135, 136, 0.2)",
                                            paddingRight: 1,
                                            paddingTop: "10px",
                                          }}
                                          control={<Switch defaultChecked />}
                                          label="Unable User"
                                          labelPlacement="start"
                                        />
                                      </FormGroup>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-8">
                                <div className="row">
                                  <h3 className="form-label d-flex justify-content-between">
                                    Profile info.{" "}
                                    {/* <Link
                                      to="/edit-SubAdmin/:id"
                                      className="text-primary text-decoration-none text-small edit-page "
                                    >
                                      Edit
                                    </Link> */}
                                  </h3>
                                  <div className="form-box-inner col-md-6 mb-4">
                                    <div className="input-box">
                                      <label className="form-label">
                                        First Name
                                      </label>

                                      <input
                                        disabled
                                        type="text"
                                        placeholder={"type your name"}
                                        value={firstName}
                                        onChange={(e) => {
                                          setFirstName(e.target.value);
                                        }}
                                      />
                                    </div>
                                  </div>
                                  <div className="form-box-inner col-md-6 mb-4">
                                    <div className="input-box">
                                      <label className="form-label">
                                        Last Name
                                      </label>

                                      <input
                                        disabled
                                        type="text"
                                        placeholder={"type your name"}
                                        value={lastName}
                                        onChange={(e) => {
                                          setLastName(e.target.value);
                                        }}
                                      />
                                    </div>
                                  </div>
                                  <div className="form-box-inner col-md-6 mb-4">
                                    <div className="input-box">
                                      <label className="form-label">
                                        County
                                      </label>

                                      <input
                                        disabled
                                        type="text"
                                        placeholder={"type your County Name"}
                                        value={county}
                                        onChange={(e) => {
                                          setCounty(e.target.value);
                                        }}
                                      />
                                    </div>
                                  </div>
                                  <div className="form-box-inner col-md-6 mb-4">
                                    <div className="input-box">
                                      <label className="form-label">
                                        State
                                      </label>

                                      <input
                                        type="text"
                                        disabled
                                        placeholder={"type your Phone Number"}
                                        value={state}
                                        onChange={(e) => {
                                          setState(e.target.value);
                                        }}
                                      />
                                    </div>
                                  </div>
                                  <div className="form-box-inner col-md-6 mb-4">
                                    <div className="input-box">
                                      <label className="form-label">
                                        Address
                                      </label>

                                      <input
                                        disabled
                                        type="text"
                                        placeholder={"type your name"}
                                        value={address}
                                        onChange={(e) => {
                                          setAddress(e.target.value);
                                        }}
                                      />
                                    </div>
                                  </div>
                                  <div className="form-box-inner col-md-6 mb-4">
                                    <div className="input-box">
                                      <label className="form-label">City</label>

                                      <input
                                        disabled
                                        type="text"
                                        placeholder={"type your City Name"}
                                        value={city}
                                        onChange={(e) => {
                                          setCity(e.target.value);
                                        }}
                                      />
                                    </div>
                                  </div>
                                  <div className="form-box-inner col-md-6 mb-4">
                                    <div className="input-box">
                                      <label className="form-label">
                                        Email
                                      </label>

                                      <input
                                        disabled
                                        type="text"
                                        placeholder={"type your Email"}
                                        value={email}
                                        onChange={(e) => {
                                          setEmail(e.target.value);
                                        }}
                                      />
                                    </div>
                                  </div>
                                  <div className="form-box-inner col-md-6 mb-4">
                                    <div className="input-box">
                                      <label className="form-label">
                                        Phone Number
                                      </label>

                                      <input
                                        type="text"
                                        disabled
                                        placeholder={"type your Phone Number"}
                                        value={phoneNumber}
                                        onChange={(e) => {
                                          setPhoneNumber(e.target.value);
                                        }}
                                      />
                                    </div>
                                  </div>
                                  <div className="form-box-inner col-md-6 mb-4">
                                    <div className="input-box">
                                      <label className="form-label">Role</label>

                                      <input
                                        type="text"
                                        disabled
                                        placeholder={"type your Phone Number"}
                                        value={roleName}
                                        onChange={(e) => {
                                          setRoleName(e.target.value);
                                        }}
                                      />
                                    </div>
                                  </div>
                                  {/* <div className="form-box-inner col-lg-4 col-md-6 mb-3">
                                    <div className="input-box">
                                      <label className="form-label">Role</label>
                                   
                                      <select disabled value={roleId} onChange={handleRoleChange} className='custom-select' name="" id="" placeholder='Select role'>
  
                                        {roleOptions.map((option) => (
                                          <option key={option.id} value={option.id}>
                                            {option.value}
                                          </option>
                                        ))}
                                      </select>
                                    </div>
                                  </div>
  
   */}
                                  {/* <div className="form-box-inner col-lg-4 col-md-6 mb-4">
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
                                  
                                  </div>
                                </div> */}
                                  {/* //uploadDocument */}
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* [/Card] */}
                  <div className="btn-box d-flex">
                    <button
                      type="button"
                      className="blue-btn-default btn-sm btn-outline-gray"
                      onClick={() => {
                        navigate("/subAdmin-management");
                      }}
                    >
                      Cancel
                    </button>

                    <button
                      type="button"
                      className="blue-btn-default btn-sm"
                      onClick={navigateToEditUser}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewSubAdmin;
