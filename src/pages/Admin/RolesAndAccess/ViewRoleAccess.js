import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar/sidebar";
import Header from "../../../components/Header/header.js";
import "../../../components/Header/header.scss";
import "../Sidebar/sidebar.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import apis from "../../../api/apis";
import ViewPermissionModal from "./ViewPermissionModal";

const ViewRoleAccess = () => {
    const [roleName, setRoleName] = useState("");
    const [selectedPermissions, setSelectedPermissions] = useState([]);
    const [showSidebar, setShowSidebar] = useState(false);
    const navigate = useNavigate();
    const token = localStorage.getItem("BackToBasic-token");
    const { id } = useParams();
  
    useEffect(() => {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      // Fetch data for editing using the id parameter
      apis
        .get(`/RolesAndAccess/GetRolesAndAccess?id=${id}`, config)
        .then((res) => {
          const { name, permissions } = res.data.response;
          setRoleName(name);
          setSelectedPermissions(permissions);
          console.log(permissions);
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            timer: 1500,
            text: `Something went wrong`,
            showConfirmButton: false,
          });
        });
    }, [id, token]);
  
  useEffect(()=>{
    console.log(selectedPermissions);
  },[selectedPermissions])
  
  
    const handleFormSubmit = () => {
      const payload = {
        id:parseInt(id,10), // Use the id received from useParams for updating the existing role
        
        name: roleName,
        permissions: selectedPermissions,
      };
      console.log(payload);
  
      const config = {
        headers: {
          authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
        },
      };
      // Call the API to save the edited role data
      apis
        .post(`RolesAndAccess/SaveRolesAndAccess`, payload, config)
        .then((res) => {
          Swal.fire({
            icon: "success",
            timer: 1500,
            text: `Role updated successfully`,
            showConfirmButton: false,
          });
          navigate("/roles-and-access");
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
  
    return (
      <>
        <div className="container-fluid page-wrap">
          <div className="row height-100 d-flex">
            <Sidebar showSidebar={showSidebar} updateSidebar={() => setShowSidebar(!showSidebar)} />
            <div className="col main p-0">
              <Header
                title="Edit Role Access Information"
                updateSidebar={() => setShowSidebar(!showSidebar)}
              />
              <div className="container-fluid page-content-box p-lg-5 p-md-4 p-3">
                <div className="row">
                  <div className="col">
                    <div className="card dashboardCard height-100">
                      <div className="card-body">
                        <div className="row">
                          <div className="col">
                            <div className="card login-section">
                              <form className="form-box">
                                <div className="row">
                                  <div style={{ display: "flex" }}>
                                    <div className="form-box-inner col-lg-4 col-md-6 mb-3">
                                      <div className="input-box">
                                        <label className="form-label">Role Name</label>
                                        <input
                                        disabled
                                         // placeholder="Enter Role Name"
                                          type="text"
                                          value={roleName}
                                          onChange={(e) => {
                                            setRoleName(e.target.value);
                                          }}
                                        />
                                      </div>
                                    </div>
                                    <ViewPermissionModal
                                      roleName={roleName}
                                      selectedPermissions={selectedPermissions} 
                                      id={id}
                                      //setSelectedPermissions={setSelectedPermissions}
                                    />
                                  </div>
                                </div>
                                {/* <button
                                  style={{
                                    marginTop: 15,
                                    paddingLeft: 50,
                                    paddingRight: 50,
                                  }}
                                  type="button"
                                  className="blue-btn-default"
                                  onClick={handleFormSubmit}
                                >
                                  Submit
                                </button> */}
                                <button
                                  style={{
                                    marginLeft: 0,
                                    marginTop: 8,
                                    paddingLeft: 50,
                                    paddingRight: 50,
                                  }}
                                  type="button"
                                  className="blue-btn-default"
                                  onClick={() => {
                                    navigate("/roles-and-access");
                                  }}
                                >
                                  Back
                                </button>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
export default ViewRoleAccess;
