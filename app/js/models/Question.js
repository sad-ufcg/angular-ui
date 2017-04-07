class Question {

	constructor(enunciado, tipo){

		this._id = 0;
		this._enunciado = enunciado; 
		this._tipoResposta = tipo; 

	}

	get id(){
		let id = this._id; 
		return id;
	}

	get enunciado(){
		return this._enunciado; 
	}

	get tipoResposta () {

		return this._tipoResposta; 

	}

}