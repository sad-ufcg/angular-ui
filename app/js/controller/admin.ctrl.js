'use strict';
(function () {
	var app = angular.module('sadApp');

	app.controller("AdminController", function MainController($state) {

		var adminCtrl = this;
		adminCtrl.ufcgBrasao = "./view/img/brasaoUfcg.png";
		adminCtrl.ccBrasao = "./view/img/dsc.png";
		const STATE_HOME = "sad-admin.home";

		adminCtrl.goTo = function goTo(state) {
			$state.go(state);
		};

		adminCtrl.pages =
			[{
				icon: 'library_add',
				title: 'Upload de Disciplinas',
				state: 'sad-admin.cadastra-turmas'
			},
			{
				icon: 'fiber_new',
				title: 'Criar Disciplina',
				state: 'sad-admin.criar-disciplina'
			},
			{
				icon: 'fiber_new',
				title: 'Criar Questionário',
				state: 'sad-admin.criar-questionario'
			},
			{
				icon: 'list',
				title: 'Visualizar Disciplinas',
				state: 'sad-admin.visualizar-disciplinas'
			},
			{
				icon: 'create',
				title: 'Aplicar Questionário',
				state: 'sad-admin.aplicar-questionario'
			},
			{
				icon: 'email',
				title: 'Enviar Questionário Aplicado',
				state: 'sad-admin.visualizar-questionario-aplicado'
			},
			{
        icon: 'description',
        title: 'Visualizar Respostas',
        state: 'sad-resposta.pre-visualizar-resposta'
      }];

		adminCtrl.goTo = (state) => {
			console.log(state);
			$state.go(state);
		}

		adminCtrl.goToHome = () => {
			$state.go(STATE_HOME);
		}

	});
})();
