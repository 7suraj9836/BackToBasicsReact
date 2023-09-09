import Login from "../pages/Admin/Login/Login.jsx";
import ForgotPassword from "../pages/Admin/Login/ForgotPassword.jsx";
import ResetPage from "../pages/Admin/Login/Reset.jsx";
import PhoneLogin from "../pages/Admin/Login/PhoneLogin.jsx";
import OtpLogin from "../pages/Admin/Login/OtpLogin.jsx";
import CareGiverLogin from "../pages/CareGiver/Login/LoginPage.jsx";
import CareGiverForGotPassword from "../pages/CareGiver/Login/ForgotPassword.jsx";
import CareGiverResetPassword from "../pages/CareGiver/Login/Reset.jsx";
import CareGiverPhoneLogin from "../pages/CareGiver/Login/PhoneLogin.jsx";
import CareGiverOtpLogin from "../pages/CareGiver/Login/OtpLogin.jsx";

// login page File Path End

// DashBoard File Path Start

// 1:-Admin page File Path
import ClientManagment from "../pages/Admin/ClientManagment/clientManagment.js";
import ReportManagment from "../pages/Admin/ReportManagment/reportManagment.js";
import AddEditClientInformation from "../pages/Admin/ClientManagment/AddEditClientInformation.js";
import DasbordPage from "../pages/Admin/Dashboard/Dashboard.js";
import EmployeeManagement from "../pages/Admin/EmployeeManagement/employeeManagement.js";
import AddEditEmployeeManagement from "../pages/Admin/EmployeeManagement/AddEditEmployeeInformation.js";
import EditClient from "../pages/Admin/ClientManagment/editClient.js";
import ViewClient from "../pages/Admin/ClientManagment/viewClient.js";
import ViewEmployee from "../pages/Admin/EmployeeManagement/viewEmployee.js";
import EditEmployee from "../pages/Admin/EmployeeManagement/editEmployee.js";
import AddEditEmployeeInformation from "../pages/Admin/EmployeeManagement/AddEditEmployeeInformation.js";
import SubAdminManagement from "../pages/Admin/SubAdminManagement/subAdminManagement.js";
import AddEditSubAdminInformation from "../pages/Admin/SubAdminManagement/AddEditSubAdminInformation.js";
import ViewSubAdmin from "../pages/Admin/SubAdminManagement/ViewSubAdmin.js";
import EditSubAdmin from "../pages/Admin/SubAdminManagement/editSubAdmin.js";
import SupervisorManagement from "../pages/Admin/SupervisorManagement/SupervisorManagement.js";
import AddEditSupervisorInformation from "../pages/Admin/SupervisorManagement/AddEditSupervisorInformation.js";
import ViewSupervisor from "../pages/Admin/SupervisorManagement/ViewSupervisor.js"
import EditSupervisor from "../pages/Admin/SupervisorManagement/EditSupervisor.js";
import RolesAndAccess from "../pages/Admin/RolesAndAccess/RolesAndAccess.js";
import ViewRoleAccess from "../pages/Admin/RolesAndAccess/ViewRoleAccess.js"
import AddEditRoleAccessInformation from "../pages/Admin/RolesAndAccess/AddEditRoleAccessInformation.js";
// import Calendar from "../pages/CareGiver/Calender/calender.js";
// import BigCalender from "../pages/CareGiver/Calender/BigCalender.js";
// import Reports from "../pages/CareGiver/Reports/Reports.js";
// import ReportModal from "../pages/CareGiver/Reports/ReportModal.js";
import ClientSchedule from "../pages/Admin/ClientSchedule/ClientSchedule.js"
import AddClientSchedule from "../pages/Admin/ClientSchedule/AddClientSchedule.js"
import ScheduleManagement from "../pages/Admin/ScheduleManagement/ScheduleManagement.js";
import AddScheduleManagement from "../pages/Admin/ScheduleManagement/AddScheduleManagement.js";
import ChangePassword from "../components/Header/ChangePassword.js";
// 2:-CareGiver page File Path
import MyCalenderPage from "../pages/CareGiver/MyCalendar/MyCalenderPage.js";
import MyReports from "../pages/CareGiver/Reports/MyReports.js";
import ViewYourShift from "../pages/CareGiver/Shifts/ViewYourShift.js";
import ViewAssignedClients from "../pages/CareGiver/Clients/ClientManagement.js";
import AssignedClientDetail from "../pages/CareGiver/Clients/AssignedClientDetail.js";
import ShiftDetailPage from "../pages/CareGiver/Shifts/ShiftDetailPage.js";
import IndividualTreatmentPlan from "../pages/Admin/IndividualTreatmentPlan/IndividualTreatmentPlan.js";
import AddEditIndividualTreatmentPlan from "../pages/Admin/IndividualTreatmentPlan/AddEditIndividualTreatmentPlan.js";
import EditIndividualTreatmentPlan from "../pages/Admin/IndividualTreatmentPlan/editIndividualTreatmentPlan.js"
import ClientViewDetail from "../pages/CareGiver/Clients/AssignedClientDetail.js";
import ViewIndividualTreatmentPlan from "../pages/Admin/IndividualTreatmentPlan/viewIndividualTreatmentPlan.js"
import EditRoleAccessInformation from "../pages/Admin/RolesAndAccess/EditRoleAccessInformation .js";
import AuthorizationManagement from "../pages/Admin/AuthorizationManagement/authorization-management.js";
import AddAuthorizationManagement from "../pages/Admin/AuthorizationManagement/add-authorization-management.js";
import EditAuthorizationManagement from "../pages/Admin/AuthorizationManagement/EditAuthorizationManagement.js"
import ViewAuthorizationManagement from "../pages/Admin/AuthorizationManagement/ViewAuthorizationManagement.js"
import MyProfilePage from "../pages/CareGiver/MyProfile/MyProfile.js";
// import EditAuthorizationManagement from "../pages/Admin/AuthorizationManagement/EditAuthorizationManagement.js"
// import ViewAuthorizationManagement from "../pages/Admin/AuthorizationManagement/ViewAuthorizationManagement.js"
import LoginPage from "../pages/CareGiver/Login/LoginPage.jsx";
import EmployeeAvailability from "../pages/Admin/EmployeeAvailability/EmployeeAvailability.js";
import AddEmployeeAvailability from "../pages/Admin/EmployeeAvailability/AddEmployeeAvailability.js";
import EditClientSchedule from "../pages/Admin/ClientSchedule/EditClientSchedule.js";
import EditEmployeeAvailability from "../pages/Admin/EmployeeAvailability/EditEmployeeAvailability.js";
import SelectTown from "../pages/Admin/Town/SelectTown.js";


