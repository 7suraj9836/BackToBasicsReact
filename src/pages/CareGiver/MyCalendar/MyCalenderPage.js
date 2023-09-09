import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar/sidebar";
import Header from "../../../components/Header/header.js";
import "../../../components/Header/header.scss";
import "../Sidebar/sidebar.scss";
import { Calendar, dateFnsLocalizer,momentLocalizer  } from "react-big-calendar";
import userIocn from "../../../assets/images/user.png";
import clientIcon from "../../../assets/images/client.png";
import caregiversIcon from "../../../assets/images/caregivers.png";
import adminIcon from "../../../assets/images/admin.png";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
//import Modal from "react-modal";
import { Modal } from "react-bootstrap";
import axios from 'axios';
import moment from 'moment';

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

const MyCalenderPage = () => {
  const [showSidebar, SetShowSidebar] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [newEvent, setNewEvent] = useState({
    // title: "",
    // start: new Date(),
    // end: new Date(),
    startTime: "",
    endTime: "",
    title: "",
    hours: 0,
  });
  const [allEvents, setAllEvents] = useState(events);





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

  //Event Details Coming from the API
 
  const [allotedEvents, setAllotedEvents]=useState([]);
  const newlocalizer = momentLocalizer(moment);
  const token = localStorage.getItem("BackToBasic-token");
  const config={
    header:{
      Authourization:`Bearer${token}`, 
    }
  }

   useEffect(()=>{
    axios.get('Api Url',config)
    .then((response)=>{
      const formattedEvents = response.data.records.map(event => ({
        id: event.id,
        title: event.title,
        start: new Date(event.start),
        end: new Date(event.end),
      }));

      setAllotedEvents(formattedEvents);
    }) .catch(error=>console.error("error fetching data",error));       
  },[]);



  return (
    <div className="container-fluid page-wrap">
      <div className="row height-100">
        <Sidebar showSidebar={showSidebar} updateSidebar={updateSidebar} />
        <div className="col main p-0">
          <Header title="My Calendar" updateSidebar={updateSidebar} />
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
                            <Calendar
                              localizer={newlocalizer}
                              events={allotedEvents}
                              startAccessor="start"
                              endAccessor="end"
                              style={{ height: 500 }}
                              selectable={true} // Enable date selection
                              onSelectSlot={handleOpenModal}
                            />
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
                                <form
                                  onSubmit={handleAddEvent}
                                  className="mt-3"
                                >
                                  <div className="mb-3">
                                    <label className="form-label">
                                      Start Time:
                                    </label>
                                    <input
                                      type="time"
                                      value={newEvent.startTime}
                                      className="form-control"
                                      onChange={(e) =>
                                        setNewEvent({
                                          ...newEvent,
                                          startTime: e.target.value,
                                        })
                                      }
                                    />
                                  </div>
                                  <div className="mb-3">
                                    <label className="form-label">
                                      {" "}
                                      End Time:
                                    </label>
                                    <input
                                      type="time"
                                      value={newEvent.endTime}
                                      className="form-control"
                                      onChange={(e) =>
                                        setNewEvent({
                                          ...newEvent,
                                          endTime: e.target.value,
                                        })
                                      }
                                    />
                                  </div>
                                  <div className="mb-3">
                                    <label className="form-label">Notes:</label>
                                    <textarea
                                      className="form-control"
                                      value={newEvent.title}
                                      onChange={(e) =>
                                        setNewEvent({
                                          ...newEvent,
                                          title: e.target.value,
                                        })
                                      }
                                    />
                                  </div>
                                  <div className="mb-3">
                                    <label className="form-label">
                                      {" "}
                                      Hours:{" "}
                                    </label>
                                    <input
                                      type="number"
                                      className="form-control"
                                      value={newEvent.hours}
                                      onChange={(e) =>
                                        setNewEvent({
                                          ...newEvent,
                                          hours: e.target.value,
                                        })
                                      }
                                    />
                                  </div>
                                  <div className="btn-box d-flex">
                                    <button
                                      type="submit"
                                      className="btn-sm blue-btn-default"
                                    >
                                      Add Event
                                    </button>
                                    <button
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
};
export default MyCalenderPage;
