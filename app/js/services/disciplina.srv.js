'use strict';
(function () {
    var app = angular.module('sadApp');

    app.service("DisciplinaService", function ($http, baseUrl, $q) {
        var disciplinaService = this;
    
        const uri = baseUrl + "/disciplinas";

        /**
         * Cadastra uma nova Disciplina no servidor.
         * 
         * @param {*} disciplina Disciplina a ser cadastrada
         */
        disciplinaService.cadastrarDisciplina = function (disciplina) {
            let deffered = $q.defer();
            $http.post(uri, disciplina).then(function success(response) {
                deffered.resolve(response);
            }, function error(response) {
                deffered.reject(response);
            });

            return deffered.promise;
        };
    });
})();