angular.module("myApp.login", ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'views/login.html',
    controller: 'LoginControler'
  });
}])


.controller("LoginControler", ['$location', 'FlashService','AuthenticationService',  function ($location, AuthenticationService, FlashService) {

	/*this is it*/

}])