const dotenv = require('dotenv');

// Cargar variables de entorno del archivo .env
dotenv.config({ path: './.env' });

module.exports = {
    environment: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3001,
    db: {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || '',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'mydb1',
        port: process.env.DB_PORT || 27017
    },
    jwtSecret: process.env.JWT_SECRET || 'mediplus-sistema-gestion-historias-clinicas-secreto',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '90d',
    jwtCookieExpiresIn: process.env.JWT_COOKIE_EXPIRES_IN || 90
}