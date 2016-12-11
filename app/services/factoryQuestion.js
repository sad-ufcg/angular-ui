angular.module("myApp").factory("questionAPI", function ($http) {

	var _getQuestions = function () {

		return $http.get("http://localhost:3412/questions");
	};

	var _getTeachers = function () {

		return $http.get("http://localhost:3412/teachers");
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