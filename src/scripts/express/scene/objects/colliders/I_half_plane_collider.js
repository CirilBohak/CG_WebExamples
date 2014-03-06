var IHalfPlaneCollider = function () {
	this.halfPlane = new HalfPlane();
};

IHalfPlaneCollider.prototype = {
	constructor: IHalfPlaneCollider,
	
	isInstanceOf : function(obj){
		return 	obj === IHalfPlaneCollider;
	}
}