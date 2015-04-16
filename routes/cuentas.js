var Cuenta = require('../models/cuenta.js'),
    CuentaBK = require('../models/cuentaBK.js'),
	express = require('express'),
    session = require('client-sessions'),
	router = express.Router(),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	log = require('../logger.js');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

router.get('/getAll', function(req, res, next) {
    console.log('usuario pide all');
    console.log(req.session);
    Cuenta.find({usuario:req.session.usuario},function(err, data){
        if(err){
            res.send(err);
        }
        res.json(data);
        //log.logData(data);
    });
});

router.get('/getAll/backup', function(req, res, next) {
    CuentaBK.find(function(err, data){
        if(err){
            res.send(err);
        }
        res.json(data);
        //log.logData(data);
    });
});

router.post('/add', function(req,res){
    var item = new Cuenta({
        usuario: req.session.usuario,
        marca: req.body.marca,
        cuenta: req.body.cuenta,
        valor: req.body.valor,
        fecha: req.body.fecha,
        tipo: req.body.tipo
    });
    item.save(function(err){
        if(err) {
            res.send(err);
        }
        Cuenta.find({usuario:req.session.usuario},function(err, data){
            if(err){
                res.send(err);
            }
            res.json(data);
            //log.logData(data);
        });
    });
    var itemBK = new CuentaBK({
        usuario: req.session.usuario,
        marca: req.body.marca,
        cuenta: req.body.cuenta,
        valor: req.body.valor,
        fecha: req.body.fecha,
        tipo: req.body.tipo
    });
    itemBK.save(function(err){
        if(err) {
            res.send(err);
        }
        CuentaBK.find(function(err, data){
            if(err){
                res.send(err);
            }
            //res.json(data);
            //log.logData(data);
        });
    });
});

router.delete('/delete/:id', function (req,res) {
    Cuenta.remove({_id: req.params.id},
        function (err, data) {
            if(err) {
                res.send(err);
            }
            Cuenta.find({usuario:req.session.usuario},function(err, data){
                if(err){
                    res.send(err);
                }
                res.json(data);
        		//log.logData(data);
            });
        }
    );
});

module.exports = router;