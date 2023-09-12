import { Link } from "react-router-dom";
import "./clienthub.css";
import { FaPlus, FaHome , FaPencilAlt,FaArrowLeft} from "react-icons/fa";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";
import { Tabs, Tab, TabPanel, TabList } from "react-web-tabs";

import { BsFillTrash3Fill, BsPencilSquare } from "react-icons/bs";

import React, { useState, useEffect } from "react";


const AssignmentsHub = (props) => {
  const [data, setdata] = useState([]);

  const [showim, setShowIm] = useState(false);
  const handleCloseim = () => setShowIm(false);
  const handleShowim = () => setShowIm(true);

  const [showbt, setShowBt] = useState(false);
  const handleClosebt = () => setShowBt(false);
  const handleShowbt = () => setShowBt(true);

  const [showba, setShowBa] = useState(false);
  const handleCloseba = () => setShowBa(false);
  const handleShowba = () => setShowBa(true);

  useEffect(() => {
    axios
      .get("http://localhost:8000/CommonAll")
      .then((res) => {
        setdata(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }); // Update the date every second

    return () => clearInterval(interval);
  }, []);

 
  return (
    <>
       <Tabs
        defaultTab="one"
        onChange={(tabId) => {
          console.log(tabId);
        }}
      >
        <div className="card margin-bottom">
          <div className="row">
            <div className="col-md-6 padding-left">
              <Link className="svg-icon-height links-links" to={`/dashboard`}>
                <FaHome />
              </Link>{" "}
              &nbsp; /{" "}
              <Link className="svg-icon-height links-links" to={"/assignment"}>
                Assignments
              </Link>
            </div>
            <div className="col-md-6 text-rightss">
              <div className="backbutton-blue">
                <div className="right-top-btns">
                  <button title="Back" className="btnbtn-hover">
                    <FaArrowLeft />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="header-title"> Assingnment Hub :</div>
        </div>

      <div className="card ">
        <div className="hub_category">
        <TabList>
          <Tab
            title="All" id="1" name="" className="btn-new" tabFor="one">
            {" "}
            All 
          </Tab>

          <Tab
           title="Milestone" id="1" name="" className="btn-new" tabFor="two">
           Milestone
          </Tab>
          <Tab
           title="Users" id="1" name="" className="btn-new" tabFor="three">
           Users 
          </Tab>
          <Tab
            title="Plans" id="1" name="" className="btn-new" tabFor="four">
            Plans
          </Tab>
          <Tab
           title="Updates" id="1" name="" className="btn-new" tabFor="five">
            Updates 
          </Tab>
          <Tab
           title="Calender" id="1" name="" className="btn-new" tabFor="six">
           Calender
          </Tab>
          </TabList>
        </div>
        <div className="details-box">
          <div className="col-md-12 p-0 mb-0">
            <label class="col-md-4">Engagement Partner :</label>
            <label class="col-md-4">Review Partner :</label>
            <label class="col-md-4">Start Date : -</label>
            <label class="col-md-4">End Date : -</label>
            <label class="col-md-4">Priority :</label>
            <label class="col-md-4">Workseries :</label>
            <label class="col-md-12">Team :</label>
            <label class="col-md-12">Description :</label>
          </div>
        </div>

        <TabPanel tabId="one">
        <div className="col-md-12">
          <div className="followmebar">
            <div className="row">
              <div className="col-md-4 floatleft"></div>
              <div className="col-md-4">Milestone </div>
              <div className="col-md-4 ">
                <div className="backbutton-blue">
                  <div className="right-top-btns">
                    <button
                      onClick={handleShowim}
                      className="client-hub-plus-buttons text-icon-button"
                      title="Import Milestone"
                    >
                      IM
                    </button>
                    <button
                      onClick={handleShowbt}
                      className="client-hub-plus-buttons text-icon-button"
                      title="Brrow Tempalte"
                    >
                      BT
                    </button>
                    <button
                      onClick={handleShowba}
                      className="client-hub-plus-buttons text-icon-button"
                      title="Brrow form Assignment"
                    >
                      A
                    </button>
                    <button className="client-hub-plus-button" title="Add Milestone">
                    <Link className="" to={"/add_milestone"}> <FaPlus /></Link>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <table className="table border shadow">
            <thead className="thead-lite">
              <tr>
                <th scope="">S.No</th>
                <th scope="">Assignment - Milestone</th>
                <th scope="">Start Date</th>
                <th scope=""> End Date</th>
                <th scope="">Duration Hrs Value - Status </th>
                <th scope="">Plan Hrs</th>
                <th scope="">Performance Hrs</th>
              </tr>
            </thead>
          </table>
        </div>

        <div className="col-md-12">
          <div className="followmebar">USERS </div>
          <table className="table border shadow">
            <thead className="thead-lite">
              <tr>
                <th scope="">S.No</th>
                <th scope="">Name</th>
                <th scope="">Total Planned Hrs</th>
                <th scope=""> Total Performed Hrs </th>
                <th scope="">Plan Hrs ({currentDate.toLocaleDateString()})</th>
                <th scope="">Performance Hrs ({currentDate.toLocaleDateString()})</th>
              </tr>
            </thead>
          </table>
        </div>
        <div className="col-md-12">
          <div className="followmebar">
            <div className="row">
              <div className="col-md-4 floatleft">
                <label class="radio-inline">
                <input type="radio" name="atype" autoComplete='off' />
                  On Date{" "}
                </label>
                <label class="radio-inline">
                <input type="radio" name="atype" autoComplete='off' />
                  OVERDUE{" "}
                </label>
                <label class="radio-inline">
                <input type="radio" name="atype" autoComplete='off' />
                  FUTURE{" "}
                </label>
                <label class="radio-inline">
                <input type="radio" name="atype" autoComplete='off' />
                  All{" "}
                </label>
              </div>{" "}
              <div className="col-md-4">PLAN </div>
              <div className="col-md-4">
                <div className="backbutton-blue">
                  <div className="right-top-btns">
                    <button className="client-hub-plus-button" title="Add Plan">
                    <Link to={"/add_plan"}><FaPlus /></Link> 
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <table className="table border shadow">
            <thead className="thead-lite">
              <tr>
                <th scope="">S.No</th>
                <th scope=""> Plan ID- Maker-Plan By</th>
                <th scope="">Description-Client-Assignment-Milestone</th>
                <th scope=""> Total Performed Hrs </th>
                <th scope="">Planned Hrs</th>
                <th scope="">Performed Hrs</th>
              </tr>
            </thead>
          </table>
        </div>
        <div className="col-md-12">
          <div className="followmebar">Updates </div>
          <table className="table border shadow">
            <thead className="thead-lite">
              <tr>
                <th scope="">S.No</th>
                <th scope="">Update By - Given On</th>
                <th scope=""> Description</th>
                <th scope=""> Attachment</th>
                <th scope=""> Action</th>
              </tr>
            </thead>
            <tbody>
              {data
                ? data.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.Assignment}</td>
                        <td>{item.Assignment}</td>
                        <td>{item.AssignmentMilestone}</td>
                        <td>
                        <button title='Edit' className="button-background-styles"><Link to="" className="pencil-link-button"><FaPencilAlt className='pencil' /></Link></button>
                          <Link
                            className="delete-link-button"
                            onClick={() => item.id}
                            title="Delete"
                          >
                            <BsFillTrash3Fill />
                          </Link>
                        </td>
                      </tr>
                    );
                  })
                : "No Data found"}
            </tbody>
          </table>
        </div>
        <div className="col-md-12">
          <div className="followmebar"> CALENDAR </div>
          <table className="table border shadow">
            <thead className="thead-lite">
              <tr>
                <th scope="">S.No</th>
                <th scope=""> 08-Jul-2023</th>
                <th scope="">09-Jul-2023 </th>
                <th scope=""> 10-Jul-2023 </th>
                <th scope=""> 11-Jul-2023 </th>
                <th scope=""> 12-Jul-2023 </th>
                <th scope=""> 13-Jul-2023 </th>
                <th scope=""> 14-Jul-2023 </th>
                <th scope=""> 15-Jul-2023 </th>
                <th scope=""> 16-Jul-2023 </th>
                <th scope=""> 17-Jul-2023 </th>
              </tr>
            </thead>
          </table>
        </div>
        </TabPanel>

        {/*Start Milestone Table */}
        <TabPanel tabId="two">
        <div className="col-md-12">
          <div className="followmebar">
            <div className="row">
              <div className="col-md-4 floatleft"></div>
              <div className="col-md-4">Milestone </div>
              <div className="col-md-4 ">
                <div className="backbutton-blue">
                  <div className="right-top-btns">
                    <button
                      onClick={handleShowim}
                      className="client-hub-plus-buttons text-icon-button"
                      title="Import Milestone"
                    >
                      IM
                    </button>
                    <button
                      onClick={handleShowbt}
                      className="client-hub-plus-buttons text-icon-button"
                      title="Brrow Tempalte"
                    >
                      BT
                    </button>
                    <button
                      onClick={handleShowba}
                      className="client-hub-plus-buttons text-icon-button"
                      title="Brrow form Assignment"
                    >
                      A
                    </button>
                    <button className="client-hub-plus-button" title="Add Milestone">
                     <Link to={"/add_milestone"}> <FaPlus /></Link>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <table className="table border shadow">
            <thead className="thead-lite">
              <tr>
                <th scope="">S.No</th>
                <th scope="">Assignment - Milestone</th>
                <th scope="">Start Date</th>
                <th scope=""> End Date</th>
                <th scope="">Duration Hrs Value - Status </th>
                <th scope="">Plan Hrs</th>
                <th scope="">Performance Hrs</th>
              </tr>
            </thead>
          </table>
        </div>
        </TabPanel>
        {/*End Milestone Table */}

        {/*Start USERS Table */}
        <TabPanel tabId="three">

        <div className="col-md-12">
          <div className="followmebar">USERS </div>
          <table className="table border shadow">
            <thead className="thead-lite">
              <tr>
                <th scope="">S.No</th>
                <th scope="">Name</th>
                <th scope="">Total Planned Hrs</th>
                <th scope=""> Total Performed Hrs </th>
                <th scope="">Plan Hrs ({currentDate.toLocaleDateString()})</th>
                <th scope="">Performance Hrs ({currentDate.toLocaleDateString()})</th>
              </tr>
            </thead>
          </table>
        </div>
        </TabPanel>
        {/*End USERS Table */}

        {/*Start PLAN LIST ON */}
        <TabPanel tabId="four">

        <div className="col-md-12">
          <div className="followmebar">
            <div className="row">
              <div className="col-md-4 floatleft">
                <label class="radio-inline">
                <input type="radio" name="atype" autoComplete='off' />
                  On Date{" "}
                </label>
                <label class="radio-inline">
                <input type="radio" name="atype" autoComplete='off' />
                  OVERDUE{" "}
                </label>
                <label class="radio-inline">
                <input type="radio" name="atype" autoComplete='off' />
                  FUTURE{" "}
                </label>
                <label class="radio-inline">
                <input type="radio" name="atype" autoComplete='off' />
                  All{" "}
                </label>
              </div>{" "}
              <div className="col-md-4">PLAN </div>
              <div className="col-md-4">
                <div className="backbutton-blue">
                  <div className="right-top-btns">
                    <button className="client-hub-plus-button" title="Add Plan">
                    <Link to={"/add_plan"}><FaPlus /></Link> 
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <table className="table border shadow">
            <thead className="thead-lite">
              <tr>
                <th scope="">S.No</th>
                <th scope=""> Plan ID- Maker-Plan By</th>
                <th scope="">Description-Client-Assignment-Milestone</th>
                <th scope=""> Total Performed Hrs </th>
                <th scope="">Planned Hrs</th>
                <th scope="">Performed Hrs</th>
              </tr>
            </thead>
          </table>
        </div>
        </TabPanel>
        {/*End PLAN LIST ON */}

        {/*Start Updates */}
        <TabPanel tabId="five">
        
        <div className="col-md-12">
          <div className="followmebar">Updates </div>
          <table className="table border shadow">
            <thead className="thead-lite">
              <tr>
                <th scope="">S.No</th>
                <th scope="">Update By - Given On</th>
                <th scope=""> Description</th>
                <th scope=""> Attachment</th>
                <th scope=""> Action</th>
              </tr>
            </thead>
            <tbody>
              {data
                ? data.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.Assignment}</td>
                        <td>{item.Assignment}</td>
                        <td>{item.AssignmentMilestone}</td>
                        <td>
                        <button title='Edit' className="button-background-styles"><Link to="/addclient" className="pencil-link-button"><FaPencilAlt className='pencil' /></Link></button>
                          <Link
                            className="delete-link-button"
                            onClick={() => item.id}
                            title="Delete"
                          >
                            <BsFillTrash3Fill />
                          </Link>
                        </td>
                      </tr>
                    );
                  })
                : "No Data found"}
            </tbody>
          </table>
        </div>
        </TabPanel>
        {/*Start Updates */}

        {/*Start CALENDAR */}
        <TabPanel tabId="six">

        <div className="col-md-12">
          <div className="followmebar"> CALENDAR </div>
          <table className="table border shadow">
            <thead className="thead-lite">
              <tr>
                <th scope="">S.No</th>
                <th scope=""> 08-Jul-2023</th>
                <th scope="">09-Jul-2023 </th>
                <th scope=""> 10-Jul-2023 </th>
                <th scope=""> 11-Jul-2023 </th>
                <th scope=""> 12-Jul-2023 </th>
                <th scope=""> 13-Jul-2023 </th>
                <th scope=""> 14-Jul-2023 </th>
                <th scope=""> 15-Jul-2023 </th>
                <th scope=""> 16-Jul-2023 </th>
                <th scope=""> 17-Jul-2023 </th>
              </tr>
            </thead>
          </table>
        </div>
        </TabPanel>
        {/*End CALENDAR */}
      </div>

      <div className="model_box">
        <Modal
          {...props}
          size="xs"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={showim}
          onHide={handleCloseim}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton className="border-0">
            <Modal.Title id="contained-modal-title-vcenter">
              Import Milestone
              {/* {mode === "add" ? "Add" : "Edit"} Record */}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="col-sm-12">
              <form
                // onSubmit={handleSubmit(onSubmit)}
                className="form-horizontal row"
              >
                <div className="form-group col-sm-12">
                  <label htmlFor="name">Tool Kits</label>
                  <span class="text-danger"> * </span>
                  <input
                    type="text"
                    className="accordiantext"
                    placeholder="Enter Name"
                    //   {...register("name", { required: true })}
                  />
                  {/* {errors.name && (
                              <span className="text-danger">
                                This is required
                              </span>
                            )} */}
                </div>

                <div className="form-group col-sm-12">
                  <label htmlFor="phoneNo">Tool </label>
                  <span class="text-danger"> * </span>
                  <input
                    type="tel"
                    className="accordiantext"
                    placeholder="Enter Phone Number"
                    //   {...register("phoneNo", {
                    //     required: true,
                    //     pattern: /[0-9]{10}/,
                    //     maxLength: 10,
                    //   })}
                  />
                  {/* {errors.phoneNo && (
                              <span className="text-danger">
                                This is required
                              </span>
                            )} */}
                </div>
                <div className="col-md-12 text-right">
                  <button variant="secondary" className="bg-success-textbutton">
                    Create Tool Kit
                  </button>
                </div>

                {/* <div className="form-group col-sm-12 text-center mt-4">
                Given By : Mani
              </div> */}
              </form>
            </div>
          </Modal.Body>
          {/* <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer> */}
        </Modal>
      </div>

      <div className="model_box">
        <Modal
          {...props}
          size="xs"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={showbt}
          onHide={handleClosebt}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton className="border-0">
            <Modal.Title id="contained-modal-title-vcenter">
              Borrow Template
              {/* {mode === "add" ? "Add" : "Edit"} Record */}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="col-sm-12">
              <form
                // onSubmit={handleSubmit(onSubmit)}
                className="form-horizontal row"
              >
                <div className="form-group col-sm-12">
                  <label htmlFor="name">Template Name </label>
                  <span class="text-danger"> * </span>
                  <input
                    type="text"
                    className="accordiantext"
                    placeholder="Enter Name"
                    //   {...register("name", { required: true })}
                  />
                  {/* {errors.name && (
                              <span className="text-danger">
                                This is required
                              </span>
                            )} */}
                </div>

                <div className="col-md-12 text-right">
                  <button variant="secondary" className="bg-success-textbutton">
                    Submit
                  </button>
                </div>

                {/* <div className="form-group col-sm-12 text-center mt-4">
                Given By : Mani
              </div> */}
              </form>
            </div>
          </Modal.Body>
          {/* <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer> */}
        </Modal>
      </div>

      <div className="model_box">
        <Modal
          {...props}
          size="xs"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={showba}
          onHide={handleCloseba}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton className="border-0">
            <Modal.Title id="contained-modal-title-vcenter">
              Audit Planning Template
              {/* {mode === "add" ? "Add" : "Edit"} Record */}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="col-sm-12">
              <form
                // onSubmit={handleSubmit(onSubmit)}
                className="form-horizontal row"
              >
                <div className="form-group col-sm-12">
                  <label htmlFor="name">Assignment Name </label>
                  <span class="text-danger"> * </span>
                  <select className="accordiantext" autoComplete="off">
                    <option value="">--Select--</option>

                    <option value="">--Select--</option>
                    <option value="">Configurations</option>
                    <option value="">Planning</option>
                    <option value="">Initiation</option>
                  </select>
                </div>
                <div className="col-sm-12">
                  <label class="">
                    <input
                      type="radio"
                      name="ropt"
                      id="ropt2_id"
                      value="0"
                      checked=""
                      autocomplete="off"
                    />{" "}
                    Without Users
                  </label>
                  <label class="">
                    <input
                      type="radio"
                      name="ropt"
                      id="ropt2_id"
                      value="0"
                      checked=""
                      autocomplete="off"
                    />{" "}
                    Without Users
                  </label>
                </div>

                <div className="col-md-12 text-right">
                  <button variant="secondary" className="bg-success-textbutton">
                    Submit
                  </button>
                </div>

                {/* <div className="form-group col-sm-12 text-center mt-4">
                Given By : Mani
              </div> */}
              </form>
            </div>
          </Modal.Body>
          {/* <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer> */}
        </Modal>
      </div>
      </Tabs>
    </>
  );
};
export default AssignmentsHub;
