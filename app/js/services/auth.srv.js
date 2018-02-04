'use strict';
(function () {
    var app = angular.module('sadApp');

    app.service("AuthService", function ($http, $q, baseUrl) {

        var service = this;
        const URI = baseUrl + "/auth";

        service.logar = (obj) => {
            let deffered = $q.defer();
            $http.post(URI, JSON.stringify(obj)).then(
                function success(response) {
                    console.log(response);
                    //TODO: salvar token no localStorage
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
