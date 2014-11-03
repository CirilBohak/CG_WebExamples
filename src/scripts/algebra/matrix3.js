// auxiliary class for Matrix
var Matrix3 = function(n11, n12, n13, n21, n22, n23, n31, n32, n33) {
	this.n = 3; /*dimension*/
	this.m = this.n;
	this.MD_Array = [[ ( n11 !== undefined ) ? n11 : 1, n12 || 0, n13 || 0],  /*set with variables*/
					 [ n21 || 0, ( n22 !== undefined ) ? n22 : 1, n23 || 0],  /*if non set, array will be identity*/
					 [ n31 || 0, n32 || 0, ( n33 !== undefined ) ? n33 : 1]];
}

Matrix3.prototype = {
	constructor: Matrix3,
	
	/*****************
	   SET FUNCTIONS
	******************/
	
	set : function(n11, n12, n13, n21, n22, n23, n31, n32, n33) {
		var m = this.MD_Array;
		
		m[0][0] = n11; m[0][1] = n12; m[0][2] = n13;
		m[1][0] = n21; m[1][1] = n22; m[1][2] = n23;
		m[2][0] = n31; m[2][1] = n32; m[2][2] = n33;
		
		return this;
	},
	
	setWith2DArray : function(array) {
		if(typeof array[0][0] != "undefined" && array[0][0].constructor == Array && /*check if array is multi-dimensional*/
			(array.length === this.n && array[0].length === this.n)){ 				/* and size is n × n*/
			this.MD_Array = array;
			return this;
		}else throw new Error("setWith2DArray: Array is not 2D or size is not n × n or both!!");
	},
	
	identity : function() {
		for(var i=0; i<this.n; i++){
			for(var j=0; j<this.n; j++){
				if(i===j) this.MD_Array[i][j] = 1; /*set 1 on diagonal*/
				else this.MD_Array[i][j] = 0;
			}
		}
		return this;
	},
	
	/*****************
	   GET FUNCTIONS
	******************/
	
	/**********************************
	   COPY / CLONE itd... FUNCTIONS
	***********************************/
	
	clone : function() {
		var cloned = new Matrix3();
		return cloned.copy(this.MD_Array);
	},
	
	/******************
	   MATH FUNCTIONS
	*******************/
	
	//DETERMINANT
	
	determinant : function () {
		return this.detRec(this.MD_Array,this.n);
	},
	
	/*!!!!! This function should be private !!!!!*/
	detRec : function (M, N) {
		var res=0;
		
		switch(N){
			case 1: res = M[0][0]; 
					break;
			case 2: res = M[0][0]*M[1][1] - M[1][0]*M[0][1]; 
					break;
			case 3: res = M[0][0]*M[1][1]*M[2][2] + M[0][1]*M[1][2]*M[2][0] + M[0][2]*M[1][0]*M[2][1] -
						 (M[0][2]*M[1][1]*M[2][0] + M[0][1]*M[1][0]*M[2][2] + M[0][0]*M[1][2]*M[2][1]); 
					break;
			default:
				res = 0;
				
				for(var j1 = 0; j1<N; j1++){
					var m = new Array(N-1);
					for(var k = 0; k<(N-1); k++) m[k] = new Array(N-1);
					
					for(var i = 1; i<N; i++){
						var j2 = 0;
						for(var j = 0; j<N; j++){
							if(j == j1) continue;
							m[i-1][j2] = M[i][j];
							j2++;
						}
					}
					res += Math.pow(-1.0,j1 + 2.0) * M[0][j1] * this.detRec(m,N-1);
				}
		}
		
		return res;
	},
	
	//INVERSE 
	
	adjoint : function() {
		function subArray(M, i, j) {
			var tmp = new Array(this.n - 1);
			
			for(var ii=0; ii<this.n; ii++){
				if(ii == i) continue;
				
				tmp[ii > i ? ii-1 : ii] = new Array(this.n - 1);
				
				for(var jj = 0; jj<this.n; jj++){
					if(jj == j) continue;
					
					tmp[ii > i ? ii-1 : ii][jj > j ? jj - 1: jj] = M[ii][jj];
				}
			}
			return tmp;
		};
		
		var orig = this.clone(); //TODO: Find better solution for prototype extend purposes
		
		for(var ii = 0; ii<this.n; ii++){
			for(var jj = 0; jj<this.n; jj++){
				this.MD_Array[ii][jj] = Math.pow(-1.0,ii+jj) * this.detRec(subArray(orig.MD_Array, ii, jj), this.n-1);
			}
		}
		
		this.transpose();
		
		return this;
	},
	
	inverse : function(flag) {
		var orig = this.MD_Array[0].slice(0); //It should be cloned :)
		var det = 0;
		
		this.adjoint();
		
		//determinant from adjoint matrix and original matrix
		for(var i = 0; i<this.n; i++) det+=this.MD_Array[i][0]*orig[i];
		
		if(det == 0){
			var msg = "Matrix3.inverse(): can't invert matrix, determinant is 0";
			
			if(flag || false) throw new Error( msg );
			else console.warn( msg );
			
			this.identity();
			return this;
		}
		
		this.multiplyScalar( 1.0 / det );
		return this;
	},
	
	// NORMALIZE
	
	normalize : function () {
		this.inverse().transpose();

		return this;
	},
	
	/*********************
	   OTHER FUNCTIONS
	**********************/
	
	scale : function(vector){
		for(var x = 0; x<this.n; x++) this.MD_Array[0][x] *= vector.x;
		for(var y = 0; y<this.n; y++) this.MD_Array[1][y] *= vector.y;
		for(var z = 0; z<this.n; z++) this.MD_Array[2][z] *= vector.z;
		
		return this;
	},
	
	/****************************
	   VECTOR RELATED FUNCTIONS
	*****************************/
	
	//TODO: if needed!?
}

//Extend "Matrix.prototype"
Matrix3.prototype.__proto__ = Matrix.prototype;