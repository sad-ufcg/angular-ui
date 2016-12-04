var http = require('http');

var createRouter = function(port){


	var routes = {
		GET: {},
		POST: {}

	};

	var get = function (path, fn){
		routes['GET'][path] = fn;


	}

	var post = function(path, fn){
		routes['POST'][path] = fn;
	}




	http.createServer(function(req, res){
		res.setHeader('Acess-Control-Allow-Origin', '*');
		if(!routes[req.method][req.url]) return res.end();
		routes[req.method][req.url](req, res);
	}).listen(port);

	return {
		get: get,
		post: post
	};


};

module.exports = createRouter;