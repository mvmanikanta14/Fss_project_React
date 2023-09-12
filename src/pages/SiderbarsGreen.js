// import React from "react";

// import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { Tooltip as ReactTooltip } from "react-tooltip";

// import RequireAuth from "./RequireAuth";
// const SidebarsGreen = () => {
//   return (
//     <>
//       <section>
//         <div className="left-navigation-green">
//           <div className="p-t-10">
//             <ul className="mcd-menu">
//               <li>
//                 {" "}
//                 <Link id="app-title" to={"/audit_plannning_memorandam"}>
//                   <img
//                     src="https://old.anyaudit.co.in/img/menu_icons/audit_plan.png"
//                     class="menu_icon"
//                   />
//                 </Link>
//               </li>

//               <li>
//                 <Link id="acceptance-initiations" to={"/clients"}>
//                   {" "}
//                   <img
//                     src="https://old.anyaudit.co.in/img/menu_icons/ledger_scrutiny.png"
//                     class="menu_icon"
//                   />
//                 </Link>
//               </li>
//               <li>
//                 <Link id="data-collections" to={"/data_collections"}>
//                   <img
//                     src="https://old.anyaudit.co.in/img/menu_icons/data_collection.png"
//                     class="menu_icon"
//                   />
//                 </Link>
//               </li>
//               <li>
//                 <Link id="automated-ledger" to={"/assignment"}>
//                   <img
//                     src="https://old.anyaudit.co.in/img/menu_icons/ledger_scrutiny.png"
//                     class="menu_icon"
//                   />
//                 </Link>
//               </li>
//               <li>
//                 <Link id="process-audit" to={"/process_audit_tools"}>
//                   {" "}
//                   <img
//                     src="https://old.anyaudit.co.in/img/menu_icons/workflow_agreement.png"
//                     class="menu_icon"
//                   />
//                 </Link>
//               </li>
//               <li>
//                 {" "}
//                 <Link id="ffs" to={"/analytical_review"}>
//                   <img
//                     src="https://old.anyaudit.co.in/img/menu_icons/fss.png"
//                     class="menu_icon"
//                   />
//                 </Link>
//               </li>
//               <li>
//                 {" "}
//                 <Link id="lead-sheet" to={"/audit_lead_sheet"}>
//                   <img
//                     src="https://old.anyaudit.co.in/img/menu_icons/fss.png"
//                     class="menu_icon"
//                   />
//                 </Link>
//               </li>

//               <li>
//                 {" "}
//                 <Link id="sub-test" to={"/substantive_testing"}>
//                   <img
//                     src="https://old.anyaudit.co.in/img/menu_icons/s_testing.png"
//                     class="menu_icon"
//                   />
//                 </Link>
//               </li>
//               <li>
//                 {" "}
//                 <Link id="findings" to={"/audit_findings"}>
//                   <img
//                     src="https://old.anyaudit.co.in/img/menu_icons/reports.png"
//                     class="menu_icon"
//                   />{" "}
//                 </Link>
//               </li>
//               <li>
//                 {" "}
//                 <Link id="reports" to={"/audit_reports"}>
//                   <img
//                     src="https://old.anyaudit.co.in/img/menu_icons/audit_reports.png"
//                     class="menu_icon"
//                   />
//                 </Link>
//               </li>
//               <li>
//                 {" "}
//                 <Link id="documentaions" to={"/audit_documentations"}>
//                   <img
//                     src="https://old.anyaudit.co.in/img/menu_icons/documentation.png"
//                     class="menu_icon"
//                   />
//                 </Link>
//               </li>
//             </ul>
//           </div>
//         </div>

//         {/* Routes */}
//         <div className="row">
//           <div className="content">
//             <Routes>
//             <Route  element={<RequireAuth />} >
             
//               </Route>
//             </Routes>
//           </div>
//         </div>
//         <ReactTooltip
//           anchorId="app-title"
//           place="right"
//           content="Audit Planning Memorandum"
//         />
//         <ReactTooltip
//           anchorId="acceptance-initiations"
//           place="right"
//           content="Acceptance Initiations"
//         />
//         <ReactTooltip
//           anchorId="data-collections"
//           place="right"
//           content="Audit Data Collections,"
//           //  Analysis and Sampling"
//         />
//         <ReactTooltip
//           anchorId="automated-ledger"
//           place="right"
//           content="Automated Ledger Scrutiny"
//         />
//         <ReactTooltip
//           anchorId="process-audit"
//           place="right"
//           content="Process Audit"
//         />
//         <ReactTooltip
//           anchorId="ffs"
//           place="right"
//           content="Financial Statements"
//         />
//         <ReactTooltip
//           anchorId="lead-sheet"
//           place="right"
//           content="Audit Lead Sheet"
//         />
//         <ReactTooltip
//           anchorId="sub-test"
//           place="right"
//           content="Substantive Testing"
//         />
//         <ReactTooltip
//           anchorId="findings"
//           place="right"
//           content="Audit Findings"
//         />
//         <ReactTooltip
//           anchorId="reports"
//           place="right"
//           content="Audit Reports"
//         />
//         <ReactTooltip
//           anchorId="documentaions"
//           place="right"
//           content="Audit Documentaions"
//         />
//       </section>
//     </>
//   );
// };
// export default SidebarsGreen;
