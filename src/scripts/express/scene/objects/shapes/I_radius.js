var IRadius = function () {
	this.radius = 0.0;
};

IRadius.prototype = {
	constructor: IRadius,
	
	isInstanceOf : function(obj){
		return 	(obj === IRadius ? true : false);
	}
}