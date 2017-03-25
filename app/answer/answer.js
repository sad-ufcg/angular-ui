angular.module("myApp.answer", ['ngRoute'])

	.config(['$routeProvider', function($routeProvider) {
	  $routeProvider.when('/answer', {
	    templateUrl: 'answer/answer.html',
	    controller: 'AnswerCtrl'
	  });
	}])



	.controller("AnswerCtrl", ['$scope', '$http', 'questionAPI', 'answerAPI',
		function($scope,$http, questionAPI, answerAPI){

		var inicio = function(){
			$scope.quiz = answerAPI.getQuiz();

			$scope.courses = [];

			loadTeachers();

		};


		var loadTeachers = function() {
			answerAPI.getTeachers().then(function(data, status){

				$scope.courses = data;

			})
		}

		

		var selected_ids = [];
		 $scope.submitAnswers = function() {

		 	console.log($scope.quiz)
		    angular.forEach($scope.quiz.options, function(answer) {
		      selected_ids.push(answer.selected_id);
		    });
		    selected_ids= []
		  }

		inicio();


	}])
