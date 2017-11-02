const app = angular.module('sadApp', ['ngAnimate','ngAria', 'ngSanitize', 'ngMaterial', 'ui.router']);

app.constant('baseUrl', 'http://localhost:8080');

app.config(function ($stateProvider, $locationProvider, $urlRouterProvider) {

    $stateProvider
        .state("sad", {
            abstract: true,
            views: {
                main: {
                    templateUrl: "view/main-content.html",
                    controller: "MainController as mainCtrl"
                }
            }
        })
        .state("sad.home", {
            url: "/home",
            views: {
                content: {
                    templateUrl: 'view/home.html'
                }
            }
        })
        .state("sad.form", {
            url: "/form/:id/:curso/:token",
            views: {
                content: {
                    templateUrl: 'view/form.html',
                    controller: 'FormController as formCtrl'
                }
            }, 
            resolve: {
                quiz: function (AnswerService){
                    return AnswerService.getQuiz();
                }
            }
        });

    $urlRouterProvider.otherwise('/home');
    $locationProvider.html5Mode(false);
    $locationProvider.hashPrefix('');

    app.run(['$rootScope', '$state', function ($rootScope, $state) {

        $state.defaultErrorHandler(function (error) {
            console.log(error);
        })
    }]);

});
