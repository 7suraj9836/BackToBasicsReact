

export const apiConfig = "http://122.176.101.76:9000/api";

export const apiKeys = {
    register: "/user",
    login: "/Authentication/Login",
    forget: "/Authentication/ForgotPassword",
    resetPassword: "/Authentication/ResetPassword",
    clientManagment: "/Client/GetAllClients?pageNumber=1&pageSize=10",
    createClient: "/Client/SaveClient",
    employeeManagment: "/Employee/GetAllEmployees?pageNumber=1&pageSize=10",
    editclient: "/Client/GetClient?id=${id}",
    deleteClient: "/Client/DeleteClient?id=${id}",
    selectGender: "/Shared/GetAllGenders",
    deleteEmployeeManagmentList: "/Client/DeleteClient?id=",
    createEmployee:"/Employee/SaveEmployee",
    editEmployee:"/Employee/GetEmployee?id=${id}",
    getAllDocuments:"/Shared/GetAllDocumentTypes",
   
    // itp:"/IndividualTreatmentPlan/SaveIndividualTreatmentPlan",
    // getAllClient:"/Shared/GetAllClients"


}  