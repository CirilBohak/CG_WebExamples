// auxiliary class for point
var Point = function(x, y, z) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
};

Point.prototype = {
	constructor: Point,
	
	setFromVector : function(vector){
		if(vector instanceof Vector === true){
			this.setXYZ(vector.x, vector.y, vector.z);
			return this;
		}else throw new Error("Input is not Vector!");
	},
	
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