'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ngCookies',
  'myApp.login',
  'myApp.create',
  'myApp.answer',
  'myApp.version'

])

.config(['$locationProvider', '$routeProvider', '$httpProvider', function($locationProvider, $routeProvider, $httpProvider) {
  $locationProvider.hashPrefix('!');

 $httpProvider.defaults.headers.common = { 'Content-Type' : 'application/json, text/javascript'};
 $httpProvider.defaults.headers.post = { 'Content-Type' : 'application/json, text/javascript'};
 $httpProvider.defaults.headers.get = { 'Content-Type' : 'application/json'};
 $httpProvider.defaults.headers.delete = { 'Content-Type' : 'application/json'};
 $httpProvider.defaults.headers.put = { 'Content-Type' : 'application/json, text/javascript'};
 $httpProvider.defaults.headers.patch = { 'Content-Type' : 'application/json'};

 $routeProvider.otherwise({redirectTo: '/login'});


}]);



