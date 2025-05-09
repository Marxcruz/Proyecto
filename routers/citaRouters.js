const express = require('express');
const citaController = require('../controllers/citaController');
const router = express.Router();

// Rutas para citas
router.get('/', citaController.getAllCitas);
router.post('/', citaController.createCita);

// Rutas específicas deben ir antes de las rutas con parámetros
router.get('/fecha/:fecha', citaController.getCitasByFecha);
router.get('/paciente/:pacienteId', citaController.getCitasByPaciente);
router.get('/medico/:medicoId', citaController.getCitasByMedico);

// Rutas con parámetros de ID
router.get('/:id', citaController.getCitaById);
router.put('/:id', citaController.updateCita);
router.delete('/:id', citaController.deleteCita);
router.put('/:id/estado', citaController.updateEstadoCita);

module.exports = router;
