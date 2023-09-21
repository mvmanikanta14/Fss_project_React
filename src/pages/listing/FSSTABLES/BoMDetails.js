import React, { useEffect, useState } from 'react';
import commonService from '../../../services/common.service';
import apiUrlsService from '../../../services/apiUrls.service';
import { Link, useParams } from 'react-router-dom';
import { FaHome, FaArrowLeft, FaPencilAlt, FaTimes } from 'react-icons/fa';
import swal from 'sweetalert';
import { useForm } from 'react-hook-form';
import { Modal } from 'react-bootstrap';

const BoMDetails = () => {
  const [bomdetails, setBoMDetails] = useState([]);
  const [title, setTitle] = useState("Add");
  const [editData, setEditData] = useState();
  const [ids, setId] = useState();
  const { id } = useParams();
  const [options, setOptions] = useState([]);
  const [productOptions, setProductOptions] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [productMaterials, setProductMaterials] = useState([]);

  const handleProductChange = (e) => {
    const selectedProductId = e.target.value;
    setSelectedProduct(selectedProductId);

    // Fetch product materials based on the selected product ID from an API endpoint
    if (selectedProductId) {
      // Replace 'api/get-product-materials' with your actual API endpoint
      fetch(`/anyfin/v1/product=${selectedProductId}`)
        .then((response) => response.json())
        .then((data) => setProductMaterials(data))
        .catch((error) => console.error('Error fetching product materials:', error));
    } else {
      // Clear product materials when no product is selected
      setProductMaterials([]);
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  function getAllBomDetails() {
    commonService
      .getAll(apiUrlsService.getAllBomDetails)
      .then((res) => {
        setBoMDetails(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getUomFieldsOptions() {
    commonService
      .getAll(apiUrlsService.getUomfieldData)
      .then((res) => {
        setOptions(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getProductFieldsOptions() {
    commonService
      .getAll(apiUrlsService.getProductfieldData)
      .then((res) => {
        setProductOptions(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getAllBomDetails();
    getUomFieldsOptions();
    getProductFieldsOptions();
    if (id) {
      setTitle("Edit");
    }
  }, [id]);

  const onSubmit = (data) => {
    console.log(data);
    if (!ids) {
      commonService
        .add(apiUrlsService.addBoMDetails, data)
        .then((res) => {
          console.log(res.data);
          setBoMDetails([...bomdetails, res.data]);
          handleCloseShow();
          swal("Success");
          reset();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      commonService
        .update(apiUrlsService.updateBoMDetails + editData.id, data)
        .then((res) => {
          const updatedBoMDetails = bomdetails.map((item) =>
            item.id === editData.id ? res.data : item
          );
          setBoMDetails(updatedBoMDetails);
          swal("Success");
          handleCloseShow();
          reset();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleShowEdit = (id) => {
    setShow(true);
    setTitle("Edit");
    const itemToEdit = bomdetails.find((item) => item.id === id);
    setEditData(itemToEdit);
    setId(itemToEdit.id);
  };

  const [show, setShow] = useState(false);
  const handleCloseShow = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    setTitle("Add");
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



                                <div className="col-md-4 text-left mt-1 ">
                                  <label className="">
                                    Select Product
                                    <span className="text-danger">*</span>
                                  </label>

                                  <select
                                    className="accordiantext"
                                    {...register("productName", { required: true })}
                                    onChange={handleProductChange}
                                  >
                                    <option value="">---Select----</option>
                                    {productOptions &&
                                      productOptions.map((h, i) => (
                                        <option key={i} value={h.id}>
                                          {h.productType.name}
                                        </option>
                                      ))}
                                  </select>
                                </div>



                                <div className="col-md-4 text-left mt-1 ">
                                  <label className="">
                                    Select Product Materials
                                    <span className="text-danger">*</span>
                                  </label>

                                  <select
                                    className="accordiantext"
                                    {...register("name", { required: true })}
                                  >
                                    <option value="">---Select----</option>
                                    {productMaterials &&
                                      productMaterials.map((material, i) => (
                                        <option key={i} value={material.id}>
                                          {material.name}
                                        </option>
                                      ))}
                                  </select>
                                </div>


                                <div className="col-md-2 text-left mt-1 ">
                                  <label className="">
                                    Select Qty
                                    <span className="text-danger">*</span>
                                  </label>
                                  <input
                                    type="number"
                                    placeholder="Enter Quantity"
                                    className="accordiantext"
                                    {...register("quantity", {
                                      required: true,
                                    })}
                                    defaultValue={editData ? editData.quantity : ""} // Set initial value based on editData
                                  />
                                  {errors.quantity && (
                                    <span className="text-danger">This is required</span>
                                  )}
                                </div>

                                <div className="col-md-2 text-left mt-1 ">
                                  <label className="">
                                    &nbsp;
                                  </label>
                                  <select
                                    className="accordiantext"
                                    // {...register("productName", { required: true })}
                                    // value={watch("typeOfArea")} // Get the selected value from the form
                                    onChange={(e) => {
                                      const selectquantity = e.target.value;
                                      if (selectquantity) {
                                        setValue("locationType", selectquantity); // Update the form value
                                      }
                                    }}
                                  >
                                    <option value="">---Select----</option>
                                    {options &&
                                      options.map((h, i) => (
                                        <option key={i} value={h.id}>
                                          {h.name}
                                        </option>
                                      ))}
                                  </select>
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
                          {item.product.productType.typeId}
                        </td>
                        <td title='product Table'>{item.product.productName}
                          <tr>
                            {/* <td>{item.uom.name}</td> */}
                          </tr>
                        </td>
                        <td><span title='quantity' className='text-success'>{item.quantity}</span> &nbsp;&nbsp;&nbsp;<span title='UoM Table'>{item.uom.name}</span> </td>
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
