import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./clienthub.css";
import { Tabs, Tab, TabPanel, TabList } from "react-web-tabs";
import axios from "axios";
import { FaPlus, FaHome, FaArrowLeft } from "react-icons/fa";

const DateHub = () => {
  const [data, setdata] = useState([]);
  const [milistone, setMilistone] = useState([]);
  const [tid, setTid] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/ClientHub")
      .then((res) => {
        setdata(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  useEffect(() => {
    axios
      .get("http://localhost:8000/CommonAll")
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
  const handleDownload = () => {
    const pdfPath = process.env.PUBLIC_URL + '/sample.pdf';
    const link = document.createElement('a');
    link.href = pdfPath;
    link.download = 'sample.pdf';
    link.click();
  };
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
              <Link className="svg-icon-height links-links" to={""}>
                DateHub
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
          <div className="header-title"> Date Hub :</div>
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
              <Tab className="btn-new" tabFor="three">
                {" "}
                Milestone
              </Tab>
              <Tab className="btn-new" tabFor="four">
                {" "}
                User
              </Tab>
              <Tab className="btn-new" tabFor="five">
                {" "}
                Plans
              </Tab>
              <Tab className="btn-new" tabFor="six">
                {" "}
                Calender
              </Tab>
              <Tab className="btn-new" tabFor="seven" onClick={handleDownload}>
                Download Pdf
              </Tab>
            </TabList>
          </div>

          <TabPanel tabId="one">
            {/*Start ASSIGNMENTS Table */}
            <div className="col-md-12">
              <div className="followmebar">
                <div className="row">
                  <div className="col-md-4 floatleft"></div>
                  <div className="col-md-4">Assignment </div>
                  <div className="col-md-4 ">
                    <div className="backbutton-blue">
                      <div className="right-top-btns">
                        <button
                          className="client-hub-plus-button"
                          title="Add Assignment"
                        >
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
                    <th scope="">Planned Hrs for the Date </th>
                    <th scope="">Performed Hrs for the Date</th>
                    <th scope="">Due Status</th>
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
                            <td>{item.PlannedHrs & item.StartDate}</td>
                            <td>{item.PlannedHrs & item.StartDate}</td>
                            <td>{item.Assignment}</td>
                          </tr>
                        );
                      })
                    : "No Data found"}
                </tbody>
              </table>
            </div>
            {/*End  ASSIGNMENTS Table */}
            {/* Milestone Table */}

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
                        <button
                          className="client-hub-plus-button"
                          title="Add Milestone"
                        >
                          <Link to={"/add_milestone"}>
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
                    <th scope="">Name</th>
                    <th scope=""> Client-Assignment</th>
                    <th scope=""> Engagement Partner</th>
                    <th scope=""> Over Due </th>
                  </tr>
                </thead>
                <tbody>
                  {milistone
                    ? milistone.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.Assignment}</td>
                            <td>{item.Assignment}</td>
                            <td>{item.Assignment}</td>
                            <td>{item.Assignment}</td>
                          </tr>
                        );
                      })
                    : "No Data found"}
                </tbody>
              </table>
            </div>

            {/* USERS Table */}
            <div className="col-md-12">
              <div className="followmebar">USERS </div>
              <table className="table border shadow">
                <thead className="thead-lite">
                  <tr>
                    <th scope="">S.No</th>
                    <th scope="">Name</th>
                    <th scope="">Total Planned Hrs</th>
                    <th scope=""> Total Performed Hrs </th>
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
                          </tr>
                        );
                      })
                    : "No Data found"}
                </tbody>
              </table>
            </div>

            {/* PLAN LIST ON */}
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
                        <button
                          className="client-hub-plus-button"
                          title="Add Plan"
                        >
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

                    <th scope="">Planned Hrs</th>
                    <th scope="">Performed Hrs</th>
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

                            <td>{item.PlannedHrs}</td>
                            <td>{item.PlannedHrs}</td>
                          </tr>
                        );
                      })
                    : "No Data found"}
                </tbody>
              </table>
            </div>
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

          <TabPanel tabId="two">
            {/*Start ASSIGNMENTS Table */}
            <div className="col-md-12">
              <div className="followmebar">
                <div className="row">
                  <div className="col-md-4 floatleft"></div>
                  <div className="col-md-4">Assignment </div>
                  <div className="col-md-4 ">
                    <div className="backbutton-blue">
                      <div className="right-top-btns">
                        <button
                          className="client-hub-plus-button"
                          title="Add Assignment"
                        >
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
                    <th scope="">Planned Hrs for the Date </th>
                    <th scope="">Performed Hrs for the Date</th>
                    <th scope="">Due Status</th>
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
                            <td>{item.PlannedHrs & item.StartDate}</td>
                            <td>{item.PlannedHrs & item.StartDate}</td>
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
          {/* Milestone Table */}
          <TabPanel tabId="three">
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
                        <button
                          className="client-hub-plus-button"
                          title="Add Milestone"
                        >
                          <Link to={"/add_milestone"}>
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
                    <th scope="">Name</th>
                    <th scope=""> Client-Assignment</th>
                    <th scope=""> Engagement Partner</th>
                    <th scope=""> Over Due </th>
                  </tr>
                </thead>
                <tbody>
                  {milistone
                    ? milistone.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.Assignment}</td>
                            <td>{item.Assignment}</td>
                            <td>{item.Assignment}</td>
                            <td>{item.Assignment}</td>
                          </tr>
                        );
                      })
                    : "No Data found"}
                </tbody>
              </table>
            </div>
          </TabPanel>

          {/* USERS Table */}
          <TabPanel tabId="four">
            <div className="col-md-12">
              <div className="followmebar">USERS </div>
              <table className="table border shadow">
                <thead className="thead-lite">
                  <tr>
                    <th scope="">S.No</th>
                    <th scope="">Name</th>
                    <th scope="">Total Planned Hrs</th>
                    <th scope=""> Total Performed Hrs </th>
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
                        <button
                          className="client-hub-plus-button"
                          title="Add Plan"
                        >
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

                    <th scope="">Planned Hrs</th>
                    <th scope="">Performed Hrs</th>
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
        </div>
      </Tabs>
    </>
  );
};
export default DateHub;
