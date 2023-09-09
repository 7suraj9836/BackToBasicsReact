import React, { useState, useEffect, useMemo } from "react";
import Sidebar from "../Sidebar/sidebar";
import "../../../assets/css/login.css";
import Header from "../../../components/Header/header.js";
import "../../../components/Header/header.scss";
import "../Sidebar/sidebar.scss";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import { Modal } from "react-bootstrap";
import apis from "../../../api/apis";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const events = [
  {
    title: "Big Meeting",
    allDay: true,
    start: new Date(2023, 6, 0),
    end: new Date(2023, 6, 0),

  },
  {
    title: "Vacation",
    start: new Date(2023, 6, 7),
    end: new Date(2023, 6, 10),

  },
  {
    title: "Conference",
    start: new Date(2023, 6, 20),
    end: new Date(2023, 6, 23),

  },
];

const ClientSchedule = () => {
  const [showSidebar, SetShowSidebar] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [client, setClient] = useState([]);
  const [clientId, setClientId] = useState(1);

  console.log(clientId, "jhsdf");
  const token = localStorage.getItem("BackToBasic-token");
  const [newEvent, setNewEvent] = useState({
    startTime: "",
    endTime: "",
    title: "",
    hours: 0,
  });
  console.log(newEvent, "newEvent");
  const [allEvents, setAllEvents] = useState(events);
  const navigate = useNavigate();

  function handleAddEvent(e) {
    e.preventDefault();

    setAllEvents([...allEvents, newEvent]);
    setNewEvent({
      startTime: "",
      endTime: "",
      title: "",
      hours: 0,
    
    });
  }

  function handleOpenModal(slotInfo) {
    setIsModalOpen(true);
    setNewEvent({
      ...newEvent,
      start: slotInfo.start || new Date(),
      end: slotInfo.end || new Date(),
    
    });
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  const updateSidebar = () => {
    SetShowSidebar(!showSidebar);
  };
  const handleClientChange = (e) => {
    setClientId(e.target.value);
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
  }, []);

  let handleSubmit = async () => {
    if (true) {
      let formData = new FormData();
      formData.append("client_id", clientId);
      formData.append("clock_in", newEvent.startTime);
      formData.append("clock_out", newEvent.endTime);

      const availabilityDate = newEvent.start; 
      const isoDate = availabilityDate.toString(); 
      const datePart = isoDate.split("+")[0];

      formData.append("Availability_date", datePart);

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      apis
        .post(`/ClientAvailability/CreateClientAvailability`, formData, config)
        .then((res) => {
          if (res.status === 200) {
            Swal.fire({
              icon: "success",
              timer: 1500,
              text: `Authorization added successfully`,
              showConfirmButton: false,
            });
            navigate("/add-client-schedule");
          } else {
            Swal.fire({
              icon: "error",
              timer: 1500,
              text: `Somthing went wrong`,
              showConfirmButton: false,
            });
            navigate("/client-schedule-management");
          }
        })
        .catch((err) => {
          Swal.fire({
            icon: "success",
            timer: 1500,
            text: ` Authorization added successfully`,
            showConfirmButton: false,
          });
          navigate("/client-schedule-management");
        });
    }
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
          <div class="container-fluid page-content-box p-lg-5 p-md-4 p-3">
            <div class="row">
              <div class="col">
                <div className="card dashboardCard height-100">
                  <div className="card-body p-0">
                    <div className="row">
                      <div className="col">
                        <div className="login-section p-0">
                          <form className="form-box p-0">
                            <div className="card mt-3">
                              <h5 className="form-label">Employee Schedule</h5>
                              <div className="form-box-inner col-lg-4 col-md-6 mb-4">
                                <div className="input-box">
                                  <select
                                    className="custom-select"
                                    name=""
                                    id=""
                                    placeholder="Select Client"
                                    onChange={(e) => handleClientChange(e)}
                                  >
                                    {client.map((option) => (
                                      <option key={option.id} value={option.id}>
                                        {option.name}
                                      </option>
                                    ))}
                                    <option value={"Select Clent"}>
                                      Select Client
                                    </option>
                                  </select>
                                </div>
                              </div>
                              <div className="row">
                                <Calendar
                                  localizer={localizer}
                                  events={allEvents}
                                  startAccessor="start"
                                  endAccessor="end"
                                  style={{ height: 500 }}
                                  selectable={true}
                                  onSelectSlot={handleOpenModal}
                                />
                              </div>
                            </div>
                            <div className="btn-box d-flex">
                              <button
                                type="button"
                                className="blue-btn-default btn-sm btn-outline-gray"
                                onClick={() => setPageNo(2)}
                              >
                                Cancel
                              </button>
                              <button
                                type="button"
                                className="blue-btn-default btn-sm"
                              >
                                Save
                              </button>
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
      <Modal
        className="modal fade"
        show={isModalOpen}
        centered
        onHide={() => {
          setIsModalOpen(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleAddEvent} className="mt-3">
            <div className="mb-3">
              <label className="form-label">Start Time:</label>
              <input
                type="time"
                value={newEvent.startTime}
                className="form-control"
                onChange={(e) =>
                  setNewEvent({ ...newEvent, startTime: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <label className="form-label"> End Time:</label>
              <input
                type="time"
                value={newEvent.endTime}
                className="form-control"
                onChange={(e) =>
                  setNewEvent({ ...newEvent, endTime: e.target.value })
                }
              />
            </div>
            {/* <div className="mb-3">
              <label className="form-label">Notes:</label>
              <textarea
                className="form-control"
                value={newEvent.title}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, title: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <label className="form-label"> Hours: </label>
              <input
                type="number"
                className="form-control"
                value={newEvent.hours}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, hours: e.target.value })
                }
              />
            </div> */}
            <div className="btn-box d-flex">
              <button
                type="button"
                className="btn-sm blue-btn-default"
                onClick={handleSubmit}
              >
                Add Event
              </button>
              <button
              type="button"
                onClick={handleCloseModal}
                className="blue-btn-default btn-sm btn-outline-gray"
              >
                Cancel
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ClientSchedule;
