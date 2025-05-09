const Paciente = require('../models/pacienteModel');
const Medico = require('../models/medicoModel');
const Cita = require('../models/citaModel');
const Tratamiento = require('../models/tratamientoModel');
const Receta = require('../models/recetaModel');
const Examen = require('../models/examenModel');

/**
 * @desc    Generar reporte de citas por período
 * @route   GET /api/v1/reportes/citas-por-periodo
 * @access  Private/Admin
 */
exports.getCitasPorPeriodo = async (req, res) => {
    try {
        const { fechaInicio, fechaFin } = req.query;
        
        if (!fechaInicio || !fechaFin) {
            return res.status(400).json({
                status: 'fail',
                message: 'Debe proporcionar fechaInicio y fechaFin'
            });
        }
        
        const inicio = new Date(fechaInicio);
        const fin = new Date(fechaFin);
        
        // Obtener citas en el período
        const citas = await Cita.find({ 
            fecha: { $gte: inicio, $lte: fin }
        })
        .populate('pacienteId', 'nombre apellido')
        .populate('medicoId', 'nombre apellido especialidad')
        .sort({ fecha: 1 });
        
        // Agrupar citas por estado
        const citasPorEstado = {};
        citas.forEach(cita => {
            if (!citasPorEstado[cita.estado]) {
                citasPorEstado[cita.estado] = 0;
            }
            citasPorEstado[cita.estado]++;
        });
        
        // Agrupar citas por médico
        const citasPorMedico = {};
        citas.forEach(cita => {
            const medicoId = cita.medicoId._id.toString();
            const medicoNombre = `${cita.medicoId.nombre} ${cita.medicoId.apellido}`;
            
            if (!citasPorMedico[medicoId]) {
                citasPorMedico[medicoId] = {
                    nombre: medicoNombre,
                    especialidad: cita.medicoId.especialidad,
                    cantidad: 0
                };
            }
            citasPorMedico[medicoId].cantidad++;
        });
        
        res.status(200).json({
            status: 'success',
            data: {
                periodo: {
                    fechaInicio: inicio,
                    fechaFin: fin
                },
                totalCitas: citas.length,
                citasPorEstado,
                citasPorMedico: Object.values(citasPorMedico),
                citas
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al generar el reporte de citas por período',
            error: error.message
        });
    }
};

/**
 * @desc    Generar reporte de pacientes por médico
 * @route   GET /api/v1/reportes/pacientes-por-medico
 * @access  Private/Admin
 */
exports.getPacientesPorMedico = async (req, res) => {
    try {
        const { medicoId } = req.params;
        
        // Verificar si el médico existe
        const medico = await Medico.findById(medicoId);
        if (!medico) {
            return res.status(404).json({
                status: 'fail',
                message: 'No se encontró el médico con ese ID'
            });
        }
        
        // Obtener todas las citas del médico
        const citas = await Cita.find({ medicoId })
            .populate('pacienteId', 'nombre apellido fechaNacimiento genero')
            .sort({ fecha: -1 });
        
        // Obtener pacientes únicos
        const pacientesMap = new Map();
        citas.forEach(cita => {
            if (!pacientesMap.has(cita.pacienteId._id.toString())) {
                pacientesMap.set(cita.pacienteId._id.toString(), {
                    paciente: cita.pacienteId,
                    ultimaCita: cita.fecha,
                    cantidadCitas: 1
                });
            } else {
                const pacienteInfo = pacientesMap.get(cita.pacienteId._id.toString());
                pacienteInfo.cantidadCitas++;
                if (cita.fecha > pacienteInfo.ultimaCita) {
                    pacienteInfo.ultimaCita = cita.fecha;
                }
            }
        });
        
        const pacientes = Array.from(pacientesMap.values());
        
        res.status(200).json({
            status: 'success',
            data: {
                medico: {
                    id: medico._id,
                    nombre: `${medico.nombre} ${medico.apellido}`,
                    especialidad: medico.especialidad
                },
                totalPacientes: pacientes.length,
                totalCitas: citas.length,
                pacientes
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al generar el reporte de pacientes por médico',
            error: error.message
        });
    }
};

/**
 * @desc    Generar reporte de tratamientos por diagnóstico
 * @route   GET /api/v1/reportes/tratamientos-por-diagnostico
 * @access  Private/Admin
 */
exports.getTratamientosPorDiagnostico = async (req, res) => {
    try {
        const { diagnostico } = req.query;
        
        let query = {};
        if (diagnostico) {
            query.diagnostico = { $regex: diagnostico, $options: 'i' };
        }
        
        // Obtener tratamientos
        const tratamientos = await Tratamiento.find(query)
            .populate('pacienteId', 'nombre apellido')
            .populate('medicoId', 'nombre apellido especialidad')
            .sort({ fechaCreacion: -1 });
        
        // Agrupar tratamientos por diagnóstico
        const tratamientosPorDiagnostico = {};
        tratamientos.forEach(tratamiento => {
            if (!tratamientosPorDiagnostico[tratamiento.diagnostico]) {
                tratamientosPorDiagnostico[tratamiento.diagnostico] = {
                    diagnostico: tratamiento.diagnostico,
                    cantidad: 0,
                    tratamientos: []
                };
            }
            tratamientosPorDiagnostico[tratamiento.diagnostico].cantidad++;
            tratamientosPorDiagnostico[tratamiento.diagnostico].tratamientos.push({
                id: tratamiento._id,
                paciente: `${tratamiento.pacienteId.nombre} ${tratamiento.pacienteId.apellido}`,
                medico: `${tratamiento.medicoId.nombre} ${tratamiento.medicoId.apellido}`,
                fecha: tratamiento.fechaCreacion
            });
        });
        
        res.status(200).json({
            status: 'success',
            data: {
                totalTratamientos: tratamientos.length,
                tratamientosPorDiagnostico: Object.values(tratamientosPorDiagnostico)
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al generar el reporte de tratamientos por diagnóstico',
            error: error.message
        });
    }
};

/**
 * @desc    Generar reporte de exámenes por tipo
 * @route   GET /api/v1/reportes/examenes-por-tipo
 * @access  Private/Admin
 */
exports.getExamenesPorTipo = async (req, res) => {
    try {
        // Obtener exámenes
        const examenes = await Examen.find()
            .populate('pacienteId', 'nombre apellido')
            .populate('medicoId', 'nombre apellido especialidad')
            .sort({ fecha: -1 });
        
        // Agrupar exámenes por tipo
        const examenesPorTipo = {};
        examenes.forEach(examen => {
            if (!examenesPorTipo[examen.tipo]) {
                examenesPorTipo[examen.tipo] = {
                    tipo: examen.tipo,
                    cantidad: 0,
                    pendientes: 0,
                    completados: 0,
                    cancelados: 0
                };
            }
            examenesPorTipo[examen.tipo].cantidad++;
            
            if (examen.estado === 'Pendiente') {
                examenesPorTipo[examen.tipo].pendientes++;
            } else if (examen.estado === 'Completado') {
                examenesPorTipo[examen.tipo].completados++;
            } else if (examen.estado === 'Cancelado') {
                examenesPorTipo[examen.tipo].cancelados++;
            }
        });
        
        res.status(200).json({
            status: 'success',
            data: {
                totalExamenes: examenes.length,
                examenesPorTipo: Object.values(examenesPorTipo)
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al generar el reporte de exámenes por tipo',
            error: error.message
        });
    }
};

/**
 * @desc    Generar reporte de medicamentos recetados
 * @route   GET /api/v1/reportes/medicamentos-recetados
 * @access  Private/Admin
 */
exports.getMedicamentosRecetados = async (req, res) => {
    try {
        const { fechaInicio, fechaFin } = req.query;
        
        let query = {};
        if (fechaInicio && fechaFin) {
            const inicio = new Date(fechaInicio);
            const fin = new Date(fechaFin);
            query.fecha = { $gte: inicio, $lte: fin };
        }
        
        // Obtener recetas
        const recetas = await Receta.find(query)
            .populate('pacienteId', 'nombre apellido')
            .populate('medicoId', 'nombre apellido especialidad')
            .sort({ fecha: -1 });
        
        // Agrupar medicamentos
        const medicamentosMap = new Map();
        recetas.forEach(receta => {
            receta.medicamentos.forEach(med => {
                if (!medicamentosMap.has(med.nombre)) {
                    medicamentosMap.set(med.nombre, {
                        nombre: med.nombre,
                        cantidad: 1,
                        recetas: [{
                            id: receta._id,
                            paciente: `${receta.pacienteId.nombre} ${receta.pacienteId.apellido}`,
                            medico: `${receta.medicoId.nombre} ${receta.medicoId.apellido}`,
                            fecha: receta.fecha
                        }]
                    });
                } else {
                    const medInfo = medicamentosMap.get(med.nombre);
                    medInfo.cantidad++;
                    medInfo.recetas.push({
                        id: receta._id,
                        paciente: `${receta.pacienteId.nombre} ${receta.pacienteId.apellido}`,
                        medico: `${receta.medicoId.nombre} ${receta.medicoId.apellido}`,
                        fecha: receta.fecha
                    });
                }
            });
        });
        
        // Ordenar medicamentos por cantidad (de mayor a menor)
        const medicamentos = Array.from(medicamentosMap.values())
            .sort((a, b) => b.cantidad - a.cantidad);
        
        res.status(200).json({
            status: 'success',
            data: {
                totalRecetas: recetas.length,
                totalMedicamentos: medicamentos.length,
                medicamentos
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al generar el reporte de medicamentos recetados',
            error: error.message
        });
    }
};
