import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./clienthub.css";
import { FaArrowLeft, FaPlus, FaHome } from "react-icons/fa";
import { Tabs, Tab, TabPanel, TabList } from "react-web-tabs";
import axios from "axios";
import apiUrlsService from "../../services/apiUrls.service";
import CommonService from "../../services/common.service";
import { useForm } from "react-hook-form";

const ClientsHub = () => {
  const [data, setdata] = useState([]);
  // const [milistone, setMilistone] = useState([]);
  const [tid, setTid] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/CommonAll")
      .then((res) => {
        setdata(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  const [clients, setClients] = useState("");

  console.log(clients, "mani");

  const {
    register,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
  useEffect(() => {
    getAllClients();
  }, []);

  function getAllClients() {
    CommonService.getAll(apiUrlsService.getAllClients).then(
      (response) => {
        if (response) {
          setClients(response.data);
        }
      },
      (error) => {}
    );
  }

  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }); // Update the date every second

    return () => clearInterval(interval);
  }, []);

  const handleDownload = () => {
    const pdfPath = process.env.PUBLIC_URL + "/sample.pdf";
    const link = document.createElement("a");
    link.href = pdfPath;
    link.download = "sample.pdf";
    link.click();
  };

  return (
    <>
     
        <div className="card margin-bottom">
          <div className="row">
            <div className="col-md-6 padding-left">
              <Link className="svg-icon-height links-links" to={`/dashboard`}>
                <FaHome />
              </Link>{" "}
              &nbsp; /{" "}
              <Link className="svg-icon-height links-links" to={"/clients"}>
                Clients
              </Link>
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
          <div className="header-title" {...register("assignmentName")}>
            {" "}
            Client Hub :{" "}
            {clients &&
              clients.map((h, i) => (
                <label key={i} value={h.id}>
                  {h.client_name}
                </label>
              ))}{" "}
            {errors.assignmentName && (
              <span className="text-danger">This is required</span>
            )}{" "}
          </div>
        </div>

        
     
    </>
  );
};
export default ClientsHub;
