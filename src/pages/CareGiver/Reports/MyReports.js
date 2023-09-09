import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar/sidebar";
import Header from "../../../components/Header/header.js";
import "../../../components/Header/header.scss";
import "../Sidebar/sidebar.scss";
import downloadFile from "../../../assets/images/download-file.png";
import plusIcon from "../../../assets/images/plusIcon.png";
import axios from "axios";
import { clientAction } from "../../../redux/actions/user";
import { connect } from "react-redux";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import apis from "../../../api/apis";
import Swal from "sweetalert2";
import filterIcon from "../../../assets/images/filter.png";
import Button from "@mui/material/Button";

//filter popper
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import Fade from "@mui/material/Fade";
import IconButton from "@mui/joy/IconButton";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const MyReports = () => {
  const [showSidebar, SetShowSidebar] = useState(false);
  const [reports, setReports] = useState([]);
  const updateSidebar = () => {
    SetShowSidebar(!showSidebar);
  };
  const token = localStorage.getItem("BackToBasic-token");
  const [result, setResult] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOptions, setSelectedOptions] = useState("");

  const [fileTypes, setFileTypes] = useState(1);
  const fileType = [
    { id: "csv", value: "csv" },
    { id: "excel", value: "excel" },
  ];
  const handleTypeChange = (event) => {
    setFileTypes(event.target.value);
    console.log(event.target.value);
  };

  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const handleOpenFilterModal = () => setOpenFilterModal(true);
  const handleCloseFilterModal = () => setOpenFilterModal(false);

  const filterstyle = {
    position: "fixed",
    top: "281px",
    right: "-112px",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

//Call the API to get the list of records

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

// useEffect(()=>{

//   axios.get('API Url',config).then((res)=>{
//    setReports(res.data);
//   }).catch((error)=>{
//      console.log(error);
//   })


// },[])



  const reportDetails = [
    {
      BHP_NAME: "John Smith",
      CLIENT_NAME: "ABC Company",
      JOB: "Project A",
      DATE: "2023-08-01",
      CLOCK_IN: "09:00 AM",
      CLOCK_OUT: "05:00 PM",
      TOTAL_TIME: "8 hours",
    },
    {
      BHP_NAME: "Jane Doe",
      CLIENT_NAME: "XYZ Corporation",
      JOB: "Project B",
      DATE: "2023-08-02",
      CLOCK_IN: "08:30 AM",
      CLOCK_OUT: "04:30 PM",
      TOTAL_TIME: "8 hours",
    },
    {
      BHP_NAME: "Michael Johnson",
      CLIENT_NAME: "123 Tech",
      JOB: "Project C",
      DATE: "2023-08-03",
      CLOCK_IN: "10:00 AM",
      CLOCK_OUT: "06:00 PM",
      TOTAL_TIME: "8 hours",
    },
    {
      BHP_NAME: "Emily Brown",
      CLIENT_NAME: "Acme Corp",
      JOB: "Project D",
      DATE: "2023-08-04",
      CLOCK_IN: "09:30 AM",
      CLOCK_OUT: "05:30 PM",
      TOTAL_TIME: "8 hours",
    },
    {
      BHP_NAME: "William Lee",
      CLIENT_NAME: "Tech Solutions",
      JOB: "Project E",
      DATE: "2023-08-05",
      CLOCK_IN: "08:00 AM",
      CLOCK_OUT: "04:00 PM",
      TOTAL_TIME: "8 hours",
    },
    {
      BHP_NAME: "Sophia Clark",
      CLIENT_NAME: "Innovative Ideas",
      JOB: "Project F",
      DATE: "2023-08-06",
      CLOCK_IN: "09:15 AM",
      CLOCK_OUT: "05:15 PM",
      TOTAL_TIME: "8 hours",
    },
    {
      BHP_NAME: "James Anderson",
      CLIENT_NAME: "Tech Solutions",
      JOB: "Project G",
      DATE: "2023-08-07",
      CLOCK_IN: "09:45 AM",
      CLOCK_OUT: "05:45 PM",
      TOTAL_TIME: "8 hours",
    },
    {
      BHP_NAME: "Olivia Wilson",
      CLIENT_NAME: "Data Insights",
      JOB: "Project H",
      DATE: "2023-08-08",
      CLOCK_IN: "08:45 AM",
      CLOCK_OUT: "04:45 PM",
      TOTAL_TIME: "8 hours",
    },
    {
      BHP_NAME: "Liam Martinez",
      CLIENT_NAME: "Tech Solutions",
      JOB: "Project I",
      DATE: "2023-08-09",
      CLOCK_IN: "10:30 AM",
      CLOCK_OUT: "06:30 PM",
      TOTAL_TIME: "8 hours",
    },
    {
      BHP_NAME: "Ava Phillips",
      CLIENT_NAME: "Innovative Ideas",
      JOB: "Project J",
      DATE: "2023-08-10",
      CLOCK_IN: "09:30 AM",
      CLOCK_OUT: "05:30 PM",
      TOTAL_TIME: "8 hours",
    },
    {
      BHP_NAME: "Test Filter By Month",
      CLIENT_NAME: "Data Insights",
      JOB: "Project J",
      DATE: "2023-09-10",
      CLOCK_IN: "09:30 AM",
      CLOCK_OUT: "05:30 PM",
      TOTAL_TIME: "8 hours",
    },
    {
      BHP_NAME: "New BHP Name",
      CLIENT_NAME: "Innovative Ideas",
      JOB: "Project X",
      DATE: "2023-10-15",
      CLOCK_IN: "09:30 AM",
      CLOCK_OUT: "05:30 PM",
      TOTAL_TIME: "8 hours",
    }
  ];

  //filter popper

  const [openFilter, setOpenFilter] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

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

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  // Handle Download Reports
  const handleDownload = () => {

    const selectedFileType = fileType.find((option) => option.id === fileTypes);
    if (!selectedFileType) {
      return;
    }
   
    apis
      .get(`/Client/DownloadClientDataReport?format=${
        selectedFileType.id
      }`, config)
      .then((response) => {
        console.log(response, "res");
        return response.data;
      })
      .then((base64) => {
        const link = document.createElement("a");
        console.log(base64, "base64");
        link.href = base64;
        link.target = "_blank";
        link.setAttribute("download", "client-report.pdf");
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      })
      .catch((error) => {
        console.log("Error occurred during file download:", error);
      });
  };

  const handleFilter = () => {
    const formattedStartDate = dateFrom ? dateFrom.format() : "";
    const formattedEndDate = dateTo ? dateTo.format() : "";
    console.log(formattedStartDate);
    console.log(formattedEndDate);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: "blob",
    };

    const apiEndpoint = `/Reports/DownloadClientDataReport?dateFrom=${encodeURIComponent(
      formattedStartDate
    )}&dateTo=${encodeURIComponent(formattedEndDate)}`;
    apis
      .get(apiEndpoint, config)

      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error("Error occured in applying the filter", error);
      });
  };

  

