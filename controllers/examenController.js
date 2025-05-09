const Examen = require('../models/examenModel');

// Obtener todos los exámenes
exports.getAllExamenes = async (req, res) => {
    try {
        const examenes = await Examen.find()
            .populate('pacienteId', 'nombre apellido')
            .populate('medicoId', 'nombre apellido especialidad');
            
        res.status(200).json({
            status: 'success',
            results: examenes.length,
            data: {
                examenes
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener los exámenes',
            error: error.message
        });
    }
};

// Obtener un examen por ID
exports.getExamenById = async (req, res) => {
    try {
        const examen = await Examen.findById(req.params.id)
            .populate('pacienteId', 'nombre apellido')
            .populate('medicoId', 'nombre apellido especialidad');
        
        if (!examen) {
            return res.status(404).json({
                status: 'fail',
                message: 'No se encontró el examen con ese ID'
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                examen
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener el examen',
            error: error.message
        });
    }
};

// Crear un nuevo examen
exports.createExamen = async (req, res) => {
    try {
        const nuevoExamen = await Examen.create(req.body);
        
        res.status(201).json({
            status: 'success',
            data: {
                examen: nuevoExamen
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: 'Error al crear el examen',
            error: error.message
        });
    }
};

// Actualizar un examen existente
exports.updateExamen = async (req, res) => {
    try {
        const examen = await Examen.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            {
                new: true,
                runValidators: true
            }
        );
        
        if (!examen) {
            return res.status(404).json({
                status: 'fail',
                message: 'No se encontró el examen con ese ID'
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                examen
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: 'Error al actualizar el examen',
            error: error.message
        });
    }
};

// Eliminar un examen
exports.deleteExamen = async (req, res) => {
    try {
        const examen = await Examen.findByIdAndDelete(req.params.id);
        
        if (!examen) {
            return res.status(404).json({
                status: 'fail',
                message: 'No se encontró el examen con ese ID'
            });
        }

        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al eliminar el examen',
            error: error.message
        });
    }
};

// Actualizar resultados de un examen
exports.updateResultados = async (req, res) => {
    try {
        if (!req.body.resultados) {
            return res.status(400).json({
                status: 'fail',
                message: 'Debe proporcionar los resultados'
            });
        }

        const examen = await Examen.findByIdAndUpdate(
            req.params.id,
            { 
                resultados: req.body.resultados,
                fechaResultados: new Date(),
                estado: 'Completado'
            },
            {
                new: true,
                runValidators: true
            }
        );
        
        if (!examen) {
            return res.status(404).json({
                status: 'fail',
                message: 'No se encontró el examen con ese ID'
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                examen
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: 'Error al actualizar los resultados del examen',
            error: error.message
        });
    }
};

// Obtener exámenes por paciente
exports.getExamenesByPaciente = async (req, res) => {
    try {
        const examenes = await Examen.find({ pacienteId: req.params.pacienteId })
            .populate('medicoId', 'nombre apellido especialidad');
        
        res.status(200).json({
            status: 'success',
            results: examenes.length,
            data: {
                examenes
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener los exámenes del paciente',
            error: error.message
        });
    }
};

// Obtener exámenes pendientes por paciente
exports.getExamenesPendientes = async (req, res) => {
    try {
        const examenes = await Examen.find({
            pacienteId: req.params.pacienteId,
            estado: 'Pendiente'
        }).populate('medicoId', 'nombre apellido especialidad');
        
        res.status(200).json({
            status: 'success',
            results: examenes.length,
            data: {
                examenes
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener los exámenes pendientes',
            error: error.message
        });
    }
};
