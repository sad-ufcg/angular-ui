'use strict';
(function () {
    var app = angular.module('sadApp');

    app.service("AnswerService", function ($http, baseUrl, $q) {

        var service = this;

        const HEADERS = { headers: { 'Accept': "text/plain" } };
        const URI_QUESTION = "/question";
        const URI_QUESTIONNARIE = "/questionnaireanswers";


        service.getQuiz = function getQuiz() {
            var deffered = $q.defer();
            $http.get(baseUrl + URI_QUESTION).then(
                function success(response) {
                    deffered.resolve(response);
                }, function error(response) {
                    deffered.reject(response);
                }
            );
            return deffered.promise;
        };

        service._organizeQuiz = function _organizeQuiz(text, radio) {

  
            let answers = [];
            for (var v in text) {
                answers.push({ 'question': { 'id': v }, 'answerText': text[v] });
            }
            for (var v in radio) {
                answers.push({ 'question': { 'id': v }, 'choiceNumber': radio[v] });
            }

            return answers

        }

        service.submitAnswers = function submitAnswers(token, text, radio) {

            var answers = service._organizeQuiz(text, radio);

            var questionnaire = {
                'token': { 'id': token },
                'answers': answers,
                'invalid': false
            }

            var deffered = $q.defer();
            

            $http.post(baseUrl + URI_QUESTIONNARIE, JSON.stringify(questionnaire),
                HEADERS).then(function success(response) {
                    deffered.resolve(response);
                }, function error(response) {
                    deffered.reject(response);
                });


            return deffered.promise;

        }

        service.submitNoAnswers = function submitNoAnswers(token) {
            var answer = { 'token': { 'id': token }, 'answers': [], 'invalid': true };
            var deffered = $q.defer();
            $http.post(baseUrl + URI_QUESTIONNARIE, JSON.stringify(answer), HEADERS).then(
                function success(response) {
                    deffered.resolve(response);
                }, function error(response) {
                    deffered.reject(response);
                }
            );
            return deffered.promise;
        }

    })

})();