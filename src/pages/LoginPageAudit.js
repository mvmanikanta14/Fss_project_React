import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import api from "../services/api";
import { Tabs, Tab, TabPanel, TabList } from "react-web-tabs";
import tokenService from "../services/token.service";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { BsFillPersonFill, BsLockFill } from "react-icons/bs";
const LoginPageAudit = (props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState("");

    useEffect(() => {
      setErrMsg("");
      // loadFunction();
    }, [username, password]);

    const handleLogin = async (e) => {
      e.preventDefault();
      return api
        .post("/auth/signin", {
          username,
          password,
        })
        .then((response) => {
          if (response.data.accessToken) {
            tokenService.setUser(response.data);
            navigate(from, { replace: true });
            navigate("/dashboard")
          }
        }, err =>{
          errMsg(err.message);
        });
    };

  return (
    <div>
      <Tabs
        defaultTab="one"
        onChange={(tabId) => {
          console.log(tabId);
        }}
      >
        <body className="vc">
          <div className="login-overlay"> </div>
          <div class="col-md-6 col-lg-7 col-xs-6 postion-revert">
            <div class="login-text">
              <h1 class="f-34 line-1 anim-typewriter">AnyAudit. </h1>
              <h4 class="sub-title"> Excellence through Automation </h4>
              <p class="text-justify f-14 m-t-20">
                Anyaudit.in is a complete audit and GRC tool designed by
                Sadhguru Audit and GRC Solutions Pvt Limited. An integrated
                end-to-end solution that enables organizations to have complete
                Audit tool has become need of the hour. Anyaudit.in has been
                designed to ease the process of audit with more and more
                effectiveness and reliability with blend of old-aged audit and
                risk management techniques and sophisticated modern audit tools,
                customised as per the client requirement...
              </p>
            </div>
          </div>

          <div class="login-form">
            <img
              src="https://old.anyaudit.co.in/img/web-logo.png"
              class="login-logo"
            />
            <div class="w-100">
              {/* <ul class="nav nav-tabs"> */}
                <TabList>
                  {/* <li class="active"> */}
                    <Tab className=" rwt__tab rwt__tablist nav-tabs User-login-back-color" tabFor="one">
                      {" "}
                      User Login
                    </Tab>
                  {/* </li> */}
                  {/* <li class="text-rightss"> */}
                    <Tab className="rwt__tab tabtabs float-right mr-1 pt-1" tabFor="two">
                      {" "}
                      External User Login
                    </Tab>
                  {/* </li> */}
                </TabList>
              {/* </ul> */}
            </div>
            <TabPanel tabId="one">
              <div class="tab-content">
                <div role="tabpanel" class="tab-pane  in active" id="">
                  <div class="col">
                    <form onSubmit={handleLogin}
                     
                      class="myclassdummy testdummy  "
                      //   id="sign_in"
                      //   data-cust="1"
                      //   enctype="multipart/form-data"
                      //   method="post"
                      //   accept-charset="utf-8"
                      //   novalidate="novalidate"
                    >
                      <div class="input-group text-dark">
                        <div class="form-line">
                          <label class="mini-label">
                            {" "}
                            User Id <span class="text-danger">* </span>{" "}
                          </label>
                          <br />
                          {/* <span class="input-group-addon">
                      <i class="material-icons"></i>
                    </span> */}
                          <BsFillPersonFill />
                          <input
                            type="text"
                            autocomplete="off"
                            class="form-control-sign"
                            id="n_user"
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                           required
                          />
                        </div>
                      </div>

                      <div class="input-group text-dark">
                        <div class="form-line">
                          <label class="mini-label">
                            {" "}
                            Password <span class="text-danger">* </span>{" "}
                          </label>
                          <br />
                          {/* <span class="input-group-addon">
                      <i class="material-icons"></i>
                    </span> */}
                          <BsLockFill />
                          <input
                            type="password"
                            autocomplete="off"
                            class="form-control-sign"
                            id="n_user"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                          />
                          {errMsg}
                        </div>
                      </div>

                      <div class="pt-10">
                        <div class="col-xs-12">
                          <button
                            class="btn btn-block bg-green waves-effect login-btn"
                            id=""
                            name=""
                            type="submit"
                            // onClick = {handleLogin}
                            // href="https://www.google.com/"
                          >
                            
                            USER SIGN IN
                          </button>
                        </div>
                      </div>
                      {/* <div class="row"></div> */}
                    </form>
                  </div>
                </div>
                <div class="col-xs-12 text-right mt-25 mr-2">
                  <small class="text-dark">
                    {" "}
                    <Link className="links-links" to={"/forget_password"}>
                      Forgot Password?
                    </Link>{" "}
                  </small>
                </div>
              </div>
            </TabPanel>
            <TabPanel tabId="two">
            <div class="tab-content">
              <div role="tabpanel" class="tab-pane  in active" id="">
                <div class="col">
                  <form
                   
                    class="myclassdummy testdummy  "
                    //   id="sign_in"
                    //   data-cust="1"
                    //   enctype="multipart/form-data"
                    //   method="post"
                    //   accept-charset="utf-8"
                    //   novalidate="novalidate"
                  >
                    <div class="input-group text-dark">
                      <div class="form-line">
                        <label class="mini-label">
                          {" "}
                          User Id <span class="text-danger">* </span>{" "}
                        </label>
                        <br />
                        {/* <span class="input-group-addon">
                      <i class="material-icons"></i>
                    </span> */}
                        <BsFillPersonFill />
                        <input
                          type="text"
                          autocomplete="off"
                          class="form-control-sign"
                          id="n_user"
                          name="username"
                          placeholder=""
                          required=""
                          autofocus=""
                          aria-required="true"
                          aria-invalid="false"
                        />
                      </div>
                    </div>

                    <div class="input-group text-dark">
                      <div class="form-line">
                        <label class="mini-label">
                          {" "}
                          Password <span class="text-danger">* </span>{" "}
                        </label>
                        <br />
                        {/* <span class="input-group-addon">
                      <i class="material-icons"></i>
                    </span> */}
                        <BsLockFill />
                        <input
                          type="password"
                          autocomplete="off"
                          class="form-control-sign"
                          id="n_user"
                          name="username"
                          placeholder=""
                          required=""
                          autofocus=""
                          aria-required="true"
                          aria-invalid="false"
                        />
                      </div>
                    </div>

                    <div class="pt-10">
                      <div class="col-xs-12">
                        <button
                          class="btn btn-block bg-green waves-effect login-btn"
                          id="s_sign"
                          name="s_sign"
                          type="submit"
                        >
                          {" "}
                          EXTERNAL USER SIGN IN
                        </button>
                      </div>
                    </div>
                    <div class="row"></div>
                  </form>
                </div>
              </div>
              <div class="col-xs-12 text-right mt-25 mr-2">
                <small class="text-dark">
                  {" "}
                  <Link className="links-links" to={"/forget_password"}>
                    Forgot Password?
                  </Link>{" "}
                </small>
              </div>
            </div>
            </TabPanel>
          </div>
        </body>
      </Tabs>
    </div>
  );
};

export default LoginPageAudit;
