const express = require('express');
const controller = require('../controllers/cart');
const extractJWT = require('../middleware/extractJWT');

const router = express.Router();

router.post('/', controller.createCart);
router.get('/:id', controller.getCartById);
router.put('/:id', controller.updateCart);
router.get('/all/:id', controller.getAllCarts);
router.delete('/:id', controller.deleteCartItem);
router.delete('/deletecart/:id',controller.deleteUserCart);
router.post('/checkout',controller.checkout);

module.exports = router;
