import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import axios from 'axios';
import { useLocation, useNavigate } from "react-router-dom";

function AddFertilizer() {

    const [FertilizerName, setFertilizerName] = useState();
    const [Contents, setContents] = useState();
    const [MeasurementUnit, setMeasurementUnit] = useState();
    const [Price, setPrice] = useState();
    const [id, setID] = useState();

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        try {
            const fertilizerData = location.state.data;
            console.log("fertilizer data:::::: ", fertilizerData);

            setFertilizerName(fertilizerData.name);
            setContents(fertilizerData.contents);
            setMeasurementUnit(fertilizerData.measurement_unit);
            setPrice(fertilizerData.unit_price);
            setID(fertilizerData._id);
        } catch (err) {
            navigate(-1);
        }
    }, [])

    const Validate = (e) => {
        // e.preventDefault();

        // const

    }


    return (
        <Container
            fluid
            style={{
                marginTop: "5%",
                marginBottom: "5%",
                display: "block",
                width: "50%",
                justifyContent: "center",
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '6px'
            }}
        >
            <h2>Edit the Fertilizer Details</h2>
            <Form onSubmit={(e) => { Validate(e) }}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Name of fetilizer :</Form.Label>
                    <Form.Control type="Name" placeholder="Name of Fertilizer.." value={FertilizerName} onChange={(e) => { setFertilizerName(e.target.value) }} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Contents :</Form.Label>
                    <Form.Control type="Name" placeholder="Brief description of contents.." value={Contents} onChange={(e) => { setContents(e.target.value) }} />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Measurement Unit</Form.Label>
                    <Form.Select onChange={(e) => { setMeasurementUnit(e.target.value) }} value={MeasurementUnit}>
                        <option>--Select the unit--</option>
                        <option value='Kg'>Kg</option>
                        <option value='g'>g</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Unit Price (In LKR) :</Form.Label>
                    <Form.Control type="Number" placeholder="Unit Price (In LKR).." onChange={(e) => { setPrice(e.target.value) }} value={Price} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Save
                </Button>
            </Form>
        </Container>
    )
}

export default AddFertilizer

