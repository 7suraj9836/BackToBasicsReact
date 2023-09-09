import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CancelIcon from "@mui/icons-material/Cancel";
import Swal from "sweetalert2";
import apis from "../../../api/apis";
import { Link, useNavigate } from "react-router-dom";
import { Modal, Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";


const ViewPermissionModal = (props) => {
    // ... (existing state and constants)
  
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const token = localStorage.getItem("BackToBasic-token");
    const [selectedPermissions, setSelectedPermissions] = useState(
      props.selectedPermissions || []
    );
    const navigate = useNavigate();
    console.log(props.selectedPermissions);
    console.log(props.id);
  
    const PermissionModule = [
      { module_id: 1, module: "Dashboard" },
      { module_id: 2, module: "ClientManagement" },
      { module_id: 3, module: "Employee Management" },
      { module_id: 4, module: "Schedule Management" },
      { module_id: 5, module: "Individual Treatment Plan" },
      { module_id: 6, module: "Supervisor Management" },
      { module_id: 7, module: "Sub Admin Management" },
      { module_id: 8, module: "Roles And Access" },
      { module_id: 9, module: "Report Management" },
    ];
  
    const PermissionType = [
      { key: "can_add", label: "Create" },
      { key: "can_view", label: "View" },
      { key: "can_edit", label: "Edit" },
      { key: "can_delete", label: "Delete" },
    ];
  
    // ... (existing code)
  
    const selectPermission = (permissionModuleId, permissionType, isChecked) => {
      setSelectedPermissions((prevSelectedPermissions) => {
        const updatedSelectedPermissions = [...prevSelectedPermissions];
        const permissionIndex = updatedSelectedPermissions.findIndex(
          (perm) => perm.module_id === permissionModuleId
        );
        if (permissionIndex !== -1) {
          updatedSelectedPermissions[permissionIndex][permissionType] = isChecked;
        } else {
          updatedSelectedPermissions.push({
            module_id: permissionModuleId,
            [permissionType]: isChecked,
            role_id:props.id
          });
        }
        return updatedSelectedPermissions;
      });
    };
  
    const handleFormSubmit = () => {
      const payload = {
        id: parseInt(props.id, 10) || props.id,
        name: props.roleName,
        permissions: selectedPermissions.map((perm) => ({
          id: perm.id || 0,
          role_id: perm.role_id || 0,
          module_id: perm.module_id || 0,
          can_add: perm.can_add || false,
          can_view: perm.can_view || false,
          can_edit: perm.can_edit || false,
          can_delete: perm.can_delete || false,
          can_export: perm.can_export || false,
          created_date: perm.created_date || new Date().toISOString(),
          created_by: perm.created_by || 0,
          modified_date: perm.modified_date || new Date().toISOString(),
          modified_by: perm.modified_by || 0,
        })),
      };
  
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
            text: `Role added successfully`,
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
  
    useEffect(() => {
      setSelectedPermissions(props.selectedPermissions || []);
    }, [props.selectedPermissions]);
    // ... (existing code)
  
    return (
      <div>
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
          View Permissions
        </button>
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
                {PermissionModule.map((ele) => (
                  <TableRow key={ele.module_id}>
                    <TableCell>
                      <FormControlLabel
                        control={
                          <Checkbox
                          disabled
                            checked={
                              selectedPermissions.find(
                                (perm) =>
                                  perm.module_id === ele.module_id &&
                                  perm.can_view
                              ) || false
                            }
                            onChange={(event) => {
                              selectPermission(
                                ele.module_id,
                                "can_view",
                                event.target.checked
                              );
                            }}
                          />
                        }
                        sx={{ width: 200, color: "success.main" }}
                        label={ele.module}
                      />
                      {PermissionType.map((type) => (
                        <FormControlLabel
                          key={parseInt(type.key)}
                          control={
                            <Checkbox
                            disabled
                              checked={
                                selectedPermissions.find(
                                  (perm) =>
                                    perm.module_id === ele.module_id &&
                                    perm[type.key]
                                )
                                  ? selectedPermissions.find(
                                      (perm) =>
                                        perm.module_id === ele.module_id &&
                                        perm[type.key]
                                    )[type.key]
                                  : false
                              }
                              onChange={(event) => {
                                selectPermission(
                                  ele.module_id,
                                  type.key,
                                  event.target.checked
                                );
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
            {/* <button
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
            </button> */}
          </Box>
        </Modal>
      </div>
    );
  }

export default ViewPermissionModal
