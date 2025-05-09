const jwt = require('jsonwebtoken');

// Middleware para verificar token JWT
exports.protectRoute = (req, res, next) => {
    try {
        // 1. Obtener el token
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        // 2. Verificar si el token existe
        if (!token) {
            return res.status(401).json({
                status: 'fail',
                message: 'No está autorizado para acceder a esta ruta. Por favor inicie sesión.'
            });
        }

        // 3. Verificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'mi_secreto_temporal');

        // 4. Agregar el usuario decodificado a la solicitud
        req.user = decoded;

        // 5. Continuar con la solicitud
        next();
    } catch (error) {
        return res.status(401).json({
            status: 'fail',
            message: 'Token inválido o expirado',
            error: error.message
        });
    }
};

// Middleware para restringir acceso por roles
exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                status: 'fail',
                message: 'No tiene permiso para realizar esta acción'
            });
        }
        next();
    };
};
