const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const entradaSchema = new Schema({
    id_producto: { type: Schema.Types.ObjectId, ref: 'Producto', required: true },
    cantidad: { type: Number, required: true },
    fecha_entrada: { type: Date, default: Date.now },
    id_proveedor: { type: Schema.Types.ObjectId, ref: 'Proveedor', required: true },
    observaciones: { type: String }
});

const Entrada = mongoose.model('Entrada', entradaSchema);
module.exports = Entrada;
