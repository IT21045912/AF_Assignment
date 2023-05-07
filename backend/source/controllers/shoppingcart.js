import shoppingcart from "../models/shoppingcart";
import Harvest from "../models/harvest";

let cart = [];

const addToCart = async (req, res) => {
  //item no should be passed
  const item = req.body;
  const quantity = parseInt(req.body.quantity);
  const itemName = req.body.ItemName;
  const Price = req.body.Price;

  // check if the item is already in the cart
  const existingItemIndex = cart.findIndex((cartItem) => cartItem.item === item);
  if (existingItemIndex !== -1) {
    // if the item is already in the cart, update the quantity
    cart[existingItemIndex].quantity += quantity;
  } else {
    // Add the item if not in the cart
    cart.push({ item, quantity ,itemName ,Price});
  }

  res.send('Item added to cart');
}


const removeFromCart = async(req,res)=>{
    //item no should be passed
    const itemNo = req.params.id;
  
    // check if the item is in the cart
    const existingItemIndex = cart.findIndex((cartItem) => cartItem.item.item === itemNo);
    console.log(existingItemIndex);
    if (existingItemIndex !== -1) {
        cart.splice(existingItemIndex, 1);
        return res.status(202) 
      }else{
        return res.status(404)
      }
    }

// view the contents of the cart
const viewCart = async(req,res)=>{
  // console.log(cart);
    res.json(cart);
}

//checkout and calculate total
const checkout = async (req, res) => {
    let total = 0;
    const user = req.body.user;
    for (let i = 0; i < cart.length; i++) {
      const itemPrice = await getItemPrice(cart[i].item.item);
      total += itemPrice * parseInt(cart[i].item.quantity);
      console.log(total);
    }
    
    const cartRecord = new shoppingcart({
        UserID: user,
        Items: cart,
        Total: total
      });
    
      try {
        await cartRecord.save();
        res.send({ message: "Cart saved successfully.", Total: total });
      } catch (error) {
        res.status(500).send({ error: "Error saving cart." });
      }
  }

async function getItemPrice(itemNo) {
    try {
      const item = await Harvest.findOne({ ItemNo: itemNo });
      if (item) {
        const Price = item.unit_price;
        return Price;
      }
    } catch (error) {
      console.error(error);      
      return null;
    }
}

module.exports = {
  addToCart,
  removeFromCart,
  viewCart
}
  