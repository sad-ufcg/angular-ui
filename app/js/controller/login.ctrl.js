'use strict';
(function () {
    var app = angular.module('sadApp');

    app.controller('LoginController', function (AuthService) {
        var vm = this;

        vm.doLogin = function () {
            const authObj = angular.copy(vm.auth);
            AuthService.logar(authObj).then(
                function success(response) {
                    ToastService.criaToastComTema("Logado com sucesso!", "blue-toast");
                }, function error(response) {
                    ToastService.criaToastComTema("Não foi possível logar", "orange-toast");

                }
            )
        }
    })
})();