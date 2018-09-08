'use strict';
(function () {
    var app = angular.module('sadApp');

    app.controller("QuestionariosAplicadosController", function QuestionariosAplicadosController(EmailService, QuestionarioAplicadoService, ToastService) {

        var vm = this;
        vm.questionarios = vm.questionarios || [];
        vm.test = "test controller";
        vm.questionariosMarcados = [];
        vm.dial = {};
        vm.dial.isOpen = false;

        vm.checkQuestionario = (questionario) => {
            const checked = vm.questionariosMarcados.indexOf(questionario);
            if (checked > -1) {
                vm.questionariosMarcados = vm.questionariosMarcados.filter((item) => item.id !== questionario.id);
                questionario.style = "";
            } else {
                vm.questionariosMarcados.push(questionario);
                questionario.style = { "background-color": "#4d82cb", "color": "white" };
            }
        };

        vm.checked = (questionario) => {
            return vm.questionariosMarcados.indexOf(questionario) > -1;
        };

        vm.enviarEmailSelecionados = () => {
            const listaIds = vm.questionariosMarcados.map((item) => item.id);
            EmailService.enviaParaUmaListaDeQuestionariosAplicados(listaIds).then(
                function success(response) {
                    ToastService.criaToastComTema("Questionários enviados para a lista de email dos alunos!", "blue-toast");
                    vm.questionariosMarcados = [];
                }, function error(response) {
                    ToastService.criaToastComTema("Ocorreu um erro ao enviar os email para os alunos. Por favor, contate o administrador.", "orange-toast");
                    vm.questionariosMarcados = [];

                }
            );
        }

        vm.carregarQuestionarios = () => {
            QuestionarioAplicadoService.getTodosQuestionariosAplicados().then(
                function success(response) {
                    vm.questionarios = response.data;
                }, function error(error) {
                    ToastService.criaToastComTema("Ocorreu um erro ao acessar os recursos do sistema. Por favor, contate o administrador.", "orange-toast");

                }
            );

        };

        vm.carregarQuestionarios();

    });
})();
