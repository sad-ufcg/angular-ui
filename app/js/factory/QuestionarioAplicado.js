'use strict';
(function() {
    const app = angular.module('sadApp');

    app.factory('QuestionarioAplicado', function($http, baseUrl, $q) {
    
        const questionarioAplicadoUri = baseUrl + '/questionariosAplicados';

        QuestionarioAplicado.prototype.constructor = QuestionarioAplicado;

        function QuestionarioAplicado(idDisciplina, idQuestionario, idProfessor) {
            this._data = {};
            this._data.idDisciplina = idDisciplina;
            this._data.idQuestionario = idQuestionario;
            if (idProfessor) {
                this._data.idProfessor = idProfessor;
            }
        }

        QuestionarioAplicado.prototype.salvar = function() {
            const self = this;
            if(this._data) {
                return $http.post(questionarioAplicadoUri, this._data);
            }
        };

        return QuestionarioAplicado;
    });
})();