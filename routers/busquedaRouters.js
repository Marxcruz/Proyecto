const express = require('express');
const busquedaController = require('../controllers/busquedaController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// Proteger todas las rutas de búsqueda
router.use(authMiddleware.protectRoute);

// Rutas para búsqueda avanzada
router.get('/pacientes', busquedaController.buscarPacientes);
router.get('/medicos', busquedaController.buscarMedicos);
router.get('/citas', busquedaController.buscarCitas);
router.get('/global', busquedaController.busquedaGlobal);

module.exports = router;
