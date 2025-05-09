const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pacienteSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    fechaNacimiento: {
        type: Date,
        required: true
    },
    genero: {
        type: String,
        enum: ['Masculino', 'Femenino', 'Otro'],
        required: true
    },
    direccion: {
        calle: String,
        ciudad: String,
        estado: String,
        codigoPostal: String
    },
    contacto: {
        telefono: String,
        email: {
            type: String,
            lowercase: true
        }
    },
    grupoSanguineo: {
        type: String,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
    },
    alergias: [String],
    antecedentes: [{
        tipo: String,
        descripcion: String,
        fecha: Date
    }],
    historiaClinica: {
        enfermedadesCronicas: [String],
        cirugiasPrevias: [{
            tipo: String,
            fecha: Date,
            notas: String
        }],
        medicacionActual: [String]
    },
    fechaRegistro: {
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

const Paciente = mongoose.model('Paciente', pacienteSchema);
module.exports = Paciente;
