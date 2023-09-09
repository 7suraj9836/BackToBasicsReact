import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/sidebar";
import Header from "../../../components/Header/header.js";
import "../../../components/Header/header.scss";
import "../Sidebar/sidebar.scss";
import downloadFile from "../../../assets/images/download-file.png";
import plusIcon from "../../../assets/images/plusIcon.png";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import apis from "../../../api/apis";
import Swal from "sweetalert2";

const AuthorizationManagement = () => {
  const [showSidebar, SetShowSidebar] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const updateSidebar = () => {
    SetShowSidebar(!showSidebar);
  };
  const [employee, setEmployee] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("BackToBasic-token");
console.log(employee,"sdfjksdf");

const handleDownload = () => {
  const config = {
          headers:{
            Authorization: `Bearer ${token}`
          }
        }
  apis.get("/Client/DownloadClientDataReport",config)
    .then((response )=>{ 
      console.log(response,'res');  
      return response.data;
    })
    .then(base64 => {
      const link = document.createElement('a');
      console.log(base64 ,'base64');
      link.href = base64;
      link.target='_blank';
      link.setAttribute('download', 'client-report.pdf');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    })
    .catch(error => {
      console.log('Error occurred during file download:', error);
    });
};

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    apis
      .get(
        `/Authorization/GetAllAuthorizations?pageNumber=1&pageSize=15&searchName=${searchQuery}`,
        config
      )
      .then((res) => {
  
        setEmployee(res.data.records);
              console.log(res.data.records,"jhghgh");
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          timer: 1500,
          text: `Something went worng`,
          showConfirmButton: false,
        });
      });
  }, [searchQuery]);

  const handleView = (id) => {
    navigate(`/view-authorization-management/${id}`);
  };

  const handleEditEmployee = (id) => {
    navigate(`/edit-authorization-management/${id}`);
  };

  const handleDelete = async (itemId) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    apis
      .delete(`/Authorization/DeleteAuthorization?id=${itemId}`, config)

      .then((res) => {
        const updatedEmployee = employee.filter(
          (employee) => employee.id !== itemId
        );
        setEmployee(updatedEmployee);
        Swal.fire({
          icon: "success",
          timer: 1500,
          text: `Employee deleted successfully`,
          showConfirmButton: false,
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          timer: 1500,
          text: `Something went worng`,
          showConfirmButton: false,
        });
      });
  };

  return (
    <div className="container-fluid page-wrap">
      <div className="row height-100">
        <Sidebar showSidebar={showSidebar} updateSidebar={updateSidebar} />
        <div className="col main p-0">
          <Header
            title="Authorization Management"
            updateSidebar={updateSidebar}
          />
          <div className="container-fluid page-content-box p-lg-5 p-md-4 p-3">
            <div className="row">
              <div className="col">
              
                <div className="card user-card height-100">
                  <div className="card-body">
                    <div className="row">
                      <div className="col">
                        <div className="card-top-filter-box p-3">
                
                          <div className="search-table">
                            <div className="form-group">
                              <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="search-input"
                                placeholder="Search Here..."
                              />
                              <input type="submit" className="searchIcon" />
                            </div>
                          </div>
                     
                          <div className="tableRightLink d-flex ">
                            <Link to="/add-authorization-management">
                              <i className="addPage">
                                <img
                                  className="linkImg"
                                  src={plusIcon}
                                  alt="add-employee"
                                />
                              </i>{" "}
                              Add Authorization
                            </Link>
                            <Link to="" className="imgWithLink ms-2">
                              <img
                                className="linkImg"
                                src={downloadFile}
                                alt="Download Report"
                                onClick={handleDownload}
                              />{" "}
                              Download Report
                            </Link>
                          </div>
                         
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <div className="table-responsive w-100">
                          <table className="table m-0 butifyTable ">
                            <thead>
                              <tr>
                                <th>Client NAME</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Total Authorized Unit</th>
                                <th>Authorization Number</th>
                                <th>Hours/wk/Approved</th>
                                <th>Total Hours Worked</th>
                                <th>Hours Remaining</th>
                                <th>Status</th>
                                <th className="text-end">Action</th>
                              </tr>
                            </thead>

                            <tbody>
                              {employee[0] && employee.map((i)=>(
                           
                              <tr key={i.id}>
                                <td>{i.client}</td>
                                <td>{i.authorization_start_date}</td>
                                <td>{i.authorization_end_date}</td>
                                <td>{i.total_units_authorized}</td>
                                <td>{i.authorization_number}</td>
                                <td>{i.total_hours_per_week_worked}</td>
                                <td>{i.total_hours_worked}</td>
                                <td>{i.total_hours_remaining}</td>
                                <td>
                                  <button className="btn btn-sm btn-success">
                                    Active
                                  </button>
                                </td>
                                <td className="text-end position-relative">
                                  <div className="btn-group dropstart table-action position-static">
                                    <button
                                      type="button"
                                      className="dropdown-toggle"
                                      data-bs-toggle="dropdown"
                                      aria-expanded="false"
                                    >
                                      <span></span>
                                    </button>
                                    <ul className="dropdown-menu">
                                      <li>
                                        {" "}
                                        <p
                                          onClick={() => handleView(i.id)}
                                          className="dropdown-item"
                                        >
                                          {" "}
                                          <VisibilityIcon /> View
                                        </p>{" "}
                                      </li>
                                      <li>
                                        {" "}
                                        <p
                                          onClick={() => handleEditEmployee(i.id)}
                                          className="dropdown-item"
                                        >
                                          {" "}
                                          <EditIcon /> Edit
                                        </p>{" "}
                                      </li>
                                      <li>
                                        {" "}
                                        <p
                                          onClick={() => handleDelete(i.id)}
                                          className="dropdown-item"
                                        >
                                          {" "}
                                          <DeleteIcon /> Delete
                                        </p>{" "}
                                      </li>
                                    </ul>
                                  </div>
                                </td>
                              </tr>
                              ))}
                              {/* <tr>
                                <td>Floyd Miles</td>
                                <td>1/1/23</td>
                                <td>12/31/23</td>
                                <td>3784.00</td>
                                <td>APS230491379</td>
                                <td>38.0</td>
                                <td>998.0</td>
                                <td>995.0</td>
                                <td>
                                  <button className="btn btn-sm btn-danger">
                                    Inactive
                                  </button>
                                </td>
                                <td className="text-end position-relative">
                                  <div className="btn-group dropstart table-action position-static">
                                    <button
                                      type="button"
                                      className="dropdown-toggle"
                                      data-bs-toggle="dropdown"
                                      aria-expanded="false"
                                    >
                                      <span></span>
                                    </button>
                                    <ul className="dropdown-menu">
                                      <li>
                                        {" "}
                                        <p
                                          onClick={() => handleView()}
                                          className="dropdown-item"
                                        >
                                          {" "}
                                          <VisibilityIcon /> View
                                        </p>{" "}
                                      </li>
                                      <li>
                                        {" "}
                                        <p
                                          onClick={() => handleEditEmployee()}
                                          className="dropdown-item"
                                        >
                                          {" "}
                                          <EditIcon /> Edit
                                        </p>{" "}
                                      </li>
                                      <li>
                                        {" "}
                                        <p
                                          onClick={() => handleDelete()}
                                          className="dropdown-item"
                                        >
                                          {" "}
                                          <DeleteIcon /> Delete
                                        </p>{" "}
                                      </li>
                                    </ul>
                                  </div>
                                </td>
                              </tr> */}
                            </tbody>
                          </table>
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
  );
};

