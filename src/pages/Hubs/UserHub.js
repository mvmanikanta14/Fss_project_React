import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./clienthub.css";
import { Tabs, Tab, TabPanel, TabList } from "react-web-tabs";
import axios from "axios";
import { FaArrowLeft, FaPlus, FaHome } from "react-icons/fa";

const UserHub = () => {
  const [data, setdata] = useState([]);
  const [milistone, setMilistone] = useState([]);
  const [tid, setTid] = useState([]);

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

  useEffect(() => {
    axios
      .get("http://localhost:8000/ClientHub")
      .then((res) => {
        setMilistone(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  // function getid(id){
  //   console.log
  //   setTid(id)
  // }

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
              <Link className="svg-icon-height links-links" to={"/users"}>
                Users
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
          <div className="header-title"> User Hub :</div>
        </div>

        <div className="card ">
          <div className="hub_category">
            <TabList>
              <Tab title="All" id="1" name="" className="btn-new" tabFor="one">
                All
              </Tab>
              <Tab className="btn-new" tabFor="two">
                Assigment
              </Tab>

              <Tab className="btn-new" tabFor="five">
                {" "}
                Plans
              </Tab>
              <Tab className="btn-new" tabFor="six">
                {" "}
                Calender
              </Tab>
              <Tab className="btn-new" tabFor="seven">
                Download Pdf
              </Tab>
            </TabList>
          </div>

          <TabPanel tabId="two">
            {/*Start ASSIGNMENTS Table */}
            <div className="col-md-12">
              <div className="followmebar">
                <div className="row">
                  <div className="col-md-4"></div>{" "}
                  <div className="col-md-4">ASSIGNMENTS </div>
                  <div className="col-md-4">
                    <div className="backbutton-blue">
                      <div className="right-top-btns">
                        <button className="client-hub-plus-button" title="Add Assignment">
                          <Link to={"/add_assignment"}>
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
                    <th scope=""> Client-Assignment</th>
                    <th scope="">Total Planned Hrs</th>
                    <th scope="">Total Performed Hrs</th>
                    <th scope="">Planned Hrs Date </th>
                    <th scope="">Performed Hrs Date </th>
                    <th scope="">Due Date</th>
                    <th scope="">Due Status </th>
                  </tr>
                </thead>
                <tbody>
                  {data
                    ? data.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.Assignment}</td>
                            <td>{item.TotalPlannedHrs}</td>
                            <td>{item.TotalPerformedHrs}</td>
                            <td>{item.StartDate}</td>
                            <td>{item.EndDate}</td>
                            <td>{item.StartDate}</td>
                            <td>{item.Assignment}</td>
                          </tr>
                        );
                      })
                    : "No Data found"}
                </tbody>
              </table>
            </div>
            {/*End  ASSIGNMENTS Table */}
          </TabPanel>

          <TabPanel tabId="one">
            {/*Start ASSIGNMENTS Table */}
            <div className="col-md-12">
              <div className="followmebar">
                <div className="row">
                  <div className="col-md-4"></div>{" "}
                  <div className="col-md-4">ASSIGNMENTS </div>
                  <div className="col-md-4">
                    <div className="backbutton-blue">
                      <div className="right-top-btns">
                        <button className="client-hub-plus-button" title="Add Assignment">
                          <Link to={"/add_assignment"}>
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
                    <th scope=""> Client-Assignment</th>
                    <th scope="">Total Planned Hrs</th>
                    <th scope="">Total Performed Hrs</th>
                    <th scope="">Planned Hrs Date </th>
                    <th scope="">Performed Hrs Date </th>
                    <th scope="">Due Date</th>
                    <th scope="">Due Status </th>
                  </tr>
                </thead>
                <tbody>
                  {data
                    ? data.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.Assignment}</td>
                            <td>{item.TotalPlannedHrs}</td>
                            <td>{item.TotalPerformedHrs}</td>
                            <td>{item.StartDate}</td>
                            <td>{item.EndDate}</td>
                            <td>{item.StartDate}</td>
                            <td>{item.Assignment}</td>
                          </tr>
                        );
                      })
                    : "No Data found"}
                </tbody>
              </table>
            </div>
            {/*End  ASSIGNMENTS Table */}

            {/* PLAN LIST ON */}
            <div className="col-md-12">
              <div className="followmebar">
                <div className="row">
                  <div className="col-md-4 floatleft">
                    <label class="radio-inline">
                    <input type="radio" name="atype" autoComplete='off' />
                    OVERDATE{" "}
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
                    <th scope=""> Plan ID- Maker-Plan By-Ref By</th>
                    <th scope=""> Description-Client-Assignment-Milestone</th>
                    <th scope="">Planned Hrs </th>
                    <th scope="">Performed Hrs</th>
                  </tr>
                </thead>
                <tbody>
                  {data
                    ? data.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.id}</td>
                            <td>{item.Assignment}</td>
                            <td>{item.TotalPerformedHrs}</td>
                            <td>{item.PlannedHrs}</td>
                          </tr>
                        );
                      })
                    : "No Data found"}
                </tbody>
              </table>
            </div>
            {/*End  PLAN LIST ON */}
            {/* CALENDAR */}
            <div className="col-md-12">
              <div className="followmebar"> CALENDAR </div>
              <table className="table border shadow">
                <thead className="thead-lite">
                  <tr>
                    <th scope="">S.No</th>
                    <th scope="">Names</th>
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
                <tbody>
                  {data
                    ? data.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>PlannedHrs</td>
                            <td>{item.Assignment}</td>
                            <td>{item.TotalPerformedHrs}</td>
                            <td>{item.PlannedHrs}</td>
                            <td>{item.PlannedHrs}</td>
                            <td>{item.PlannedHrs}</td>
                            <td>{item.PlannedHrs}</td>
                            <td>{item.PlannedHrs}</td>
                            <td>{item.PlannedHrs}</td>
                            <td>{item.PlannedHrs}</td>
                            <td>{item.PlannedHrs}</td>
                            <td>{item.PlannedHrs}</td>
                          </tr>
                        );
                      })
                    : "No Data found"}
                </tbody>
              </table>
            </div>
          </TabPanel>

          {/* PLAN LIST ON */}
          <TabPanel tabId="five">
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
                    <th scope=""> Plan ID- Maker-Plan By-Ref By</th>
                    <th scope=""> Description-Client-Assignment-Milestone</th>
                    <th scope="">Planned Hrs </th>
                    <th scope="">Performed Hrs</th>
                  </tr>
                </thead>
                <tbody>
                  {data
                    ? data.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.id}</td>
                            <td>{item.Assignment}</td>
                            <td>{item.TotalPerformedHrs}</td>
                            <td>{item.PlannedHrs}</td>
                          </tr>
                        );
                      })
                    : "No Data found"}
                </tbody>
              </table>
            </div>
          </TabPanel>
          {/* CALENDAR */}
          <TabPanel tabId="six">
            <div className="col-md-12">
              <div className="followmebar"> CALENDAR </div>
              <table className="table border shadow">
                <thead className="thead-lite">
                  <tr>
                    <th scope="">S.No</th>
                    <th scope="">Names</th>
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
                <tbody>
                  {data
                    ? data.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>PlannedHrs</td>
                            <td>{item.Assignment}</td>
                            <td>{item.TotalPerformedHrs}</td>
                            <td>{item.PlannedHrs}</td>
                            <td>{item.PlannedHrs}</td>
                            <td>{item.PlannedHrs}</td>
                            <td>{item.PlannedHrs}</td>
                            <td>{item.PlannedHrs}</td>
                            <td>{item.PlannedHrs}</td>
                            <td>{item.PlannedHrs}</td>
                            <td>{item.PlannedHrs}</td>
                            <td>{item.PlannedHrs}</td>
                          </tr>
                        );
                      })
                    : "No Data found"}
                </tbody>
              </table>
            </div>
          </TabPanel>
          {/* </TabPanel> */}
        </div>
      </Tabs>
    </>
  );
};
export default UserHub;
