'use strict';
(() => {
    var app = angular.module('sadApp');

    function QuestionFooterController() {
      var questionFooterCtrl = this;

      questionFooterCtrl.checarResposta = function () {
        var respostaValida = true;
        for (var i = 0; i < questionFooterCtrl.questionario.length; i++) {
            if(questionFooterCtrl.questionario[i].tipoQuestao === "ESCOLHA_SIMPLES")
              if(!questionFooterCtrl.questaoRadio[i]) {
                respostaValida = false;
              }
        }
        return respostaValida;
      };
    };

    app.component('sadQuestionCardFooter', {
        templateUrl: 'js/component/sad-question-card-footer/sad-question-card-footer.component.html',
        controller: QuestionFooterController,
        controllerAs: 'questionFooterCtrl',
        bindings: {
            questionario: '<',
            questaoRadio: '=',
            numeroDeQuestoes: '<',
            numeroDeQuestoesRespondidas: '<',
            enviarResposta: '&',
            porcentagem: '<'
        }
    });

})();
