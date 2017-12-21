'use strict';
(function () {
    var app = angular.module('sadApp');

    app.value("config", {
        baseUrl: "http://localhost:8080",
        URI_DISCIPLINAS: "http://localhost:8080/disciplinas",
        URI_UPLOAD_CSV: "http://localhost:8080/disciplinas/csv"

    })
})();