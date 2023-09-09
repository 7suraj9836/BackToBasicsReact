import React, { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar/sidebar";
import Header from "../../../components/Header/header.js";
import "../../../components/Header/header.scss";
import "../Sidebar/sidebar.scss";
import downloadFile from "../../../assets/images/downloadIcon.png";
// select From React
import Select, { selectClasses } from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import Textarea from "@mui/joy/Textarea";

// moadl for regularize
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import IconButton from "@mui/joy/IconButton";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
// radioBox
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: "400px",
  width: "95%",
  bgcolor: "background.paper",
  border: "2px solid #f2f2f2",
  boxShadow: 24,
  padding: "20px",
  borderRadius: "10px",
};

const ShiftDetailPage = () => {
  const [showSidebar, SetShowSidebar] = useState(false);
  const updateSidebar = () => {
    SetShowSidebar(!showSidebar);
  };
  // modal for regularize
  const [open2, setOpen2] = React.useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => {
    setOpen2(false);
  };
  // modal for regularize
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="container-fluid page-wrap">
      <div className="row height-100">
        <Sidebar showSidebar={showSidebar} updateSidebar={updateSidebar} />
        <div className="col main p-0">
          <Header title="Shift Details" updateSidebar={updateSidebar} />
          <div className="container-fluid page-content-box p-lg-5 p-md-4 p-3">
            <div className="row">
              <div className="col">
                {/* [Card] */}
                <div className="card dashboardCard height-100">
                  <div className="card-body p-0">
                    <div className="row">
                      <div className="col-12">
                        <div className="login-section shiftDetailPage p-0">
                          <div className="card p-4 mb-4">
                            <div className="d-flex justify-content-between mb-3">
                              <h5 className="cardHeading">
                                Summary of Care Plan
                              </h5>
                              {/* Right Filter */}
                              <div className="tableRightLink d-flex ">
                                <Link to="" className="imgWithLink ms-2">
                                  {" "}
                                  Download Report{" "}
                                  <img className="linkImg" src={downloadFile} />
                                </Link>
                              </div>
                              {/* Right Filter */}
                            </div>
                            <div className="pe-xl-4 mb-2">
                              <p>
                                Amet minim mollit non deserunt ullamco est sit
                                aliqua dolor do amet sint. Velit officia
                                consequat duis enim velit mollit. Exercitation
                                veniam consequat sunt nostrud amet. Amet minim
                                mollit non deserunt ullamco est sit aliqua dolor
                                do amet sint. Velit officia consequat duis enim
                                velit mollit. Exercitation veniam consequat sunt
                                nostrud amet.
                              </p>
                            </div>
                            <div className="d-flex gap-3">
                              <div class="card p-4 shiftInfo justify-content-evenly">
                                <h4>Start Shift</h4>
                                <div class="btn-box d-flex shiftBtnBox">
                                  <button
                                    type="button"
                                    class="blue-btn-default btn-sm mt-0"
                                    onClick={handleOpen}
                                  >
                                    Clock In
                                  </button>
                                  <Modal
                                    aria-labelledby="transition-modal-title"
                                    aria-describedby="transition-modal-description"
                                    open={open}
                                    onClose={handleClose}
                                    closeAfterTransition
                                    slots={{ backdrop: Backdrop }}
                                    slotProps={{
                                      backdrop: {
                                        timeout: 500,
                                      },
                                    }}
                                  >
                                    <Fade in={open}>
                                      <Box sx={style}>
                                        <div
                                          className="d-flex justify-content-end w-100 position-relative"
                                          style={{ height: "10px" }}
                                        >
                                          <IconButton
                                            onClick={handleClose}
                                            style={{
                                              background: "transparent",
                                              fontSize: "24px",
                                              position: "absolute",
                                              top: "-10px",
                                            }}
                                          >
                                            <HighlightOffOutlinedIcon
                                              fontSize="inherit"
                                              style={{ color: "#231F20" }}
                                            />
                                          </IconButton>
                                        </div>
                                        <div className="login-section">
                                          <div className="form-box p-0">
                                            <h3
                                              class="form-label d-flex mb-3"
                                              style={{ color: "#081B33" }}
                                            >
                                              Your Shift start time is
                                              <span
                                                style={{
                                                  fontFamily: "initial",
                                                  paddingInline: "3px",
                                                }}
                                              >
                                                9:15
                                              </span>
                                              am
                                            </h3>
                                            <div className="form-box-inner">
                                              <div className="input-box">
                                                <div className="correctTime">
                                                  <FormControl>
                                                    <FormLabel
                                                      id="demo-row-radio-buttons-group-label"
                                                      className="mb-0"
                                                    >
                                                      Are you sure this is the
                                                      correct time?
                                                    </FormLabel>
                                                    <RadioGroup
                                                      row
                                                      aria-labelledby="demo-row-radio-buttons-group-label"
                                                      name="row-radio-buttons-group"
                                                    >
                                                      <FormControlLabel
                                                        value="Yes"
                                                        control={<Radio />}
                                                        label="Yes"
                                                      />
                                                      <FormControlLabel
                                                        value="No"
                                                        control={<Radio />}
                                                        label="No"
                                                      />
                                                    </RadioGroup>
                                                  </FormControl>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="form-box-inner">
                                              <div className="input-box">
                                                <label
                                                  htmlFor="reason"
                                                  className="form-label"
                                                >
                                                  Reason for No
                                                </label>
                                                <textarea
                                                  className="form-control mb-3"
                                                  rows={3}
                                                ></textarea>
                                              </div>
                                            </div>
                                            <div className="form-box-inner">
                                              <div className="input-box">
                                                <FormGroup>
                                                  <FormControlLabel
                                                    control={
                                                      <Checkbox
                                                        
                                                      />
                                                    }
                                                    label="I’m at client location"
                                                    style={{
                                                      marginBottom: "0",
                                                    }}
                                                  />
                                                  <FormControlLabel
                                                    control={<Checkbox defaultChecked />}
                                                    label="I’m at any other location"
                                                    style={{
                                                      marginBottom: "0",
                                                    }}
                                                  />
                                                </FormGroup>
                                              </div>
                                            </div>
                                            <div className="form-box-inner">
                                              <div className="input-box">
                                                <label
                                                  htmlFor="reason"
                                                  className="form-label mt-3"
                                                >
                                                  Reason
                                                </label>
                                                <textarea
                                                  className="form-control mb-3"
                                                  rows={3}
                                                ></textarea>
                                              </div>
                                            </div>
                                            <div className="btn-box d-flex justify-content-start">
                                              <button
                                                type="submit"
                                                className="blue-btn-default btn-sm mt-3"
                                              >
                                                Submit
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      </Box>
                                    </Fade>
                                  </Modal>
                                </div>
                              </div>
                              <div class="card p-4 timeInfo">
                                <div className="d-flex justify-content-between">
                                  <h4>Total Time Worked:</h4>
                                  <span className="time">02 hrs</span>
                                </div>
                                <hr />
                                <div class="btn-box d-flex shiftBtnBox">
                                  <button
                                    type="button"
                                    class="blue-btn-default btn-sm btn-outline-gray btn-sm mt-0"
                                    onClick={handleOpen2}
                                  >
                                    Regularize your time
                                  </button>
                                  <Modal
                                    aria-labelledby="transition-modal-title"
                                    aria-describedby="transition-modal-description"
                                    open={open2}
                                    onClose={handleClose2}
                                    closeAfterTransition
                                    slots={{ backdrop: Backdrop }}
                                    slotProps={{
                                      backdrop: {
                                        timeout: 500,
                                      },
                                    }}
                                  >
                                    <Fade in={open2}>
                                      <Box sx={style}>
                                        <div
                                          className="d-flex justify-content-end w-100 position-relative"
                                          style={{ height: "10px" }}
                                        >
                                          <IconButton
                                            onClick={handleClose2}
                                            style={{
                                              background: "transparent",
                                              fontSize: "24px",
                                              position: "absolute",
                                              top: "-10px",
                                            }}
                                          >
                                            <HighlightOffOutlinedIcon
                                              fontSize="inherit"
                                              style={{ color: "#231F20" }}
                                            />
                                          </IconButton>
                                        </div>
                                        <div className="login-section">
                                          <div className="form-box p-0">
                                            <div className="form-box-inner">
                                              <div className="input-box">
                                                <label
                                                  htmlFor="reason"
                                                  className="form-label"
                                                >
                                                  Shift Start
                                                </label>
                                                <div className="mb-3">
                                                  <LocalizationProvider
                                                    dateAdapter={AdapterDayjs}
                                                  >
                                                    <TimePicker />
                                                    {/* <DemoContainer
                                                    components={["TimePicker"]}
                                                  ></DemoContainer> */}
                                                  </LocalizationProvider>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="form-box-inner">
                                              <div className="input-box">
                                                <label
                                                  htmlFor="reason"
                                                  className="form-label"
                                                >
                                                  Shift End
                                                </label>
                                                <div className="mb-3">
                                                  <LocalizationProvider
                                                    dateAdapter={AdapterDayjs}
                                                  >
                                                    <TimePicker />
                                                    {/* <DemoContainer
                                                    components={["TimePicker"]}
                                                  ></DemoContainer> */}
                                                  </LocalizationProvider>
                                                </div>
                                              </div>
                                            </div>

                                            <div className="form-box-inner">
                                              <div className="input-box">
                                                <label
                                                  htmlFor="reason"
                                                  className="form-label mt-3"
                                                >
                                                  Reason
                                                </label>
                                                <textarea
                                                  className="form-control mb-3"
                                                  rows={3}
                                                ></textarea>
                                              </div>
                                            </div>
                                            <div className="btn-box d-flex justify-content-start">
                                              <button
                                                type="submit"
                                                className="blue-btn-default btn-sm mt-3"
                                              >
                                                Submit
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      </Box>
                                    </Fade>
                                  </Modal>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="card p-4 mb-4">
                            <div className="d-flex justify-content-between mb-3">
                              <h5 className="cardHeading">Shift Tasks</h5>
                            </div>
                            <div className="taskBox row">
                              <div className="TaskList col-lg-8 col-12">
                                <div className="taskNumber">Goal 1 </div>
                                <div className="status d-flex gap-2">
                                  <label>Status</label>
                                  <Select
                                    placeholder="Select The Goal Status"
                                    indicator={<KeyboardArrowDown />}
                                    sx={{
                                      width: 240,
                                      [`& .${selectClasses.indicator}`]: {
                                        transition: "0.2s",
                                        [`&.${selectClasses.expanded}`]: {
                                          transform: "rotate(-180deg)",
                                        },
                                      },
                                    }}
                                    size="sm"
                                  >
                                    <Option value="Completed Independently">
                                      Completed Independently
                                    </Option>
                                    <Option value="Completed with Assistance">
                                      Completed with Assistance
                                    </Option>
                                    <Option value="Refused">
                                      Refused (If selected: a text box appears,
                                      which asks for an explanation "How did you
                                      attempt to help this child complete this
                                      goal?")
                                    </Option>
                                    <Option value="This goal was not worked on today">
                                      This goal was not worked on today.
                                    </Option>
                                  </Select>
                                </div>
                                <div className="TastMessage">
                                  <Textarea minRows={2} />
                                </div>
                              </div>
                              <div className="TaskList col-lg-8 col-12">
                                <div className="taskNumber">Goal 2 </div>
                                <div className="status d-flex gap-2">
                                  <label>Status</label>
                                  <Select
                                    placeholder="Select The Goal Status"
                                    indicator={<KeyboardArrowDown />}
                                    sx={{
                                      width: 240,
                                      [`& .${selectClasses.indicator}`]: {
                                        transition: "0.2s",
                                        [`&.${selectClasses.expanded}`]: {
                                          transform: "rotate(-180deg)",
                                        },
                                      },
                                    }}
                                    size="sm"
                                  >
                                    <Option value="Completed Independently">
                                      Completed Independently
                                    </Option>
                                    <Option value="Completed with Assistance">
                                      Completed with Assistance
                                    </Option>
                                    <Option value="Refused">
                                      Refused (If selected: a text box appears,
                                      which asks for an explanation "How did you
                                      attempt to help this child complete this
                                      goal?")
                                    </Option>
                                    <Option value="This goal was not worked on today">
                                      This goal was not worked on today.
                                    </Option>
                                  </Select>
                                </div>
                              </div>
                              <div className="TaskList col-lg-8 col-12">
                                <div className="d-flex flex-column gap-2 justify-content-start">
                                  <label>Notes</label>
                                  <div className="TastMessage">
                                    <Textarea minRows={2} />
                                  </div>
                                </div>
                              </div>
                              <div className="TaskList col-lg-8 col-12 mb-0">
                                <div className="row">
                                  <div className="col-xxl-3 col-md-6 col-12">
                                    <div className="d-flex flex-column gap-2">
                                      <label>Client Signature</label>
                                      <div className="TastMessage">
                                        <Textarea minRows={2} />
                                      </div>
                                      <Link
                                        className="reset"
                                        component="button"
                                        onClick={() => {
                                          // ...process something
                                        }}
                                      >
                                        Clear
                                      </Link>
                                    </div>
                                  </div>
                                  <div className="col-xxl-3 col-md-6 col-12">
                                    <div className="d-flex flex-column gap-2">
                                      <label>Caregiver Signature</label>
                                      <div className="TastMessage">
                                        <Textarea minRows={2} />
                                      </div>
                                      <Link
                                        className="reset"
                                        component="button"
                                        onClick={() => {
                                          // ...process something
                                        }}
                                      >
                                        Clear
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="btn-box d-flex">
                            <button
                              type="button"
                              className="blue-btn-default btn-sm"
                              onClick={() => {}}
                            >
                              Save
                            </button>
                            {/* <button
                              type="button"
                              className="blue-btn-default btn-sm  btn-outline-gray"
                              onClick={() => {}}
                            >
                              Next
                            </button> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* [/Card] */}
              </div>
            </div>
          </div>
          <div className="modalBx"></div>
        </div>
      </div>
    </div>
  );
};
export default ShiftDetailPage;
