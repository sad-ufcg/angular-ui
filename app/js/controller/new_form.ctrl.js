'use strict';
(function () {
    const app = angular.module('sadApp');

    app.controller("NewFormController", function FormController(questionario,
                                                                questionarioAplicado,
                                                                disciplina,
                                                                ToastService,
                                                                DialogService,
                                                                FormularioService,
                                                                $state,
                                                                $mdIcon) {

        let newformCtrl = this;

        newformCtrl.idQuestionarioAplicado = questionarioAplicado.data.id;
        newformCtrl.questionario = questionario.data.questoes;
        newformCtrl.nomeQuestionario = questionario.data.nome;
        newformCtrl.disciplina = disciplina.data;

        newformCtrl.token = $state.params.token;

        newformCtrl.inicializarComentarios = function() {
            return Array(newformCtrl.questionario.length).fill('');
        };

        newformCtrl.inicializarQuestaoRadio = function() {
            return Array(newformCtrl.questionario.length).fill(null);
        };

        newformCtrl.questaoRadio = newformCtrl.inicializarQuestaoRadio();
        newformCtrl.comentarios = newformCtrl.inicializarComentarios();
        newformCtrl.numeroDeQuestoes = newformCtrl.questionario.length;

        newformCtrl.view = 'Home';

        newformCtrl.dialogErro = function () {

            const titulo = 'Erro ao enviar questionário!';
            const texto = 'Cheque se respondeu todas as questões devidamente.';
            const ariaLabel = 'Lucky day';
            const confirmacao = 'Ok';

            let promise = DialogService.alerta(titulo, texto, ariaLabel, confirmacao);

            promise.then(function() {
                newformCtrl.responderQuestionario();
            }, function() {});
        };

        newformCtrl.responderQuestionario = function() {
            let respostas = [];
            for(let i = 0; i < newformCtrl.numeroDeQuestoes; i++) {
                let resp = {
                  'type': newformCtrl.questionario[i].tipoQuestao,
                  'idQuestao': newformCtrl.questionario[i].id,
                  'idQuestionarioAplicado': newformCtrl.idQuestionarioAplicado,
                  'comentario': newformCtrl.comentarios[i],
                };

                if(resp.type == 'ESCOLHA_SIMPLES') {
                  resp.escolhaSimples = newformCtrl.questaoRadio[i];
                }

                respostas.push(resp);
            }

            var promise = FormularioService.responderQuestionario(respostas, newformCtrl.token);

            promise.then(function() {
              newformCtrl.view = 'Done';
            }, function() {
              newformCtrl.dialogErro();
            });

        };

        newformCtrl.dialogResposta = function () {

            const titulo = 'Obrigado! Questionário Concluído.';
            const texto = 'Você respondeu todas as questões do formulário ' +
                          '. Confirme o envio!';
            const ariaLabel = 'Lucky day';
            const confirmacao = 'Enviar Formulário';
            const cancelar = 'Cancelar Formulário';

            let promise = DialogService.confirmacao(titulo, texto, ariaLabel, confirmacao,
                                                    cancelar);

            promise.then(function() {
                newformCtrl.responderQuestionario();
            }, function() {});
        };

        newformCtrl.respostaRapida = function(resposta) {
          for (let i = 0; i < newformCtrl.questionario.length; i++) {
              if (newformCtrl.questionario[i].tipoQuestao === "ESCOLHA_SIMPLES") {
                  newformCtrl.questaoRadio[i] = resposta;
              }
          }
          ToastService.criaToastComTema("Respostas alteradas pra " + resposta + ".",
                                        "orange-toast");
        };

        newformCtrl.dialogRespostaRapida = function() {
            let promise = DialogService.criaDialogRespostaRapida();

            promise.then(function(resposta) {
                newformCtrl.respostaRapida(resposta);
            }, function() {});
        };

        newformCtrl.marcarTodasQuestoes = function (value) {
            for (let i = 0; i < newformCtrl.numeroDeQuestoes; i++) {
                if(newformCtrl.questionario[i].tipoQuestao === "ESCOLHA_SIMPLES")
                  newformCtrl.questaoRadio[i] = value;
            }
        };

        newformCtrl.numeroDeQuestoesRespondidas = function () {
            let cont = 0;
            for (let i = 0; i < newformCtrl.numeroDeQuestoes; i++) {
                if(newformCtrl.questionario[i].tipoQuestao == "ESCOLHA_SIMPLES")
                    if(newformCtrl.questaoRadio[i]) cont += 1;
                if(newformCtrl.questionario[i].tipoQuestao == "ABERTA")
                    if(newformCtrl.comentarios[i].length > 0) cont += 1;
            }
            return cont;
        };

        newformCtrl.calcPorcentagem = function () {
            return newformCtrl.numeroDeQuestoesRespondidas() / (newformCtrl.numeroDeQuestoes) * 100;
        };

        newformCtrl.iniciar = function () {
            newformCtrl.view = 'Form';
        };

  })
})();
