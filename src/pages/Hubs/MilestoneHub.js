import { Link } from "react-router-dom";
import "./clienthub.css";
import { FaPlus, FaHome, FaArrowLeft, FaPencilAlt } from "react-icons/fa";
import axios from "axios";

import { BsFillTrash3Fill, BsPencilSquare } from "react-icons/bs";
import { Tabs, Tab, TabPanel, TabList } from "react-web-tabs";

import React, { useState, useEffect } from "react";

const MilestoneHub = () => {
  const [data, setdata] = useState([]);

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
              <Link className="svg-icon-height links-links" to={"/milestone"}>
                Milestones
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
          <div className="header-title"> Milestone Hub :</div>
        </div>

        <div className="card ">
          <div className="hub_category">
            <TabList>
              <Tab title="All" id="1" name="" className="btn-new" tabFor="one">
                All{" "}
              </Tab>

              <Tab
                title="Milestone"
                id="1"
                name=""
                className="btn-new"
                tabFor="two"
              >
                Milestone
              </Tab>
              <Tab
                title="Users"
                id="1"
                name=""
                className="btn-new"
                tabFor="three"
              >
                Users
              </Tab>
              <Tab
                title="Plans"
                id="1"
                name=""
                className="btn-new"
                tabFor="four"
              >
                Plans
              </Tab>
              <Tab
                title="Updates"
                id="1"
                name=""
                className="btn-new"
                tabFor="five"
              >
                Updates
              </Tab>
              <Tab
                title="Calender"
                id="1"
                name=""
                className="btn-new"
                tabFor="six"
              >
                Calender
              </Tab>
            </TabList>
          </div>
          <div className="details-box">
            <div className="col-md-12 p-0 mb-0">
              <label class="col-md-3">Engagement partner :</label>
              <label class="col-md-3">Start Date :</label>
              <label class="col-md-3">End Date :</label>
              <label class="col-md-3">Value :</label>
              <label class="col-md-3">Σ Score :</label>
              <label class="col-md-3">Current Status :</label>
              <label class="col-md-3">Team :</label>
            </div>
          </div>

          <TabPanel tabId="one">
            {/*Start Milestone Table */}
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
                  </div>
                  <div className="col-md-4">Milestone </div>
                  <div className="col-md-4 ">
                    <div className="backbutton-blue">
                      <div className="right-top-btns">
                        <button className="client-hub-plus-buttons" title="Add Milestone ">
                          <FaPlus />
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
            {/*End Milestone Table */}

            {/*Start USERS Table */}
            <div className="col-md-12">
              <div className="followmebar">USERS </div>
              <table className="table border shadow">
                <thead className="thead-lite">
                  <tr>
                    <th scope="">S.No</th>
                    <th scope="">Name</th>
                    <th scope="">Total Planned Hrs</th>
                    <th scope=""> Total Performed Hrs </th>
                    <th scope="">Plan Hrs </th>
                    <th scope="">Performance Hrs</th>
                  </tr>
                </thead>
              </table>
            </div>
            {/*End USERS Table */}

            {/*Start PLAN LIST ON */}
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
                          <Link to={"/add_plan"}>
                            <FaPlus />
                          </Link>
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
            {/*End PLAN LIST ON */}

            {/*Start Updates */}
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
            {/*Start Updates */}

            {/*Start CALENDAR */}
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
            {/*End CALENDAR */}
          </TabPanel>
          <TabPanel tabId="two">
          {/*Start Milestone Table */}
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
                </div>
                <div className="col-md-4">Milestone </div>
                <div className="col-md-4 ">
                  <div className="backbutton-blue">
                    <div className="right-top-btns">
                      <button className="client-hub-plus-buttons" title="Add Milestone">
                        <FaPlus />
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
          {/*End Milestone Table */}
          </TabPanel>
          <TabPanel tabId="three">
          {/*Start USERS Table */}
          <div className="col-md-12">
            <div className="followmebar">USERS </div>
            <table className="table border shadow">
              <thead className="thead-lite">
                <tr>
                  <th scope="">S.No</th>
                  <th scope="">Name</th>
                  <th scope="">Total Planned Hrs</th>
                  <th scope=""> Total Performed Hrs </th>
                  <th scope="">Plan Hrs </th>
                  <th scope="">Performance Hrs</th>
                </tr>
              </thead>
            </table>
          </div>
          {/*End USERS Table */}
          </TabPanel>
          <TabPanel tabId="four">
          {/*Start PLAN LIST ON */}
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
                        <Link to={"/add_plan"}>
                          <FaPlus />
                        </Link>
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
          {/*End PLAN LIST ON */}
          </TabPanel>
          <TabPanel tabId="five">
          {/*Start Updates */}
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
          {/*Start Updates */}
          </TabPanel>
          <TabPanel tabId="six">
          {/*Start CALENDAR */}
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
          {/*End CALENDAR */}
          </TabPanel>
        </div>
      </Tabs>
    </>
  );
};
export default MilestoneHub;
