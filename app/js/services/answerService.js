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
		console.log(answerObj);
		
		/*
	    send('questionnaireanswers', {'token': {'id': t}, 
            'answers':
            [{'question': {'id': 1}, "answerText": "banana2", "choiceNumber": 1},
             {'question': {'id': 2}, "answerText": "banana3", "choiceNumber": 1},
             {'question': {'id': 4}, "answerText": "banana2", "choiceNumber": 1}]})
		*/
		let answers = [];
		console.log(text);
		console.log(radio);
		for (var v in text) {
			answers.push({'question': {'id': v}, 'answerText': text[v]});
		}
		for (var v in radio) {
			answers.push({'question': {'id': v}, 'choiceNumber': radio[v]});
		}
		let answer = {'token': {'id': token}, 'answers': answers};
		console.log(answer);
		return $http.post(config.baseUrl + "/questionnaireanswers", JSON.stringify(answer));
		// let obj_answer = {id: id, questions: selected_ids}
		// waiting antunes config the backend
		// return $http.post(config.baseUrl + "/question",
		// JSON.stringify(obj_answer));
	}

	return {

		getQuiz : _getQuiz, 
		submitAnswers: _submitAnswers


	}



})