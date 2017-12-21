'use strict';
(function () {
    var app = angular.module('sadApp');

    app.controller("CadastraTurmasController", function CadastraTurmasController(ToastService, $http, UploadCsvService) {

        var cadastraTurmasCtrl = this;

        cadastraTurmasCtrl.onSubmitClick = function () {
            cadastraTurmasCtrl.files.map((file) => {
                if (!file.isRemote) {
                    UploadCsvService.uploadArquivoCsv(file.lfFile).then(
                        function success(response) {
                            ToastService.criaToastSimples(`${file.lfFile.name} foi salvo corretamente.`);
                        }, function error(response) {
                            console.log(response)
                            ToastService.criaToastSimples(`Ocorreu um erro. ${file.lfFile.name} não foi salvo corretamente.`);
                        }
                    );
                }
            });

        };

    });
})();