import React, { useEffect, useState } from 'react'
import commonService from '../../../services/common.service'
import apiUrlsService from '../../../services/apiUrls.service'
import { Link, useParams } from 'react-router-dom';
import { FaHome, FaArrowLeft, FaPencilAlt, FaTimes } from 'react-icons/fa';
import swal from 'sweetalert';
import { Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

const TypeOfProducts = () => {
  const [typeofproducts, setTypeofProducts] = useState([])
  const [title, settitle] = useState("Add")
  const [ids, setId] = useState()
  const [editData, seteditData] = useState("null")
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm({
    mode: "onChange",
  });

  function getAllTypeofProducts() {
    commonService.getAll(apiUrlsService.getAllTypeofProducts)
      .then((res) => {
        setTypeofProducts(res.data.content)
      })
      .catch((err) => {
        console.log(err);
      })
  }
  useEffect(() => {
    getAllTypeofProducts()
    if (id) {
      settitle("Update");
    }
  }, [])
  const onSubmit = (data) => {
    if (!ids) {
      commonService.add(apiUrlsService.addTypeOfProducts, data)
        .then((res) => {
          console.log(res.data);
          setTypeofProducts([...typeofproducts, res.data])
          swal("Success")
          reset();
          handleCloseshow();
        })
        .catch((err) => {
          console.log(err);
        })
    } else {
      data.id = editData.id;
      // console.log();
      commonService.patch(apiUrlsService.updateTypeofproducts + editData.id, data)
        .then((res) => {
          const updatedTypeofproducts = typeofproducts.map((item) =>
            item.id === editData.id ? res.data : item
          );
          setTypeofProducts(updatedTypeofproducts);
          swal("Success", "Assignment Updated succesfully..!", "success");
          handleCloseshow();
          reset();
        })
        .catch((err => {
          console.log(err);
        }))
    }
  }
  const handleShowEdit = (id) => {
    const itemToEdit = typeofproducts.find((item) => item.id === id)
    console.log(itemToEdit);
    seteditData(itemToEdit); // Set editData when editing
    setValue('name', itemToEdit.name); // Use setValue to pre-fill the form field
    setValue('description', itemToEdit.description); // Use setValue to pre-fill the form field
    settitle('Edit'); // Set title for the modal
    setShow(true); // Show the modal
  }

  const [show, setShow] = useState(false)
  const handleCloseshow = () => {
    seteditData(null); // Reset editData
    setId(""); // Reset the ID
    setShow(false);
  }
  const handleshow = () => {
    reset();
    setShow(true)
    settitle("Add")
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
                  Type of Products
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
            <div className="header-title">Type Of Products</div>
          </div>

          <div className="col-md-12 border bg-white pb- pt-2 mt-3 mb-4 pl-0 pr-0 rounded">
            <div className="col-md-12">
              <form className="text-right formtext p-0 mr-0">
                <>
                  <button
                    type="button"
                    className="ml-2 Addbutton"
                    title="Add  Checklist "
                    onClick={handleshow}
                  >
                    ADD
                  </button>

                  <div className="model_box">
                    <Modal
                      show={show}
                      onHide={handleCloseshow}
                      centered
                      size="xl"
                      backdrop="static"
                      aria-labelledby="contained-modal-title-vcenter"
                      className="modalcustomise"
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
                                <div className="col-md-4 text-left mt-1">
                                  <label className="">
                                    Name{" "}
                                    <span className="text-danger">*</span>
                                  </label>
                                  <input
                                    type="text"
                                    placeholder="Enter Name"
                                    className="accordiantext"
                                    {...register("name", {
                                      required: true,
                                    })}
                                    defaultValue={editData ? editData.name : ""} // Set initial value based on editData
                                  />
                                  {errors.name && (
                                    <span className="text-danger">This is required</span>
                                  )}
                                </div>
                                <div className="col-md-12 text-left mt-1 ">
                                  <label className="">
                                    Description{" "}
                                    <span className="text-danger">*</span>
                                  </label>
                                  <textarea className='accordiantext' {...register("description", {
                                    required: true,
                                  })}
                                    defaultValue={editData ? editData.description : ""} // Set initial value based on editData 
                                  ></textarea>
                                  {errors.description && (
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
                    <th>Type ID</th>
                    <th>Name</th>
                    <th>Description</th>
                    {/* <th>Select Product</th>
                    <th>Select Qty</th> */}
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody className="table-bordered tbclass">
                  {typeofproducts ? typeofproducts.slice().reverse().map((item, index) => {
                    return (
                      <tr key={item.index}>
                        <td>{index + 1}</td>
                        <td>
                          {" "}
                          <Link>{item.typeId}</Link>
                        </td>
                        <td>{item.name}</td>
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
                <h7>Showing 1 to 10 of 10 entries</h7>
                {/* <nav
                  aria-label="Page navigation example"
                  className=" float-right"
                >
                  <ul className="pagination">
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
                </nav> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TypeOfProducts
