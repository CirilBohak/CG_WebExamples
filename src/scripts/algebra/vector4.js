// auxiliary class for vector
var Vector4 = function(x, y, z, w) {
	Vector3.call( this, x,y,z );
	this.w = ( w !== undefined ) ? w : 1;
}

Vector4.prototype = {
	constructor: Vector4,
	
	/*****************
	   SET FUNCTIONS
	******************/
	
	set : function(x,y,z,w){
		Vector3.prototype.set.call(this, x, y, z);
		this.w = w;
		return this;
	},
	
	setW : function(w){
		this.w = w;
		return this;
	},
	
	setAtIndex : function (index, value){
		switch(index){
			case 0: this.x = value; break;
			case 1: this.y = value; break;
			case 2: this.z = value; break;
			case 3: this.w = value; break;
			default: throw new Error("Index 0 = x, 1 = y, 2 = z, 3 = w, you tried: " + index);
		}
	},
	
	/*****************
	   GET FUNCTIONS
	******************/
	
	getAtIndex : function (index){
		switch(index){
			case 0: return this.x;
			case 1: return this.y;
			case 2: return this.z;
			case 3: return this.w;
			default: throw new Error("Index 0 = x, 1 = y, 2 = z, 3 = w, you tried: " + index);
		}
	},
	
	/**********************************
	   COPY / CLONE itd... FUNCTIONS
	***********************************/
	
	copy : function (vector){
		Vector3.prototype.copy.call(this, vector);
		
		this.w = ( vector.w !== undefined ) ? vector.w : 1;
		return this;
	},
	
	clone : function (){
		return new Vector4(this.x, this.y, this.z, this.w);
	},
	
	equals : function (vector){
		return ( Vector3.prototype.equals.call(this, vector) && (vector.w === this.w) );
	},
	
	toArray : function (){
		return [ this.x, this.y, this.z, this.w ];
	},
	
	/******************
	   MATH FUNCTIONS
	*******************/
	
	//ADD
	
	/*add : function (vector) {
		Vector3.prototype.add.call(this, vector);
		
		this.w += vector.w;
		return this;
	},
	
	addScalar : function (number) {
		Vector3.prototype.addScalar.call(this, number);
		
		this.w += number;
		return this;
	},
	
	addVectors : function (vectorA, vectorB){
		Vector3.prototype.addVectors.call(this, vectorA, vectorB);
		
		this.w = vectorA.w + vectorB.w;
		return this;
	},
	
	//SUB
	
	sub : function (vector){
		Vector3.prototype.sub.call(this, vector);
		
		this.w -= vector.w;
		return this;
	},
	
	subScalar : function (number) {
		Vector3.prototype.subScalar.call(this, number);
		
		this.w -= number;
		return this;
	},
	
	subVectors : function (vectorA, vectorB){
		Vector3.prototype.subVectors.call(this, vectorA, vectorB);
		
		this.w = vectorA.w - vectorB.w;
		return this;
	},
	
	//MULTIPLY
	
	multiply : function (vector){
		Vector3.prototype.multiply.call(this, vector);
		
		this.w *= vector.w;
		return this;
	},
	
	multiplyScalar : function (number) {
		Vector3.prototype.multiplyScalar.call(this, number);
		
		this.w *= number;
		return this;
	},
	
	multiplyVectors : function (vectorA, vectorB){
		Vector3.prototype.multiplyVectors.call(this, vectorA, vectorB);
		
		this.w = vectorA.w * vectorB.w;
		return this;
	},
	
	//DIVIDE
	
	divide : function (vector){
		Vector3.prototype.divide.call(this, vector);
		this.w /= vector.w;
		return this;
	},
	
	divideVectors : function (vectorA, vectorB){
		Vector3.prototype.divideVectors.call(this, vectorA, vectorB);
		
		if(vectorB.w !== 0) this.w = vectorA.w / vectorB.w;
		else{
			this.w = 0;
			console.warn("Division with zero! Vector w -> 0!");
		}
		
		return this;
	},
	
	//DOT
	
	dot : function (vector){
		return Vector3.prototype.dot.call(this, vector) + this.w*vector.w;
	},
	
	dotVectors : function (vectorA, vectorB){
		return Vector3.prototype.dotVectors.call(this, vectorA, vectorB) + vectorA.w*vectorB.w;
	},
	
	//MIN / MAX / CLAMP / LERP
	
	makeMin : function (vector){
		Vector3.prototype.makeMin.call(this, vector);
		
		if(this.w > vector.w) this.w = vector.w;
		return this;
	},
	
	makeMax: function (vector){
		Vector3.prototype.makeMax.call(this, vector);
		
		if(this.w < vector.w) this.w = vector.w;
		return this;
	},
	
	clamp : function (vectorMin, vectorMax){ //vectorMin < vectorMax !!!!
		Vector3.prototype.clamp.call(this, vectorMin, vectorMax);
		
		if(this.w < vectorMin.w) this.w = vectorMin.w;
		else if(this.w > vectorMax.w) this.w = vectorMax.w;
	},
	
	lerp : function (vector, alpha) {
		Vector3.prototype.lerp.call(this, vector, alpha);
		
		this.w += (vector.w - this.w) * alpha;
		return this;
	},
	
	// NEGATE / NORMALIZE
	
	negate : function () {
		Vector3.prototype.negate.call(this);
		
        this.w = -this.w;
		return this; //return this.multiplyScalar(-1);
    },
	
	//LENGTH
	
	lengthSqrt : function (){
		return Vector3.prototype.lengthSqrt.call(this) + this.w * this.w;
	},
	
	lengthManhattan : function (){
		return Vector3.prototype.lengthManhattan.call(this) + Math.abs(this.w);
	},
	
	//DISTANCE
	
	distanceToSqrt : function (vector){
		var Dw = this.w - vector.w;
		
		return Vector3.prototype.distanceToSqrt.call(this, vector) + Dw*Dw;
	},*/
	
	/************************
	   QUATERNION FUNCTIONS
	*************************/
		
		//TODO: setAxisAngleFromQuaternion
	
	/****************************
	   MATRIX RELATED FUNCTIONS
	*****************************/
	
	applyMatrix: function ( matrix ) {
		Vector3.prototype.applyMatrix.call(this, matrix);
		var w = this.w;
		
		this.x += m[3][0] * w; this.y += m[3][1] * w; this.z += m[3][2] * w;
		this.w = m[0][3] * x + m[1][3] * y + m[2][3] * z + m[3][3] * w;
		
		return this;
	}
}

//Extend "Vector.prototype"
Vector4.prototype.__proto__ = Vector3.prototype;