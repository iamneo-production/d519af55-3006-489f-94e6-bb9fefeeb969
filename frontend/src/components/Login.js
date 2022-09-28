import React, { useState,useEffect } from "react";
import { Link,useLocation,useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from 'react-bootstrap'

import { axiosInstance } from "../config";
import { isEmail } from "../validation/validation";


import { showSuccessMsg, showErrMsg } from "../notifications/Notification";

import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
const initialState = {
  email: "",
  password: "",
  err: "",
  success: "",
};

function Login() {
  const [user, setUser] = useState(initialState);
  const [role,setRole]=useState("");
  console.log(role);
  const { email, password, err, success } = user;
  const location = useLocation();
  const navigate=useNavigate();
  const redirect = location.search ? location.search.split('=')[1] : `/${role}`
  useEffect(() => {
    if(role)
    {

      navigate(redirect)
    }
  }, [user,redirect])
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value, err: "", success: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isEmail(email))
      return setUser({ ...user, err: "Invalid email.", success: "" });
    try {
      const res = await axiosInstance.post("/login", {
        email,
        password,
      });
      var role=res.data.role;
      console.log("role");
      setRole(role);
      setUser({ ...user, err: "", success: res.data.msg });
      
    } catch (error) {
      error.response.data.msg &&
        setUser({ ...user, err: error.response.data.msg, success: "" });
      
    }
  };

  return (
    <div className="signup">
     
      <div className="text">
        <h1>Login</h1>
        {err && showErrMsg(err)}
        {success && showSuccessMsg(success)}
        <Form onSubmit={handleSubmit} className="mt-3">
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              onChange={handleChangeInput}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              onChange={handleChangeInput}
              required
            />
          </div>
          <div className="row justify-content-between">
            <div className="col-5">
              <button type="submit" className="btn btn-primary">
                Sign In
              </button>
            </div>
            <div className="col-6 mt-2 p-0 text-center">
              <Link className="text-decoration-none" to="/forgot_password">
                Forgot password
              </Link>
            </div>
          </div>
        </Form>
        <p className="mb-0 mt-2">
          New Customer?{" "}
          <Link to="/signup" className="text-decoration-none">
            signup
          </Link>
        </p>
       
      </div>
    </div>
  );
}

export default Login;
