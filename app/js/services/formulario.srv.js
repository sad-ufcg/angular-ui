'use strict';
(function () {
    var app = angular.module('sadApp');

    app.service("FormularioService", function ($http, baseUrl, $q,
                                               QuestionarioService,
                                               QuestionarioAplicadoService) {

        var service = this;

        const URI_TOKEN = baseUrl + '/token';
        const URI_RESPOSTAS = baseUrl + '/respostas';

        service.buscaQuestionario = function(token) {
            var deffered = $q.defer();
            $http.get(URI_TOKEN + '/questionario',
                      { params:
                        { tokenID: token }
                      }).then(
                function success(response) {
                    deffered.resolve(response);
                }, function error(response) {
                    deffered.reject(response);
                }
            );
            return deffered.promise;
        };

        service.buscaQuestionarioAplicado = function(token) {
            var deffered = $q.defer();
            $http.get(URI_TOKEN + '/questionarioAplicado',
                      { params:
                        { tokenID: token }
                      }).then(
                function success(response) {
                    deffered.resolve(response);
                }, function error(response) {
                    deffered.reject(response);
                }
            );
            return deffered.promise;
        };

        service.buscaDisciplina = function(token) {
            var deffered = $q.defer();
            $http.get(URI_TOKEN + '/disciplina',
                      { params:
                        { tokenID: token }
                      }).then(
                function success(response) {
                    deffered.resolve(response);
                }, function error(response) {
                    deffered.reject(response);
                }
            );
            return deffered.promise;
        };

        /**
         * Responder Questionário.
         *
         * @param {*} respostas lista de respostas
         */
        service.responderQuestionario = function (respostas, token) {
            let deffered = $q.defer();
            $http.post(`${URI_RESPOSTAS}/?token=${token}`, respostas).then(function success(response) {
                deffered.resolve(response);
            }, function error(response) {
                deffered.reject(response);
            });
            return deffered.promise;
        };
    })

})();
