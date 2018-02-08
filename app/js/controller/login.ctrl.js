'use strict';
(function () {
    var app = angular.module('sadApp');

    app.controller('LoginController', function (AuthService,ToastService, $state) {
        var vm = this;

        vm.doLogin = function () {
            const authObj = angular.copy(vm.auth);
            AuthService.logar(authObj).then(
                function success(response) {
                    console.log(response)
                    ToastService.criaToastComTema("Logado com sucesso!", "blue-toast");
                    $state.go('sad-admin.home');
                }, function error(response) {
                    ToastService.criaToastComTema("Não foi possível logar", "orange-toast");

                }
            )
        }
    })
})();