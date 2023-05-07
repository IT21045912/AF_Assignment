import express from 'express';
import controller from '../controllers/cart';
import extractJWT from '../middleware/extractJWT';
const router = express.Router();


router.post('/', controller.createCart);
router.get('/:id', extractJWT,controller.getCartById)
router.put('/:id',controller.updateCart)
router.get('/all:id',extractJWT, controller.getAllCarts);

export = router;
