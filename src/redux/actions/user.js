import Swal from 'sweetalert2'
import { apiDelete, apiGet, apiPost } from "../../api/apiUtils";
import {
    FORGET_ERROR,
    FORGET_SUCCESS,
    LOGIN_ERROR,
    LOGIN_SUCCESS,
    RESET_ERROR,
    RESET_SUCCESS,
    CLIENT_SUCCESS,
    CLIENT_ERROR,
    CREATE_CLIENT_SUCCESS,
    CREATE_CLIENT_ERROR,
    EDIT_CLIENT_SUCCESS,
    EDIT_CLIENT_ERROR,
    GENDER_SUCCESS,
    GENDER_ERROR,
    DELETE_ITEM_SUCCESS,
    DELETE_ITEM_FAILURE,

    EMPLOYEE_SUCCESS,
  EMPLOYEE_ERROR,
  CREATE_EMPLOYEE_SUCCESS,
  CREATE_EMPLOYEE_ERROR,
  DELETE_EMPLOYEE_ERROR,
  DELETE_EMPLOYEE_SUCCESS,


} from "./types";

const deleteItemSuccess = (itemId) => ({
    type: DELETE_ITEM_SUCCESS,
    payload: itemId,
});

const deleteItemFailure = (error) => ({
    type: DELETE_ITEM_FAILURE,
    payload: error,
});

const deleteEmployeeSuccess = (itemId) => ({
    type: DELETE_EMPLOYEE_SUCCESS,
    payload: itemId,
  });
  
  const deleteEmployeeFailure = (error) => ({
    type: DELETE_EMPLOYEE_ERROR,
    payload: error,
  });
  export const deleteItems = (itemId) => (dispatch) => {
    return apiDelete("deleteEmployeeManagmentList", itemId)
      .then(() => {
        dispatch(deleteEmployeeSuccess(itemId));
      })
      .catch((error) => {
        dispatch(deleteEmployeeFailure(error.message));
      });
  };

  export const employeeAction = () => (dispatch) => {
    let token = localStorage.getItem("BackToBasic-token");
    console.log(1);
    return apiGet("employeeManagment", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => {
        if (response.status === 200) {
          dispatch({ type: EMPLOYEE_SUCCESS, payload: response.data });
          console.log("action res...", response.data);
          return response;
        } else {
          dispatch({
            type: EMPLOYEE_ERROR,
            payload: { responsefailedMessage: response.data.error },
          });
          return;
        }
      })
      .catch((err) => {
        dispatch({
          type: LOGIN_ERROR,
          payload: { errorMessage: "Something Went Wrong" },
        });
        Swal.fire({
          icon: "warning",
          timer: 2500,
          //text: `${err.response.data.message}`,
          showConfirmButton: false,
        });
        //alert(err.response.data.message)
  
        return err;
      });
  };

  export const createEmployeeAction = (payload) => (dispatch) => {
    return apiPost("createEmployee", payload)
      .then((response) => {
        if (response.status === 200) {
          dispatch({ type: CREATE_EMPLOYEE_SUCCESS, payload: response.data });
          localStorage.setItem(
            "BackToBasic-token",
            response.data.response.accessToken
          );
          return response;
        } else {
          dispatch({
            type: CREATE_EMPLOYEE_ERROR,
            payload: { responsefailedMessage: response.data.error },
          });
          return;
        }
      })
      .catch((err) => {
        dispatch({
          type: LOGIN_ERROR,
          payload: { errorMessage: "Something Went Wrong" },
        });
        Swal.fire({
          icon: "warning",
          timer: 2500,
          text: `${err.response.data.message}`,
          showConfirmButton: false,
        });
        // alert(err.response.data.message)
  
        return err;
      });
  };
  
  export const deleteEmployeeAction = (payload) => (dispatch) => {
    return apiPost("deleteEmployee", payload)
      .then((response) => {
        if (response.status === 200) {
          dispatch({ type: DELETE_EMPLOYEE_SUCCESS, payload: response.data });
          localStorage.setItem(
            "BackToBasic-token",
            response.data.response.accessToken
          );
          return response;
        } else {
          dispatch({
            type: DELETE_EMPLOYEE_ERROR,
            payload: { responsefailedMessage: response.data.error },
          });
          return;
        }
      })
      .catch((err) => {
        dispatch({
          type: LOGIN_ERROR,
          payload: { errorMessage: "Something Went Wrong" },
        });
        Swal.fire({
          icon: "warning",
          timer: 2500,
          text: `${err.response.data.message}`,
          showConfirmButton: false,
        });
        // alert(err.response.data.message)
  
        return err;
      });
  };
  
  

