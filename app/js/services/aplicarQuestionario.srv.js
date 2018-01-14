'use strict';
(function() {
    const app = angular.module('sadApp');

    app.service('AplicarQuestionarioService', function(QuestionarioAplicado, $q) {
        const self = this;

        self.aplicarQuestionario = function(disciplinas, questionario) {
            let promises = [];
            disciplinas.forEach(disciplina => {
                let questionarioAplicado = new QuestionarioAplicado(disciplina.id, questionario.id, disciplina.idProfessor);
                promises.push(questionarioAplicado.salvar());
            });

            return $q.all(promises);
        };
    });
})();