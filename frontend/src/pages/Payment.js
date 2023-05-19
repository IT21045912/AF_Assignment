import React, { useState } from "react";

import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
} from "mdb-react-ui-kit";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from "axios";

export default function Checkout() {
    const location = useLocation();
    const price = location.state.props
    const tot = price.totalPrice
    const [customer,setcustomer] = useState();
    const [currency ,setCurrency] = useState("LKR");
    const [cardNumber,setCardNumber] = useState();
    const [expMonth,setexpMonth] = useState();
    const [expYear ,setexpyear] = useState();
    const [ccv ,setcvv] = useState();
    const navigate = useNavigate();
    const amount = location.state?.props;



const Submit = (e) => {
    e.preventDefault();

    const data = {
        customer,
        amount,
        currency,
        cardNumber,
        expMonth ,
        expYear,
        ccv
    }

    axios.post(`http://localhost:3030/api/buy/pay/card`,data).then((res) => {
    console.log(res.data);

    navigate('/Success');
      
  })
}

const placeOrder = (e) => {
  
}

  return (
    <MDBContainer
      className="py-5"
      fluid
      style={{
        backgroundImage:
          "url(https://mdbcdn.b-cdn.net/img/Photos/Others/background3.webp)",
      }}
    >
      <MDBRow className=" d-flex justify-content-center">
        <MDBCol md="10" lg="8" xl="5">
          <MDBCard className="rounded-3">
            <MDBCardBody className="p-4">
              <div className="text-center mb-4">
                <h3>Rs.{amount}.00</h3>
                <h6>Payment</h6>
              <div className="">
                  <img
                    className="img-fluid"
                    src="https://img.icons8.com/color/48/000000/mastercard-logo.png"
                  />
                <img
                  className="img-fluid"
                  src="https://img.icons8.com/color/48/000000/visa.png"
                />
              </div>
              </div>
              <div className="d-flex flex-row align-items-center mb-4 pb-1">
              </div>
              <MDBInput
                label="Cardholder's Name"
                id="form3"
                type="text"
                size="lg"
                    value={customer} onChange={(e) => {setcustomer(e.target.value)}}
              />
              <MDBRow className="my-4">
                <MDBCol size="7">
                  <MDBInput
                    label="Card Number"
                    id="form4"
                    type="text"
                    size="lg"
                    value={cardNumber} onChange={(e) => {setCardNumber(e.target.value)}}
                  />
                </MDBCol>
                <MDBCol size="2">
                  <MDBInput
                    label="Month"
                    id="form5"
                    type="text"
                    size="lg"
                    placeholder={expMonth}
                    value={expMonth} onChange={(e) => {setexpMonth(e.target.value)}}
                  />
                </MDBCol>
                <MDBCol size="2">
                  <MDBInput
                    label="Year"
                    id="form5"
                    type="text"
                    size="lg"
                    value={expYear} onChange={(e) => {setexpyear(e.target.value)}}
                  />
                </MDBCol>
                <MDBCol size="2">
                  <MDBInput
                    label="CVV"
                    id="form6"
                    type="text"
                    size="lg"
                    placeholder={ccv}
                    value={ccv} onChange={(e) => {setcvv(e.target.value)}}
                  />
                </MDBCol>
              </MDBRow>
              <Button  onClick={placeOrder()} variant="success" size="lg">Pay</Button>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}