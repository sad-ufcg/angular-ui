angular.module("myApp").factory("questionAPI", function ($http, config) {

	var _getQuestions = function () {

		return $http.get(config.baseUrl + "/questions");
	};

	var _getTeachers = function () {

		return $http.get(config.baseUrl + "/teachers");
	};

	var _getAnswers = function () {

		return ["Resposta 1", "Resposta 2", "Resposta 3", "Resposta 4", "Resposta 5"];
	};

	return {
		getQuestions : _getQuestions,
		getTeachers: _getTeachers,
		getAnswers : _getAnswers
	}

})