export default AuthorizationManagement;



// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Sidebar from "../Sidebar/sidebar";
// import Header from "../../../components/Header/header.js";
// import "../../../components/Header/header.scss";
// import "../Sidebar/sidebar.scss";
// import downloadFile from "../../../assets/images/download-file.png";
// import plusIcon from "../../../assets/images/plusIcon.png";
// import { useDispatch, connect } from "react-redux";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
// import apis from "../../../api/apis";
// import Swal from "sweetalert2";

// const AuthorizationManagement = () => {
//   const [showSidebar, SetShowSidebar] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const updateSidebar = () => {
//     SetShowSidebar(!showSidebar);
//   };
//   const [employee, setEmployee] = useState([]);
//   const navigate = useNavigate();
//   const token = localStorage.getItem("BackToBasic-token");
// console.log(employee,"sdfjksdf");
//   useEffect(() => {
//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     };
//     apis
//       .get(
//         `/Authorization/GetAllAuthorizations?pageNumber=1&pageSize=15&searchName=${searchQuery}`,
//         config
//       )
//       .then((res) => {
  
//         setEmployee(res);
//               console.log(res.data.records[0]);
//       })
//       .catch((error) => {
//         Swal.fire({
//           icon: "error",
//           timer: 1500,
//           text: `Something went worng`,
//           showConfirmButton: false,
//         });
//       });
//   }, [searchQuery]);

