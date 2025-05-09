const Receta = require('../models/recetaModel');

// Obtener todas las recetas
exports.getAllRecetas = async (req, res) => {
    try {
        const recetas = await Receta.find()
            .populate('pacienteId', 'nombre apellido')
            .populate('medicoId', 'nombre apellido especialidad');
            
        res.status(200).json({
            status: 'success',
            results: recetas.length,
            data: {
                recetas
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener las recetas',
            error: error.message
        });
    }
};

// Obtener una receta por ID
exports.getRecetaById = async (req, res) => {
    try {
        const receta = await Receta.findById(req.params.id)
            .populate('pacienteId', 'nombre apellido')
            .populate('medicoId', 'nombre apellido especialidad');
        
        if (!receta) {
            return res.status(404).json({
                status: 'fail',
                message: 'No se encontró la receta con ese ID'
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                receta
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener la receta',
            error: error.message
        });
    }
};

// Crear una nueva receta
exports.createReceta = async (req, res) => {
    try {
        const nuevaReceta = await Receta.create(req.body);
        
        res.status(201).json({
            status: 'success',
            data: {
                receta: nuevaReceta
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: 'Error al crear la receta',
            error: error.message
        });
    }
};

// Actualizar una receta existente
exports.updateReceta = async (req, res) => {
    try {
        const receta = await Receta.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            {
                new: true,
                runValidators: true
            }
        );
        
        if (!receta) {
            return res.status(404).json({
                status: 'fail',
                message: 'No se encontró la receta con ese ID'
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                receta
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: 'Error al actualizar la receta',
            error: error.message
        });
    }
};

// Eliminar una receta
exports.deleteReceta = async (req, res) => {
    try {
        const receta = await Receta.findByIdAndDelete(req.params.id);
        
        if (!receta) {
            return res.status(404).json({
                status: 'fail',
                message: 'No se encontró la receta con ese ID'
            });
        }

        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al eliminar la receta',
            error: error.message
        });
    }
};

// Obtener recetas por paciente
exports.getRecetasByPaciente = async (req, res) => {
    try {
        const recetas = await Receta.find({ pacienteId: req.params.pacienteId })
            .populate('medicoId', 'nombre apellido especialidad');
        
        res.status(200).json({
            status: 'success',
            results: recetas.length,
            data: {
                recetas
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener las recetas del paciente',
            error: error.message
        });
    }
};

// Obtener recetas vigentes por paciente
exports.getRecetasVigentes = async (req, res) => {
    try {
        const hoy = new Date();
        
        const recetas = await Receta.find({
            pacienteId: req.params.pacienteId,
            estado: 'Activa',
            'vigencia.fin': { $gte: hoy }
        }).populate('medicoId', 'nombre apellido especialidad');
        
        res.status(200).json({
            status: 'success',
            results: recetas.length,
            data: {
                recetas
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener las recetas vigentes',
            error: error.message
        });
    }
};
