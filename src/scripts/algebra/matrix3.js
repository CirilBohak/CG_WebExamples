// auxiliary class for Matrix
var Matrix3 = function(n11, n12, n13, n21, n22, n23, n31, n32, n33) {
	this.n = 3; /*dimension*/
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
		this.MD_Array = [[n11, n12, n13],
						 [n22, n23, n31],
						 [n31, n32, n33]];
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
	
	get : function (i, j){ /*It can stay, but only if needed*/
		return this.MD_Array[i][j];
	},
	
	/**********************************
	   COPY / CLONE itd... FUNCTIONS
	***********************************/
	
	copy : function(array) {
		if(typeof array !== 'undefined' && array.length === this.n && /*check if array is multi-dimensional*/
		   typeof array[0] !== 'undefined' && array[0].length === this.n){ /* and size is n × n*/
			
			for(var i=0; i<this.n; i++){
				for(var j=0; j<this.n; j++){
					this.MD_Array[i][j] = array[i][j];
				}
			}
			
			return this;
		}else throw new Error("copy: Array is not 2D or size is not n × n or both!!");
	},
	
	clone : function() {
		var cloned = new Matrix3();
		cloned = cloned.copy(this.MD_Array);
		return cloned;
	},
	
	/******************
	   MATH FUNCTIONS
	*******************/
	
	//ADD
	
		//%TODO: ....
	
	//SUB
	
		//%TODO: ....
	
	//MULTIPLY
	
	multiplyScalar : function(number) {
		for(var i=0; i<this.n; i++){
			for(var j=0; j<this.n; j++){
				this.MD_Array[i][j] *= number;
			}
		}
	},
	
	//DEVIDE
	
		//%TODO: ....
	
	//DETERMINANT
	
	determinant: function () {
		var det = 0;
		
		//diagonals from left
		for(var i=0; i<this.n; i++){
			var tmp = 1; /*For diagonal multiplication*/
			for(var j=0, ji = 0; j<this.n; j++){ /*Indexing from left*/
				if((ji = j+i) >= this.n) ji -= this.n; /*For correcting diagonal index*/
				
				tmp *= this.MD_Array[j][ji]; /*Diagonal multiplication*/
			}
			det += tmp; /*Add current diagonal to determinant calculation*/
		}
		
		//diagonals from right
		for(var i=this.n - 1; i >=0 ; i--){
			var tmp = 1; /*For diagonal multiplication*/
			for(var j=0, ij = 0; j<this.n; j++){ /*Indexing from left*/
				if((ij = i-j) < 0) ij += this.n; /*For correcting diagonal index*/
				
				tmp *= this.MD_Array[j][ij]; /*Diagonal multiplication*/
			}
			det -= tmp; /*Subtract current diagonal from determinant calculation*/
		}
		
		return det;
	},
	
	//TRANSPOSE / INVERSE 
	
	transpose : function() {
		for(var i=0; i<this.n; i++){
			for(var j=i; j<this.n; j++){
				if(i!==j){
					var tmp = this.MD_Array[i][j];
					this.MD_Array[i][j] = this.MD_Array[j][i];
					this.MD_Array[j][i] = tmp;
				}
			}
		}
		return this;
	},
	
	inverse : function(flag) {
		var det = this.determinant();
		
		this.transpose();
		var me = this.clone().MD_Array;
		
		this.MD_Array[ 0 ][ 0 ] =   me[1][1] * me[2][2] - me[1][2] * me[2][1];
		this.MD_Array[ 0 ][ 1 ] = - me[1][0] * me[2][2] + me[1][2] * me[2][0];
		this.MD_Array[ 0 ][ 2 ] =   me[1][0] * me[2][1] - me[1][1] * me[2][0];
		
		this.MD_Array[ 1 ][ 0 ] = - me[0][1] * me[2][2] + me[0][2] * me[2][1];
		this.MD_Array[ 1 ][ 1 ] =   me[0][0] * me[2][2] - me[0][2] * me[2][0];
		this.MD_Array[ 1 ][ 2 ] = - me[0][0] * me[2][1] + me[0][1] * me[2][0];
		
		this.MD_Array[ 2 ][ 0 ] =   me[0][1] * me[1][2] - me[0][2] * me[1][1];
		this.MD_Array[ 2 ][ 1 ] = - me[0][0] * me[1][2] + me[0][2] * me[1][0];
		this.MD_Array[ 2 ][ 2 ] =   me[0][0] * me[1][1] - me[0][1] * me[1][0];
		
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
	
	//MIN / MAX / CLAMP / LERP
	
		//%TODO: .... if needed
	
	// NEGATE / NORMALIZE
    
	negate : function(){
		this.multiplyScalar( -1 );
		
		return this;
	},
	
	normalize : function () {
		this.inverse().transpose();

		return this;
	}
	
	/****************************
	   VECTOR RELATED FUNCTIONS
	*****************************/
	
	//@TODO: Like in Three.js
}

//Extend "Matrix.prototype"
Matrix3.prototype.__proto__ = {
	test : function(){
		return function () {
			return "HELLO";
		}
	}()
};
