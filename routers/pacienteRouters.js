const express = require('express');
const pacienteController = require('../controllers/pacienteController');
const router = express.Router();

// Rutas para pacientes
router.get('/', pacienteController.getAllPacientes);
router.get('/:id', pacienteController.getPacienteById);
router.post('/', pacienteController.createPaciente);
router.put('/:id', pacienteController.updatePaciente);
router.delete('/:id', pacienteController.deletePaciente);
router.get('/:id/historia-clinica', pacienteController.getHistoriaClinica);

module.exports = router;
