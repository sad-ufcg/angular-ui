angular.module("myApp").factory("UserService", ['$timeout', '$q', '$filter', function($timeout, $q, $filter) {

	var _GetAll = function() {

		var deferred = $q.defer();
		deferred.resolve(getUsers());
		return deferred.promisse; 
	};


	var _GetById = function (id) {
		var deferred = $q.defer();
		var filtrad = $filter('filter')(getUsers(), {id : id});
		var user = filtrad.length ? filtrad[0] : null; 
		deferred.resolve(user);
		return deferred.promisse;

	};


	var _GetByUsername = function (username) {

		var deferred = $q.defer();
		var filtrad = $filter('filter')(getUsers(), {username : username});
		var user = filtrad.length ? filtrad[0] : null;
		deferred.resolve(user);
		return deferred.promisse;

	};

	var _Create = function (user) {
		var deferred = $q.defer();

		$timeout(function() {

			_GetByUsername(user.username).then(function (duplicated) {
				if(duplicated !== null){
					deferred.resolve({ success: false, message: "Já existe uma matricula cadastrada para " + user.username});
				}else{
					var users = getUsers();

					//mapping id for the new user
					 var lastUser = users[users.length - 1] || { id: 0 };
                     user.id = lastUser.id + 1;

                     users.push(user);
                     setUsers(users);
                     deferred.resolve({ success: true});
				}
			});

		}, 1000);
		return deferred.promisse; 

	};

	var _Update = function (user) {
		var deferred = $q.defer();

        var users = getUsers();
        for (var i = 0; i < users.length; i++) {
            if (users[i].id === user.id) {
                users[i] = user;
                break;
            }
        }
        setUsers(users);
        deferred.resolve();

        return deferred.promise;
	};

	var _Delete = function (id) {

		var deferred = $q.defer();

        var users = getUsers();
        for (var i = 0; i < users.length; i++) {
            var user = users[i];
            if (user.id === id) {
                users.splice(i, 1);
                break;
            }
        }
        setUsers(users);
        deferred.resolve();

        return deferred.promise;
	};

	var getUsers = function () {
		if(!localStorage.users){
                localStorage.users = JSON.stringify([]);
        }

        return JSON.parse(localStorage.users);
	};

	var setUsers = function (users) {
		localStorage.users = JSON.stringify(users);
	}

	return {
		GetAll : _GetAll,
		GetById : _GetById, 
		GetByUsername : _GetByUsername,
		Create : _Create, 
		Update : _Update, 
		Delete : _Delete
	}

}])