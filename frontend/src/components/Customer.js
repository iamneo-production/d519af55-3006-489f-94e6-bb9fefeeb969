import React, { useEffect, useState } from 'react'
import { Card, Row, Col, Container } from "react-bootstrap";
import { axiosInstance } from "../config";
import { showSuccessMsg, showErrMsg } from "../notifications/Notification";

const initialstate = {
  err: "",
  success: ""
}

export default function Customer() {
  //https://nba-players.herokuapp.com/players-stats

  const [trainers, setTrainers] = useState([]);
  const [data, setData] = useState(initialstate);
  const { err, success } = data;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get('/Trainer');
        setTrainers(res.data);
        setData({ err: "", success: res.data.msg });
      } catch (error) {
        error.response.data.msg &&
          setData({ err: error.data.msg, success: "" });

      }
    }
    fetchData()
  }, [])
  return (
    <Container>
      <Row>
        {err && showErrMsg(err)}
        {success && showSuccessMsg(success)}
        {trainers.map((playerData, k) => {
          return (
            <Col key={k} xs={12} md={4} lg={3} style={{marginTop: "10rem"}}>
              <Card style={{ backgroundColor: "beige" }}>

                <Card.Body>
                  <Card.Title>{playerData.name}</Card.Title>
                  <Card.Text>{playerData.experience}</Card.Text>
                  <Card.Text>{playerData.shopname}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          );
        }
        )}
      </Row>
    </Container>
  );
}