var Color = function(r, g, b, a) {
	//Vector3.call( this, x,y,z );
	this.r = r || 0;
	this.g = g || 0;
	this.b = b || 0;
	this.a = a || 255;
};

Color.prototype = {
	constructor: Color,
	
	/*****************
	   SET FUNCTIONS
	******************/
	setColor : function (vector){
		this.r = vector.x;
		this.g = vector.y;
		this.b = vector.z;
		this.a = ( vector.w !== undefined ) ? vector.w : 255;
		return this;
	},
	
	setColor : function (r,g,b,a){
		this.r = r;
		this.g = g;
		this.b = b;
		this.a = a || 255;
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
	
	setColorA : function (a){
		this.a = a;
		return this;
	}
	
	/*********************************
	   ADD FUNCTIONS FOR HSV,HSL,...
	**********************************/
	
	/*TODO*/
}

//Extend "Vector.prototype"
//Vector4.prototype.__proto__ = Vector3.prototype;