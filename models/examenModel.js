const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const examenSchema = new Schema({
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
        required: true
    },
    tipo: {
        type: String,
        required: true
    },
    resultados: {
        valores: [{
            nombre: {
                type: String,
                required: true
            },
            valor: mongoose.Schema.Types.Mixed,
            unidad: String,
            rangoReferencia: String
        }],
        conclusion: String
    },
    observaciones: String,
    archivos: [{
        nombre: String,
        tipo: String,
        url: String
    }],
    fechaCreacion: {
        type: Date,
        default: Date.now
    },
    fechaResultados: Date,
    estado: {
        type: String,
        enum: ['Pendiente', 'Completado', 'Cancelado'],
        default: 'Pendiente'
    }
}, {
    timestamps: true
});

// Índices para mejorar la búsqueda
examenSchema.index({ pacienteId: 1 });
examenSchema.index({ medicoId: 1 });
examenSchema.index({ fecha: 1, estado: 1 });

const Examen = mongoose.model('Examen', examenSchema);
module.exports = Examen;
