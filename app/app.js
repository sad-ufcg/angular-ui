'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ngCookies',
  'myApp.login',
  'myApp.create',
  'myApp.answer',
  'myApp.student-groups',
  'myApp.version'

])

.config(['$locationProvider', '$routeProvider', '$httpProvider', function($locationProvider, $routeProvider, $httpProvider) {
  $locationProvider.hashPrefix('!');

 $httpProvider.defaults.headers.common = {};
 $httpProvider.defaults.headers.post = { };
 $httpProvider.defaults.headers.get = { };
 $httpProvider.defaults.headers.delete = { };
 $httpProvider.defaults.headers.put = { };
 $httpProvider.defaults.headers.patch = { };

 $routeProvider.otherwise({redirectTo: '/login'});


}]);



