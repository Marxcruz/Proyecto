const mongoose = require('mongoose');

const notificacionSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: [true, 'Una notificación debe tener un título']
    },
    mensaje: {
        type: String,
        required: [true, 'Una notificación debe tener un mensaje']
    },
    tipo: {
        type: String,
        enum: ['info', 'warning', 'error', 'success'],
        default: 'info'
    },
    destinatarioId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Usuario',
        required: [true, 'Una notificación debe tener un destinatario']
    },
    origen: {
        type: String,
        enum: ['sistema', 'usuario', 'medico', 'admin'],
        default: 'sistema'
    },
    origenId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Usuario'
    },
    entidad: {
        type: String,
        enum: ['paciente', 'medico', 'cita', 'tratamiento', 'receta', 'examen', 'sistema'],
        default: 'sistema'
    },
    entidadId: {
        type: mongoose.Schema.ObjectId
    },
    leida: {
        type: Boolean,
        default: false
    },
    fechaCreacion: {
        type: Date,
        default: Date.now
    },
    fechaLectura: {
        type: Date
    },
    accion: {
        type: String,
        enum: ['ver', 'editar', 'eliminar', 'confirmar', 'cancelar', 'ninguna'],
        default: 'ninguna'
    },
    urlAccion: {
        type: String
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Índices para mejorar el rendimiento de las consultas
notificacionSchema.index({ destinatarioId: 1, leida: 1 });
notificacionSchema.index({ fechaCreacion: -1 });

const Notificacion = mongoose.model('Notificacion', notificacionSchema);

module.exports = Notificacion;
