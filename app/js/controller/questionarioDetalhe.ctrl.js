'use strict';
(function () {
    var app = angular.module('sadApp');

    app.controller("QuestionarioDetalheController", function QuestionarioDetalheController($state, $stateParams, QuestionarioService, ToastService) {

        const NAO_IMPLEMENTADO = "Funcionalidade não implementada";

        var questDetalheCtrl = this;
        questDetalheCtrl.loadQuestionario = () => {
            QuestionarioService.getQuestionarioByID($stateParams.id).then(
                function success(response) {
                    questDetalheCtrl.questionario = response.data;
                    console.log(response.data);
                }, function error(response) {
                    console.log(response);
                }
            );
        };

        questDetalheCtrl.naoFoiAplicado = () => {
            return (questDetalheCtrl.questionario.questionariosAplicados != 0 ? false : true);
        }

        questDetalheCtrl.aplicar = () => {
            ToastService.criaToastComTema(NAO_IMPLEMENTADO, "orange-toast");

        }

        questDetalheCtrl.editar = () => {
            ToastService.criaToastComTema(NAO_IMPLEMENTADO, "orange-toast");
        }
    });
})();