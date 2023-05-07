import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/esm/Button';
import Container from 'react-bootstrap/esm/Container';
import Table from 'react-bootstrap/Table'

function AdminDash() {
    const [pendingOrders, setpendingOrders] = useState([]);
    const [approvedOrders, setapprovedOrders] = useState([]);
    const token = localStorage.getItem("Token")
    const config = {
        headers: { 'Authorization': `Bearer ${token}` }
    };
    useEffect(() => {
        axios.get(`http://localhost:1337/api/auth-controller/get/all`,config).then((res) => {
            console.log("first", res.data.users)
            setpendingOrders(res.data.users)
            console.log(pendingOrders);

        }).catch(err => {
            alert(err)
        })
    }, [])

    // useEffect(() => {
    //     axios.get(`http://localhost:1337/order-controller/Order/order/Approved`, config).then((res) => {
    //         // console.log("first", res.data)
    //         setapprovedOrders(res.data)
    //         console.log(pendingOrders);

    //     }).catch(err => {
    //         alert(err)
    //     })
    // }, [approvedOrders])

    const deleteRecord = (e) => {
        const id = e._id
        console.log(id);
        axios.delete(`http://localhost:1337/order-controller/Order/order/delete/${id}`, config).then(res => {
            alert("Item Deleted !")
        }).catch(err => {
            alert(err);
        })
    }

    const updateDetails = (e) => {
        const id = e._id
        console.log(id);
        axios.patch(`http://localhost:1337/api/auth-controller/${id}`, config)
    }

    return (
        <>
            <Container style={{ backgroundColor: 'white', width: '100%', marginTop: '20px', padding: '20px', borderRadius: '15px' }}>
                <h1 style={{ marginBottom: '1%' }}><center>

                    Admin Dashboard
                </center>
                </h1>
                <div style={{ display: 'flex' }}>
                    <div style={{ flex: 1, padding: "10px" }}>
                        <h2>Users</h2>
                        <Table striped bordered hover style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}>
                            <thead>

                                <tr>
                                    <th>Customer</th>
                                    <th>Role</th>
                                    <th>Email</th>
                                    <th>Edit</th>

                                </tr>
                            </thead>
                            <tbody>
                                {pendingOrders.map((elem, id) => (
                                    <tr key={id} style={{ textAlign: 'center', fontWeight: '400' }}>
                                        <td>{elem.name}</td>
                                        <td>{elem.role}</td>
                                        <td>{elem.email}</td>
                                        <td>
                                            <Button variant="outline-primary" onClick={() => { updateDetails(elem) }}>Approve</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                    <div style={{ flex: 1, padding: "10px" }}>
                        {/* <h2>Approved Orders</h2>
                        <Table striped bordered hover style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}>
                            <thead>

                                <tr>
                                    <th>Customer</th>
                                    <th>Status</th>
                                    <th>Amount</th>
                                    <th>Edit</th>

                                </tr>
                            </thead>
                            <tbody>
                                {approvedOrders.map((elem, id) => (
                                    <tr key={id} style={{ textAlign: 'center', fontWeight: '400' }}>
                                        <td>{elem.Customer}</td>
                                        <td>{elem.Status}</td>
                                        <td>{elem.Amount}</td>
                                        <td>
                                            <Button variant="outline-primary" onClick={() => { deleteRecord(elem) }}>Delete</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table> */}
                    </div>
                </div>
            </Container >
        </>
    )
}


export default AdminDash