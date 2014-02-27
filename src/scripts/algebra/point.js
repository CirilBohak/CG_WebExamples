// auxiliary class for point
var Point = function(x, y, z) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
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
	
	/**********************************
	   COPY / CLONE itd... FUNCTIONS
	***********************************/
	
	copy : function (point){
		this.x = point.x;
		this.y = point.y;
		this.z = point.z;
		return this;
	},
	
	clone : function (){
		return new Point(this.x, this.y, this.z);
	},
	
	/******************
	   MATH FUNCTIONS
	*******************/
	
	//ADD
	
	add : function (point) {
		this.x += point.x;
		this.y += point.y;
		this.z += point.z;
		return this;
	},
}