'use strict';
(function () {
    const app = angular.module('sadApp');

    app.controller("AplicarQuestionarioController", function AplicarQuestionarioController($http, disciplinas, questionarios, AplicarQuestionarioService, ToastService) {

        const self = this;

        self.disciplinas = disciplinas || [];
        self.questionarios = questionarios || [];
        self.questionarioSelecionado;

        self.aplicarQuestionario = function() {
            const turmasSelecionadas = self.disciplinas.filter(questionario => questionario.aplicar == true);
            const promise = AplicarQuestionarioService.aplicarQuestionario(turmasSelecionadas, self.questionarioSelecionado);
            promise.then(data => ToastService.criaToastSimples("Questionário Aplicado com Sucesso!"));
        };
    });
})();
