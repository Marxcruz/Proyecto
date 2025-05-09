const express = require('express');
const recetaController = require('../controllers/recetaController');
const router = express.Router();

// Rutas para recetas
router.get('/', recetaController.getAllRecetas);
router.post('/', recetaController.createReceta);

// Rutas específicas deben ir antes de las rutas con parámetros
router.get('/paciente/:pacienteId', recetaController.getRecetasByPaciente);
router.get('/vigentes/:pacienteId', recetaController.getRecetasVigentes);

// Rutas con parámetros de ID
router.get('/:id', recetaController.getRecetaById);
router.put('/:id', recetaController.updateReceta);
router.delete('/:id', recetaController.deleteReceta);

module.exports = router;
