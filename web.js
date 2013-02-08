process.env.NODE_ENV = process.env.NODE_ENV || 'development';

/**
 * Module dependencies.
 */

var express = require('express'),
	http = require('http'),
	path = require('path');

var app = express();

app.configure(function(){
	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	// app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(require('less-middleware')({ src: __dirname + '/public' }));
	app.use(express.static(path.join(__dirname, 'public')));
	
	// Handle 404s
	app.use(function(req, res, next){
		res.status(404).render('404');
	});
});

app.configure('development', function(){
	app.use(express.errorHandler());
});

// Routes
app.get('/', function(req, res){
	res.render('home');
});

http.createServer(app).listen(app.get('port'), function(){
	console.log("Express server listening on port %d in mode %s", app.get('port'), app.settings.env);
});
