'use strict';
(function () {
    const app = angular.module('sadApp');

    app.controller("AplicarQuestionarioController", function AplicarQuestionarioController($http, disciplinas, questionarios, AplicarQuestionarioService) {

        let self = this;

        self.disciplinas = disciplinas || [];
        self.questionarios = questionarios || [];
        self.questionarioSelecionado;

        self.aplicarQuestionario = function() {
            const turmasSelecionadas = self.disciplinas.filter(questionario => questionario.aplicar == true);
            AplicarQuestionarioService.aplicarQuestionario(turmasSelecionadas, self.questionarioSelecionado);
        };
    });
})();
