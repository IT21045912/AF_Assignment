const express = require('express');
const controller = require('../controllers/order');
const extractJWT = require('../middleware/extractJWT');
const router = express.Router();

router.post('/', controller.createOrder);
router.get('/:id', controller.getOrderById);
router.put('/:id', controller.updateOrder);
router.get('/', controller.getAllOrders);

module.exports = router;
