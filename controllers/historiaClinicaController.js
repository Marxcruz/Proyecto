const Paciente = require('../models/pacienteModel');
const Cita = require('../models/citaModel');
const Tratamiento = require('../models/tratamientoModel');
const Receta = require('../models/recetaModel');
const Examen = require('../models/examenModel');

// Obtener historia clínica completa de un paciente
exports.getHistoriaClinicaCompleta = async (req, res) => {
    try {
        const pacienteId = req.params.pacienteId;
        
        // Obtener información del paciente
        const paciente = await Paciente.findById(pacienteId);
        if (!paciente) {
            return res.status(404).json({
                status: 'fail',
                message: 'No se encontró el paciente con ese ID'
            });
        }
        
        // Obtener citas del paciente
        const citas = await Cita.find({ pacienteId })
            .populate('medicoId', 'nombre apellido especialidad')
            .sort({ fecha: -1 });
            
        // Obtener tratamientos del paciente
        const tratamientos = await Tratamiento.find({ pacienteId })
            .populate('medicoId', 'nombre apellido especialidad')
            .populate('citaId')
            .sort({ fechaCreacion: -1 });
            
        // Obtener recetas del paciente
        const recetas = await Receta.find({ pacienteId })
            .populate('medicoId', 'nombre apellido especialidad')
            .sort({ fecha: -1 });
            
        // Obtener exámenes del paciente
        const examenes = await Examen.find({ pacienteId })
            .populate('medicoId', 'nombre apellido especialidad')
            .sort({ fecha: -1 });
            
        res.status(200).json({
            status: 'success',
            data: {
                paciente,
                historiaClinica: {
                    citas,
                    tratamientos,
                    recetas,
                    examenes
                }
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener la historia clínica completa',
            error: error.message
        });
    }
};

// Obtener resumen de historia clínica
exports.getResumenHistoriaClinica = async (req, res) => {
    try {
        const pacienteId = req.params.pacienteId;
        
        // Obtener información del paciente
        const paciente = await Paciente.findById(pacienteId, 'nombre apellido fechaNacimiento genero grupoSanguineo alergias historiaClinica');
        if (!paciente) {
            return res.status(404).json({
                status: 'fail',
                message: 'No se encontró el paciente con ese ID'
            });
        }
        
        // Obtener última cita
        const ultimaCita = await Cita.findOne({ pacienteId })
            .populate('medicoId', 'nombre apellido especialidad')
            .sort({ fecha: -1 })
            .limit(1);
            
        // Obtener tratamientos activos
        const tratamientosActivos = await Tratamiento.find({ 
            pacienteId,
            'seguimiento.requerido': true,
            'seguimiento.fechaSugerida': { $gte: new Date() }
        })
        .populate('medicoId', 'nombre apellido especialidad')
        .sort({ fechaCreacion: -1 });
            
        // Obtener recetas vigentes
        const recetasVigentes = await Receta.find({ 
            pacienteId,
            estado: 'Activa',
            'vigencia.fin': { $gte: new Date() }
        })
        .populate('medicoId', 'nombre apellido especialidad')
        .sort({ fecha: -1 });
            
        // Obtener exámenes pendientes
        const examenesPendientes = await Examen.find({ 
            pacienteId,
            estado: 'Pendiente'
        })
        .populate('medicoId', 'nombre apellido especialidad')
        .sort({ fecha: -1 });
            
        res.status(200).json({
            status: 'success',
            data: {
                paciente,
                resumen: {
                    ultimaCita,
                    tratamientosActivos,
                    recetasVigentes,
                    examenesPendientes
                }
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener el resumen de la historia clínica',
            error: error.message
        });
    }
};

// Generar reporte de historia clínica por período
exports.getReportePorPeriodo = async (req, res) => {
    try {
        const pacienteId = req.params.pacienteId;
        const { fechaInicio, fechaFin } = req.query;
        
        if (!fechaInicio || !fechaFin) {
            return res.status(400).json({
                status: 'fail',
                message: 'Debe proporcionar fechaInicio y fechaFin'
            });
        }
        
        const inicio = new Date(fechaInicio);
        const fin = new Date(fechaFin);
        
        // Obtener información del paciente
        const paciente = await Paciente.findById(pacienteId);
        if (!paciente) {
            return res.status(404).json({
                status: 'fail',
                message: 'No se encontró el paciente con ese ID'
            });
        }
        
        // Obtener citas en el período
        const citas = await Cita.find({ 
            pacienteId,
            fecha: { $gte: inicio, $lte: fin }
        })
        .populate('medicoId', 'nombre apellido especialidad')
        .sort({ fecha: 1 });
            
        // Obtener tratamientos en el período
        const tratamientos = await Tratamiento.find({ 
            pacienteId,
            fechaCreacion: { $gte: inicio, $lte: fin }
        })
        .populate('medicoId', 'nombre apellido especialidad')
        .sort({ fechaCreacion: 1 });
            
        // Obtener recetas en el período
        const recetas = await Receta.find({ 
            pacienteId,
            fecha: { $gte: inicio, $lte: fin }
        })
        .populate('medicoId', 'nombre apellido especialidad')
        .sort({ fecha: 1 });
            
        // Obtener exámenes en el período
        const examenes = await Examen.find({ 
            pacienteId,
            fecha: { $gte: inicio, $lte: fin }
        })
        .populate('medicoId', 'nombre apellido especialidad')
        .sort({ fecha: 1 });
            
        res.status(200).json({
            status: 'success',
            data: {
                paciente,
                periodo: {
                    fechaInicio: inicio,
                    fechaFin: fin
                },
                reporte: {
                    citas,
                    tratamientos,
                    recetas,
                    examenes
                }
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al generar el reporte por período',
            error: error.message
        });
    }
};
