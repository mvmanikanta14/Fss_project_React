import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BiSort } from "react-icons/bi";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import axios from "axios";
import apiUrlsService from "../../../services/apiUrls.service";
import CommonService from "../../../services/common.service";
import swal from "sweetalert";
import Loader from "../../../Loader";
import { FaArrowLeft, FaPlus, FaHome } from "react-icons/fa";
import { Modal, Button } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

const TypeofLocation = () => {
  const [typeoflocation, setTypeofLocation] = useState([]);
  const [title, setTitle] = useState("Add");
  const [editData, setEditData] = useState([]);
  const [ids, setId] = useState(""); // ID for editing
  const { id } = useParams();
  const [pincode, setPincode] = useState();
  const [TypeofArea, setTypeOfArea] = useState();

  const [pcs, setPCS] = useState();

  const [stateNameP, setStateNameP] = useState("");
  const [cityNameP, setCityNameP] = useState("");
  

  const navigate = useNavigate();

  //   function deleteClient(id) {
  //     CommonService.deleteById(apiUrlsService.deleteClient + id).then(
  //       (response) => {
  //         if (response) {
  //           swal("Success", "Client deleted succesfully..!", "success");
  //           getAllClients();
  //         }
  //       }
  //     );
  //   }

  function getAllTypeofLocation() {
    CommonService.getAll(apiUrlsService.getAllTypeofLocation+"?deleted=false").then(
      (response) => {
        if (response) {
          console.log(response.data.content,"yudgfydg")
          setTypeofLocation(response.data.content);
        }
      },
      (error) => {
        // Handle error
      }
    );
  }

  useEffect(() => {
    getAllTypeofLocation();
    getAllPincode();
    getAllPCS();
    getAllTypeofArea();
    if (id) {
      setTitle("Update");
    
    }
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm({
    mode: "onChange",
  });

  const [show, setShow] = useState(false);

  //   const handleChanges = (event) => {
  //     setStatus(event.target.value);
  //   };

  
  //   const handleClose = () => setShow(false);
  const handleShow = () => {
    // reset()
    
    setCityNameP("")
    setStateNameP("")
    setTitle("Add"); // Set the form title to "Add"
   
    setId(""); // Clear the ID for adding
    setShow(true);
    reset();
  };

  //   function handleShowedit(id) {
  //     console.log(id,"this is the id of edit")
  //     getAssignmentDetails(id)

  //     setShow(true)
  //   }

  const data = {};
  function handleRemove(id) {
    const shouldRemove = window.confirm("Are You Sure?");
    if (shouldRemove) {
      data["deleted"] = "true";
      console.log("data", data);
      CommonService.patch(apiUrlsService.updateTypeofLocation + id, data).then(
        (response) => {
          if (response) {
            swal("Success", " deleted succesfully..!", "success");
            getAllTypeofLocation();
          }
        }
      );
    }
  }

  function getAllPincode() {
    CommonService.getAll(apiUrlsService.getAllPincode).then(
      (response) => { 
        // console.log(response, "here pincode")
        if (response) {

          setPincode(response.data);
          
        }
      },
      (error) => {
        // Handle error
      }
    );
  }

  function getAllPCS(id) {
    const cityNameP = ""
    const stateNameP = ""
    
    console.log(cityNameP,"pinc")
    console.log(stateNameP,"pinc")
    CommonService.getAll(apiUrlsService.getPincodeById + id).then(
      (response) => {  console.log(response, "maniasdasd")
        if (response) { console.log(response.data[0].cityName, "mani")
          // setPCS(response.data);
          setCityNameP(response.data[0].cityName);
          setStateNameP(response.data[0].stateName);
          
          
          
        }
        
      },
      (error) => {
        // Handle error
      }
    );
    
    
  }
  // console.log(cityNameP,"cityNameP")
  function getAllTypeofArea() {
    CommonService.getAll(apiUrlsService.getAllTypeofArea).then(
      (response) => { 
        console.log(response.data.content, "here setTypeOfArea")
        if (response) {

          setTypeOfArea(response.data.content);
          
        }
      },
      (error) => {
        // Handle error
      }
    );
  }
  const handleShowEdit = (id) => {

    // Find the item to edit based on its id
    const itemToEdit = typeoflocation.find((item) => item.id === id);
    console.log(itemToEdit,"before")
    // getAllPCS(itemToEdit.pinCode.id)
    // console.log(itemToEdit,"after")
    
   
    
    if (itemToEdit) {
      // Set the {edit}Data state with the item data
       setEditData(itemToEdit);
       console.log(itemToEdit.pinCode, "this is the id for edit");
       setTitle("Edit");
      //  setPincode(itemToEdit.pinCode)
       setCityNameP(itemToEdit.cityName);
       setStateNameP(itemToEdit.stateName);
       // Set the form title to "Edit"
      setId(itemToEdit.id); // Set the ID for editing
      setShow(true); // Show the modal
      // Set values for other fields as needed
      // reset();
    }
  };


  const onSubmit = (newdata) => {
    // console.log(editData.id,"whilke updating")
    console.log(cityNameP,"add data")
    let area_id = "";
    let pin_id = "";
    area_id = newdata["typeOfArea"]
    pin_id = newdata["pinCode"]
    newdata["typeOfArea"] = {"id":area_id}
    newdata["pinCode"] = {"id":pin_id}

    console.log(newdata,"after data")
    if (!ids) {
      
      CommonService.add(apiUrlsService.addTypeofLocation, newdata).then(
        (response) => {  console.log(response.data,"response after adding")
          if (response) {
           
            setTypeofLocation([...typeoflocation, response.data]);
            swal("Success", "Assignment added succesfully..!", "success");
            reset();
            handleClose();

            console.log(response.data, "mani");
          }
        },
        (error) => {console.log("not able to add ")
          if (error.response && error.response.status === 403) {
            // EventBus.dispatch("logout");
          }
        }
      );
    } else {
      console.log(newdata,"inside edit")
      newdata.id = editData.id;
      CommonService.patch(
        apiUrlsService.updateTypeofLocation + editData.id,
        newdata
      ).then(
        (response) => {
          if (response) {
            const updatedTypeoflocation = typeoflocation.map((item) =>
              item.id === editData.id ? response.data : item
            );
            setTypeofLocation(updatedTypeoflocation);
            swal("Success", "Assignment Updated succesfully..!", "success");
            
            handleClose();
            reset();
            getAllTypeofLocation();
          }
        },
        (error) => {
          if (error.response && error.response.status === 403) {
            // EventBus.dispatch("logout");
          }
        }
      );
    }
    reset();
  };

  //   const handleShow = () => {
  //     setTitle("Add"); // Set the form title to "Add"
  //     setId(""); // Clear the ID for adding
  //     setShow(true);
  //   };

  // Function to handle "Edit" button click
  
  // console.log(cityNameP,"cityNameP");
  // console.log(stateNameP,"stateNameP")

  const handleClose = () => {
    setEditData(null); // Reset editData
    setTitle("Add"); // Reset the form title
    setId(""); // Reset the ID
    setShow(false);
    reset();
  };
  
  return (
    <>
      <div className="container-fluid pl-2 pr-2">
        <div className="row">
          <div className="col-md-12 bg-white bordered headerdiv">
            <div className="row">
              <div className="col-md-6 padding-left">
                <Link className="svg-icon-height bread" to={`/dashboard`}>
                  <FaHome />
                </Link>{" "}
                /{" "}
                <Link className="svg-icon-height bread" to={"/settings"}>
                  Location List
                </Link>{" "}
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
            <div className="header-title">Location List</div>
          </div>

          <div className="col-md-12 border bg-white pb- pt-2 mt-3 mb-4 pl-0 pr-0 rounded">
            <div className="col-md-12">
              <form className="text-right formtext p-0 mr-0">
                <>
                  <button
                    type="button"
                    className="ml-2 Addbutton"
                    title="Add  Checklist "
                    onClick={handleShow}
                    
                  >
                    
                    ADD
                  </button>

                  <div className="model_box">
                    <Modal
                      show={show}
                      onHide={handleClose}
                      centered
                      size="xl"
                      backdrop="static"
                      aria-labelledby="contained-modal-title-vcenter"
                      ClassName="modalcustomise"
                    >
                      <Modal.Header closeButton className="border-0">
                        <h6 className="mb-1 mt-2">Location List</h6>
                      </Modal.Header>

                      <Modal.Body className="custom-modal-body">
                        <div className="p-0 border modalstart">
                          <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="formtext modalform"
                          >
                            <div className="container">
                              <div className="row pt-1 mt-1">

                              <div className="col-md-4 text-left">
                                  <label className="">
                                   PinCode
                                    <span className="text-danger">*</span>
                                  </label>
                                  <select
                                          className="accordiantext"
                                          {...register("pinCode", { required: true })}
                                          defaultValue={editData && editData.pinCode ? editData.pinCode.id : ""}

                                          onChange={async (e) => {
                                            const selectedPinCode = e.target.value;
                                            if (selectedPinCode) { console.log(selectedPinCode,"saasas")
                                              getAllPCS(selectedPinCode);
                                              
                                             
                                            }
                                          }}
                                        >
                                    <option value="">---Select----</option>
                                    {pincode &&
                                      pincode.map((h, i) => (
                                        <option key={i} value={h.id}
                                        
                                        >
                                          {h.pinCode}
                                        </option>
                                      ))}
                                  </select>
                                   {/* {errors.pinCode && (
                                    <span className="text-danger">
                                      This is required
                                    </span>
                                  )} */}
                                </div>

                                <div className="col-md-4 text-left mt-1 ">
                                  <label className="">
                                    City Name{" "}
                                    <span className="text-danger">*</span>
                                  </label>
                                  <input
                                        type="text"
                                        placeholder=""
                                        readOnly
                                        className="accordiantext"
                                        {...register("cityName", {
                                          required: true,
                                        })}
                                        
                                        // value={stateName} // Use the state value
                                        value={cityNameP}

                                        
                                      />
                                  {/* {errors.cityName && (
                                    <span className="text-danger">
                                      This is required
                                    </span>
                                  )} */}
                                </div>

                                <div className="col-md-4 text-left mt-1">
                                  <label className="">
                                    State Name{" "}
                                    <span className="text-danger">*</span>
                                  </label>

                                  <input
                                    type="text"
                                    readOnly
                                    placeholder=""
                                    className="accordiantext"
                                    {...register("stateName", {
                                      required: true,
                                    })}
                                    value={stateNameP}
                                    // Set initial value based on editData
                                    
                                    />
                                 
                                  {/* {errors.stateName && (
                                    <span className="text-danger">
                                      This is required
                                    </span>
                                  )} */}
                                </div>

                                <div className="col-md-4 text-left mt-1 ">
                                  <label className="">
                                    Type Of Area{" "}
                                    <span className="text-danger">*</span>
                                  </label>

                                  <select
                                          className="accordiantext"
                                          {...register("typeOfArea", { required: true })}
                                          defaultValue={editData && editData.typeOfArea ? editData.typeOfArea.id : ""}
                                          
                                          onChange={async (e) => {
                                            const selectedType = e.target.value;
                                            if (selectedType) { console.log(selectedType,"saasas")
                                            getAllTypeofArea(selectedType);
                                             
                                            }
                                          }}
                                        >
                                    <option value="">---Select----</option>
                                    {TypeofArea &&
                                      TypeofArea.map((h, i) => (
                                        <option key={i} value={h.id}>
                                          {h.name}
                                        </option>
                                      ))}
                                  </select>
                                  {/* {errors.typeOfArea && (
                                    <span className="text-danger">
                                      This is required
                                    </span>
                                  )} */}
                                </div>

                                <div className="col-md-4 text-left mt-1 ">
                                  <label className="">
                                    Address{" "}
                                    <span className="text-danger">*</span>
                                  </label>

                                  <input
                                    type="text"
                                    placeholder=""
                                    className="accordiantext"
                                    {...register("address", { required: true })}
                                    defaultValue={
                                      editData ? editData.address : ""
                                    } // Set initial value based on editData
                                  />
                                  {errors.address && (
                                    <span className="text-danger">
                                      This is required
                                    </span>
                                  )}
                                </div>

                                {/* <div className="col-md-4 text-left mt-1 ">
                                  <label className="">
                                    PinCode{" "}
                                    <span className="text-danger">*</span>
                                  </label>

                                  <input
                                    type="text"
                                    placeholder=""
                                    className="accordiantext"
                                    {...register("pinCode", { required: true })}
                                    defaultValue={editData ? editData.pinCode : ""} // Set initial value based on editData
                                    />
                                  {errors.pinCode && (
                                 <span className="text-danger">This is required</span>
                                      )}
                                </div> */}

                              

                                <div className="col-md-12">
                                  <button className="float-right mt-1 text-white accordianbutton">
                                    {title}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </Modal.Body>
                    </Modal>
                  </div>
                </>
              </form>
            </div>

            <div className="col-md-12 pt-0">
              <table className="border table-striped ttable">
                <thead className="thclass">
                  <tr>
                    <th>S.No</th>
                    <th>City Name</th>
                    <th>State Name</th>
                    <th>Type of Area</th>
                    <th>Location Id</th>
                    <th>Address</th>
                    <th>PinCode</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody className="table-bordered tbclass">
                  {typeoflocation
                    ? typeoflocation
                        .slice()
                        .reverse()
                        .map((item, index) => {
                          return (
                            <tr key={item.index}>
                              <td>{index + 1}</td>
                              <td>
                                {" "}
                                <Link>{item.cityName}</Link>
                              </td>
                              <td>{item.stateName}</td>
                              <td>{item.typeOfArea.name}</td>
                              <td>{item.locationId}</td>
                              <td>{item.address}</td>
                              <td>{item.pinCode.pinCode}</td>
                              <td>
                                <>
                                  <button
                                    className="Edit-blueScreen"
                                    title="Edit"
                                    onClick={() => handleShowEdit(item.id)}
                                  >
                                    <FaPencilAlt className="pencil" />
                                  </button>
                                  &nbsp;
                                  <button
                                    className="delete-greenScreen"
                                    title="Delete"
                                    onClick={() => handleRemove(item.id)}
                                  >
                                    <FaTimes className="pencil" />
                                  </button>
                                </>

                                {/* <button
                          className="Mark-as-Inactive-checkbutton-blueScreen"
                          title="Mark as Active"
                        //   onClick={() => handleMarkAsActive(item.id)}
                        >
                          <FaCheck />
                        </button> */}
                              </td>
                            </tr>
                          );
                        })
                    : ""}
                </tbody>
              </table>
            </div>
            <div className="col-md-12">
              <div className="mt-3">
                <h7>Showing 1 to 10 of 10 entries</h7>

                <nav
                  aria-label="Page navigation example"
                  className=" float-right"
                >
                  <ul class="pagination">
                    <li class="page-item">
                      <a class="page-link" href="#">
                        Previous
                      </a>
                    </li>

                    <li class="page-item active ">
                      <a class="page-link" href="#">
                        1
                      </a>
                    </li>

                    <li class="page-item ">
                      <a class="page-link" href="#">
                        2
                      </a>
                    </li>

                    <li class="page-item">
                      <a class="page-link" href="#">
                        3
                      </a>
                    </li>

                    <li class="page-item disabled">
                      <a class="page-link" href="#">
                        4
                      </a>
                    </li>

                    <li class="page-item">
                      <a class="page-link" href="#">
                        5
                      </a>
                    </li>

                    <li class="page-item">
                      <a class="page-link" href="#">
                        Next
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TypeofLocation;
