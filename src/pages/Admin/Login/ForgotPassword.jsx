import React from "react";
import { Validation } from "../../../helpers/validation";
import { useState } from "react";
import Logo from "../../../assets/images/logoBig.png";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import apis from "../../../api/apis";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState({});
  const navigate = useNavigate();
  const newValidation = () => {
    let error = {};
    //email validation
    if (Validation.empty(email.trim())) {
      error = { ...error, email: "Email is required" };
    } else if (!Validation.email(email)) {
      error = {
        ...error,
        email: "Please enter e-mail address in correct format",
      };
    } else if (!Validation.emailLength(email)) {
      error = { ...error, email: "Max 100 characters allowed" };
    }

    if (Object.keys(error).length) {
      setError(error);
      return false;
    } else {
      setError({});
      return true;
    }
  };

  //handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newValidation()) {
      const payload = {
        email: email,
      };
      apis
        .post("/Authentication/ForgotPassword", payload)
        .then((res) => {
          if (res.status === 200) {
            Swal.fire({
              icon: "success",
              text: res.data.message,
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
                <h2>Password Assistance</h2>
                <p>
                  Enter your e-mail address to receive the link to reset your
                  password
                </p>
              </div>
              <form className="form-box">
                <div className="form-box-inner">
                  <div className="input-box">
                    <label>Enter Email Address</label>
                    <input
                      type="text"
                      name="email"
                      value={email}
                      placeholder="Enter your Email Address"
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={(e) => setError({ ...error, email: "" })}
                      onBlur={(e) => ({ newValidation })}
                    />
                    {error && (
                      <span
                        className="error-msg"
                        style={{ color: "red", fontSize: "14px" }}
                      >
                        {error?.email}
                      </span>
                    )}
                    {/* <span className='error-msg' style={{display: 'none'}}>Please enter valid email</span> */}
                    {/* <span className="input-icon">
                                  <img src="../../../assets/images/email-outline.png" alt="Icon" />
                              </span> */}
                  </div>
                  <div className="forgot-password d-flex justify-content-end">
                    <Link to="/">Back To Login?</Link>
                  </div>
                  <div className="login-btn">
                    <button
                      type="submit"
                      className="blue-btn-default"
                      onClick={(e) => handleSubmit(e)}
                    >
                      Submit
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
};
export default ForgotPassword;
