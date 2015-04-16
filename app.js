var express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('client-sessions'),
    mongoose = require('mongoose'),
    http = require('http'),
    path = require('path');

var app = express();

app.use(session({
  cookieName: 'session',
  secret: 'random_string_goes_here',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
}));
var user = ''; //your user here
var password = ''; //your password here
var dbName = ''; //your database here
var dbUri = 'mongodb://'+user+':'+password+'dev@ds031531.mongolab.com:31531/'+dbName;

mongoose.connect(dbUri, function(err, res){
    if(err){
        console.log('ERROR connecting to '+dbUri+' - '+err);
    } else {
        console.log('SUCCESS conneting to '+dbUri);
    }
});

var routes = require('./routes/routes'),
	cuentas = require('./routes/cuentas'),
	usuarios = require('./routes/usuarios');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/cuentas', cuentas);
app.use('/usuarios', usuarios);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
