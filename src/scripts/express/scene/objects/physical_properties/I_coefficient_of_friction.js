var ICoefficientOfFriction = function () {
	this.coefficientOfFriction = 0.0;
};

ICoefficientOfFriction.prototype = {
	constructor: ICoefficientOfFriction,
	
	isInstanceOf : function(obj){
		return 	(obj === ICoefficientOfFriction ? true : false);
	}
}