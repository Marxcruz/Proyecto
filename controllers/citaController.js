const Cita = require('../models/citaModel');

// Obtener todas las citas
exports.getAllCitas = async (req, res) => {
    try {
        const citas = await Cita.find()
            .populate('pacienteId', 'nombre apellido')
            .populate('medicoId', 'nombre apellido especialidad');
            
        res.status(200).json({
            status: 'success',
            results: citas.length,
            data: {
                citas
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener las citas',
            error: error.message
        });
    }
};

// Obtener una cita por ID
exports.getCitaById = async (req, res) => {
    try {
        const cita = await Cita.findById(req.params.id)
            .populate('pacienteId', 'nombre apellido')
            .populate('medicoId', 'nombre apellido especialidad');
        
        if (!cita) {
            return res.status(404).json({
                status: 'fail',
                message: 'No se encontró la cita con ese ID'
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                cita
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener la cita',
            error: error.message
        });
    }
};

// Crear una nueva cita
exports.createCita = async (req, res) => {
    try {
        const nuevaCita = await Cita.create(req.body);
        
        res.status(201).json({
            status: 'success',
            data: {
                cita: nuevaCita
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: 'Error al crear la cita',
            error: error.message
        });
    }
};

// Actualizar una cita existente
exports.updateCita = async (req, res) => {
    try {
        const cita = await Cita.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            {
                new: true,
                runValidators: true
            }
        );
        
        if (!cita) {
            return res.status(404).json({
                status: 'fail',
                message: 'No se encontró la cita con ese ID'
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                cita
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: 'Error al actualizar la cita',
            error: error.message
        });
    }
};

// Eliminar una cita
exports.deleteCita = async (req, res) => {
    try {
        const cita = await Cita.findByIdAndDelete(req.params.id);
        
        if (!cita) {
            return res.status(404).json({
                status: 'fail',
                message: 'No se encontró la cita con ese ID'
            });
        }

        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al eliminar la cita',
            error: error.message
        });
    }
};

// Actualizar el estado de una cita
exports.updateEstadoCita = async (req, res) => {
    try {
        if (!req.body.estado) {
            return res.status(400).json({
                status: 'fail',
                message: 'Debe proporcionar un estado'
            });
        }

        const cita = await Cita.findByIdAndUpdate(
            req.params.id,
            { estado: req.body.estado },
            {
                new: true,
                runValidators: true
            }
        );
        
        if (!cita) {
            return res.status(404).json({
                status: 'fail',
                message: 'No se encontró la cita con ese ID'
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                cita
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: 'Error al actualizar el estado de la cita',
            error: error.message
        });
    }
};

// Obtener citas por fecha
exports.getCitasByFecha = async (req, res) => {
    try {
        const fecha = new Date(req.params.fecha);
        const fechaSiguiente = new Date(fecha);
        fechaSiguiente.setDate(fechaSiguiente.getDate() + 1);

        const citas = await Cita.find({
            fecha: {
                $gte: fecha,
                $lt: fechaSiguiente
            }
        })
        .populate('pacienteId', 'nombre apellido')
        .populate('medicoId', 'nombre apellido especialidad');
        
        res.status(200).json({
            status: 'success',
            results: citas.length,
            data: {
                citas
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener las citas por fecha',
            error: error.message
        });
    }
};

// Obtener citas por paciente
exports.getCitasByPaciente = async (req, res) => {
    try {
        const citas = await Cita.find({ pacienteId: req.params.pacienteId })
            .populate('medicoId', 'nombre apellido especialidad');
        
        res.status(200).json({
            status: 'success',
            results: citas.length,
            data: {
                citas
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener las citas del paciente',
            error: error.message
        });
    }
};

// Obtener citas por médico
exports.getCitasByMedico = async (req, res) => {
    try {
        const citas = await Cita.find({ medicoId: req.params.medicoId })
            .populate('pacienteId', 'nombre apellido');
        
        res.status(200).json({
            status: 'success',
            results: citas.length,
            data: {
                citas
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener las citas del médico',
            error: error.message
        });
    }
};
