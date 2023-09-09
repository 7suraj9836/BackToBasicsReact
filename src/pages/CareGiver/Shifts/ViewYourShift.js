import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar/sidebar";
import Header from "../../../components/Header/header.js";
import "../../../components/Header/header.scss";
import "../Sidebar/sidebar.scss";
import filterIcon from "../../../assets/images/filter.png";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import calenderIcon from "../../../assets/images/sidebarIcon-4.png";
import loactionIocn from "../../../assets/images/loactionIocn.png";
import Swal from "sweetalert2";

// Shift Detail popup
import IconButton from "@mui/joy/IconButton";
import Menu from "@mui/joy/Menu";
import MenuItem from "@mui/joy/MenuItem";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import ListDivider from "@mui/joy/ListDivider";
import MoreVert from "@mui/icons-material/MoreVert";
import Edit from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteForever from "@mui/icons-material/DeleteForever";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";

// select From React
import Select, { selectClasses } from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import FormControl from "@mui/material/FormControl";

import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ShiftCard from "./ShiftCard";
// filter popper
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import Fade from "@mui/material/Fade";

// modal
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";

// radioBox
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";

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

const ViewYourShift = () => {
  const [showSidebar, SetShowSidebar] = useState(false);
  const updateSidebar = () => {
    SetShowSidebar(!showSidebar);
  };

  
  const buttonRef = React.useRef(null);
  const [openModal, setOpenModal] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [openFilterModal, setOpenFilterModal] = useState(false);
  //const handleOpen = () => setOpen(true);
  const [viewDetails,setViewDetails]=useState(true);

  
  
  const handleOpenModal = (indx) => {
    console.log("card ikndex", indx);
    setOpenModal(true);
  };
  const handleCloseModal = () => setOpenModal(false);
  const handleOpenFilterModal = () => setOpenFilterModal(true);
  const handleCloseFilterModal = () => setOpenFilterModal(false);


  
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  
  // const filterstyle = {
    //   position: "fixed",
    //   top: "281px",
    //   right: "-112px",
    //   transform: "translate(-50%, -50%)",
    //   width: 400,
    //   bgcolor: "background.paper",
    //   border: "2px solid #000",
    //   boxShadow: 24,
    //   p: 4,
    // };
    
    // filter popper
    const [openFilter, setOpenFilter] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    
      const [filterOption, setFilterOption] = useState("");
      const [dateFrom, setDateFrom] = useState("");
      const [dateTo, setDateTo] = useState("");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenFilter((previousOpen) => !previousOpen);
  };

  const canBeOpen = openFilter && Boolean(anchorEl);
  const FilterBox = canBeOpen ? "transition-popper" : undefined;

  const handleClose = () => {
    setOpen(false);
  };

  const handleClose1 = () => {
    setOpenFilter(false);
  };

  // modal
  const [open2, setOpen2] = React.useState(false);
  const handleOpen = () => setOpen2(true);
  const handleClose2 = () => {
    setOpen2(false);
  };

  const [value, setValue] = React.useState(dayjs("2022-04-17"));


  //Call The API to list the data

const [data, setData] = useState([]);
const token=localStorage.getItem("BackToBasic-token");

const config = {
  headers: {
    Authorization: `Bearer ${token}`
  }
};

