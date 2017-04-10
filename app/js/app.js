'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ngCookies',
  'myApp.login',
  'myApp.create',
  'myApp.answer',
  'myApp.answerform',
  'myApp.student-groups',
  'myApp.version'

])

.controller('app', function($http){

	var self = this;
	$http.get('/resources/').then(function(response){
		self.greeting = response.data;
	})

})


.config(['$locationProvider', '$routeProvider', '$httpProvider', function($locationProvider, $routeProvider, $httpProvider) {
  $locationProvider.hashPrefix('!');

	$httpProvider.defaults.headers.post['Accept'] = 'application/json, text/javascript';
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
	 $httpProvider.defaults.headers.get = { };
	 $httpProvider.defaults.headers.delete = { };
	 $httpProvider.defaults.headers.put['Content-Type'] = 'application/json; charset=utf-8';
	 $httpProvider.defaults.headers.patch = { };

	  $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';

	 $routeProvider.otherwise({redirectTo: '/login'});


}]);



