const express = require('express');
const notificacionController = require('../controllers/notificacionController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// Proteger todas las rutas de notificaciones
router.use(authMiddleware.protectRoute);

// Rutas para todos los usuarios autenticados
router.get('/', notificacionController.getNotificacionesUsuario);
router.patch('/leer-todas', notificacionController.marcarTodasComoLeidas);
router.patch('/:id/leer', notificacionController.marcarComoLeida);
router.delete('/:id', notificacionController.eliminarNotificacion);

// Rutas solo para administradores
router.use(authMiddleware.restrictTo('admin'));
router.post('/', notificacionController.crearNotificacion);
router.post('/enviar-a-todos', notificacionController.enviarATodos);
router.post('/enviar-por-rol', notificacionController.enviarPorRol);

module.exports = router;
