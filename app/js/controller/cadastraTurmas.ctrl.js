'use strict';
(function () {
    var app = angular.module('sadApp');

    app.controller("CadastraTurmasController", function CadastraTurmasController(ToastService, $http, UploadCsvService) {

        var cadastraTurmasCtrl = this;

        cadastraTurmasCtrl.onSubmitClick = function () {
            var files = [];
            for(let i = 0; i < cadastraTurmasCtrl.files.length; i++) {
                if(!cadastraTurmasCtrl.files[i].isRemote) {
                    files.push(cadastraTurmasCtrl.files[i].lfFile);
                }
            }

            UploadCsvService.uploadArquivoCsv(files).then(
                function success(response) {
                    ToastService.criaToastSimples(`Arquivos foram salvos corretamente.`);
                }, function error(response) {
                    ToastService.criaToastSimples(`Ocorreu um erro em um dos CSVs.`);
                });
            };

        });
})();
