const app = angular.module('sadApp', ['ngMaterial', 'ui.router']);

app.config(['$stateProvider', '$locationProvider', '$urlRouterProvider',
    function ($stateProvider, $locationProvider, $urlRouterProvider) {

      
        $urlRouterProvider.otherwise('/');
        $locationProvider.html5Mode(false);
        $locationProvider.hashPrefix('');


        $stateProvider
            .state("sad", {
                abstract: true,
                templateUrl: "view/main-content.html",
                controller: "MainController as mainCtrl",

            })

            .state("sad.home", {
                url: "/home",
                views: {
                    content: {
                        templateUrl: 'view/home.html',
                        controller: 'HomeController as homeCtrl'
                    }
                }
            })

        app.run(['$rootScope', '$state', function ($rootScope, $state) {

            $state.defaultErrorHandler(function (error) {
                console.log(error);
               
            })
        }]);


    }]);