angular.module("myApp").factory("answerAPI", function ($http, config, mocAPI) {


	var _getQuiz = function(id, name) {


		return new Quiz(id, _organizeQuestion());

	}

	var _getQuestions = function () {


		return _organizeQuestion()

	};

	var _organizeQuestion = function(){
		/*Add the default answer's options*/

		let questions = [];
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


	let _getAnswers = function () {

		return mocAPI.getAnswers()

	}

	let _getCourses = function() {

		return mocAPI.getCourses()

	}

	let _submitAnswers = function(quiz){

		let selected_ids = [];
		let questions = quiz.questions
		selected_ids = questions.filter((question) => question.selected_id);
		let answerObj = new Quiz(quiz.id, selected_ids);
		console.log(answerObj);

		//let obj_answer = {id: id, questions: selected_ids}
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