const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categoriaSchema = new Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String }
});

const Categoria = mongoose.model('Categoria', categoriaSchema);
module.exports = Categoria;
