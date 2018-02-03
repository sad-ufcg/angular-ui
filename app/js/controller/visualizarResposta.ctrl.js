'use strict';
(function () {
    const app = angular.module("sadApp");

    app.controller("VisualizarRespostaController", function VisualizarRespostaController(questionariosAplicados, questionarioByID, semestre) {

        var self = this;
        self.questionariosAplicados = questionariosAplicados.data || [];

        self.disciplinas = get_disciplinas();
        self.disciplinasSelecionadas = get_disciplinas();

        self.questionarioByID = questionarioByID.data || [];
        self.respostas = get_respostas();

        console.log(self.questionariosAplicados);

        function get_respostas() {
            let respostas = [];
            for (var i = 0; i < self.questionarioByID.questoes.length; i++) {
                let resposta = { id: self.questionarioByID.questoes[i].id,
                                 enunciado: self.questionarioByID.questoes[i].enunciado,
                                 tipo: self.questionarioByID.questoes[i].tipoQuestao,
                                 respostas: [],
                                 comentarios: []
                               };
                for (var j = 0; j < self.questionariosAplicados.length; j++) {
                    for (var k = 0; k < self.questionariosAplicados[j].respostas.length; k++) {
                        if (self.questionarioByID.questoes[i].id == self.questionariosAplicados[j].respostas[k].idQuestao) {
                            if(self.questionariosAplicados[j].respostas[k].type == "ESCOLHA_SIMPLES") {
                              resposta['respostas'].push(self.questionariosAplicados[j].respostas[k].escolhaSimples);
                            }
                            resposta['comentarios'].push(self.questionariosAplicados[j].respostas[k].comentario);
                        }
                    }
                }

                if (self.questionarioByID.questoes[i].tipoQuestao == 'ESCOLHA_SIMPLES') {
                  resposta['respostas'].sort( function(a, b) {return a - b;} );
                  var half = Math.floor(resposta['respostas'].length/2);
                  if(resposta['respostas'].length % 2)
                      resposta['mediana'] = reposta['respostas'][half];
                  else
                      resposta['mediana'] = (resposta['respostas'][half-1] + resposta['respostas'][half]) / 2.0;
                }
                respostas.push(resposta);
            }

            return respostas;
        }

        console.log(get_respostas());
        console.log(questionariosAplicados);

        function get_disciplinas() {
          let disciplinas = [];
          for(let i = 0; i < self.questionariosAplicados.length; i++) {
            disciplinas.push({turma: self.questionariosAplicados[i].disciplina +
                                     ' - Turma ' +
                                     self.questionariosAplicados[i].turma,
                              id: self.questionariosAplicados[i].disciplinaId});
          }

          return disciplinas;
        }

    });
})();
