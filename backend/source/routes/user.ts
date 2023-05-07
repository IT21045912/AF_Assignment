import express from 'express';
import controller from '../controllers/user';
import extractJWT from '../middleware/extractJWT';
const router = express.Router();


router.post('/register', controller.register);
router.post('/login', controller.login);
router.delete('/delete/:id', controller.deleteUser);
router.get('/:id', extractJWT,controller.getUserById)
router.put('/:id',controller.updateUser)
router.get('/get/all',extractJWT, controller.getAllUsers);
router.get('/get/farmer',extractJWT, controller.getAllFarmers);
router.get('/get/farmer/inActive',extractJWT, controller.getInactiveFarmers);
router.get('/get/farmer/Active',extractJWT, controller.getActiveFarmers);
router.put('/farmer/Activate/:id', controller.activateUser);
router.get('/get/users',extractJWT, controller.getOnlyUsers);

export = router;
