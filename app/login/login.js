angular.module("myApp.login", ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'login/login.html',
    controller: 'loginCrtl'
  });
}])


.factory("formService", function () {
	formService = {};

	formService.getUsers = function(){
		var users = [{matricula: "123456789", senha:"1234"},
					 {matricula: "115115115", senha: "admin"}
					];
		return users;
	}

	return formService;

	

})


.controller("loginCrtl", function($scope, formService){

		var begin = function(){
		}

		$scope.doLogin = function(user){
				 $location.path('/create');		
		}
		
		begin();

		
})