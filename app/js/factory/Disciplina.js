'use strict';
(function () {
    var app = angular.module('sadApp');

    app.factory("Disciplina", function($http, baseUrl, $q) {
        
        var disciplinaUri = baseUrl + "/disciplinas/";

        Disciplina.prototype.constructor = Disciplina;

        function Disciplina(id) {
            if (id) {
                this._id = id;
                this._alunos = [];
                this.carregarAlunos();
                this.load().then(success => this._data = success.data);
            }
        };

        Disciplina.prototype.load = function() {
            let deferred = $q.defer();
            let url = disciplinaUri + this._id;
            $http.get(url).then(function (data) {
                deferred.resolve(data);
            }, function(error) {
                deferred.reject(error);
            });
            
            return deferred.promise;
        };

        Disciplina.prototype.getNome = function() {
            if (this._data) {
                return this._data.nome;
            }
        };

        Disciplina.prototype.getTurma = function() {
            if (this._data) {
                return this._data.turma;
            }
        }

        Disciplina.prototype.getPeriodo = function() {
            if (this._data) {
                return this._data.periodo;
            }
        }

        Disciplina.prototype.adicionarAluno = function(aluno) {
            if (this._id) {
                let self = this;
                $http.post(disciplinaUri + this._id + "/alunos", aluno).then(function(success) {
                    self._alunos.push(success.data);
                });
            }
        };

        Disciplina.prototype.carregarAlunos = function() {
            if (this._id) {
                let self = this;
                $http.get(disciplinaUri + this._id + "/alunos").then(function(data) {
                    self._alunos = data.data;
                });
            }
        };

        Disciplina.prototype.getId = function() {
            return this._id;
        };

        Disciplina.prototype.getAlunos = function() {
            return this._alunos;
        };

        return Disciplina;
    });
})();