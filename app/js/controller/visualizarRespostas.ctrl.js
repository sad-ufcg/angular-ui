'use strict';
(function () {
    const app = angular.module("sadApp");

    app.controller("VisualizarRespostasController", function VisualizarRespostasController($state, $stateParams, questionarios) {

        var self = this;
        self.questionarios = questionarios || [];

        self.irParaResposta = function(id) {
            $state.go("sad-resposta.visualizar-resposta", {idQuestionario : id});
        }
    });
})();
