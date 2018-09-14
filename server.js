var express 	= require('express');
var app 		= express();
var morgan 		= require('morgan');
var bodyParser	= require('body-parser');
var port 		= process.env.PORT || 8000;
var apiRoutes	= require('./routes/apiRoutes.js');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.urlencoded({extended: 'false'}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static('public'));
app.use('/api', apiRoutes);

app.get('/images/cleardot.gif', function(req, res) {
	res.send('hello');
})

app.get('/', function(req, res){
	res.sendFile(__dirname + '/public/views/main.html');
});

app.listen(port);