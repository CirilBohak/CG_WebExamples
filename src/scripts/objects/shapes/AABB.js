var AABB = function(max_x, max_y, 
					min_x, min_y) {
	this.max = new Vector3(max_x || 0, max_y || 0, 0);
	this.min = new Vector3(min_x || 0, min_y || 0, 0);
};

AABB.prototype = {
	constructor: AABB,
	
	set : function(max, min){
		this.max.set(max.x, max.y, 0);
		this.min.set(min.x, min.y, 0);
	},
	
	aabb_intersect : function(aabb){
		return (this.max.x < aabb.min.x ||
				this.max.y < aabb.min.y ||
				this.max.z < aabb.min.z ||
				this.min.x > aabb.max.x ||
				this.min.y > aabb.max.y ||
				this.min.z > aabb.max.z) ? false : true;
	},
	
	point_intersect : function(point){
		return (this.max.x < point.x ||
				this.max.y < point.y ||
				this.max.z < point.z ||
				this.min.x > point.x ||
				this.min.y > point.y ||
				this.min.z > point.z) ? false : true;
	}
};