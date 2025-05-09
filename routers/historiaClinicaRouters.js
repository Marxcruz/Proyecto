const express = require('express');
const historiaClinicaController = require('../controllers/historiaClinicaController');
const router = express.Router();

// Rutas para historias clínicas
router.get('/completa/:pacienteId', historiaClinicaController.getHistoriaClinicaCompleta);
router.get('/resumen/:pacienteId', historiaClinicaController.getResumenHistoriaClinica);
router.get('/reporte/:pacienteId', historiaClinicaController.getReportePorPeriodo);

module.exports = router;
