'use strict';
(function () {
    var app = angular.module('sadApp');

    app.service("UploadCsvService", function ($http, $q, config) {

        var service = this;

        service.uploadArquivoCsv = (files) => {
            console.log(files);
            let deffered = $q.defer();
            let formFile = new FormData();
            for(let i = 0; i < files.length; i++) {
                formFile.append('csv', files[i]);
            }
            $http.post(config.URI_UPLOAD_CSV, formFile, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }
            }).then(
                function success(response) {
                    deffered.resolve(response);
                }, function error(response) {
                    deffered.reject(response);
                });
            return deffered.promise;
        };
    });

})();
