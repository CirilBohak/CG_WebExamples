var IAngularMass = function () {
	this.angularMass = 0.0;
};

IAngularMass.prototype = {
	constructor: IAngularMass,
	
	isInstanceOf : function(obj){
		return 	obj === IAngularMass;
	}
}