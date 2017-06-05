angular.module("myApp").factory("answerAPI", function ($http, config) {


	var _getQuiz = function(id, name) {
		return $http.get(config.baseUrl + "/question").then(
				function(response){
					return response.data;
				});
	}
	
		let _submitAnswers = function(token, text, radio){
		let answers = [];
		for (var v in text) {
			answers.push({'question': {'id': v}, 'answerText': text[v]});
		}
		for (var v in radio) {
			answers.push({'question': {'id': v}, 'choiceNumber': radio[v]});
		}
		let answer = {'token': {'id': token}, 'answers': answers, 'invalid': false};
		return $http.post(config.baseUrl + "/questionnaireanswers", JSON.stringify(answer),
						   {headers: {'Accept': "text/plain"}});
	}

	let _submitNoAnswers = function(token){
		let answer = {'token': {'id': token}, 'answers': [], 'invalid': true};
		return $http.post(config.baseUrl + "/questionnaireanswers", JSON.stringify(answer),
						   {headers: {'Accept': "text/plain"}});
	}
	
	return {
		getQuiz : _getQuiz, 
		submitAnswers: _submitAnswers,
		submitNoAnswers: _submitNoAnswers
	}
})