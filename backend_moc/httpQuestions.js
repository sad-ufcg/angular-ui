
var routerHTTP = require('./routerHTTP')

var app = routerHTTP(3412);

var questions = [{message:"Os pre-requisitos assumidos pela disciplina foram adequados?", type: "Vazio"},
			 {message:"O programa da disciplina esteve de acordo com a ementa da mesma?", type: "Vazio"},
			 {message: "vai aparecer em todo canto", type: "Vazio"}
			];


var types = ["Multipla Escolha", "Escolha Unica", "Apenas Texto"];

var teacher =[{teacher:"Matheus Gaudêncio", name:"Administração de Sistemas"},
			{teacher:"Não sei quem é", name:"Banco de Dados I"}, 
			{teacher:"Nazareno", name:"Sistema de Informação I"}, 
			{teacher:"Carlos Wilson", name:"Gerência da Informação"}];			


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
