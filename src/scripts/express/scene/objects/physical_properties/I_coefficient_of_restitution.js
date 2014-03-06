var ICoefficientOfRestitution = function () {
	this.coefficientOfRestitution = 0.0;
};

ICoefficientOfRestitution.prototype = {
	constructor: ICoefficientOfRestitution,
	
	isInstanceOf : function(obj){
		return 	obj === ICoefficientOfRestitution;
	}
}