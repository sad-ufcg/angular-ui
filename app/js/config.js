const app = angular.module('sadApp', ['ngAnimate', 'ngAria', 'ngSanitize', 'ngMaterial', 'ui.router']);

app.constant('baseUrl', 'http://localhost:8080');

app.config(function ($stateProvider, $locationProvider, $urlRouterProvider) {

    $stateProvider
        .state("sad-aluno", {
            abstract: true,
            views: {
                main: {
                    templateUrl: "view/main-content.html",
                    controller: "MainController as mainCtrl"
                }
            }
        })

        .state("sad-admin", {
            abstract: true,
            views: {
                main: {
                    templateUrl: "view/admin-content.html",
                    controller: "AdminController as adminCtrl"
                }
            }
        })

        //apenas para teste de rota, pode ser excluído
        .state("sad-admin.home-test", {
            url: "/hometest",
            views: {
                content: {
                    templateUrl: 'view/test.html'
                }
            }
        })

        .state("sad-aluno.home", {
            url: "/home",
            views: {
                content: {
                    templateUrl: 'view/home.html'
                }
            }
        })
        .state("sad-aluno.form", {
            url: "/form/:id/:curso/:token",
            views: {
                content: {
                    templateUrl: 'view/form.html',
                    controller: 'FormController as formCtrl'
                }
            },
            resolve: {
                quiz: function (AnswerService) {
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
