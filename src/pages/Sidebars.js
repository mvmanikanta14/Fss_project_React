import React, { useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Tooltip as ReactTooltip } from "react-tooltip";

import { Link } from "react-router-dom";

import { BrowserRouter, Route, Routes } from "react-router-dom";









import RequireAuth from "./RequireAuth";
import TypeofLocation from "./listing/FSSTABLES/TypeofLocation";
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
                <Link id="select-assign" to={"/bom"}>
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
                <Link id="assign" to={"/products"}>
                  <img
                    src="https://old.anyaudit.co.in/img/menu_icons/assignments.png"
                    class="menu_icon"
                  />{" "}
                </Link>
              </li>
              <li>
                <Link id="mile" to={"/location_list"}>
                  {" "}
                  <img
                    src="https://old.anyaudit.co.in/img/menu_icons/milestone.png"
                    class="menu_icon"
                  />{" "}
                </Link>
              </li>
              <li>
                {" "}
                <Link id="plan" to={"/unit_of_measurements"}>
                  <img
                    src="https://old.anyaudit.co.in/img/menu_icons/plans.png"
                    class="menu_icon"
                  />{" "}
                </Link>
              </li>
              <li>
                {" "}
                <Link id="user" to={"/UoM_conversions"}>
                  <img
                    src="https://old.anyaudit.co.in/img/menu_icons/users.png"
                    class="menu_icon"
                  />
                </Link>
              </li>

              <li>
                {" "}
                <Link id="setting" to={"/UoM_types"}>
                  <img
                    src="https://old.anyaudit.co.in/img/menu_icons/settings.png"
                    class="menu_icon"
                  />{" "}
                </Link>
              </li>
              <li>
                {" "}
                <Link id="report" to={"/product_list"}>
                  <img
                    src="https://old.anyaudit.co.in/img/menu_icons/reports.png"
                    class="menu_icon"
                  />{" "}
                </Link>
              </li>

              <li>
                {" "}
                <Link id="report" to={"/costing_methods"}>
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
