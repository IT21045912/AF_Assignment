import React, { useState } from 'react'
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import image from "../../images/farmer.jpg";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function FarmerRegister() {

  const [RegNo, setRegNo] = useState();
  const [name, setname] = useState();
  const [email, setemail] = useState();
  const [address, setaddress] = useState();
  const [contact_number, setcontact_number] = useState();
  const [password, setpassword] = useState();
  const [status, setstatus] = useState(false);
  const [role, setrole] = useState("Farmer");
  const [filePath, setfilePath] = useState();
  const Navigate = useNavigate();


  const Submit = (e) => {
    console.log("Hi");
    e.preventDefault();

    const formData = new FormData();
    formData.append("RegNo", RegNo)
    formData.append("name", name)
    formData.append("email", email)
    formData.append("address", address)
    formData.append("contact_number", contact_number)
    formData.append("password", password)
    formData.append("status", status)
    formData.append("role", role)
    formData.append("filePath", filePath)



    axios.post(`http://localhost:1337/api/auth-controller/register`, formData).then(res => {
      if (res.status === 201) {
        const data = { "email": email, "password": password }
        axios.post(`http://localhost:1337/api/auth-controller/login`, data)
          .then((res) => {
            alert(res.data.message);
            console.log(res.data);
            localStorage.setItem('uid', res.data.user._id);
            localStorage.setItem('Role', res.data.user.role);
            localStorage.setItem('Name', res.data.user.name);
            localStorage.setItem('Email', res.data.user.email);
            localStorage.setItem('Token', res.data.token);
          })
          .catch((err) => {
            console.log(err);
            alert("UserName or Password incorrect");
          });
      } else {
        alert("Register Failed");
      }
      Navigate("/");
    }).catch(e => {
      alert(e)
    })

  }

  return (
    <Container
      fluid
      style={{
        marginTop: "8%",
        display: "block",
        width: "50%",
        justifyContent: "center",
      }}
    >
      <center style={{ marginBottom: "30px" }}>
      </center>
      <Row>
        <Col>
          {/* linear- gradient(to bottom, #e5f9db 0 %, #66ff99 100 %), */}
          <div style={{ borderRadius: "10px", padding: "10px", background: 'linear-gradient(to bottom, #e5f9db 0%, #66ff99 100%)' }}>
            <center>
              <img src={image} style={{ padding: "10px" }} />
            </center>
          </div>
        </Col>
        <Col>
          <div
            style={{
              borderRadius: "10px",
              padding: "8px",
            }}
          >
            <h2>Sign Up</h2>
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Registration No :</Form.Label>
                <Form.Control type="Name" placeholder="Name"
                  onChange={(e) => { setRegNo(e.target.value) }} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Name :</Form.Label>
                <Form.Control type="Name" placeholder="Name"
                  onChange={(e) => { setname(e.target.value) }} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="name@example.com"
                  onChange={(e) => { setemail(e.target.value) }} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Address :</Form.Label>
                <Form.Control type="Address" placeholder="Address"
                  onChange={(e) => { setaddress(e.target.value) }} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Phone :</Form.Label>
                <Form.Control type="Phone" placeholder="Phone"
                  onChange={(e) => { setcontact_number(e.target.value) }} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Password</Form.Label>
                <Form.Control type="Password" placeholder="Password"
                  onChange={(e) => { setpassword(e.target.value) }} />
              </Form.Group>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Enter Document: </Form.Label>
                <Form.Control type="file" accept='image/*' required
                  onChange={(e) => { setfilePath(e.target.value) }} />
              </Form.Group>
              <Button variant="primary" type="submit" onClick={(e) => { Submit(e) }}>
                Register
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default FarmerRegister