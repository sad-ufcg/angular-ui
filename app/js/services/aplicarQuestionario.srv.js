'use strict';
(function() {
    const app = angular.module('sadApp');

    app.service('AplicarQuestionarioService', function(QuestionarioAplicado) {
        const self = this;

        self.aplicarQuestionario = function(disciplinas, questionario) {
            disciplinas.forEach(disciplina => {
                let questionarioAplicado = new QuestionarioAplicado(disciplina.id, questionario.id, disciplina.idProfessor);
                let promise = questionarioAplicado.salvar().then();
            });
        }
    });
})();