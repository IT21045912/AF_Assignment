const express = require('express');
const controller = require('../controllers/fertilzer');
const extractJWT = require('../middleware/extractJWT');

const router = express.Router();

router.post('/', controller.createFertilizer);
router.get('/:id',  controller.getFertilizerById);
router.put('/:id', controller.updateFertilizer);
router.get('/', controller.getAllFertilizers);
router.delete('/:id', controller.deleteFertilizer);

module.exports = router;

