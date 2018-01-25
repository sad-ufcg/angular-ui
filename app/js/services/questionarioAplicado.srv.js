'use strict';
(function () {
    var app = angular.module('sadApp');

    app.service("QuestionarioAplicadoService", function ($http, baseUrl, $q, QuestionarioService) {

        var questionarioService = this;

        const uri = baseUrl + "/questionariosAplicados";

        questionarioService.getQuestionarioAplicadoByID = (id) => {
            let deffered = $q.defer();
            $http.get(`${uri}/${id}`).then(
                function success(response) {
                    deffered.resolve(response);
                }, function error(response) {
                    deffered.reject(response);
                }
            );
            return deffered.promise;
        };


        questionarioService.getTodosQuestionariosAplicados = () => {
            let deffered = $q.defer();
            $http.get(uri).then(
                function success(response) {
                    const questionariosAplicados = response.data;
                    QuestionarioService.getQuestionarios().then(
                        function (questionariosResponse) {
                            const questionarios = questionariosResponse.data;
                            const quest = questionariosAplicados.reduce((acc, item) => {
                                const temp = questionarios.map((e) => {

                                    if (item.idQuestionario === e.id) {
                                        const obj = {
                                            id: item.id,
                                            idQuestionario: item.idQuestionario,
                                            nome: e.nome,
                                            descricao: e.descricao,
                                            respostas: item.respostas || [],
                                            tokens: item.tokens || [],
                                            disciplina: item.disciplina
                                        };
                                        acc.push(obj);
                                    }
                                });
                                return acc;
                            }, []);

                            deffered.resolve({data:quest});

                        }
                    );

                }, function error(response) {
                    deffered.reject(response);
                }
            );
            return deffered.promise;

        };

    });
})();
