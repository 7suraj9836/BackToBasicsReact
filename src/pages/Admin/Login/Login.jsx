import React, { useState, useEffect } from "react";
import "../../../assets/css/login.css";
import Logo from "../../../assets/images/logoBig.png";
import { Validation } from "../../../helpers/validation.js";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
//import { loginAction } from "../../../redux/actions/user";
//import { connect, useDispatch, useSelector } from "react-redux";
import axios from 'axios';


function LoginPage() {
 // const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const navigate = useNavigate();
  const newValidation = () => {
    let error = {};
    // Email validation
    if (Validation.empty(email.trim())) {
      error = { ...error, email: "Email is required" };
    } else if (!Validation.email(email)) {
      error = {
        ...error,
        email: "Please enter an email address in the correct format",
      };
    } else if (!Validation.emailLength(email)) {
      error = { ...error, email: "Max 100 characters allowed" };
    }
    // Password Validation
 
    if (Validation.empty(password.trim())) {
      error = { ...error, password: "Please enter a password" };
    } else if (!Validation.password(password)) {
      error = {
        ...error,

        password: "Please enter the correct password",
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
        email: email,
        password: password,
      };
    //  let result = await loginAction(payload);
         
    let result=await axios.post('http://122.176.101.76:9000/api/Authentication/Login',payload);
    console.log(result);
    localStorage.setItem("BackToBasic-token", result.data.response.accessToken)
      if (result.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Login Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
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
                <h2>Welcome</h2>
                <p>Please enter your credentials to sign in</p>
              </div>
              <form className="form-box">
                <div className="form-box-inner">
                  <div className="input-box">
                    <label>Email</label>
                    <input
                      type="text"
                      name="email"
                      value={email}
                      placeholder="Enter your Email Address"
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setError({ ...error, email: "" })}
                      onBlur={newValidation}
                    />
                    {error.email && (
                      <span
                        className="error-msg"
                        style={{ color: "red", fontSize: "14px" }}
                      >
                        {error.email}
                      </span>
                    )}
                  </div>
                  <div className="input-box">
                    <label>Password</label>
                    <input
                      type="password"
                      name="password"
                      value={password}
                      placeholder="Enter your Password"
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => setError({ ...error, password: "" })}
                      onBlur={newValidation}
                    />
                    {error.password && (
                      <span
                        className="error-msg"
                        style={{ color: "red", fontSize: "14px" }}
                      >
                        {error.password}
                      </span>
                    )}
                  </div>

                  <div className="forgot-password d-flex justify-content-between">
                    <Link to="/phone-login">Login via phone number</Link>
                    <Link to="/forgotPassword">Forgot password?</Link>
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

export default LoginPage;

// const mapStateToProps = ({ userReducer }) => {
//   return {
//     isAuth: userReducer.isAuth,
//   };
// };

// export default connect(mapStateToProps, {
//   loginAction,
// })(LoginPage);
