'use strict';
var app = angular.module('sadApp', ['ngAnimate', 'ngAria', 'ngSanitize', 'ngMaterial', 'ui.router', 'lfNgMdFileInput', 'nvd3']);


app.constant('baseUrl', 'http://localhost:8080');

app.config(function ($stateProvider, $locationProvider, $urlRouterProvider, $mdThemingProvider, $httpProvider) {

    // Setando Temas
    $mdThemingProvider.theme('default')
        .primaryPalette('indigo')
        .accentPalette('orange');

    // Temas para toast
    $mdThemingProvider.theme("orange-toast");
    $mdThemingProvider.theme("blue-toast");
    $mdThemingProvider.theme("grey-toast");

    const carregaDisciplina = function (Disciplina, id) {
        return new Disciplina(id);
    };

    const carregarDisciplinas = function (DisciplinasService) {
        const promise = DisciplinasService.carregarDisciplinas();
        return promise.then(data => data.data);
    };

    const carregarQuestionarios = function (QuestionariosService) {
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

        .state("sad-login", {
            url: '/login',
            views: {
                main: {
                    templateUrl: "view/login.html",
                    controller: "LoginController as vm"
                }
            }
         })

        .state("sad-resposta", {
            abstract: true,
            url: '/respostas',
            views: {
                main: {
                  templateUrl: "view/main-content.html",
                  controller: "MainController as mainCtrl"
                }
            },
            resolve : {
                questionarios: function(QuestionariosService) {
                    return carregarQuestionarios(QuestionariosService);
                }
            }
        })

        .state('sad-admin.visualizar-questionario-aplicado', {
            url: "/visualizar-questionarios-aplicados",
            views: {
                content: {
                    templateUrl: "view/questionarios-aplicados.html",
                    controller: "QuestionariosAplicadosController as vm"
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
            resolve: {
                disciplinas: function (DisciplinasService) {
                    return carregarDisciplinas(DisciplinasService);
                },
                questionarios: function (QuestionariosService) {
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

        .state("sad-admin.pre-visualizar-resposta", {
            url: "/pre-visualizar-respostas",
            views: {
                content: {
                    templateUrl: 'view/pre-visualizar-resposta.html',
                    controller: 'PreVisualizarRespostaController as preVisualizarRespostaCtrl'
                }
            },
            resolve : {
                questionarios: function(QuestionariosService) {
                    return carregarQuestionarios(QuestionariosService);
                }
            }
         })
         .state("sad-resposta.visualizar-resposta", {
             url: "/visualizar-resposta/?idQuestionario&idDisciplina&semestre",
             views:{
                 content: {
                     templateUrl: 'view/visualizar-resposta.html',
                     controller: 'VisualizarRespostaController as visualizarRespostaCtrl',
                 }
             },
             resolve: {
                 questionariosAplicados: function (QuestionarioService, $stateParams) {
                    return QuestionarioService.getQuestionariosAplicados($stateParams);
                 },
                 questionarioByID: function (QuestionarioService, $stateParams) {
                    return QuestionarioService.getQuestionarioByID($stateParams.idQuestionario);
                 }
             }
         })
        .state("sad-admin.disciplina", {
            url: "/disciplina/:idDisciplina",
            views: {
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
            views: {
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
                },
                disciplina: function (FormularioService, $stateParams) {
                    return FormularioService.buscaDisciplina($stateParams.token);
                }
            }
        });

    $urlRouterProvider.otherwise('admin/home');
    $locationProvider.html5Mode(false);
    $locationProvider.hashPrefix('');






    $httpProvider.interceptors.push('AuthInterceptor');
    $httpProvider.defaults.headers.common = {};
    $httpProvider.defaults.headers.post = {};
    $httpProvider.defaults.headers.put = {};
    $httpProvider.defaults.headers.patch = {};
});



app.run(['$rootScope', '$state', '$location', 'AuthService', function ($rootScope, $state, $location, AuthService) {

    $state.defaultErrorHandler(function (error) {
        console.log(error);
    });

    $rootScope.$on('$locationChangeSuccess', function () {
        console.log($location.path());
        const path = $location.path().substring(0, 13);
        if (path === "/login") {
            console.log("LOGIN");
            return;
        }


        if (AuthService.isLogged()) {
            console.log("ISLOOGGED");
            return;
        }
        $state.go('sad-login');
        //$state.go('');
    });

}]);
