'use strict';
(function () {
    var app = angular.module('sadApp');

    app.service("QuestionarioService", function ($http, baseUrl, $q) {

        var questionarioService = this;

        const uri = baseUrl + "/questionarios";

        /**
         * Criar uma novo Questionário no servidor.
         *
         * @param {*} disciplina Questionario a ser criado.
         */
        questionarioService.criarQuestionario = function (questionario) {
            let deffered = $q.defer();
            $http.post(uri, questionario).then(function success(response) {
                deffered.resolve(response);
            }, function error(response) {
                deffered.reject(response);
            });

            return deffered.promise;
        };

        questionarioService.getQuestionarios = function () {
            let deffered = $q.defer();
            $http.get(uri).then(
                function success(response) {
                    deffered.resolve(response);
                }, function error(response) {
                   deffered.reject(response);
                }
            );
            return deffered.promise;
        };

        questionarioService.getQuestionarioByID = (id) => {
            let deffered = $q.defer(); 
            $http.get(`${uri}/${id}`).then(
                function success(response){
                    deffered.resolve(response);
                }, function error(response){
                    deffered.reject(response);
                }
            );
            return deffered.promise;
        };

    });
})();
