import React from "react";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";

function Login() {
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
          <Form.Control type="Name" placeholder="Name" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Password :</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Button>
            Login
        </Button>
      </Form>
    </Container>
  );
}

export default Login;
