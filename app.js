var express = require('express');

//parserek
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();

//db
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/node-todo-app'); 

// define model =================
var Todo = mongoose.model('Todo', {
    text : String
});

//app deklaralas
var app = express();

//view
app.set('view engine', 'pug');
app.set('views', './views');

//parse
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(upload.array());

//static fileok a public mappaban
app.use(express.static('public'));

//fooldal
app.get('/', function (req, res) {
	console.log('request homera');
	Todo.find(function(err, todos) {
		var texts = [];
		for (var i = 0; i < todos.length; ++i) {
			texts.push(todos[i].text);
		}
		console.log(texts);
		res.render('home', {todos: texts});
	});
	
});

//todo hozzaadas
app.get('/add_todo', function(req, res) {
	console.log('request add_todo-ra');
	res.render('add_todo');
});

app.post('/add', function(req, res) {
	res.render('add');
	console.log('todo hozzadas: ' + req.body.todo_text);
	Todo.create({text: req.body.todo_text})
});

app.listen(3000, function () {
	console.log('Elindult a szerver');
});
