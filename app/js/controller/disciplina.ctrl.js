'use strict';
(function() {
    var app = angular.module('sadApp');

    app.controller('DisciplinaController', function($scope, Disciplina, $stateParams, disciplina) {
        var self = this;

        self.idDisciplina = parseInt($stateParams.idDisciplina) || undefined;
        self.disciplina = disciplina;
        self.alunoNovo = {};

        self.adicionarAluno = function() {
            self.disciplina.adicionarAluno(self.alunoNovo);
            self.alunoNovo = {}
        }
    })
})();