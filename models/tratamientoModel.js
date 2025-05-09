const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tratamientoSchema = new Schema({
    citaId: {
        type: Schema.Types.ObjectId,
        ref: 'Cita',
        required: true
    },
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
    diagnostico: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    duracion: {
        valor: {
            type: Number,
            required: true
        },
        unidad: {
            type: String,
            enum: ['Días', 'Semanas', 'Meses'],
            default: 'Días'
        }
    },
    instrucciones: String,
    seguimiento: {
        requerido: {
            type: Boolean,
            default: false
        },
        fechaSugerida: Date
    },
    fechaCreacion: {
        type: Date,
        default: Date.now
    },
    fechaActualizacion: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Índices para mejorar la búsqueda
tratamientoSchema.index({ pacienteId: 1 });
tratamientoSchema.index({ medicoId: 1 });
tratamientoSchema.index({ citaId: 1 });

const Tratamiento = mongoose.model('Tratamiento', tratamientoSchema);
module.exports = Tratamiento;
