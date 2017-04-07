angular.module("myApp.student-groups", ['ngRoute', 'angularFileUpload'])

	.config(['$routeProvider', function($routeProvider, $http, config) {
	  $routeProvider.when('/student-groups', {
	    templateUrl: 'views/student-groups.html',
	    controller: 'StudentGroupsController'
	  });
	}])

	 .controller('StudentGroupsController', ['$scope', 'FileUploader','questionAPI', 'courseAPI',
         function($scope,FileUploader,questionAPI, courseAPI) {


	 	//Begin the controller
	 	var begin = function() {

	 		$scope.teachers = [];
	 		$scope.years = yearsRange(2012, 2017);
	 		loadTeacher();

	 	}


	 	//Load all the teachers from DB
	 	var loadTeacher = function () {

	 		questionAPI.getTeachers().then(function(data, status) {
	 			$scope.teachers = data;
	 		});

	 	}

        $scope.addCourse = function(group, file){

            console.log(group);
            console.log(file);
            courseAPI.saveCourse(group);
            delete $scope.group;
        }

        $scope.test = function(){
            console.log("EITA");
        }

	 	$scope.addClass = function(group){

	 		var queueFile = uploader.getNotUploadedItems();

	 		var newClass = {id : group.id, year : group.year, semester: group.semester, 
	 						teacher: group.teacher, file: queueFile[0] };
	 						
	 		console.log(newClass);

	 		uploader.uploadAll()

	 	}


	 	//range for inputs
	 	var yearsRange = function(min, max){
	 		var input = [];
	 		for(var i = max; i >= min; i--)
	 			input.push(i);
	 		return input;
	 	}

	 	begin();



        var uploader = $scope.uploader = new FileUploader({
            url: 'upload.php'
        });


        // FILTERS
      
        // a sync filter
        uploader.filters.push({
            name: 'syncFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                console.log('syncFilter');
                return this.queue.length < 10;
            }
        });
      
        // an async filter
        uploader.filters.push({
            name: 'asyncFilter',
            fn: function(item /*{File|FileLikeObject}*/, options, deferred) {
                console.log('asyncFilter');
                setTimeout(deferred.resolve, 1e3);
            }
        });

        // CALLBACKS

        uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
            console.info('onWhenAddingFileFailed', item, filter, options);
        };
        uploader.onAfterAddingFile = function(fileItem) {
            console.info('onAfterAddingFile', fileItem);
        };
        uploader.onAfterAddingAll = function(addedFileItems) {
            console.info('onAfterAddingAll', addedFileItems);
        };
        uploader.onBeforeUploadItem = function(item) {
            console.info('onBeforeUploadItem', item);
        };
        uploader.onProgressItem = function(fileItem, progress) {
            console.info('onProgressItem', fileItem, progress);
        };
        uploader.onProgressAll = function(progress) {
            console.info('onProgressAll', progress);
        };
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
        };
        uploader.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };
        uploader.onCancelItem = function(fileItem, response, status, headers) {
            console.info('onCancelItem', fileItem, response, status, headers);
        };
        uploader.onCompleteItem = function(fileItem, response, status, headers) {
            console.info('onCompleteItem', fileItem, response, status, headers);
        };
        uploader.onCompleteAll = function() {
            console.info('onCompleteAll');
        };

        console.info('uploader', uploader);
    }]);