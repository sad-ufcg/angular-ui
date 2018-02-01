'use strict';
(function () {
    const app = angular.module("sadApp");

    app.controller("VisualizarRespostaController", function VisualizarRespostaController(questionariosAplicados, questionarioByID) {

        var self = this;
        self.questionariosAplicados = questionariosAplicados.data || [];
        self.disciplinas = get_disciplinas();
        self.questionarioByID = questionarioByID.data || [];

        self.respostas = get_respostas();

        console.log(self.questionariosAplicados)

        function get_respostas() {
            let respostas = [];

            for (var i = 0; i < self.questionarioByID.questoes.length; i++) {
                for (var j = 0; j < self.questionariosAplicados.length; j++) {
                    for (var k = 0; k < self.questionariosAplicados[j].respostas.length; k++) {
                        if (self.questionarioByID.questoes[i].id == self.questionariosAplicados[j].respostas[k].idQuestao) {
                            let resposta = {
                                enunciado: self.questionarioByID.questoes[i].enunciado,
                                respostas: self.questionariosAplicados[j].respostas[k].type == "ABERTA"? self.questionariosAplicados[j].respostas[k].comentario : self.questionariosAplicados[j].respostas[k].escolhaSimples
                            }

                            respostas.push(resposta);
                        }
                    }
                }
            }

            return respostas;
        }

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
