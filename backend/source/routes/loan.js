const express = require('express');
const controller = require('../controllers/loan');
const extractJWT = require('../middleware/extractJWT');
const router = express.Router();

router.post('/', controller.createLoan);
// router.get('/:id', extractJWT, controller.getLoanById);
router.put('/:id', controller.updateLoan);
router.delete('/Delete/:id', controller.deleteLoanById);
router.put('/Update/:id', controller.updateLoanTrue);
router.get('/', extractJWT, controller.getAllLoans);
router.get('/approved-loans', extractJWT, controller.getApprovedLoans);

module.exports = router;
