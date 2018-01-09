'use strict';
(function () {
    let app = angular.module('sadApp');

    app.service("RespostaService", function ($http, baseUrl, $q) {

        let respostaService = this;

        const uri = baseUrl + "/respostas";

        respostaService.getRespostas = function () {
            let deffered = $q.defer();
            $http.get(uri).then(
                function success(response) {
                    deffered.resolve(response);
                }, function error(response) {
                   deffered.reject(response);
                }
            );
            return deffered.promise;
        };

        respostaService.getRespostasByIdQuestao = (idQuestao) => {
            let deffered = $q.defer();
            $http.get(`${uri}/?idQuestao=${idQuestao}`).then(
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
