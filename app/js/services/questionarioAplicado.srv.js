'use strict';
(function () {
    var app = angular.module('sadApp');

    app.service("QuestionarioAplicadoService", function ($http, baseUrl, $q) {

        var questionarioService = this;

        const uri = baseUrl + "/questionariosAplicados";

        questionarioService.getQuestionarioAplicadoByID = (id) => {
            let deffered = $q.defer();
            $http.get(`${uri}/${id}`).then(
                function success(response){
                    deffered.resolve(response);
                }, function error(response){
                    deffered.reject(response);
                }
            );
            return deffered.promise;
        };

    });
})();