//   const handleView = (id) => {
//     navigate(`/schedule-management-add-edit-information`);
//   };

//   const handleEditEmployee = (id) => {
//     navigate(`/edit-authorization-management`);
//   };

//   const handleDelete = async (itemId) => {
//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     };
//     apis
//       .delete(`/Employee/DeleteEmployee?id=${itemId}`, config)

//       .then((res) => {
//         const updatedEmployee = employee.filter(
//           (employee) => employee.id !== itemId
//         );
//         setEmployee(updatedEmployee);
//         Swal.fire({
//           icon: "Success",
//           timer: 1500,
//           text: `Employee deleted successfully`,
//           showConfirmButton: false,
//         });
//       })
//       .catch((error) => {
//         Swal.fire({
//           icon: "error",
//           timer: 1500,
//           text: `Something went worng`,
//           showConfirmButton: false,
//         });
//       });
//   };

//   return (
//     <div className="container-fluid page-wrap">
//       <div className="row height-100">
//         <Sidebar showSidebar={showSidebar} updateSidebar={updateSidebar} />
//         <div className="col main p-0">
//           <Header
//             title="Authorization Management"
//             updateSidebar={updateSidebar}
//           />
//           <div className="container-fluid page-content-box p-lg-5 p-md-4 p-3">
//             <div className="row">
//               <div className="col">
//                 {/* [Card] */}
//                 <div className="card user-card height-100">
//                   <div className="card-body">
//                     <div className="row">
//                       <div className="col">
//                         <div className="card-top-filter-box p-3">
//                           {/* [Table Search] */}
//                           <div className="search-table">
//                             <div className="form-group">
//                               <input
//                                 type="text"
//                                 value={searchQuery}
//                                 onChange={(e) => setSearchQuery(e.target.value)}
//                                 className="search-input"
//                                 placeholder="Search Here..."
//                               />
//                               <input type="submit" className="searchIcon" />
//                             </div>
//                           </div>
//                           {/* [/Table Search] */}

//                           {/* Right Filter */}
//                           <div className="tableRightLink d-flex ">
//                             <Link to="/add-authorization-management">
//                               <i className="addPage">
//                                 <img
//                                   className="linkImg"
//                                   src={plusIcon}
//                                   alt="add-employee"
//                                 />
//                               </i>{" "}
//                               Add Authorization
//                             </Link>
//                             <Link to="" className="imgWithLink ms-2">
//                               <img
//                                 className="linkImg"
//                                 src={downloadFile}
//                                 alt="Download Report"
//                               />{" "}
//                               Download Report
//                             </Link>
//                           </div>
//                           {/* Right Filter */}
//                         </div>
//                       </div>
//                     </div>
//                     <div className="row">
//                       <div className="col">
//                         <div className="table-responsive w-100">
//                           <table className="table m-0 butifyTable ">
//                             <thead>
//                               <tr>
//                                 <th>Client NAME</th>
//                                 <th>Start Date</th>
//                                 <th>End Date</th>
//                                 <th>Total Authorized Unit</th>
//                                 <th>Authorization Number</th>
//                                 <th>Hours/wk/Approved</th>
//                                 <th>Total Hours Worked</th>
//                                 <th>Hours Remaining</th>
//                                 <th>Status</th>
//                                 <th className="text-end">Action</th>
//                               </tr>
//                             </thead>

