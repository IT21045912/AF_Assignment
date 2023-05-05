import React from "react";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";

function addHarvest() {
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
          <h2>Publish your Harvest Here!</h2>
          <h5>Once published customers will be able to see and purchase your harvest.</h5>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name of Produce :</Form.Label>
              <Form.Control type="Name" placeholder="Name of Produce.." />
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>Category</Form.Label>
                <Form.Select>
                    <option>--Select the category of produce--</option>
                    <option value='Fruits'>Fruits</option>
                    <option value='Vegetables'>Vegetables</option>
                    <option value='Rice & Grains'>Rice & Grains</option>
                    <option value='Meat'>Meat</option>
                    <option value='Dairy'>Dairy</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>Measurement Unit</Form.Label>
                <Form.Select>
                    <option>--Select the unit--</option>
                    <option value='Kg'>Kg</option>
                    <option value='g'>g</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Unit Price (In LKR) :</Form.Label>
              <Form.Control type="Number" placeholder="Unit Price (In LKR).." />
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Enter product image: </Form.Label>
                <Form.Control type="file" accept='image/*' required />
            </Form.Group>
            <Button>
                Publish for Sale
            </Button>
          </Form>
        </Container>
    )}

export default addHarvest