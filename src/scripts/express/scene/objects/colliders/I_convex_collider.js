var IConvexCollider = function () {
	this.bounds = new ConvexPolygon();
};

IConvexCollider.prototype = {
	constructor: IConvexCollider,
	
	isInstanceOf : function(obj){
		return 	obj === IConvexCollider;
	}
}