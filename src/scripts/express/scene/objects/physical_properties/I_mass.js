var IMass = function () {
	this.mass = 0.0;
};

IMass.prototype = {
	constructor: IMass,
	
	isInstanceOf : function(obj){
		return 	obj === IMass;
	}
}