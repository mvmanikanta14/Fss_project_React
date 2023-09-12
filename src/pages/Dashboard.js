import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Calendar from "react-calendar";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import { BsFillHouseDoorFill } from "react-icons/bs";
import { FaStar,FaRegWindowMaximize,FaRegCalendarCheck,FaRegCalendarAlt,FaPen,FaCheck,FaRegWindowRestore, FaHome } from "react-icons/fa";
import {
  BsChevronDown,
  BsBriefcase,
  BsSpeedometer2,
  BsChevronUp,
} from "react-icons/bs";
import { GiSpellBook } from "react-icons/gi";
import { BiPencil, BiTrash } from "react-icons/bi";

import { FiCalendar, FiClock, FiPaperclip } from "react-icons/fi";
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { AiOutlineFieldTime } from "react-icons/ai";
import Marquee from "react-fast-marquee";
export const Dashboard = (props) => {
  // const dispatch=useDispatch();
  // const [loading,setLoading]=useState(false);
  // const [data,setData]=useState({});

  // React.useEffect(()=>{
  //     fetchUserData().then((response)=>{
  //         setData(response.data);
  //     }).catch((e)=>{
  //         localStorage.clear();
  //         props.history.push('/');
  //     })
  // },[])
  const [clients, setClients] = useState("");
  const [assignments, setAssignments] = useState();
  const [plans, setPlans] = useState();
  const [date, setDate] = useState(new Date());
  // function getAllPlans() {
  //   UserService.getAll(apiUrlsService.getAllPlans).then(
  //     (response) => {
  //       setPlans(response.data);
  //       console.log("tharun",response.data)
  //     },
  //     (error) => {
  //       this.setState({
  //         content:
  //           (error.response &&
  //             error.response.data &&
  //             error.response.data.message) ||
  //           error.message ||
  //           error.toString(),
  //       });

  //       if (error.response && error.response.status === 403) {
  //         //EventBus.dispatch("logout");
  //       }
  //     }
  //   );
  // }
  // useEffect(() => {
  //   getAllClients();
  //   getAllAssignments();
  //   getAllPlans();

  // }, []);
  // function getAllClients() {
  //   UserService.getAll(apiUrlsService.getAllClients).then(
  //     (response) => {
  //       if (response) {
  //         setClients(response.data.length);
  //         console.log(response.data.length,"this is length")
  //       }
  //     },
  //     (error) => {

  //     }
  //   );
  // }

  // function getAllAssignments() {
  //   UserService.getAll(apiUrlsService.getAllAssignments).then(
  //     (response) => {
  //       setAssignments(response.data.length);
  //       console.log(response.data.length,"tharun")
  //     },
  //     (error) => {

  //     }
  //   );
  // }

  // // const total=(plans.reduce((total,currentItem) =>  total = total + currentItem.planHour , 0 ));
  // // console.log(total,"this is total")

  //           const plans_list = plans
  //           const totalPlanHours = ""
  //           if (plans_list && plans_list.length > 0) {
  //             // Calculate the sum of planHour
  //             const totalPlanHours = plans_list.reduce((sum, plan) => sum + plan.planHour, 0);

  //             console.log(totalPlanHours); // Output: 16
  //           } else {
  //             console.log('Assignments array is empty or undefined.');
  //           }
  return (
    <div className="">
      <div className="card margin-bottom">
        <div className="dashboard-assign">
          <div className="row">
            <div className="col-md-5 col-lg-5 col-sm-6 col-xs-12 pl-0 pr-0 mb-0 db">
              <select className="serach-dashboard">
                <option className="serach-dashboard-options1">-- Select Assigment to Work --</option>
                <option className="serach-dashboard-options">C5_A100_MNO Pvt. Ltd_MNO Pvt. Ltd_Assignment Groups_2022-23</option>
                <option className="serach-dashboard-options">C48_A88_Demo Testing 1_Demo Testing 1_Statutory Audit_2022-23</option>
                <option className="serach-dashboard-options">C47_A87_ABC ltd_ABC ltd_Statutory Audit_2021-22</option>
                <option className="serach-dashboard-options">C47_A86_ABC ltd_ABC ltd_Statutory Audit_2022-23</option>
                <option className="serach-dashboard-options">C2_A74_Genpact_Genpact_one_2023-24</option>
              </select>
            </div>
            <div className="col-lg-7 col-md-7 col-sm-6 col-xs-6 mb-0  Latest_updates pr-0  d-xs-none">
              <div className="marquee-marqu">
                <Marquee>
                  A major software update is being implemented with effect from
                  01 July 2023, The service will resume with in 48 hours, A
                  major software update is being implemented with effect from 01
                  July 2023,
                </Marquee>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-7 col-md-7 col-sm-12 col-xs-12 ">
          <div className="card max-card margin-bottom">
            <div className="">
              <div className="cata-sub-nav custom_home_nav ">
                <ul className="row">
                  <li className="nav-items">
                    <Link
                      className="btn-news home"
                      to={"/dashboard"}
                      id="dashboard"
                      name="dashboard"
                    >
                      <FaHome />
                    </Link>
                    &nbsp;
                  </li>
                  <li className="nav-items">
                    <Link
                      className="btn-news"
                      to={"/clients"}
                      id="clients"
                      name="clients"
                    >
                      <span className="highlight_campus">C</span>lients{" "}
                    </Link>
                    &nbsp;
                  </li>
                  <li className="nav-items">
                    <Link
                      className="btn-news"
                      to={"/assignment"}
                      id="assignment"
                      name="assignment"
                    >
                      <span className="highlight_campus">A</span>ssigments{" "}
                    </Link>
                    &nbsp;
                  </li>
                  <li className="nav-items">
                    <Link
                      className="btn-news"
                      to={"/milestone"}
                      id="milestone"
                      name="milestone"
                    >
                     <span className="highlight_campus">M</span>ilestones{" "}
                    </Link>
                    &nbsp;
                  </li>
                  <li className="nav-items">
                    <Link
                      className="btn-news"
                      to={"/plans"}
                      id="plans"
                      name="plans"
                    >
                     <span className="highlight_campus">P</span>lans{" "}
                    </Link>
                    &nbsp;
                  </li>
                  <li className="nav-items">
                    <Link
                      className="btn-news"
                      to={"/users"}
                      id="users"
                      name="users"
                    >
                      <span className="highlight_campus">U</span>sers{" "}
                    </Link>
                    &nbsp;
                  </li>
                  <li className="nav-items">
                    <Link
                      className="btn-news"
                      to={"/settings"}
                      id="settings"
                      name="settings"
                    >
                      <span className="highlight_campus">S</span>ettings{" "}
                    </Link>
                    &nbsp;
                  </li>
                  <li className="nav-items">
                    <Link
                      className="btn-news"
                      to={"/reports"}
                      id="reports"
                      name="reports"
                    >
                      <span className="highlight_campus">R</span>eports{" "}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="title"> </div>
            <div className="row cards-body-form">
              <div className="col-md-4 col-lg-4 col-sm-12">
                <div class="card cards-cards cardblue-border">
                  <div class="">
                  <p class="card-text cards-counts">32</p>
                    <h5 class="card-title font">My Assignments</h5>
                    <div className="counter-icon blue"><FaRegWindowMaximize/></div>
                   
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-lg-4 col-sm-12">
                <div class="card cards-cards cardgreen-border">
                  <div class="">
                  <p class="card-text cards-counts">0</p>
                    <h5 class="card-title font">Favourite Milestones</h5>
                   
                    <div className="counter-icon green"><FaStar/></div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-lg-4 col-sm-12">
                <div class="card cards-cards cardgreen-border">
                  <div class="">
                  <p class="card-text cards-counts">0</p>
                    <h5 class="card-title font">Milestones Due</h5>
                    
                    <div className="counter-icon green"><FaRegWindowRestore/></div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-lg-4 col-sm-12">
                <div class="card cards-cards cardred-border">
                  <div class="">
                  <p class="card-text cards-counts">45</p>
                    <h5 class="card-title font">Milestones OverDue</h5>
                   
                    <div className="counter-icon red"><FaRegWindowRestore/></div>

                  </div>
                </div>
              </div>
              <div className="col-md-4 col-lg-4 col-sm-12">
                <div class="card cards-cards cardblue-border">
                  <div class="">
                  <p class="card-text cards-counts ">508</p>
                    <h5 class="card-title font">Today Plans</h5>
                  
                    <div className="counter-icon blue"><FaRegCalendarCheck/></div>

                  </div>
                </div>
              </div>
              <div className="col-md-4 col-lg-4 col-sm-12">
                <div class="card cards-cards cardred-border">
                  <div class="">
                  <p class="card-text cards-counts">4521.00</p>
                    <h5 class="card-title font">Plans Overdue</h5>
                   
                    <div className="counter-icon red"><FaRegCalendarAlt/></div>

                  </div>
                </div>
              </div>
              <div className="col-md-4 col-lg-4 col-sm-12">
                <div class="card cards-cards cardgreen-border ">
                  <div class="">
                  <p class="card-text cards-counts">452</p>
                    <h5 class="card-title font">Pending as Maker</h5>
                   
                    <div className="counter-icon green"><FaPen/></div>

                  </div>
                </div>
              </div>

              <div className="col-md-4 col-lg-4 col-sm-12">
                <div class="card cards-cards cardblue-border">
                  <div class="">
                  <p class="card-text cards-counts">520</p>
                    <h5 class="card-title font">Pending as Checker</h5>
                    
                    <div className="counter-icon blue"><FaCheck/></div>

                  </div>
                </div>
              </div>

              <div className="col-md-4 col-lg-4 col-sm-12">
                <div class="card cards-cards cardblue-border">
                  <div class="">
                  <p class="card-text cards-counts">20.12</p>
                    <h5 class="card-title font">Total Planned Hrs</h5>
                   
                    <div className="counter-icon blue"><FaRegWindowMaximize/></div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-5 col-md-5 col-sm-12 col-xs-12 pl-0">
          <div className="card">
            <div className="calendar-container">
              <Calendar className="abbrs" onChange={setDate} value={date} />
            </div>
            {/* <p className="text-center">
              <span className="bold">Selected Date:</span> {date.toDateString()}
            </p> */}
          </div>
        </div>
      </div>

      <div className="col-lg-7 col-md-7 col-sm-12 col-xs-12 "></div>
    </div>
  );
};
