angular.module("myApp.create", ['ngRoute'])

	.config(['$routeProvider', function($routeProvider) {
	  $routeProvider.when('/create', {
	    templateUrl: 'create/create.html',
	    controller: 'CreateCtrl'
	  });
	}])


	.factory("formService", function () {
		formService = {};

		formService.getQuestions = function(){
			var questions = [{message:"Os pré-requisitos assumidos pela disciplina foram adequados?"},
							 {message:"O programa da disciplina esteve de acordo com a ementa da mesma?"}
							];
			return questions;
		}

		formService.getType = function(){
			var types = [{name: "Múltipla Escolha"},
					 	{name: "Escolha Única"},
					 	{name: "Apenas Texto"}
						];
			return types;	
		}

		return formService;

	})

	.controller('CreateCtrl',['$scope',function($scope, formService){


			var begin =  function(){

					
				var dado = localStorage.getItem("questions");

				if(dado == null){

					var array = [{message:"Os pré-requisitos assumidos pela disciplina foram adequados?", type: "Vazio"},
								 {message:"O programa da disciplina esteve de acordo com a ementa da mesma?", type: "Vazio"},
								 {message: "vai aparecer em todo canto", type: "Vazio"}
								];

				var arrayStr = JSON.stringify(array);
				localStorage.setItem("questions", arrayStr);

				}
				var dado = localStorage.getItem("questions");
				$scope.questions = JSON.parse(dado);

				$scope.types = ["Múltipla Escolha",
					 			"Escolha Única",
					 			"Apenas Texto"
								];
			}



			$scope.addQuestion = function(question){

				var dado = localStorage.getItem("questions");
				var array = JSON.parse(dado);
				array.push(angular.copy(question));
				localStorage.setItem("questions", JSON.stringify(array));

				$scope.questions.push(angular.copy(question)); //Adiciona no fim do array			
				delete $scope.question;

			}


			$scope.isQuestionSelected = function (questions){
					return questions.some(function (question){
						return question.selected;
				});
			}


			$scope.deleteQuestion = function(questions){

				var dado = localStorage.getItem("questions");
				var array = JSON.parse(dado);
				array = questions.filter(function(question){
					if (!question.selected) return localStorage.setItem("questions", JSON.stringify(array));;

				});
			

				$scope.questions = questions.filter(function(question){
					if (!question.selected) return question;

				});	
			}


			begin();


	}])


