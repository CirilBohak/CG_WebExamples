// auxiliary class for vector
var Vector = function(x, y, z, lx, ly, lz, color, color1, color2) {
    this.x = x;
    this.y = y;
	this.z = z;
	
    this.loc = new Point(0,0);
	if (lx !== undefined) this.loc.setXYZ(lx,ly,lz);
	
	this.color = this.color1 = this.color2 = 0;
	
    if (color !== undefined) this.color = color;
    if (color1 !== undefined) this.color1 = color;
    if (color2 !== undefined) this.color2 = color;
}

Vector.prototype = {
	constructor: Vector,
	
	// negation function
    negate : function() {
        this.x = -this.x;
        this.y = -this.y;
        updateVectors(true); //Function in separate scripts
    },

    // draw function for drawing the vector
    draw : function() {
        var c_loc = gridToCanvasTransform(new Point(this.loc.x, this.loc.y));
        var toX = c_loc.x + this.x * unit;
        var toY = c_loc.y - this.y * unit;
		proc.stroke(this.color, this.color1, this.color2);
        proc.line(c_loc.x, c_loc.y, toX, toY);
        
        var headLen = 14;
        var angle = Math.atan2(toY-c_loc.y,toX-c_loc.x);

        proc.line(toX, toY, toX - headLen * Math.cos(angle - Math.PI / 8), toY - headLen * Math.sin(angle - Math.PI / 8));
        proc.line(toX, toY, toX - headLen * Math.cos(angle + Math.PI / 8), toY - headLen * Math.sin(angle + Math.PI / 8));
    }
}
