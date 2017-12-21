'use strict';
(function() {
    const app = angular.module('sadApp');

    app.service('QuestionariosService', function($http, baseUrl, $q) {
        let self = this;

        const questionariosUri = baseUrl + '/questionarios';

        self.carregarQuestionarios = function() {
            let deferred = $q.defer();

            $http.get(questionariosUri).then(function(data) {
                deferred.resolve(data);
            }, function(erro) {
                deferred.reject(erro);
            });

            return deferred.promise;
        };
    });
})();