var IPosition = function () {
	this.position = new Vector3();
};

IPosition.prototype = {
	constructor: IPosition,
	
	isInstanceOf : function(obj){
		return 	obj === IPosition;
	}
}