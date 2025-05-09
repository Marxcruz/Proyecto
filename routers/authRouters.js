const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

// Rutas para autenticación
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

// Rutas protegidas
router.use(authController.protect);

router.get('/me', authController.getMe);
router.patch('/updateMe', authController.updateMe);
router.patch('/updatePassword', authController.updatePassword);

module.exports = router;
