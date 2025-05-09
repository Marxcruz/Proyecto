const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const citaSchema = new Schema({
    pacienteId: {
        type: Schema.Types.ObjectId,
        ref: 'Paciente',
        required: true
    },
    medicoId: {
        type: Schema.Types.ObjectId,
        ref: 'Medico',
        required: true
    },
    fecha: {
        type: Date,
        required: false
    },
    hora: {
        inicio: {
            type: String,
            required: false
        },
        fin: {
            type: String,
            required: false
        }
    },
    estado: {
        type: String,
        enum: ['Programada', 'Confirmada', 'Completada', 'Cancelada', 'Reprogramada'],
        default: 'Programada'
    },
    motivo: {
        type: String,
        required: false
    },
    notas: String,
    tipoConsulta: {
        type: String,
        enum: ['Primera vez', 'Seguimiento', 'Urgencia', 'Control'],
        default: 'Primera vez'
    },
    fechaCreacion: {
        type: Date,
        default: Date.now
    },
    ultimaActualizacion: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Índices para mejorar la búsqueda
citaSchema.index({ pacienteId: 1, fecha: 1 });
citaSchema.index({ medicoId: 1, fecha: 1 });
citaSchema.index({ fecha: 1, estado: 1 });

const Cita = mongoose.model('Cita', citaSchema);
module.exports = Cita;
