'use strict';
(function() {
    var app = angular.module('sadApp');

    app.controller('DialogRespostaRapidaController', function FormController($mdDialog, DialogService) {

        let dialogRespostaCtrl = this;

        dialogRespostaCtrl.esconder = function() {
            $mdDialog.hide();
        };

        dialogRespostaCtrl.cancelar = function() {
            $mdDialog.cancel();
        };

        dialogRespostaCtrl.responder = function(resposta) {
            $mdDialog.hide(resposta);
        };
    });

})();
