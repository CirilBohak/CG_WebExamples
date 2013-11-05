// auxiliary class for vector
var Vector = function(x, y, lx, ly, color, color1, color2) {
    this.x = x;
    this.y = y;

    this.locX = 0;
    this.locY = 0;
    if (lx !== undefined) {
        this.locX = lx;
        this.locY = ly;
    }
	
	this.color=0;
	this.color1=0;
	this.color2=0;
    if (color !== undefined) {
        this.color = color;
    }	
    if (color1 !== undefined) {
        this.color1 = color;
    }	
    if (color2 !== undefined) {
        this.color2 = color;
    }	

    // negation function
    this.negate = function() {
        this.x = -this.x;
        this.y = -this.y;
        updateVectors(true);
    };

    // draw function for drawing the vector
    this.draw = function() {
        var loc = gridToCanvasTransform(new Point(this.locX, this.locY));
        var toX = loc.x + this.x * unit;
        var toY = loc.y - this.y * unit;
		proc.stroke(this.color, this.color1, this.color2);
        proc.line(loc.x, loc.y, toX, toY);
        
        var headLen = 14;
        var angle = Math.atan2(toY-loc.y,toX-loc.x);

        proc.line(toX, toY, toX - headLen * Math.cos(angle - Math.PI / 8), toY - headLen * Math.sin(angle - Math.PI / 8));
        proc.line(toX, toY, toX - headLen * Math.cos(angle + Math.PI / 8), toY - headLen * Math.sin(angle + Math.PI / 8));
    };
}
