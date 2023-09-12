import React, { useEffect, useState } from 'react'
import { BiNotepad, BiTrash, BiExport, BiRightArrow } from 'react-icons/bi'
import axios from 'axios'
import { FaArrowLeft, FaEye, FaHome, FaRandom } from 'react-icons/fa';
import { Modal, Button } from 'react-bootstrap';
import { FaPencilAlt, FaFileAlt } from 'react-icons/fa';
import './index.css';
import { Link } from "react-router-dom";
import { BsFilePdf } from 'react-icons/bs';

const ExternalUserCommunication = () => {
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
            <div className="col-md-6 header-title">
              <h6>External Communication - Apple Inc.,_Statutory Audit_2022-23_Apr</h6>
            </div>
          </div>
        </div>
      </div>
      <div className='container-fluid  pl-3 pr-3'>
        <div className='row'>
          <div className='col-md-12 border bg-white mt-3 rounded ml-0 mr-0 pl-0 pr-0'>
            <div className='col-md-12 mt-2'>

            </div>
            <div className='col-md-12 pt-0 mb-2'>
              <table className='border table-striped ttable table-sm'>
                <thead className='thclass'>
                  <tr>
                    <th width="5%">S.No</th>
                    <th width="45%">Question</th>
                    <th width="15%">Originator</th>
                    <th width="15%">Resolvers</th>
                    <th width="10%">Status</th>
                    <th width="10%">Action</th>

                  </tr>
                </thead>
                <tbody className='table-bordered tbclass'>
                  {
                    data.map((data) => {
                      return (
                        <tr key="id">
                          <td>{data.id}</td>
                          <td>{data.question}</td>
                          <td>{data.originator}</td>
                          <td>{data.resolver}</td>
                          <td><button className='edit' title=''>Initiated</button>&nbsp;</td>

                          <td>
                          <button  title='View' className='button-background-styles'> <Link className='datagreencolor' to="/viewofexternalcommunication"><FaEye/></Link></button>&nbsp;
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};
export default ExternalUserCommunication;
