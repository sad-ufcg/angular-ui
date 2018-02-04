'use strict';
(function () {
    const app = angular.module("sadApp");

    app.controller("VisualizarRespostasController", function VisualizarRespostasController($state, $stateParams, questionarios, QuestionarioService, ToastService) {

        var self = this;

        self.questionarios = questionarios || [];
        self.semestrePattern = /(^\d{4}[.]\d{1})$/g;
        self.semestre = "";
        self.idQuestionario = null;

        self.disciplinas = clean_disciplinas();

        function clean_disciplinas() {
          return [{
            nome: "Todas as Turmas",
            semestre: "-",
            turma: "-"
          }];
        };

        self.irParaResposta = function(idDisciplina) {
            let params;
            if(idDisciplina == null || idDisciplina == undefined) {
                params = {
                   idQuestionario : self.idQuestionario,
                   semestre: self.semestre
                }
            } else {
                params = {
                   idQuestionario : self.idQuestionario,
                   idDisciplina: idDisciplina,
                   semestre: self.semestre
                }
            }
            $state.go("sad-resposta.visualizar-resposta", params);
        }

        self.buscarDisciplinas = function(idQuestionario, semestre) {

          self.semestrePattern.lastIndex = 0; // limpa a saida do regex
          // Trata semestre inválido
          if(semestre != "" && !self.semestrePattern.exec(semestre)) {
            ToastService.criaToastSimples("Semestre inválido.");
          } else {
            self.disciplinas = clean_disciplinas();
            var result = QuestionarioService.buscarDisciplinas(idQuestionario, semestre).then(
                function success(response) {
                    ToastService.criaToastComTema("Turmas carregadas com sucesso", "blue-toast");
                    // Adiciona novas disciplinas e salva questionario escolhido
                    self.disciplinas.push.apply(self.disciplinas, response.data);
                    self.idQuestionario = idQuestionario;
                }, function error(response) {
                    ToastService.criaToastComTema("Ocorreu um erro. Por favor, contate o administrador.", "orange-toast");
                }
            );
          }
        }
    });
})();
