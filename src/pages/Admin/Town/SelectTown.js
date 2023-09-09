import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar/sidebar";
import "../../../assets/css/login.css";
import Header from "../../../components/Header/header.js";
import "../../../components/Header/header.scss";
import "../Sidebar/sidebar.scss";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Swal from "sweetalert2";
import apis from "../../../api/apis";
import { Modal } from "react-bootstrap";
import Typography from "@mui/material/Typography";

const SelectTown = () => {
  const [showSidebar, SetShowSidebar] = useState(false);
  const token = localStorage.getItem("BackToBasic-token");

  const updateSidebar = () => {
    SetShowSidebar(!showSidebar);
  };

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [townFrom, setTownFrom] = useState([]);
  const [townFromId, setTownFromId] = useState(1);
  const [townTo, setTownTo] = useState([]);
  const [townToId, setTownToId] = useState(1);
  const [driveTime, setDriveTime] = useState();
  const [townName, setTownName] =useState();

  const handleTownFrom = (select) => {
    setTownFromId(select.target.value);
  };

  const handleTownTo = (select) => {
    setTownToId(select.target.value);
  };

  const resetPasswordModal = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #dadada",
    boxShadow: 24,
    p: 3,
    borderRadius: 3,
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleCloseModal2 = () => {
    setOpen(false);
  };
  const handleDriveTime = (e) => {
    setDriveTime(e.target.value);
  };

  const getAllTown = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    apis
      .get(`Shared/GetAllTowns`, config)
      .then((res) => {
        setTownFrom(res.data.response);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAllTown();
  }, []);

  const getAllTownTo = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    apis
      .get(`Shared/GetAllTowns`, config)
      .then((res) => {
        setTownTo(res.data.response);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAllTownTo();
  }, []);

  let handleSubmit = async () => {
    if (true) {
      let formData = {
        town_from_id: townFromId,
        town_to_id: townToId,
        drive_time: driveTime,
      };

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      apis
        .post(`/TownDriveTime/CreateTownDriveTime`, formData, config)
        .then((res) => {
          if (res.status === 200) {
            Swal.fire({
              icon: "success",
              timer: 1500,
              text: `Schedule management added successfully`,
              showConfirmButton: false,
            });
            navigate("/add-town");
          } else {
            Swal.fire({
              icon: "success",
              timer: 1500,
              text: `Something went wrong`,
              showConfirmButton: false,
            });
            navigate("/add-town");
          }
        })
        .catch((err) => {
          Swal.fire({
            icon: "success",
            timer: 1500,
            text: `Something went wrong`,
            showConfirmButton: false,
          });
          navigate("/add-town");
        });
    }
  };

  let handleSubmitTown = async () => {
    if (true) {
      let formData = {
        name: townName,
      };

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      apis
        .post(`/Town/CreateTown`, formData, config)
        .then((res) => {
          if (res.status === 200) {
            Swal.fire({
              icon: "success",
              timer: 1500,
              text: `Town added successfully`,
              showConfirmButton: false,
            });
            navigate("/add-town");
          } else {
            Swal.fire({
              icon: "success",
              timer: 1500,
              text: `Something went wrong`,
              showConfirmButton: false,
            });
            navigate("/add-town");
          }
        })
        .catch((err) => {
          Swal.fire({
            icon: "success",
            timer: 1500,
            text: `Something went wrong`,
            showConfirmButton: false,
          });
          navigate("/add-town");
        });
    }
  };

  return (
    <div class="container-fluid page-wrap">
      <div class="row height-100">
        <Sidebar showSidebar={showSidebar} updateSidebar={updateSidebar} />
        <div class="col main p-0">
          <Header
            title="Add/Edit Schedule Information"
            updateSidebar={updateSidebar}
          />
          <div class="container-fluid page-content-box p-lg-5 p-md-4 p-3">
            <div class="row">
              <div class="col">
                {/* [Card] */}
                <div className="card dashboardCard height-100">
                  <div className="card-body p-0">
                    <div className="row">
                      <div className="col">
                        <div className="login-section p-0">
                          <form className="form-box p-0">
                            <div className="card mb-3">
                              <div className="row">
                                <div className="d-flex justify-content-between">
                                  <h6 className="form-label">Town to Town</h6>
                                  <button
                                    type="button"
                                    className="blue-btn-default btn-sm"
                                    onClick={() => handleOpen()}
                                  >
                                    Add Town
                                  </button>
                                </div>
                                <div className="form-box-inner col-lg-4 col-md-6 mb-4">
                                  <div className="input-box">
                                    <label className="form-label">
                                      Town from
                                    </label>
                                    <select
                                      className="custom-select"
                                      name=""
                                      id=""
                                      placeholder="Select Client"
                                      onChange={(e) => handleTownFrom(e)}
                                    >
                                      {townFrom.map((option) => (
                                        <option
                                          key={option.id}
                                          value={option.id}
                                        >
                                          {option.name}
                                        </option>
                                      ))}
                                      <option value={"Town from"}>
                                        Town from
                                      </option>
                                    </select>
                                  </div>
                                </div>
                                <div className="form-box-inner col-lg-4 col-md-6 mb-4">
                                  <div className="input-box">
                                    <label className="form-label">
                                      Town to
                                    </label>
                                    <select
                                      className="custom-select"
                                      name=""
                                      id=""
                                      placeholder="Select Client"
                                      onChange={(e) => handleTownTo(e)}
                                    >
                                      {townTo.map((option) => (
                                        <option
                                          key={option.id}
                                          value={option.id}
                                        >
                                          {option.name}
                                        </option>
                                      ))}
                                      <option value={"  Town to"}>
                                        Town to
                                      </option>
                                    </select>
                                  </div>
                                </div>

                                <div className="form-box-inner col-md-6 col-12 mb-4">
                                  <div className="input-box">
                                    <label className="form-label">
                                      Town Name
                                    </label>
                                    <input
                                      type="text"
                                      placeholder={"Town Name"}
                                      value={driveTime}
                                      onChange={(e) => handleDriveTime(e)}
                                    />
                                  </div>
                                </div>

                                <div className="btn-box d-flex">
                                  <button
                                    type="button"
                                    className="blue-btn-default btn-sm"
                                    onClick={handleSubmit}
                                  >
                                    Save
                                  </button>
                                  <button
                                    type="button"
                                    className="blue-btn-default btn-sm btn-outline-gray"
                                    onClick={(event) =>
                                      (window.location.href =
                                        "./employee-management")
                                    }
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            </div>
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
      <Modal show={open} onClose={handleClose} className="modal fade" centered>
        <Box sx={resetPasswordModal}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{
              fontFamily: "Baskervville",
              fontWeight: "700",
            }}
          >
            Add new town
          </Typography>
          <div
            className="login-section"
            id="modal-modal-description"
            style={{ padding: "0" }}
          >
            <div
              className="form-box"
              style={{
                paddingTop: "15px",
                paddingBottom: "0px",
              }}
            >
              <div className="form-box-inner col-lg-4 col-md-6 mb-4">
                <div className="input-box">
                  <label className="form-label">Town Name</label>
                  <input
                    type="text"
                    placeholder={"Town Name"}
                    value={townName}
                    onChange={(e) => setTownName(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="btn-box d-flex">
              <button
                type="reset"
                className="blue-btn-default btn-sm btn-outline-gray"
                onClick={handleCloseModal2}
              >
                Cancel
              </button>
              <button
                type="button"
                className="blue-btn-default btn-sm"
                onClick={handleSubmitTown}
              >
                Submit
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};
export default SelectTown;