// export const deleteItem = (itemId) => (dispatch) => {
//     return apiDelete("deleteEmployeeManagmentList", itemId)
//       .then(() => {
//         dispatch(deleteItemSuccess(itemId));
//       })
//       .catch((error) => {
//         dispatch(deleteItemFailure(error.message));
//       });
//   };

export const loginAction = (payload) => (dispatch) => {
    return apiPost("login", payload)
        .then((response) => {
            if (response.status === 200) {
                dispatch({ type: LOGIN_SUCCESS, payload: response.data });
                localStorage.setItem("BackToBasic-token", response.data.response.accessToken)
                return response;
            } else {
                dispatch({ type: LOGIN_ERROR, payload: { responsefailedMessage: response.data.error } });
                return;
            }
        })
        .catch((err) => {
            dispatch({ type: LOGIN_ERROR, payload: { errorMessage: "Something Went Wrong" } });
            Swal.fire({
                icon: 'warning',
                timer: 1500,
                text: `${err.response.data.message}`,
                showConfirmButton: false
            })
            // alert(err.response.data.message)

            return err;
        });
};


export const forgetAction = (payload) => (dispatch) => {
    return apiPost("forget", payload)
        .then((response) => {
            if (response.status === 200) {
                dispatch({ type: FORGET_SUCCESS, payload: response.data });
                return response;
            } else {
                dispatch({ type: FORGET_ERROR, payload: { responsefailedMessage: response.data.error } });
                return;
            }
        })
        .catch((err) => {
            dispatch({ type: FORGET_ERROR, payload: { errorMessage: "Something Went Wrong" } });
            Swal.fire({
                icon: 'warning',
                timer: 2500,
                text: `${err.response.data.message}`,
                showConfirmButton: false
            })
            // alert(err.response.data.message)

            return err;
        });
};

export const resetAction = (payload) => (dispatch) => {
    return apiPost("resetPassword", payload)
        .then((response) => {
            if (response.status === 200) {
                dispatch({ type: RESET_SUCCESS, payload: response.data });
                localStorage.setItem("BackToBasic-token", response.data.response.accessToken)
                return response;
            } else {
                dispatch({ type: RESET_ERROR, payload: { responsefailedMessage: response.data.error } });
                return;
            }
        })
        .catch((err) => {
            dispatch({ type: RESET_ERROR, payload: { errorMessage: "Something Went Wrong" } });
            Swal.fire({
                icon: 'warning',
                timer: 2500,
                text: `${err.response.data.message}`,
                showConfirmButton: false
            })
            //alert(err.response.data.message)

            return err;
        });
};


export const clientAction = () => async (dispatch) => {

    let token = localStorage.getItem("BackToBasic-token");

    return await apiGet("clientManagment", {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*",
        }
    })
        .then((response) => {
            if (response.status === 200) {
                dispatch({ type: CLIENT_SUCCESS, payload: response.data });
                return response;
            } else {
                dispatch({ type: CLIENT_ERROR, payload: { responsefailedMessage: response.data.error } });
                return;
            }
        })
        .catch((err) => {
            dispatch({ type: CLIENT_ERROR, payload: { errorMessage: "Something Went Wrong" } });
            Swal.fire({
                icon: 'warning',
                timer: 2500,
                //text: `${err.response.data.message}`,
                showConfirmButton: false
            })
            //alert(err.response.data.message)

            return err;
        });
};


