var IRotation = function () {
	this.rotationAngle = 0.0;
};

IRotation.prototype = {
	constructor: IRotation,
	
	isInstanceOf : function(obj){
		return 	obj === IRotation;
	}
}