'use strict';
(function () {
    const app = angular.module("sadApp");

    app.controller("VisualizarRespostasController", function VisualizarRespostasController($state, $stateParams, questionarios) {

        var self = this;
        self.questionarios = questionarios || [];

        console.log(self.questionarios);

        self.irParaResposta = function(id) {
            $state.go("sad-admin.resposta", {idQuestionario : id});
        }
    });
})();
