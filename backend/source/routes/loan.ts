import express from 'express';
import controller from '../controllers/loan';
import extractJWT from '../middleware/extractJWT';
const router = express.Router();


router.post('/', controller.createLoan);
router.get('/:id', extractJWT,controller.getLoanById)
router.put('/:id',controller.updateLoan)  
router.put('/Update:id',controller.updateLoanTrue)  
router.get('/',extractJWT, controller.getAllLoans);
router.get('/AllApproved',extractJWT, controller.getApprovedLoans);

export = router;
