'use strict';
(function () {
    var app = angular.module('sadApp');

    app.controller("CadastraTurmasController", function CadastraTurmasController() {

        var cadastraTurmasCtrl = this;

        //  cadastraTurmasCtrl.$watch('files.length',function(newVal,oldVal){
        //     console.log(cadastraTurmasCtrl.files);
        // });

        cadastraTurmasCtrl.onSubmitClick = function () {
            console.log(cadastraTurmasCtrl.files);
        }



    });
})();