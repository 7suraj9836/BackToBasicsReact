
import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar/sidebar";
import "../../../assets/css/login.css";
import Header from "../../../components/Header/header.js";
import "../../../components/Header/header.scss";
import "../Sidebar/sidebar.scss";
import TextField from "@mui/material/TextField";
import Textarea from "@mui/joy/Textarea";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import apis from "../../../api/apis";
import plusIcon from "../../../assets/images/addIcon.png";
import dayjs from "dayjs";

function ViewIndividualTreatmentPlan() {
  let data = {
    goal: "",
    objectives: [
      {
        objective: "",
        anticipated_treatment_hours_per_week: "",
      },
    ],
  };

  const text =
    "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Amet minim mollit non deserunt ullamco. anything…";
  const DischargePlanText =
    "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Amet minim mollit non deserunt ullamco.";
  const supportMemeberSaftey =
    "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Amet minim mollit non deserunt ullamco.";
  const [inputText, setInputText] = useState(text);
  const [dischargePlan, setDischargePlan] = useState(DischargePlanText);
  const [clientName, setClientName] = useState();
  const [clientFamilyMember, setClientFamilyMember] = useState();
  const [supportForMemberSaftey, SetSupportForMemberSaftey] =
    useState(supportMemeberSaftey);
  const [potentialTrigger, setPotentialTrigger] = useState();
  const [strategiesAndTechniques, setStrategiesAndTechniques] = useState();
  const [individualsResponsible, setIndividualsResponsible] = useState();
  const [showSidebar, SetShowSidebar] = useState(false);
  const [client, setClient] = useState([]);
  const [clientId, setClientId] = useState(1);
  const [clientProvider, setClientProvider] = useState([]);
  const [primaryDiagnosis, setPrimaryDiagnosis] = useState();
  const [secondaryDiagnosis, setSecondaryDiagnosis] = useState();
  const [individualTreatmentPeriod, setIndividualTreatmentPeriod] = useState();
  const [dayReview, setDayReview] = useState(null);
  const [performedDayReview, setPerformedDayReview] = useState(null);
  const [check, setCheck] = useState(false);
  const [rows, setRows] = useState([data]);
  const navigate = useNavigate();
  const token = localStorage.getItem("BackToBasic-token");
  const [pageNo, setPageNo] = useState(1);
  const { id } = useParams();

  const handleClientChange = (select) => {
    setClientId(select.target.value);
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
    console.log(event.target.value);
  };

  const handleDiscloserText = (e) => {
    setDischargePlan(e.target.value);
    console.log(e.target.value);
  };

  const handleSupportForMemberSaftey = (e) => {
    SetSupportForMemberSaftey(e.target.value);
    console.log(e.target.value);
  };

  const AddMoreRows = () => {
    let updatedRows = [...rows];
    updatedRows.push(data);
    setRows(updatedRows);
  };

  const updateSidebar = () => {
    SetShowSidebar(!showSidebar);
  };

  const getClientProvider = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    apis
      .get(`Shared/GetAllEmployees`, config)
      .then((res) => {
        setClientProvider(res.data.response);
        console.log(res.data.response, "fjhfkshgdfgl");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllClient = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    apis
      .get(`/Shared/GetAllClients`, config)
      .then((res) => {
        setClient(res.data.response);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAllClient();
    getClientProvider();
  }, []);

  const handleCheckboxChange = (event) => {
    setCheck(event.target.checked);
    console.log(event.target.checked, "checked");
  };

  const handleAddMoreGoal = (index) => {
    let updatedRows = [...rows];
    const goalData = {
      objective: "",
      anticipated_treatment_hours_per_week: "",
    };
    updatedRows[index]["objectives"].push(goalData);
    setRows(updatedRows);
  };
  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    apis
      .get(
        `/IndividualTreatmentPlan/GetIndividualTreatmentPlan?id=${id}`,
        config
      )
      .then((res) => {
        setClientName(res.data.response.client);
        setPrimaryDiagnosis(res.data.response.primary_diagnosis);
        setSecondaryDiagnosis(res.data.response.secondary_diagnosis);
        setIndividualTreatmentPeriod(
          res.data.response.individual_treatment_plan_period
        );
        setDayReview(dayjs(res.data.response.itp_start_date));
        setPerformedDayReview(dayjs(res.data.response.itp_end_date));
        setCheck(res.data.response.is_revision_to_itp_needed);
        // setRows(res.data.response.goals);
        setInputText(res.data.response);
        setDischargePlan(res.data.response.discharge_criteria);
        setClientName(
          res.data.response.implementing_discharge_plan_client_name
        );
        setClientFamilyMember(
          res.data.response.implementing_discharge_plan_client_family_name
        );
        SetSupportForMemberSaftey(
          res.data.response.support_needed_for_the_member_safety
        );
        setPotentialTrigger(
          res.data.response.potential_triggers_which_may_result_in_a_crisis
        );
        setStrategiesAndTechniques(res.data.response.
          strategies_and_techniques_to_stabilize_the_situation
        );

        setIndividualsResponsible(res.data.response.
          individuals_responsible_for_plan_implementation
        );
      });
  }, [id]);

  let handleSubmit = async () => {
    if (true) {
      let formData = new FormData();
      formData.append("client_id", clientId);
      formData.append("primary_diagnosis", primaryDiagnosis);
      formData.append("secondary_diagnosis", secondaryDiagnosis);
      formData.append(
        "individual_treatment_plan_period",
        individualTreatmentPeriod
      );
      formData.append("Itp_start_date", dayReview);
      formData.append("Itp_end_date", performedDayReview);
      formData.append("is_revision_to_itp_needed", check);
      formData.append("Special_accomodations_needed", inputText);
      rows.forEach((row, i) => {
        formData.append(`goals[${i}].goal`, row.goal); 

        row.objectives.forEach((objectivee, j) => {
          formData.append(`objectives[${j}].objective`, objectivee.objective);
          formData.append(
            `objectives[${j}].anticipated_treatment_hours_per_week`,
            objectivee.anticipated_treatment_hours_per_week
          );
        });
      });

      formData.append("Discharge_criteria", dischargePlan);
      formData.append("implementing_discharge_plan_client_name", clientName);
      formData.append(
        "implementing_discharge_plan_client_family_name",
        clientFamilyMember
      );
      formData.append(
        "support_needed_for_the_member_safety",
        supportForMemberSaftey
      );
      formData.append(
        "potential_triggers_which_may_result_in_a_crisis",
        potentialTrigger
      );
      formData.append(
        "Strategies_and_techniques_to_stabilize_the_situation",
        strategiesAndTechniques
      );
      formData.append(
        "individuals_responsible_for_plan_implementation",
        individualsResponsible
      );

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      apis
        .post(
          `/IndividualTreatmentPlan/SaveIndividualTreatmentPlan`,
          formData,
          config
        )
        .then((res) => {
          if (res.status === 200) {
            Swal.fire({
              icon: "success",
              timer: 1500,
              text: `ITP added successfully`,
              showConfirmButton: false,
            });
            navigate("/individual-treatment-plan");
          } else {
            Swal.fire({
              icon: "success",
              timer: 1500,
              text: `itp added successfully`,
              showConfirmButton: false,
            });
            navigate("/individual-treatment-plan");
          }
        })
        .catch((err) => {
          Swal.fire({
            icon: "success",
            timer: 1500,
            text: ` Employee added successfully`,
            showConfirmButton: false,
          });
          navigate("/add-edit-individual-treatment-plan");
        });
    }
  };

  const handleGoalChange = (e, i) => {
    let updatedRows = [...rows];

    updatedRows[i]["goal"] = e.target.value;
    console.log(updatedRows);

    setRows(updatedRows);
  };
  const handleObjectiveChange = (e, i, goalIndex) => {
    let updatedRows = [...rows];

    updatedRows[i]["objectives"][goalIndex]["objective"] = e.target.value;
    console.log(updatedRows);

    setRows(updatedRows);
  };
  const handleVisitDataChange = (date, i, goalIndex) => {
    let updatedRows = [...rows];
    // updatedRows[i]["objectives"][goalIndex]["anticipated_treatment_hours_per_week"] = date;
    updatedRows[i].objectives[goalIndex].anticipated_treatment_hours_per_week =
      date;
    console.log(updatedRows);
    setRows(updatedRows);
  };

  return (
    <div class="container-fluid page-wrap">
      <div class="row height-100">
        <Sidebar showSidebar={showSidebar} updateSidebar={updateSidebar} />
        <div class="col main p-0">
          <Header
            title="Add/Edit Employee Information"
            updateSidebar={updateSidebar}
          />
          {pageNo === 1 && (
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
                                  <div className="form-box-inner col-12 mb-4">
                                    <div className="input-box">
                                      <label className="form-label">
                                        Select Client
                                      </label>
                                      <div className="col-lg-6 col-md-6">
                                        <select
                                          className="custom-select"
                                          name=""
                                          id=""
                                          placeholder="Select gender"
                                          onChange={(e) =>
                                            handleClientChange(e)
                                          }
                                        >
                                          {client.map((option) => (
                                            <option
                                              key={option.id}
                                              value={option.id}
                                            >
                                              {option.name}
                                            </option>
                                          ))}
                                          <option value={"Select Clent"}>
                                            Select Client
                                          </option>
                                        </select>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="form-box-inner col-lg-12 col-md-12 mb-4">
                                    <div className="input-box">
                                      <label className="form-label">
                                        {" "}
                                        Primary Diagnosis{" "}
                                      </label>
                                      <div className="col-lg-6 col-md-6">
                                        <Textarea
                                          minRows={4}
                                          value={primaryDiagnosis}
                                          onChange={(e) =>
                                            setPrimaryDiagnosis(e.target.value)
                                          }
                                        ></Textarea>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="form-box-inner col-lg-12 col-md-12 mb-4">
                                    <div className="input-box">
                                      <label className="form-label">
                                        {" "}
                                        Secondary Diagnosis If applicable:{" "}
                                      </label>
                                      <div className="col-lg-6 col-md-6">
                                        <Textarea
                                          minRows={4}
                                          value={secondaryDiagnosis}
                                          onChange={(e) =>
                                            setSecondaryDiagnosis(
                                              e.target.value
                                            )
                                          }
                                        ></Textarea>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="form-box-inner col-12 mb-4">
                                    <div className="input-box">
                                      <label className="form-label">
                                        Individual treatment Plan period
                                      </label>
                                      <div className="col-lg-6 col-md-6">
                                        <input
                                          type="text"
                                          placeholder={" "}
                                          value={individualTreatmentPeriod}
                                          onChange={(e) =>
                                            setIndividualTreatmentPeriod(
                                              e.target.value
                                            )
                                          }
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="form-box-inner col-xxl-4 col-lg-6 col-md-6 mb-4">
                                    <div className="input-box">
                                      <label className="form-label">
                                        90 Day Review must be done or on before
                                        :
                                      </label>
                                      <LocalizationProvider
                                        dateAdapter={AdapterDayjs}
                                      >
                                        <DesktopDatePicker
                                          orientation="landscape"
                                          openTo="day"
                                          value={dayReview}
                                          onChange={(date) => {
                                            setDayReview(date);
                                          }}
                                          renderInput={(params) => (
                                            <TextField {...params} />
                                          )}
                                        />
                                      </LocalizationProvider>
                                    </div>
                                  </div>
                                  <div className="form-box-inner col-xxl-4 col-lg-6 col-md-6 mb-4">
                                    <div className="input-box">
                                      <label className="form-label">
                                        90 Day Review performed on:
                                      </label>
                                      <LocalizationProvider
                                        dateAdapter={AdapterDayjs}
                                      >
                                        <DesktopDatePicker
                                          orientation="landscape"
                                          openTo="day"
                                          value={performedDayReview}
                                          onChange={(date) => {
                                            setPerformedDayReview(date);
                                          }}
                                          renderInput={(params) => (
                                            <TextField {...params} />
                                          )}
                                        />
                                      </LocalizationProvider>
                                    </div>
                                  </div>
                                  <div className="form-box-inner col-12 pt-1">
                                    <div className="input-box d-flex align-center">
                                      <label
                                        className="form-label me-3"
                                        htmlFor=""
                                      >
                                        Is Revision to ITP Needed:
                                      </label>
                                      <FormGroup row>
                                        <FormControlLabel
                                          control={
                                            <Checkbox
                                              checked={check}
                                              onChange={handleCheckboxChange}
                                            />
                                          }
                                          label="Yes"
                                          labelPlacement="end"
                                        />
                                        <FormControlLabel
                                          control={
                                            <Checkbox
                                              checked={!check}
                                              onChange={handleCheckboxChange}
                                            />
                                          }
                                          label="No"
                                          labelPlacement="end"
                                        />
                                      </FormGroup>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="btn-box d-flex">
                                <button
                                  type="button"
                                  className="blue-btn-default btn-sm"
                                  onClick={() => setPageNo(2)}
                                >
                                  Next
                                </button>
                                <button
                                  type="button"
                                  className="blue-btn-default btn-sm btn-outline-gray"
                                  onClick={(event) =>
                                    (window.location.href =
                                      "/individual-treatment-plan")
                                  }
                                >
                                  Cancel
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* [/Card] */}
                </div>
              </div>
            </div>
          )}
          {pageNo === 2 && (
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
                                  <div className="form-box-inner col-12 mb-4">
                                    <div className="input-box">
                                      <label className="form-label">
                                        Reason for receiving service (problem
                                        statement)
                                      </label>
                                      <div className="col-lg-8 col-md-8">
                                        <Textarea
                                          minRows={4}
                                          // value={obj[1]}
                                          // onChange={(e)=>handleReasonChange(e,i)}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  {rows.map((obj, i) => (
                                    <React.Fragment key={i}>
                                      <div className="form-box-inner col-lg-12 col-md-12 mb-4">
                                        <div className="input-box">
                                          <label className="form-label">
                                            Goal 1
                                          </label>
                                          <div className="col-lg-8 col-md-8">
                                            <input
                                              type="text"
                                              placeholder={"Employee Name"}
                                              // value={employeeName}
                                              // onChange={(e) => {
                                              //   setEmployeeName(e.target.value);
                                              // }}
                                              value={obj["goal"]}
                                              onChange={(e) =>
                                                handleGoalChange(e, i)
                                              }
                                            />
                                          </div>
                                        </div>
                                      </div>
                                      {obj["objectives"].map((row, j) => (
                                        <>
                                          <div className="form-box-inner col-lg-4 col-md-6 mb-4">
                                            <div className="input-box">
                                              <label className="form-label">
                                                Objective IA
                                              </label>
                                              <input
                                                type="text"
                                                placeholder={" "}
                                                value={row["objective"]}
                                                onChange={(e) =>
                                                  handleObjectiveChange(e, i, j)
                                                }
                                              />
                                            </div>
                                          </div>
                                          <div className="form-box-inner col-lg-4 col-md-6 mb-4">
                                            <div className="input-box">
                                              <label className="form-label">
                                                Visit date and time
                                              </label>
                                              <LocalizationProvider
                                                dateAdapter={AdapterDayjs}
                                              >
                                                <DesktopDatePicker
                                                  orientation="landscape"
                                                  openTo="day"
                                                  value={
                                                    row.anticipated_treatment_hours_per_week
                                                  }
                                                  // value={row["anticipated_treatment_hours_per_week"]}☻
                                                  onChange={(date) => {
                                                    handleVisitDataChange(
                                                      date,
                                                      i,
                                                      j
                                                    );
                                                  }}
                                                  renderInput={(params) => (
                                                    <TextField {...params} />
                                                  )}
                                                />
                                              </LocalizationProvider>
                                            </div>
                                          </div>
                                        </>
                                      ))}
                                      <div class="col-auto align-self-center">
                                        <div className="input-box">
                                          <button
                                            type="button"
                                            class="imgWithLink ms-2 bg-white border-0"
                                            onClick={(e) =>
                                              handleAddMoreGoal(i)
                                            }
                                          >
                                            <i class="addPage me-0">
                                              <img
                                                class="linkImg"
                                                src={plusIcon}
                                                alt="upload"
                                              />
                                            </i>
                                            Add More Goals
                                          </button>
                                        </div>
                                      </div>
                                      <div class="col-12 align-self-center">
                                        <div className="input-box">
                                          <button
                                            type="button"
                                            class="imgWithLink ms-2 bg-white border-0"
                                            onClick={(e) => AddMoreRows()}
                                          >
                                            <i class="addPage me-0">
                                              <img
                                                class="linkImg"
                                                src={plusIcon}
                                                alt="upload"
                                              />
                                            </i>
                                            Add More Rows
                                          </button>
                                        </div>
                                      </div>
                                    </React.Fragment>
                                  ))}
                                </div>
                              </div>
                              <div className="card mb-3">
                                <div className="row">
                                  <h3 className="form-label">
                                    Specific Medically Necessary Treatment
                                    Schedule
                                  </h3>
                                  <div className="form-box-inner col-lg-3 col-md-6 mb-4">
                                    <h5>Frequency</h5>
                                    <div className="input-box">
                                      <label className="form-label">
                                        Session Per week
                                      </label>
                                      <input
                                        type="text"
                                        placeholder={"Employee Name"}
                                        // value={employeeName}
                                        // onChange={(e) => {
                                        //   setEmployeeName(e.target.value);
                                        // }}
                                      />
                                    </div>
                                  </div>
                                  <div className="form-box-inner col-lg-3 col-md-6 mb-4">
                                    <h5>Duration</h5>
                                    <div className="input-box">
                                      <label className="form-label">
                                        Session Per week
                                      </label>
                                      <input
                                        type="text"
                                        placeholder={"Employee Name"}
                                        // value={employeeName}
                                        // onChange={(e) => {
                                        //   setEmployeeName(e.target.value);
                                        // }}
                                      />
                                    </div>
                                  </div>
                                  <div className="form-box-inner col-lg-3 col-md-6 mb-4">
                                    <h5>Service Provider</h5>
                                    <div className="input-box">
                                      <label className="form-label">
                                        Select Caregiver
                                      </label>
                                      <select
                                        className="custom-select"
                                        name=""
                                        id=""
                                        placeholder="Select gender"
                                      >
                                        {/* {roleOptions.map((option) => (
                                            <option key={option.id} value={option.id}>
                                              {option.value}
                                            </option>
                                          ))} */}
                                      </select>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="card ">
                                <div className="row">
                                  <h3 className="form-label mb-3">
                                    Specific Medically Necessary Treatment
                                    Schedule
                                  </h3>
                                  <div className="table-responsive">
                                    <table className="table m-0 butifyTable border rounded-3">
                                      <thead>
                                        <tr>
                                          <th>days</th>
                                          <th>time</th>
                                          <th>hours</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr>
                                          <td>Thursday</td>
                                          <td>7: 30 am-2:30PM</td>
                                          <td>7: 30 am-2:30PM</td>
                                        </tr>
                                        <tr>
                                          <td>Wednesday</td>
                                          <td>7: 30 am-2:30PM</td>
                                          <td>7: 30 am-2:30PM</td>
                                        </tr>
                                        <tr>
                                          <td>Friday</td>
                                          <td>7: 30 am-2:30PM</td>
                                          <td>7: 30 am-2:30PM</td>
                                        </tr>
                                        <tr>
                                          <td>Monday</td>
                                          <td>7: 30 am-2:30PM</td>
                                          <td>7: 30 am-2:30PM</td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                              <div className="btn-box d-flex">
                                <button
                                  type="button"
                                  className="blue-btn-default btn-sm"
                                  onClick={() => setPageNo(3)}
                                >
                                  Next
                                </button>
                                <button
                                  type="button"
                                  className="blue-btn-default btn-sm btn-outline-gray"
                                  onClick={(event) =>
                                    (window.location.href =
                                      "/individual-treatment-plan")
                                  }
                                >
                                  Cancel
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* [/Card] */}
                </div>
              </div>
            </div>
          )}

          {pageNo === 3 && (
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
                                  <div className="form-box-inner col-12">
                                    <div class="form-check mb-4">
                                      <input
                                        class="form-check-input"
                                        type="radio"
                                        name="DischargePlan"
                                        id="DischargePlan1"
                                      />
                                      {/* <label class="form-check-label border rounded-3 p-4 ms-3" > </label> */}
                                      <Textarea
                                        sx={{ p: 3, ml: 2 }}
                                        htmlFor="DischargePlan1"
                                        value={inputText}
                                        onChange={handleInputChange}
                                      >
                                        {" "}
                                        {inputText}
                                      </Textarea>
                                    </div>
                                    <div class="form-check ">
                                      <input
                                        class="form-check-input"
                                        type="radio"
                                        name="DischargePlan"
                                        id="DischargePlan2"
                                      />
                                      <div className=" ">
                                        <h3
                                          className="form-label mb-2 ms-3"
                                          htmlFor="DischargePlan2"
                                        >
                                          Discharge plan
                                        </h3>
                                        <Textarea
                                          sx={{ p: 3, ml: 2 }}
                                          htmlFor="DischargePlan2"
                                          onChange={handleDiscloserText}
                                          value={dischargePlan}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="card mb-3">
                                <div className="row">
                                  <h3 className="form-label">
                                    {" "}
                                    Individual responsible for implementing
                                    discharge plan{" "}
                                  </h3>
                                  <div className="form-box-inner col-12 mb-0">
                                    <div class="form-check mb-3">
                                      <input
                                        class="form-check-input"
                                        type="radio"
                                        name="HealthService1"
                                        id="HealthService1"
                                      />
                                      <label
                                        class="form-check-label ms-3"
                                        htmlFor="HealthService1"
                                      >
                                        Back to basic behavioral health Service
                                        inc.
                                      </label>
                                    </div>
                                  </div>
                                  <div className="form-box-inner col-12 mb-2">
                                    <div class="form-check ">
                                      <input
                                        class="form-check-input"
                                        type="radio"
                                        name="HealthService2"
                                        id="HealthService2"
                                      />
                                      <div className="input-box">
                                        <label
                                          className="form-label mb-2 ms-3"
                                          htmlFor="HealthService2"
                                        >
                                          Client
                                        </label>
                                        <div
                                          class="ps-3 col-lg-12"
                                          htmlFor="HealthService2"
                                        >
                                          <div className="input-box col-lg-4 col-md-6">
                                            <input
                                              type="text"
                                              placeholder="Enter Name"
                                              value={clientName}
                                              onChange={(e) => {
                                                setClientName(e.target.value);
                                              }}
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="form-box-inner col-12">
                                    <div class="form-check ">
                                      <input
                                        class="form-check-input"
                                        type="radio"
                                        name="HealthService2"
                                        id="HealthService3"
                                      />
                                      <div className="input-box">
                                        <label
                                          className="form-label mb-2 ms-3"
                                          htmlFor="HealthService3"
                                        >
                                          Client Family Member
                                        </label>
                                        <div
                                          class="ps-3 col-lg-12"
                                          htmlFor="HealthService3"
                                        >
                                          <div className="input-box col-lg-4 col-md-6">
                                            <input
                                              type="text"
                                              placeholder="Enter Name"
                                              value={clientFamilyMember}
                                              onChange={(e) => {
                                                setClientFamilyMember(
                                                  e.target.value
                                                );
                                              }}
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="card mb-3">
                                <div className="row">
                                  <h3 className="form-label">
                                    Support needs for the member’s Safety (As
                                    identify by the family )
                                  </h3>
                                  <div className="form-box-inner col-12">
                                    <div class="form-check mb-4">
                                      <input
                                        class="form-check-input"
                                        type="radio"
                                        name="SafetyMamber"
                                        id="SafetyMamber"
                                      />
                                      <Textarea
                                        sx={{ p: 3, ml: 2 }}
                                        htmlFor="SafetyMamber"
                                        onChange={handleSupportForMemberSaftey}
                                        value={supportForMemberSaftey}
                                      >
                                        {supportForMemberSaftey}
                                      </Textarea>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="card">
                                <div className="row">
                                  <label className="form-label">
                                    Crisis Safety Plan
                                  </label>
                                  <div className="form-box-inner col-12 mb-lg-4 mb-md-3 mb-2">
                                    <div className="input-box col-lg-8 col-md-12 ">
                                      <label className="form-label">
                                        Potential trigger with my result in
                                        crisis
                                      </label>
                                      <input
                                        className="form-control"
                                        type="text"
                                        placeholder=" "
                                        value={potentialTrigger}
                                        onChange={(e) => {
                                          setPotentialTrigger(e.target.value);
                                        }}
                                      />
                                    </div>
                                  </div>
                                  <div className="form-box-inner col-12 mb-lg-4 mb-md-3 mb-2">
                                    <div className="input-box col-lg-8 col-md-12 ">
                                      <label className="form-label">
                                        Strategies and Techniques to Stabilize
                                        the Situat
                                      </label>
                                      <input
                                        className="form-control"
                                        type="text"
                                        placeholder=" "
                                        value={strategiesAndTechniques}
                                        onChange={(e) => {
                                          setStrategiesAndTechniques(
                                            e.target.value
                                          );
                                        }}
                                      />
                                    </div>
                                  </div>
                                  <div className="form-box-inner col-12">
                                    <div className="input-box col-lg-8 col-md-12 ">
                                      <label className="form-label">
                                        Individuals Responsible for Plan
                                        Implementation:
                                      </label>
                                      <input
                                        className="form-control"
                                        type="text"
                                        placeholder=" "
                                        value={individualsResponsible}
                                        onChange={(e) => {
                                          setIndividualsResponsible(
                                            e.target.value
                                          );
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="btn-box d-flex">
                                <button
                                  type="button"
                                  className="blue-btn-default btn-sm"
                                  onClick={handleSubmit}
                                >
                                  Submit
                                </button>
                                <button
                                  type="button"
                                  className="blue-btn-default btn-sm btn-outline-gray"
                                  onClick={(event) =>
                                    (window.location.href =
                                      "./individual-treatment-plan")
                                  }
                                >
                                  Cancel
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* [/Card] */}
                </div>
              </div>
            </div>
          )}


        </div>
      </div>
    </div>
  );
}

export default ViewIndividualTreatmentPlan;
