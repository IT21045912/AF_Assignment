import React from 'react';
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBBtn,
    MDBIcon,
    MDBTypography,
    MDBInput,

} from 'mdb-react-ui-kit';
import Table from 'react-bootstrap/esm/Table';
import Button from 'react-bootstrap/esm/Button';

function Cart() {
    return (
        <section className="h-100 h-custom" style={{ backgroundColor: "" }}>
            <MDBContainer className="py-5 h-100">
                <MDBRow className="justify-content-center align-items-center h-100">
                    <MDBCol size="12">
                        <MDBCard className="card-registration card-registration-2" style={{ borderRadius: "15px" }}>
                            <MDBCardBody className="p-0">
                                <MDBRow className="g-0">
                                    <MDBCol lg="12">
                                        <div className="p-5">
                                            <div className="d-flex justify-content-between align-items-center mb-5">
                                                <MDBTypography tag="h1" className="fw-bold mb-0 text-black">
                                                    Cart
                                                </MDBTypography>
                                                <MDBTypography className="mb-0 text-muted">

                                                </MDBTypography>
                                            </div>

                                            <hr className="my-4" />

                                            <MDBRow className="mb-4 d-flex justify-content-between align-items-center">

                                                <MDBCol md="3" lg="3" xl="3">

                                                    <MDBTypography tag="h6" className="text-black mb-0">
                                                        <h3>Rice</h3>
                                                    </MDBTypography>
                                                </MDBCol>
                                                <MDBCol md="3" lg="3" xl="3" className="d-flex align-items-center">
                                                    <h3>40Kg</h3>
                                                </MDBCol>
                                                <MDBCol md="3" lg="2" xl="2" className="text-end">
                                                    <MDBTypography tag="h6" className="mb-0" style={{ width: "100px" }}>
                                                    </MDBTypography>
                                                </MDBCol>
                                                <MDBCol md="3" lg="2" xl="2" className="text-end">
                                                    <MDBTypography tag="h6" className="mb-0" style={{ width: "100px"  }}>
                                                        <Button variant="warning" style={{marginRight:"-100%"}}>Edit</Button>
                                                    </MDBTypography>
                                                </MDBCol>
                                                <MDBCol md="3" lg="2" xl="2" className="text-end">
                                                    <MDBTypography tag="h6" className="mb-0" style={{ width: "100px" }}>
                                                        <Button variant="danger">Delete</Button>
                                                    </MDBTypography>
                                                </MDBCol>

                                            </MDBRow>
                                            <MDBRow className="mb-4 d-flex justify-content-between align-items-center">

                                                <MDBCol md="3" lg="3" xl="3">

                                                    <MDBTypography tag="h6" className="text-black mb-0">
                                                        <h3>Carrot</h3>
                                                    </MDBTypography>
                                                </MDBCol>
                                                <MDBCol md="3" lg="3" xl="3" className="d-flex align-items-center">
                                                    <h3>10Kg</h3>
                                                </MDBCol>
                                                <MDBCol md="3" lg="2" xl="2" className="text-end">
                                                    <MDBTypography tag="h6" className="mb-0" style={{ width: "100px" }}>
                                                    </MDBTypography>
                                                </MDBCol>
                                                <MDBCol md="3" lg="2" xl="2" className="text-end">
                                                    <MDBTypography tag="h6" className="mb-0" style={{ width: "100px"  }}>
                                                        <Button variant="warning" style={{marginRight:"-100%"}}>Edit</Button>
                                                    </MDBTypography>
                                                </MDBCol>
                                                <MDBCol md="3" lg="2" xl="2" className="text-end">
                                                    <MDBTypography tag="h6" className="mb-0" style={{ width: "100px" }}>
                                                        <Button variant="danger">Delete</Button>
                                                    </MDBTypography>
                                                </MDBCol>

                                            </MDBRow>

                                            <Button variant="dark">Check Out</Button>

                                            <div className="pt-5">
                                                <MDBTypography tag="h6" className="mb-0">
                                                    <MDBCardText tag="a" href="#!" className="text-body">
                                                        <MDBIcon fas icon="long-arrow-alt-left me-2" /> Back
                                                        to shop
                                                    </MDBCardText>
                                                </MDBTypography>
                                            </div>
                                        </div>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </section>
    )
}

export default Cart