angular.module("myApp").factory("mocAPI", function(config, $q) {


	var _getTeachers = function () {

		var teachers = [{id: 123,name:" Matheus Gaudêncio", courseName:"Administração de Sistemas"},
		{id: 999, name:" Não sei quem é", courseName:"Banco de Dados I"},
		{id: 223, name:" Nazareno", courseName:"Sistema de Informação I"},
		{id: 21, name:" Carlos Wilson", courseName:"Gerência da Informação"}];

		return $q.when(teachers);
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

		getTeachers : _getTeachers,
		getAnswers : _getAnswers

	}

} )