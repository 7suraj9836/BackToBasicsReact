import React, { useState, useEffect } from "react";
import "../../../assets/css/login.css";
import Logo from "../../../assets/images/logoBig.png";
import { Validation } from "../../../helpers/validation.js";
import { Link, useNavigate, useParams } from "react-router-dom";
//import Swal from "sweetalert2";
import { resetAction } from "../../../redux/actions/user";
//import { useDispatch, useSelector } from "react-redux";
import { connect } from "react-redux";
import apis from "../../../api/apis";
import Swal from "sweetalert2";

function ResetPage() {
  const [newPassword, setNewPassword] = useState("");
  const [cnfPassword, setCnfPassword] = useState("");
  const [error, setError] = useState({});
  const routPrams = useParams();
  const navigate = useNavigate();

  const newValidation = () => {
    let error = {};

    // Password Validation
    if (Validation.empty(newPassword.trim())) {
      error = { ...error, newPassword: "Please enter a password" };
    } else if (!Validation.password(newPassword)) {
      error = {
        ...error,
        newPassword:
          "Please enter the password in the correct format (e.g., Minimum eight characters, at least one uppercase letter, one lowercase letter, and one number)",
      };
    }

    if (Validation.empty(cnfPassword.trim())) {
      error = { ...error, cnfPassword: "Please enter a password" };
    } else if (newPassword !== cnfPassword) {
      error = {
        ...error,
        cnfPassword: "New Password and Confirm Password not match",
      };
    }

    if (Object.keys(error).length) {
      setError(error);
      return false;
    } else {
      setError({});
      return true;
    }
  };

  const handleSubmit = async () => {
    if (newValidation()) {
      const payload = {
        Password: newPassword,
        Id: Number.parseInt(routPrams.userId),
        Password_reset_key: routPrams.resetKey,
      };
      apis
        .post("/Authentication/ResetPassword", payload)
        .then((res) => {
          if (res.status === 200) {
            Swal.fire({
              icon: "success",
              text: "Your password has changed. You can login now.",
              timer: 1700,
            });
            navigate("/");
          }
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            timer: 1500,
            text: `${err.response.data.message}`,
            showConfirmButton: false,
          });
        });
    }
  };
  return (
    <>
      <section className="login-section">
        <div className="dis-flex">
          <div className="left-box">
            <div className="left-box-inner">
              <h1>
                Start your
                <br /> Journey with us.
              </h1>
              <p>Amet minim mollit non deserunt ulaliqsint.</p>
            </div>
          </div>
          <div className="right-box">
            <div className="right-box-inner">
              <img src={Logo} alt="Logo" />
              <div className="head">
                <h2>Reset Password</h2>
                <p>Please enter new password.</p>
              </div>
              <form className="form-box">
                <div className="form-box-inner">
                  <div className="input-box">
                    <label>New Password</label>
                    <input
                      value={newPassword}
                      type="password"
                      placeholder="Enter your Password*"
                      onChange={(e) => setNewPassword(e.target.value)}
                      onFocus={(e) => setError({ ...error, newPassword: "" })}
                      onBlur={(e) => ({ newValidation })} // Corrected the onBlur event handler
                    />
                    {error && (
                      <span
                        className="error-msg"
                        style={{ color: "red", fontSize: "14px" }}
                      >
                        {error?.newPassword}
                      </span>
                    )}
                  </div>
                  <div className="input-box">
                    <label>Confirm Password</label>
                    <input
                      value={cnfPassword}
                      type="password"
                      placeholder="Re-enter your Password*"
                      onChange={(e) => setCnfPassword(e.target.value)}
                      onFocus={() => setError({ ...error, cnfPassword: "" })}
                      onBlur={(e) => ({ newValidation })} // Corrected the onBlur event handler
                    />
                    {error && (
                      <span
                        className="error-msg"
                        style={{ color: "red", fontSize: "14px" }}
                      >
                        {error?.cnfPassword}
                      </span>
                    )}
                  </div>
                  <div className="forgot-password">
                    <Link to="/">Back To Login?</Link>
                  </div>
                  <div className="login-btn">
                    <button
                      type="button"
                      className="blue-btn-default"
                      onClick={handleSubmit}
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default ResetPage;
