const Paciente = require('../models/pacienteModel');
const Medico = require('../models/medicoModel');
const Cita = require('../models/citaModel');
const Tratamiento = require('../models/tratamientoModel');
const Receta = require('../models/recetaModel');
const Examen = require('../models/examenModel');

/**
 * @desc    Obtener estadísticas generales del sistema para el dashboard
 * @route   GET /api/v1/dashboard/stats
 * @access  Private/Admin
 */
exports.getStats = async (req, res) => {
    try {
        // Obtener fecha actual y fecha de hace 30 días
        const hoy = new Date();
        const hace30Dias = new Date(hoy);
        hace30Dias.setDate(hace30Dias.getDate() - 30);
        
        // Estadísticas de pacientes
        const totalPacientes = await Paciente.countDocuments();
        const pacientesNuevos = await Paciente.countDocuments({
            fechaRegistro: { $gte: hace30Dias }
        });
        
        // Estadísticas de médicos
        const totalMedicos = await Medico.countDocuments();
        const medicosActivos = await Medico.countDocuments({ estado: 'Activo' });
        
        // Estadísticas de citas
        const totalCitas = await Cita.countDocuments();
        const citasUltimos30Dias = await Cita.countDocuments({
            fecha: { $gte: hace30Dias }
        });
        
        // Citas por estado
        const citasProgramadas = await Cita.countDocuments({ estado: 'Programada' });
        const citasConfirmadas = await Cita.countDocuments({ estado: 'Confirmada' });
        const citasCompletadas = await Cita.countDocuments({ estado: 'Completada' });
        const citasCanceladas = await Cita.countDocuments({ estado: 'Cancelada' });
        
        // Estadísticas de tratamientos
        const totalTratamientos = await Tratamiento.countDocuments();
        const tratamientosRecientes = await Tratamiento.countDocuments({
            fechaCreacion: { $gte: hace30Dias }
        });
        
        // Estadísticas de recetas
        const totalRecetas = await Receta.countDocuments();
        const recetasVigentes = await Receta.countDocuments({
            estado: 'Activa',
            'vigencia.fin': { $gte: hoy }
        });
        
        // Estadísticas de exámenes
        const totalExamenes = await Examen.countDocuments();
        const examenesPendientes = await Examen.countDocuments({ estado: 'Pendiente' });
        const examenesCompletados = await Examen.countDocuments({ estado: 'Completado' });
        
        // Citas por día de la semana (últimos 30 días)
        const citasPorDia = await Cita.aggregate([
            { $match: { fecha: { $gte: hace30Dias } } },
            {
                $group: {
                    _id: { $dayOfWeek: '$fecha' },
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);
        
        // Convertir _id a nombre del día
        const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        const citasPorDiaSemana = citasPorDia.map(item => ({
            dia: diasSemana[item._id - 1],
            cantidad: item.count
        }));
        
        // Especialidades más solicitadas
        const especialidadesSolicitadas = await Cita.aggregate([
            {
                $lookup: {
                    from: 'medicos',
                    localField: 'medicoId',
                    foreignField: '_id',
                    as: 'medico'
                }
            },
            { $unwind: '$medico' },
            {
                $group: {
                    _id: '$medico.especialidad',
                    count: { $sum: 1 }
                }
            },
            { $sort: { count: -1 } },
            { $limit: 5 }
        ]);
        
        const especialidadesTop = especialidadesSolicitadas.map(item => ({
            especialidad: item._id,
            cantidad: item.count
        }));
        
        res.status(200).json({
            status: 'success',
            data: {
                pacientes: {
                    total: totalPacientes,
                    nuevos: pacientesNuevos
                },
                medicos: {
                    total: totalMedicos,
                    activos: medicosActivos
                },
                citas: {
                    total: totalCitas,
                    ultimos30Dias: citasUltimos30Dias,
                    porEstado: {
                        programadas: citasProgramadas,
                        confirmadas: citasConfirmadas,
                        completadas: citasCompletadas,
                        canceladas: citasCanceladas
                    },
                    porDiaSemana: citasPorDiaSemana
                },
                tratamientos: {
                    total: totalTratamientos,
                    recientes: tratamientosRecientes
                },
                recetas: {
                    total: totalRecetas,
                    vigentes: recetasVigentes
                },
                examenes: {
                    total: totalExamenes,
                    pendientes: examenesPendientes,
                    completados: examenesCompletados
                },
                especialidadesTop
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener estadísticas del dashboard',
            error: error.message
        });
    }
};

/**
 * @desc    Obtener actividad reciente del sistema
 * @route   GET /api/v1/dashboard/actividad-reciente
 * @access  Private/Admin
 */
exports.getActividadReciente = async (req, res) => {
    try {
        const limite = parseInt(req.query.limite) || 10;
        
        // Obtener fecha de hace 7 días
        const hace7Dias = new Date();
        hace7Dias.setDate(hace7Dias.getDate() - 7);
        
        // Citas recientes
        const citasRecientes = await Cita.find({ 
            fechaCreacion: { $gte: hace7Dias } 
        })
        .populate('pacienteId', 'nombre apellido')
        .populate('medicoId', 'nombre apellido especialidad')
        .sort({ fechaCreacion: -1 })
        .limit(limite);
        
        // Tratamientos recientes
        const tratamientosRecientes = await Tratamiento.find({ 
            fechaCreacion: { $gte: hace7Dias } 
        })
        .populate('pacienteId', 'nombre apellido')
        .populate('medicoId', 'nombre apellido especialidad')
        .sort({ fechaCreacion: -1 })
        .limit(limite);
        
        // Recetas recientes
        const recetasRecientes = await Receta.find({ 
            fecha: { $gte: hace7Dias } 
        })
        .populate('pacienteId', 'nombre apellido')
        .populate('medicoId', 'nombre apellido especialidad')
        .sort({ fecha: -1 })
        .limit(limite);
        
        // Exámenes recientes
        const examenesRecientes = await Examen.find({ 
            fechaCreacion: { $gte: hace7Dias } 
        })
        .populate('pacienteId', 'nombre apellido')
        .populate('medicoId', 'nombre apellido especialidad')
        .sort({ fechaCreacion: -1 })
        .limit(limite);
        
        // Combinar y ordenar todas las actividades por fecha
        const actividades = [
            ...citasRecientes.map(cita => ({
                tipo: 'Cita',
                id: cita._id,
                fecha: cita.fechaCreacion,
                paciente: `${cita.pacienteId.nombre} ${cita.pacienteId.apellido}`,
                medico: `${cita.medicoId.nombre} ${cita.medicoId.apellido}`,
                especialidad: cita.medicoId.especialidad,
                estado: cita.estado,
                detalles: cita.motivo
            })),
            ...tratamientosRecientes.map(tratamiento => ({
                tipo: 'Tratamiento',
                id: tratamiento._id,
                fecha: tratamiento.fechaCreacion,
                paciente: `${tratamiento.pacienteId.nombre} ${tratamiento.pacienteId.apellido}`,
                medico: `${tratamiento.medicoId.nombre} ${tratamiento.medicoId.apellido}`,
                especialidad: tratamiento.medicoId.especialidad,
                detalles: tratamiento.diagnostico
            })),
            ...recetasRecientes.map(receta => ({
                tipo: 'Receta',
                id: receta._id,
                fecha: receta.fecha,
                paciente: `${receta.pacienteId.nombre} ${receta.pacienteId.apellido}`,
                medico: `${receta.medicoId.nombre} ${receta.medicoId.apellido}`,
                especialidad: receta.medicoId.especialidad,
                estado: receta.estado,
                detalles: `${receta.medicamentos.length} medicamentos`
            })),
            ...examenesRecientes.map(examen => ({
                tipo: 'Examen',
                id: examen._id,
                fecha: examen.fechaCreacion,
                paciente: `${examen.pacienteId.nombre} ${examen.pacienteId.apellido}`,
                medico: `${examen.medicoId.nombre} ${examen.medicoId.apellido}`,
                especialidad: examen.medicoId.especialidad,
                estado: examen.estado,
                detalles: examen.tipo
            }))
        ];
        
        // Ordenar por fecha (más reciente primero)
        actividades.sort((a, b) => b.fecha - a.fecha);
        
        // Limitar al número solicitado
        const actividadesLimitadas = actividades.slice(0, limite);
        
        res.status(200).json({
            status: 'success',
            data: {
                actividades: actividadesLimitadas
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener actividad reciente',
            error: error.message
        });
    }
};
