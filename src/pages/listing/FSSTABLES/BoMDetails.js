import React, { useEffect, useState } from 'react'
import commonService from '../../../services/common.service'
import apiUrlsService from '../../../services/apiUrls.service'
import { Link, useParams } from 'react-router-dom';
import { FaHome, FaArrowLeft, FaPencilAlt, FaTimes } from 'react-icons/fa';
import swal from 'sweetalert';
import { useForm } from 'react-hook-form';
import { Modal } from 'react-bootstrap';

const BoMDetails = () => {
  const [bomdetails, setBoMDetails] = useState([])
  const [title, settitle] = useState("Add")
  const [editData, seteditData] = useState()
  const [ids, setId] = useState()
  const { id } = useParams();
  const [options, setOptions] = useState([]); // Store the fetched data here
  const [selectedOption, setSelectedOption] = useState(''); // Store Selected Option
  // const [productOptions, setProductOptions] = useState([]); // Store the fetched data here
  // const [selectedProductOptions, setSelectedProductOptions] = useState(''); // Store Selected Option
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm({
    mode: "onChange",
  });

  function getAllBomDetails() {
    commonService.getAll(apiUrlsService.getAllBomDetails)
      .then((res) => {
        setBoMDetails(res.data.content)
      })
      .catch((err) => {
        console.log(err);
      })
  }
  function getUomFieldsOptions() {
    commonService.getAll(apiUrlsService.getUomfieldData)
      .then((res) => {
        setOptions(res.data.content)
      })
      .catch((err) => { console.log(err); })
  }
  // function getProductFieldsOptions() {
  //   commonService.getAll(apiUrlsService.getProductfieldData)
  //     .then((res) => {
  //       setOptions(res.data.content)
  //     })
  //     .catch((err) => { console.log(err); })
  // }

  useEffect(() => {
    getAllBomDetails()
    getUomFieldsOptions()
    // getProductFieldsOptions()
    if (id) {
      settitle("Update");
    }
  }, [])

  const onSubmit = (data) => {
    if (!ids) {
      commonService.add(apiUrlsService.addBoMDetails, data)
        .then((res) => {
          setBoMDetails([...bomdetails, res.data])
          handleCloseShow()
          swal("Success")
          reset()
        })
        .catch((err) => {
          console.log(err);
        })
    } else {
      commonService.update(apiUrlsService.updateBoMDetails + editData.id, data)
        .then((res) => {
          const updatedBoMDetails = bomdetails.map((item) =>
            item.id === editData.id ? res.data : item
          )
          setBoMDetails(updatedBoMDetails)
          swal("Success")
          handleCloseShow()
          reset()
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }
  const handleShowEdit = (id) => {
    setShow(true);
    settitle("Edit")
    const itemToEdit = bomdetails.find((item) => item.id === id)
    seteditData(itemToEdit)
    setId(itemToEdit.id)
  }

  const [show, setShow] = useState(false)
  const handleCloseShow = () => setShow(false)
  const handleShow = () => {
    setShow(true)
    settitle("Add")
  }

  // Handle dropdown change event
  const handleDropdownChange = (event) => {
    setSelectedOption(event.target.value);
  };
  // const handleProductDropdownChange = (event) => {
  //   setSelectedProductOptions(event.target.value);
  // };

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
                  Bom Details
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
            <div className="header-title">BoM Details</div>
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
                      onHide={handleCloseShow}
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

                                {/* <div className="col-md-4 text-left mt-1 ">
                                  <label className="">
                                    Product
                                    <span className="text-danger">*</span>
                                  </label>
                                  <input
                                    type="text"
                                    placeholder="Enter Product"
                                    className="accordiantext"
                                    {...register("product", {
                                      required: true,
                                    })}
                                    defaultValue={editData ? editData.product : ""} // Set initial value based on editData
                                  />
                                  {errors.product && (
                                    <span className="text-danger">This is required</span>
                                  )}
                                </div>
                                <div className="col-md-4 text-left mt-1 ">
                                  <label className="">
                                    UoM{" "}
                                    <span className="text-danger">*</span>
                                  </label>
                                  <input
                                    type="text"
                                    placeholder="Enter Client Name"
                                    className="accordiantext"
                                    {...register("uom", {
                                      required: true,
                                    })}
                                    defaultValue={editData ? editData.uom : ""} // Set initial value based on editData
                                  />
                                  {errors.uom && (
                                    <span className="text-danger">This is required</span>
                                  )}
                                </div> */}
                                {/* <div className="col-md-6 text-left mt-1 ">
                                  <label className="">
                                    Select Product
                                    <span className="text-danger">*</span>
                                  </label>
                                  <select className='accordiantext' onChange={handleProductDropdownChange} value={selectedProductOptions}
                                    // {...register("productName", { required: true })}
                                    defaultValue={editData ? editData.productName : ""}
                                  >
                                    <option>----Select option----</option>
                                    {productOptions.map((option) => (
                                      <option key={option.id} value={option.id}>
                                        {option.productName}
                                      </option>
                                    ))}
                                  </select>
                                  {/* {errors.selectproduct && (
                                    <span className="text-danger">This is required</span>
                                  )} 
                                </div>  */}

                                <div className="col-md-6 text-left mt-1 ">
                                  <label className="">
                                    Select Qty
                                    <span className="text-danger">*</span>
                                  </label>
                                  <select className='accordiantext' onChange={handleDropdownChange} value={selectedOption}
                                  //  {...register("", { required: true })}
                                  // defaultValue={editData ? editData.pinCode : ""}
                                  >
                                    <option>---Select Option---</option>
                                    {options.map((option) => (
                                      <option key={option.id} value={option.id}>
                                        {option.standardUnit}
                                      </option>
                                    ))}
                                  </select>
                                  {/* {errors.qty && (
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
                    <th>S.No</th>
                    <th>Product ID</th>
                    <th>Product</th>
                    <th>UoM</th>
                    {/* <th>Select Product</th>
                    <th>Select Qty</th> */}
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody className="table-bordered tbclass">
                  {bomdetails ? bomdetails.slice().reverse().map((item, index) => {
                    return (
                      <tr key={item.index}>
                        <td>{index + 1}</td>
                        <td>
                        {item.productId?.productId}
                        </td>
                        <td>{item.productName}</td>
                        <td>{item.uom?.name} </td>
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
                            // onClick={() => handleRemove(item.id)}
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
                <h7>Showing 1 to 10 of  10 entries</h7>

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
  )
}

export default BoMDetails
