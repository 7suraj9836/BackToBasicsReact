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
    DELETE_ITEM_SUCCESS,
    DELETE_ITEM_FAILURE,

    DELETE_EMPLOYEE_ERROR,
    DELETE_EMPLOYEE_SUCCESS,
    EMPLOYEE_SUCCESS
} from "../actions/types";

const initialState = {
    userData: {}
};

const userReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case LOGIN_SUCCESS: {
            return {
                ...state,
                successMessage: payload.message,
                token: payload.response.accessToken,
                isAuth: true,
                phoneData: payload.phoneData
            };
        }
        case LOGIN_ERROR: {
            return {
                ...state,
                responsefailedMessage: payload.responsefailedMessage,
                errorMessage: payload.errorMessage,
                isAuth: false,
            };
        }
        case FORGET_SUCCESS: {
            return {
                ...state,
                successMessage: payload.message,
                isAuth: false,
                phoneData: payload.phoneData
            };
        }
        case FORGET_ERROR: {
            return {
                ...state,
                responsefailedMessage: payload.responsefailedMessage,
                errorMessage: payload.errorMessage,
                isAuth: false,
            };
        }

        case RESET_SUCCESS: {
            return {
                ...state,
                successMessage: payload.message,
                token: payload.response.accessToken,
                isAuth: true,
                phoneData: payload.phoneData
            };
        }
        case RESET_ERROR: {
            return {
                ...state,
                responsefailedMessage: payload.responsefailedMessage,
                errorMessage: payload.errorMessage,
                isAuth: false,
            };
        }


        case CLIENT_SUCCESS: {
            return {
                ...state,
                successMessage: payload.message,
                isAuth: true,

            };
        }
        case CLIENT_ERROR: {
            return {
                ...state,
                responsefailedMessage: payload.responsefailedMessage,
                errorMessage: payload.errorMessage,
                isAuth: false,
            };
        }
        case CREATE_CLIENT_SUCCESS: {
            return {
                ...state,
                successMessage: payload.message,
                token: payload.response.accessToken,
                isAuth: true,
            };
        }
        case CREATE_CLIENT_ERROR: {
            return {
                ...state,
                responsefailedMessage: payload.responsefailedMessage,
                errorMessage: payload.errorMessage,
                isAuth: false,
            };
        }

        case EDIT_CLIENT_SUCCESS: {
            return {
                ...state,
                successMessage: payload.message,
                token: payload.response.accessToken,
                isAuth: true,
            };
        }
        case EDIT_CLIENT_ERROR: {
            return {
                ...state,
                responsefailedMessage: payload.responsefailedMessage,
                errorMessage: payload.errorMessage,
                isAuth: false,
            };
        }


        case DELETE_ITEM_SUCCESS:
            return {
                ...state,
                items: state.items.filter((item) => item.id !== payload),
                loading: false,
                error: null,
            };
        case DELETE_ITEM_FAILURE:
            return {
                ...state,
                loading: false,
                error: payload,
            };

            case EMPLOYEE_SUCCESS: {
                return {
                    ...state,
                    successMessage: payload.message,
                    isAuth: true,
                };
            }
            case DELETE_EMPLOYEE_SUCCESS:
                return {
                    ...state,
                    items: state.items.filter((item) => item.id !== payload),
                    loading: false,
                    error: null,
                };
            case DELETE_EMPLOYEE_ERROR:
                return {
                    ...state,
                    loading: false,
                    error: payload,
                };    


        default:
            return state;
    }
};

export default userReducer;
