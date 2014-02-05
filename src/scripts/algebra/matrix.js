// auxiliary class for Matrix
var Matrix = function(n,m) {
	this.n = n || 0; /*dimension*/
	this.m = m || 0;
	
	this.MD_Array = new Array(m);
	for(var i=0; i<m; i++){ 
		this.MD_Array[i] = new Array(n);
		for(var j=0; j<n; j++){
			this.MD_Array[i][j] = Math.floor((Math.random()*100)-50); //Random between -50 and +50
		}
	}
}

Matrix.prototype = {
	constructor: Matrix,
	
	/*****************
	   SET FUNCTIONS
	******************/
	
	/*****************
	   GET FUNCTIONS
	******************/
	
	get1D_array : function(){ //Only because three.js is using 1D array for matrix representation
		var array = new Array(this.n*this.m);
		for(var i=0; i<this.m; i++){
			for(var j=0; j<this.n; j++){
				array[(i*this.n)+j] = this.MD_Array[i][j];
			}
		}
		return array;
	},
	
	/**********************************
	   COPY / CLONE itd... FUNCTIONS
	***********************************/
	
	copy : function(array) {
		if(typeof array !== 'undefined' && array.length === this.m && /*check if array is multi-dimensional*/
		   typeof array[0] !== 'undefined' && array[0].length === this.n){ /* and size is n × n*/
			
			for(var i=0; i<this.m; i++){
				for(var j=0; j<this.n; j++){
					this.MD_Array[i][j] = array[i][j];
				}
			}
			
			return this;
		}else throw new Error("copy: Incorrect size!!");
	},
	
	clone : function() {
		var cloned = new Matrix(this.n, this.m);
		return cloned.copy(this.MD_Array);
	},
	
	/******************
	   MATH FUNCTIONS
	*******************/
	
	//ADD
	
	add : function(matrix) {
		if(this.n !== matrix.n || this.m !== matrix.m) throw new Error("add: Incorrect size!!");
		
		for(var i=0; i<this.m; i++){
			for(var j=0; j<this.n; j++){
				this.MD_Array[i][j] += matrix.MD_Array[i][j];
			}
		}
	},
	
	//SUB
	
	sub : function(matrix) {
		if(this.n !== matrix.n || this.m !== matrix.m) throw new Error("sub: Incorrect size!!");
		
		for(var i=0; i<this.m; i++){
			for(var j=0; j<this.n; j++){
				this.MD_Array[i][j] -= matrix.MD_Array[i][j];
			}
		}
	},
	
	//MULTIPLY
	
	multiply : function(matrix) {
		if(this.n !== matrix.m) throw new Error("multiply: Incorrect size or incorrect multiplication order!!");
		
		var orig = this.clone();
		
		if(this.n !== matrix.n){ //Correct result matrix size
			this.n = matrix.n;
			for(var i=0; i<this.m; i++) this.MD_Array[i].length = this.n;
		}
		
		for(var i=0; i<this.m; i++){
			for(var j=0; j<this.n; j++){
				this.MD_Array[i][j] = 0;
				for(var k=0; k<this.m; k++){
					this.MD_Array[i][j] += orig.MD_Array[i][k]*matrix.MD_Array[k][j];
				}
			}
		}
		
		return this;
	},
	
	multiplyMatrices : function (matrixA, matrixB){
		if(matrixA.n !== matrixB.m) throw new Error("multiply: Incorrect size or incorrect multiplication order!!");
		
		if(matrixA.n !== matrixB.n || matrixB.n !== this.n){ //Correct result matrix size
			this.n = matrixB.n; this.m = matrixA.m;
			this.MD_Array.length = this.m;
			for(var i=0; i<this.m; i++) this.MD_Array[i] = new Array(this.n);
		}
		
		for(var i=0; i<this.m; i++){
			for(var j=0; j<this.n; j++){
				this.MD_Array[i][j] = 0;
				for(var k=0; k<this.m; k++){
					this.MD_Array[i][j] += matrixA.MD_Array[i][k]*matrixB.MD_Array[k][j];
				}
			}
		}
		
		return this;
	},
	
	multiplyScalar : function(number) {
		for(var i=0; i<this.m; i++){
			for(var j=0; j<this.n; j++){
				this.MD_Array[i][j] *= number;
			}
		}
	},
	
	//DIVIDE
	
	divideScalar : function(number) {
		return this.multiplyScalar(1/number);
	},
	
	//TRANSPOSE
	
	transpose : function() {
		var orig = this.clone();
		
		if(this.n !== this.m){ //Correct orig matrix size
			this.n = orig.m; this.m = orig.n;
			
			this.MD_Array.length = this.m;
			for(var i=0; i<this.m; i++) this.MD_Array[i] = new Array(this.n);
		}
	
		for(var i=0; i<this.m; i++){
			for(var j=0; j<this.n; j++){
				this.MD_Array[i][j] = orig.MD_Array[j][i];
			}
		}
		
		return this;
	},
	
	// NEGATE
    
	negate : function(){
		this.multiplyScalar( -1 );
		
		return this;
	}
}