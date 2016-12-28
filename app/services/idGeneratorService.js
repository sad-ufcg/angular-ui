angular.module("myApp.create").provider("idGenerator", function() {

	this.$get = function () {

		return {

			generate: function () {

				var id = "";

				while(id.length < 15) {

					id += String.fromCharCode(Math.floor(Math.random() * 64 ) + 32);

				}
				return id; 
			}

		};

	};

});