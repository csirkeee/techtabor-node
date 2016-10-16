var express = require('express');

//parserek
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();

//db
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/node-todo-app'); 

//app deklaralas
var app = express();

// define model =================
var Todo = mongoose.model('Todo', {
    text : String
});


//view
app.set('view engine', 'pug');
app.set('views', './views');

//parse
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(upload.array());

var todos = []

//fooldal
app.get('/', function (req, res) {
	Todo.find(function(err, todos) {
		console.log(todos);
		var texts = [];
		for (var i = 0; i < todos.length; ++i) {
			texts.push(todos[i].text);
		}
		console.log(texts);
		res.render('home', {todos: texts});
		console.log('request homera');
	});
	
});

//todo hozzaadas
app.get('/add_todo', function(req, res) {
	res.render('add_todo');
	console.log('request add_todo-ra');
});

app.post('/add', function(req, res) {
	res.render('add');
	console.log(req.body.todo_text);
	Todo.create({text: req.body.todo_text})
});

app.listen(3000, function () {
	console.log('Elindult a szerver');
});
