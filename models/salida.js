const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const salidaSchema = new Schema({
    id_producto: { type: Schema.Types.ObjectId, ref: 'Producto', required: true },
    cantidad: { type: Number, required: true },
    fecha_salida: { type: Date, default: Date.now },
    motivo: { type: String, required: true }, // Ej: venta, daño, etc.
    observaciones: { type: String }
});

const Salida = mongoose.model('Salida', salidaSchema);
module.exports = Salida;
