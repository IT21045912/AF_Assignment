import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function AddHarvest() {

  const [ProduceName, setProduceName] = useState();
  const [Category, setCategory] = useState();
  const [MeasurementUnit, setMeasurementUnit] = useState();
  const [Price, setPrice] = useState();
  const [Quantity, setQuantity] = useState();

  const seller = localStorage.getItem("Name")

  const Validate = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("seller", seller)
    formData.append("unit_price", Price)
    formData.append("name", ProduceName)
    formData.append("measurement_unit", MeasurementUnit)
    formData.append("category", Category)
    formData.append("quantity", Quantity)
    formData.append("image_path", "example.jpg")


    axios.post('http://localhost:1337/api/harvest-controller/', formData).then(async res => {
      console.log("Item inserted");
      toast.success('Product Insert Successful')
    }).catch(err => {
      console.log("Item insert failed")
      toast.error('Product Insert Unsuccesful')
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
      <h2>Publish your Harvest Here!</h2>
      <h5>Once published customers will be able to see and purchase your harvest.</h5>
      <Form onSubmit={Validate}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Name of Produce :</Form.Label>
          <Form.Control type="Name" placeholder="Name of Produce.." onChange={(e) => { setProduceName(e.target.value) }} />
        </Form.Group>
        <Form.Group className="mb-3" >
          <Form.Label>Category</Form.Label>
          <Form.Select onChange={(e) => { setCategory(e.target.value) }}>
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
          <Form.Select onChange={(e) => { setMeasurementUnit(e.target.value) }}>
            <option>--Select the unit--</option>
            <option value='Kg'>Kg</option>
            <option value='g'>g</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Unit Price (In LKR) :</Form.Label>
          <Form.Control type="Number" placeholder="Unit Price (In LKR).." onChange={(e) => { setPrice(e.target.value) }} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Quantity :</Form.Label>
          <Form.Control type="Number" placeholder="Unit Price (In LKR).." onChange={(e) => { setQuantity(e.target.value) }} />
        </Form.Group>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Enter product image: </Form.Label>
          <Form.Control type="file" accept='image/*' required />
        </Form.Group>
        <Button variant="primary" type="submit">
          Publish for Sale
        </Button>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </Form>
    </Container>
  )
}



export default AddHarvest