'use strict';
(function () {
    var app = angular.module('sadApp');

    app.controller("CriarQuestionarioController",
                   function CriarQuestionarioController($http,
                                                        $scope,
                                                        ToastService,
                                                        QuestionarioService) {

    var self = this;

    self.getQuestionarioVazio = function() {
      return { nome: '',
               descricao: '',
               questoes: [
                 { enunciado: '',
                   tipoQuestao: 'TEXTO'
                 }
               ]
             };
    };

    self.questionario = self.getQuestionarioVazio();

    self.limparFormulario = function() {
      self.questionario = self.getQuestionarioVazio();
      $scope.criarQuestionarioForm.$setPristine();
      $scope.criarQuestionarioForm.$setUntouched();
      $scope.$apply();
    }

    self.criarQuestionario = function() {

      if(!$scope.criarQuestionarioForm.$valid) {
        ToastService.criaToastComTema("Preencha todos os campos obrigatórios!", "orange-toast");
      }

      else {
        QuestionarioService.criarQuestionario(self.questionario).then(function(data) {
           ToastService.criaToastComTema("Questionário criado com sucesso!", "blue-toast");
           self.limparFormulario();
         }).catch(function (err) {
           if(err.status == -1) {
             ToastService.criaToastComTema("Erro, Resposta tem estado -1.", "orange-toast");
           }
        });
      }
    };

    self.selectedIndex = 0;
    self.ultimaQuestao = 1;

    self.adicionarQuestao = function () {
      self.questionario.questoes.push({ enunciado: '', tipoQuestao: 'TEXTO'});
    };

    self.removerQuestao = function (tab) {
      var index = self.questionario.questoes.indexOf(tab);
      self.questionario.questoes.splice(index, 1);
    };

  });
})();
