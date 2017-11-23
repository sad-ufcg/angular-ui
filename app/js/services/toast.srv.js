'use strict';
(function () {
    var app = angular.module('sadApp');

    app.service("ToastService", function ($mdToast, $mdDialog) {

        var service = this;
        const POSITION = "bottom right";

        service.criaToastSimples = (message) => {
            $mdToast.show(
                $mdToast.simple()
                    .textContent(message)
                    .position(POSITION)
            );
        };

    })

})();