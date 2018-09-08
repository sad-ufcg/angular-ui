'use strict';
(function () {
    var app = angular.module('sadApp');

    app.value("config", {
        baseUrl: "https://sad.splab.ufcg.edu.br:8081",
        URI_DISCIPLINAS: "https://sad.splab.ufcg.edu.br:8081/disciplinas",
        URI_UPLOAD_CSV: "https://sad.splab.ufcg.edu.br:8081/disciplinas/csv"

    })
})();
