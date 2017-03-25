angular.module("myApp").factory("answerAPI", function ($http, config, mocAPI) {


	var _getQuiz = function() {

		var quiz = {id:'1', questions: _organizeQuestion()};

		return quiz;

	}

	var _getQuestions = function () {

		_organizeCourses()

		return _organizeQuestion()

	};

	var _organizeQuestion = function(){
		/*Add the default answer's options*/

		var questions = [];
		$http.get(config.baseUrl + "/question").then(

			function(response){
				response.data.forEach(function(quest){
					quest.options = _getAnswers()
					questions.push(quest);
				})
			},

			function(error){
				console.log("Error " + error.status)
			}
		);

		return questions;

	}

	var _organizeCourses = function() {

		var questions = _organizeQuestion()
		var teachers = [{id: 123,name:" Matheus Gaudêncio", courseName:"Administração de Sistemas"},
			{id: 999, name:" Não sei quem é", courseName:"Banco de Dados I"},
			{id: 223, name:" Nazareno", courseName:"Sistema de Informação I"},
			{id: 21, name:" Carlos Wilson", courseName:"Gerência da Informação"}];

		teachers.forEach(function(teacher){
			teacher.questions = questions;
		})


	}

	var _getAnswers = function () {

		return mocAPI.getAnswers()

	}

	var _getTeachers = function() {

		return mocAPI.getTeachers()

	}
	return {

		getQuiz : _getQuiz, 
		getQuestions : _getQuestions,
		getAnswers : _getAnswers,
		getTeachers : _getTeachers

	}



})