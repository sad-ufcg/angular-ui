'use strict';
(function() {
    var app = angular.module('sadApp');

    app.controller('CriarDisciplinaController', function CriarDisciplinaController(DisciplinaService, $state) {
        var criarDisciplinaCtrl = this;

        criarDisciplinaCtrl.disciplina = {};
        criarDisciplinaCtrl.aluno = {};
        criarDisciplinaCtrl.professor = {};

        criarDisciplinaCtrl.cadastrarDisciplina = function() {
            DisciplinaService.cadastrarDisciplina(criarDisciplinaCtrl.disciplina).then(function(success) {
                $state.go("sad-admin.disciplina", {idDisciplina : success.data.id});
            });
        };
    });
})();