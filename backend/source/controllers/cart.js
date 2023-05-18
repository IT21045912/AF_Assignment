const mongoose = require('mongoose');
const Cart = require('../models/cart');

const NAMESPACE = 'Cart';

const createCart = async (req, res, next) => {
  let { itemId, itemName, added_by, quantity, price } = req.body;

  const _Cart = new Cart({
    _id: new mongoose.Types.ObjectId(),
    itemId,
    itemName,
    added_by,
    quantity,
    price,
  });

  return _Cart
    .save()
    .then((Cart) => {
      console.log(Cart);
      return res.status(201).json({
        Cart,
      });
    })
    .catch((error) => {
      return res.status(500).json({
        message: error.message,
        error,
      });
    });
};

const getAllCarts = (req, res, next) => {
  const userId = req.params.id;
  const query = {
    added_by: userId,
  };
  Cart.find(query)
    .exec()
    .then((Carts) => {
      return res.status(200).json({
        Carts: Carts,
        count: Carts.length,
      });
    })
    .catch((error) => {
      return res.status(500).json({
        message: error.message,
        error,
      });
    });
};

const getCartById = async (req, res) => {
  const id = req.params.id;
  try {
    const Cart = await Cart.findById(id);
    if (Cart) {
      return res.status(200).json({ Cart });
    } else {
      return res.status(404).json({ message: "Cart not found" });
    }
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

const updateCart = async (req, res) => {
  const id = req.params.id;
  try {
    const Cart = await Cart.findById(id);
    if (Cart) {
      Cart.set(req.body);
      const updatedCart = await Cart.save();
      return res.status(201).json({ Cart: updatedCart });
    } else {
      return res.status(404).json({ message: "Cart not found" });
    }
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

const deleteCartItem = async (req, res) => {
  const id = req.params.id;
  try {
    const cart = await Cart.findById(id);
    if (cart) {
      await cart.deleteOne();
      const remainingItems = await Cart.find();
      return res.status(200).json({
        message: "Item deleted successfully",
        remainingItems,
      });
    } else {
      return res.status(404).json({ message: "Item not found" });
    }
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

module.exports = { createCart, getAllCarts, getCartById, updateCart, deleteCartItem };
