const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recetaSchema = new Schema({
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
        default: Date.now,
        required: true
    },
    medicamentos: [{
        nombre: {
            type: String,
            required: true
        },
        dosis: {
            type: String,
            required: true
        },
        frecuencia: {
            type: String,
            required: true
        },
        duracion: String,
        instrucciones: String
    }],
    notas: String,
    vigencia: {
        inicio: {
            type: Date,
            default: Date.now
        },
        fin: Date
    },
    estado: {
        type: String,
        enum: ['Activa', 'Completada', 'Cancelada', 'Vencida'],
        default: 'Activa'
    }
}, {
    timestamps: true
});

// Índices para mejorar la búsqueda
recetaSchema.index({ pacienteId: 1 });
recetaSchema.index({ medicoId: 1 });
recetaSchema.index({ 'vigencia.fin': 1, estado: 1 });

const Receta = mongoose.model('Receta', recetaSchema);
module.exports = Receta;
