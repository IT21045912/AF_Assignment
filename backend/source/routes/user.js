const express = require('express');
const controller = require('../controllers/user');
const extractJWT = require('../middleware/extractJWT');
const router = express.Router();

router.post('/register', controller.register);
router.post('/login', controller.login);
router.delete('/delete/:id', controller.deleteUser);
router.get('/:id', controller.getUserById);
router.put('/:id', controller.updateUser);
router.get('/get/all', controller.getAllUsers);
router.get('/get/farmer', controller.getAllFarmers);
router.get('/get/farmer/inActive', controller.getInactiveFarmers);
router.get('/get/farmer/Active', controller.getActiveFarmers);
router.put('/farmer/Activate/:id', controller.activateUser);
router.get('/get/users', controller.getOnlyUsers);

module.exports = router;

