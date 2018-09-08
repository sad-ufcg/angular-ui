'use strict';
(function () {
    var app = angular.module('sadApp');

    app.service("DialogService", function ($mdDialog) {

        let service = this;

        service.confirmacao = (titulo, texto, ariaLabel, confirmacao, cancelar) => {

            var confirm = $mdDialog.confirm()
                .title(titulo)
                .textContent(texto)
                .ariaLabel(ariaLabel)
                .ok(confirmacao)
                .cancel(cancelar);

            return $mdDialog.show(confirm);
        };

        service.alerta = (titulo, texto, ariaLabel, confirmacao) => {

            var confirm = $mdDialog.alert()
                .clickOutsideToClose(true)
                .title(titulo)
                .textContent(texto)
                .ariaLabel(ariaLabel)
                .ok(confirmacao);

            return $mdDialog.show(confirm);
        };

        service.criaDialogRespostaRapida = () => {
            return $mdDialog.show({
              controller: 'DialogRespostaRapidaController as dialogRespostaCtrl',
              templateUrl: 'view/dialogs/resposta-rapida-dialog.html',
              clickOutsideToClose: true,
              parent: angular.element(document.body)
            });
        };
    })

})();
