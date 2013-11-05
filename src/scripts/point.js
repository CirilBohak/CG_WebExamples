// auxiliary class for point
var Point = function(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
};

Point.prototype = {
	constructor: Point,
	
	setXYZ : function(x,y,z) {
		this.x = x;
		this.y = y;
		this.z = z;
    },
	
	draw : function() {
        var pt = gridToCanvasTransform(this);
        proc.ellipse(pt.x, pt.y, 5, 5);
    }
}