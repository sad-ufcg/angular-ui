'use strict';
(function() {
    var app = angular.module('sadApp');

    app.controller('DisciplinasController', function($http, DisciplinasService, $state, $stateParams) {
        var self = this;
        self.disciplinas = [];

        self.carregarDisciplinas = function() {
            DisciplinasService.carregarDisciplinas().then(data => self.disciplinas = data.data);
        };

        self.irParaDisciplina = function(id) {
            $state.go("sad-admin.disciplina", {idDisciplina : id});
        }
    });
 })();