// DashBoard File Path End

// login page Route Path Start
const routes = [
  // 1:-Admin Login Route Path Start
  {
    path: "/",
    title: "",
    exact: true,
    protected: false,
    element: <Login />,
  },
  {
    path: "/forgotPassword",
    title: "",
    exact: true,
    protected: false,
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password" + `/:userId/:resetKey`,
    title: "",
    exact: true,
    protected: false,
    element: <ResetPage />,
  },
  {
    path: "/phone-login",
    title: "phone-login",
    exact: true,
    protected: false,
    element: <PhoneLogin />,
  },
  {
    path: "/phone-otp",
    title: "phone-otp",
    exact: true,
    protected: false,
    element: <OtpLogin />,
  },
  {
    path: "/changePassword",
    title:"changePassword",
    exact: true,
    protected: true,
    element: <ChangePassword />
  },

  // 2:-CareGiver Login Route Path Start
  {
    path: "/CareGiver/Login",
    title: "",
    exact: true,
    protected: false,
    element: <CareGiverLogin/>,
  },
 {
    path: "/CareGiver/forgotPassword",
    title: "",
    exact: true,
    protected: false,
    element: <CareGiverForGotPassword />,
  },
  {
    path: "/CareGiver/reset-password" + `/:userId/:resetKey`,
    title: "",
    exact: true,
    protected: false,
    element: <CareGiverResetPassword />,
  },
  {
    path: "/CareGiver/phone-login",
    title: "phone-login",
    exact: true,
    protected: false,
    element: <CareGiverPhoneLogin />,
  },
  {
    path: "/CareGiver/phone-otp",
    title: "phone-otp",
    exact: true,
    protected: false,
    element: <CareGiverOtpLogin />,
  },

  // 3:-Admin Page File Path Start
  {
    path: "/dashboard",
    title: "dashboard",
    exact: true,
    protected: true,
    element: <DasbordPage />,
  },
  {
    path: "/client-management",
    title: "client-management",
    exact: true,
    protected: true,
    element: <ClientManagment />,
  },
  {
    path: "/add-edit-information",
    title: "Add-Edit-Client-Information",
    exact: true,
    protected: true,
    element: <AddEditClientInformation />,
  },
  {
    path: "/edit-Client/:id",
    title: "Add-Edit-Client-Information",
    exact: true,
    protected: true,
    element: <EditClient />,
  },
  {
    path: "/view-Client/:id",
    title: "Add-Edit-Client-Information",
    exact: true,
    protected: true,
    element: <ViewClient />,
  },
  {
    path: "/employee-management",
    title: "employeeManagement",
    exact: true,
    protected: true,
    element: <EmployeeManagement />,
  },
  {
    path: "/employee-management-addEdit",
    title: "employee-management-addEdit",
    exact: true,
    protected: true,
    element: <AddEditEmployeeManagement />,
  },

    {
    path: "/addemployeeinformation",
    title: "Add-Edit-Employee-Information",
    exact: true,
    protected: true,
    element: <AddEditEmployeeInformation/>,
  },
  {
    path: "/view-Employee/:id",
    title: "Add-Edit-Employee-Information",
    exact: true,
    protected: true,
    element: <ViewEmployee />,
  },
  {
    path: "/edit-Employee/:id",
    title: "Add-Edit-Employee-Information",
    exact: true,
    protected: true,
    element: <EditEmployee/>,
  },

  {
    path: "/subAdmin-management",
    title: "subAdminManagement",
    exact: true,
    protected: true,
    element: <SubAdminManagement/>,
  },
  {
    path: "/add-edit-subadmin-information",
    title: "Add-Edit-SubAdmin-Information",
    exact: true,
    protected: true,
    element: <AddEditSubAdminInformation />,
  },
  {
    path: "/view-SubAdmin/:id",
    title: "viewSubAdmin",
    exact: true,
    protected: true,
    element: <ViewSubAdmin />,
  },
  {
    path: "/edit-SubAdmin/:id",
    title: "Edit-SubAdmin-Information",
    exact: true,
    protected: true,
    element: <EditSubAdmin/>,
  },
  {
    path: "/supervisor-management",
    title: "supervisorManagement",
    exact: true,
    protected: true,
    element: <SupervisorManagement/>,
  },

  {
    path: "/add-edit-SupervisorInformation",
    title: "Add-Edit-Supervisor-Information",
    exact: true,
    protected: true,
    element: <AddEditSupervisorInformation/>,
  },
  {
    path: "/view-Supervisor/:id",
    title: "viewSupervisor",
    exact: true,
    protected: true,
    element: <ViewSupervisor />,
  },
  {
    path: "/edit-Supervisor/:id",
    title: "Add-Edit-Supervisor-Information",
    exact: true,
    protected: true,
    element: <EditSupervisor/>,
  },
  {
    path: "/roles-and-access",
    title: "rolesAndAccess",
    exact: true,
    protected: true,
    element: <RolesAndAccess/>,
  },
  {
    path: "/add-edit-RoleAccessInformation",
    title: "Add-Edit-RoleAccess-Information",
    exact: true,
    protected: true,
    element: <AddEditRoleAccessInformation/>,
  },
  {
    path: "/edit-RoleAccessInformation/:id",
    title: "Edit-RoleAccess-Information",
    exact: true,
    protected: true,
    element: <EditRoleAccessInformation/>,
  },
  {
    path: "/view-RoleAccessInformation/:id",
    title: "view-RoleAccessInformation",
    exact: true,
    protected: true,
    element: <ViewRoleAccess/>,
  },
  {
    path: "/schedule-management",
    title: "schedule-management",
    exact: true,
    protected: true,
    element: <ScheduleManagement/>,
  },
  {
    path: "/schedule-management-add-edit-information",
    title: "schedule-management",
    exact: true,
    protected: true,
    element: <AddScheduleManagement/>,
  },
        {
    path: "/add-client-schedule",
    title: "client-schedule",
    exact: true,
    protected: true,
    element: <AddClientSchedule/>,
  },
    {
    path: "/client-schedule-management",
    title: "client-schedule",
    exact: true,
    protected: true,
    element: <ClientSchedule/>,
  },
      {
    path: "/edit-schedule/:id",
    title: "edit-schedule-management",
    exact: true,
    protected: true,
    element: <EditClientSchedule/>,
  },
         {
    path: "/add-employee-schedule",
    title: "employee-schedule",
    exact: true,
    protected: true,
    element: <EmployeeAvailability/>,
  },
    {
    path: "/add-new-employee-schedule",
    title: "employee-schedule",
    exact: true,
    protected: true,
    element: <AddEmployeeAvailability/>,
  },
    {
    path: "/edit-employee-schedule/:id",
    title: "edit-employee-schedule",
    exact: true,
    protected: true,
    element: <EditEmployeeAvailability />,
  },

  {
    path: "/individual-treatment-plan",
    title: "schedule-management",
    exact: true,
    protected: true,
    element: <IndividualTreatmentPlan/>,
  },
  {
    path: "/add-edit-individual-treatment-plan",
    title: "schedule-management",
    exact: true,
    protected: true,
    element: <AddEditIndividualTreatmentPlan/>,
  }, 
   {
    path: "/report-management",
    title: "reportmanagement",
    exact: true,
    protected: true,
    element: <ReportManagment />,
  },
   {
    path: "/authorization-management",
    title: "authorizationmanagement",
    exact: true,
    protected: true,
    element: <AuthorizationManagement />,
  },
   {
    path: "/add-authorization-management",
    title: "authorizationmanagement",
    exact: true,
    protected: true,
    element: <AddAuthorizationManagement />,
  },
  {
    path: "/edit-authorization-management/:id",
    title: "authorizationmanagement",
    exact: true,
    protected: true,
    element: <EditAuthorizationManagement />,
  },
  {
    path: "/view-authorization-management/:id",
    title: "authorizationmanagement",
    exact: true,
    protected: true,
    element: <ViewAuthorizationManagement />,
  },
  {
    path: "/add-town",
    title: "addTown",
    exact: true,
    protected: true,
    element: <SelectTown />,
  },

  // 4:-CareGiver Page File Path Start
  {
    path: "/my-calender",
    title: "my-calender",
    exact: true,
    protected: true,
    element: <MyCalenderPage />,
  },
  {
    path: "/my-reports",
    title: "my-reports",
    exact: true,
    protected: true,
    element: <MyReports />,
  },
  {
    path: "/view-your-shift",
    title: "view-your-shift",
    exact: true,
    protected: true,
    element: <ViewYourShift />,
  },
  {
    path: "/view-assigned-clients",
    title: "view-assigned-clients",
    exact: true,
    protected: true,
    element: <ViewAssignedClients />,
  },
  {
    path: "/assigned-client-detail",
    title: "assigned-client-detail",
    exact: true,
    protected: true,
    element: <AssignedClientDetail />,
  },
  {
    path: "/shift-detail-page",
    title: "shift-detail-page",
    exact: true,
    protected: true,
    element: <ShiftDetailPage />,
  },
  {
    path: "/client-view-detail",
    title: "shift-detail-page",
    exact: true,
    protected: true,
    element: <ClientViewDetail />,
  },

    {
    path: "/edit-Itp-Client/:id",
    title: "Add-Edit-ItP-Information",
    exact: true,
    protected: true,
    element: < EditIndividualTreatmentPlan />,
  },
  {
       path: "/view-Itp-Client/:id",
    title: "Add-View-ItP-Information",
    exact: true,
    protected: true,
    element: <ViewIndividualTreatmentPlan />,
  },
    {
    path: "/caregiver-calendar",
    title: "caregiver-calendar",
    exact: true,
    protected: true,
    element: <MyCalenderPage />,
  },
    {
    path: "/caregiver-my-profile",
    title: "caregiver-my-profile",
    exact: true,
    protected: true,
    element: <MyProfilePage />,
  },
  // {
  //   path: "/caregiver-login",
  //   title: "caregiver-login",
  //   exact: true,
  //   protected: true,
  //   element: <LoginPage />,
  // }

];
export default routes;

// login page Route Path End
