'use strict';
(function () {
    var app = angular.module('sadApp');

    app.controller("NewFormController", function FormController(questionario, ToastService, $scope, $state, $mdDialog, $mdIcon) {

        var newformCtrl = this;
        newformCtrl.questionario = questionario.data.questoes;
        newformCtrl.token = $state.params.token;

        newformCtrl.inicializarComentarios = function() {
          var comentarios = []
          for(var i = 0; i < newformCtrl.questionario.length; i++) {
            comentarios.push('');
          }
          return comentarios;
        };

        newformCtrl.inicializarQuestaoRadio = function() {
          var questaoRadio = []
          for(var i = 0; i < newformCtrl.questionario.length; i++) {
           questaoRadio .push(null);
          }
          return questaoRadio ;
        };

        newformCtrl.questaoRadio = newformCtrl.inicializarQuestaoRadio();
        newformCtrl.comentarios = newformCtrl.inicializarComentarios();

        //newformCtrl.numeroDeQuestoesRespondidas = 0;
        newformCtrl.numeroDeQuestoes = newformCtrl.questionario.length;

        newformCtrl.home = true;

        newformCtrl.enviarResposta = function () {
            var confirm = $mdDialog.confirm()
                .title('Obrigado! Questionário Concluído.')
                .textContent('Você respondeu todas as questões do formulário. Por favor, confirme o envio.')
                .ariaLabel('Lucky day')
                .ok('Enviar Formulário')
                .cancel('Cancelar Formulário');

            $mdDialog.show(confirm).then(function () {
                // TODO: enviar respostas e deletar o token
            }, function () {
                //TODO:
            });
        };

        newformCtrl.marcarTodasQuestoes = function (value) {
            for (var i = 0; i < newformCtrl.numeroDeQuestoes; i++) {
                if(newformCtrl.questionario[i].tipoQuestao === "ESCOLHA_SIMPLES")
                  newformCtrl.questaoRadio[i] = value;
            }
        };

        newformCtrl.numeroDeQuestoesRespondidas = function () {
            var cont = 0;
            for (var i = 0; i < newformCtrl.numeroDeQuestoes; i++) {
                if(newformCtrl.questionario[i].tipoQuestao == "ESCOLHA_SIMPLES")
                  if(newformCtrl.questaoRadio[i]) cont += 1;
                if(newformCtrl.questionario[i].tipoQuestao == "TEXTO")
                  if(newformCtrl.comentarios[i].length > 0) cont += 1;
            }
            return cont;
        };

        newformCtrl.calcPorcentagem = function () {
            return newformCtrl.numeroDeQuestoesRespondidas() / (newformCtrl.numeroDeQuestoes) * 100;
        };

        newformCtrl.toggle = function (q, id) {
            q[id] = !q[id];
        };

        newformCtrl.iniciar = function () {
            newformCtrl.home = false;
        };

    });
})();
