angular.module("myApp.login", ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'login/login.html',
    controller: 'LoginControler'
  });
}])


.controller("LoginControler", ['$location', 'FlashService','AuthenticationService',  function ($location, AuthenticationService, FlashService) {

	var vm = this;

    vm.login = login;

    console.log(vm);

    (function initController() {
        // reset login status
        AuthenticationService.ClearCredentials();
    })();

    function login() {
        vm.dataLoading = true;
        console.log(vm.username);
        AuthenticationService.Login(vm.username, vm.password, function (response) {
        	console.log(vm.username);
            if (response.success) {
                AuthenticationService.SetCredentials(vm.username, vm.password);
                $location.path('/');
            } else {
                FlashService.Error(response.message);
                vm.dataLoading = false;
            }
        });
    };

}])