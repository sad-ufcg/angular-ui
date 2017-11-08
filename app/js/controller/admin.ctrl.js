'use strict';
(function() {
	var app = angular.module('sadApp');

	app.controller("AdminController", function MainController($state) {

		var adminCtrl = this;
		adminCtrl.ufcgBrasao = "./view/img/brasaoUfcg.png";
		adminCtrl.ccBrasao = "./view/img/dsc.png";

    	adminCtrl.goTo = function goTo(state) {
    		$state.go(state);
    	};
	});
})();