const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const medicoSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    especialidad: {
        type: String,
        required: true
    },
    licenciaMedica: {
        type: String,
        required: true,
        unique: true
    },
    contacto: {
        telefono: String,
        email: {
            type: String,
            lowercase: true,
            required: true
        }
    },
    disponibilidad: [{
        dia: {
            type: String,
            enum: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']
        },
        horaInicio: String,
        horaFin: String
    }],
    educacion: [{
        institucion: String,
        titulo: String,
        año: Number
    }],
    fechaRegistro: {
        type: Date,
        default: Date.now
    },
    estado: {
        type: String,
        enum: ['Activo', 'Inactivo', 'Vacaciones'],
        default: 'Activo'
    }
}, {
    timestamps: true
});

const Medico = mongoose.model('Medico', medicoSchema);
module.exports = Medico;
