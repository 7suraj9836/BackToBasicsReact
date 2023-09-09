import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/sidebar"
import Header from "../../../components/Header/header.js";
import "../../../components/Header/header.scss";
import '../Sidebar/sidebar.scss';
import downloadFile from "../../../assets/images/download-file.png";
import plusIcon from "../../../assets/images/plusIcon.png";
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Swal from "sweetalert2";
import apis from '../../../api/apis';

const SubAdminManagement = () => {
    const [showSidebar, SetShowSidebar] = useState(false);
    const updateSidebar = () => { SetShowSidebar(!showSidebar); }
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [subAdmin, setSubAdmin] = useState([]);
    const token = localStorage.getItem("BackToBasic-token")

    useEffect(() => {
        const config = {
          headers:{
            Authorization: `Bearer ${token}`
          }
        }
        apis.get(`/SubAdmin/GetAllSubAdmins?pageNumber=1&pageSize=10&sortColumn=first_name&sortDirection=asc&searchName=${searchQuery}`,config)
                .then((res) => {
                  console.log(res);  
                  setSubAdmin(res.data.records)
                   
                })
                .catch((error) => {
                  Swal.fire({
                    icon: 'error',
                    timer: 1500,
                    text: `Something went worng`,
                    showConfirmButton: false
            
                  })
                })
      }, [searchQuery]);
    
      const handleEditSubAdmin = (id) => {
        navigate(`/edit-SubAdmin/${id}`)
      }

      const handleView = (id) => {
        navigate(`/view-SubAdmin/${id}`)
      }

   
    //     const config = {
    //       headers:{
    //         Authorization: `Bearer ${token}`
    //       }
    //     }
    //     apis.delete(`/SubAdmin/DeleteSubAdmin?id=${itemId}`,config)
    //             .then((res) => {
    //               const updatedSubAdmin = subAdmin.filter(subadmin => subadmin.id !== itemId);
    //               setSubAdmin(updatedSubAdmin)
    //               Swal.fire({
    //                 title: "Do You Want To Delete SubAdmin?",
    //                 showCancelButton: true,
    //                 icon: "warning",
    //                 confirmButtonText: "Yes, delete it!",
    //                 confirmButtonColor: "#3085d6",
    //                 cancelButtonColor: "#d33",
            
    //               })
                   
    //             })
    //             .catch((error) => {
    //               Swal.fire({
    //                 icon: 'error',
    //                 timer: 1500,
    //                 text: `Something went worng`,
    //                 showConfirmButton: false
            
    //               })
    //             })
    // };

    const handleDelete = async (itemId) => {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
    
      try {
        const response = await Swal.fire({
          title: "Do you want to delete the SubAdmin?",
          showCancelButton: true,
          icon: "warning",
          confirmButtonText: "Yes, delete it!",
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33"
        });
    
        if (response.isConfirmed) {
          await apis.delete(`/SubAdmin/DeleteSubAdmin?id=${itemId}`, config);
          const updatedSubAdmin = subAdmin.filter(subadmin => subadmin.id !== itemId);
          setSubAdmin(updatedSubAdmin);
    
          Swal.fire({
            title: "Deleted!",
            text: "The SubAdmin has been deleted.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          timer: 1500,
          text: "Something went wrong",
          showConfirmButton: false
        });
      }
    };
    




    return (
        <div className="container-fluid page-wrap">
          <div className="row height-100">
            <Sidebar showSidebar={showSidebar} updateSidebar={updateSidebar} />
            <div className="col main p-0">
              <Header title="SubAdmin Managment" updateSidebar={updateSidebar} />
              <div className="container-fluid page-content-box p-lg-5 p-md-4 p-3">
                <div className="row">
                  <div className="col">
                    {/* [Card] */}
                    <div className="card user-card height-100">
                      <div className="card-body">
                        <div className="row">
                          <div className="col">
                            <div className="card-top-filter-box p-3">
                              {/* [Table Search] */}
                              <div className="search-table">
                                <div className="form-group">
                                  <input type="text" value={searchQuery}
                                   onChange={(e) => setSearchQuery(e.target.value)} className="search-input" placeholder="Search Here..." />
                                  <input type="submit" className="searchIcon" />
                                </div>
                              </div>
                              {/* [/Table Search] */}
    
                              {/* Right Filter */}
                              <div className="tableRightLink d-flex ">
                                <Link to='/add-edit-subadmin-information'><i className='addPage'><img className="linkImg" src={plusIcon} /></i> Add New SubAdmin</Link>
                                <Link to='' className='imgWithLink ms-2'><img className="linkImg" src={downloadFile} onClick={""} /> Download Report</Link>
                              </div>
                              {/* Right Filter */}
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col">
                            <div className="table-responsive">
                              <table className="table m-0 butifyTable">
                                <thead>
                                  <tr>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email Address</th>
                                    <th>Phone Number</th>
                                    <th>City</th>
                                    <th>Role</th>
                                    <th>Last log-in</th>
                                    <th>Actions</th>
    
                                    <th>&nbsp;</th>
                                  </tr>
                                </thead>
    
                                <tbody>
                                  {subAdmin.length >0 ? subAdmin.map((r) => 
                                   
                                      <tr>
                                        <td>{r.first_name }</td>
    
                                        <td>{r.last_name}</td>
                                        <td>{r.email}</td>
                                        <td>{r.phone_number}</td>
                                        <td>{r.city_id}</td>
                                        <td>{r.role_name}</td>
                                        <td>{r.modified_date}</td>
                                        {/* <td><button className='btn btn-success btn-sm'>Yes</button></td> */}
                                        <td className='text-center'>
                                          <div className="btn-group dropstart table-action">
                                            <button type="button" className="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                              <span></span>
                                            </button>
                                            <ul className="dropdown-menu">
                                              <li> <p onClick={() => handleView(r.id)} className="dropdown-item" > <VisibilityIcon /> View</p> </li>
                                              <li> <p onClick={() => handleEditSubAdmin(r.id)} className="dropdown-item" > <EditIcon />Edit </p> </li>
                                              <li> <p onClick={() => handleDelete(r.id)} className="dropdown-item" > <DeleteIcon />Delete </p> </li>
                                             
                                            </ul>
                                          </div>
                                        </td>
                                      </tr>
                                    
                                  ):<tr>
                                    <td>No data to show</td>
                                    </tr>}
    
                                </tbody>
                              </table>
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
      );
}

export default SubAdminManagement
