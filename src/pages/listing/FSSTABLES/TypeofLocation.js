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
  const [checklist, setClients] = useState([]);
  const [title, setTitle] = useState("Add");
  const [editData, setEditData] = useState([]);
  const [ids, setId] = useState(""); // ID for editing
  const { id } = useParams();

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

  function getAllClients() {
    CommonService.getAll(apiUrlsService.getAllClients).then(
      (response) => {
        if (response) {
          setClients(response.data);
        }
      },
      (error) => {
        // Handle error
      }
    );
  }

  useEffect(() => {
    getAllClients();
    if (id) {
        setTitle("Update");
        getAssignmentDetails(id);
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


  function getAssignmentDetails(id) {
    CommonService.getById(apiUrlsService.getClientById + id).then(
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
    setTitle("Add"); // Set the form title to "Add"
    setId(""); // Clear the ID for adding
    setShow(true);
  };
  
//   function handleShowedit(id) {
//     console.log(id,"this is the id of edit")
//     getAssignmentDetails(id)

//     setShow(true)
//   }

  


    function handleRemove(id) {
      const shouldRemove = window.confirm("Are You Sure?");
      if (shouldRemove) {
        CommonService.deleteById(apiUrlsService.deleteClient + id).then(
            (response) => {
              if (response) {
                swal("Success", "Client deleted succesfully..!", "success");
                getAllClients();
              }
            }
          );
      }
    }

  

  const onSubmit = (data) => {
    console.log(editData.id,"whilke updating")

    if (!editData.id) {
      CommonService.add(apiUrlsService.addClient, data).then(
        (response) => {
          if (response) {
            setClients([...checklist, response.data]);
            swal("Success", "Assignment added succesfully..!", "success");
            reset();
            handleClose();
            
            console.log(response.data, "mani");
          }
        },
        (error) => {
          if (error.response && error.response.status === 403) {
            // EventBus.dispatch("logout");
          }
        }
      );
    } else {
      data.id = editData.id;
      CommonService.update(apiUrlsService.updateClient + editData.id, data).then(
        (response) => {
          if (response) {
            const updatedChecklist = checklist.map((item) =>
            item.id === editData.id ? response.data : item
          );
          setClients(updatedChecklist);
            swal("Success", "Assignment Updated succesfully..!", "success");
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
  };

//   const handleShow = () => {
//     setTitle("Add"); // Set the form title to "Add"
//     setId(""); // Clear the ID for adding
//     setShow(true);
//   };

  // Function to handle "Edit" button click
  const handleShowEdit = (id) => {
    // Find the item to edit based on its id
    const itemToEdit = checklist.find((item) => item.id === id);

    if (itemToEdit) {
      // Set the editData state with the item data
      setEditData(itemToEdit);
      console.log(itemToEdit.cityName,"this is the id for edit")
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
                                <div className="col-md-4 text-left mt-1 ">
                                  <label className="">
                                    City Name{" "}
                                    <span className="text-danger">*</span>
                                  </label>

                                  <input
                                    type="text"
                                    placeholder="Enter Client Name"
                                    className="accordiantext"
                                    {...register("cityName", {
                                      required: true,
                                    })}
                                    
                                    defaultValue={editData ? editData.cityName : ""} // Set initial value based on editData
                                  />
                                   {errors.cityName && (
                                 <span className="text-danger">This is required</span>
                                      )}
                                </div>

                                <div className="col-md-4 text-left mt-1">
                                  <label className="">
                                    State Name{" "}
                                    <span className="text-danger">*</span>
                                  </label>

                                  <input
                                    type="text"
                                    placeholder="Enter Client Name"
                                    className="accordiantext"
                                    {...register("stateName", {
                                      required: true,
                                    })}
                                    defaultValue={editData ? editData.stateName : ""} // Set initial value based on editData
                                  />
                                  {errors.stateName && (
                                 <span className="text-danger">This is required</span>
                                      )}
                                </div>

                                <div className="col-md-4 text-left mt-1 ">
                                  <label className="">
                                    Type Of Area{" "}
                                    <span className="text-danger">*</span>
                                  </label>

                                  <input
                                    type="text"
                                    placeholder="Enter Client Name"
                                    className="accordiantext"
                                    {...register("typeOfArea", {
                                      required: true,
                                    })}
                                    defaultValue={editData ? editData.typeOfArea : ""} // Set initial value based on editData
                                  />
                                  {errors.typeOfArea && (
                                 <span className="text-danger">This is required</span>
                                      )}
                                </div>

                                <div className="col-md-4 text-left mt-1 ">
                                  <label className="">
                                    Address{" "}
                                    <span className="text-danger">*</span>
                                  </label>

                                  <input
                                    type="text"
                                    placeholder="Enter Client Name"
                                    className="accordiantext"
                                    {...register("address", { required: true })}
                                    defaultValue={editData ? editData.address : ""} // Set initial value based on editData
                                    />
                                  {errors.address && (
                                 <span className="text-danger">This is required</span>
                                      )}
                                </div>

                                <div className="col-md-4 text-left mt-1 ">
                                  <label className="">
                                    PinCode{" "}
                                    <span className="text-danger">*</span>
                                  </label>

                                  <input
                                    type="text"
                                    placeholder="Enter Client Name"
                                    className="accordiantext"
                                    {...register("pinCode", { required: true })}
                                    defaultValue={editData ? editData.pinCode : ""} // Set initial value based on editData
                                    />
                                  {errors.pinCode && (
                                 <span className="text-danger">This is required</span>
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
                {checklist
                 ? checklist.slice().reverse().map((item, index) => {
                    return (
                    <tr key={item.index}>
                      <td>{index + 1}</td>
                      <td>
                        {" "}
                        <Link>{item.cityName}</Link>
                      </td>
                      <td>{item.stateName}</td>
                      <td>{item.typeOfArea}</td>
                      <td>{item.locationId}</td>
                      <td>{item.address}</td>
                      <td>{item.pinCode}</td>
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

//  import apiUrlsService from "../../../services/apiUrls.service";
//  import CommonService from "../../../services/common.service";
// import React, { useEffect, useState } from "react";
// // import "./style.css";
// const renderData = (data) => {
//   return (
//     <>
//        {data
//               ? data.slice().reverse().map((data, index) => {
//                   return (
//                     <tr key={index}>
//                       <td>{index + 1}</td>

//                       <td>
//                         <Link className="links-links-navigate" to="/client_hub">
//                           {data.name}
//                         </Link>
//                       </td>
//                       <td>{data.phoneNo}</td>
//                       <td>{data.email}</td>
//                       <td>{data.fileNo}</td>
//                       <td>{data.framework.financialFramework} </td>
//                       <td>
//                         <button
//                           title="Edit-blueScreen"
//                           className="button-background-styles"
//                         >
//                           <Link className="pencil-link-button"  to={`/addclient/edit/${data.id}`}>
//                             <FaPencilAlt className="pencil" />
//                           </Link>
//                         </button>
//                         &nbsp;
//                         <button
//                           className="delete-greenScreen"
//                           title="Mark As Inactive"
//                           // onClick={() => deleteClient(data.id)}
//                         >
//                           <FaTimes className="pencil" />
//                         </button>
//                       </td>
//                     </tr>
//                   );
//                 })
//               : ""}
//     </>
//   );
// };

// const ClientActiveTable =()=> {
//   // const [data, setData] = useState([]);

//   const [currentPage, setcurrentPage] = useState(1);
//   const [itemsPerPage, setitemsPerPage] = useState(5);

//   const [pageNumberLimit, setpageNumberLimit] = useState(5);
//   const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
//   const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

//   const handleClick = (event) => {
//     setcurrentPage(Number(event.target.id));
//   };

//   const pages = [];
//   for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
//     pages.push(i);
//   }

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

//   const renderPageNumbers = pages.map((number) => {
//     if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
//       return (
//         <li
//           key={number}
//           id={number}
//           onClick={handleClick}
//           className={currentPage == number ? "active" : null}
//         >
//           {number}
//         </li>
//       );
//     } else {
//       return null;
//     }
//   });

//   const [data, setClients] = useState("");
//   // const [data, setdata] = useState([]);

//   // function deleteClient(id) {
//   //   CommonService.deleteById(apiUrlsService.deleteClient + id).then(
//   //     (response) => {
//   //       if (response) {
//   //         swal("Success", "Client deleted succesfully..!", "success");
//   //         getAllClients();
//   //       }
//   //     }
//   //   );
//   // }

//   useEffect(() => {
//     getAllClients();
//   }, []);

//   function getAllClients() {
//     CommonService.getAll(apiUrlsService.getAllClients).then(
//       (response) => {
//         console.log(response.data,"mani")
//         if (response) {
//           setClients(response.data);

//         }
//       },
//       (error) => {}
//     );
//   }

//   const handleNextbtn = () => {
//     setcurrentPage(currentPage + 1);

//     if (currentPage + 1 > maxPageNumberLimit) {
//       setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
//       setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
//     }
//   };

//   const handlePrevbtn = () => {
//     setcurrentPage(currentPage - 1);

//     if ((currentPage - 1) % pageNumberLimit == 0) {
//       setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
//       setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
//     }
//   };

//   let pageIncrementBtn = null;
//   if (pages.length > maxPageNumberLimit) {
//     pageIncrementBtn = <li onClick={handleNextbtn}> &hellip; </li>;
//   }

//   let pageDecrementBtn = null;
//   if (minPageNumberLimit >= 1) {
//     pageDecrementBtn = <li onClick={handlePrevbtn}> &hellip; </li>;
//   }

//   const handleLoadMore = () => {
//     setitemsPerPage(itemsPerPage + 5);
//   };

//   return (
//     <>
//       <h1>Todo List</h1> <br />
//       {renderData(currentItems)}
//       <ul className="pageNumbers">
//         <li>
//           <button
//             onClick={handlePrevbtn}
//             disabled={currentPage == pages[0] ? true : false}
//           >
//             Prev
//           </button>
//         </li>
//         {pageDecrementBtn}
//         {renderPageNumbers}
//         {pageIncrementBtn}

//         <li>
//           <button
//             onClick={handleNextbtn}
//             disabled={currentPage == pages[pages.length - 1] ? true : false}
//           >
//             Next
//           </button>
//         </li>
//       </ul>
//       <button onClick={handleLoadMore} className="loadmore">
//         Load More
//       </button>
//     </>
//   );
// }

// export default ClientActiveTable;