//Filter data according to Date Range

  const[filteredData, setFilteredData]=useState(reportDetails);
 
    const filteredRecords = () => {
      const dateFromFormat = new Date(dateFrom);
      const dateToFormat = new Date(dateTo);
  const formattedDateFrom = `${dateFromFormat.getFullYear()}-${(dateFromFormat.getMonth() + 1).toString().padStart(2, '0')}-${dateFromFormat.getDate().toString().padStart(2, '0')}`;
  console.log(formattedDateFrom);
  const formattedDateTo = `${dateToFormat.getFullYear()}-${(dateToFormat.getMonth() + 1).toString().padStart(2, '0')}-${dateToFormat.getDate().toString().padStart(2, '0')}`;
  console.log(formattedDateTo);
     
  const updatedRecords = reportDetails.filter((currentRecord) => {
        return currentRecord.DATE >= formattedDateFrom && currentRecord.DATE <= formattedDateTo;
      });
      setFilteredData(updatedRecords);
    };
    
 //function call when filter apply button is clicked

    const handleDateFilter = () => {
      if(selectedOptions=="custom"){
        filteredRecords();
       
      }
     // filteredRecords();
     if(selectedOptions=="thisMonth"){
      FilterRecordsByMonth();
     }
     
    };    
    
    //Apply Filter Based on current Month

   
      const FilterRecordsByMonth = () => {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
      
        const updatedRecordsAfterMonthFilter = reportDetails.filter((currentRecord) => {
          const recordDate = new Date(currentRecord.DATE); 
          return recordDate.getMonth() + 1 === currentMonth;
        });
        setFilteredData(updatedRecordsAfterMonthFilter);
        console.log(updatedRecordsAfterMonthFilter);
      };


    //Apply filter Based on current week

    useEffect(()=>{

      const getISOWeek = (date) => {
        const currentDate = date || new Date();
        const january1st = new Date(currentDate.getFullYear(), 0, 1);
        const daysOffset = january1st.getDay() === 0 ? 1 : 8 - january1st.getDay();
        const weekNumber = Math.ceil((currentDate - (january1st - daysOffset)) / 604800000); // 604800000 is the number of milliseconds in a week
        return weekNumber;
      };
      
      const currentWeekNumber = getISOWeek(); // Get the current ISO week number
      
      console.log(currentWeekNumber); // This will print the current week number
      
    
    },[])

    
    


  return (
    <div className="container-fluid page-wrap">
      <div className="row height-100">
        <Sidebar showSidebar={showSidebar} updateSidebar={updateSidebar} />
        <div className="col main p-0">
          <Header title="Reports" updateSidebar={updateSidebar} />
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

                          <div className="form-box-inner col-lg-3 col-md-6 mb-4">
                            <div className="input-box">
                              <label className="form-label" htmlFor="ReportFormat">
                                Report Format
                              </label>
                              <select
                                name="ReportFormat"
                                id="ReportFormat"
                                className="custom-select"
                                value={fileTypes}
                                onChange={handleTypeChange}
                              >
                                <option value="" hidden>
                                  Select File Format
                                </option>
                                {fileType.map((option) => (
                                  <option key={option.id} value={option.id}>
                                    {/* <option value="" disabled selected>Select file format</option> */}
                                    {option.value}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>

                          {/* Right Filter */}
                          <div className="tableRightLink d-flex ">
                            <Link to="" className="imgWithLink ms-2">
                              <img
                                className="linkImg"
                                src={downloadFile}
                                onClick={handleDownload}
                              />{" "}
                              Download Report
                            </Link>
                          </div>

                          <div className="tableRightLink d-flex position-relative">
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
                                              value={selectedOptions}
                                              onChange={(e) =>
                                                setSelectedOptions(
                                                  e.target.value
                                                )
                                              }
                                            >
                                              <option disabled value="">
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

                                        {selectedOptions === "custom" && (
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
                                            //  handleFilter();
                                              handleDateFilter();
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
                    </div>
                    <div className="row">
                      <div className="col">
                        <div className="table-responsive">
                          <table className="table m-0 butifyTable">
                            <thead>
                              <tr>
                                <th>BHP Name</th>
                                <th>Client Name</th>
                                <th>Job</th>
                                <th>Date</th>
                                <th>Clock In</th>
                                <th>Clock Out</th>
                                <th>Total Time</th>
                              </tr>
                            </thead>

                            <tbody>
                              {filteredData.length > 0 ? (
                                filteredData.map((r) => (
                                  <tr key={r.BHP_NAME}>
                                    <td>{r.BHP_NAME}</td>
                                    <td>{r.CLIENT_NAME}</td>
                                    <td>{r.JOB}</td>
                                    <td>{r.DATE}</td>
                                    <td>{r.CLOCK_IN}</td>
                                    <td>{r.CLOCK_OUT}</td>
                                    <td>{r.TOTAL_TIME}</td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td>No data to show</td>
                                </tr>
                              )}
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
};


export default MyReports;