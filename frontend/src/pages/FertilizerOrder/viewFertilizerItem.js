import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/esm/Container'
import { useLocation, useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Divider ,Typography ,CardContent} from '@material-ui/core';
import axios from 'axios';
import Button from 'react-bootstrap/esm/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { MDBInput } from 'mdb-react-ui-kit';
import Image from "../../images/paddy.jpg"


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      color: theme.palette.text.secondary,
    },
    cards: {
      flexGrow: 1,
      padding: 10
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
    }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      fontSize: 30,
    },
  }));

function ViewItems() {
    const location = useLocation();
    const ID = location.state.props;
    const [item,setItem] = useState([]);
    const [image,setImages] = useState();
    const [quantity,setQuantity] = useState();
   

    const token = localStorage.getItem("Token")
    const config = {
      headers: { 'Authorization': `Bearer ${token}` }
    };
    useEffect(() => {
      axios.get(`http://localhost:1337/api/fertilzer-controller/${ID}`,config).then((res) => {
        setItem(res.data.Fertlizer);
        console.log(item)
      }).catch(err => {
        alert(err)
      })
    },[]);
    const itemName = item.name;
    console.log(itemName);
     
  
  const AddToCart = (e) => {
    // console.log(e._id);
    // const Cart =  {
    //   item:item.ItemNo,
    //   quantity,
    //   itemName : item.ItemName,
    //   price : item.Price
    // }
    // console.log(Cart);
    // axios.post(`${baseURL}/buyer-service-controller/api/buy/cart/add`,Cart ,config).then(res => {
    //     alert("Item Added To Cart Successfully");
    //   }).catch(e => {
    //     alert(e)
    //   })
  };
     
    const classes = useStyles();
  
    return (
      <>
        <Container style={{ backgroundColor: 'white', width: '80%', marginTop: '20px', padding: '20px', borderRadius: '15px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2%' }}>
          </div>
          <Grid container spacing={3}>
            <Grid item xs={10} sm={6} md={6} style={{maxHeight:"100%",maxWidth:"500px"}}>
              <Card>
                <center>
  
                <img
                  src={Image}
                  alt="Nothing"
                  style={{
                    width : "50%",
                    height : "100%"
                  }}
                  />
                  </center>
              </Card>
            </Grid>
            <Grid item  sm={6} >
              <Paper className={classes.paper}>
                <h2>{item.name}</h2>                   
                <h4>{item.contents}</h4>
                <br/>
                <h3>Rs.{item.unit_price}.00 per {item.measurement_unit}</h3>
                <h5>Enter Amount : </h5>
                <MDBInput  id='typeNumber' type='number' value={quantity} onChange={(e) => {setQuantity(e.target.value)}} defaultValue={1} style={{width:"100px",marginBottom:"10px"}}/>
              <Button style={{ marginRight:"10px"}} variant="btn btn-info"
                      onClick={() => AddToCart(item)}>🛒 Add To Cart</Button>
              </Paper>
  
            </Grid>
                       
          </Grid>
        </Container>
      </>
    )
}
  export default ViewItems