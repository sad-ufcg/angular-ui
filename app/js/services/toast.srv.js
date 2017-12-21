'use strict';
(function () {
    var app = angular.module('sadApp');

    app.service("ToastService", function ($mdToast, $mdDialog) {

        var service = this;
        const POSITION = "bottom right";

        service.criaToastSimples = (mensagem) => {
            $mdToast.show(
                $mdToast.simple()
                    .textContent(mensagem)
                    .position(POSITION)
            );
        };

        service.criaToastComTema = (mensagem, tema) => {
            $mdToast.show(
                $mdToast.simple()
                    .textContent(mensagem)
                    .position(POSITION)
                    .theme(tema)
            );
        };

    })

})();
