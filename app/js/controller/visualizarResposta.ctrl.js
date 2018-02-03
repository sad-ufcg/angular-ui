'use strict';
(function () {
    const app = angular.module("sadApp");

    app.controller("VisualizarRespostaController", function VisualizarRespostaController($scope, questionariosAplicados, questionarioByID) {

        var self = this;
        self.questionariosAplicados = questionariosAplicados.data || [];
        self.disciplinas = get_disciplinas();
        self.questionarioByID = questionarioByID.data || [];

        self.respostas = get_respostas();

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
                }
            }
        };

      console.log(self.questionariosAplicados)

        function formata_dados(lista) {
            var frequencia = {}
            for (var i = 0; i < lista.length; i++) {
                frequencia[lista[i]] = frequencia[lista[i]]? frequencia[lista[i]]+1 : 1;
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

                  resposta['dados_grafico'] = formata_dados(resposta['respostas']);
                }
                respostas.push(resposta);
            }

            return respostas;
        }

        console.log(questionariosAplicados);

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
