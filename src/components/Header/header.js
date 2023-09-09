import React, { useEffect } from "react";
import bellIcon from '../../assets/images/notification.png';
import 'bootstrap/dist/js/bootstrap.js';
import userIcon from '../../assets/images/userIcon.png';
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Header = ({ title, updateSidebar }) => {
    const navigate = useNavigate();

    function handleLogout() {
        Swal.fire({
            title:
                "Select 'Logout' below if you are ready to end your current session.",
            showCancelButton: true,
            icon: "warning",
            confirmButtonText: "Logout",
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
        })

            .then((result) => {
                if (result.value === true) {
                    localStorage.removeItem("BackToBasic-token");
                    Swal.fire({
                        icon: "success",
                        title: "Logged out successfully.",
                        timer: 1500,
                    });
                    navigate("/")
                }
            });
    }

const hangleChangePassword = () =>{
    navigate(`/changePassword`)
} 

    return (
        <header className="bg-light topHeader">
            <div className="row m-0">
                <div className="col-12 col-sm-4 header-left">
                    <h5 className="page-title p-3">
                        {/* Dashboard */}
                        {title}
                    </h5>
                </div>
                <div className="col-12 col-sm-8 header-right">
                    <div className="mobile-menu" id="menu" onClick={updateSidebar}>
                        <svg height="100%" version="1.1" viewBox="0 0 512 512" width="100%" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                            <g className="st2" id="Layer"><g className="st0"><polyline className="st1" points="89,386 424,386 424,385.999   " /><polyline className="st1" points="89,257 424,257 424,256.999   " /><polyline className="st1" points="89,127 424,127 424,126.999   " /></g></g><g id="Layer_copy"><g><path d="M424,394H89c-4.418,0-8-3.582-8-8s3.582-8,8-8h335c4.418,0,8,3.582,8,8S428.418,394,424,394z" /></g><g><path d="M424,265H89c-4.418,0-8-3.582-8-8c0-4.418,3.582-8,8-8h335c4.418,0,8,3.582,8,8C432,261.418,428.418,265,424,265z" /></g><g><path d="M424,135H89c-4.418,0-8-3.582-8-8s3.582-8,8-8h335c4.418,0,8,3.582,8,8S428.418,135,424,135z" /></g></g></svg>
                    </div>
                    <div className="toolbar card-top-filter-box">
                        {/* [Table Search] */}
                        <div className="search-table">
                            <div className="form-group">
                                <input type="text" className="search-input" placeholder="Search Here..." />
                                <input type="submit" className="searchIcon" />
                            </div>
                        </div>
                        {/* [/Table Search] */}
                        <div className="notification icon-wrap">
                            <img src={bellIcon} alt="notification" />
                            <span className="icon"></span>
                        </div>
                    </div>
                    <div className="profile-option">
                        <hr className="seperator" />
                        <div className="dropdown">
                            <button className="profile-drop-btn border-0 dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src={userIcon} alt="" width={"40px"} height={"40px"} className="rounded-circle" />
                            </button>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item">Profile</a></li>
                                <li><a className="dropdown-item" onClick={()=>hangleChangePassword()}>Change Password</a></li>
                                <li><a className="dropdown-item" onClick={() => handleLogout()}>LogOut</a></li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        </header>
    )
}

export default Header;