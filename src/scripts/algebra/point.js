// auxiliary class for point
var Point = function(x, y, z, r, g, b) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
	
	//Maybe we can find a better solution for colours??? 
	this.r = r || 0;
	this.g = g || 0;
	this.b = b || 0;
};

Point.prototype = {
	constructor: Point,
	
	/*****************
	   SET FUNCTIONS
	******************/
	setFromVector : function(vector){
		if(vector instanceof Vector === true){
			this.setXYZ(vector.x, vector.y, vector.z);
			return this;
		}else throw new Error("Input is not Vector!");
	},
	
	set : function(x,y,z) {
		this.x = x;
		this.y = y;
		this.z = z;
    },
	
	setX : function (x){
		this.x = x;
		return this;
	},
	
	setY : function (y){
		this.y = y;
		return this;
	},
	
	setZ : function (z){
		this.z = z;
		return this;
	},
	
	//COLOUR
	setColor : function (vector){ //try to fix with color.js
		this.r = vector.x;
		this.g = vector.y;
		this.b = vector.y;
		return this;
	},
	
	setColor : function (r,g,b){
		this.r = r;
		this.g = g;
		this.b = b;
		return this;
	},
	
	setColorR : function (r){
		this.r = r;
		return this;
	},
	
	setColorG : function (g){
		this.g = g;
		return this;
	},
	
	setColorB : function (b){
		this.b = b;
		return this;
	},
	
	/****************************
	   PROCESSING DRAW FUNCTION
	*****************************/
	draw : function() {
        var pt = gridToCanvasTransform(this);
		proc.stroke(this.r, this.g, this.b);
        proc.ellipse(pt.x, pt.y, 5, 5);
    }
}