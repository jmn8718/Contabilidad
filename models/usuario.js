var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var usuarioSchema = new Schema({
    usuario: String,
    password: String
});

module.exports = mongoose.model('Usuario', usuarioSchema);