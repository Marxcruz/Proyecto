const express = require('express');
const tratamientoController = require('../controllers/tratamientoController');
const router = express.Router();

// Rutas para tratamientos
router.get('/', tratamientoController.getAllTratamientos);
router.post('/', tratamientoController.createTratamiento);

// Rutas específicas deben ir antes de las rutas con parámetros
router.get('/paciente/:pacienteId', tratamientoController.getTratamientosByPaciente);
router.get('/cita/:citaId', tratamientoController.getTratamientoByCita);

// Rutas con parámetros de ID
router.get('/:id', tratamientoController.getTratamientoById);
router.put('/:id', tratamientoController.updateTratamiento);
router.delete('/:id', tratamientoController.deleteTratamiento);

module.exports = router;
