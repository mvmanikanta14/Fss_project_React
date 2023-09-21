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

const Pincode = () => {

  const { id } = useParams();
  const [pincode, setPincode] = useState();
 
  const navigate = useNavigate();


  

  useEffect(() => {
    getAllPincode();
    // if (id) {
    //   setTitle("Update");
    
    // }
  }, []);

 
  function getAllPincode() {
    CommonService.getAll(apiUrlsService.getAllPincode).then(
      (response) => { 
        // console.log(response, "here pincode")
        if (response) {

          setPincode(response.data.content);
          
        }
      },
      (error) => {
        // Handle error
      }
    );
  }

 

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log(searchTerm,"searchTerm")
    // Define your API endpoint
    // const apiUrl = `https://your-api-endpoint.com/search?term=${searchTerm}`;
    const apiUrl = apiUrlsService.getAllPincode+'?pinCode='+searchTerm;

    console.log(apiUrl,"apiUrl")
    // Function to fetch data from the API
    const fetchData = async () => {
      try {
        setIsLoading(true);
        CommonService.getAll(apiUrl).then(
          (response) => {
          if (response) {
          console.log(response,"yudgfydg")
          setPincode(response.data.content);
        }})
      }
    
      //   console.log(response,"ijij")
      //   if (!response.ok) {
      //     throw new Error('Network response was not ok');
      //   }
        
      //   // const data = await response;
        
      //   setTypeofLocation(response.content);
      //   setIsLoading(false);
       catch (error) {
        console.log("error",error)
        // console.error('Error fetching data:', error);
        setIsLoading(false);
      };
    };
  

    // Only fetch data if the search term is not empty
    if (searchTerm !== '') {
      fetchData();
    } else {
    getAllPincode();
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
                PinCode
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
            <div className="header-title">PinCode</div>
          </div>

          <div className="col-md-12 border bg-white pb- pt-2 mt-3 mb-4 pl-0 pr-0 rounded">
            <div className="col-md-12">
            <div>
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {isLoading ? (
                            <p>Loading...</p>
                        ) : (
                            <ul>
                            {searchResults.map((result) => (
                                <li key={result.id}>{result.name}</li>
                            ))}
                            </ul>
                        )}
                        </div>
            
            </div>

            <div className="col-md-12 pt-0">
              <table className="border table-striped ttable">
                <thead className="thclass">
                  <tr>
                    <th>S.No</th>
                    <th>State Name</th>
                    <th>City Name </th>
                    <th>PinCode</th>
                    <th>State Key</th>
                    <th>City Key</th>
                   
                  </tr>
                </thead>
                <tbody className="table-bordered tbclass">
                {Array.isArray(pincode)
                    ? pincode
                        .slice()
                        .reverse()
                        .map((item, index) => {
                          return (
                            <tr key={item.index}>
                              <td>{index + 1}</td>
                              <td>{item.stateName} </td>  
                              <td>{item.cityName}</td>
                              <td>{item.pinCode}</td>
                              <td>{item.stateKey}</td>
                              <td>{item.cityKey}</td>

                
                             
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

export default Pincode;
