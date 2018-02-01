'use strict';
(function () {
    const app = angular.module("sadApp");

    app.controller("VisualizarRespostaController", function VisualizarRespostaController(questionariosAplicados) {

        var self = this;
        self.questionariosAplicados = questionariosAplicados.data || [];
        self.disciplinas = get_disciplinas();

        function get_disciplinas() {
          let disciplinas = [];
          for(let i = 0; i < self.questionariosAplicados.length; i++) {
            disciplinas.push(self.questionariosAplicados[i].disciplina +
                             ' - Turma - ' +
                             self.questionariosAplicados[i].turma);
          }

          return disciplinas;
        }

        function querySearch (criteria) {
          return criteria ? self.questionariosAplicados.filter(createFilterFor(criteria)) : [];
        }

    });
})();
