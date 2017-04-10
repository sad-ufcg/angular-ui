angular.module("myApp.answer", ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/answer', {
		templateUrl: 'views/answer.html',
		controller: 'AnswerCtrl'
	});
}])



.controller("AnswerCtrl", ['$scope', '$http', 'answerAPI',
	function($scope,$http, answperAPI){

		var begin = function(){
			loadCourses();
		};


		var loadCourses = function() {
			answerAPI.getCourses().then(function(data, status){
				$scope.courses = data;
			})
		}

		$scope.loadQuiz = function(course){
			$scope.quiz = answerAPI.getQuiz(course.id, course.courseName)
		}

		$scope.sendAnswer = function () {
			answerAPI.submitAnswers($scope.quiz);
		}

		begin();


	}])
