'use strict';
(function () {
    var app = angular.module('sadApp');

    app.service("EmailService", function ($http, $q, baseUrl) {

        var service = this;
        const URI = baseUrl + "/mail";

        service.enviaParaUmaListaDeQuestionariosAplicados = (lista) => {
            let deffered = $q.defer();
            $http.post(URI, JSON.stringify(lista)).then(
                function success(response) {
                    console.log(response);
                    deffered.resolve(response);
                }, function error(response) {
                    console.log(response);
                    deffered.reject(response);
                }
            );
            return deffered.promise;
        };


    });

})();
