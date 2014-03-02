// auxiliary class for vector
var Vector3 = function(x, y, z) {
    this.x = x || 0;
    this.y = y || 0;
	this.z = z || 0;
}

Vector3.prototype = {
	constructor: Vector3,
	
	/*****************
	   SET FUNCTIONS
	******************/
	
	setScalar : function (number){
		this.x = number, this.y = number, this.z = number;
		return this;
	},
	
	setVector : function (vector){
		this.x = vector.x;
		this.y = vector.y;
		this.z = vector.z;
		return this;
	},
	
	set : function (x,y,z){
		this.x = x;
		this.y = y;
		this.z = z;
		return this;
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
	
	setAtIndex : function (index, value){
		switch(index){
			case 0: this.x = value; break;
			case 1: this.y = value; break;
			case 2: this.z = value; break;
			default: throw new Error("Index 0 = x, 1 = y, 2 = z, you tried: " + index);
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
			default: throw new Error("Index 0 = x, 1 = y, 2 = z, you tried: " + index);
		}
	},
	
	/**********************************
	   COPY / CLONE itd... FUNCTIONS
	***********************************/
	
	copy : function (vector){
		this.x = vector.x;
		this.y = vector.y;
		this.z = vector.z;
		return this;
	},
	
	clone : function (){
		return new Vector3(this.x, this.y, this.z);
	},
	
	equals : function (vector){
		return ( (vector.x === this.x) && (vector.y === this.y) && (vector.z === this.z) );
	},
	
	toArray : function (){ //Maybe there is a needed to add point to, but colour?
		return [ this.x, this.y, this.z ];
	},

	/******************
	   MATH FUNCTIONS
	*******************/
	
	//ADD
	
	add : function (vector) {
		this.x += vector.x;
		this.y += vector.y;
		this.z += vector.z;
		return this;
	},
	
	addScalar : function (number) {
		this.x += number;
		this.y += number;
		this.z += number;
		return this;
	},
	
	addVectors : function (vectorA, vectorB){
		this.x = vectorA.x + vectorB.x;
		this.y = vectorA.y + vectorB.y;
		this.z = vectorA.z + vectorB.z;
		return this;
	},
	
	//SUB
	
	sub : function (vector){
		this.x -= vector.x;
		this.y -= vector.y;
		this.z -= vector.z;
		return this;
	},
	
	subScalar : function (number) {
		this.x -= number;
		this.y -= number;
		this.z -= number;
		return this;
	},
	
	subVectors : function (vectorA, vectorB){
		this.x = vectorA.x - vectorB.x;
		this.y = vectorA.y - vectorB.y;
		this.z = vectorA.z - vectorB.z;
		return this;
	},
	
	//MULTIPLY
	
	multiply : function (vector){
		this.x *= vector.x;
		this.y *= vector.y;
		this.z *= vector.z;
		return this;
	},
	
	multiplyScalar : function (number) {
		this.x *= number;
		this.y *= number;
		this.z *= number;
		return this;
	},
	
	multiplyVectors : function (vectorA, vectorB){
		this.x = vectorA.x * vectorB.x;
		this.y = vectorA.y * vectorB.y;
		this.z = vectorA.z * vectorB.z;
		return this;
	},
	
	//DIVIDE
	
	divide : function (vector){
		this.x /= vector.x;
		this.y /= vector.y;
		this.z /= vector.z;
		return this;
	},
	
	divideScalar : function (number) {
		if(number !== 0){
			var invNumber = 1 / number;
			
			return this.multiplyScalar(invNumber);
		}else{
			return this.setScalar(0);
			console.warn("Division with zero! Vector xyz -> 0!");
		}
	},
	
	divideVectors : function (vectorA, vectorB){
		if(vectorB.x !== 0) this.x = vectorA.x / vectorB.x;
		else{
			this.x = 0;
			console.warn("Division with zero! Vector x -> 0!");
		}
		
		if(vectorB.y !== 0) this.y = vectorA.y / vectorB.y;
		else{
			this.y = 0;
			console.warn("Division with zero! Vector y -> 0!");
		}
		
		if(vectorB.z !== 0) this.z = vectorA.z / vectorB.z;
		else{
			this.z = 0;
			console.warn("Division with zero! Vector z -> 0!");
		}
		
		return this;
	},
	
	//CROSS
	
	cross : function (vector){
		var x = this.x, y = this.y, z = this.z; //This is because it is called twice for one calculation
		
		this.x = y * vector.z - z * vector.y;
		this.y = z * vector.x - x * vector.z;
		this.z = x * vector.y - y * vector.x;
		return this;
	},
	
	crossVectors : function (vectorA, vectorB){
		var Ax = vectorA.x, Ay = vectorA.y, Az = vectorA.z;
		var Bx = vectorB.x, By = vectorB.y, Bz = vectorB.z;
		
		this.x = Ay * Bz - Az * By;
		this.y = Az * Bx - Ax * Bz;
		this.z = Ax * By - Ay * Bx;
		return this;
	},
	
	//DOT
	
	dot : function (vector){
		return this.x*vector.x + this.y*vector.y + this.z*vector.z;
	},
	
	dotVectors : function (vectorA, vectorB){
		return vectorA.x*vectorB.x + vectorA.y*vectorB.y + vectorA.z*vectorB.z;
	},
	
	//ANGLE
	
	angleTo: function (vector) {
		var theta = this.dot( vector ) / ( this.length() * vector.length() );

		// clamp, to handle numerical problems
		return Math.acos(clamp(theta,-1,1));
	},
	
	//MIN / MAX / CLAMP / LERP
	
	makeMin : function (vector){
		if(this.x > vector.x) this.x = vector.x;
		if(this.y > vector.y) this.y = vector.y;
		if(this.z > vector.z) this.z = vector.z;
		return this;
	},
	
	makeMax: function (vector){
		if(this.x < vector.x) this.x = vector.x;
		if(this.y < vector.y) this.y = vector.y;
		if(this.z < vector.z) this.z = vector.z;
		return this;
	},
	
	clamp : function (vectorMin, vectorMax){ //vectorMin < vectorMax !!!!
		if(this.x < vectorMin.x) this.x = vectorMin.x;
		else if(this.x > vectorMax.x) this.x = vectorMax.x;
		
		if(this.y < vectorMin.y) this.y = vectorMin.y;
		else if(this.y > vectorMax.y) this.y = vectorMax.y;
		
		if(this.z < vectorMin.z) this.z = vectorMin.z;
		else if(this.z > vectorMax.z) this.z = vectorMax.z;
	},
	
	lerp : function (vector, alpha) {
		this.x += (vector.x - this.x) * alpha;
		this.y += (vector.y - this.y) * alpha;
		this.z += (vector.z - this.z) * alpha;
		return this;
	},
	
	// NEGATE / NORMALIZE
	
    negate : function () {
        this.x = -this.x;
        this.y = -this.y;
        this.z = -this.z;
		return this; //return this.multiplyScalar(-1);
    },
	
	normalize : function (){
		return this.divideScalar( this.length() );
	},

	//LENGTH
	
	lengthSqrt : function (){
		return this.x * this.x + this.y * this.y + this.z * this.z;
	},
	
	length : function (){
		return Math.sqrt( this.lengthSqrt() );
	},
	
	lengthManhattan : function (){
		return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
	},
	
	setLength : function (number){
		var oldLength = this.length();
		if(oldLength !== 0 && number !== oldLength) this.multiplyScalar(number/oldLength);
		return this;
	},
	
	//DISTANCE
	
	distanceToSqrt : function (vector){
		var Dx = this.x - vector.x;
		var Dy = this.y - vector.y;
		var Dz = this.z - vector.z;
		
		return Dx*Dx + Dy*Dy + Dz*Dz;
	},
	
	distanceTo: function (vector){
		return Math.sqrt( this.distanceToSqrt(vector) );
	},
	
	/************************
	   QUATERNION FUNCTIONS
	*************************/
	
		//TODO: applyQuaternion
		//TODO: Euler.setFromQuaternion()
	
	/********************
	   EULER FUNCTIONS
	*********************/
	
		//TODO: Euler.setFromRotationMatrix()
	
	/****************************
	   MATRIX RELATED FUNCTIONS
	*****************************/
	
	//GET
	
	getColumnFromMatrix: function ( index, matrix ) {
		if(index > matrix.n || index < -1) throw new Error("Matrix does not contain this column!!!");
		var m = matrix.MD_Array;
		
		this.x = m[0][index];
		this.y = m[1][index];
		this.z = m[2][index];
		
		return this;
	},
	
	getPositionFromMatrix: function ( matrix ) {
		var m = matrix.MD_Array;
		
		this.x = m[3][0];
		this.y = m[3][1];
		this.z = m[3][2];
		
		return this;
	},
	
	getScaleFromMatrix: function ( matrix ) {
		var m = matrix.MD_Array;
		
		var sx = this.set( m[0][0], m[0][1], m[0][2] ).length();
		var sy = this.set( m[1][0], m[1][1], m[1][2] ).length();
		var sz = this.set( m[2][0], m[2][1], m[2][2] ).length();
		
		this.x = sx;
		this.y = sy;
		this.z = sz;
		
		return this;
	},
	
	//APPLY
	
	applyMatrix: function ( matrix ) {
		// input: THREE.Matrix4 affine matrix
		// vector interpreted as a direction
		
		var x = this.x, y = this.y, z = this.z;
		var m = matrix.MD_Array;
		
		this.x = m[0][0] * x + m[1][0] * y + m[2][0] * z;
		this.y = m[0][1] * x + m[1][1] * y + m[2][1] * z;
		this.z = m[0][2] * x + m[1][2] * y + m[2][2] * z;
		
		return this;
	},
	
	applyProjection: function ( matrix ) {
		// input: THREE.Matrix4 projection matrix
		
		var x = this.x, y = this.y, z = this.z;
		var m = matrix.MD_Array;
		
		var d = 1 / ( m[0][3] * x + m[1][3] * y + m[2][3] * z + m[3][3] ); // perspective divide
		
		this.x = ( m[0][0] * x + m[1][0] * y + m[2][0] * z + m[3][0] ) * d;
		this.y = ( m[0][1] * x + m[1][1] * y + m[2][1] * z + m[3][1] ) * d;
		this.z = ( m[0][2] * x + m[1][2] * y + m[2][2] * z + m[3][2] ) * d;
		
		return this;
	},
	
	transformDirection: function ( matrix ) { return this.applyMatrix( matrix ).normalize(); }
}

//Extend "Vector.prototype"
Vector3.prototype.__proto__ = {
		//TODO: applyEuler
		//TODO: applyAxisAngle

	projectOnVector: function () {
		var v1 = new Vector3();
		
		return function ( vector ) {
			v1.copy( vector ).normalize();
			var d = this.dot( v1 );
			return this.copy( v1 ).multiplyScalar( d );
		};
	}(),

	projectOnPlane: function () {
		var v1 = new Vector3();
		
		return function ( planeNormal ) {
			v1.copy( this ).projectOnVector( planeNormal );
			return this.sub( v1 );
		}
	}(),

	reflect: function () {
		var v1 = new Vector3();
		
		return function ( vector ) {
		    v1.copy( this ).projectOnVector( vector ).multiplyScalar( 2 );
		    return this.subVectors( v1, this );
		}
	}()
};