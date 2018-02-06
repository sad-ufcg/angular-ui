'use strict';
(function () {
    const app = angular.module("sadApp");

    app.controller("VisualizarRespostaController", function VisualizarRespostaController($scope, questionariosAplicados, questionarioByID) {

        var self = this;
        self.questionariosAplicados = questionariosAplicados.data || [];
        self.questionarioByID = questionarioByID.data || [];
        self.tipoQuestaoWrapper = {
                    'ABERTA': 'Aberta',
                    'ESCOLHA_SIMPLES': 'Escolha Simples'
        };
        self.turmaSelecionada = -1;
        self.turmas = getRespostasPorTurma();
        self.isRespostaAberta = inicializaEstadoRespostas();

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

        self.abrirResposta = function(index) {
            self.isRespostaAberta[index] = !self.isRespostaAberta[index];
        }

        function inicializaEstadoRespostas() {
            let mostraRespostas = [];

            for (var i = 0; i < self.questionarioByID.questoes.length; i++)
                mostraRespostas.push(false);

            return mostraRespostas;
        }

        function formataDados(respostas) {
            var frequencia = {};
            for (var i = 0; i < respostas.length; i++) {
                if(frequencia[respostas[i]]) {
                  frequencia[respostas[i]] += 1;
                } else {
                  frequencia[respostas[i]] = 1;
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

        function getRespostasPorTurma() {
            let turmas = [];

            // Passa por todos os questionarios aplicados
            // cada questionarioAplicado está relacionado com uma disciplina.
            // Obtemos as informações de cada disciplina.
            for (var index = 0; index < self.questionariosAplicados.length; index++) {
                let turma = { disciplina: self.questionariosAplicados[index].disciplina,
                          semestre: self.questionariosAplicados[index].semestre,
                          turma: self.questionariosAplicados[index].turma,
                          questoes: {}
                         }

                 // inicializamos as informações de cada questão
                 for (var i = 0; i < self.questionarioByID.questoes.length; i++) {
                     let id = self.questionarioByID.questoes[i].id;
                     let questao = { enunciado: self.questionarioByID.questoes[i].enunciado,
                                     tipo: self.questionarioByID.questoes[i].tipoQuestao,
                                     respostas: [],
                                     comentarios: []
                                    };
                    turma["questoes"][id] = questao;
                 }

                 // adicionamos as respostas e comentários de cada questão
                 for (var k = 0; k < self.questionariosAplicados[index].respostas.length; k++) {
                     let id = self.questionariosAplicados[index].respostas[k].idQuestao;

                     let comentario = self.questionariosAplicados[index].respostas[k].comentario;
                     if(comentario != null && comentario != undefined && comentario != "") {
                        turma["questoes"][id]["comentarios"].push(comentario);
                     }

                     if(self.questionariosAplicados[index].respostas[k].type == "ESCOLHA_SIMPLES") {
                         let escolha = self.questionariosAplicados[index].respostas[k].escolhaSimples;
                         turma["questoes"][id]["respostas"].push(escolha);
                     }
                 }

                 // adicionamos os dados necessários para plotar os gráficos
                 // ne calculamos a mediana no caso de ESCOLHA_SIMPLES
                 for (var i = 0; i < self.questionarioByID.questoes.length; i++) {
                    let id = self.questionarioByID.questoes[i].id;
                    let tipoQuestao = self.questionarioByID.questoes[i].tipoQuestao;
                    if (tipoQuestao == 'ESCOLHA_SIMPLES') {
                        turma["questoes"][id]["respostas"].sort( function(a, b) {return a - b;} );
                        var half = Math.floor(turma["questoes"][id]["respostas"].length/2);
                        if(turma["questoes"][id]["respostas"].length % 2)
                            turma["questoes"][id]['mediana'] = turma["questoes"][id]["respostas"][half];
                        else
                            turma["questoes"][id]['mediana'] = (turma["questoes"][id]["respostas"][half-1] + turma["questoes"][id]["respostas"][half]) / 2.0;

                       turma["questoes"][id]['dados_grafico'] = formataDados(turma["questoes"][id]["respostas"]);
                    }

                    turma["questoes"][id].tipo = self.tipoQuestaoWrapper[turma["questoes"][id].tipo];
                }

                turmas.push(turma);
            }

            return turmas;
        }

    });
})();
