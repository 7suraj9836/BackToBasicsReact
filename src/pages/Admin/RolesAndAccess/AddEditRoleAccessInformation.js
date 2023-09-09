import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar/sidebar";
import Header from "../../../components/Header/header.js";
import "../../../components/Header/header.scss";
import "../Sidebar/sidebar.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import apis from "../../../api/apis";
import AssignPermissionsModal from "./AssignPermissionsModal";

const EditRoleAccessInformation = () => {
  const [roleName, setRoleName] = useState("");
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("BackToBasic-token");
  const { id } = useParams();

useEffect(()=>{
  console.log(selectedPermissions);
},[selectedPermissions])


  const handleFormSubmit = () => {
    const payload = {
      id:parseInt(id,10), 
      
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
                                        placeholder="Enter Role Name"
                                        type="text"
                                        value={roleName}
                                        onChange={(e) => {
                                          setRoleName(e.target.value);
                                        }}
                                      />
                                    </div>
                                  </div>
                                  <AssignPermissionsModal
                                    roleName={roleName}
                                    selectedPermissions={selectedPermissions} 
                                    id={id}
                                    //setSelectedPermissions={setSelectedPermissions}
                                  />
                                </div>
                              </div>
                              <button
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
                              </button>
                              <button
                                style={{
                                  marginLeft: 225,
                                  marginTop: -48,
                                  paddingLeft: 50,
                                  paddingRight: 50,
                                }}
                                type="button"
                                className="blue-btn-default"
                                onClick={() => {
                                  navigate("/roles-and-access");
                                }}
                              >
                                Cancel
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

export default EditRoleAccessInformation




// import React, { useState } from "react";
// import { useEffect } from "react";
// import Sidebar from "../Sidebar/sidebar";
// import "../../../assets/css/login.css";
// import Header from "../../../components/Header/header.js";
// import "../../../components/Header/header.scss";
// import "../Sidebar/sidebar.scss";
// import { Link, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import apis from "../../../api/apis";
// import AssignPermissionsModal from "./AssignPermissionsModal";

// const AddEditRoleAccessInformation = () => {
//   const [roleName, setRoleName] = useState("");
//   const [selectedPermissions, setSelectedPermissions] = useState([]);
//   const [showSidebar, SetShowSidebar] = useState(false);
//   const updateSidebar = () => {
//     SetShowSidebar(!showSidebar);
//   };
//   const navigate = useNavigate();
//   const token = localStorage.getItem("BackToBasic-token");

//   const handleFormSubmit = () => {
//     const payload = {
//       name: roleName,
//       permissions: selectedPermissions,
//     };

//     const config = {
//       headers: {
//         authorization: `Bearer ${token}`,
//         "Access-Control-Allow-Origin": "*",
//       },
//     };
//     apis
//       .post(`RolesAndAccess/SaveRolesAndAccess`, payload, config)
//       .then((res) => {
//         Swal.fire({
//           icon: "success",
//           timer: 1500,
//           text: `Role added successfully`,
//           showConfirmButton: false,
//         });
//         navigate("/roles-and-access");
//         console.log("navigate to role");
//       })
//       .catch((err) => {
//         console.log(err);
//         Swal.fire({
//           icon: "error",
//           timer: 1500,
//           text: `Something went worng`,
//           showConfirmButton: false,
//         });
//       });
//   };

//   return (
//     <>
//       <div class="container-fluid page-wrap">
//         <div class="row height-100 d-flex">
//           <Sidebar showSidebar={showSidebar} updateSidebar={updateSidebar} />
//           <div class="col main p-0">
//             <Header
//               title="Add/Edit SubAdmin Information"
//               updateSidebar={updateSidebar}
//             />
//             <div class="container-fluid page-content-box p-lg-5 p-md-4 p-3">
//               <div class="row">
//                 <div class="col">
//                   <div className="login-section p-0">
//                     {/* [Card] */}
//                     <div className="card dashboardCard height-100">
//                       <div className="card-body p-0">
//                         <div className="row">
//                           <div className="col">
//                             <div className="card">
//                               <form className="form-box p-0">
//                                 <div className="row">
//                                   <div className="form-box-inner col-xxl-4 col-md-6 mb-3">
//                                     <div className="input-box">
//                                       <label className="form-label">
//                                         RoleName
//                                       </label>

//                                       <input
//                                         placeholder="Enter Role Name"
//                                         type="text"
//                                         value={roleName}
//                                         onChange={(e) => {
//                                           setRoleName(e.target.value);
//                                         }}
//                                       />
//                                     </div>
//                                   </div>
//                                   <div className="form-box-inner col-xxl-4 col-md-6 mb-3 align-items-end d-flex">
//                                     <AssignPermissionsModal
//                                       roleName={roleName}
//                                     />
//                                   </div>
//                                 </div>
//                               </form>
//                             </div>
//                             <div className="btn-box d-flex">
//                               <button
//                                 type="button"
//                                 className="blue-btn-default btn-sm"
//                                 onClick={handleFormSubmit}
//                               >
//                                 Submit
//                               </button>
//                               <button
//                                 type="button"
//                                 className="blue-btn-default btn-sm btn-outline-gray"
//                                 onClick={() => {
//                                   navigate("/roles-and-access");
//                                 }}
//                               >
//                                 Cancel
//                               </button>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                     {/* [/Card] */}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };
// export default AddEditRoleAccessInformation;
