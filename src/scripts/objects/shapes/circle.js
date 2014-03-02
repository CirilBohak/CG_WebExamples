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
	},
	
	line_intersect : function(pointA, pointB){
		var x1 = pointA.x - this.center.x,
			y1 = pointA.y - this.center.y;
		var x2 = pointB.x - this.center.x,
			y2 = pointB.y - this.center.y;
		
		var dx = x2 - x1,
			dy = y2 - y1;
		var dr = Math.sqrt(dx*dx + dy*dy);
		var D = x1 * y2 - x2 * y1;
		
		return ((this.r * this.r * 0.81) * (dr * dr) - (D * D)) >= 0;
	}
};