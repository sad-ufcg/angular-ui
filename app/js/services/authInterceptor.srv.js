'use strict';
(function () {
    var app = angular.module('sadApp');

    app.factory('AuthInterceptor',
        ['$q', '$injector', '$location', function ($q, $injector, $location) {

            var authInterceptorServiceFactory = {};

            var _request = function (config) {

                var authData = localStorage.getItem('authorizationData');
                if (authData) {
                    // FIXME: ha solucoes melhores que podem ser adotadas
                    if(config.url == "https://sad.splab.ufcg.edu.br:8081/disciplinas/csv") {
                      config.headers = {
                          "Authorization" : authData,
                          "Content-Type": undefined,
                          "Accept": "application/json"
                      }
                    } else {
                      config.headers = {
                          "Authorization" : authData,
                          "Content-Type": "application/json",
                          "Accept": "application/json"
                      }
                    }

                    console.log(authData);
                } else {
                      config.headers = {
                          "Content-Type": "application/json",
                          "Accept": "application/json"
                      }
                }
                console.log(config);

                return config;
            };

            var _responseError = function (rejection) {
                if (rejection.status === 401) {
                    var authService = $injector.get('authService');
                    var authData = localStorageService.get('authorizationData');

                    if (authData) {
                        if (authData.useRefreshTokens) {

                            return $q.reject(rejection);
                        }
                    }
                    authService.logOut();

                }
                return $q.reject(rejection);
            }

            authInterceptorServiceFactory.request = _request;
            authInterceptorServiceFactory.responseError = _responseError;

            return authInterceptorServiceFactory;
        }]);
})();
