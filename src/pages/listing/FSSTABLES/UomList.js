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
import Pagination from "./Pagination";

const UOMList = () => {
  const [uomlist, setUoMList] = useState([]);
  const [title, setTitle] = useState("Add");
  const [editData, setEditData] = useState([""]);
  const [ids, setId] = useState(""); // ID for editing
  const { id } = useParams();
  const [totalelements,setTotalElements] = useState("")
  const [offset, setOffset] = useState("")
  const [uomtype ,  setUoMType] = useState();


  const [pageNumber, setPageNumber] = useState(1);
  const totalElements = totalelements; // Replace with your actual total element count
  const recordsPerPage = 5; // Replace with your desired records per page
  const [newOffset, setNewOffset] = useState(1);
  
  const handlePageChange = (newPageNumber) => {
    setPageNumber(newPageNumber);
    // const newOffset = (newPageNumber - 1) * recordsPerPage;
    // Calculate the new offset for the selected page
    setNewOffset(newPageNumber-1)
  
    // Make an API request to fetch data for the new page
    getLocationlist();
  };
  // console.log(pageNumber)

  function getLocationlist() {
    
    const url = apiUrlsService.getAllUomList +"?deleted=false"
    // console.log(url)
    CommonService.getAll(url).then(
      (response) => { //console.log(response.data.pageable.offset, "mani")
        if (response) {
            // console.log(response.data.content,"data")
            setUoMList(response.data.content);
            setTotalElements(response.data.totalElements)
            setOffset(response.data.pageable.offset)
        }
      },
      (error) => {
        // Handle error
      }
    );
  }
  // console.log(totalelements)

  function getUoMType() {
    CommonService.getAll(apiUrlsService.getAllUoMType).then((response) => {
      if (response) {
        setUoMType(response.data.content);
      }
    });
  }

  useEffect(() => {
    getLocationlist();
    getUoMType();
    if (id) {
      setTitle("Update");
      getTypeofLocationDetails(id);
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

  function getTypeofLocationDetails(id) {
    CommonService.getById(apiUrlsService.getTypeofLocationById + id).then(
      (response) => {
        if (response) {
          setValue("cityName", response.data.cityName);
          setValue("stateName", response.data.stateName);
          setValue("typeOfArea", response.data.typeOfArea);
          setValue("address", response.data.address);
          setValue("pinCode", response.data.pinCode);
        }
      }
    );
  }
  //   const handleClose = () => setShow(false);
  const handleShow = () => {
    reset();
    setTitle("Add"); // Set the form title to "Add"
    setId(""); // Clear the ID for adding
    setShow(true);
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
        console.log(data,"datata")
         CommonService.patch(apiUrlsService.patchUoMList + id, data).then(
        (response) => {
          if (response) {
            swal("Success", " deleted succesfully..!", "success");
            console.log(response,"response")
            getLocationlist();
          }
        }
      );
    }
  }

  const onSubmit = (data) => {
//    console.log(data,"this is add or edit data")

   let UoMtype_id = "";
   UoMtype_id= data["uomType"]
   data["uomType"] = {"id":UoMtype_id}

    if (!ids) { 
      CommonService.add(apiUrlsService.addUoMList, data).then(
        (response) => { // console.log(response, "veera")
          if (response) {   console.log(response.data,"response after adding")
            setUoMList([...uomlist, response.data]);
            swal("Success", " added successfully..!", "success");
            reset();
            handleClose();
            setPageNumber(1); // Reset page number to 1
            getUoMType();
            // console.log(response.data, "mani");
          }
        },
        (error) => {
          if (error.response && error.response.status === 403) {
            // EventBus.dispatch("logout");
          }
        }
      );
    } else {
         console.log(data, "whilke updating");
      data.id = editData.id;
      CommonService.patch(
        apiUrlsService.patchUoMList + editData.id,
        data
      ).then(
        (response) => {
          if (response) {
            const updatedLocation = uomlist.map((item) =>
              item.id === editData.id ? response.data : item
            );
            setUoMList(updatedLocation);
            swal("Success", " Updated succesfully..!", "success");
            handleClose();
            reset();
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


  // Function to handle "Edit" button click
  const handleShowEdit = (id) => {
    // Find the item to edit based on its id
    const itemToEdit = uomlist.find((item) => item.id === id);

    if (itemToEdit) {
      // Set the editData state with the item data
      setEditData(itemToEdit);
    //   console.log(itemToEdit, "this is the id for edit");
      setTitle("Edit"); // Set the form title to "Edit"
      setId(itemToEdit.id); // Set the ID for editing
      setShow(true); // Show the modal
      reset();
    }
  };

  const handleClose = () => {
    setEditData(null); // Reset editData
    setTitle("Add"); // Reset the form title
    setId(""); // Reset the ID
    setShow(false);
  };

  
  // console.log(offset,"offsetffdgrfg")

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
                  UoM List
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
            <div className="header-title">UoM List</div>
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
                        <h6 className="mb-1 mt-2">UoM List</h6>
                      </Modal.Header>

                      <Modal.Body className="custom-modal-body">
                        <div className="p-0 border modalstart">
                          <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="formtext modalform"
                          >
                            <div className="container">
                              <div className="row pt-1 mt-1">
                                <div className="col-md-4 text-left mt-1 ">
                                  <label className="">
                                    Name
                                    <span className="text-danger">*</span>
                                  </label>

                                  <input
                                    type="text"
                                    placeholder=" "
                                    className="accordiantext"
                                    {...register("name", {
                                      required: true,
                                    })}
                                    defaultValue={
                                      editData ? editData.name : ""
                                    } // Set initial value based on editData
                                  />
                                  {/* {errors.name && (
                                    <span className="text-danger">
                                      This is required
                                    </span>
                                  )} */}
                                </div>

                                <div className="col-md-4 text-left mt-1 ">
                                  <label className="">
                                  Standard Unit Conversion Value
                                    <span className="text-danger">*</span>
                                  </label>

                                  <input
                                    type="text"
                                    placeholder=" "
                                    className="accordiantext"
                                    {...register("standardUnitConversionValue", {
                                      required: true,
                                    })}
                                    defaultValue={
                                      editData ? editData.name : ""
                                    } // Set initial value based on editData
                                  />
                                  {/* {errors.name && (
                                    <span className="text-danger">
                                      This is required
                                    </span>
                                  )} */}
                                </div>


                                <div className="col-md-4 text-left mt-1">
                                  <label className="">
                                    Description
                                    <span className="text-danger">*</span>
                                  </label>

                                  <input
                                    type="text"
                                    placeholder=" "
                                    className="accordiantext"
                                    {...register("description", {
                                      required: true,
                                    })}
                                    defaultValue={
                                      editData ? editData.description : ""
                                    } // Set initial value based on editData
                                  />
                                  {/* {errors.description && (
                                    <span className="text-danger">
                                      This is required
                                    </span>
                                  )} */}
                                </div>

                                <div className="col-md-4 text-left">
                                    <label className="">
                                    UoM Type
                                        <span className="text-danger">*</span>
                                    </label>
                                    <select
                                        {...register("uomType")}
                                        className="accordiantext bg-white"
                                        autoComplete="off"
                                    >
                                        <option value="">---Select----</option>
                                        {uomtype &&
                                        uomtype.map((h, i) => (
                                            <option key={i} value={h.id}>
                                            {h.name}
                                            </option>
                                        ))}
                                    </select>
                                    {/* {errors.uomType && (
                                        <span className="text-danger">This is required</span>
                                    )} */}
                                    </div>
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
                    <th scope="col">S No</th>
                    <th scope="col">Name</th>
                    <th scope="col">Standard Unit Conversion Value</th>
                    <th scope="col">Description</th>
                    <th scope="col">Uom Type</th>
                   
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody className="table-bordered tbclass">
                  {uomlist
                    ? uomlist
                        .slice()
                        .reverse()
                        .map((item, index) => {
                          const sNo = (pageNumber - 1) * recordsPerPage + (index + 1);
                          return (
                            <tr key={item.index}>
                              <td>{sNo}</td>
                              <td>
                               {item.name}
                              </td>
                              <td>{item.standardUnitConversionValue}</td>
                              <td>{item.description}</td>
                              <td>{item.uomType.name}</td>
                             
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
            {/* <div className="col-md-12">
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
            </div> */}
            <Pagination
              
               offset={offset}
               totalElements={totalElements}
               recordsPerPage={recordsPerPage}
               pageNumber={pageNumber}
               onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default UOMList;