//                             <tbody>
//                               {/* {employee[0] && employee.map((i)=>(
//                             */}
//                               <tr>
//                                 <td>Floyd Miles</td>
//                                 {/* <td>{i.authorization_end_date}</td> */}
//                                 <td>12/31/23</td>
//                                 <td>3784.00</td>
//                                 {/* <td>{authorization_number}</td> */}
//                                 <td>38.0</td>
//                                 <td>998.0</td>
//                                 <td>995.0</td>
//                                 <td>
//                                   <button className="btn btn-sm btn-success">
//                                     Active
//                                   </button>
//                                 </td>
//                                 <td className="text-end position-relative">
//                                   <div className="btn-group dropstart table-action position-static">
//                                     <button
//                                       type="button"
//                                       className="dropdown-toggle"
//                                       data-bs-toggle="dropdown"
//                                       aria-expanded="false"
//                                     >
//                                       <span></span>
//                                     </button>
//                                     <ul className="dropdown-menu">
//                                       <li>
//                                         {" "}
//                                         <p
//                                           onClick={() => handleView()}
//                                           className="dropdown-item"
//                                         >
//                                           {" "}
//                                           <VisibilityIcon /> View
//                                         </p>{" "}
//                                       </li>
//                                       <li>
//                                         {" "}
//                                         <p
//                                           onClick={() => handleEditEmployee()}
//                                           className="dropdown-item"
//                                         >
//                                           {" "}
//                                           <EditIcon /> Edit
//                                         </p>{" "}
//                                       </li>
//                                       <li>
//                                         {" "}
//                                         <p
//                                           onClick={() => handleDelete()}
//                                           className="dropdown-item"
//                                         >
//                                           {" "}
//                                           <DeleteIcon /> Delete
//                                         </p>{" "}
//                                       </li>
//                                     </ul>
//                                   </div>
//                                 </td>
//                               </tr>
//                               {/* ))} */}
//                               {/* <tr>
//                                 <td>Floyd Miles</td>
//                                 <td>1/1/23</td>
//                                 <td>12/31/23</td>
//                                 <td>3784.00</td>
//                                 <td>APS230491379</td>
//                                 <td>38.0</td>
//                                 <td>998.0</td>
//                                 <td>995.0</td>
//                                 <td>
//                                   <button className="btn btn-sm btn-danger">
//                                     Inactive
//                                   </button>
//                                 </td>
//                                 <td className="text-end position-relative">
//                                   <div className="btn-group dropstart table-action position-static">
//                                     <button
//                                       type="button"
//                                       className="dropdown-toggle"
//                                       data-bs-toggle="dropdown"
//                                       aria-expanded="false"
//                                     >
//                                       <span></span>
//                                     </button>
//                                     <ul className="dropdown-menu">
//                                       <li>
//                                         {" "}
//                                         <p
//                                           onClick={() => handleView()}
//                                           className="dropdown-item"
//                                         >
//                                           {" "}
//                                           <VisibilityIcon /> View
//                                         </p>{" "}
//                                       </li>
//                                       <li>
//                                         {" "}
//                                         <p
//                                           onClick={() => handleEditEmployee()}
//                                           className="dropdown-item"
//                                         >
//                                           {" "}
//                                           <EditIcon /> Edit
//                                         </p>{" "}
//                                       </li>
//                                       <li>
//                                         {" "}
//                                         <p
//                                           onClick={() => handleDelete()}
//                                           className="dropdown-item"
//                                         >
//                                           {" "}
//                                           <DeleteIcon /> Delete
//                                         </p>{" "}
//                                       </li>
//                                     </ul>
//                                   </div>
//                                 </td>
//                               </tr> */}
//                             </tbody>
//                           </table>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 {/* [/Card] */}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AuthorizationManagement;
