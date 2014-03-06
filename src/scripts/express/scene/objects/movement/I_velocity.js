var IVelocity = function () {
	this.velocity = new Vector3();
};

IVelocity.prototype = {
	constructor: IVelocity,
	
	isInstanceOf : function(obj){
		return 	obj === IVelocity;
	}
}