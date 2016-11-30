angular.module("myApp.answer", ['ngRoute'])

	.config(['$routeProvider', function($routeProvider) {
	  $routeProvider.when('/answer', {
	    templateUrl: 'answer/answer.html',
	    controller: 'AnswerCtrl'
	  });
	}])


	.factory("formService", function(){
		formService = {};

		formService.getAnswers = function(){
		
			var answers = ["Resposta 1", "Resposta 2", "Resposta 3", "Resposta 4", "Resposta 5"];
			return answers;
			
		}

		formService.getMatters = function(){

			var dado = localStorage.getItem("matters");

				if(dado == null){

					var array =  [{teacher:"Matheus Gaudêncio", name:"Administração de Sistemas"},
							{teacher:"Não sei quem é", name:"Banco de Dados I"}, 
							{teacher:"Nazareno", name:"Sistema de Informação I"}, 
							{teacher:"Carlos Wilson", name:"Gerência da Informação"}];

						var arrayStr = JSON.stringify(array);
						localStorage.setItem("matters", arrayStr);

				}

			var data = localStorage.getItem("matters");
			var matters = JSON.parse(data);
			
			return matters;
		}	

		
		formService.getQuestions = function(){
			
			var dado = localStorage.getItem("questions");

			var questions = JSON.parse(dado);

			return questions;
		}	
		return formService;
	})


	.controller("AnswerCtrl", function($scope, formService){
		
		var inicio = function(){
			$scope.questions = formService.getQuestions();
			$scope.answers = formService.getAnswers();
			$scope.matters = formService.getMatters();
			
		};

		inicio();

	})