const mongoose = require('mongoose');
const Order = require('../models/order');

const NAMESPACE = 'Order';

const createOrder = async (req, res, next) => {
  let { Items, placedBy, amount, status } = req.body;

  const _Order = new Order({
    _id: new mongoose.Types.ObjectId(),
    Items,
    placedBy,
    amount,
    status
  });

  return _Order
    .save()
    .then((Order) => {
      return res.status(201).json({
        Order
      });
    })
    .catch((error) => {
      return res.status(500).json({
        message: error.message,
        error
      });
    });
};

const getAllOrders = (req, res, next) => {
  Order.find()
    .exec()
    .then((Orders) => {
      return res.status(200).json({
        Orders: Orders,
        count: Orders.length
      });
    })
    .catch((error) => {
      return res.status(500).json({
        message: error.message,
        error
      });
    });
};

const getOrderById = async (req, res) => {
  const id = req.params.id;
  try {
    const Order = await Order.findById(id);
    if (Order) {
      return res.status(200).json({ Order });
    } else {
      return res.status(404).json({ message: 'Order not found' });
    }
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

const updateOrder = async (req, res) => {
  const id = req.params.id;
  try {
    const Order = await Order.findById(id);
    if (Order) {
      Order.set(req.body);
      const updatedOrder = await Order.save();
      return res.status(201).json({ Order: updatedOrder });
    } else {
      return res.status(404).json({ message: 'Order not found' });
    }
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

module.exports = { createOrder, getAllOrders, getOrderById, updateOrder };
