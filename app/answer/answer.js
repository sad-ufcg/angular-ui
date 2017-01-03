angular.module("myApp.answer", ['ngRoute'])

	.config(['$routeProvider', function($routeProvider) {
	  $routeProvider.when('/answer', {
	    templateUrl: 'answer/answer.html',
	    controller: 'AnswerCtrl'
	  });
	}])



	.controller("AnswerCtrl", ['$scope', '$http', 'questionAPI',function($scope,$http, questionAPI){
		
		var inicio = function(){
			$scope.questions = [];
			$scope.answers = questionAPI.getAnswers();
			$scope.matters = [];

		loadQuestion();
		loadTeachers();	
			
		};

		var loadQuestion = function() {
				questionAPI.getQuestions().success(function(data, status){

					$scope.questions = data;

				});
			}

		var loadTeachers = function() {
			questionAPI.getTeachers().success(function(data, status){

				$scope.matters = data;

			})
		}	

		inicio();
		

	}])