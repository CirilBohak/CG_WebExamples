var HalfPlane = function () {
	this.distance = 0.0;
	this.normal = new Vector3();
};

HalfPlane.halfPlaneWithNormal = function(normal, distance){
	return new HalfPlane().initWithNormal(normal, distance);
},

HalfPlane.prototype = {
	constructor: HalfPlane,
	
	initWithNormal: function(normal, distance){
		this.distance = distance;
		this.normal.setVector(normal);
		return this;
	},
	
	setNormal: function(vector){
		this.normal.setVector(vector);
		if(this.normal.length() != 1) this.normal.normalize();
	},
	
	isInstanceOf : function(obj){
		return 	obj === HalfPlane;
	}
}