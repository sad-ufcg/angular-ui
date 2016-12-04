angular.module("myApp.answer", ['ngRoute'])

	.config(['$routeProvider', function($routeProvider) {
	  $routeProvider.when('/answer', {
	    templateUrl: 'answer/answer.html',
	    controller: 'AnswerCtrl'
	  });
	}])


	.factory("formService", ["$http", function($http){
		formService = {};

		formService.getAnswers = function(){
		
			var answers = ["Resposta 1", "Resposta 2", "Resposta 3", "Resposta 4", "Resposta 5"];
			return answers;
			
		}

		return formService;
	}])


	.controller("AnswerCtrl", ['$scope', '$http', 'formService',function($scope,$http, formService){
		
		var inicio = function(){
			$scope.questions = [];
			$scope.answers = formService.getAnswers();
			$scope.matters = [];

		loadQuestion();
		loadTeachers();	
			
		};

		var loadQuestion = function() {
				$http.get("http://localhost:3412/questions").success(function(data, status){

					$scope.questions = data;

				});
			}

		var loadTeachers = function() {
			$http.get("http://localhost:3412/teachers").success(function(data, status){

				$scope.matters = data;

			})
		}	

		inicio();
		


	}])