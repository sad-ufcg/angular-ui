angular.module("myApp.student-groups", ['ngRoute'])

	.config(['$routeProvider', function($routeProvider, $http, config) {
	  $routeProvider.when('/student-groups', {
	    templateUrl: 'student-groups/student-groups.html',
	    controller: 'StudentGroupsController'
	  });
	}])