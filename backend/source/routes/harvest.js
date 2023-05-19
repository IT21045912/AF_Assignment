const express = require('express');
const controller = require('../controllers/harvest');
const extractJWT = require('../middleware/extractJWT');
const router = express.Router();

router.post('/', controller.createHarvest);
router.get('/:id',  controller.getHarvestById);
router.put('/:id', controller.updateHarvest);
router.get('/',  controller.getAllHarvests);
router.get('/:id',controller.deleteHarvest);

module.exports = router;

