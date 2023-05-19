import axios from "axios";
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCardText,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBInput,
    MDBRow,
    MDBTypography,
    } from "mdb-react-ui-kit";
    import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";

function HarvestCart() {

  const [items,setItems] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("Token")
  const user = localStorage.getItem("uid")

  const config = {
    headers: { 'Authorization': `Bearer ${token}` }
  };

  useEffect(() => {
    axios.get(`http://localhost:1337/api/cart-controller/all/${user}`, config).then((res) => {
      setItems(res.data.Carts);
    }).catch(err => {
      alert(err)
      return 
    })
  },[items]);
  
  const removeCart = (id) => {
    axios.delete(`http://localhost:1337/api/cart-controller/${id}`).then((res) => {
    setItems(res.data.remainingItems);
  })
}
 
const checkout = () => {
  axios.post(`http://localhost:1337/api/cart-controller/checkout`).then((res) => {
    console.log(res.data);
    const amount = res.data
      navigate('/Checkout', { state: { props: amount } })
  })
}
 
  return (
    <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
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
                          Shopping Cart
                        </MDBTypography>
                        <MDBTypography className="mb-0 text-muted">
                          
                        </MDBTypography>
                      </div>
    
                      <hr className="my-4" />
                      {items.map((elem) => (
                        <>
                      <MDBRow className="mb-4 d-flex justify-content-between align-items-center">
                        
                        <MDBCol md="3" lg="3" xl="3">
                          
                          <MDBTypography tag="h6" className="text-black mb-0">
                            {elem.itemName}
                          </MDBTypography>
                        </MDBCol>
                        <MDBCol md="3" lg="3" xl="3" className="d-flex align-items-center">
                          <MDBBtn color="link" className="px-2">
                            <MDBIcon fas icon="minus" />
                          </MDBBtn>
    
                          <MDBInput type="number" min="0"  defaultValue={elem.quantity} size="sm" />
    
                          <MDBBtn color="link" className="px-2">
                            <MDBIcon fas icon="plus" />
                          </MDBBtn>
                        </MDBCol>
                        <MDBCol md="3" lg="2" xl="2" className="text-end">
                          <MDBTypography tag="h6" className="mb-0" style={{width:"100px"}}>
                            Rs.{elem.price}.00
                          </MDBTypography>
                        </MDBCol>
                        <MDBCol md="3" lg="2" xl="2" className="text-end">
                          <MDBTypography tag="h6" className="mb-0" style={{width:"100px"}}>
                            <Button onClick = {() => removeCart(elem._id)} variant="danger">Delete</Button>
                          </MDBTypography>
                        </MDBCol>
                        
                      </MDBRow>
    
                        </>
                      ))}
                      <Button variant="dark" onClick = {() => {checkout ()}}>Check Out</Button>
                     
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

export default HarvestCart