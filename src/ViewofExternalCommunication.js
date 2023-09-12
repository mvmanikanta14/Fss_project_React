import React, { useEffect, useState } from 'react'
import { BiNotepad, BiTrash, BiExport, BiRightArrow } from 'react-icons/bi'
import axios from 'axios'
import { FaArrowLeft, FaEye, FaHome, FaPaperclip, FaRandom } from 'react-icons/fa';
import { Modal, Button } from 'react-bootstrap';
import { FaPencilAlt, FaFileAlt } from 'react-icons/fa';
import './index.css';
import { Link } from "react-router-dom";
import { BsFilePdf } from 'react-icons/bs';


const ViewofExternalCommunication = () => {
    const [data, setdata] = useState([])
    useEffect((e) => {
        axios.get('http://localhost:8000/CommonAll')
            .then(res => {
                setdata(res.data)
                console.log(res.data.length);
                const tabledata = res.data.length
                console.log(tabledata);
            })
            .catch(err => {
                console.log(err);
            })
    })

    const [showresponse, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    function handleRemove(id) {
        const shouldRemove = window.confirm("Are You Sure?");
        if (shouldRemove) {
            // Remove logic here
        }
    };
    return (
        <>
            <div className="card">
                <div className="row">
                    <div className="col-md-12 padding-left">
                        <div className="col-md-12 header-title " >
                            <b className='text-left'>Communication Details</b>
                            <button className=' float-right' title="" onClick={handleShow}>Response</button>
                            <button className=' float-right' title="" onClick={handleShow}>Index</button>
                        </div>
                    </div>
                </div>
            </div>


            <div className='container-fluid pl-3 pr-3'>
                <div className='row'>
                    <div className='col-md-12 border bg-white mt-3 rounded ml-0 mr-0 pl-0 pr-0'>
                        <div className='col-md-12 mt-2'>
                            <form className='text-right formtext p-0 mr-0'>
                                <div className='model_box'>
                                    <Modal show={showresponse} onHide={handleClose} centered size="md"
                                        backdrop="static"
                                        aria-labelledby="contained-modal-title-vcenter" ClassName="modalcustomise">
                                        <Modal.Header closeButton className='border-0'>
                                            <Modal.Title> Respond </Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body className="custom-modal-body">
                                            <div className='p-0 border modalstart'>
                                                <form className='formtext modalform' >
                                                    <div className='container'>
                                                        <div className='row pt-1'>
                                                            <div className='col-md-12 text-left'>
                                                                <label>Response</label>
                                                                <textarea type='text' placeholder='' className='accordiantext'></textarea>
                                                            </div>
                                                            <div className='col-md-12 text-left'>
                                                                <label>Attachments</label>
                                                                <input type='file' placeholder='' className='accordiantext bg-white'></input>
                                                            </div>
                                                            <div className='col-md-12'>
                                                                <br />
                                                                <button className='float-right mt-1 text-white accordianbutton'>Save</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </Modal.Body>
                                    </Modal>
                                </div>
                            </form>
                        </div>
                        <div className="body">
                            <div className="col-md-12">
                                <div className="row p-0">
                                    <div class="  col-md-2 mb-0">
                                        <b>Question</b>
                                        <span className="float-right">:</span>
                                    </div>
                                    <div className=" col-md-7 mb-0">
                                        <b>External User Testing purpose only</b>
                                    </div>
                                    <div class="col-md-3 float-right mb-5">
                                        <FaPaperclip />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12 bg-light mb-2 border rounded">
                                <div className="row m-b-10">
                                    <div className="col-md-2">
                                        <b className="text-dark"> Response 1.</b>
                                        <span className="float-right"> : </span>
                                    </div>
                                    <div className="col-md-7 mb-0" title="">Testing Notes</div>
                                </div>
                                <div className="row">
                                    <div className="  col-md-2 mb-0">
                                        <b className="text-dark">Note</b>
                                        <span className="float-right"> : </span>
                                    </div>
                                    <div className="col-md-10 mb-0">

                                    </div>
                                </div>
                            </div>


                            {/* <div className="col-md-12 mb-0 p-0">
                                <div className="bg-light">
                                    <div className="row m-b-10 d-flex">
                                        <div className="  col-md-2 mb-0">
                                            <b className="text-dark"> Response 2.</b>
                                            <span className="float-right">:</span>
                                        </div>
                                        <div className="col-md-7 mb-0" title="">Responded Notes</div>
                                        <div class="col-md-3 mb-0 attach text-right">
                                            <FaPaperclip />
                                            <Link to="">bankstatement.pdf</Link>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="  col-md-2 mb-0">
                                            <b className="text-dark">Note</b>
                                            <span className="float-right"> : </span>
                                        </div>
                                        <div className="col-md-10 mb-0">
                                            <span className="text-danger">Rejected</span>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                        <div className="row">
                            <div className="col-md-12 d-flex ">
                                <div className="  col-md-6">
                                    <label className="">Originator : &nbsp;<b>Anil</b></label> &nbsp; &nbsp;|| &nbsp; &nbsp;
                                    <label className="">Responder :&nbsp;<b>purna@ext</b></label>
                                </div>
                                <div className="col-md-6 mb-0 float-right">
                                    <label>Status :&nbsp;
                                        <span className="badge btn-warning"> Responded</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </>
    );
};
export default ViewofExternalCommunication;
