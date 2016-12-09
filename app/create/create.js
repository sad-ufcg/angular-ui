angular.module("myApp.create", ['ngRoute'])

	.config(['$routeProvider', function($routeProvider, $http) {
	  $routeProvider.when('/create', {
	    templateUrl: 'create/create.html',
	    controller: 'CreateCtrl'
	  });
	}])



	.controller('CreateCtrl',['$scope', '$http',function($scope,$http, formService) {


			var begin =  function(){

					
				$scope.questions = [];	

				$scope.types = ["Multipla Escolha", "Vazio"];
				loadQuestion();
			}

			var loadQuestion = function() {
				$http.get("http://localhost:3412/questions").success(function(data, status) {

					$scope.questions = data;

				});
			}


			$scope.addQuestion = function(question){

				$http.post("http://localhost:3412/questions", question).success(function(data) {

				delete $scope.question;
				loadQuestion();
				});


			}


			$scope.isQuestionSelected = function (questions){
					return questions.some(function (question){
						return question.selected;
				});
			}


			$scope.deleteQuestion = function(questions){


		
				$scope.questions = questions.filter(function(question){
					if (!question.selected) return question;

				});	

				console.log(questions[0]);


				$http.delete("http://localhost:3412/questions", {message: questions[0].message, type: questions[0].type}).success(function(data) {
					
					delete $scope.question;
					loadQuestion();

				});

				

			}

			var removeLocalStorage = function(questions){

				var dado = localStorage.getItem("questions");
				var array = JSON.parse(dado);

				array = questions.filter(function(question){
					if(!question.selected) return question;
				});
				localStorage.setItem("questions", JSON.stringify(array));




			}

			begin();
			


	}])


