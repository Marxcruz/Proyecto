const express = require('express');
const examenController = require('../controllers/examenController');
const router = express.Router();

// Rutas para exámenes
router.get('/', examenController.getAllExamenes);
router.post('/', examenController.createExamen);

// Rutas específicas deben ir antes de las rutas con parámetros
router.get('/paciente/:pacienteId', examenController.getExamenesByPaciente);
router.get('/pendientes/:pacienteId', examenController.getExamenesPendientes);

// Rutas con parámetros de ID
router.get('/:id', examenController.getExamenById);
router.put('/:id', examenController.updateExamen);
router.delete('/:id', examenController.deleteExamen);
router.put('/:id/resultados', examenController.updateResultados);

module.exports = router;
