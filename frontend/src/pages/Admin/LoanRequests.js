import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/esm/Button'
import Container from 'react-bootstrap/esm/Container'
import Table from 'react-bootstrap/esm/Table'

function LoanRequests() {

    const [loans, setLoans] = useState([]);
    const [Aloans, setALoans] = useState([]);
    const token = localStorage.getItem("Token")
    const config = {
        headers: { 'Authorization': `Bearer ${token}` }
    };
    // useEffect(() => {
    //     axios.get(`http://localhost:1337/api/loan-controller//approved-loans`, config).then((res) => {
    //         // console.log("first", res.data)
    //         setALoans(res.data.Loans)
    //         console.log(Aloans);

    //     }).catch(err => {
    //         alert(err)
    //     })
    // }, [])
    // axios.get('http://localhost:1337/api/loan-controller/approved-loans',config)
    //     .then(response => {
    //         setALoans(response.data)
    //         console.log(Aloans);
    //     })
    //     .catch(error => {
    //         console.error(error);
    //     });

    useEffect(() => {
        axios.get(`http://localhost:1337/api/loan-controller/`, config).then((res) => {
            // console.log("first", res.data)
            setLoans(res.data.Loans)
            // console.log(loans);

        }).catch(err => {
            alert(err)
        })
    }, [])

    const updateDetails = (e) => {
        const id = e._id
        console.log(id);
        axios.put(`http://localhost:1337/api/loan-controller/Update/${id}`)
    }
    return (
        <Container style={{ backgroundColor: 'white', width: '100%', marginTop: '20px', padding: '20px', borderRadius: '15px' }}>
            <h1 style={{ marginBottom: '1%' }}><center>

                Admin Dashboard
            </center>
            </h1>
            
            <h2>Loan Requests</h2>            
            <div style={{ display: 'flex' }}>
                <div style={{ flex: 1, padding: "10px" }}>
                    <h2>Pending Loans</h2>
                    <Table striped bordered hover style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}>
                        <thead>

                            <tr>
                                <th>Customer</th>
                                <th>Reason</th>
                                <th>Special Notice</th>
                                <th>Amount</th>
                                <th>Time</th>
                                <th>Option</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loans.map((elem, id) => (
                                <tr key={id} style={{ textAlign: 'center', fontWeight: '400' }}>
                                    <td>{elem.requested_by}</td>
                                    <td>{elem.reason}</td>
                                    <td>{elem.special_notice}</td>
                                    <td>Rs.{elem.amount}</td>
                                    <td>{elem.time}</td>
                                    <td>
                                        <Button variant="outline-primary" onClick={() => { updateDetails(elem) }}>Approve</Button>
                                        <Button variant="outline-danger" onClick={() => { updateDetails(elem) }} style={{ marginLeft: "10px" }}>Reject</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
            <div style={{ padding: "10px" }}>
                <h2>Approved Loans</h2>
                <Table striped bordered hover style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}>
                    <thead>

                        <tr>
                            <th>Customer</th>
                            <th>Reason</th>
                            <th>Special Notice</th>
                            <th>Amount</th>
                            <th>Time</th>
                            <th>Option</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {Aloans.map((elem, id) => ( */}
                            <tr style={{ textAlign: 'center', fontWeight: '400' }}>
                                <td>Shehan</td>
                                <td>Buy New Tractor</td>
                                <td>Need Within 1 Week</td>
                                <td>Rs.250,000,000</td>
                                <td>2025-02-16</td>
                                <td>
                                    <Button variant="outline-primary" >Update</Button>
                                    <Button variant="outline-danger" style={{ marginLeft: "10px" }}    >Delete</Button>
                                </td>
                            </tr>
                        {/* ))} */}
                    </tbody>
                </Table>
            </div>
        </Container >
    )
}

export default LoanRequests