import React, { useState, useEffect } from "react";
import "../../../assets/css/login.css";
import Logo from "../../../assets/images/logoBig.png";
import { Validation } from "../../../helpers/validation.js";
import { Link, useNavigate } from "react-router-dom";
//import Swal from "sweetalert2";
import { loginAction } from "../../../redux/actions/user";
import { connect, useDispatch} from "react-redux";

function PhoneLogin({ loginAction }) {
  const dispatch = useDispatch();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState({});
  const navigate = useNavigate();
  const newValidation = () => {
    let error = {};
    // Email validation
    if (Validation.empty(phoneNumber.trim())) {
      error = { ...error, phoneNumber: "Phone Number is required" };
    } else if (!Validation.phoneNumber(phoneNumber)) {
      error = {
        ...error,
        phoneNumber: "Please enter an Phone Number in the correct format",
      };
    } else if (!Validation.phoneNumberLength(phoneNumber)) {
      error = { ...error, phoneNumber: "Max 10 characters allowed" };
    }
    // Password Validation

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
  const handleSubmit = async () => {
    if (newValidation()) {
      const payload = {
        phoneNumber: phoneNumber,
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
                <h2>Enter Phone Number</h2>
                <p>Please enter your Phone Number</p>
              </div>
              <form className="form-box">
                <div className="form-box-inner">
                  <div className="input-box">
                    <label className="form-label">Phone number</label>
                    <input
                      type="number"
                      minLength={10}
                      maxLength={10}
                      name="phNumber"
                      value={phoneNumber}
                      placeholder="Enter your Phone Number"
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      onFocus={() => setError({ ...error, phoneNumber: "" })}
                      onBlur={newValidation}
                    />
                    {error.phoneNumber && (
                      <span
                        className="error-msg"
                        style={{ color: "red", fontSize: "14px" }}
                      >
                        {error.phoneNumber}
                      </span>
                    )}
                  </div>
                  <div className="forgot-password d-flex justify-content-end">
                    <Link to="/CareGiver/Login">Back To Login by email?</Link>
                  </div>
                  <div className="login-btn">
                    <button
                      type="button"
                      className="blue-btn-default"
                      onClick={handleSubmit}
                    >
                      {" "}
                      Submit{" "}
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
})(PhoneLogin);
