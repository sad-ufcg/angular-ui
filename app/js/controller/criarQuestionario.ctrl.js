'use strict';
(function () {
    var app = angular.module('sadApp');

    app.controller("CriarQuestionarioController", function CriarQuestionarioController($http) {

        var criarQuestionarioCtrl = this;

        criarQuestionarioCtrl.criarQuestionario = function() {

          var questionario = { nome: criarQuestionarioCtrl.nome,
                               descricao: criarQuestionarioCtrl.descricao,
                               questoes: []
                             }

          for(var i = 0; i < criarQuestionarioCtrl.tabs.length; i++) {
             questionario.questoes.push({ enunciado: criarQuestionarioCtrl.tabs[i].questao.enunciado,
                                          tipoQuestao: criarQuestionarioCtrl.tabs[i].questao.tipoQuestao });
          }

          console.log(questionario);
          $http.post('http://localhost:8080/questionarios', questionario).then(
              function success(response) {
                  criarQuestionarioCtrl.questionarios = response.data;
                  criarQuestionarioCtrl.achou_questionarios = true;
              }, function error(response) {
                  console.log("erro");
              }
          );
        };

    criarQuestionarioCtrl.tabs = [
      { titulo: 'Questão 1', questao: { enunciado: '', tipoQuestao: 'TEXTO'}}
    ];

    criarQuestionarioCtrl.selectedIndex = 0;
    criarQuestionarioCtrl.ultimaQuestao = 1;

    criarQuestionarioCtrl.addTab = function () {
      criarQuestionarioCtrl.ultimaQuestao += 1;
      var titulo = 'Questão ' + criarQuestionarioCtrl.ultimaQuestao;
      criarQuestionarioCtrl.tabs.push({ titulo: titulo, questao: { enunciado: '', tipoQuestao: 'TEXTO'} });
    };

    criarQuestionarioCtrl.removeTab = function (tab) {
      var index = criarQuestionarioCtrl.tabs.indexOf(tab);
      criarQuestionarioCtrl.tabs.splice(index, 1);

      for(var i = 0; i < criarQuestionarioCtrl.tabs.length; i++) {
        criarQuestionarioCtrl.tabs[i].titulo = "Questão " + (i + 1);
      }

      if (criarQuestionarioCtrl.ultimaQuestao > 0) {
        criarQuestionarioCtrl.ultimaQuestao -= 1;
      }
    };

    });
})();
