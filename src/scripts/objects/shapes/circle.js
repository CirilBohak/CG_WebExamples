var Circle = function(x, y, r) {
	this.center = new Vector3(x, y, 0);
	this.r = r;
};

Circle.prototype = {
	constructor: Circle,
	
	set : function(max, min){
		this.max.set(max.x, max.y, 0);
		this.min.set(min.x, min.y, 0);
	},
	
	circle_intersect : function(circle){
		return this.center.distanceTo(circle.center) < (this.r + circle.r);
	},
	
	point_intersect : function(point){
		return (Math.pow(point.x - this.center.x,2) +
				Math.pow(point.y - this.center.y,2) +
				Math.pow(point.z - this.center.z,2) < (this.r * this.r));
	}
};