'use strict';
(function () {
    let app = angular.module('sadApp');

    app.service("TokenService", function ($http, baseUrl, $q) {

        let tokenService = this;

        const uri = baseUrl + "/tokens";

        /**
         * Criar um token.
         *
         * @param {*} token
         */
        tokenService.criarToken = function (token) {
            let deffered = $q.defer();
            $http.post(uri, token).then(function success(response) {
                deffered.resolve(response);
            }, function error(response) {
                deffered.reject(response);
            });

            return deffered.promise;
        };
        
    });
})();
