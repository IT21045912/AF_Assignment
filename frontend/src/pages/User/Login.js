import axios from "axios";
import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const Navigate = useNavigate();
  const Validate = (e) => {
    e.preventDefault();
    const data = {
      email,
      password
    }
    axios.post(`http://localhost:1337/api/auth-controller/login`, data)
      .then((res) => {
        alert(res.data.message);
        console.log(res.data);
        localStorage.setItem('uid', res.data.user._id);
        localStorage.setItem('Role', res.data.user.role);
        localStorage.setItem('Name', res.data.user.name);
        localStorage.setItem('Email', res.data.user.email);
        localStorage.setItem('Token', res.data.token);
        Navigate("/")
      })
      .catch((err) => {
        console.log(err);
        alert("UserName or Password incorrect");
      });
  }
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
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Email address :</Form.Label>
          <Form.Control type="Name" placeholder="Name"
            onChange={(e) => { setemail(e.target.value) }} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Password :</Form.Label>
          <Form.Control type="password" placeholder="Password"
            onChange={(e) => { setpassword(e.target.value) }} />
        </Form.Group>
        <Button onClick={Validate} variant="primary">
          Login
        </Button>
      </Form>
    </Container>
  );
}

export default Login;
