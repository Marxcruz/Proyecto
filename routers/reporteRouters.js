const express = require('express');
const reporteController = require('../controllers/reporteController');
const authController = require('../controllers/authController');
const router = express.Router();

// Proteger todas las rutas de reportes
router.use(authController.protect);
router.use(authController.restrictTo('admin', 'medico'));

// Rutas para reportes
router.get('/citas-por-periodo', reporteController.getCitasPorPeriodo);
router.get('/pacientes-por-medico/:medicoId', reporteController.getPacientesPorMedico);
router.get('/tratamientos-por-diagnostico', reporteController.getTratamientosPorDiagnostico);
router.get('/examenes-por-tipo', reporteController.getExamenesPorTipo);
router.get('/medicamentos-recetados', reporteController.getMedicamentosRecetados);

module.exports = router;
