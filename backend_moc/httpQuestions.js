
var routerHTTP = require('./routerHTTP')

var app = routerHTTP(3412);

var questions = [{message:"Os pre-requisitos assumidos pela disciplina foram adequados?", type: "Vazio", id:"1"},
			 
			 {message:"O programa da disciplina esteve de acordo com a ementa da mesma?", type: "Vazio", id:"2"},
			 
			 {message: "vai aparecer em todo canto", type: "Vazio", id:"3"}
			];


var types = ["Múltipla Escolha"];

var teacher =[{teacher:"Matheus Gaudêncio", name:"Administração de Sistemas"},
			{teacher:"Não sei quem é", name:"Banco de Dados I"}, 
			{teacher:"Nazareno", name:"Sistema de Informação I"}, 
			{teacher:"Carlos Wilson", name:"Gerência da Informação"}];			


app.interceptor(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  next();
});

app.interceptor(function (req, res, next) {
  res.setHeader('Content-Type', 'application/json;charset=UTF-8');
  next();
});



app.get('/questions', function(req, res) {
	res.write(JSON.stringify(questions));
	res.end();
});


app.get('/types', function(req, res) {
	res.write(JSON.stringify(types));
	res.end();
});

app.get('/teachers', function(req, res) {
	res.write(JSON.stringify(teacher));
	res.end();
});

app.post('/questions', function(req, res) {

	var question = req.body;
	questions.push(JSON.parse(question));
	res.end();

});

app.delete('/questions', function(req, res) {
	var question = req.body;
	console.log(question);
	var pos = questions.indexOf(question);
	console.log(pos);
	questions.slice(pos,1);
	res.end();

});


app.options('/questions', function(req, res) {
	res.end();
});



