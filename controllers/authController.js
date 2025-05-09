const Usuario = require('../models/usuarioModel');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const crypto = require('crypto');

// Función para generar tokens JWT
const signToken = id => {
    return jwt.sign(
        { id }, 
        process.env.JWT_SECRET || 'mi_secreto_temporal', 
        { expiresIn: process.env.JWT_EXPIRES_IN || '90d' }
    );
};

// Función para crear y enviar token
const createSendToken = (usuario, statusCode, res) => {
    const token = signToken(usuario._id);
    
    // Remover la contraseña de la salida
    usuario.password = undefined;
    
    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            usuario
        }
    });
};

// Registrar un nuevo usuario
exports.signup = async (req, res) => {
    try {
        const nuevoUsuario = await Usuario.create({
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm,
            role: req.body.role,
            medicoId: req.body.medicoId
        });
        
        createSendToken(nuevoUsuario, 201, res);
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: 'Error al registrar el usuario',
            error: error.message
        });
    }
};

// Iniciar sesión
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // 1) Verificar si el email y password existen
        if (!email || !password) {
            return res.status(400).json({
                status: 'fail',
                message: 'Por favor proporcione email y contraseña'
            });
        }
        
        // 2) Verificar si el usuario existe y la contraseña es correcta
        const usuario = await Usuario.findOne({ email }).select('+password');
        
        if (!usuario || !(await usuario.correctPassword(password, usuario.password))) {
            return res.status(401).json({
                status: 'fail',
                message: 'Email o contraseña incorrectos'
            });
        }
        
        // 3) Si todo está bien, enviar token al cliente
        createSendToken(usuario, 200, res);
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: 'Error al iniciar sesión',
            error: error.message
        });
    }
};

// Cerrar sesión
exports.logout = (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Sesión cerrada correctamente'
    });
};

// Proteger rutas
exports.protect = async (req, res, next) => {
    try {
        // 1) Obtener token y verificar si existe
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }
        
        if (!token) {
            return res.status(401).json({
                status: 'fail',
                message: 'No está autorizado para acceder a esta ruta. Por favor inicie sesión.'
            });
        }
        
        // 2) Verificar token
        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET || 'mi_secreto_temporal');
        
        // 3) Verificar si el usuario aún existe
        const currentUser = await Usuario.findById(decoded.id);
        if (!currentUser) {
            return res.status(401).json({
                status: 'fail',
                message: 'El usuario al que pertenece este token ya no existe'
            });
        }
        
        // 4) Verificar si el usuario cambió la contraseña después de emitir el token
        if (currentUser.changedPasswordAfter(decoded.iat)) {
            return res.status(401).json({
                status: 'fail',
                message: 'El usuario cambió recientemente la contraseña. Por favor inicie sesión nuevamente.'
            });
        }
        
        // CONCEDER ACCESO A LA RUTA PROTEGIDA
        req.user = currentUser;
        next();
    } catch (error) {
        res.status(401).json({
            status: 'fail',
            message: 'Error de autenticación',
            error: error.message
        });
    }
};

// Restringir acceso por roles
exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        // roles es un array: ['admin', 'medico']
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                status: 'fail',
                message: 'No tiene permiso para realizar esta acción'
            });
        }
        
        next();
    };
};

// Obtener perfil del usuario actual
exports.getMe = (req, res, next) => {
    req.params.id = req.user.id;
    next();
};

// Actualizar perfil del usuario
exports.updateMe = async (req, res) => {
    try {
        // 1) Crear error si el usuario intenta actualizar la contraseña
        if (req.body.password || req.body.passwordConfirm) {
            return res.status(400).json({
                status: 'fail',
                message: 'Esta ruta no es para actualizar contraseñas. Por favor use /updatePassword.'
            });
        }
        
        // 2) Filtrar campos no permitidos
        const filteredBody = filterObj(req.body, 'nombre', 'apellido', 'email');
        
        // 3) Actualizar documento de usuario
        const updatedUser = await Usuario.findByIdAndUpdate(req.user.id, filteredBody, {
            new: true,
            runValidators: true
        });
        
        res.status(200).json({
            status: 'success',
            data: {
                usuario: updatedUser
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: 'Error al actualizar el perfil',
            error: error.message
        });
    }
};

// Función auxiliar para filtrar objetos
const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach(el => {
        if (allowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
};

// Actualizar contraseña
exports.updatePassword = async (req, res) => {
    try {
        // 1) Obtener usuario de la colección
        const usuario = await Usuario.findById(req.user.id).select('+password');
        
        // 2) Verificar si la contraseña actual es correcta
        if (!(await usuario.correctPassword(req.body.passwordCurrent, usuario.password))) {
            return res.status(401).json({
                status: 'fail',
                message: 'Su contraseña actual es incorrecta'
            });
        }
        
        // 3) Si es correcta, actualizar contraseña
        usuario.password = req.body.password;
        usuario.passwordConfirm = req.body.passwordConfirm;
        await usuario.save();
        
        // 4) Iniciar sesión, enviar JWT
        createSendToken(usuario, 200, res);
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: 'Error al actualizar la contraseña',
            error: error.message
        });
    }
};
