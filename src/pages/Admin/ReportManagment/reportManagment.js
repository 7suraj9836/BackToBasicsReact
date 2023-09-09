import React, { useEffect, useState } from "react";
import { Link} from "react-router-dom";
import Sidebar from "../Sidebar/sidebar";
import Header from "../../../components/Header/header.js";
import "../../../components/Header/header.scss";
import "../Sidebar/sidebar.scss";
import downloadFile from "../../../assets/images/download-file.png";
import apis from "../../../api/apis";
import { LocalizationProvider, DesktopDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const ReportManagment = () => {
  const [showSidebar, SetShowSidebar] = useState(false);
  const updateSidebar = () => {
    SetShowSidebar(!showSidebar);
  };
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const token = localStorage.getItem("BackToBasic-token");
  const [fileTypes, setFileTypes] = useState(1);
  const fileType = [
    { id: "csv", value: "csv" },
    { id: "excel", value: "excel" },
  ];
        
  
  const handleTypeChange = (event) => {
    setFileTypes(event.target.value);
    console.log(event.target.value);
  };

  const handleDownload = () => {
    const selectedFileType = fileType.find((option) => option.id === fileTypes);
    if (!selectedFileType) {
      return;
    }

    const formattedStartDate = startDate ? startDate.format() : "";
    const formattedEndDate = endDate ? endDate.format() : "";
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: "blob",
    };

    const apiEndpoint = `/Reports/DownloadClientDataReport?format=${
      selectedFileType.id
    }&dateFrom=${encodeURIComponent(
      formattedStartDate
    )}&dateTo=${encodeURIComponent(formattedEndDate)}`;
    apis
      .get(apiEndpoint, config)

      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          selectedFileType.id === "csv"
            ? "client-report.csv"
            : `client-report.xlsx`
        );
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
        console.error("Error occurred during file download:", error);
      });
  };
 
  return (
    <div className="container-fluid page-wrap">
      <div className="row height-100">
        <Sidebar showSidebar={showSidebar} updateSidebar={updateSidebar} />
        <div className="col main p-0">
          <Header title="Report Management" updateSidebar={updateSidebar} />
          <div className="container-fluid page-content-box p-lg-5 p-md-4 p-3">
            <div className="row">
              <div className="col">
                {/* [Card] */}
                <div className="card user-card height-100">
                  <div className="card-body">
                    <div className="row">
                      <div className="col">
                        <div className="login-section px-2">
                          <form className="form-box px-md-2">
                            <div className="row">
                              <div class="form-box-inner col-lg-3 col-md-6 mb-4">
                                <div class="input-box">
                                  <label
                                    class="form-label"
                                    htmlFor="ReportFormat"
                                  >
                                    Report Format
                                  </label>
                                  <select
                                    name="ReportFormat"
                                    id="ReportFormat"
                                    className="custom-select"
                                    value={fileTypes}
                                    onChange={handleTypeChange}
                                    placeholder="Select State"
                                  >
                                    <option value="" disabled selected>
                                      Select file type
                                    </option>
                                    {fileType.map((option) => (
                                      <option key={option.id} value={option.id}>
                                        {option.value}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                              <div class="form-box-inner col-lg-3 col-md-6 mb-4">
                                <div class="input-box">
                                  <label class="form-label">
                                    Date Range to
                                  </label>
                                  <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                  >
                                    <DesktopDatePicker
                                      orientation="landscape"
                                      openTo="day"
                                      value={startDate}
                                      onChange={(date) => {
                                        setStartDate(date);
                                      }}
                                      renderInput={(params) => (
                                        <TextField {...params} />
                                      )}
                                    />
                                  </LocalizationProvider>
                                </div>
                              </div>
                              <div class="form-box-inner col-lg-3 col-md-6 mb-4">
                                <div class="input-box">
                                  <label class="form-label">
                                    Date Range From
                                  </label>
                                  <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                  >
                                    <DesktopDatePicker
                                      orientation="landscape"
                                      openTo="day"
                                      value={endDate}
                                      onChange={(date) => {
                                        setEndDate(date);
                                      }}
                                      renderInput={(params) => (
                                        <TextField {...params} />
                                      )}
                                    />
                                  </LocalizationProvider>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <div className="table-responsive overflow-auto">
                          <table className="table m-0 butifyTable">
                            <thead>
                              <tr>
                                <th
                                  style={{ minWidth: "200px", maxWidth: "30%" }}
                                >
                                  Report
                                </th>
                                <th
                                  style={{ minWidth: "200px", maxWidth: "30%" }}
                                >
                                  Status
                                </th>
                                <th
                                  style={{ minWidth: "200px", maxWidth: "30%" }}
                                >
                                  Info
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>Client Data Report </td>
                                <td className="text-start">Complete</td>
                                <td>
                                  <Link to="" className="imgWithLink">
                                    <img
                                      className="linkImg me-2"
                                      src={downloadFile}
                                      onClick={handleDownload}
                                    />
                                    Download Report
                                  </Link>
                                </td>
                              </tr>
                              <tr>
                                <td>Employee Data Report </td>
                                <td className="text-start">Complete</td>
                                <td>
                                  <Link to="" className="imgWithLink">
                                    <img
                                      className="linkImg me-2"
                                      src={downloadFile}
                                      onClick={handleDownload}
                                    />
                                    Download Report
                                  </Link>
                                </td>
                              </tr>
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

export default ReportManagment;

