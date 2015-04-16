var Usuario = require('../models/usuario.js'),
	express = require('express'),
    session = require('client-sessions'),
	bodyParser = require('body-parser'),
	log = require('../logger.js');
var router = express.Router();
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

router.post('/register', function(req,res){
    var user = new Usuario({
        usuario: req.body.usuario,
        password: req.body.password
    });
    user.save(function(err){
        if(err) {
            res.send(err);
        }
    });
    req.session.usuario = user.usuario;
    res.redirect('../');    
});

router.post('/login', function(req,res){
    console.log('log in de '+req.body.usuario);
    Usuario.findOne({usuario: req.body.usuario}, function(error, usuario){
        if(error) {
            res.send(error);
        }
        if(!usuario){
            console.log('no user');
        } else if (usuario.password===req.body.password){
            console.log('logeado');
            console.log(usuario);
            req.session.usuario = usuario.usuario;
            res.redirect('/login'); 
        } else {                
            console.log('wrong password');
        };
    });
});

router.post('/logout', function(req, res) {
  console.log('deslogeado');
  req.session.reset();
  console.log(req.session);
  res.redirect('/login'); 
});

module.exports = router;