angular.module("myApp").factory("courseAPI", function ($http, $q, config) {

	var _saveCourse = function(group){

		
		var course = _createCourse(_generateId(group), group.matter, group.number, group.teacher, 
			group.semester);


		return $http.post(config.baseUrl + "/course", JSON.stringify(course)); 


	}


	var _createCourse = function(id, name, courseNumber, teacher, semester){

		return{
			id : id,
			name: name, 
			courseNumber: courseNumber,
			teacher : teacher, 
			semester : semester
		};

	}

	var _generateId = function(group) {

		var aux = group.matter.split(" ");
		if(aux.length ==1){
			var id = aux[0];
		}
		else{
			var id = "";
			aux.forEach(function(name){
				id += name;
			});
		}
		id = id.toLowerCase();
		id = id + group.number + group.year + group.semester; 
		return id; 

	}

	return {

		saveCourse : _saveCourse
	}




})