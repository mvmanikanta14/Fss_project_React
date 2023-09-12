import React, { useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Tooltip as ReactTooltip } from "react-tooltip";

import { Link } from "react-router-dom";

import { BrowserRouter, Route, Routes } from "react-router-dom";


import ClientsHub from "./Hubs/ClientsHub";

import AssignmentsHub from "./Hubs/AssignmentsHub";
import MilestoneHub from "./Hubs/MilestoneHub";
import PlansHub from "./Hubs/PlansHub";
import UserHub from "./Hubs/UserHub";
import DateHub from "./Hubs/DateHub";
import { Dashboard } from "./Dashboard";






import RequireAuth from "./RequireAuth";
import TypeofLocation from "./listing/Campus/TypeofLocation";
// import Financialframeworkconfigure from "./listing/Financialframeworkconfigure";
const Sidebars = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <section>
        <div className="left-navigation ">
          <div className="p-t-10">
            <ul className="mcd-menu">
              <li>
                {" "}
                <Link id="select-assign" to={""}>
                  <img
                    src="https://old.anyaudit.co.in/img/menu_icons/select_ass.png"
                    class="menu_icon"
                  />{" "}
                </Link>
              </li>

              <li>
                <Link id="client" to={"/type_of_location"}>
                  {" "}
                  <img
                    src="https://old.anyaudit.co.in/img/menu_icons/clients.png"
                    class="menu_icon"
                  />{" "}
                </Link>
              </li>
              <li>
                <Link id="assign" to={"/assignment"}>
                  <img
                    src="https://old.anyaudit.co.in/img/menu_icons/assignments.png"
                    class="menu_icon"
                  />{" "}
                </Link>
              </li>
              <li>
                <Link id="mile" to={"/milestone"}>
                  {" "}
                  <img
                    src="https://old.anyaudit.co.in/img/menu_icons/milestone.png"
                    class="menu_icon"
                  />{" "}
                </Link>
              </li>
              <li>
                {" "}
                <Link id="plan" to={"/plans"}>
                  <img
                    src="https://old.anyaudit.co.in/img/menu_icons/plans.png"
                    class="menu_icon"
                  />{" "}
                </Link>
              </li>
              <li>
                {" "}
                <Link id="user" to={"/users"}>
                  <img
                    src="https://old.anyaudit.co.in/img/menu_icons/users.png"
                    class="menu_icon"
                  />
                </Link>
              </li>

              <li>
                {" "}
                <Link id="setting" to={"/settings"}>
                  <img
                    src="https://old.anyaudit.co.in/img/menu_icons/settings.png"
                    class="menu_icon"
                  />{" "}
                </Link>
              </li>
              <li>
                {" "}
                <Link id="report" to={"/reports"}>
                  <img
                    src="https://old.anyaudit.co.in/img/menu_icons/reports.png"
                    class="menu_icon"
                  />{" "}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="content">
            <Routes>
              <Route  element={<RequireAuth />} >
              <Route path="/dashboard" element={<Dashboard />} />
             
              <Route path="/client_hub" element={<ClientsHub />} />
              <Route path="/assignment_hub" element={<AssignmentsHub />} />
              <Route path="/milestone_hub" element={<MilestoneHub />} />
              <Route path="/plans_hub" element={<PlansHub />} />
              <Route path="/user_hub" element={<UserHub />} />
              <Route path="/date_hub" element={<DateHub />} />
             
             

             
              <Route path="/type_of_location" element={<TypeofLocation />} />

              
              

            
             
              </Route>
            </Routes>
          </div>
        </div>
        <ReactTooltip
          anchorId="select-assign"
          place="right"
          content="Select Assignments"
        />
        <ReactTooltip anchorId="client" place="right" content="Clients" />
        <ReactTooltip anchorId="assign" place="right" content="Assignments" />
        <ReactTooltip anchorId="mile" place="right" content="Milestones" />
        <ReactTooltip anchorId="plan" place="right" content="Plans" />
        <ReactTooltip anchorId="user" place="right" content="Users" />
        <ReactTooltip anchorId="setting" place="right" content="Settings" />
        <ReactTooltip anchorId="report" place="right" content="Reports" />
      </section>
    </div>
  );
};
export default Sidebars;
