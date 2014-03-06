var IAngularVelocity = function () {
	this.angularVelocity = 0.0;
};

IAngularVelocity.prototype = {
	constructor: IAngularVelocity,
	
	isInstanceOf : function(obj){
		return 	obj === IAngularVelocity;
	}
}