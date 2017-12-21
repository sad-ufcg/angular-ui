'use strict';
(function () {
    var app = angular.module('sadApp');

    app.controller("AplicarQuestionarioController", function AplicarQuestionarioController( $state, QuestionarioService) {
        var aplicarQuestionarioCtrl = this;

        aplicarQuestionarioCtrl.achou_questionarios = false;

        aplicarQuestionarioCtrl.getQuestionarios = function() {
            QuestionarioService.getQuestionarios().then(
                function success(response){
                    aplicarQuestionarioCtrl.questionarios = response.data;
                    aplicarQuestionarioCtrl.achou_questionarios = true;
                    console.log(response.data);
                }, function error(response) {
                    console.log(response);
                }
            );
          
        };

        aplicarQuestionarioCtrl.goToDetail = (questionarioID) => {
            console.log(questionarioID);
            $state.go("sad-admin.questionario-detalhe", {id : questionarioID});
        };

    });
})();
