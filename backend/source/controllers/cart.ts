import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import logging from '../config/logging';
import Cart from '../models/cart';
import { UploadedFile } from 'express-fileupload';


const NAMESPACE = 'Cart';

const createCart = async (req: Request, res: Response, next: NextFunction) => {
    let {
        itemId,
        itemName,
        added_by,
        quantity,
        price
    } = req.body;


    const _Cart = new Cart({
        _id: new mongoose.Types.ObjectId(),
        itemId,
        itemName,
        added_by,
        quantity,
        price
    });

    return _Cart
        .save()
        .then((Cart) => {
            console.log(Cart)
            return res.status(201).json({
                Cart
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
}



const getAllCarts = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id
    const query = {
        added_by   : userId
    }
    Cart.find(query)
        .exec()
        .then((Carts) => {
            return res.status(200).json({
                Carts: Carts,
                count: Carts.length
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

const getCartById = (async (req: Request, res: Response) => {
    const id = req.params.id;
    return await Cart.findById(id).then((Cart) => {
        if (Cart) {
            return res.status(200).json({ Cart })
        } else {
            return res.status(404).json({ "message": "Cart not found" })
        }
    }).catch(err => {
        return res.status(500).json({ "error": err })
    })
})


const updateCart = (async (req: Request, res: Response) => {
    const id = req.params.id;
    return await Cart.findById(id).then((Cart) => {
        if (Cart) {
            return Cart.set(req.body).save().then((Cart) => {
                return res.status(201).json({ Cart })
            }).catch(err => {
                return res.status(500).json({ error: err })
            })
        } else {
            return res.status(404).json({ "message": "Cart not found" })
        }
    }).catch(err => {
        return res.status(500).json({ "error": err })
    })
})

export default { createCart, getAllCarts, getCartById, updateCart };
