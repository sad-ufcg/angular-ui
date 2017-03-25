angular.module("myApp").factory("mocAPI", function(config, $q) {


	var _getCourses = function () {

		var course = [{id: "adsis20162",name:" Matheus Gaudêncio", courseName:"Administração de Sistemas"},
		{id: "bd120161", name:" Não sei quem é", courseName:"Banco de Dados I"},
		{id: "si120161", name:" Nazareno", courseName:"Sistema de Informação I"},
		{id: "gi20161", name:" Carlos Wilson", courseName:"Gerência da Informação"}];

		return $q.when(course);
	};

	var _getAnswers = function () {

		var answers = [{ordId:1, value:"Algum texto para Resposta 1"},
		{ordId:2, value:"Algum texto para Resposta 2"},
		{ordId:3, value:"Algum texto para Resposta 3"},
		{ordId:4, value: "Algum texto para Resposta 4"},
		{ordId:5, value: "Algum texto para Resposta 5"}
		];

		return  answers
	};

	return {

		getCourses : _getCourses,
		getAnswers : _getAnswers

	}

} )