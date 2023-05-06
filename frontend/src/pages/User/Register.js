import React from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import image from "../../Images/farmer.jpg";

function Register() {
  return (
    <Container
      fluid
      style={{
        marginTop: "10%",
        display: "block",
        width: "50%",
        justifyContent: "center",
      }}
    >
      <center style={{ marginBottom: "30px" }}>
        <h1>Register</h1>
      </center>
      <Row>
        <Col>
          <div style={{ backgroundColor: "#FFD95A", borderRadius: "10px", padding: "10px" }}>
            <center>
              <img src={image} style={{ padding: "10px" }} />
            </center>
          </div>
        </Col>
        <Col>
          <div
            style={{
              backgroundColor: "#FFD95A",
              borderRadius: "10px",
              padding: "10px",
            }}
          >
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Name :</Form.Label>
                <Form.Control type="Name" placeholder="Name" />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="email" placeholder="name@example.com" />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Address :</Form.Label>
                <Form.Control type="Address" placeholder="Address" />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Phone :</Form.Label>
                <Form.Control type="Phone" placeholder="Phone" />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Password</Form.Label>
                <Form.Control type="Password" placeholder="Password" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Register
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;
