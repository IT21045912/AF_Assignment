const express = require("express")
const { addToCart, removeFromCart, viewCart} = require("../controllers/shoppingcart");
import extractJWT from '../middleware/extractJWT';
const router = express.Router();


router.post('/add', addToCart);
router.post('/remove', removeFromCart);

module.exports = router;