import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import { Dashboard } from "./pages/Dashboard";
// import Clients from "./pages/listing/Clients";
// import AddClients from "./pages/AddEdit/AddEditClient";

import RequireAuth from "./pages/RequireAuth";
import React, { useState } from "react";

import Appp from "./Appp";
import { Link } from "react-router-dom";

import {} from "react-bootstrap";
import Navapp from "./pages/Navapp";
import NavappGreen from "./pages/NavappGreen";
import Footer from "./pages/Footer";
import LoginPageAudit from "./pages/LoginPageAudit";
import ForgetPageAudit from "./pages/ForgetPageAudit";
import { useNavigate, useLocation } from "react-router-dom";
// import AuditPlanningMemorandum from "./pages/Greenpages/AuditPlanningMemorandum";

// import { Sidebar } from "react-pro-sidebar";

function App(props) {
  const [mode, setMode] = useState("");
  const [showAdditionalHeader, setShowAdditionalHeader] = useState(false);

  console.log(showAdditionalHeader, "showAdditionalHeader");

  const location = useLocation();
  const handleButtonClick = () => {
    setShowAdditionalHeader(true);
  };

  const isLoginPage = location.pathname === "/login";
  const isLoginPageforget = location.pathname === "/forget_password";

  // const isDashboardPage = location.pathname === "/dashboard";
  console.log(isLoginPage, "isLoginPage");
  // console.log(isDashboardPage,"isDashboardPage")

  return (
    <>
      {/* <Routes>
           <Route path="/login" element={<LoginPageAudit/>} />
           <Route path="/forget_password" element={<ForgetPageAudit />} />
        </Routes> */}

      {showAdditionalHeader && !isLoginPage && !isLoginPageforget && (
        <NavappGreen />
      )}
      {!showAdditionalHeader && !isLoginPage && !isLoginPageforget ? (
        <>
          <Navapp />

          <button onClick={handleButtonClick}>
            {/* <Link to={"/audit_plannning_memorandam"}>Show Green Header</Link> */}
            <RequireAuth>
              <Route
                path="/audit_planning_memorandum"
                element={
                  <div>
                    <NavappGreen />
                    {/* <AuditPlanningMemorandum /> */}
                  </div>
                }
              />
            </RequireAuth>
          </button>
        </>
      ) : (
        <Routes>
          <Route path="/login" element={<LoginPageAudit />} />
          <Route path="/forget_password" element={<ForgetPageAudit />} />
        </Routes>
      )}
      {/* Render the Navapp component here when showAdditionalHeader is true */}
      {/* {showAdditionalHeader && isLoginPage && <Navapp />} */}
      {/* <Footer/>
       */}
      {/* <App2/> */}
      {/* {(mode== <Navapp/>)?<Navapp/>: <App2/>} */}

      <Routes>
        {/* Unprotected Routes */}
        {/* <Route path="/" element={<LoginPage />} /> */}

        {/* <Route path="" element={< />} /> */}

        {/* Protected Routes */}

        {/* <Route path="/app" element={<Appp />} /> */}
        {/* <Route element={<RequireAuth />}> */}
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}

        {/* <Route path="/assignment" element={<Assigments />} />
          <Route path="/assignment/add" element={<AddAssignment />} />
          <Route path="/assignment/edit/:id" element={<AddAssignment />} /> */}

        {/* <Route path="/clients" element={<Clients />} />
          <Route path="/clients/add" element={<AddClients />} />
          <Route path="/clients/edit/:id" element={<AddClients />} /> */}

        {/* <Route path="/milestone" element={<Milestone />} />
          <Route path="/milestone/add" element={<AddMilestone />} />
          <Route path="/milestone/edit/:id" element={<AddMilestone />} /> */}

        {/* <Route path="/plans" element={<Plans />} />
          <Route path="/plans/add" element={<AddEditPlan />} />
          <Route path="/plans/edit/:id" element={<AddEditPlan />} /> */}

        {/* <Route path="/user" element={<User/>} />
          <Route path="/user/add" element={<AddEditUser/>} /> */}

        {/* </Route> */}
      </Routes>
    </>
  );
}

export default App;

// import { Routes, Route } from "react-router-dom";
// import LoginPage from "./pages/LoginPage";
// import { Dashboard } from "./pages/Dashboard";
// // import Clients from "./pages/listing/Clients";
// // import AddClients from "./pages/AddEdit/AddEditClient";

// import RequireAuth from "./pages/RequireAuth";
// import React, { useState } from "react";

// import Appp from "./Appp";
// import { Link } from "react-router-dom";

// import {} from "react-bootstrap";
// import Navapp from "./pages/Navapp";
// import NavappGreen from "./pages/NavappGreen";
// import Footer from "./pages/Footer";
// import LoginPageAudit from "./pages/LoginPageAudit";
// import ForgetPageAudit from "./pages/ForgetPageAudit";
// import { useNavigate, useLocation } from "react-router-dom";

// const App = () => {
//   // const showAdditionalHeader = true; // Replace with your logic
//   // const isLoginPage = false; // Replace with your logic
//   // const isLoginPageforget = false; // Replace with your logic
//   const [showAdditionalHeader, setShowAdditionalHeader] = useState(false);
//   console.log(showAdditionalHeader, "dfbdfb");
//   const handleButtonClick = () => {
//     // Handle button click logic
//     setShowAdditionalHeader(true);

//   };
//   const location = useLocation();

//   const isLoginPage = location.pathname === "/login";
//   const isLoginPageforget = location.pathname === "/forget_password";

//   return (
//     <>
//       <Routes>
//         <Route path="/login" element={<LoginPageAudit />} />
//         <Route path="/forget_password" element={<ForgetPageAudit />} />
//       </Routes>

//       <RequireAuth>
//         {showAdditionalHeader ? (
//           <NavappGreen />
//         ) : (
//           <>
//             <Navapp />

//             <button onClick={handleButtonClick}>
//               <Link to={"/audit_plannning_memorandam"}>Show Green Header</Link>
//             </button>
//           </>
//         )}
//       </RequireAuth>
//     </>
//   );
// };

// export default App;
