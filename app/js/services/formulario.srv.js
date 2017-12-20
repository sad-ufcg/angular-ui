'use strict';
(function () {
    var app = angular.module('sadApp');

    app.service("FormularioService", function ($http, baseUrl, $q,
                                               QuestionarioService,
                                               QuestionarioAplicadoService) {

        var service = this;

        const URI_TOKEN = '/token';

        service.buscaQuestionario = function(token) {
            var deffered = $q.defer();
            $http.get(baseUrl + URI_TOKEN,
                      { params: { tokenID: token } }).then(
                function success(response) {
                    var idQuestionarioAplicado = response.data.idQuestionarioAplicado;
                    QuestionarioAplicadoService.getQuestionarioAplicadoByID(idQuestionarioAplicado).then(function(dataQuestionarioAplicado) {
                      var idQuestionario = dataQuestionarioAplicado.data.idQuestionario;
                      QuestionarioService.getQuestionarioByID(idQuestionario).then(function(dataQuestionario) {
                        deffered.resolve(dataQuestionario);
                      });
                    });
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
