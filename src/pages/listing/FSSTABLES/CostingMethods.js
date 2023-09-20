import React, { useEffect, useState } from 'react'
import commonService from '../../../services/common.service';
import apiUrlsService from '../../../services/apiUrls.service';
import { Link, useParams } from 'react-router-dom';
import { FaHome, FaArrowLeft, FaPencilAlt, FaTimes } from 'react-icons/fa';
import { Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import swal from 'sweetalert';

const CostingMethods = () => {
  const [costingmethodsdata, setCostingMethodsData] = useState([])
  const [ids, setId] = useState("");
  const [title, setTitle] = useState("Add")
  const [editData, setEditData] = useState([])
  const { id } = useParams();


  function getAllCostingMethods() {
    commonService.getAll(apiUrlsService.getAllCostingTypes + "?deleted=false")
      .then((res) => {
        if (res) {
          setCostingMethodsData(res.data.content)
          console.log(setCostingMethodsData)
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }
  useEffect(() => {
    getAllCostingMethods()
    if (id) {
      setTitle("Update");
    }
  }, [])
  // const itemsPerPage = 10;
  // const [currentPage, setCurrentPage] = useState(1);
  // const startIndex = (currentPage - 1) * itemsPerPage;
  // const endIndex = Math.min(startIndex + itemsPerPage, costingmethodsdata.length);
  // const currentData = costingmethodsdata.slice(startIndex, endIndex);
  // const handlePageChange = (page) => {
  //   setCurrentPage(page);
  // };
  // const totalPages = Math.ceil(costingmethodsdata.length / itemsPerPage);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = (data) => {
    if (!ids) {
      commonService.add(apiUrlsService.addCostingMethods, data)
        .then((res) => {
          setCostingMethodsData([...costingmethodsdata, res.data])
          swal("Success", "Assignment added succesfully..!", "success");
          handleCloseShow();
          reset();
        })
        .catch((err) => {
          console.log(err);
        });
    }
    else {
      data.id = editData.id;
      commonService.patch(apiUrlsService.updateCostingmethods + editData.id, data).then(
        (response) => {
          if (response) {
            const updatedCostingmethods = costingmethodsdata.map((item) =>
              item.id === editData.id ? response.data : item
            );
            setCostingMethodsData(updatedCostingmethods);
            swal("Success", "Assignment Updated succesfully..!", "success");
            handleCloseShow();
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
  }

  const handleShowEdit = (id) => {
    const itemToEdit = costingmethodsdata.find((item) => item.id === id)
    setEditData(itemToEdit);
    console.log(itemToEdit, "this is the id for edit")
    setTitle("Edit");
    setId(itemToEdit.id);
    console.log(ids);
    setShow(true);
    reset();
  }

  const handleRemove = (id) => {
    const data = { deleted: "true" };
    const shouldRemove = window.confirm("Are You Sure?");
    if (shouldRemove) {
      commonService
        .patch(apiUrlsService.deleteCostingMethods + id, data)
        .then((res) => {
          console.log(res.data);
          // Update your state properly here
          setCostingMethodsData(res.data);
          swal("Success", "Costing Methods Deleted Successfully");
        })
        .catch((error) => {
          console.error(error);
          // Handle error appropriately
        });
    }
  };

  const [Show, setShow] = useState(false)
  const handleCloseShow = () => 
  {
    setEditData(null); // Reset editData
    setId(""); // Reset the ID
    setShow(false)
  }
  const handleShow = () => {
    reset();
    setShow(true);
    setTitle("Add")
  }
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
                  Costing Methods
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
            <div className="header-title">Costing Methods</div>
          </div>

          <div className="col-md-12 border bg-white pb- pt-2 mt-3 mb-4 pl-0 pr-0 rounded">
            <div className="col-md-12">
              <form className="text-right formtext p-0 mr-0">
                <>
                  <button
                    type="button"
                    className="ml-2 Addbutton"
                    title="Add  Checklist "
                    onClick={()=>handleShow()}
                  >
                    ADD
                  </button>

                  <div className="model_box">
                    <Modal
                      show={Show}
                      onHide={handleCloseShow}
                      centered
                      size="xl"
                      backdrop="static"
                      aria-labelledby="contained-modal-title-vcenter"
                      ClassName="modalcustomise"
                    >
                      <Modal.Header closeButton className="border-0">
                        <h6 className="mb-1 mt-2">Costing Methods</h6>
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
                                    Name{" "}
                                    <span className="text-danger">*</span>
                                  </label>

                                  <input
                                    type="text"
                                    placeholder="Enter Client Name"
                                    className="accordiantext"
                                    {...register("name", {
                                      required: true,
                                    })}

                                    defaultValue={editData ? editData.name : ""} // Set initial value based on editData
                                  />
                                  {errors.cityName && (
                                    <span className="text-danger">This is required</span>
                                  )}
                                </div>
                                <div className='col-md-12'>
                                  <label>Description</label>
                                  <textarea placeholder='enter Description' className='accordiantext'{...register("description", {
                                    required: true,
                                  })}
                                    defaultValue={editData ? editData.description : ""}
                                  ></textarea>
                                  {errors.cityName && (
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
                    <th>Name</th>
                    <th>Description</th>
                    {/* <th>Select Product</th>
                    <th>Select Qty</th> */}
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody className="table-bordered tbclass">
                 
                  {costingmethodsdata ? costingmethodsdata.slice().reverse().map((item, index) => {
                    return (
                      <tr key={item.index}>
                        <td>{index + 1}</td>
                        <td>
                          {" "}
                          <Link>{item.name}</Link>
                        </td>
                        <td>{item.description}</td>
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
                          </></td>
                      </tr>
                    )
                  }) : ""}
                </tbody>
              </table>
            </div>
            <div className="col-md-12">
              <div className="mt-3">
                {/* <h7>Showing {startIndex+1} to {endIndex} of {costingmethodsdata.length} entries</h7> */}
                {/* <nav aria-label="Page navigation example" className="float-right">
                  <ul className="pagination">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                      <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
                        Previous
                      </button>
                    </li>
                    {Array.from({ length: totalPages }, (_, index) => (
                      <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                        <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                          {index + 1}
                        </button>
                      </li>
                    ))}
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                      <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
                        Next
                      </button>
                    </li>
                  </ul>
                </nav> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CostingMethods
