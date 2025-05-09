const fs = require('fs');
const path = require('path');

/**
 * Middleware para registrar actividades importantes del sistema
 * @param {Object} options - Opciones de configuración
 * @returns {Function} Middleware de Express
 */
const logger = (options = {}) => {
    const logDir = options.logDir || path.join(__dirname, '../logs');
    const logFile = options.logFile || 'activity.log';
    const logPath = path.join(logDir, logFile);
    
    // Crear directorio de logs si no existe
    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true });
    }
    
    return (req, res, next) => {
        // Solo registrar rutas de API y métodos importantes
        if (req.originalUrl.startsWith('/api/v1') && 
            (req.method === 'POST' || req.method === 'PUT' || req.method === 'DELETE')) {
            
            const timestamp = new Date().toISOString();
            const userId = req.user ? req.user._id : 'No autenticado';
            const userRole = req.user ? req.user.role : 'N/A';
            const method = req.method;
            const url = req.originalUrl;
            const ip = req.ip || req.connection.remoteAddress;
            
            const logEntry = `[${timestamp}] Usuario: ${userId} (${userRole}) | ${method} ${url} | IP: ${ip}\n`;
            
            // Escribir en el archivo de log
            fs.appendFile(logPath, logEntry, (err) => {
                if (err) {
                    console.error('Error al escribir en el archivo de log:', err);
                }
            });
        }
        
        next();
    };
};

module.exports = logger;
