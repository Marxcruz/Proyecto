// Middleware para manejar errores de validación de Mongoose
exports.handleValidationError = (err, req, res, next) => {
    if (err.name === 'ValidationError') {
        const errors = Object.values(err.errors).map(el => el.message);
        return res.status(400).json({
            status: 'fail',
            message: 'Error de validación',
            errors
        });
    }
    next(err);
};

// Middleware para manejar errores de ID de MongoDB
exports.handleCastError = (err, req, res, next) => {
    if (err.name === 'CastError') {
        return res.status(400).json({
            status: 'fail',
            message: `ID inválido: ${err.value}`
        });
    }
    next(err);
};

// Middleware para manejar errores de duplicados
exports.handleDuplicateError = (err, req, res, next) => {
    if (err.code === 11000) {
        const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
        return res.status(400).json({
            status: 'fail',
            message: `Valor duplicado: ${value}. Por favor use otro valor.`
        });
    }
    next(err);
};

// Middleware para manejar errores de JWT
exports.handleJWTError = (err, req, res, next) => {
    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({
            status: 'fail',
            message: 'Token inválido. Por favor inicie sesión nuevamente.'
        });
    }
    if (err.name === 'TokenExpiredError') {
        return res.status(401).json({
            status: 'fail',
            message: 'Su sesión ha expirado. Por favor inicie sesión nuevamente.'
        });
    }
    next(err);
};

// Middleware para manejar errores en desarrollo
exports.errorDevelopment = (err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        status: err.status || 'error',
        message: err.message,
        stack: err.stack,
        error: err
    });
};

// Middleware para manejar errores en producción
exports.errorProduction = (err, req, res, next) => {
    // Error operacional, error confiable: enviar mensaje al cliente
    if (err.isOperational) {
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        });
    }
    
    // Error de programación o desconocido: no filtrar detalles
    console.error('ERROR 💥', err);
    res.status(500).json({
        status: 'error',
        message: 'Algo salió mal'
    });
};