useEffect(() => {
  axios.get('API Url', config)
    .then((res) => {
      setData(res.data.records);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
}, []);


//Send the Modal data to the API

const [selectedOption, setSelectedOption] = useState('Yes');
const [reasonForNo, setReasonForNo]= useState('');
const [clientLocation, setClientLocation]=useState(false);
const [otherLocation, setOtherLocation]= useState(false);
const [otherLocationReason, setOtherLocationReason]=useState();
const [isClockIn, setIsClockIn]=useState(false);



const handleOptionChange = (event) => {
  setSelectedOption(event.target.value);
  console.log(selectedOption);
};

const handleClientLocation=(event)=>{
  const isChecked = event.target.checked;
  setClientLocation(isChecked);
  if(isChecked===true)
  setOtherLocation(false); 
 }

//  useEffect(()=>{
//   console.log(clientLocation);
  
// },[clientLocation]);

// useEffect(()=>{
//   console.log(otherLocation);          

// },[otherLocation])

const handleOtherLocation=(event)=>{

  const isChecked = event.target.checked;
  setOtherLocation(isChecked);
  if(isChecked===true)
  setClientLocation(false); 
}


const handleModalSubmit=()=>{
  setIsClockIn(!isClockIn);
  const payload={
    selectedOption:selectedOption,
    reasonForNo:reasonForNo,
    clientLocation:clientLocation,
    otherLocation:otherLocation,
    otherLocationReason:otherLocationReason
  }

  axios.post('API URL',payload,config)  .then((res) => {
    Swal.fire({
      icon: 'success',
      timer: 1500,
      text: `Data saved successfully`,
      showConfirmButton: false

    })
    navigate("/view-your-shift")
  }).catch((err) => {
    console.log(err)
    Swal.fire({
      icon: 'success',
      timer: 1500,
      text: `Data saved successfully`,
      showConfirmButton: false
    })
  })
 
}

 return (
    <div className="container-fluid page-wrap">
      <div className="row height-100">
        <Sidebar showSidebar={showSidebar} updateSidebar={updateSidebar} />
        <div className="col main p-0">
          <Header title="Shifts" updateSidebar={updateSidebar} />
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
                              <input
                                type="text"
                                className="search-input"
                                placeholder="Search Here..."
                              />
                              <input type="submit" className="searchIcon" />
                            </div>
                          </div>
                          {/* [/Table Search] */}

                          {/* Right Filter */}
                          <div className="tableRightLink d-flex position-relative justify-content-end w-md-auto w-100">
                            <div>
                              <Button
                                id="demo-customized-button position-relative"
                                aria-describedby={FilterBox}
                                type="button"
                                onClick={handleClick}
                              >
                                <img src={filterIcon} alt="filterIcon" /> Filter
                              </Button>
                              <Popper
                                id={FilterBox}
                                open={openFilter}
                                onClose={handleClose1}
                                placement="bottom-end"
                                anchorEl={anchorEl}
                                transition
                              >
                                {({ TransitionProps }) => (
                                  <Fade {...TransitionProps} timeout={350}>
                                    <Box
                                      sx={{
                                        border: 1,
                                        bgcolor: "background.paper",
                                        width: "365px",
                                        "@media only screen and (max-width: 600px)":
                                          {
                                            width: "300px",
                                          },
                                      }}
                                      style={{
                                        borderColor: "#dadada",
                                        borderWidth: "2px",
                                        borderRadius: "10px",
                                        height: "auto",
                                        padding: "20px",
                                        display: "flex",
                                        flexFlow: "column",
                                        alignItems: "end",
                                      }}
                                    >
                                      <IconButton
                                        aria-label="delete"
                                        size="small"
                                        onClick={handleClose1}
                                        style={{ background: "transparent" }}
                                      >
                                        <CloseRoundedIcon
                                          fontSize="inherit"
                                          style={{ color: "#231F20" }}
                                        />
                                      </IconButton>
                                      <div className="login-section w-100 pt-0">
                                        <div className="form-box p-0 mb-3">
                                          <div className="input-box">
                                            <label
                                              htmlFor="viewReport"
                                              className="form-label"
                                            >
                                              View Report
                                            </label>
                                            <select
                                              name="viewReport"
                                              id="viewReport"
                                              className="form-select"
                                              value={filterOption}
                                              onChange={(e) =>
                                                setFilterOption(
                                                  e.target.value
                                                )
                                              }
                                            >
                                              <option disabled>
                                                Select Your Report
                                              </option>
                                              <option value="thisMonth">
                                                This Month
                                              </option>
                                              <option value="thisWeek">
                                                This Week
                                              </option>
                                              <option value="custom">
                                                Custom
                                              </option>
                                            </select>
                                          </div>
                                        </div>

                                        {filterOption === "custom" && (
                                          <>
                                            <div className="form-box p-0 mb-3">
                                              <div className="input-box">
                                                <label
                                                  htmlFor="viewReport"
                                                  className="form-label"
                                                >
                                                  From
                                                </label>
                                                <div className="col-sm-12">
                                                  <LocalizationProvider
                                                    dateAdapter={AdapterDayjs}
                                                  >
                                                    <DatePicker
                                                      // label="Controlled picker"
                                                      value={dateFrom}
                                                      onChange={(date) => {
                                                        setDateFrom(date);
                                                      }}
                                                    />
                                                  </LocalizationProvider>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="form-box p-0 mb-3">
                                              <div className="input-box">
                                                <label
                                                  htmlFor="viewReport"
                                                  className="form-label"
                                                >
                                                  to
                                                </label>
                                                <div className="col-sm-12">
                                                  <LocalizationProvider
                                                    dateAdapter={AdapterDayjs}
                                                  >
                                                    <DatePicker
                                                      // label="Controlled picker"
                                                      value={dateTo}
                                                      onChange={(date) => {
                                                        setDateTo(date);
                                                      }}
                                                    />
                                                  </LocalizationProvider>
                                                </div>
                                              </div>
                                            </div>
                                          </>
                                        )}

                                        <div className="btn-box d-flex justify-content-end">
                                          <button
                                            type="button"
                                            className="blue-btn-default btn-sm mt-3"
                                            onClick={() => {
                                              handleClose1();
                                              handleFilter();
                                            }}
                                          >
                                            Apply
                                          </button>
                                          <button
                                            type="button"
                                            className="blue-btn-default btn-sm btn-outline-gray mt-3"
                                            onClick={ 
                                              handleClose1 }
                                          >
                                            Clear
                                          </button>
                                        </div>
                                      </div>
                                    </Box>
                                  </Fade>
                                )}
                              </Popper>
                            </div>
                          </div>
                          {/* Right Filter */}
                        </div>
                      </div>
                      <div className="login-section px-4">
                        <div className="col-12">
                          <div className="row gy-4">
                               
                          {/* populate data from API */}
                       {/*                             
                              {
                                data.map((record)=>{
                                  <div key={record.Id} className="col-xl-6 col-md-12 col-12">
                              <div className="card p-4">
                                <div className="row">
                                  <div className="col-md-8">
                                    <h4 className="shiftDate">
                                      <img
                                        src={calenderIcon}
                                        alt="calenderIcon-icon"
                                      />
                                        {record.date}
                                    </h4>
                                    <div className="row">
                                      <div className="col-xxl-5 col-sm-6 col-12">
                                        <div className="card meetngInfo">
                                          <ul className="meetingInfoList">
                                            <li>
                                              {record.schedule}
                                              <span className="meetingStatus green">
                                                {record.upcoming}
                                              </span>
                                            </li>
                                            <li>{record.client_Name}</li>
                                          </ul>
                                        </div>
                                      </div>
                                      <div className="col-xxl-5 col-sm-6 col-12 mt-2 mt-sm-0">
                                        <div className="card meetngInfo">
                                          <ul className="meetingInfoList">
                                            <li>{record.startTime} </li>
                                            <li>{record.endTime}</li>
                                          </ul>
                                        </div>
                                      </div>
                                    </div>
                                    <hr />
                                    <div class="btn-box d-flex shiftBtnBox">
                                     
                                      <Button
                                        id="Shift-button-btn"
                                        aria-controls={
                                          open ? "Shift-button" : undefined
                                        }
                                        aria-haspopup="true"
                                        aria-expanded={
                                          open ? "true" : undefined
                                        }
                                        variant="contained"
                                        class="blue-btn-default btn-sm btn-outline-gray position-relative mt-2"
                                        disableElevation
                                        ref={buttonRef}
                                        onClick={() => {
                                          setOpen(!open);
                                        }}
                                        endIcon={<KeyboardArrowDownIcon />}
                                      >
                                       
                                        View Detail
                                      </Button>

                                      <Menu
                                        id="Shift-button"
                                        anchorEl={buttonRef.current}
                                        open={open}
                                        onClose={handleClose}
                                        aria-labelledby="Shift-button-btn"
                                        placement="bottom-end"
                                      >
                                    
                                        <MenuItem
                                          component={Link}
                                          to="/shift-detail-page"
                                        >
                                          <ListItemDecorator>
                                            <VisibilityIcon />
                                          </ListItemDecorator>
                                          View
                                        </MenuItem>
                                        <MenuItem onClick={handleClose}>
                                          <ListItemDecorator>
                                            <Edit />
                                          </ListItemDecorator>
                                          Edit
                                        </MenuItem>
                                        <ListDivider />
                                        <MenuItem
                                          onClick={handleClose}
                                          variant="soft"
                                          color="danger"
                                        >
                                          <ListItemDecorator
                                            sx={{ color: "inherit" }}
                                          >
                                            <DeleteForever />
                                          </ListItemDecorator>
                                          Delete
                                        </MenuItem>
                                      </Menu>
                                      <button
                                        type="button"
                                        class="blue-btn-default btn-sm btn-outline-gray mt-2"
                                      >
                                        <img
                                          src={loactionIocn}
                                          alt="loaction-Iocn"
                                        />
                                        Get Directions
                                      </button>
                                    </div>
                                  </div>
                                  <div className="col-md-4 mt-3 mt-md-0">
                                    <div class="card meetngInfo h-100 justify-content-center align-items-center">
                                      <div className="totalTime">{record.totalTime}</div>
                                      <div class="btn-box d-flex shiftBtnBox">
                                        <button
                                          type="button"
                                          class="blue-btn-default btn-sm mt-2"
                                          onClick={handleOpen}
                                        >
                                          Clock In
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
                                                            Are you sure this is
                                                            the correct time?
                                                          </FormLabel>
                                                          <RadioGroup
                                                            row
                                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                                            name="row-radio-buttons-group"
                                                          >
                                                            <FormControlLabel
                                                              value="Yes"
                                                              control={
                                                                <Radio />
                                                              }
                                                              label="Yes"
                                                            />
                                                            <FormControlLabel
                                                              value="No"
                                                              control={
                                                                <Radio />
                                                              }
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
                                                              defaultChecked
                                                            />
                                                          }
                                                          label="I’m at client location"
                                                          style={{
                                                            marginBottom: "0",
                                                          }}
                                                        />
                                                        <FormControlLabel
                                                          control={<Checkbox />}
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
                                  </div>
                                </div>
                              </div>
                            </div> 
                                })
                              } */}

                            <div className="col-xl-6 col-md-12 col-12">
                              <div className="card p-4">
                                <div className="row">
                                  <div className="col-md-8">
                                    <h4 className="shiftDate">
                                      <img
                                        src={calenderIcon}
                                        alt="calenderIcon-icon"
                                      />
                                      Today, 26 April 2023
                                    </h4>
                                    <div className="row">
                                      <div className="col-xxl-5 col-sm-6 col-12">
                                        <div className="card meetngInfo">
                                          <ul className="meetingInfoList">
                                            <li>
                                              Scheduled{" "}
                                              <span className="meetingStatus green">
                                                Upcoming
                                              </span>
                                            </li>
                                            <li>Client 1</li>
                                          </ul>
                                        </div>
                                      </div>
                                      <div className="col-xxl-5 col-sm-6 col-12 mt-2 mt-sm-0">
                                        <div className="card meetngInfo">
                                          <ul className="meetingInfoList">
                                            <li>09:00 AM EDT </li>
                                            <li>12:30 PM EDT</li>
                                          </ul>
                                        </div>
                                      </div>
                                    </div>
                                    <hr />
                                    <div class="btn-box d-flex shiftBtnBox">
                                     
                                      <Button
                                        id="Shift-button-btn"
                                        aria-controls={
                                          open ? "Shift-button" : undefined
                                        }
                                        aria-haspopup="true"
                                        aria-expanded={
                                          open ? "true" : undefined
                                        }
                                        variant="contained"
                                        class="blue-btn-default btn-sm btn-outline-gray position-relative mt-2"
                                        disableElevation
                                        ref={buttonRef}
                                        onClick={() => {
                                          setOpen(!open);
                                        }}
                                        endIcon={<KeyboardArrowDownIcon />}
                                      >
                                       
                                        View Detail
                                      </Button>

                                      <Menu
                                        id="Shift-button"
                                        anchorEl={buttonRef.current}
                                        open={open}
                                        onClose={handleClose}
                                        aria-labelledby="Shift-button-btn"
                                        placement="bottom-end"
                                      >
                                    
                                        <MenuItem
                                          component={Link}
                                          to="/shift-detail-page"
                                        >
                                          <ListItemDecorator>
                                            <VisibilityIcon />
                                          </ListItemDecorator>
                                          View
                                        </MenuItem>
                                        <MenuItem onClick={handleClose}
                                         component={Link}
                                         to="/shift-detail-page">
                                          <ListItemDecorator>
                                            <Edit />
                                          </ListItemDecorator>
                                          Edit
                                        </MenuItem>
                                        <ListDivider />
                                        <MenuItem
                                          onClick={handleClose}
                                          variant="soft"
                                          color="danger"
                                        >
                                          <ListItemDecorator
                                            sx={{ color: "inherit" }}
                                          >
                                            <DeleteForever />
                                          </ListItemDecorator>
                                          Delete
                                        </MenuItem>
                                      </Menu>
                                      <button
                                        type="button"
                                        class="blue-btn-default btn-sm btn-outline-gray mt-2"
                                      >
                                        <img
                                          src={loactionIocn}
                                          alt="loaction-Iocn"
                                        />
                                        Get Directions
                                      </button>
                                    </div>
                                  </div>
                                  <div className="col-md-4 mt-3 mt-md-0">
                                    <div class="card meetngInfo h-100 justify-content-center align-items-center">
                                      <div className="totalTime">03:30 hrs</div>
                                      <div class="btn-box d-flex shiftBtnBox">
                                        <button
                                          type="button"
                                          class="blue-btn-default btn-sm mt-2"
                                          onClick={handleOpen}
                                        >
                                          {isClockIn?  "Clock Out":"Clock In"}
                                         
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
                                                            Are you sure this is
                                                            the correct time?
                                                          </FormLabel>
                                                          <RadioGroup
                                                            row
                                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                                            name="row-radio-buttons-group"
                                                          >
                                                              <FormControlLabel
                                                              value="Yes"
                                                              control={
                                                                <Radio />
                                                              }
                                                              label="Yes"
                                                              checked={selectedOption=== "Yes"}
                                                              onChange={handleOptionChange}
                                                            />

                                                            <FormControlLabel
                                                              value="No"
                                                              control={
                                                                <Radio />
                                                              }
                                                              label="No"
                                                              checked={selectedOption=== "No"}
                                                              onChange={handleOptionChange}
                                                            />
                                                          
                                                          </RadioGroup>
                                                        </FormControl>
                                                      </div>
                                                    </div>
                                                  </div>

                                                  {
                                                    selectedOption=='No' && 
                                                              
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
                                                  }
                                                 
                                                  <div className="form-box-inner">
                                                    <div className="input-box">
                                                      <FormGroup>
                                                        <FormControlLabel
                                                          control={
                                                            <Checkbox
                                                              defaultChecked
                                                            />
                                                          }
                                                          label="I’m at client location"
                                                          style={{
                                                            marginBottom: "0",
                                                          }}
                                                          checked={clientLocation}
                                                          onChange={(e)=>handleClientLocation(e)}

                                                        />
                                                        <FormControlLabel
                                                          control={<Checkbox />}
                                                          label="I’m at any other location"
                                                          style={{
                                                            marginBottom: "0",
                                                          }}
                                                          checked={otherLocation}
                                                          onChange={(e)=>handleOtherLocation(e)}
                                                        />
                                                      </FormGroup>
                                                    </div>
                                                  </div>
                                                 
                                                 
                                                   {  
                                                       otherLocation &&
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
                                                   }


                                                  
                                                  <div className="btn-box d-flex justify-content-start">
                                                    <button
                                                      type="submit"
                                                      className="blue-btn-default btn-sm mt-3"
                                                      onClick={
                                                        ()=>{
                                                           handleClose2();
                                                           handleModalSubmit();
                                                        }
                                                        }
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
                              </div>
                            </div> 
                             <div className="col-xl-6 col-md-12 col-12">
                              <div className="card p-4">
                                <div className="row">
                                  <div className="col-md-8">
                                    <h4 className="shiftDate">
                                      <img
                                        src={calenderIcon}
                                        alt="calenderIcon-icon"
                                      />
                                      Today, 26 April 2023
                                    </h4>
                                    <div className="row">
                                      <div className="col-xxl-5 col-sm-6 col-12">
                                        <div className="card meetngInfo">
                                          <ul className="meetingInfoList">
                                            <li>
                                              Scheduled{" "}
                                              <span className="meetingStatus green">
                                                completed
                                              </span>
                                            </li>
                                            <li>Client 1</li>
                                          </ul>
                                        </div>
                                      </div>
                                      <div className="col-xxl-5 col-sm-6 col-12 mt-2 mt-sm-0">
                                        <div className="card meetngInfo">
                                          <ul className="meetingInfoList">
                                            <li>09:00 AM EDT </li>
                                            <li>12:30 PM EDT</li>
                                          </ul>
                                        </div>
                                      </div>
                                    </div>
                                    <hr />
                                    <div class="btn-box d-flex shiftBtnBox">
                                      <button
                                        type="button"
                                        class="blue-btn-default btn-sm btn-outline-gray mt-2"
                                      >
                                        View Detail
                                      </button>
                                      <button
                                        type="button"
                                        class="blue-btn-default btn-sm btn-outline-gray mt-2"
                                      >
                                        <img
                                          src={loactionIocn}
                                          alt="loaction-Iocn"
                                        />
                                        Get Directions
                                      </button>
                                    </div>
                                  </div>
                                  <div className="col-md-4 mt-3 mt-md-0">
                                    <div class="card meetngInfo h-100 justify-content-center align-items-center">
                                      <div className="totalTime">03:30 hrs</div>
                                      <div class="btn-box d-flex shiftBtnBox">
                                        <button
                                          type="button"
                                          class="blue-btn-default btn-sm mt-2"
                                        >
                                          Clock In
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div> 
                            <div className="col-xl-6 col-md-12 col-12">
                              <div className="card p-4">
                                <div className="row">
                                  <div className="col-md-8">
                                    <h4 className="shiftDate">
                                      <img
                                        src={calenderIcon}
                                        alt="calenderIcon-icon"
                                      />
                                      Today, 26 April 2023
                                    </h4>
                                    <div className="row">
                                      <div className="col-xxl-5 col-sm-6 col-12">
                                        <div className="card meetngInfo">
                                          <ul className="meetingInfoList">
                                            <li>
                                              Scheduled{" "}
                                              <span className="meetingStatus green">
                                                completed
                                              </span>
                                            </li>
                                            <li>Client 1</li>
                                          </ul>
                                        </div>
                                      </div>
                                      <div className="col-xxl-5 col-sm-6 col-12 mt-2 mt-sm-0">
                                        <div className="card meetngInfo">
                                          <ul className="meetingInfoList">
                                            <li>09:00 AM EDT </li>
                                            <li>12:30 PM EDT</li>
                                          </ul>
                                        </div>
                                      </div>
                                    </div>
                                    <hr />
                                    <div class="btn-box d-flex shiftBtnBox">
                                      <button
                                        type="button"
                                        class="blue-btn-default btn-sm btn-outline-gray mt-2"
                                      >
                                        View Detail
                                      </button>
                                      <button
                                        type="button"
                                        class="blue-btn-default btn-sm btn-outline-gray mt-2"
                                      >
                                        <img
                                          src={loactionIocn}
                                          alt="loaction-Iocn"
                                        />
                                        Get Directions
                                      </button>
                                    </div>
                                  </div>
                                  <div className="col-md-4 mt-3 mt-md-0">
                                    <div class="card meetngInfo h-100 justify-content-center align-items-center">
                                      <div className="totalTime">03:30 hrs</div>
                                      <div class="btn-box d-flex shiftBtnBox">
                                        <button
                                          type="button"
                                          class="blue-btn-default btn-sm mt-2"
                                        >
                                          Clock In
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div> 
                            <div className="col-xl-6 col-md-12 col-12">
                              <div className="card p-4">
                                <div className="row">
                                  <div className="col-md-8">
                                    <h4 className="shiftDate">
                                      <img
                                        src={calenderIcon}
                                        alt="calenderIcon-icon"
                                      />
                                      Today, 26 April 2023
                                    </h4>
                                    <div className="row">
                                      <div className="col-xxl-5 col-sm-6 col-12">
                                        <div className="card meetngInfo">
                                          <ul className="meetingInfoList">
                                            <li>
                                              Scheduled{" "}
                                              <span className="meetingStatus green">
                                                completed
                                              </span>
                                            </li>
                                            <li>Client 1</li>
                                          </ul>
                                        </div>
                                      </div>
                                      <div className="col-xxl-5 col-sm-6 col-12 mt-2 mt-sm-0">
                                        <div className="card meetngInfo">
                                          <ul className="meetingInfoList">
                                            <li>09:00 AM EDT </li>
                                            <li>12:30 PM EDT</li>
                                          </ul>
                                        </div>
                                      </div>
                                    </div>
                                    <hr />
                                    <div class="btn-box d-flex shiftBtnBox">
                                      <button
                                        type="button"
                                        class="blue-btn-default btn-sm btn-outline-gray mt-2"
                                      >
                                        View Detail
                                      </button>
                                      <button
                                        type="button"
                                        class="blue-btn-default btn-sm btn-outline-gray mt-2"
                                      >
                                        <img
                                          src={loactionIocn}
                                          alt="loaction-Iocn"
                                        />
                                        Get Directions
                                      </button>
                                    </div>
                                  </div>
                                  <div className="col-md-4 mt-3 mt-md-0">
                                    <div class="card meetngInfo h-100 justify-content-center align-items-center">
                                      <div className="totalTime">03:30 hrs</div>
                                      <div class="btn-box d-flex shiftBtnBox">
                                        <button
                                          type="button"
                                          class="blue-btn-default btn-sm mt-2"
                                        >
                                          Clock In
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div> 
                             <div className="col-xl-6 col-md-12 col-12">
                              <div className="card p-4">
                                <div className="row">
                                  <div className="col-md-8">
                                    <h4 className="shiftDate">
                                      <img
                                        src={calenderIcon}
                                        alt="calenderIcon-icon"
                                      />
                                      Today, 26 April 2023
                                    </h4>
                                    <div className="row">
                                      <div className="col-xxl-5 col-sm-6 col-12">
                                        <div className="card meetngInfo">
                                          <ul className="meetingInfoList">
                                            <li>
                                              Scheduled{" "}
                                              <span className="meetingStatus green">
                                                completed
                                              </span>
                                            </li>
                                            <li>Client 1</li>
                                          </ul>
                                        </div>
                                      </div>
                                      <div className="col-xxl-5 col-sm-6 col-12 mt-2 mt-sm-0">
                                        <div className="card meetngInfo">
                                          <ul className="meetingInfoList">
                                            <li>09:00 AM EDT </li>
                                            <li>12:30 PM EDT</li>
                                          </ul>
                                        </div>
                                      </div>
                                    </div>
                                    <hr />
                                    <div class="btn-box d-flex shiftBtnBox">
                                      <button
                                        type="button"
                                        class="blue-btn-default btn-sm btn-outline-gray mt-2"
                                      >
                                        View Detail
                                      </button>
                                      <button
                                        type="button"
                                        class="blue-btn-default btn-sm btn-outline-gray mt-2"
                                      >
                                        <img
                                          src={loactionIocn}
                                          alt="loaction-Iocn"
                                        />
                                        Get Directions
                                      </button>
                                    </div>
                                  </div>
                                  <div className="col-md-4 mt-3 mt-md-0">
                                    <div class="card meetngInfo h-100 justify-content-center align-items-center">
                                      <div className="totalTime">03:30 hrs</div>
                                      <div class="btn-box d-flex shiftBtnBox">
                                        <button
                                          type="button"
                                          class="blue-btn-default btn-sm mt-2"
                                        >
                                          Clock In
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div> 
                             <div className="col-xl-6 col-md-12 col-12">
                              <div className="card p-4">
                                <div className="row">
                                  <div className="col-md-8">
                                    <h4 className="shiftDate">
                                      <img
                                        src={calenderIcon}
                                        alt="calenderIcon-icon"
                                      />
                                      Today, 26 April 2023
                                    </h4>
                                    <div className="row">
                                      <div className="col-xxl-5 col-sm-6 col-12">
                                        <div className="card meetngInfo">
                                          <ul className="meetingInfoList">
                                            <li>
                                              Scheduled{" "}
                                              <span className="meetingStatus green">
                                                completed
                                              </span>
                                            </li>
                                            <li>Client 1</li>
                                          </ul>
                                        </div>
                                      </div>
                                      <div className="col-xxl-5 col-sm-6 col-12 mt-2 mt-sm-0">
                                        <div className="card meetngInfo">
                                          <ul className="meetingInfoList">
                                            <li>09:00 AM EDT </li>
                                            <li>12:30 PM EDT</li>
                                          </ul>
                                        </div>
                                      </div>
                                    </div>
                                    <hr />
                                    <div class="btn-box d-flex shiftBtnBox">
                                      <button
                                        type="button"
                                        class="blue-btn-default btn-sm btn-outline-gray mt-2"
                                      >
                                        View Detail
                                      </button>
                                      <button
                                        type="button"
                                        class="blue-btn-default btn-sm btn-outline-gray mt-2"
                                      >
                                        <img
                                          src={loactionIocn}
                                          alt="loaction-Iocn"
                                        />
                                        Get Directions
                                      </button>
                                    </div>
                                  </div>
                                  <div className="col-md-4 mt-3 mt-md-0">
                                    <div class="card meetngInfo h-100 justify-content-center align-items-center">
                                      <div className="totalTime">03:30 hrs</div>
                                      <div class="btn-box d-flex shiftBtnBox">
                                        <button
                                          type="button"
                                          class="blue-btn-default btn-sm mt-2"
                                        >
                                          Clock In
                                        </button>
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
                {/* [/Card] */}
              </div>
            </div>
          </div>
        </div>
      </div>
    
  );
};
export default ViewYourShift;