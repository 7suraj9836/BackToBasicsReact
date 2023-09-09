import React, { useState } from 'react';
import { useEffect } from 'react';
import Sidebar from "../Sidebar/sidebar";
import "../../../assets/css/login.css";
import Header from "../../../components/Header/header.js";
import "../../../components/Header/header.scss";
import '../Sidebar/sidebar.scss';
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Axios from 'axios';
import apis from "../../../api/apis";


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
  const updateSidebar = () => { SetShowSidebar(!showSidebar); }
  const navigate = useNavigate();
  const token = localStorage.getItem("BackToBasic-token")
 
  const getAllState = async () => {

    const config =  {
      headers: {
          authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
      },
  
    }
    apis.get(`Shared/GetAllStates`,config)
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
    { id: 1, value: "Super-Admin 1" },
    { id: 2, value: "Sub-Admin 2" },
  ];
  const handleRoleChange = (event) => {
    setRoleId(event.target.value);
  };

  useEffect(() => {

    let aHeader = localStorage.getItem("BackToBasic-token");
    Axios
        .get(`http://122.176.101.76:9000/api/SubAdmin/GetSubAdmin?id=${id}`,
            {
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
           
        }).catch((err) => {
            console.log(err);
        })

}, [id])


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
                                <div className="form-box-inner col-lg-4 col-md-6 mb-4">
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
                                <div className="form-box-inner col-lg-4 col-md-6 mb-4">
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

                                <div className="form-box-inner col-lg-4 col-md-6 mb-4">
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
  
                                <div className="form-box-inner col-lg-4 col-md-6 mb-4">
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
  
                                <div className="form-box-inner col-lg-4 col-md-6 mb-4">
                                  <div className="input-box">
                                    <label className="form-label">
                                      City
                                    </label>
  
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
  
                                <div className="form-box-inner col-lg-4 col-md-6 mb-4">
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
  
                                <div className="form-box-inner col-lg-4 col-md-6 mb-4">
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

                                <div className="form-box-inner col-lg-4 col-md-6 mb-4">
                                  <div className="input-box">
                                    <label className="form-label">
                                      Role
                                    </label>
  
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
  
                             
                              {/* <button
                                style={{ marginLeft: 456, marginTop: -52 }}
                                type="button"
                                className="blue-btn-default"
                                onClick={""}
                              >
                                Submit
                              </button> */}
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
  )
}

export default ViewSubAdmin;
