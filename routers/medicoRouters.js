const express = require('express');
const medicoController = require('../controllers/medicoController');
const router = express.Router();

// Rutas para médicos
router.get('/', medicoController.getAllMedicos);
router.post('/', medicoController.createMedico);

// Rutas específicas deben ir antes de las rutas con parámetros
router.get('/especialidad/:especialidad', medicoController.getMedicosByEspecialidad);

// Rutas con parámetros de ID
router.get('/:id', medicoController.getMedicoById);
router.put('/:id', medicoController.updateMedico);
router.delete('/:id', medicoController.deleteMedico);
router.get('/:id/disponibilidad', medicoController.getDisponibilidad);
router.put('/:id/disponibilidad', medicoController.updateDisponibilidad);

module.exports = router;
