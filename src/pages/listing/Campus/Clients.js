// import React, { useEffect, useState } from "react";
// import { BiTrash } from "react-icons/bi";
// import axios from "axios";
// import { FaArrowLeft, FaHome } from "react-icons/fa";
// import { Modal, Button } from "react-bootstrap";
// import { FaPencilAlt } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import "./../../../../src/index.css";
// import ClientInActiveTable from "./ClientInActiveTable";
// import ClientActiveTable from "./ClientActiveTable";
// // import apiUrlsService from "../../services/apiUrls.service";
// // import UserService from "../../services/user.service";
// import apiUrlsService from "../../../services/apiUrls.service";
// import CommonService from "../../../services/common.service";
// import swal from "sweetalert";

// const Clients = () => {
//   const [data, setdata] = useState([]);
//   const [status, setStatus] = React.useState("active");
//   // const [clients, setClients] = useState("");

//   // function deleteClient(id) {
//   //   UserService.deleteById(apiUrlsService.deleteClient + id).then((response) => {
//   //     if (response) {
//   //       swal("Success", "Client deleted succesfully..!", "success");
//   //       getAllClients();
//   //     }
//   //   });
//   // }

//   // useEffect(() => {
//   //   getAllClients();
//   // }, []);

//   // function getAllClients() {
//   //   UserService.getAll(apiUrlsService.getAllClients).then(
//   //     (response) => {
//   //       if (response) {
//   //         setClients(response.data);
//   //       }
//   //     },
//   //     (error) => {

//   //     }
//   //   );
//   // }

//   // useEffect((e) => {
//   //   axios
//   //     .get("http://localhost:8000/CommonAll")
//   //     .then((res) => {
//   //       setdata(res.data);
//   //       console.log(res.data.length);
//   //       const tabledata = res.data.length;
//   //       console.log(tabledata);
//   //     })
//   //     .catch((err) => {
//   //       console.log(err);
//   //     });
//   // });

//   // const handleChange = (event) => {
//   //   setStatus(event.target.value);
//   // };

//   // const [show, setShow] = useState(false);
//   // const handleClose = () => setShow(false);
//   // const handleShow = () => setShow(true);
//   // function handleRemove(id) {
//   //   const shouldRemove = window.confirm("Are You Sure?");
//   //   if (shouldRemove) {
//   //     // Remove logic here
//   //   }
//   // }

//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(0);
//   const [totalEntries, setTotalEntries] = useState(0);

//   useEffect(() => {
//     // fetchPaginatedData(currentPage);
//   }, [currentPage]);

//   const handlePageChange = (newPage) => {
//     setCurrentPage(newPage);
//   };

//   const entriesStart = (currentPage - 1) * data.length + 1;
//   const entriesEnd = Math.min(entriesStart + data.length - 1, totalEntries);

//   return (
//     <div className="container-fluid pl-2 pr-2">
//       <div className="row">
//         <div className="col-md-12 bg-white bordered headerdiv">
//           <div className="row">
//             <div className="col-md-6 padding-left">
//               <Link
//                 title="Home"
//                 className="svg-icon-height links-links bread"
//                 to={`/dashboard`}
//               >
//                 <FaHome />
//               </Link>{" "}
//             </div>
//             <div className="col-md-6 text-rightss">
//               <div className="backbutton-blue">
//                 <div className="right-top-btns">
//                   <button title="Back" className="btnbtn-hover">
//                     <FaArrowLeft />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="header-title"> Clients</div>
//         </div>

//         <div className="col-md-12 border bg-white pb- pt-2 mt-3 mb-4 pl-0 pr-0 rounded">
//           <div className="col-md-12">
//             <form className="text-right formtext p-0 mr-0">
//               <label className="ml-4">
//                 Search:
//                 <input type="text" className="search" />
//               </label>
//               <label className="float-left">
//                 Show&nbsp;
//                 <select className="search pr-1" autoComplete="off">
//                   <option value="10">10</option>
//                   <option value="50">50</option>
//                   <option value="100">100</option>
//                 </select>
//                 &nbsp; entries
//               </label>
//               &nbsp;&nbsp;
//               <select
//                 labelId=""
//                 id=""
//                 value={status}
//                 label="Status"
//                 // onChange={handleChange}
//                 className="Addbutton p-1 "
//               >
//                 <option value={"active"}>ACTIVE</option>
//                 <option value={"inactive"}>INACTIVE</option>
//               </select>
//               &nbsp;
//               <>
//                 <Link
//                   title="Add Client"
//                   className="Addbutton p-1 links-links"
//                   to="/addclient/add"
//                 >
//                   ADD
//                 </Link>
//               </>
//             </form>
//           </div>
//           {/* <div className='col-md-12 pt-0'>
//                         <table className='border table-striped ttable'>
//                             <thead className='thclass'>
//                                 <tr>
//                                     <th width="5%">S.No</th>
//                                     <th width="20%">Name</th>
//                                     <th width="20%">Phone</th>
//                                     <th width="20%">No Of Assignments</th>
//                                     <th width="20%">No Of Plans</th>
//                                     <th width="10%">Status</th>
//                                     <th width="5%">Action</th>
//                                 </tr>
//                             </thead>
//                             <tbody className='table-bordered tbclass'>
//                                 {
//                                     data.map((data) => {
//                                         return (
//                                             <tr key="id">
//                                                 <td>{data.id}</td>
//                                                 <td><Link to="/client_hub">{data.name}</Link></td>
//                                                 <td>{data.phone}</td>
//                                                 <td>{data.noofassignments}</td>
//                                                 <td>{data.noofplans}</td>
//                                                 <td>{data.status}</td>
//                                                 <td>
//                                                     <button className='edit ' title='Edit'><Link to="/addclient"><FaPencilAlt className='pencil' /></Link></button>&nbsp;
//                                                     <button className='delete' title='Delete' onClick={() => { handleRemove(data) }}><BiTrash className='pencil' /></button>
//                                                 </td>
//                                             </tr>
//                                         )
//                                     })
//                                 }
//                             </tbody>
//                         </table>
//                     </div> */}
//           {status === "active" ? (
//             <ClientActiveTable />
//           ) : (
//             <ClientInActiveTable />
//           )}
//           {/* <div className="col-md-12">
//             <div className="mt-3">
              
//                 {" "}
               
//                 <div>
//                   Showing entries {entriesStart} to {entriesEnd} of{" "}
//                   {totalEntries}
//                 </div>
             
//               <nav
//                 aria-label="Page navigation example"
//                 className=" float-right"
//               >
//                 <ul class="pagination">
//                   <li class="page-item">
//                     <a class="page-link" href="#">
//                       <button
//                         onClick={() => handlePageChange(currentPage - 1)}
//                         disabled={currentPage === 1}
//                       >
//                         Previous
//                       </button>
//                     </a>
//                   </li>
//                   <li class="page-item active">
//                     <a class="page-link" href="#">
//                       <span>
//                         Page {currentPage} of {totalPages}
//                       </span>
//                     </a>
//                   </li>
                  
//                   <li class="page-item">
//                     <a class="page-link" href="#">
//                       <button
//                         onClick={() => handlePageChange(currentPage + 1)}
//                         disabled={currentPage === totalPages}
//                       >
//                         Next
//                       </button>
//                     </a>
//                   </li>
//                 </ul>
//               </nav>
//             </div>
//           </div> */}
//         </div>
//       </div>
//     </div>
//   );
// };
// export default Clients;
