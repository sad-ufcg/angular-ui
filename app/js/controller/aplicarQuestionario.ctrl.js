'use strict';
(function () {
    var app = angular.module('sadApp');

    app.controller("AplicarQuestionarioController", function AplicarQuestionarioController($http) {
        var aplicarQuestionarioCtrl = this;

        aplicarQuestionarioCtrl.achou_questionarios = false;

        aplicarQuestionarioCtrl.getQuestionarios = function() {
            $http.get('http://localhost:8080/questionarios').then(
                function success(response) {
                    aplicarQuestionarioCtrl.questionarios = response.data;
                    aplicarQuestionarioCtrl.achou_questionarios = true;
                }, function error(response) {
                    console.log("erro");
                }
            );
        };

    });
})();
