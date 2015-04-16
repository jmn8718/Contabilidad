var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var cuentaSchema = new Schema({
    usuario: String,
    marca: String,
    cuenta: String,
    valor: Number,
    fecha: Date,
    tipo: String
});

module.exports = mongoose.model('Cuenta', cuentaSchema);