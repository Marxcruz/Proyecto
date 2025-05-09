const Medico = require('../models/medicoModel');

// Obtener todos los médicos
exports.getAllMedicos = async (req, res) => {
    try {
        const medicos = await Medico.find();
        res.status(200).json({
            status: 'success',
            results: medicos.length,
            data: {
                medicos
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener los médicos',
            error: error.message
        });
    }
};

// Obtener un médico por ID
exports.getMedicoById = async (req, res) => {
    try {
        const medico = await Medico.findById(req.params.id);
        
        if (!medico) {
            return res.status(404).json({
                status: 'fail',
                message: 'No se encontró el médico con ese ID'
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                medico
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener el médico',
            error: error.message
        });
    }
};

// Crear un nuevo médico
exports.createMedico = async (req, res) => {
    try {
        const nuevoMedico = await Medico.create(req.body);
        
        res.status(201).json({
            status: 'success',
            data: {
                medico: nuevoMedico
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: 'Error al crear el médico',
            error: error.message
        });
    }
};

// Actualizar un médico existente
exports.updateMedico = async (req, res) => {
    try {
        const medico = await Medico.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            {
                new: true,
                runValidators: true
            }
        );
        
        if (!medico) {
            return res.status(404).json({
                status: 'fail',
                message: 'No se encontró el médico con ese ID'
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                medico
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: 'Error al actualizar el médico',
            error: error.message
        });
    }
};

// Eliminar un médico
exports.deleteMedico = async (req, res) => {
    try {
        const medico = await Medico.findByIdAndDelete(req.params.id);
        
        if (!medico) {
            return res.status(404).json({
                status: 'fail',
                message: 'No se encontró el médico con ese ID'
            });
        }

        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al eliminar el médico',
            error: error.message
        });
    }
};

// Obtener médicos por especialidad
exports.getMedicosByEspecialidad = async (req, res) => {
    try {
        const medicos = await Medico.find({ especialidad: req.params.especialidad });
        
        res.status(200).json({
            status: 'success',
            results: medicos.length,
            data: {
                medicos
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener los médicos por especialidad',
            error: error.message
        });
    }
};

// Obtener disponibilidad de un médico
exports.getDisponibilidad = async (req, res) => {
    try {
        const medico = await Medico.findById(req.params.id);
        
        if (!medico) {
            return res.status(404).json({
                status: 'fail',
                message: 'No se encontró el médico con ese ID'
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                disponibilidad: medico.disponibilidad
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener la disponibilidad',
            error: error.message
        });
    }
};

// Actualizar disponibilidad de un médico
exports.updateDisponibilidad = async (req, res) => {
    try {
        const medico = await Medico.findByIdAndUpdate(
            req.params.id,
            { disponibilidad: req.body.disponibilidad },
            {
                new: true,
                runValidators: true
            }
        );
        
        if (!medico) {
            return res.status(404).json({
                status: 'fail',
                message: 'No se encontró el médico con ese ID'
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                disponibilidad: medico.disponibilidad
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: 'Error al actualizar la disponibilidad',
            error: error.message
        });
    }
};
