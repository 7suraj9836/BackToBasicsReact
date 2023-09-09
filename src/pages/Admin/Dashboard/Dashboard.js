import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/sidebar";
import Header from "../../../components/Header/header.js";
import "../../../components/Header/header.scss";
import "../Sidebar/sidebar.scss";
import userIocn from "../../../assets/images/user.png";
import clientIcon from "../../../assets/images/client.png";
import caregiversIcon from "../../../assets/images/caregivers.png";
import adminIcon from "../../../assets/images/admin.png";
import apis from "../../../api/apis";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const DasbordPage = () => {
  const [showSidebar, SetShowSidebar] = useState(false);
    const navigate = useNavigate();
  const [data, setData] = useState([]);
  const token = localStorage.getItem("BackToBasic-token");
  const updateSidebar = () => {
    SetShowSidebar(!showSidebar);
  };

  useEffect(() => {
   if (!token){
    navigate("/")
   }
  }, [])
  
  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    apis
      .get(`/Dashboard/GetDashboardScoresData`, config)
      .then((response) => {
        let temp  = [];
        temp = response.data.response.map((item) => {
          let label =""
          if(item.name === 'User'){
            label = userIocn;
          }else if(item.name === 'Client'){
            label = clientIcon;
          }else if (item.name === "Caregiver"){
            label = caregiversIcon;
          }else{
            label = adminIcon;
          }
            return {
              count: item.count,
              name: item.name,
              label: label,
            };
        })
        setData(temp);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          timer: 1500,
          text: `Something went worng`,
          showConfirmButton: false,
        });
      });
  },[])

   return (
     <div className="container-fluid page-wrap">
       <div className="row height-100">
         <Sidebar showSidebar={showSidebar} updateSidebar={updateSidebar} />
         <div className="col main p-0">
           <Header title="Dashboard" updateSidebar={updateSidebar} />
           <div className="container-fluid page-content-box p-lg-5 p-md-4 p-3">
             <div className="row">
               <div className="col">
                 {/* {/ [Card] /} */}
                 <div className="card dashboardCard height-100">
                   <div className="card-body">
                     <div className="row gx-2 gy-3">
                       <div className="col">
                         <div className="card">
                           
                             <div className="row">
                               <div className="col-xxl-7 col-lg-8 col-sm-6 col-12">
                                 <div className="row gx-3 gy-3">
                                    {data.map((x) => (
                                   <div className="col-auto">
                                  
                                     <div className="cardBox">
                                       <div className="card ">
                                         <div className="card-icon pink">
                                           <img
                                             className="cardImg"
                                             src={x.label}
                                           />
                                         </div>
                                         <div className="card-detail">
                                           <h3 className="number">{x.count}</h3>
                                           <h5 className="retaledName">{x.name}</h5>
                                         </div>
                                       </div>
                                     </div>
                                   </div>))}
                                 </div>
                               </div>
                               <div className="col-xxl-5 col-lg-4 col-sm-6 col-12">
                                 <div className="row">
                                   <div className="col-12">
                                     <div className="cardBox w-100 sideBarHeight">
                                       <div className="card"></div>
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
             </div>
           </div>
         </div>
       </div>
     </div>
   );
}



export default DasbordPage;
