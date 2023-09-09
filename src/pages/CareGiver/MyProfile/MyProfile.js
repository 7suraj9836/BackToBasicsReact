import React, { useState } from "react";
import { useEffect } from "react";
import Sidebar from "../Sidebar/sidebar";
import Header from "../../../components/Header/header.js";
import "../../../components/Header/header.scss";
import "../Sidebar/sidebar.scss";
import downloadFile from "../../../assets/images/downloadIcon.png";
import TextField from "@mui/material/TextField";
import { LocalizationProvider, DesktopDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Link, useNavigate } from "react-router-dom";
import { Validation } from "../../../helpers/validation.js";
import Swal from "sweetalert2";
import apis from "../../../api/apis";
import Fab from "@mui/material/Fab";
import EditIcon from "@mui/icons-material/Edit";
import userIcon from "../../../assets/images/user-img.png";
import { Box } from "@mui/material";

import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
// import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import { NavLink } from "react-router-dom";

import { NearMeOutlined } from "@mui/icons-material";

const MyProfilePage = () => {
  const [userId, setUserId] = useState("");

  const [name, setName] = useState("");

  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePictureURL, setProfilePictureURL] = useState(null);

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [showNewPassword, setNewShowPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [showSidebar, SetShowSidebar] = useState(false);
  const [showUpdateButton, SetShowUpdateButton] = useState(false);

  const [pageNo, setPageNo] = useState(1);

  //Dummy view data

  const viewDetails = {
    UserId: "Test",
    Name: "TestUser",
    Email: "testuser@yopmail.com",
  };

  //Handle Password Visibility

  const toggleNewPasswordVisibility = () => {
    setNewShowPassword(!showNewPassword);
  };
  const toggleOldPasswordVisibility = () => {
    setShowOldPassword(!showOldPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleUpdate = () => {
    SetShowUpdateButton(true);
    console.log(showUpdateButton);
  };

  // const handleClickShowPassword = () => setShowPassword((show) => !show);

  const updateSidebar = () => {
    SetShowSidebar(!showSidebar);
  };
  const navigate = useNavigate();
  const token = localStorage.getItem("BackToBasic-token");

  const passwordMatch = password === confirmPassword;
  // const passwordError =
  //   !passwordMatch && password !== "" && confirmPassword !== "";
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  //Handle File Change

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file, "fsjdfh");
    setProfilePicture(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePictureURL(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // const validateForm = () => {
  //   let isValid = true;

  //   if (!email) {
  //     setEmailError("Email is required");
  //     isValid = false;
  //   } else if (!emailPattern.test(email)) {
  //     setEmailError("Please enter a valid email");
  //     isValid = false;
  //   } else {
  //     setEmailError("");
  //   }

  //   if (!phoneNumber) {
  //     setPhoneError("Phone number is required");
  //     isValid = false;
  //   } else {
  //     setPhoneError("");
  //   }

  //   return isValid;
  // };

  // Password Validation
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    // Password validation logic
    if (newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
    } else {
      setPasswordError("");
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);

    // Confirm password validation logic
    if (newConfirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleSubmit = () => {
    let formData = new FormData();

    formData.append("user_Id", userId);
    formData.append("name", name);
    formData.append("email", email);
    let Image = formData.append("profile_picture", profilePicture);

    console.log(Image);

    const config = {
      headers: {
        authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "*",
      },
    };

    apis
      .post("dummyApiUrl", formData, config)
      .then((res) => {
        Swal.fire({
          icon: "success",
          timer: 1500,
          text: `SubAdmin added successfully`,
          showConfirmButton: false,
        });
        navigate("/subAdmin-management");
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          timer: 1500,
          text: `Something went wrong`,
          showConfirmButton: false,
        });
      });
  };

  //   const file = e.target.files[0];
  //   setProfilePicture(file);

  //   const reader = new FileReader();
  //   reader.onloadend = () => {
  //     setProfilePictureURL(reader.result);
  //   };
  //   if (file) {
  //     reader.readAsDataURL(file);
  //   }
  // };

  useEffect(() => {
    console.log("State updated:", showUpdateButton);
  }, [showUpdateButton]);

  useEffect(() => {
    setUserId(viewDetails.UserId);
    setName(viewDetails.Name);
    setEmail(viewDetails.Email);
  }, []);

  //Handle Password Reset(submit)

  const handlePasswordReset = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword || passwordError || confirmPasswordError) {
      return;
    }

    const payload = {
      oldPassword: oldPassword,
      newPassword: password,
    };
    console.log(payload);
    try {
      // Use Axios to make the API call
      const response = await axios.post("dummyApiUrl", payload);

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Password Changed",
          text: "Your password has been successfully changed.",
        });

        // Clear the form fields
        setOldPassword("");
        setPassword("");
        setConfirmPassword("");
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "An error occurred while changing your password.",
        });
      }
    } catch (error) {
      console.error("API error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while communicating with the server.",
      });
    }
  };

  return (
    <div className="container-fluid page-wrap">
      <div className="row height-100">
        <Sidebar showSidebar={showSidebar} updateSidebar={updateSidebar} />
        <div className="col main p-0">
          <Header title="My Profile" updateSidebar={updateSidebar} />

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
                            <div className=" ">
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
                                            <img
                                              src={userIcon}
                                              alt="user-icon"
                                            />
                                          )}
                                          <div className="userImgEdit">
                                            <Fab
                                              sx={{ width: 36, height: 36 }}
                                              color="primary"
                                              aria-label="edit"
                                              htmlFor="formFile"
                                            >
                                              <EditIcon
                                                sx={{ width: 16, height: 16 }}
                                                className="iconEdit"
                                              />
                                              <input
                                                className="form-control"
                                                type="file"
                                                id="formFile"
                                                onChange={handleFileChange}
                                                style={{
                                                  opacity: "0",
                                                  visibility: "visible",
                                                }}
                                              />
                                            </Fab>
                                          </div>
                                        </div>
                                      </div>
                                      <h3 className="userName">
                                        Anthony Adewumi
                                      </h3>
                                      <h6 className="userEmail">
                                        anthony.adewumi@outlook.com
                                      </h6>
                                      <hr
                                        style={{
                                          width: "60%",
                                          margin: "10px auto",
                                        }}
                                      />
                                      <Box>
                                        <nav>
                                          <List className="usereditBox">
                                            <ListItem disablePadding>
                                              <ListItemButton
                                                onClick={() => setPageNo(1)}
                                              >
                                                <ListItemIcon
                                                  style={{
                                                    minWidth: "25px",
                                                    marginInlineEnd: "10px",
                                                  }}
                                                >
                                                  <AccountCircleOutlinedIcon />
                                                </ListItemIcon>
                                                <ListItemText
                                                  primary="My Profile"
                                                  className={
                                                    pageNo === 1
                                                      ? "active"
                                                      : " "
                                                  }
                                                />
                                              </ListItemButton>
                                            </ListItem>
                                            <Divider
                                              style={{
                                                borderColor: "rgb(0 0 0 / 70%)",
                                              }}
                                            />
                                            <ListItem disablePadding>
                                              <ListItemButton
                                                onClick={() => setPageNo(2)}
                                              >
                                                <ListItemIcon
                                                  style={{
                                                    minWidth: "25px",
                                                    marginInlineEnd: "10px",
                                                  }}
                                                >
                                                  <ExitToAppIcon />
                                                </ListItemIcon>
                                                <ListItemText
                                                  primary="Reset Password"
                                                  className={
                                                    pageNo === 2
                                                      ? "active"
                                                      : " "
                                                  }
                                                />
                                              </ListItemButton>
                                            </ListItem>
                                          </List>
                                        </nav>
                                      </Box>
                                    </div>
                                  </div>
                                </div>
                                {pageNo === 1 && (
                                  <div className="col-md-8">
                                    <div className="card">
                                      <div className="row">
                                        <h3 className="form-label d-flex justify-content-between">
                                          Profile info.{" "}
                                          <Link
                                            // to="/edit-SubAdmin/:id"
                                            className="text-primary text-decoration-none text-small edit-page "
                                          >
                                            <button
                                              style={{
                                                backgroundColor: "transparent",
                                                borderWidth: "0px",
                                                borderColor: "transparent",
                                              }}
                                              className="text-primary text-decoration-none text-small edit-page "
                                              type="button"
                                              onClick={handleUpdate}
                                            >
                                              Edit
                                            </button>
                                            {console.log(
                                              "clicked",
                                              showUpdateButton
                                            )}
                                          </Link>
                                        </h3>

                                        <div className="form-box-inner col-lg-6 col-md-6 mb-3">
                                          <div className="input-box">
                                            <label className="form-label">
                                              User Id
                                            </label>

                                            <input
                                              type="text"
                                              disabled={
                                                showUpdateButton ? false : true
                                              }
                                              placeholder={"type your name"}
                                              value={userId}
                                              onChange={(e) => {
                                                setUserId(e.target.value);
                                              }}
                                            />
                                          </div>
                                        </div>
                                        <div className="form-box-inner col-lg-6 col-md-6 mb-3">
                                          <div className="input-box">
                                            <label className="form-label">
                                              Name
                                            </label>

                                            <input
                                              type="text"
                                              disabled={
                                                showUpdateButton ? false : true
                                              }
                                              placeholder={"type your name"}
                                              value={name}
                                              onChange={(e) => {
                                                setName(e.target.value);
                                              }}
                                            />
                                          </div>
                                        </div>
                                        <div className="form-box-inner col-lg-6 col-md-6 mb-3">
                                          <div className="input-box">
                                            <label className="form-label">
                                              Email Address
                                            </label>

                                            <input
                                              type="email"
                                              disabled={
                                                showUpdateButton ? false : true
                                              }
                                              placeholder={"type your Email"}
                                              value={email}
                                              onChange={(e) => {
                                                setEmail(e.target.value);
                                                setEmailError("");
                                              }}
                                            />
                                            {emailError && (
                                              <span
                                                style={{ color: "red" }}
                                                className="error"
                                              >
                                                {emailError}
                                              </span>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                      <div className="btn-box d-flex lav">
                                        {showUpdateButton && (
                                          <button
                                            type="button"
                                            className="blue-btn-default btn-sm"
                                            onClick={handleSubmit}
                                          >
                                            Update
                                          </button>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                )}
                                {pageNo === 2 && (
                                  <div className="col-md-8">
                                    <div className="card">
                                      <div className="row">
                                        <h3 className="form-label d-flex justify-content-between">
                                          Reset Password
                                        </h3>

                                        <div className="form-box-inner col-lg-6 col-md-6 mb-3">
                                          <div className="input-box">
                                            <label className="form-label">
                                              Old Password
                                            </label>
                                            <div class="position-relative">
                                              <input
                                                type={
                                                  showOldPassword
                                                    ? "text"
                                                    : "password"
                                                }
                                                placeholder={
                                                  "type your old password"
                                                }
                                                value={oldPassword}
                                                onChange={(e) => {
                                                  setOldPassword(
                                                    e.target.value
                                                  );
                                                }}
                                              />

                                              <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={
                                                  toggleOldPasswordVisibility
                                                }
                                                onMouseDown={
                                                  handleMouseDownPassword
                                                }
                                                edge="end"
                                                sx={{
                                                  position: "absolute",
                                                  top: "0px",
                                                  right: "20px",
                                                }}
                                              >
                                                {showOldPassword ? (
                                                  <Visibility />
                                                ) : (
                                                  <VisibilityOff />
                                                )}
                                              </IconButton>
                                            </div>
                                            {/* <button
                                              type="button"
                                              onClick={togglePasswordVisibility}
                                            >
                                              {showPassword ? "Hide" : "Show"}
                                              Password
                                            </button> */}
                                          </div>
                                        </div>
                                        <div className="form-box-inner col-lg-6 col-md-6 mb-3">
                                          <div className="input-box">
                                            <label className="form-label">
                                              New Password
                                            </label>
                                            <div class="position-relative">
                                              <input
                                                type={
                                                  showNewPassword
                                                    ? "text"
                                                    : "password"
                                                }
                                                placeholder={
                                                  "type new password"
                                                }
                                                value={password}
                                                onChange={handlePasswordChange}
                                              />

                                              <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={
                                                  toggleNewPasswordVisibility
                                                }
                                                onMouseDown={
                                                  handleMouseDownPassword
                                                }
                                                edge="end"
                                                sx={{
                                                  position: "absolute",
                                                  top: "0px",
                                                  right: "20px",
                                                }}
                                              >
                                                {showNewPassword ? (
                                                  <Visibility />
                                                ) : (
                                                  <VisibilityOff />
                                                )}
                                              </IconButton>
                                            </div>
                                            {passwordError && (
                                              <div
                                                className="error"
                                                style={{ color: "red" }}
                                              >
                                                {passwordError}
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                        <div className="form-box-inner col-lg-6 col-md-6 mb-3">
                                          <div className="input-box">
                                            <label className="form-label">
                                              Confirm Password
                                            </label>
                                            <div className="position-relative">
                                              <input
                                                type={
                                                  showConfirmPassword
                                                    ? "text"
                                                    : "password"
                                                }
                                                placeholder={
                                                  "type confirm password"
                                                }
                                                value={confirmPassword}
                                                onChange={
                                                  handleConfirmPasswordChange
                                                }
                                              />

                                              <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={
                                                  toggleConfirmPasswordVisibility
                                                }
                                                onMouseDown={
                                                  handleMouseDownPassword
                                                }
                                                edge="end"
                                                sx={{
                                                  position: "absolute",
                                                  top: "0px",
                                                  right: "20px",
                                                }}
                                              >
                                                {showConfirmPassword ? (
                                                  <Visibility />
                                                ) : (
                                                  <VisibilityOff />
                                                )}
                                              </IconButton>
                                            </div>
                                            {confirmPasswordError && (
                                              <div
                                                style={{ color: "red" }}
                                                className="error"
                                              >
                                                {confirmPasswordError}
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                      <div className="btn-box d-flex">
                                        <button
                                          type="button"
                                          className="blue-btn-default btn-sm"
                                          onClick={handlePasswordReset}
                                        >
                                          Reset
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* [/Card] */}
                </div>
              </div>
            </div>
          </div>

          {/* <div class="container-fluid page-content-box p-lg-5 p-md-4 p-3">
            <div class="row">
              <div class="col">
                <div className="login-section p-0">
                   
                  <div className="card dashboardCard height-100">
                    <div className="card-body p-0">
                      <div className="row">
                        <div className="col">
                          <form className="form-box p-0">
                            <div className=" ">
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
                                            <img
                                              src={userIcon}
                                              alt="user-icon"
                                            />
                                          )}
                                          <div className="userImgEdit">
                                            <Fab
                                              sx={{ width: 36, height: 36 }}
                                              color="primary"
                                              aria-label="edit"
                                              htmlFor="formFile"
                                            >
                                              <EditIcon
                                                sx={{ width: 16, height: 16 }}
                                                className="iconEdit"
                                              />
                                              <input
                                                className="form-control"
                                                type="file"
                                                id="formFile"
                                                onChange={handleFileChange}
                                                style={{
                                                  opacity: "0",
                                                  visibility: "visible",
                                                }}
                                              />
                                            </Fab>
                                          </div>
                                        </div>
                                      </div>
                                      <h3 className="userName">
                                        Anthony Adewumi
                                      </h3>
                                      <h6 className="userEmail">
                                        anthony.adewumi@outlook.com
                                      </h6>
                                      <hr
                                        style={{
                                          width: "60%",
                                          margin: "10px auto",
                                        }}
                                      />
                                      <Box>
                                        <nav>
                                          <List className="userEditBox">
                                            <ListItem disablePadding>
                                              <ListItemButton
                                                onClick={() => setPageNo(1)}
                                              >
                                                <ListItemIcon
                                                  style={{
                                                    minWidth: "25px",
                                                    marginInlineEnd: "10px",
                                                  }}
                                                >
                                                  <AccountCircleOutlinedIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="My Profile" />
                                              </ListItemButton>
                                            </ListItem>
                                            <Divider
                                              style={{
                                                borderColor: "rgb(0 0 0 / 70%)",
                                              }}
                                            />
                                            <ListItem
                                              disablePadding
                                              // style={{
                                              //   backgroundColor:
                                              //     pageNo === 2
                                              //       ? "#dee2e6"
                                              //       : "none",
                                              //   borderRadius:
                                              //     pageNo === 2 ? "5px" : "0",
                                              // }}
                                            >
                                              <ListItemButton
                                                onClick={() => setPageNo(2)}
                                              >
                                                <ListItemIcon
                                                  style={{
                                                    minWidth: "25px",
                                                    marginInlineEnd: "10px",
                                                  }}
                                                >
                                                  <ExitToAppIcon />
                                                </ListItemIcon>
                                                <ListItemText
                                                  className={
                                                    pageNo === 2
                                                      ? "active"
                                                      : " "
                                                  }
                                                  primary="Reset Password"
                                                />
                                              </ListItemButton>
                                            </ListItem>
                                          </List>
                                        </nav>
                                      </Box>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};
export default MyProfilePage;
