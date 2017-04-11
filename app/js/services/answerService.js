angular.module("myApp").factory("answerAPI", function ($http, config, mocAPI) {


	var _getQuiz = function(id, name) {
		return $http.get(config.baseUrl + "/question").then(
				function(response){
					return response.data;
				});
	}
	
	let _submitAnswers = function(token, quiz, text, radio){
		let selected_ids = [];
		let questions = quiz;
		selected_ids = questions.filter((question) => question.selected_id);
		let answerObj = new Quiz(quiz.id, selected_ids);
		
		let answers = [];
		for (var v in text) {
			answers.push({'question': {'id': v}, 'answerText': text[v]});
		}
		for (var v in radio) {
			answers.push({'question': {'id': v}, 'choiceNumber': radio[v]});
		}
		let answer = {'token': {'id': token}, 'answers': answers};
		return $http.post(config.baseUrl + "/questionnaireanswers", JSON.stringify(answer),
						   {headers: {'Accept': "text/plain"}});
	}

	return {
		getQuiz : _getQuiz, 
		submitAnswers: _submitAnswers
	}
})