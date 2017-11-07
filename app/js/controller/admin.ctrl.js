'use strict';
(function() {
	var app = angular.module('sadApp');

	app.controller("AdminController", function MainController($state) {

		var adminCtrl = this;

    	adminCtrl.goTo = function goTo(state) {
    		$state.go(state);
    	};
	});
})();