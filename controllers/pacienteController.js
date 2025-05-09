const Paciente = require('../models/pacienteModel');

// Obtener todos los pacientes
exports.getAllPacientes = async (req, res) => {
    try {
        const pacientes = await Paciente.find();
        res.status(200).json({
            status: 'success',
            results: pacientes.length,
            data: {
                pacientes
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener los pacientes',
            error: error.message
        });
    }
};

// Obtener un paciente por ID
exports.getPacienteById = async (req, res) => {
    try {
        const paciente = await Paciente.findById(req.params.id);
        
        if (!paciente) {
            return res.status(404).json({
                status: 'fail',
                message: 'No se encontró el paciente con ese ID'
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                paciente
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener el paciente',
            error: error.message
        });
    }
};

// Crear un nuevo paciente
exports.createPaciente = async (req, res) => {
    try {
        const nuevoPaciente = await Paciente.create(req.body);
        
        res.status(201).json({
            status: 'success',
            data: {
                paciente: nuevoPaciente
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: 'Error al crear el paciente',
            error: error.message
        });
    }
};

// Actualizar un paciente existente
exports.updatePaciente = async (req, res) => {
    try {
        const paciente = await Paciente.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            {
                new: true,
                runValidators: true
            }
        );
        
        if (!paciente) {
            return res.status(404).json({
                status: 'fail',
                message: 'No se encontró el paciente con ese ID'
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                paciente
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: 'Error al actualizar el paciente',
            error: error.message
        });
    }
};

// Eliminar un paciente
exports.deletePaciente = async (req, res) => {
    try {
        const paciente = await Paciente.findByIdAndDelete(req.params.id);
        
        if (!paciente) {
            return res.status(404).json({
                status: 'fail',
                message: 'No se encontró el paciente con ese ID'
            });
        }

        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al eliminar el paciente',
            error: error.message
        });
    }
};

// Obtener la historia clínica completa de un paciente
exports.getHistoriaClinica = async (req, res) => {
    try {
        const paciente = await Paciente.findById(req.params.id);
        
        if (!paciente) {
            return res.status(404).json({
                status: 'fail',
                message: 'No se encontró el paciente con ese ID'
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                historiaClinica: paciente.historiaClinica
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener la historia clínica',
            error: error.message
        });
    }
};