export const createClientAction = (payload) => async (dispatch) => {
    console.log(payload)

    let token = localStorage.getItem("BackToBasic-token");
    console.log(token, "133");
    return apiPost("createClient", payload

    )
        .then((response) => {
            console.log(response, "user responce");
            if (response.status == 200) {
                dispatch({ type: CREATE_CLIENT_SUCCESS, payload: response });
                localStorage.setItem("BackToBasic-token", response.data.response.accessToken)
                return response;
            } else {
                dispatch({ type: CREATE_CLIENT_ERROR, payload: response });
                return;
            }
        })
        .catch((err) => {
            dispatch({ type: CREATE_CLIENT_ERROR, payload: err });
            Swal.fire({
                icon: 'warning',
                timer: 2500,
                text: `${err.response.data.message}`,
                showConfirmButton: false
            })
            // alert(err.response.data.message)


        });
};

export const deleteItem = (itemId) => (dispatch) => {
    return apiDelete("deleteEmployeeManagmentList", itemId)
        .then(() => {
            dispatch(deleteItemSuccess(itemId));
        })
        .catch((error) => {
            dispatch(deleteItemFailure(error.message));
        });
}


// export const employeeAction = () => (dispatch) => {

//     let token = localStorage.getItem("BackToBasic-token");

//     return apiGet("employeeManagment", {
//         headers: {
//             "Authorization": `Bearer ${token}`,
//             "Access-Control-Allow-Origin": "*",
//         }
//     })
//         .then((response) => {
//             if (response.status === 200) {
//                 dispatch({ type: EMPLOYEE_SUCCESS, payload: response.data });
//                 console.log(response.data)
//                 return response;
//             } else {
//                 dispatch({ type: EMPLOYEE_ERROR, payload: { responsefailedMessage: response.data.error } });
//                 return;
//             }
//         })
//         .catch((err) => {
//             dispatch({ type: LOGIN_ERROR, payload: { errorMessage: "Something Went Wrong" } });
//             Swal.fire({
//                 icon: 'warning',
//                 timer: 2500,
//                 //text: `${err.response.data.message}`,
//                 showConfirmButton: false
//             })
//             //alert(err.response.data.message)

//             return err;
//         });
// };

export const editClientAction = () => async (dispatch) => {

    let token = localStorage.getItem("BackToBasic-token");

    return await apiGet("editClientManagment", {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*",
        }
    })
        .then((response) => {
            if (response.status === 200) {
                dispatch({ type: EDIT_CLIENT_SUCCESS, payload: response.data });
                return response;
            } else {
                dispatch({ type: EDIT_CLIENT_ERROR, payload: { responsefailedMessage: response.data.error } });
                return;
            }
        })
        .catch((err) => {
            dispatch({ type: EDIT_CLIENT_ERROR, payload: { errorMessage: "Something Went Wrong" } });
            Swal.fire({
                icon: 'warning',
                timer: 2500,
                //text: `${err.response.data.message}`,
                showConfirmButton: false
            })
            //alert(err.response.data.message)

            return err;
        });
};



export const genderAction = () => async (dispatch) => {


    return await apiGet("selectGender",

    )
        .then((response) => {
            if (response.status === 200) {
                dispatch({ type: GENDER_SUCCESS, payload: response.data });
                return response;
            } else {
                dispatch({ type: GENDER_ERROR, payload: { responsefailedMessage: response.data.error } });
                return;
            }
        })
        .catch((err) => {
            dispatch({ type: GENDER_ERROR, payload: { errorMessage: "Something Went Wrong" } });
            Swal.fire({
                icon: 'warning',
                timer: 2500,
                showConfirmButton: false
            })


            return err;
        });
};


