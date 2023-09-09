import React, { useState, useEffect, useRef } from "react";
import "../../../assets/css/login.css";
import Logo from "../../../assets/images/logoBig.png";
import { Validation } from "../../../helpers/validation.js";
import { Link, useNavigate } from "react-router-dom";
//import Swal from "sweetalert2";
import { loginAction } from "../../../redux/actions/user";
import { connect, useDispatch, useSelector } from "react-redux";

function PhoneOtp({ loginAction }) {
  const dispatch = useDispatch();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState({});
  const navigate = useNavigate();
  const inputRefs = useRef([]);

  const newValidation = () => {
    let error = {};
    // Email validation
    if (Validation.empty(otp.trim())) {
      error = { ...error, otp: "Otp is required" };
    } else if (!Validation.otp(otp)) {
      error = {
        ...error,
        otp: "Please enter a Otp in the correct format",
      };
    }
    //else if (!Validation.otpLength(otp)) {
    //   error = { ...error, otp: "Max 1 characters allowed" };
    // }

    if (Object.keys(error).length) {
      setError(error);
      return false;
    } else {
      setError({});
      return true;
    }
  };

  useEffect(() => {
    const loginToken = localStorage.getItem("token");
    if (loginToken === true) {
      navigate("/dashboard");
    }
  }, []);

  const handleResendOtp = () => {};

  const handleInputChange = (index, value) => {
    setOtp((prevNumber) => {
      const updatedNumber = prevNumber.split("");
      updatedNumber[index] = value;
      return updatedNumber.join("");
    });

    if (value !== "" && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleSubmit = async () => {
    if (newValidation()) {
      const payload = {
        otp: otp,
      };
      let result = await loginAction(payload);
      if (result.status === 200) {
        navigate("/dashboard");
      }
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
                <h2>Enter OTP</h2>
                <p>
                  Please Enter the 4-digit OTP sent to your Registered Phone
                  Number
                </p>
              </div>
              <form className="form-box">
                <div className="form-box-inner">
                  <div className="input-box col-auto">
                    <div className="otpInputBox">
                      {Array.from({ length: 4 }, (_, index) => (
                        <input
                          key={index}
                          ref={(ref) => (inputRefs.current[index] = ref)}
                          type="number"
                          maxLength="1"
                          minLength="1"
                          placeholder="*"
                          className="otpInput"
                          value={otp[index] || ""}
                          onChange={(e) => {
                            handleInputChange(index, e.target.value);
                            setError("");
                          }}
                        />
                      ))}
                    </div>
                    {error.otp && (
                      <span
                        className="error-msg"
                        style={{ color: "red", fontSize: "14px" }}
                      >
                        {error.otp}
                      </span>
                    )}
                    <div className="forgot-password d-flex justify-content-end">
                      <Link onClick={handleResendOtp}>Resend OTP</Link>
                    </div>
                  </div>
                  <div className="login-btn">
                    <button
                      type="button"
                      className="blue-btn-default"
                      onClick={handleSubmit}
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
}

const mapStateToProps = ({ userReducer }) => {
  return {
    isAuth: userReducer.isAuth,
  };
};

export default connect(mapStateToProps, {
  loginAction,
})(PhoneOtp);
