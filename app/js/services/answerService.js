angular.module("myApp").factory("answerAPI", function ($http, config, mocAPI) {


	var _getQuiz = function(id, name) {

		return {
			id: id, 
			courseName: name,
			questions: _organizeQuestion()
		}

	}

	var _getQuestions = function () {


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
			});

		return questions;

	}


	var _getAnswers = function () {

		return mocAPI.getAnswers()

	}

	var _getCourses = function() {

		return mocAPI.getCourses()

	}

	var _submitAnswers = function(id, selected){

		var obj_answer = {id: id, questions: selected}
		console.log(obj_answer)
		//waiting antunes config the backend
		//return $http.post(config.baseUrl + "/question", JSON.stringify(obj_answer));

	}
	return {

		getQuiz : _getQuiz, 
		getQuestions : _getQuestions,
		getAnswers : _getAnswers,
		getCourses : _getCourses, 
		submitAnswers: _submitAnswers


	}



})