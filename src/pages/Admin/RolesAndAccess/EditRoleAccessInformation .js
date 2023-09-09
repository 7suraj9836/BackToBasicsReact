import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar/sidebar";
import Header from "../../../components/Header/header.js";
import "../../../components/Header/header.scss";
import "../Sidebar/sidebar.scss";
import {useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import apis from "../../../api/apis";
import { Modal, Box, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Button from "@mui/material/Button";
import CancelIcon from "@mui/icons-material/Cancel";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const EditRoleAccessInformation = (props) => {
  const [roleName, setRoleName] = useState("");
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("BackToBasic-token");
  const { id } = useParams();
    const [open, setOpen] = useState(false);
   const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [permission, setPermission]=useState([])

    const PermissionType = [
  { key: "can_add", label: "Create" },
  { key: "can_view", label: "View" },
  { key: "can_edit", label: "Edit" },
  { key: "can_delete", label: "Delete" },
];

const selectPermission = (permissionModuleId, permissionType, isChecked) => {
  setSelectedPermissions((prevSelectedPermissions) => {

    const updatedSelectedPermissions = [...prevSelectedPermissions];
    const permissionIndex = updatedSelectedPermissions.findIndex(
      (perm) => perm.module === permissionModuleId
    );
    if (permissionIndex !== -1) {
      updatedSelectedPermissions[permissionIndex][permissionType] = isChecked;
    } else {
      const newPermission = {
        module: permissionModuleId,
        can_add: false,
        can_view: false,
        can_edit: false,
        can_delete: false,
      };
      newPermission[permissionType] = isChecked;
      updatedSelectedPermissions.push(newPermission);
    }
    return updatedSelectedPermissions;
  });
};


useEffect(() => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  apis
    .get(`/RolesAndAccess/GetRolesAndAccess?id=${id}`, config)
    .then((res) => {
      const { name, permissions } = res.data.response;
      console.log(name,"dadgha")
      console.log(permissions,"sgdfjsgfjks");
      setRoleName(name);

      const permissionsMap = {};
      permissions.forEach((perm) => {
        permissionsMap[perm.module_id] = perm;
      });

      setSelectedPermissions(
        permission.map((module) => ({
          module: module.id,
          can_add: permissionsMap[module.id]?.can_add || false,
          can_view: permissionsMap[module.id]?.can_view || false,
          can_edit: permissionsMap[module.id]?.can_edit || false,
          can_delete: permissionsMap[module.id]?.can_delete || false,
        }))
      );

     
    })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        timer: 1500,
        text: `Something went wrong`,
        showConfirmButton: false,
      });
    });
}, [id, token,permission]);

   useEffect(() => {
   const config = {
     headers: {
       Authorization: `Bearer ${token}`,
     },
   };
   apis
     .get(
       `/Shared/GetAllModules`,
       config
     )
     .then((res) => {
 
           setPermission(
             res.data.response.map((module) => ({
               id: module.id,
               name: module.name,
             }))
           );
     });
 },[]);

useEffect(()=>{
  console.log(selectedPermissions);
},[selectedPermissions])


  const handleFormSubmit = () => {
    const payload = {
      id:parseInt(id,10), 
      name: roleName,
      permissions: selectedPermissions,
    };
    console.log(payload);

    const config = {
      headers: {
        authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "*",
      },
    };
    apis
      .post(`RolesAndAccess/SaveRolesAndAccess`, payload, config)
      .then((res) => {
        Swal.fire({
          icon: "success",
          timer: 1500,
          text: `Role updated successfully`,
          showConfirmButton: false,
        });
        navigate("/roles-and-access");
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          timer: 1500,
          text: `Something went wrong`,
          showConfirmButton: false,
        });
      });
  };
 const { maxWidth = "md", ...rest } = props;
 const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      <div className="container-fluid page-wrap">
        <div className="row height-100 d-flex">
          <Sidebar showSidebar={showSidebar} updateSidebar={() => setShowSidebar(!showSidebar)} />
          <div className="col main p-0">
            <Header
              title="Edit Role Access Information"
              updateSidebar={() => setShowSidebar(!showSidebar)}
            />
            <div className="container-fluid page-content-box p-lg-5 p-md-4 p-3">
              <div className="row">
                <div className="col">
                  <div className="card dashboardCard height-100">
                    <div className="card-body">
                      <div className="row">
                        <div className="col">
                          <div className="card login-section">
                            <form className="form-box">
                              <div className="row">
                                <div style={{ display: "flex" }}>
                                  <div className="form-box-inner col-lg-4 col-md-6 mb-3">
                                    <div className="input-box">
                                      <label className="form-label">Role Name</label>
                                      <input
                                        placeholder="Enter Role Name"
                                        type="text"
                                        value={roleName}
                                        onChange={(e) => {
                                          setRoleName(e.target.value);
                                        }}
                                      />
                                    </div>
                                  </div>
                                        <button
        style={{
          marginTop: 30,
          paddingLeft: 15,
          paddingRight: 15,
          paddingTop:12,
          marginLeft:10
        }}
        type="button"
        className="blue-btn-default"
        onClick={handleOpen}
      >
        Assign Permissions
      </button>

               </div>
                      </div>
                              <button
                                style={{
                                  marginTop: 15,
                                  paddingLeft: 50,
                                  paddingRight: 50,
                                }}
                                type="button"
                                className="blue-btn-default"
                                onClick={handleFormSubmit}
                              >
                                Submit
                              </button>
                              <button
                                style={{
                                  marginLeft: 225,
                                  marginTop: -48,
                                  paddingLeft: 50,
                                  paddingRight: 50,
                                }}
                                type="button"
                                className="blue-btn-default"
                                onClick={() => {
                                  navigate("/roles-and-access");
                                }}
                              >
                                Cancel
                              </button>
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
      </div>
      
      <div>
 <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        {...rest}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            overflowX: "hidden",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            borderRadius: 5,
            ...(isSmallScreen && {
              width: "100%",
              height: "80%",
              overflow: "auto",
            }),
            ...(!isSmallScreen && {
              maxWidth,
              maxHeight: "90%",
              overflow: "auto",
            }),
          }}
        >
          <Button
            style={{ position: "absolute", top: 10, right: 10 }}
            onClick={handleClose}
          >
            <CancelIcon />
          </Button>
          <h4>Permissions</h4>
          <TableContainer component={Paper}>
               <TableBody>
          {permission.map((ele) => (
            <TableRow key={ele.id}>
              <TableCell>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedPermissions.find((perm) => perm.module === ele.id)?.can_view || false}
                      onChange={(event) => {
                        selectPermission(ele.id, "can_view", event.target.checked);
                      }}
                    />
                  }
                  label={ele.name}
                />
                {PermissionType.map((type) => (
                  <FormControlLabel
                    key={type.key}
                    control={
                      <Checkbox
                        checked={selectedPermissions.find((perm) => perm.module === ele.id)?.[type.key] || false}
                        onChange={(event) => {
                          selectPermission(ele.id, type.key, event.target.checked);
                        }}
                      />
                    }
                    label={type.label}
                  />
                ))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
          </TableContainer>
          <button
            style={{
              marginTop: 15,
              paddingLeft: 50,
              paddingRight: 50,
            }}
            type="button"
            className="blue-btn-default"
            onClick={handleFormSubmit}
          >
            Submit
          </button>
        </Box>
      </Modal>
    </div>
    </>
  );
};
export default EditRoleAccessInformation
