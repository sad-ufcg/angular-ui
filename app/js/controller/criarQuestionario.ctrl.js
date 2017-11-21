'use strict';
(function () {
    var app = angular.module('sadApp');

    app.controller("CriarQuestionarioController", function CriarQuestionarioController($http) {
        var criarQuestionarioCtrl = this;

        criarQuestionarioCtrl.achou_questionarios = false;

        criarQuestionarioCtrl.getQuestionarios = function() {
            $http.get('http://localhost:8080/questionarios').then(
                function success(response) {
                    criarQuestionarioCtrl.questionarios = response.data;
                    criarQuestionarioCtrl.achou_questionarios = true;
                }, function error(response) {
                    console.log("erro");
                }
            );
        };

    });
})();
