const express = require('express');
const dashboardController = require('../controllers/dashboardController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// Proteger todas las rutas del dashboard
router.use(authMiddleware.protectRoute);

// Restringir acceso solo a administradores y médicos
router.use(authMiddleware.restrictTo('admin', 'medico'));

// Rutas para el dashboard
router.get('/stats', dashboardController.getStats);
router.get('/actividad-reciente', dashboardController.getActividadReciente);

module.exports = router;
