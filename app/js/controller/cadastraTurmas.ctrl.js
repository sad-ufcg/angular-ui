'use strict';
(function () {
    var app = angular.module('sadApp');

    app.controller("CadastraTurmasController", function CadastraTurmasController() {

        var cadastraTurmasCtrl = this;


        cadastraTurmasCtrl.onSubmitClick = function () {
            //TODO: enviar arquivos
            console.log(cadastraTurmasCtrl.files);
        }



    });
})();