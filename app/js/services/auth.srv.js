'use strict';
(function () {
    var app = angular.module('sadApp');

    app.service("AuthService", function ($http, $q, baseUrl) {

        var service = this;
        const URI = baseUrl + "/auth";

        service.logar = (obj) => {
            console.log(obj)
            let deffered = $q.defer();
            $http.post(URI, obj).then(
                function success(response) {
                    console.log(response);
                    localStorage.setItem('authorizationData', 'aquideviaserumtoken');
                    //TODO: salvar token no localStorage
                    deffered.resolve(response);
                }, function error(response) {
                    console.log(response);
                    deffered.reject(response);
                }
            );
            return deffered.promise;
        };

        service.isLogged = () => {
            return localStorage.getItem('authorizationData');

        };

        service.logOut = () => {
            return localStorage.removeItem;
        };


    });

})();
