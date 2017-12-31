'use strict';
const app = angular.module('sadApp', ['ngAnimate', 'ngAria', 'ngSanitize', 'ngMaterial', 'ui.router', 'lfNgMdFileInput']);

app.constant('baseUrl', 'http://localhost:8080');

app.config(function ($stateProvider, $locationProvider, $urlRouterProvider, $mdThemingProvider) {

    // Setando Temas
    $mdThemingProvider.theme('default')
        .primaryPalette('indigo')
        .accentPalette('orange');

    // Temas para toast
    $mdThemingProvider.theme("orange-toast");
    $mdThemingProvider.theme("blue-toast");
    $mdThemingProvider.theme("grey-toast");

    const carregaDisciplina = function(Disciplina, id) {
        return new Disciplina(id);
    };

    const carregarDisciplinas = function(DisciplinasService) {
        const promise = DisciplinasService.carregarDisciplinas();
        return promise.then(data => data.data);
    };

    const carregarQuestionarios = function(QuestionariosService) {
        const promise = QuestionariosService.carregarQuestionarios();
        return promise.then(data => data.data);
    };

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
            url: '/admin',
            views: {
                main: {
                    templateUrl: "view/admin-content.html",
                    controller: "AdminController as adminCtrl"
                }
            }
        })

        .state("sad-admin.cadastra-turmas", {
            url: "/cadastrar-turmas",
            views: {
                content: {
                    templateUrl: 'view/cadastra-turmas.html',
                    controller: 'CadastraTurmasController as cadastraTurmasCtrl'
                }
            }
        })

        .state("sad-admin.criar-questionario", {
            url: "/criar-questionario",
            views: {
                content: {
                    templateUrl: 'view/criar-questionario.html',
                    controller: 'CriarQuestionarioController as criarQuestionarioCtrl'
                }
            }
        })

        .state("sad-admin.aplicar-questionario", {
            url: "/aplicar-questionario",
            views: {
                content: {
                    templateUrl: 'view/aplicar-questionario.html',
                    controller: 'AplicarQuestionarioController as aplicarQuestionarioCtrl'
                }
            },
            resolve : {
                disciplinas: function(DisciplinasService) {
                    return carregarDisciplinas(DisciplinasService);
                },
                questionarios: function(QuestionariosService) {
                    return carregarQuestionarios(QuestionariosService);
                }
            }
        })

        .state("sad-admin.criar-disciplina", {
            url: "/criar-disciplina",
            views: {
                content: {
                    templateUrl: 'view/criar-disciplina.html',
                    controller: 'CriarDisciplinaController as criarDisciplinaCtrl'
                }
            }
        })

        .state("sad-admin.visualizar-disciplinas", {
            url: "/visualizar-disciplinas",
            views: {
                content: {
                    templateUrl: 'view/listagem-disciplina.html',
                    controller: 'DisciplinasController as disciplinasCtrl'
                }
            }
        })

        .state("sad-admin.disciplina", {
            url: "/disciplina/:idDisciplina",
            views:{
                content: {
                    templateUrl: 'view/disciplina.html',
                    controller: 'DisciplinaController as disciplinaCtrl',
                }
            },
            resolve: {
                disciplina: function (Disciplina, $stateParams) {
                    let idDisciplina = parseInt($stateParams.idDisciplina);
                    return carregaDisciplina(Disciplina, idDisciplina);
                }
            }
        })

        .state("sad-admin.questionario-detalhe", {
            url: "/questionario/:id",
            views:{
                content: {
                    templateUrl: 'view/questionario-detalhe.html',
                    controller: 'QuestionarioDetalheController as questDetalheCtrl'
                }
            }
        })

        .state("sad-admin.home", {
            url: "/home",
            views: {
                content: {
                    templateUrl: 'view/dashboard-admin.html'
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
        })
        .state("sad-aluno.formulario", {
            url: "/form/:token",
            views: {
                content: {
                    templateUrl: 'view/new_form.html',
                    controller: 'NewFormController as newformCtrl'
                }
            },
            resolve: {
                questionario: function (FormularioService, $stateParams) {
                    return FormularioService.buscaQuestionario($stateParams.token);
                },
                questionarioAplicado: function (FormularioService, $stateParams) {
                    return FormularioService.buscaQuestionarioAplicado($stateParams.token);
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
