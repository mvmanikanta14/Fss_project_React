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

const Products = () => {
  const [products, setProducts] = useState([]);
  const [title, setTitle] = useState("Add");
  const [editData, setEditData] = useState([]);
  const [ids, setId] = useState(""); // ID for editing
  const { id } = useParams();
  const [uomtype, setUoMType] = useState();
  const [costingtype, setCostingType] = useState();
  const [producttype, setProductType] = useState();
  const [sachsntype, setSacHsnType] = useState();

  const navigate = useNavigate();

  function getAllProduct() {
    CommonService.getAll(apiUrlsService.getAllProducts + "?deleted=false").then(
      (response) => {
        if (response) {
          setProducts(response.data.content);
        }
      },
      (error) => {
        // Handle error
      }
    );
  }

  //
  function getAllUoMType() {
    CommonService.getAll(apiUrlsService.getAllUomList).then(
      (response) => {
        if (response) {
          console.log(response.data.content);
          setUoMType(response.data.content);
        }
      },
      (error) => {
        // Handle error
      }
    );
  }

  function getAllsnSac() {
    CommonService.getAll(apiUrlsService.getAllhsnSac).then(
      (response) => {
        if (response) {
          console.log(response.data.content);
          setSacHsnType(response.data.content);
        }
      },
      (error) => {
        // Handle error
      }
    );
  }

  function getAllProductType() {
    CommonService.getAll(apiUrlsService.getAllProductTypes).then(
      (response) => {
        if (response) {
          console.log(response.data.content);
          setProductType(response.data.content);
        }
      },
      (error) => {
        // Handle error
      }
    );
  }

  function getAllCostingType() {
    CommonService.getAll(apiUrlsService.getAllCostingTypes).then(
      (response) => {
        if (response) {
          console.log(response.data.content);
          setCostingType(response.data.content);
        }
      },
      (error) => {
        // Handle error
      }
    );
  }

  useEffect(() => {
    getAllProduct();
    getAllUoMType();
    getAllsnSac();
    getAllProductType();
    getAllCostingType();
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
      console.log(data, "fddfd");
      CommonService.patch(apiUrlsService.addProducts + id + "/", data).then(
        (response) => {
          if (response) {
            swal("Success", " deleted succesfully..!", "success");
            getAllProduct();
          }
        }
      );
    }
  }

  const onSubmit = (data) => {
    console.log(data, "whilke updating");

    let productType_id = "";
    let costingType_id = "";
    let hnsSacType_id = "";
    let uomType_id = "";

    productType_id = data["productType"];
    costingType_id = data["costing"];
    hnsSacType_id = data["hnsSac"];
    uomType_id = data["uomType"];

    data["productType"] = { id: productType_id };
    data["costing"] = { id: costingType_id };
    data["hnsSac"] = { id: hnsSacType_id };
    data["uomType"] = { id: uomType_id };

    if (!editData.id) {
      CommonService.add(apiUrlsService.addProducts, data).then(
        (response) => {
          if (response) {
            setProducts([...products, response.data]);
            swal("Success", " added succesfully..!", "success");
            reset();
            handleClose();
            getAllProduct();
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
      CommonService.patch(apiUrlsService.addProducts + editData.id, data).then(
        (response) => {
          if (response) {
            const updatedProducts = products.map((item) =>
              item.id === editData.id ? response.data : item
            );
            setProducts(updatedProducts);
            swal("Success", " Updated succesfully..!", "success");
            handleClose();
            reset();
            getAllProduct();
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
    const itemToEdit = products.find((item) => item.id === id);

    if (itemToEdit) {
      // Set the editData state with the item data
      setEditData(itemToEdit);
      console.log(itemToEdit.cityName, "this is the id for edit");
      setTitle("Edit"); // Set the form title to "Edit"
      setId(itemToEdit.id); // Set the ID for editing
      setShow(true); // Show the modal
      reset();

      // Set values for other fields as needed
      setValue("hnsSac", itemToEdit.hnsSac.id);
      setValue("productName", itemToEdit.productName);
      setValue("uomType", itemToEdit.uomType.id);
      setValue("productType", itemToEdit.productType.id);
      setValue("costing", itemToEdit.costing.id);
    }
  };

  const handleClose = () => {
    setEditData(null); // Reset editData
    setTitle("Add"); // Reset the form title
    setId(""); // Reset the ID
    setShow(false);
  };

  const [searchTerm, setSearchTerm] = useState("");
  // const [selectedHsnSac, setSelectedHsnSac] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);

  const [selectedHsnSac, setSelectedHsnSac] = useState("");
  const handleSelectHsnSac = (hsnOrSac) => {
    console.log(id)
    setSelectedHsnSac(hsnOrSac);
    setShowSearchDropdown(false);
  };
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (searchTerm !== "") {
      const apiUrl = apiUrlsService.getAllhsnSac + "?description=" + searchTerm;

      CommonService.getAll(apiUrl).then((response) => {
        if (response) {
          setSearchResults(response.data.content);
        }
      });
    } else {
      setSearchResults([]);
      setSelectedHsnSac(""); // Reset selectedHsnSac when searchTerm is empty
    }
  }, [searchTerm]);
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
                  Product List
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
            <div className="header-title">Product List</div>
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
                        <h6 className="mb-1 mt-2">Product List</h6>
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
                                    Product Name{" "}
                                    <span className="text-danger">*</span>
                                  </label>

                                  <input
                                    type="text"
                                    placeholder="Enter Client Name"
                                    className="accordiantext"
                                    {...register("productName", {
                                      required: true,
                                    })}
                                    defaultValue={
                                      editData ? editData.productName : ""
                                    } // Set initial value based on editData
                                  />
                                  {errors.productName && (
                                    <span className="text-danger">
                                      This is required
                                    </span>
                                  )}
                                </div>

                                <div className="col-md-4 text-left mt-1 ">
                                  <label className="">
                                    UoM <span className="text-danger">*</span>
                                  </label>

                                  <select
                                    className="accordiantext"
                                    {...register("uomType", { required: true })}
                                    // value={watch("typeOfArea")} // Get the selected value from the form
                                  >
                                    <option value="">---Select----</option>
                                    {uomtype &&
                                      uomtype.map((h, i) => (
                                        <option key={i} value={h.id}>
                                          {h.name}
                                        </option>
                                      ))}
                                  </select>
                                </div>

                                <div className="col-md-4 text-left mt-1 ">
                                  <label className="">
                                    Costing Type{" "}
                                    <span className="text-danger">*</span>
                                  </label>

                                  <select
                                    className="accordiantext"
                                    {...register("costing", { required: true })}
                                    // value={watch("typeOfArea")} // Get the selected value from the form
                                  >
                                    <option value="">---Select----</option>
                                    {costingtype &&
                                      costingtype.map((h, i) => (
                                        <option key={i} value={h.id}>
                                          {h.name}
                                        </option>
                                      ))}
                                  </select>
                                </div>

                                <div className="col-md-4 text-left mt-1 ">
                                  <label className="">
                                    Product Type{" "}
                                    <span className="text-danger">*</span>
                                  </label>

                                  <select
                                    className="accordiantext"
                                    {...register("productType", {
                                      required: true,
                                    })}
                                    // value={watch("typeOfArea")} // Get the selected value from the form
                                  >
                                    <option value="">---Select----</option>
                                    {producttype &&
                                      producttype.map((h, i) => (
                                        <option key={i} value={h.id}>
                                          {h.name}
                                        </option>
                                      ))}
                                  </select>
                                </div>

                                <div className="col-md-4 text-left mt-1">
                                  <label className="">
                                    Sac Hsn type{" "}
                                    <span className="text-danger">*</span>
                                  </label>

                                  <div className="custom-dropdown">
                                    <div
                                      className={`selected-item ${
                                        selectedHsnSac === ""
                                          ? "placeholder"
                                          : ""
                                      }`}
                                      onClick={() =>
                                        setShowSearchDropdown(
                                          !showSearchDropdown
                                        )
                                      }
                                    >
                                      {selectedHsnSac === ""
                                        ? "---Select---"
                                        : selectedHsnSac}
                                    </div>

                                    {showSearchDropdown && (
                                      <div className="dropdown-options">
                                        <input
                                          type="text"
                                          placeholder="Search..."
                                          value={searchTerm}
                                          onChange={(e) =>
                                            setSearchTerm(e.target.value)
                                          }
                                        />
                                      
                                        <ul>
                                          {searchResults.map((result, i) => (
                                            <li
                                              key={i}
                                              onClick={() =>
                                                handleSelectHsnSac(
                                                  result.hsnOrSac
                                                )
                                              }
                                              value = {result.id}
                                            > 
                                              {`${result.hsnOrSac}: ${result.description}`}
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    )}
                                  </div>
                                </div>

                                {/* <div className="col-md-4 text-left mt-1 ">
                                  <label className="">
                                  Sac Hsn type{" "}
                                    <span className="text-danger">*</span>
                                  </label>

                                  <select
                                className="accordiantext"
                                {...register("hnsSac", { required: true })}
                                // value={watch("typeOfArea")} // Get the selected value from the form
                              
                                >
                                <option value="">---Select----</option>
                                {sachsntype &&
                                    sachsntype.map((h, i) => (
                                    <option key={i} value={h.id}>
                                        {h.hsnOrSac}
                                    </option>
                                    ))}
                                </select>
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
                    <th scope="col">S No</th>
                    <th scope="col">Product Name</th>
                    <th scope="col">SAC/HSN</th>
                    <th scope="col">Product Type</th>
                    <th scope="col">Uom</th>
                    <th scope="col">Costing Type</th>

                    <th>Action</th>
                  </tr>
                </thead>
                <tbody className="table-bordered tbclass">
                  {products
                    ? products
                        .slice()
                        .reverse()
                        .map((item, index) => {
                          return (
                            <tr key={item.index}>
                              <td>{index + 1}</td>
                              <td>{item.productName}</td>
                              <td>{item.hnsSac ? item.hnsSac.hsnOrSac : ""}</td>
                              <td>
                                {item.productType ? item.productType.name : ""}
                              </td>
                              <td>{item.uomType ? item.uomType.name : ""}</td>
                              <td>{item.costing ? item.costing.name : ""}</td>
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

export default Products;

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
