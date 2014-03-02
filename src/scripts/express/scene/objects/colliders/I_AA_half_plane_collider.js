var IAAHalfPlaneCollider = function () {
	this.aaHalfPlane = new AAHalfPlane();
};

IAAHalfPlaneCollider.prototype = {
	constructor: IAAHalfPlaneCollider,
	
	isInstanceOf : function(obj){
		return 	(obj === IAAHalfPlaneCollider ? true : false);
	}
}