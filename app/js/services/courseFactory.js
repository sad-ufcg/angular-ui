angular.module("myApp").factory("courseAPI", function ($http, $q, config) {

	var _saveCourse = function(group){

		group.id = _generateId(group);
		
		return $http.post(config.baseUrl + "/course", JSON.stringify(group)); 


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