angular.module("myApp").factory("questionAPI", function ($http, config, $q, idGenerator) {

	var _getQuestions = function () {

		return $http.get(config.baseUrl + "/question");
	};

	var _getTeachers = function () {

		var teachers = [{id: 123,name:" Matheus Gaudêncio", matter:"Administração de Sistemas"},
			{id: 999, name:" Não sei quem é", matter:"Banco de Dados I"}, 
			{id: 223, name:" Nazareno", matter:"Sistema de Informação I"}, 
			{id: 21, name:" Carlos Wilson", matter:"Gerência da Informação"}];	

		return $q.when(teachers);
	};

	var _getAnswers = function () {

		return ["Resposta 1", "Resposta 2", "Resposta 3", "Resposta 4", "Resposta 5"];
	};

	var _saveQuestion = function(question){

		var temp_quest = {"enunciado": question.enunciado, 
					"tipoResposta": question.tipoResposta};

		return $http.post(config.baseUrl + "/question", JSON.stringify(temp_quest)); 			

	}

	var _deleteQuestion = function(question){

		return $http.delete(config.baseUrl + "/question/" + question.id, question).success(function (data, status, headers) {
	                $scope.ServerResponse = data;
	            });

	}

	var _setQuestion = function(newQuestion, newEnunciado){

		newQuestion.enunciado = newEnunciado;
		console.log(newQuestion);

		return $http.put(config.baseUrl + "/question/" + newQuestion.id, newQuestion).success(function (data, status, headers) {

	});


	}

	return {
		getQuestions : _getQuestions,
		getTeachers: _getTeachers,
		getAnswers : _getAnswers, 
		saveQuestion : _saveQuestion,
		deleteQuestion : _deleteQuestion,
		setQuestion : _setQuestion
	}

})