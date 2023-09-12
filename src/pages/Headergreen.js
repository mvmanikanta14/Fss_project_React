import React, { useEffect, useState } from "react";
 import {Link,  useLocation, useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { BsPersonCircle } from "react-icons/bs";

import GlobalSearch from "react-global-search";
import tokenService from "../services/token.service";
import { Tooltip as ReactTooltip } from "react-tooltip";
import Form from "react-bootstrap/Form";
// import AuditPlanningMemorandum from "../pages/Greenpages/AuditPlanningMemorandum";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

const Headergreen = (props) => {
  const [Searchblue, setSearchblue] = useState(false)
  const handleCloseSearchblue = () => setSearchblue(false);
  const handleSearchblue = () => setSearchblue(true);
  // const navigate = useNavigate();

  // const gotoBlue = () => {
  //   navigate("/dashboard")
  // };
  const options = [
    { label: 'Change Profile', value: 'Change Profile' },
    { label: 'Change Password', value: 'anotherAction' },
    { label: 'Change Domain Logo', value: 'somethingElse' }, 
    { label: 'Announcements', value: 'somethingElse' },
    { label: 'Logout', value: 'somethingElse' }
  ];

  const handleSelect = (selectedValue) => {
    console.log('Selected Option:', selectedValue);
  };
  return (
    <>
      {/* {showmenu && */}
      <div className="header-green">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-4 col-lg-4 col-sm-12  ">
            <Link className="navbar-brand logo" to="/dashboard">
                {" "}
                <img src="../logo-icona.png" alt="logo" />{" "}
              </Link>
              <Link className="navbar-brand" to="/dashboard">
                {" "}
                <img src="../text_logos.png" alt="logo" className="logo-text-sample" />{" "}
              </Link>
              <div className="notify">
                <img
                  src="https://old.anyaudit.co.in/img/notify_bell.png"
                  class="svg-icons"
                ></img>
                <span class="count"> 678 </span>
                <FaSearch className="header-search" onClick={handleSearchblue} />
                <div className="model_box">
                  <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" className="headerSearch-Modal" centered show={Searchblue}
                    onHide={handleCloseSearchblue} backdrop="static" keyboard={false}>
                    <Modal.Header closeButton className="border-0">
                      <Modal.Title id="contained-modal-title-vcenter">
                        Menu Search
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <div className='p-0 '>
                        <form className=''>
                          <div className='container'>
                            <div className="row">
                              <div className="col-md-12">
                                <input type="text" className="header-input-inside-search text-control mt-2" placeholder="What are you searching for?"></input>
                                <label><FaSearch className="search-inside-modal-inside-headersearch"/></label>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </Modal.Body>
                  </Modal>
                </div>
              </div>
            </div>

            <div className="col-md-5 col-lg-5 col-xs-6 col-sm-6  col-sm-5  top-head pr-0 m-t-5">
              <span class="col-white ">
                {" "}
                <small class="indigo f-12"> Client </small>{" "}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : &nbsp;
                MNO Pvt. Ltd (5)
              </span>
              <div class="w-100">
                <span class="col-white">
                  {" "}
                  <small class="indigo f-12" ><a href="/dashboard">Assignment </a> </small> : &nbsp; MNO
                  Pvt. Ltd_Statutory audit for MNO_2022-23 (114){" "}
                </span>
              </div>
            </div>

            {/* <div className="col-md-2 col-lg-2 col-sm-12  header-icons"> */}

            {/* <span>
            {" "}
          
            <BsBell />{" "}
          </span>
          <span>
            {" "}
            <BsArrowsFullscreen />{" "}
          </span>
          <span>
            {" "}
            <BsUiChecksGrid />{" "}
          </span> */}

            {/* </div> */}

            <div className="col-md-3 col-lg-2 col-sm-12 profile">
              <div className="">
                <div class="logo-texts"> RA and Associates </div>
                <span class="logo-text">
                  {" "}
                  Chartered Accountants || rka.com
                  {/* <img
                    src="./images/login-bg.jpg"
                    className="profile-img"
                    alt="login-bg"
                  />{" "} */}
                </span>
                {/* <div className="profile-logogreen">
                  <BsPersonCircle />
                </div> */}
                
                <div className="profile-logogreen">
                  <Dropdown onSelect={handleSelect}>
                    <Dropdown.Toggle variant="link" id="dropdown-basic" >
                      <BsPersonCircle />
                    </Dropdown.Toggle>
                    <Dropdown.Menu alignRight>
                      {options.map((option) => (
                        <Dropdown.Item key={option.value} eventKey={option.value}>
                          {option.label}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                {/* <Dropdown className="d-inline-flex profile-bg">
              <img src="./images/login-bg.jpg" className="profile-img"  alt="login-bg"/> 
              <Dropdown.Toggle>
                <div className="text-left float-left">
                  <span className="d-block"> seshasai@anyaudit </span>
                  <span> Partner </span>
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#"> Profile Page </Dropdown.Item>
                <Dropdown.Item href="#"> Settings </Dropdown.Item>
                <Dropdown.Item href="#">  <NavLink className=""  to="/">
                      Logout
                    </NavLink> </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown> */}
              </div>
            </div>
          </div>
          <div class="log-name-green">
            <span> User : &nbsp; Admin </span>
          </div>
        </div>
      </div>
      {/* } */}
    </>
  );
};

export default Headergreen;
