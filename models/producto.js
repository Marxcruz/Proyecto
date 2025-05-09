const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productoSchema = new Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String },
    precio: { type: Number, required: true },
    stock_actual: { type: Number, required: true, default: 0 },
    id_categoria: { type: Schema.Types.ObjectId, ref: 'Categoria', required: true },
    id_proveedor: { type: Schema.Types.ObjectId, ref: 'Proveedor', required: true },
    estado: { type: String, enum: ['activo', 'inactivo'], default: 'activo' }
});

const Producto = mongoose.model('Producto', productoSchema);
module.exports = Producto;
