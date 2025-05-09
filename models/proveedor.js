const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const proveedorSchema = new Schema({
    nombre: { type: String, required: true },
    contacto: { type: String },
    telefono: { type: String },
    email: { type: String },
    direccion: { type: String }
});

const Proveedor = mongoose.model('Proveedor', proveedorSchema);
module.exports = Proveedor;
