const Notificacion = require('../models/notificacionModel');
const Usuario = require('../models/usuarioModel');

/**
 * @desc    Crear una nueva notificación
 * @route   POST /api/v1/notificaciones
 * @access  Private
 */
exports.crearNotificacion = async (req, res) => {
    try {
        const nuevaNotificacion = await Notificacion.create(req.body);
        
        res.status(201).json({
            status: 'success',
            data: {
                notificacion: nuevaNotificacion
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};

/**
 * @desc    Obtener todas las notificaciones de un usuario
 * @route   GET /api/v1/notificaciones
 * @access  Private
 */
exports.getNotificacionesUsuario = async (req, res) => {
    try {
        const usuarioId = req.user._id;
        const { leida, tipo, limit = 10, page = 1 } = req.query;
        
        // Construir el objeto de consulta
        const query = { destinatarioId: usuarioId };
        
        if (leida !== undefined) {
            query.leida = leida === 'true';
        }
        
        if (tipo) {
            query.tipo = tipo;
        }
        
        // Opciones de paginación
        const skip = (parseInt(page) - 1) * parseInt(limit);
        
        // Ejecutar la consulta
        const notificaciones = await Notificacion.find(query)
            .sort({ fechaCreacion: -1 })
            .skip(skip)
            .limit(parseInt(limit))
            .populate('origenId', 'nombre apellido role');
        
        // Contar el total de notificaciones
        const total = await Notificacion.countDocuments(query);
        
        // Contar notificaciones no leídas
        const noLeidas = await Notificacion.countDocuments({ 
            destinatarioId: usuarioId,
            leida: false
        });
        
        res.status(200).json({
            status: 'success',
            resultados: notificaciones.length,
            total,
            noLeidas,
            pagina: parseInt(page),
            totalPaginas: Math.ceil(total / parseInt(limit)),
            data: {
                notificaciones
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

/**
 * @desc    Marcar una notificación como leída
 * @route   PATCH /api/v1/notificaciones/:id/leer
 * @access  Private
 */
exports.marcarComoLeida = async (req, res) => {
    try {
        const notificacion = await Notificacion.findById(req.params.id);
        
        if (!notificacion) {
            return res.status(404).json({
                status: 'fail',
                message: 'No se encontró la notificación con ese ID'
            });
        }
        
        // Verificar que la notificación pertenezca al usuario actual
        if (notificacion.destinatarioId.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                status: 'fail',
                message: 'No tiene permiso para acceder a esta notificación'
            });
        }
        
        // Actualizar la notificación
        notificacion.leida = true;
        notificacion.fechaLectura = Date.now();
        await notificacion.save();
        
        res.status(200).json({
            status: 'success',
            data: {
                notificacion
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

/**
 * @desc    Marcar todas las notificaciones como leídas
 * @route   PATCH /api/v1/notificaciones/leer-todas
 * @access  Private
 */
exports.marcarTodasComoLeidas = async (req, res) => {
    try {
        const usuarioId = req.user._id;
        
        // Actualizar todas las notificaciones no leídas del usuario
        const resultado = await Notificacion.updateMany(
            { 
                destinatarioId: usuarioId,
                leida: false
            },
            { 
                leida: true,
                fechaLectura: Date.now()
            }
        );
        
        res.status(200).json({
            status: 'success',
            message: `${resultado.nModified} notificaciones marcadas como leídas`,
            data: {
                modificadas: resultado.nModified
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

/**
 * @desc    Eliminar una notificación
 * @route   DELETE /api/v1/notificaciones/:id
 * @access  Private
 */
exports.eliminarNotificacion = async (req, res) => {
    try {
        const notificacion = await Notificacion.findById(req.params.id);
        
        if (!notificacion) {
            return res.status(404).json({
                status: 'fail',
                message: 'No se encontró la notificación con ese ID'
            });
        }
        
        // Verificar que la notificación pertenezca al usuario actual
        if (notificacion.destinatarioId.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                status: 'fail',
                message: 'No tiene permiso para eliminar esta notificación'
            });
        }
        
        await Notificacion.findByIdAndDelete(req.params.id);
        
        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

/**
 * @desc    Enviar notificación a todos los usuarios
 * @route   POST /api/v1/notificaciones/enviar-a-todos
 * @access  Private/Admin
 */
exports.enviarATodos = async (req, res) => {
    try {
        const { titulo, mensaje, tipo, entidad, entidadId, accion, urlAccion } = req.body;
        
        if (!titulo || !mensaje) {
            return res.status(400).json({
                status: 'fail',
                message: 'Se requiere título y mensaje para la notificación'
            });
        }
        
        // Obtener todos los usuarios activos
        const usuarios = await Usuario.find({ estado: 'Activo' });
        
        // Crear una notificación para cada usuario
        const notificacionesPromises = usuarios.map(usuario => {
            return Notificacion.create({
                titulo,
                mensaje,
                tipo: tipo || 'info',
                destinatarioId: usuario._id,
                origen: 'admin',
                origenId: req.user._id,
                entidad: entidad || 'sistema',
                entidadId,
                accion: accion || 'ninguna',
                urlAccion
            });
        });
        
        await Promise.all(notificacionesPromises);
        
        res.status(201).json({
            status: 'success',
            message: `Notificación enviada a ${usuarios.length} usuarios`,
            data: {
                usuariosNotificados: usuarios.length
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

/**
 * @desc    Enviar notificación a usuarios por rol
 * @route   POST /api/v1/notificaciones/enviar-por-rol
 * @access  Private/Admin
 */
exports.enviarPorRol = async (req, res) => {
    try {
        const { titulo, mensaje, tipo, rol, entidad, entidadId, accion, urlAccion } = req.body;
        
        if (!titulo || !mensaje || !rol) {
            return res.status(400).json({
                status: 'fail',
                message: 'Se requiere título, mensaje y rol para la notificación'
            });
        }
        
        // Obtener todos los usuarios activos con el rol especificado
        const usuarios = await Usuario.find({ 
            estado: 'Activo',
            role: rol
        });
        
        if (usuarios.length === 0) {
            return res.status(404).json({
                status: 'fail',
                message: `No se encontraron usuarios con el rol ${rol}`
            });
        }
        
        // Crear una notificación para cada usuario
        const notificacionesPromises = usuarios.map(usuario => {
            return Notificacion.create({
                titulo,
                mensaje,
                tipo: tipo || 'info',
                destinatarioId: usuario._id,
                origen: 'admin',
                origenId: req.user._id,
                entidad: entidad || 'sistema',
                entidadId,
                accion: accion || 'ninguna',
                urlAccion
            });
        });
        
        await Promise.all(notificacionesPromises);
        
        res.status(201).json({
            status: 'success',
            message: `Notificación enviada a ${usuarios.length} usuarios con rol ${rol}`,
            data: {
                usuariosNotificados: usuarios.length,
                rol
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};
