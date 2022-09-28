import React ,{useState,useEffect} from "react";
import { Link,useLocation ,useNavigate} from "react-router-dom";
import {axiosInstance} from "../config";
import { showSuccessMsg, showErrMsg } from "../notifications/Notification";
import "../Css/signup.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { isEmail} from "../validation/Validation.js";

const initialState = {
  username: "",
  // shopaddress: "",
  mobileNumber: "",
  email: "",
  password: "",
  err: "",
  success: "",
 
 
  active:"1",
};

function SignUp() {
  const location=useLocation();
  const navigate=useNavigate();
  const redirect=location.search?location.search.split('=')[1]:"/login"
  useEffect(()=>{
    navigate(redirect)

  },[redirect])

  const [ role, setRole] = React.useState('admin');
  // const location=useLocation();
  // const redirect=location.search? location.search.split('=')[1]: '/login'

  const handleChange = (event) => {
    setRole(event.target.value);
  };

 

  
  const [user, setUser] = useState(initialState);
  const { username, mobileNumber, email, password ,err, success,active} =
    user;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value, err: "", success: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isEmail(email))
      return setUser({ ...user, err: "Invalid email.", success: "" });
    // if (isLength(password))
    //   return setUser({
    //     ...user,
    //     err: "Password must be at least 6 chracters long.",
    //     success: "",
    //   });
    try {
      const res = await axiosInstance.post("/signup",{...user, role});
      <link to={redirect?`/login?redirect=${redirect}`:'/login'}/>
      




      setUser({ ...user, err: "", success: res.data.msg });
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
        <form onSubmit={handleSubmit} className="mt-3">
          <div className="d-flex formdiv">
            <div className="mb-3 me-3 w-50">
              <label htmlFor="username" className="form-label">
                User Name
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
              
                required
                onChange={handleChangeInput}
              />
            </div>
            <div className="mb-3 w-50">
              <label htmlFor="mobileNumber" className="form-label">
                Mobile Number
              </label>
              <input
                type="text"
                className="form-control"
                id="mobileNumber"
                name="mobileNumber"
                value={mobileNumber}
                onChange={handleChangeInput}
                 
                
                
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
                aria-describedby="emailHelp"
                onChange={handleChangeInput}
                
              />
            </div>
            <div className="mb-3 w-50">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                onChange={handleChangeInput}
                value={password}
                name="password"
             
                required
              
              />
            </div>
          </div>

          <div className="d-flex formdiv">
            {/* <div className="mb-3 w-50 me-3">
              <label htmlFor="shopaddress" className="form-label">
                 Address
              </label>
              <input
                type="text"
                className="form-control"
                id="shopaddress"
                
                name="shopaddress"
                aria-describedby="emailHelp"
                onChange={handleChangeInput}
                
              />
            </div> */}
            <div className="mb-3 w-50">
            <label htmlFor="role" className="form-label">
        Role
        </label>
        <select value={role} onChange={handleChange} className="form-control">
          <option value="admin">admin</option>
          <option value="customer">customer</option>
          {/* <option value="meat">Meat</option> */}
        </select>
      {/* </label> */}

      {/* <p>We eat {value}!</p> */}
            </div>
          </div>
          {/* <div className="mb-3">
            <label htmlFor="shopaddress" className="form-label">
              Shop Address
            </label>
            <input
              type="text"
              className="form-control"
              id="shopaddress"
              name="shopaddress"
            
              required
              
            />
          </div> */}
          
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="check"
              required
            />
            <label className="form-check-label" htmlFor="check">
              I agree
            </label>
          </div>
          <button type="submit" className="btn btn-primary d-flex justify-content-center align-items-center">
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

export default SignUp;
