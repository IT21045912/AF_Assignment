import React, { useState }from "react";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function AddFertilizer() {

    const [, setFertilizerName] = useState();
    const [Contents, setContents] = useState();
    const [MeasurementUnit, setMeasurementUnit] = useState();
    const [Price, setPrice] = useState();
    
    const Validate = (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append("unit_price", Price)
        formData.append("name", FertilizerName)
        formData.append("contents", Contents)
        formData.append("measurement_unit", MeasurementUnit)
        formData.append("image_path","example.jpg")
    
        axios.post('http://localhost:1337/api/fertilzer-controller/', formData).then(async res => {
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
          <h2>Add Fertilizer for sale</h2>
          <h5>Once published farmers will be able to purchase them.</h5>
          <Form onSubmit={Validate}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name of fetilizer :</Form.Label>
              <Form.Control type="Name" placeholder="Name of Fertilizer.." onChange={(e) => { setFertilizerName(e.target.value) }}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Contents :</Form.Label>
              <Form.Control type="Name" placeholder="Brief description of contents.." onChange={(e) => { setContents(e.target.value) }}/>
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
              <Form.Control type="Number" placeholder="Unit Price (In LKR).." onChange={(e) => { setPrice(e.target.value) }}/>
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Enter image: </Form.Label>
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
    )}

export default AddFertilizer

