angular.module("myApp").factory("questionAPI", function ($http, config, idGenerator) {

	var _getQuestions = function () {

		return $http.get(config.baseUrl + "/question");
	};

	var _getTeachers = function () {

		return $http.get(config.baseUrl + "/teachers");
	};

	var _getAnswers = function () {

		return ["Resposta 1", "Resposta 2", "Resposta 3", "Resposta 4", "Resposta 5"];
	};

	var _saveQuestion = function(question){

		var temp_quest = {"id":idGenerator.generate(), 	"enunciado": question.enunciado, 
					"tipoResposta": question.tipoResposta};

		return $http.post(config.baseUrl + "/question", JSON.stringify(temp_quest)); 			

	}

	return {
		getQuestions : _getQuestions,
		getTeachers: _getTeachers,
		getAnswers : _getAnswers, 
		saveQuestion : _saveQuestion
	}

})