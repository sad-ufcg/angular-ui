/*Author: Arthur Sampaio*/

angular.module("myApp").factory("questionAPI", function ($http, config, $q, idGenerator, mocAPI) {


	var _getQuestions = function () {

		return $http.get(config.baseUrl + "/question")
	};

	

	var _getTeachers = function () {

		return mocAPI.getCourses()
	};

	var _getAnswers = function () {

		return mocAPI.getAnswers()
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
