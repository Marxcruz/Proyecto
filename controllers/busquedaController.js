const Paciente = require('../models/pacienteModel');
const Medico = require('../models/medicoModel');
const Cita = require('../models/citaModel');
const Tratamiento = require('../models/tratamientoModel');
const Receta = require('../models/recetaModel');
const Examen = require('../models/examenModel');

/**
 * @desc    Búsqueda avanzada de pacientes
 * @route   GET /api/v1/busqueda/pacientes
 * @access  Private
 */
exports.buscarPacientes = async (req, res) => {
    try {
        const { 
            nombre, 
            apellido, 
            documento, 
            email, 
            telefono, 
            genero, 
            edad, 
            grupoSanguineo,
            direccion,
            ciudad,
            estado
        } = req.query;
        
        // Construir el objeto de consulta
        const query = {};
        
        if (nombre) query.nombre = { $regex: nombre, $options: 'i' };
        if (apellido) query.apellido = { $regex: apellido, $options: 'i' };
        if (documento) query.documento = { $regex: documento, $options: 'i' };
        if (email) query.email = { $regex: email, $options: 'i' };
        if (telefono) query.telefono = { $regex: telefono, $options: 'i' };
        if (genero) query.genero = genero;
        if (grupoSanguineo) query.grupoSanguineo = grupoSanguineo;
        
        // Búsqueda por edad (rango)
        if (edad) {
            const [min, max] = edad.split('-');
            const fechaActual = new Date();
            
            if (min && max) {
                const fechaMin = new Date(fechaActual);
                fechaMin.setFullYear(fechaMin.getFullYear() - parseInt(max));
                
                const fechaMax = new Date(fechaActual);
                fechaMax.setFullYear(fechaMax.getFullYear() - parseInt(min));
                
                query.fechaNacimiento = { $gte: fechaMin, $lte: fechaMax };
            } else {
                const fechaNacimiento = new Date(fechaActual);
                fechaNacimiento.setFullYear(fechaNacimiento.getFullYear() - parseInt(edad));
                query.fechaNacimiento = { $lte: fechaNacimiento };
            }
        }
        
        // Búsqueda por dirección
        if (direccion || ciudad || estado) {
            query.direccion = {};
            
            if (direccion) query.direccion.calle = { $regex: direccion, $options: 'i' };
            if (ciudad) query.direccion.ciudad = { $regex: ciudad, $options: 'i' };
            if (estado) query.direccion.estado = { $regex: estado, $options: 'i' };
        }
        
        // Opciones de paginación
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        
        // Ejecutar la consulta
        const pacientes = await Paciente.find(query)
            .skip(skip)
            .limit(limit)
            .sort({ apellido: 1, nombre: 1 });
        
        // Contar el total de resultados
        const total = await Paciente.countDocuments(query);
        
        res.status(200).json({
            status: 'success',
            resultados: pacientes.length,
            total,
            pagina: page,
            totalPaginas: Math.ceil(total / limit),
            data: {
                pacientes
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al buscar pacientes',
            error: error.message
        });
    }
};

/**
 * @desc    Búsqueda avanzada de médicos
 * @route   GET /api/v1/busqueda/medicos
 * @access  Private
 */
exports.buscarMedicos = async (req, res) => {
    try {
        const { 
            nombre, 
            apellido, 
            especialidad, 
            documento, 
            email, 
            telefono,
            estado
        } = req.query;
        
        // Construir el objeto de consulta
        const query = {};
        
        if (nombre) query.nombre = { $regex: nombre, $options: 'i' };
        if (apellido) query.apellido = { $regex: apellido, $options: 'i' };
        if (especialidad) query.especialidad = { $regex: especialidad, $options: 'i' };
        if (documento) query.documento = { $regex: documento, $options: 'i' };
        if (email) query.email = { $regex: email, $options: 'i' };
        if (telefono) query.telefono = { $regex: telefono, $options: 'i' };
        if (estado) query.estado = estado;
        
        // Opciones de paginación
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        
        // Ejecutar la consulta
        const medicos = await Medico.find(query)
            .skip(skip)
            .limit(limit)
            .sort({ apellido: 1, nombre: 1 });
        
        // Contar el total de resultados
        const total = await Medico.countDocuments(query);
        
        res.status(200).json({
            status: 'success',
            resultados: medicos.length,
            total,
            pagina: page,
            totalPaginas: Math.ceil(total / limit),
            data: {
                medicos
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al buscar médicos',
            error: error.message
        });
    }
};

/**
 * @desc    Búsqueda avanzada de citas
 * @route   GET /api/v1/busqueda/citas
 * @access  Private
 */
exports.buscarCitas = async (req, res) => {
    try {
        const { 
            paciente, 
            medico, 
            especialidad,
            fecha, 
            fechaInicio, 
            fechaFin, 
            estado, 
            motivo 
        } = req.query;
        
        // Construir el objeto de consulta
        const query = {};
        
        // Búsqueda por paciente (nombre o apellido)
        if (paciente) {
            const pacientes = await Paciente.find({
                $or: [
                    { nombre: { $regex: paciente, $options: 'i' } },
                    { apellido: { $regex: paciente, $options: 'i' } }
                ]
            });
            
            if (pacientes.length > 0) {
                query.pacienteId = { $in: pacientes.map(p => p._id) };
            } else {
                // Si no se encuentra ningún paciente, devolver un array vacío
                return res.status(200).json({
                    status: 'success',
                    resultados: 0,
                    total: 0,
                    pagina: 1,
                    totalPaginas: 0,
                    data: {
                        citas: []
                    }
                });
            }
        }
        
        // Búsqueda por médico (nombre o apellido)
        if (medico) {
            const medicos = await Medico.find({
                $or: [
                    { nombre: { $regex: medico, $options: 'i' } },
                    { apellido: { $regex: medico, $options: 'i' } }
                ]
            });
            
            if (medicos.length > 0) {
                query.medicoId = { $in: medicos.map(m => m._id) };
            } else {
                // Si no se encuentra ningún médico, devolver un array vacío
                return res.status(200).json({
                    status: 'success',
                    resultados: 0,
                    total: 0,
                    pagina: 1,
                    totalPaginas: 0,
                    data: {
                        citas: []
                    }
                });
            }
        }
        
        // Búsqueda por especialidad
        if (especialidad) {
            const medicos = await Medico.find({ especialidad: { $regex: especialidad, $options: 'i' } });
            
            if (medicos.length > 0) {
                query.medicoId = { $in: medicos.map(m => m._id) };
            } else {
                // Si no se encuentra ningún médico con esa especialidad, devolver un array vacío
                return res.status(200).json({
                    status: 'success',
                    resultados: 0,
                    total: 0,
                    pagina: 1,
                    totalPaginas: 0,
                    data: {
                        citas: []
                    }
                });
            }
        }
        
        // Búsqueda por fecha específica
        if (fecha) {
            const fechaObj = new Date(fecha);
            fechaObj.setHours(0, 0, 0, 0);
            
            const fechaFin = new Date(fechaObj);
            fechaFin.setHours(23, 59, 59, 999);
            
            query.fecha = { $gte: fechaObj, $lte: fechaFin };
        }
        
        // Búsqueda por rango de fechas
        if (fechaInicio || fechaFin) {
            query.fecha = {};
            
            if (fechaInicio) {
                const fechaInicioObj = new Date(fechaInicio);
                fechaInicioObj.setHours(0, 0, 0, 0);
                query.fecha.$gte = fechaInicioObj;
            }
            
            if (fechaFin) {
                const fechaFinObj = new Date(fechaFin);
                fechaFinObj.setHours(23, 59, 59, 999);
                query.fecha.$lte = fechaFinObj;
            }
        }
        
        // Búsqueda por estado
        if (estado) query.estado = estado;
        
        // Búsqueda por motivo
        if (motivo) query.motivo = { $regex: motivo, $options: 'i' };
        
        // Opciones de paginación
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        
        // Ejecutar la consulta
        const citas = await Cita.find(query)
            .populate('pacienteId', 'nombre apellido documento')
            .populate('medicoId', 'nombre apellido especialidad')
            .skip(skip)
            .limit(limit)
            .sort({ fecha: -1 });
        
        // Contar el total de resultados
        const total = await Cita.countDocuments(query);
        
        res.status(200).json({
            status: 'success',
            resultados: citas.length,
            total,
            pagina: page,
            totalPaginas: Math.ceil(total / limit),
            data: {
                citas
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al buscar citas',
            error: error.message
        });
    }
};

/**
 * @desc    Búsqueda global en el sistema
 * @route   GET /api/v1/busqueda/global
 * @access  Private
 */
exports.busquedaGlobal = async (req, res) => {
    try {
        const { termino } = req.query;
        
        if (!termino) {
            return res.status(400).json({
                status: 'fail',
                message: 'Se requiere un término de búsqueda'
            });
        }
        
        // Expresión regular para hacer la búsqueda insensible a mayúsculas/minúsculas
        const regex = new RegExp(termino, 'i');
        
        // Búsqueda en pacientes
        const pacientes = await Paciente.find({
            $or: [
                { nombre: regex },
                { apellido: regex },
                { documento: regex },
                { email: regex }
            ]
        }).limit(5);
        
        // Búsqueda en médicos
        const medicos = await Medico.find({
            $or: [
                { nombre: regex },
                { apellido: regex },
                { especialidad: regex },
                { documento: regex },
                { email: regex }
            ]
        }).limit(5);
        
        // Búsqueda en citas
        const citas = await Cita.find({
            $or: [
                { motivo: regex },
                { observaciones: regex }
            ]
        })
        .populate('pacienteId', 'nombre apellido documento')
        .populate('medicoId', 'nombre apellido especialidad')
        .limit(5);
        
        // Búsqueda en tratamientos
        const tratamientos = await Tratamiento.find({
            $or: [
                { diagnostico: regex },
                { descripcion: regex },
                { indicaciones: regex }
            ]
        })
        .populate('pacienteId', 'nombre apellido documento')
        .populate('medicoId', 'nombre apellido especialidad')
        .limit(5);
        
        // Búsqueda en recetas
        const recetas = await Receta.find({
            $or: [
                { 'medicamentos.nombre': regex },
                { 'medicamentos.indicaciones': regex },
                { observaciones: regex }
            ]
        })
        .populate('pacienteId', 'nombre apellido documento')
        .populate('medicoId', 'nombre apellido especialidad')
        .limit(5);
        
        // Búsqueda en exámenes
        const examenes = await Examen.find({
            $or: [
                { tipo: regex },
                { descripcion: regex },
                { resultados: regex },
                { observaciones: regex }
            ]
        })
        .populate('pacienteId', 'nombre apellido documento')
        .populate('medicoId', 'nombre apellido especialidad')
        .limit(5);
        
        res.status(200).json({
            status: 'success',
            data: {
                pacientes,
                medicos,
                citas,
                tratamientos,
                recetas,
                examenes
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error en la búsqueda global',
            error: error.message
        });
    }
};
