'use strict';
(function () {
    var app = angular.module('sadApp');

    app.service("DialogService", function ($mdDialog) {

        var service = this;

        service.confirmacao = (titulo, texto, ariaLabel, confirmacao, cancelar,
                            funcao_confirmacao, funcao_cancelamento) => {

            var confirm = $mdDialog.confirm()
                .title(titulo)
                .textContent(texto)
                .ariaLabel(ariaLabel)
                .ok(confirmacao)
                .cancel(cancelar);

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
