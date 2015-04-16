var express = require('express'),
    Usuario = require('../models/usuario.js'),
    session = require('client-sessions'),
    bodyParser = require('body-parser'),
    log = require('../logger.js');

var router = express.Router();
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

router.get('/', function(req, res, next) {
    if(req.session && req.session.usuario){
        //res.render('index', { title: 'Contabilidad' });
        res.redirect('/cuentas');
    } else {
        res.redirect('/login');
    }
});

/*router.get('/signin', function(req, res, next) {
    res.render('signin', { title: 'Sign In' });
});*/

router.get('/login', function(req, res, next) {
    if(req.session && req.session.usuario){
        res.redirect('/cuentas');
    } else {
        res.render('login', { title: 'Log In' });
    }

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
            res.redirect('/'); 
        } else {                
            console.log('wrong password');
        };
    });
});

router.get('/logout', function(req, res) {
  console.log('deslogeado');
  req.session.reset();
  console.log(req.session);
  res.redirect('/'); 
});

router.get('/cuentas', function(req, res, next) {
    if(req.session && req.session.usuario){
        res.render('cuentas', { title: 'Cuentas' });
    } else {
        res.redirect('/login');
    }
    
});

router.get('/resumen', function(req, res, next) {
    if(req.session && req.session.usuario){
        res.render('resumen', { title: 'Resumen' });
    } else {
        res.redirect('/login');
    }

});

/*
router.get('/backup', function(req, res, next) {
    res.render('resumenBackup', { title: 'Back Up' });
});
router.get('/factura', function(req, res, next) {
    res.render('factura', { title: 'Factura' });
});
*/
module.exports = router;