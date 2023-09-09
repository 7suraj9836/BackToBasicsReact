// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import PrivateRoute from "./private.route.jsx";
// import PublicRoute from "./public.route.jsx";
// import RoutesConfig from "./route.config.jsx";

// const NotFound = () => {
//   return (
//     <div className="not-found">
//       <h4>Page Not Found</h4>
//     </div>
//   );
// };

// const AppRoutes = (props) => {
//   return (
//     <Routes>
//       {(RoutesConfig || []).map((routeProps) => {
//         if (routeProps.protected) {
//           return (
//             <Route key={routeProps.path} element={<PrivateRoute />}>
//               <Route {...routeProps} />
//             </Route>
//           );
//         } else {
//           return (
//             <Route key={routeProps.path} element={<PublicRoute />}>
//               <Route {...routeProps} />
//             </Route>
//           );
//         }
//       })}
//       <Route element={NotFound} />
//     </Routes>
//   );
// };

// export default AppRoutes;

import React from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./private.route.jsx";
import PublicRoute from "./public.route.jsx";
import RoutesConfig from "./route.config";
// import NotFound from "./NotFound";

const AppRoutes = () => {
  return (
    <Routes>
      {RoutesConfig.map((routeProps) => (
        <Route
          key={routeProps.path}
          element={routeProps.protected ? <PrivateRoute /> : <PublicRoute />}
        >
          <Route {...routeProps} />
        </Route>
      ))}
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
};

export default AppRoutes;
