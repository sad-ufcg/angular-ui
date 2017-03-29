class Quiz {

	constructor(id, array_answers){

		this._id = id;
		this._questions = array_answers;

	}

	get id(){
		return this._id;
	}

	get questions(){
		return this._questions;
	}

}