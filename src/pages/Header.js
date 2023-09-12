import React, { useEffect, useState } from "react";
//  import {  useLocation, useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { BsUiChecksGrid, BsArrowsFullscreen, BsBell } from "react-icons/bs";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import GlobalSearch from "react-global-search";
import tokenService from "../services/token.service";
import { BsPersonCircle } from "react-icons/bs";
import { Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { FaFile, FaFileAlt, FaLock, FaNewspaper, FaPenAlt, FaPencilAlt, FaSearch, FaSignOutAlt } from "react-icons/fa";
import DropdownButton from "react-bootstrap";

//import Appp from "../Appp";
// import { Link, useLocation, useNavigate } from "react-router-dom";

const Header = (props) => {
  // const [displayusername, displayusernameupdate] = useState('');
  // const [showmenu, showmenuupdateupdate] = useState(false);
  // const usenavigate = useNavigate();
  // const location = useLocation();

  //   useEffect(() => {
  //     if (location.pathname === '/') {
  //         showmenuupdateupdate(false);
  //     } else {
  //         showmenuupdateupdate(true);
  //         let username = sessionStorage.getItem('username');
  //         if (username === null || username === '' ) {
  //             usenavigate('/');
  //         } else {
  //             displayusernameupdate(username);
  //         }
  //     }

  // }, [location])

  const [Searchblue, setSearchblue] = useState(false);
  const handleCloseSearchblue = () => setSearchblue(false);
  const handleSearchblue = () => setSearchblue(true);

  const logout = () => {
    tokenService.removeUser();
    navigate('/login');
  }
  const options = [
    {
      label: (
         <Link className="links-links " to={"/Change_Profile"}>
          {/* <label className="nav-icon-dropdown"><FaPencilAlt/></label> */}
          {" "}
          <FaPencilAlt className="profile-dropdown"/> &nbsp; Change Profile{" "}
        </Link>
      ),
      value: "Change Profile",
    },
    {
      label: (
        <Link className="links-links" to={"/Change_Password"}>
          <FaLock className="profile-dropdown"/>&nbsp;
          Change Password{" "}
        </Link>
      ),
      value: "anotherAction",
    },
    {
      label: (
        <Link className="links-links" to={"/Domainlogo"}>
          {" "}
          <FaFileAlt className="profile-dropdown"/>&nbsp;
          Domain logo{" "}
        </Link>
      ),
      value: "somethingElse",
    },
    {
      label: (
        <Link className="links-links" to={"/PendingAsMaker"}>
          {" "}
          <FaNewspaper className="profile-dropdown"/>&nbsp;
          Pending AsMaker{" "}
        </Link>
      ),
      value: "somethingElse",
    },
    {
      label: (
        <Link className="links-links" onClick={logout}>
          <FaSignOutAlt className="profile-dropdown"/>&nbsp;
          Logout{" "}
        </Link>
      ),
      value: "somethingElse",
    },
  ];

  const handleSelect = (selectedValue) => {
    // Do something with the selected option value (optional)
    console.log("Selected Option:", selectedValue);
  };

  const navigate = useNavigate();

  return (
    <>
      {/* {showmenu && */}
      <div className="header">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-7 col-lg-7 col-sm-12  ">
              <Link className="navbar-brand logo" to="/dashboard">
                {" "}
                <img src="../logo-icona.png" alt="logo" />{" "}
              </Link>
              <Link className="navbar-brand" to="/dashboard">
                {" "}
                <img src="../text_logos.png" alt="logo" className="logo-text-sample" />{" "}
              </Link>
              <div className="notify">
                <Link to={"/PendingAsMaker"}>
                  <img
                    src="https://old.anyaudit.co.in/img/notify_bell.png"
                    class="svg-icons"
                  ></img>
                </Link>
                <span class="count"> 345 </span>
                <FaSearch
                  className="header-search"
                  onClick={handleSearchblue}
                />
                <div className="model_box">
                  <Modal
                    {...props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    className="headerSearch-Modal"
                    centered
                    show={Searchblue}
                    onHide={handleCloseSearchblue}
                    backdrop="static"
                    keyboard={false}
                  >
                    <Modal.Header closeButton className="border-0">
                      <Modal.Title id="contained-modal-title-vcenter">
                        Menu Search
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <div className="p-0 ">
                        <form className="">
                          <div className="container">
                            <div className="row">
                              <div className="col-md-12">
                                <input
                                  type="text"
                                  className="header-input-inside-search text-control mt-2"
                                  placeholder="What are you searching for?"
                                ></input>
                                <label>
                                  <FaSearch className="search-inside-modal-inside-headersearch" />
                                </label>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </Modal.Body>
                  </Modal>
                </div>
              </div>
              <div className=""></div>
            </div>

            {/* <div className="col-md-5 col-lg-5 col-sm-12 search col"> */}

            {/* <input 
            id="quick_search"
            className="xs-hide form-control"
            name="quick_search"
            placeholder="Search ..."
            type="text"
           />

         
          <i className="fa fa-search" aria-hidden="true"></i> */}
            {/* </div> */}

            <div className="col-md-2 col-lg-2 col-sm-12  header-icons">
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
            </div>

            <div className="col-md-3 col-lg-2 col-sm-12 profile">
              <div>
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

                <div className="profile-logo">
                  <Dropdown  onSelect={handleSelect}>
                    <Dropdown.Toggle variant="link" id="dropdown-basic">
                      <BsPersonCircle />
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="profile-dropdown-style" alignRight>
                      {options.map((option) => (
                        <Dropdown.Item
                          key={option.value}
                          eventKey={option.value}
                        >
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
          <div class="log-name">
            <span> User : &nbsp; Admin </span>
          </div>
        </div>
      </div>

      {/* } */}
    </>
  );
};

export default Header;
