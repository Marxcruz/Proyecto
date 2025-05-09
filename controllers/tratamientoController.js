const Tratamiento = require('../models/tratamientoModel');

// Obtener todos los tratamientos
exports.getAllTratamientos = async (req, res) => {
    try {
        const tratamientos = await Tratamiento.find()
            .populate('pacienteId', 'nombre apellido')
            .populate('medicoId', 'nombre apellido especialidad')
            .populate('citaId');
            
        res.status(200).json({
            status: 'success',
            results: tratamientos.length,
            data: {
                tratamientos
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener los tratamientos',
            error: error.message
        });
    }
};

// Obtener un tratamiento por ID
exports.getTratamientoById = async (req, res) => {
    try {
        const tratamiento = await Tratamiento.findById(req.params.id)
            .populate('pacienteId', 'nombre apellido')
            .populate('medicoId', 'nombre apellido especialidad')
            .populate('citaId');
        
        if (!tratamiento) {
            return res.status(404).json({
                status: 'fail',
                message: 'No se encontró el tratamiento con ese ID'
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                tratamiento
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener el tratamiento',
            error: error.message
        });
    }
};

// Crear un nuevo tratamiento
exports.createTratamiento = async (req, res) => {
    try {
        const nuevoTratamiento = await Tratamiento.create(req.body);
        
        res.status(201).json({
            status: 'success',
            data: {
                tratamiento: nuevoTratamiento
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: 'Error al crear el tratamiento',
            error: error.message
        });
    }
};

// Actualizar un tratamiento existente
exports.updateTratamiento = async (req, res) => {
    try {
        const tratamiento = await Tratamiento.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            {
                new: true,
                runValidators: true
            }
        );
        
        if (!tratamiento) {
            return res.status(404).json({
                status: 'fail',
                message: 'No se encontró el tratamiento con ese ID'
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                tratamiento
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: 'Error al actualizar el tratamiento',
            error: error.message
        });
    }
};

// Eliminar un tratamiento
exports.deleteTratamiento = async (req, res) => {
    try {
        const tratamiento = await Tratamiento.findByIdAndDelete(req.params.id);
        
        if (!tratamiento) {
            return res.status(404).json({
                status: 'fail',
                message: 'No se encontró el tratamiento con ese ID'
            });
        }

        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al eliminar el tratamiento',
            error: error.message
        });
    }
};

// Obtener tratamientos por paciente
exports.getTratamientosByPaciente = async (req, res) => {
    try {
        const tratamientos = await Tratamiento.find({ pacienteId: req.params.pacienteId })
            .populate('medicoId', 'nombre apellido especialidad')
            .populate('citaId');
        
        res.status(200).json({
            status: 'success',
            results: tratamientos.length,
            data: {
                tratamientos
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener los tratamientos del paciente',
            error: error.message
        });
    }
};

// Obtener tratamiento por cita
exports.getTratamientoByCita = async (req, res) => {
    try {
        const tratamiento = await Tratamiento.findOne({ citaId: req.params.citaId })
            .populate('pacienteId', 'nombre apellido')
            .populate('medicoId', 'nombre apellido especialidad');
        
        if (!tratamiento) {
            return res.status(404).json({
                status: 'fail',
                message: 'No se encontró tratamiento para esta cita'
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                tratamiento
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener el tratamiento por cita',
            error: error.message
        });
    }
};
