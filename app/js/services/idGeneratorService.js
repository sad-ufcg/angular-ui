angular.module("myApp.create").provider("idGenerator", function() {

	this.$get = function () {

		return {

			generate: function () {

				return Math.floor(Math.random() * 23695) | 1
			}

		};

	};

});