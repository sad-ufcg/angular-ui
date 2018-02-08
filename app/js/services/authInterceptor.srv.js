'use strict';
(function () {
    var app = angular.module('sadApp');

    app.factory('AuthInterceptor',
        ['$q', '$injector', '$location', function ($q, $injector, $location) {

            var authInterceptorServiceFactory = {};

            var _request = function (config) {
                
                // var authData = localStorage.getItem('authorizationData');
                // if (authData) {
                //     config.headers.Authorization = 'Bearer ' + authData.token;
                // }
                console.log(config);

                return config;
            };

            var _responseError = function (rejection) {
                // if (rejection.status === 401) {
                //     var authService = $injector.get('authService');
                //     var authData = localStorageService.get('authorizationData');

                //     if (authData) {
                //         if (authData.useRefreshTokens) {
                //             
                //             return $q.reject(rejection);
                //         }
                //     }
                //     authService.logOut();
                //     
                // }
                return $q.reject(rejection);
            }

            authInterceptorServiceFactory.request = _request;
            authInterceptorServiceFactory.responseError = _responseError;

            return authInterceptorServiceFactory;
        }]);
})();
