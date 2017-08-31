'user strict';
(function() {
	var app = angular.module('sadApp');

	app.controller("HomeController", function MainController($state) {

		var homeCtrl = this;

        homeCtrl.test = "HOME TEST DO CONTROLLER";
    	
	});
})();