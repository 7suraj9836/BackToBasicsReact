import React, { useState } from 'react'
import Sidebar from '../../pages/Admin/Sidebar/sidebar';
import Header from "../../components/Header/header"
import "../../components/Header/header.scss"
import "../../pages/Admin/Sidebar/sidebar.scss"
import { useNavigate } from 'react-router-dom';
import dpImg from '../../assets/images/changePassword.jpg'
import apis from '../../api/apis';
//imports related to toast
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ChangePassword = () => {
  const [currentImage, setCurrentImage] = useState("")
    const navigate = useNavigate();
    const [showSidebar, setShowSidebar] = useState(false);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [oldPasswordError, setOldPasswordError] = useState('');
    const [newPasswordError, setNewPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [count, setCount] = useState(0);
    const incrementCount = () => {
        setCount(count + 1);
    };

    const updateSidebar = () => {
        setShowSidebar(!showSidebar);
    };
    const retailer_accessToken = localStorage.getItem("BackToBasic-token");
    const handleOldPass = (e) => {
        setOldPassword(e.target.value);
        setOldPasswordError('');
    };

    const handleNewPass = (e) => {
        setNewPassword(e.target.value);
        setNewPasswordError('');
    };

    const handleConfirmPass = (e) => {
        setConfirmPassword(e.target.value);
        setConfirmPasswordError('');
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        incrementCount();
        if (count === 3) {
            const config = {
                headers: {
                    Authorization: `Bearer ${retailer_accessToken}`
                }
            }

            apis.post("/logout", {}, config)
                .then((res) => {
                    if (res.data.success === true) {
                        
                        toast.success("You have tried multiple times. Please login again.", { autoClose: 3000, position: toast.POSITION.TOP_CENTER })
                        localStorage.removeItem("BackToBasic-token");
                        navigate("/");
                    }
                    else {
                        toast.error("Could not logout.", { autoClose: 3000, position: toast.POSITION.TOP_CENTER })
                        // navigate("/retailer/dashboard")
                    }

                })
                .catch((error) => {
                    toast.error("Could not logout.", { autoClose: 3000, position: toast.POSITION.TOP_CENTER })
                    // navigate("/retailer/dashboard")
                })
            return
        }

        // Old Password validation
        if (!oldPassword) {
            setOldPasswordError('Old password is required.');
        }

        // New Password validation
        if (!newPassword) {
            setNewPasswordError('New password is required.');
        } else if (newPassword.length < 8) {
            setNewPasswordError('New password should be at least 8 characters long.');
        }

        // Confirm Password validation
        if (!confirmPassword) {
            setConfirmPasswordError('Confirm password is required.');
        } else if (confirmPassword.length < 8) {
            setConfirmPasswordError('Confirm password should be at least 8 characters long.');
        } else if (newPassword !== confirmPassword) {
            setConfirmPasswordError('Passwords do not match.');
        }

        // If all validations pass, continue with form submission or other logic
        if (oldPassword && newPassword && confirmPassword && newPassword.length >= 8 && confirmPassword.length >= 8 && newPassword === confirmPassword) {
            const config = {
                headers: {
                    Authorization: `Bearer ${retailer_accessToken}`
                }
            }
            console.log(config);
            const bodyData = {
                oldPassword: oldPassword,
                newPassword: confirmPassword
            }
            apis.post('/Authentication/ChangePassword', bodyData, config)
                .then((res) => {
                    if (res.data.succeeded === true) {
                        toast.success("Your password has been successfully. Please login again.", { autoClose: 3000, position: toast.POSITION.TOP_CENTER });
                       // Remove a token from local storage
                       localStorage.removeItem("BackToBasic-token");
 
                        navigate("/");
                    }

                    else {
                        toast.success("Old Password does not match. Please try again", { autoClose: 3000, position: toast.POSITION.TOP_CENTER });
                    }
                })
                .catch((err) => {
                    console.log(err)
                    if (err.response.status === 400) {
                        toast.error("Bad request. Please check your input.", { autoClose: 3000, position: toast.POSITION.TOP_CENTER });
                    } else if (err.response.status === 401) {
                        toast.error("Authentication failed. Please log in again.", { autoClose: 3000, position: toast.POSITION.TOP_CENTER });
                    } else {
                        toast.error("Something went wrong. Please try again later.", { autoClose: 3000, position: toast.POSITION.TOP_CENTER });
                    }
                    

                })
            // Reset the form values
            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');
        }
    };


    return (
        <div class="container-fluid page-wrap add-supplier">
            <div class="row height-inherit">
            {/* <Sidebar userType={"retailer"} /> */}
                <Sidebar showSidebar={showSidebar} updateSidebar={updateSidebar} />
                <div class="col main p-0">
                    {/* <Header title="Change Password" updateSidebar={updateSidebar} /> */}
                      <Header title="Create Visit Schedule" updateSidebar={updateSidebar} />
                    <div class="container-fluid page-content-box px-3 px-sm-4">
                        <div class="row">
                            <div class="col">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="form-box col col-sm-12 col-xl-12"> 
                                            <form>
                                                <div className="row mb-3">
                                                    <div className="form-head w-100">
                                                        Change Password
                                                    </div>
                                                    <hr />
                                                    <div className="col-sm-4 mb-4 mb-sm-0">
                                                        <div className="card shadow-none img-card h-100">
                                                            <div className="card-body d-flex justify-content-center align-items-center">
                                                            <div className="row">
                                                                <div className="col text-center d-flex flex-column justify-content-center align-items-center">
                                                                <div className="dp-img mb-4 mx-auto position-relative rounded-circle d-inline-flex">
                                                                <img
                                                                    src={currentImage === "" || currentImage === null ? dpImg : currentImage}
                                                                    className="dp-img rounded-circle"
                                                                    />
                                                                     
                                                                </div>
                                                                </div>
                                                            </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-8">
                                                        <div className="row">
                                                            <div className="col-sm-6 mb-3">
                                                                <label className="form-label">
                                                                    Old Password
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    value={oldPassword}
                                                                    onChange={(e) => handleOldPass(e)}
                                                                    placeholder="Enter Password"
                                                                />
                                                                {oldPasswordError !== "" ? (
                                                                    <p className="error-label m-0 p-0">{oldPasswordError}</p>
                                                                ) : (
                                                                    <></>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-sm-6 mb-3">
                                                                <label className="form-label">
                                                                    New Password
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    value={newPassword}
                                                                    onChange={(e) => handleNewPass(e)}
                                                                    placeholder="Enter new password"
                                                                />
                                                                {newPasswordError !== "" ? (
                                                                    <p className="error-label m-0 p-0">{newPasswordError}</p>
                                                                ) : (
                                                                    <></>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-sm-6 mb-3">
                                                                <label className="form-label">
                                                                    Confirm Password
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    value={confirmPassword}
                                                                    onChange={(e) => handleConfirmPass(e)}
                                                                    placeholder="Enter new password"
                                                                />
                                                                {confirmPasswordError !== "" ? (
                                                                    <p style={{color:"red"}}   className="error-label m-0 p-0">{confirmPasswordError}</p>
                                                                ) : (
                                                                    <></>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-sm-6 mb-3">
                                                                <button  className="blue-btn-default btn-sm" onClick={(e) => handleSubmit(e)} >Submit</button>
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
            </div >
        </div >
    )
}

export default ChangePassword
