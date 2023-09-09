import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar/sidebar";
import Header from "../../../components/Header/header.js";
import "../../../components/Header/header.scss";
import "../Sidebar/sidebar.scss";
import filterIcon from "../../../assets/images/filter.png";
import { styled, alpha } from "@mui/material/styles";
//import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import calenderIcon from "../../../assets/images/sidebarIcon-4.png";
import loactionIocn from "../../../assets/images/loactionIocn.png";

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
import Textarea from "@mui/joy/Textarea";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const ShiftCard = (props) => {
  const buttonRef = React.useRef(null);
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


  return (
    <div className="col-xl-6 col-md-12 col-12">
      <div className="card p-4">
        <div className="row">
          <div className="col-8">
            <h4 className="shiftDate">
              <img src={calenderIcon} alt="calenderIcon-icon" />
              Today, 26 April 2023
            </h4>
            <div className="row">
              <div className="col-xxl-5 col-lg-6 col-6">
                <div className="card meetngInfo">
                  <ul className="meetingInfoList">
                    <li>
                      Scheduled{" "}
                      <span className="meetingStatus green">Upcommig</span>
                    </li>
                    <li>Client 1</li>
                  </ul>
                </div>
              </div>
              <div className="col-xxl-5 col-lg-6 col-6">
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
              {/* Choose Option For Shift Section Start*/}
              {/* <Link to='/shift-detail-page'
                                         style={{ textDecoration: "none" }} > */}
              <Button
                id="Shift-button-btn"
                aria-controls={open ? "Shift-button" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                variant="contained"
                class="blue-btn-default btn-sm btn-outline-gray mt-2"
                disableElevation
                ref={buttonRef}
                onClick={() => {
                  props.setOpen(!props.open);
                }}
                endIcon={<KeyboardArrowDownIcon />}
              >
                {" "}
                View Detail
              </Button>
              {/* </Link> */}
              <Menu
                id="Shift-button"
                anchorEl={buttonRef.current}
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="Shift-button-btn"
                placement="bottom-end"
              >
                {" "}
                <MenuItem onClick={props.handleClose}>
                  <ListItemDecorator>
                    <VisibilityIcon />
                  </ListItemDecorator>{" "}
                  View
                </MenuItem>
                <MenuItem onClick={props.handleClose}>
                  <ListItemDecorator>
                    <Edit />
                  </ListItemDecorator>{" "}
                  Edit
                </MenuItem>
                <ListDivider />
                <MenuItem onClick={props.handleClose} variant="soft" color="danger">
                  <ListItemDecorator sx={{ color: "inherit" }}>
                    <DeleteForever />
                  </ListItemDecorator>{" "}
                  Delete
                </MenuItem>
              </Menu>
              <button
                type="button"
                class="blue-btn-default btn-sm btn-outline-gray mt-2"
              >
                <img src={loactionIocn} alt="loaction-Iocn" />
                Get Directions
              </button>
            </div>
          </div>
          <div className="col-4">
            <div class="card meetngInfo h-100 justify-content-center align-items-center">
              <div className="totalTime">03:30 hrs</div>
              <div class="btn-box d-flex shiftBtnBox">
                <button
                  type="button"
                  class="blue-btn-default btn-sm mt-2"
                  onClick={() => props.handleOpenModal(props.index)}
                >
                  Clock In
                </button>

                <Modal
                  open={props.openModal}
                  onClose={props.handleCloseModal}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                    >
                      Text in a modal
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      Duis mollis, est non commodo luctus, nisi erat porttitor
                      ligula.
                    </Typography>
                  </Box>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShiftCard;
