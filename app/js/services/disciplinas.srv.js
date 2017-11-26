'use strict';
(function() {
    let app = angular.module('sadApp');

    app.service('DisciplinasService', function($http, baseUrl, $q) {
        var self = this;

        const disciplinaUrl = baseUrl + "/disciplinas";
        
        self.carregarDisciplinas = function() {
            let deferred = $q.defer();

            $http.get(disciplinaUrl).then(function(data) {
                deferred.resolve(data);
            }, function(erro) {
                deferred.reject(erro);
            });

            return deferred.promise;
        };
    });
})();