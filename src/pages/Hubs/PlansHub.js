import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  BsFillTrash3Fill,
  BsPencilSquare,
  BsFillArrowLeftSquareFill,
  BsFillHouseDoorFill,
} from "react-icons/bs";
import { FaArrowLeft, FaPlus, FaHome, FaPencilAlt } from "react-icons/fa";
import axios from "axios";

const PlansHub = () => {
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
      <div className="card margin-bottom">
            <div className="row">
              <div className="col-md-6 padding-left">
                <Link className="svg-icon-height" to={`/dashboard`}>
                  <FaHome />
                </Link>{" "}
              </div>
              <div className="col-md-6 text-rightss">
                <div className="">
                  <div className="">
                  <button title="My Plans" className="btnbtn-hover">
                    <Link className="links-links rwt__tab" to={"/my_plan"}>My Plans</Link> 
                    </button>
                  <button title="Add Plan" className="btnbtn-hover">
                  <Link className="links-links rwt__tab" to={"/add_plan"}> 
                  Add Plan
                  </Link>
                    </button>
                    <button title="Back" className="btnbtn-hover">
                      <FaArrowLeft />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="header-title"> Search Plan Report :</div>
          </div>
      <div className="card margin-bottom">
        <div className="body-form ">
          <div className="col-sm-12">
            <form
              // onSubmit={handleSubmit(onSubmit)}
              className="form-horizontal row"
            >
              <div className="form-group col-sm-4">
                <label htmlFor="name">Date</label>
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

              <div className="form-group col-sm-4">
                <label htmlFor="phoneNo">Est Hrs</label>
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

              <div className="form-group col-sm-4">
                <label htmlFor="fileNo">Maker</label>
                <input
                  type="text"
                  className="accordiantext"
                  placeholder="Enter Your File Number"
                  //   {...register("fileNo", { required: true })}
                />
                {/* {errors.fileNo && (
                              <span className="text-danger">
                                This is required
                              </span>
                            )} */}
              </div>

              <div className="form-group col-sm-4">
                <label htmlFor="fileNo">Attachment</label>
                <input
                  type="text"
                  className="accordiantext"
                  placeholder="Enter Your File Number"
                  //   {...register("fileNo", { required: true })}
                />
                {/* {errors.fileNo && (
                              <span className="text-danger">
                                This is required
                              </span>
                            )} */}
              </div>
              <div className="form-group col-sm-8">
                <label htmlFor="email">Description</label>
                <textarea
                  type="text"
                  className="accordiantext"
                  placeholder="Enter Description"
                  //   {...register("email", {
                  //     required: true,
                  //     pattern: /^\S+@\S+$/i,
                  //   })}
                />
                {/* {errors.email && (
                              <span className="text-danger">
                                This is required
                              </span>
                            )} */}
              </div>

              <div className="form-group col-sm-12 text-center mt-4">
                Given By : Mani
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="card">
        <h4 className="header-title">Performance</h4>
        <div className="body-form ">
          <table className="table border shadow">
            <thead className="thead-lite">
              <tr>
                <th scope="">S.No</th>
                <th scope="">Performed By</th>
                <th scope="">Performance Given By</th>
                <th scope="">Performance Date</th>
                <th scope="">Spent Hrs </th>
                <th scope="">Description-Attachment</th>
                <th scope="">Status</th>
                <th scope="">Action</th>
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
                        <td>{item.StartDate}</td>
                        <td>{item.PlannedHrs}</td>
                        <td>{item.AssignmentMilestone}</td>
                        <td>{item.Assignment}</td>
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
      </div>
    </>
  );
};
export default PlansHub;
