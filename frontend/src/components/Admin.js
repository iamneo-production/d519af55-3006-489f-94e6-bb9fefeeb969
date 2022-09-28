import React, { useState, useEffect } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import { Form, Button, Row, Col } from 'react-bootstrap'

import { axiosInstance } from "../config";
import TrainerComp from './TrainerComp';
import { showErrMsg, showSuccessMsg } from '../notifications/Notification';

const initialState = {
  name: "",
    shopname: "",
    email: "",
    experience: "",
    password: "",
  err: "",
  success: "",
};
const Admin = () => {
  const [trainers, setTrainers] = useState([]);
  const [trainer, setTrainer] = useState("");
  const [update, setUpdate] = useState(initialState);
  const { name, shopname, email, experience, password, err, success } = update;
  const [trigger, setTrigger] = useState(false);
  const [search, setSearch] = useState("");
  async function getUserData() {
    try {
      const response = await axiosInstance.get("/Admin");
      console.log(response);
      setTrainers(response.data);
      setTrainer(response.data);
    }
    catch (error) {
      console.log(error);
    }
  }

  const handlechange = (e) => {
    const { name, value } = e.target;
    setUpdate({ ...update, [name]: value, err: "", success: "" });
  };

  const handleAdd = async () => {
    try {
      const res = await axiosInstance.post("/Admin/add", {
        ...update
      });
      setUpdate({ ...update, err: "", success: res.data.msg });
      // setTrigger(!trigger)
    } catch (error) {
      console.log(update);
      error.response.data.msg &&
        setUpdate({ ...update, err: error.response.data.msg, success: "" });
      
    }
  }

  const handleUpdate = async (e) => {
    try {
      const res = await axiosInstance.put(`/Admin/update/${update.id}`, {
        update
      });
      setUpdate({ ...update, err: "", success: res.data.msg });
      setTrigger(!trigger)
    } catch (error) {
      error.response.data.msg &&
        setUpdate({ ...update, err: error.response.data.msg, success: "" });
      
    }
  }

  useEffect(() => {
    getUserData();
    const result = trainers.filter((elem) => {
      return elem.title.toLowerCase().includes(search.toLowerCase());
    });
    setTrainer(result);
  }, [search, trigger]);



  return (
    <div className="mx-5 my-3">
      <div class="container h-100">
        <div class="row h-100 justify-content-center align-items-center"></div>
        <InputGroup className="col-6">
          <FormControl
            placeholder="Search"
            aria-label="Search"
            aria-describedby="basic-addon2"
          />
          <Button variant="outline-secondary" id="button-addon2">
            Search
          </Button>

        </InputGroup>
        <div className="home">
          <div className="home_container row">
            <div className="trainer_container col-6">
              {trainer.length ? (
                trainer.map((elem, idx) => {
                  return (
                    <TrainerComp
                      id={elem.id}
                      name={elem.name}
                      email={elem.email}
                      shopname={elem.shopname}
                      password={elem.password}
                      experience={elem.experience}
                      trigger={trigger}
                      setTrigger={setTrigger}
                      setUpdate={setUpdate}
                    />
                  );
                })
              ) : (
                <p
                  style={{
                    textAlign: "center",
                    fontSize: "1rem",
                    height: "10rem",
                  }}
                >
                  No match found
                </p>
              )}
            </div>
            <div className="col-6 my-3">
              <h2 className="text-center">Add/Edit details</h2>
              {err && showErrMsg(err)}
              {success && showSuccessMsg(success)}
              <Form role="form" >
                <div class="row">
                  <div class="form-group">
                    <input type="text" name="name" onChange={handlechange} value={name} class="form-control" id="name" placeholder="Your Name"  required />
                  </div>
                  <div class="form-group mt-3">
                    <input type="email" class="form-control" onChange={handlechange}  value={email} name="email" id="email" placeholder="Your Email" required />
                  </div>
                  <div class="form-group mt-3">
                    <input type="number" class="form-control" onChange={handlechange}  value={experience}  name="experience" id="experience" placeholder="Your experience" required />
                  </div>
                  <div class="form-group mt-3">
                    <input type="text" class="form-control" onChange={handlechange} value={shopname}  name="shopname" id="shopname" placeholder="your shopname" required />
                  </div>
                  <div class="form-group mt-3">
                    <input type="text" class="form-control" onChange={handlechange}  value={password} name="password" id="password" placeholder="your password" required />
                  </div>
                </div>
                <div class="text-center mt-5"><button type="submit" onClick={handleAdd} className="mr-2">Add</button>
                <button type="submit" onClick={handleUpdate}>Update</button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div >

  )
}

export default Admin
