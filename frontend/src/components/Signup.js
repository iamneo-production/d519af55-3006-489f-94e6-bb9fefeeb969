import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { axiosInstance } from "../config";
import { showSuccessMsg, showErrMsg } from "../notifications/Notification";
import "../Css/signup.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { isEmail, isLength } from "../validation/validation.js";

const initialState = {
  shopname: "",
  shopaddress: "",
  phonenumber: "",
  email: "",

  password: "",
  err: "",
  success: "",
};

function Signup() {
  const location = useLocation();
  const navigate = useNavigate();
  const redirect = location.search ? location.search.split("=")[1] : "/login";

  const [role, setRole] = React.useState("admin");

  const handleChange = (event) => {
    setRole(event.target.value);
  };
  // useEffect(() => {
  //     navigate(redirect);

  // }, [user]);
  const [user, setUser] = useState(initialState);

  const { email, password, mobileNumber, username, err, success } = user;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value, err: "", success: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isEmail(email))
      return setUser({ ...user, err: "Invalid email.", success: "" });
    if (isLength(password))
      return setUser({
        ...user,
        err: "Password must be at least 6 chracters long.",
        success: "",
      });
    try {
      const res = await axiosInstance.post("/signup", {
        ...user,
        role: role,
        active: 1,
      });

      setUser({ ...user, err: "", success: res.data.msg });
      navigate(redirect);
    } catch (error) {
      error.response.data.msg &&
        setUser({ ...user, err: error.response.data.msg, success: "" });
    }
  };

  return (
    <div className="signup_main signup">
      <div className="image">
        <img src={process.env.PUBLIC_URL + "/img/slbg.png"} alt="" />
      </div>
      <div className="text">
        <h1>SignUp</h1>
        {err && showErrMsg(err)}
        {success && showSuccessMsg(success)}
        <form className="mt-3" onSubmit={handleSubmit}>
          <div className="d-flex formdiv">
            <div className="mb-3 me-3 w-50">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                onChange={handleChangeInput}
                value={username}
                required
              />
            </div>
            <div className="mb-3 w-50">
              <label htmlFor="mobileNumber" className="form-label">
                Phone Number
              </label>
              <input
                type="number"
                className="form-control"
                id="mobileNumber"
                name="mobileNumber"
                onChange={handleChangeInput}
                value={mobileNumber}
                required
              />
            </div>
          </div>
          <div className="d-flex formdiv">
            <div className="mb-3 w-50 me-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={email}
                onChange={handleChangeInput}
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3 w-50">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                name="password"
                password={password}
                id="password"
                required
                onChange={handleChangeInput}
              />
            </div>
          </div>
          <div className="mb-3 w-50">
            <label htmlFor="role" className="form-label">
              Role
            </label>
            <br />
            <select value={role} onChange={handleChange}>
              <option value="admin">Admin</option>
              <option value="customer">Customer</option>
            </select>
          </div>

          {/* <div className="mb-3 w-50">
            <label htmlFor="role" className="form-label">
              Role
            </label>

            <select value={role} onChange={handleChange}>
              <option value="admin">Admin</option>
              <option value="customer">Customer</option>
            </select>
          </div> */}
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="check"
              //   onChange={handleChangeInput}
              required
            />
            <label className="form-check-label" htmlFor="check">
              I agree
            </label>
          </div>

          <button
            type="submit"
            className="btn btn-primary d-flex justify-content-center align-items-center"
          >
            Sign Up
          </button>
          <p className="mb-0 mt-2">
            Already have an account?{" "}
            <Link className="text-decoration-none" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
