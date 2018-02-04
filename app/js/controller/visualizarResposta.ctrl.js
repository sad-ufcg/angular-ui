'use strict';
(function () {
    const app = angular.module("sadApp");

    app.controller("VisualizarRespostaController", function VisualizarRespostaController($scope, questionariosAplicados, questionarioByID, semestre) {

        var self = this;
        self.questionariosAplicados = questionariosAplicados.data || [];
        console.log(self.questionariosAplicados);
        self.disciplinas = get_disciplinas();
        self.turmaSelecionada = -1;
        self.questionarioByID = questionarioByID.data || [];
        self.respostas = get_respostas();
        console.log(self.respostas);

        $scope.options = {
            chart: {
                type: 'discreteBarChart',
                height: 450,
                margin : {
                    top: 20,
                    right: 20,
                    bottom: 50,
                    left: 55
                },
                x: function(d){return d.label;},
                y: function(d){return d.value;},
                showValues: true,
                color: (d) => '#428ff4',
                valueFormat: function(d){
                    return d;
                },
                duration: 500,
                xAxis: {
                    axisLabel: 'Escolha'
                },
                yAxis: {
                    axisLabel: 'Frequência',
                    axisLabelDistance: -10
                },
                tooltip: {
                    enabled: false
                }
            }
        };

        function formata_dados(respostas) {
            var frequencia = {};
            for (var i = 0; i < respostas.length; i++) {
                if(frequencia[respostas[i].opcao]) {
                  frequencia[respostas[i].opcao] += 1;
                } else {
                  frequencia[respostas[i].opcao] = 1;
                }
            }

            var dados_grafico = [{
                key: "Cumulative Return",
                values: []
            }];
            for (var key in frequencia) {
                if (frequencia.hasOwnProperty(key)) {
                    var dado = {
                        'label': key,
                        'value': frequencia[key]
                    };
                    dados_grafico[0].values.push(dado);
                }
            }

            return dados_grafico;
        }

        function get_respostas() {
            let respostas = [];
            for (var i = 0; i < self.questionarioByID.questoes.length; i++) {
                let resposta = { id: self.questionarioByID.questoes[i].id,
                                 enunciado: self.questionarioByID.questoes[i].enunciado,
                                 tipo: self.questionarioByID.questoes[i].tipoQuestao,
                                 respostas: []
                               };
                for (var j = 0; j < self.questionariosAplicados.length; j++) {
                    for (var k = 0; k < self.questionariosAplicados[j].respostas.length; k++) {
                        if (self.questionarioByID.questoes[i].id == self.questionariosAplicados[j].respostas[k].idQuestao) {
                            let comentario = self.questionariosAplicados[j].respostas[k].comentario;
                            let idDisciplina = self.questionariosAplicados[j].idDisciplina;
                            if(self.questionariosAplicados[j].respostas[k].type == "ESCOLHA_SIMPLES") {
                              let opcao = self.questionariosAplicados[j].respostas[k].escolhaSimples;
                              resposta.respostas.push({
                                comentario: comentario,
                                idDisciplina: idDisciplina,
                                opcao: opcao
                              });
                            } else {
                              resposta.respostas.push({
                                comentario: comentario,
                                idDisciplina: idDisciplina
                              });
                            }
                        }
                    }
                }


                if (self.questionarioByID.questoes[i].tipoQuestao == 'ESCOLHA_SIMPLES') {
                  resposta['dados_grafico'] = formata_dados(resposta['respostas']);
                }/*
                  resposta['respostas'].sort( function(a, b) {return a.opcao - b.opcao;} );
                  var half = Math.floor(resposta['respostas'].length/2);
                  if(resposta['respostas'].length % 2)
                      resposta['mediana'] = reposta['respostas']['opcao'][half];
                  else
                      resposta['mediana'] = (resposta['respostas']['opcao'][half-1] + resposta['respostas']['opcao'][half]) / 2.0;

              }*/
                respostas.push(resposta);
            }

            return respostas;
        }

        function get_disciplinas() {
          let disciplinas = [{turma: "Todas as turmas", id: -1}];

          for(let i = 0; i < self.questionariosAplicados.length; i++) {
            disciplinas.push({turma: self.questionariosAplicados[i].disciplina +
                                     ' - Turma ' +
                                     self.questionariosAplicados[i].turma,
                              id: self.questionariosAplicados[i].idDisciplina});
          }

          return disciplinas;
        }

    });
})();
