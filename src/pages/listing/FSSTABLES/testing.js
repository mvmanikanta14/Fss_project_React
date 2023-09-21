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

const TypeofLocationtest = () => {
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

  const [totalelements, setTotalElements] = useState("");
  const [offset, setOffset] = useState("");

  const [pageNumber, setPageNumber] = useState(1);
  const totalElements = totalelements; // Replace with your actual total element count
  const recordsPerPage = 5; // Replace with your desired records per page
  const [newOffset, setNewOffset] = useState(1);

  const handlePageChange = (newPageNumber) => {
    const newOffset = newPageNumber;
    console.log(newPageNumber, "newPageNumber");
    setPageNumber(newPageNumber);
    // const newOffset = (newPageNumber - 1) * recordsPerPage ; // Calculate the new offset for the selected page
    setNewOffset(newOffset);
    // getLocationlist();
  };
  // console.log(pageNumber)

  function getAllTypeofLocation() {
    CommonService.getAll(
      apiUrlsService.getAllTypeofLocation +
        "?deleted=false&offset=" +
        newOffset +
        "&limit=" +
        recordsPerPage
    ).then(
      (response) => {
        console.log(response, "response");
        if (response) {
          console.log(response.data.content, "yudgfydg");
          setTypeofLocation(response.data.content);
          setTotalElements(response.data.totalElements);
          setOffset(response.data.pageable.offset);
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
    getCityState(pincode);
    getLocationType();
    if (id) {
      setTitle("Update");
    }
  }, [newOffset]);

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

  const AddPopup = () => {
    // setPincode(""); // Reset pincode
    setCityNameP("");
    setStateNameP("");
    setTitle("Add"); // Set the form title to "Add"
    setId(""); // Clear the ID for adding
    setShow(true);
    reset();
  };

  const data = {};
  function deleteLocation(id) {
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
        console.log(response, "here pincode");
        if (response) {
          setPincode(response.data.content);
        }
      },
      (error) => {
        // Handle error
      }
    );
  }

  function getCityState(selectedPinCode) {
    console.log(selectedPinCode, "trtrtr");

    if (selectedPinCode) {
      CommonService.getAll(
        apiUrlsService.getPincodeById + selectedPinCode
      ).then(
        (response) => {
          console.log(response.data.length, "fafafa");
          if (response && response.data) {
            console.log(response, "response in getcityname");
            setCityNameP(response.data.cityName);
            setStateNameP(response.data.stateName);
            console.log(cityNameP, "cityNameP after update");
            console.log(stateNameP, "stateNameP after update");
            setValue("cityName", response.data.cityName);
            setValue("stateName", response.data.stateName);
          } else {
            setCityNameP(""); // Handle the case when no data is found
            setStateNameP("");
          }
        },
        (error) => {
          // Handle error
          console.error("Error fetching city and state data", error);
        }
      );
    } else {
      setCityNameP(""); // Handle the case when no pin code is selected
      setStateNameP("");
    }
  }

  function getLocationType() {
    CommonService.getAll(apiUrlsService.getAllTypeofArea).then(
      (response) => {
        console.log(response.data.content, "here setTypeOfArea");
        if (response) {
          setTypeOfArea(response.data.content);
        }
      },
      (error) => {
        // Handle error
      }
    );
  }
  const EditLocation = (id) => {
    console.log("EditLocation called with ID:", id); // Debugging

    // Find the item to edit based on its id
    const itemToEdit = typeoflocation.find((item) => item.id === id);

    if (itemToEdit) {
      setTitle("Edit");
      setId(id); // Set the ID for editing
      setShow(true); // Show the modal

      // Set values for other fields as needed
      setValue("pinCode", itemToEdit.pinCode.id);
      setValue("cityName", itemToEdit.cityName);
      setValue("stateName", itemToEdit.stateName);
      setValue("locationType", itemToEdit.locationType.id);
      setValue("address", itemToEdit.address);
    }
  };

  const onSubmit = (newdata) => {
    // console.log(editData.id,"whilke updating")
    console.log(newdata, "add data");
    let area_id = "";
    let pin_id = "";
    area_id = newdata["locationType"];
    pin_id = newdata["pinCode"];
    newdata["locationType"] = { id: area_id };
    newdata["pinCode"] = { id: pin_id };

    console.log(newdata, "after data");
    if (!ids) {
      CommonService.add(apiUrlsService.addTypeofLocation, newdata).then(
        (response) => {
          console.log(response.data, "response after adding");
          if (response) {
            setTypeofLocation([...typeoflocation, response.data]);
            swal("Success", " Added succesfully..!", "success");
            reset();
            handleClose();
            getAllTypeofLocation();
            console.log(response.data, "mani");
          }
        },
        (error) => {
          console.log("not able to add ");
          if (error.response && error.response.status === 403) {
            // EventBus.dispatch("logout");
          }
        }
      );
    } else {
      console.log(newdata, "inside edit");
      newdata.id = ids;
      CommonService.patch(
        apiUrlsService.updateTypeofLocation + ids,
        newdata
      ).then(
        (response) => {
          if (response) {
            const updatedTypeoflocation = typeoflocation.map((item) =>
              item.id === editData.id ? response.data : item
            );
            setTypeofLocation(updatedTypeoflocation);
            swal("Success", " Updated succesfully..!", "success");

            handleClose();
            reset();
            getAllTypeofLocation();
          }
        },
        (error) => {
          if (error.response && error.response.status === 403) {
            console.log("error");
            // EventBus.dispatch("logout");
          }
        }
      );
    }
    reset();
  };

  const handleClose = () => {
    setTitle("Add"); // Reset the form title
    setId(""); // Reset the ID
    setShow(false);
    reset(); // Reset the form values
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
                    onClick={AddPopup}
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
                                    onChange={(e) => {
                                      const selectedPinCode = e.target.value;
                                      console.log(selectedPinCode, "reerre");
                                      setValue("pinCode", selectedPinCode);
                                      getCityState(selectedPinCode); // Call getCityState with the selected pin code
                                    }}
                                  >
                                    <option value="">---Select----</option>
                                    {pincode &&
                                      pincode.map((h, i) => (
                                        <option key={i} value={h.id}>
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
                                    value={cityNameP}
                                  />
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
                                  />
                                </div>

                                <div className="col-md-4 text-left mt-1 ">
                                  <label className="">
                                    Type Of Area{" "}
                                    <span className="text-danger">*</span>
                                  </label>

                                  <select
                                    className="accordiantext"
                                    {...register("locationType", {
                                      required: true,
                                    })}
                                    // value={watch("typeOfArea")} // Get the selected value from the form
                                    onChange={(e) => {
                                      const selectedTypeOfArea = e.target.value;
                                      if (selectedTypeOfArea) {
                                        setValue(
                                          "locationType",
                                          selectedTypeOfArea
                                        ); // Update the form value
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
                                    }
                                    // Set initial value based on editData
                                  />
                                  {errors.address && (
                                    <span className="text-danger">
                                      This is required
                                    </span>
                                  )}
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
                          const sNo =
                            pageNumber * recordsPerPage -
                            recordsPerPage +
                            index +
                            1;
                          return (
                            <tr key={item.index}>
                              <td>{sNo}</td>
                              <td>
                                {" "}
                                <Link>{item.pinCode.cityName}</Link>
                              </td>
                              <td>{item.pinCode.stateName}</td>
                              <td>{item.locationType.name}</td>
                              <td>{item.locationId}</td>
                              <td>{item.address}</td>
                              <td>{item.pinCode.pinCode}</td>
                              <td>
                                <>
                                  <button
                                    className="Edit-blueScreen"
                                    title="Edit"
                                    onClick={() => EditLocation(item.id)}
                                  >
                                    <FaPencilAlt className="pencil" />
                                  </button>
                                  &nbsp;
                                  <button
                                    className="delete-greenScreen"
                                    title="Delete"
                                    onClick={() => deleteLocation(item.id)}
                                  >
                                    <FaTimes className="pencil" />
                                  </button>
                                </>
                              </td>
                            </tr>
                          );
                        })
                    : ""}
                </tbody>
              </table>
            </div>
            <div className="row">
              <div className="col-md-6">
                <Pagination
                  offset={offset}
                  totalElements={totalElements}
                  recordsPerPage={recordsPerPage}
                  pageNumber={pageNumber}
                  onPageChange={handlePageChange}
                />
              </div>
              <div className="col-md-6">
              <h7 className="float-right">
              Showing{" "}
        {(newOffset - 1) * recordsPerPage + 1} to{" "}
        {totalElements < newOffset * recordsPerPage
          ? totalElements
          : newOffset * recordsPerPage}{" "}
        of {totalElements} entries
                </h7>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TypeofLocationtest;
