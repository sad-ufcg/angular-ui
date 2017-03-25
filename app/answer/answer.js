angular.module("myApp.answer", ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/answer', {
		templateUrl: 'answer/answer.html',
		controller: 'AnswerCtrl'
	});
}])



.controller("AnswerCtrl", ['$scope', '$http', 'answerAPI',
	function($scope,$http, answerAPI){

		var inicio = function(){
			$scope.quiz = answerAPI.getQuiz();

			$scope.courses = [];

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




		$scope.submitAnswers = function() {
			var selected_ids = [];

			var questions = $scope.quiz.questions
			questions.forEach(function(question) {
				selected_ids.push(question.selected_id)
			})
			
			console.log(selected_ids)
		}

		inicio();


	}])
