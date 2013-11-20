// auxiliary class for Matrix
var Matrix4 = function(n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44) {
	this.n = 4; /*dimension*/
	this.MD_Array = [[ ( n11 !== undefined ) ? n11 : 1, n12 || 0, n13 || 0, n14 || 0],  /*set with variables*/
					 [ n21 || 0, ( n22 !== undefined ) ? n22 : 1, n23 || 0, n24 || 0],  /*if non set, array will be identity*/
					 [ n31 || 0, n32 || 0, ( n33 !== undefined ) ? n33 : 1, n34 || 0],
					 [ n41 || 0, n42 || 0, n43 || 0, ( n44 !== undefined ) ? n44 : 1]];
}

Matrix4.prototype = {
	constructor: Matrix4,
	
	/*****************
	   SET FUNCTIONS
	******************/
	
	set : function(n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44) {
		var m = this.MD_Array;
		
		m[0][0] = n11; m[0][1] = n12; m[0][2] = n13; m[0][3] = n14;
		m[1][0] = n21; m[1][1] = n22; m[1][2] = n23; m[1][3] = n24;
		m[2][0] = n31; m[2][1] = n32; m[2][2] = n33; m[2][3] = n34;
		m[3][0] = n41; m[3][1] = n42; m[3][2] = n43; m[3][3] = n44;
		
		return this;
	},
	
	setPosition: function ( vector ) {
		//Last line in matrix
		this.MD_Array[3][0] = vector.x;
		this.MD_Array[3][1] = vector.y;
		this.MD_Array[3][2] = vector.y;
		
		return this;
	},
	
	/**********************************
	   COPY / CLONE itd... FUNCTIONS
	***********************************/

	clone : function() {
		var cloned = new Matrix4();
		cloned = cloned.copy(this.MD_Array);
		return cloned;
	},
	
		//TODO: copyPosition
	
	/*********************
	   OTHER FUNCTIONS
	**********************/
	
	getMaxScaleOnAxis: function () {
		var scaleXSq = 0, scaleYSq = 0, scaleZSq = 0;
		var m = this.MD_Array;
		
		for(var i=0; i<3; i++) scaleXSq += m[0][i]*m[0][i];
		for(var i=0; i<3; i++) scaleYSq += m[1][i]*m[1][i];
		for(var i=0; i<3; i++) scaleZSq += m[2][i]*m[2][i];
		
		return Math.sqrt( Math.max( scaleXSq, Math.max( scaleYSq, scaleZSq ) ) );
	},
	
	/*******************
	   MAKE FUNCTIONS
	********************/
    
	//Translation
	
	makeTranslation: function (x,y,z) {
		this.set(
			1, 0, 0, x,
			0, 1, 0, y,
			0, 0, 1, z,
			0, 0, 0, 1
		);
		
		return this;
	},
	
	//Rotation
	
	makeRotationX: function (theta) {
		var c = Math.cos( theta ), s = Math.sin( theta );
		
		this.set(
			1, 0,  0, 0,
			0, c, -s, 0,
			0, s,  c, 0,
			0, 0,  0, 1
		);

		return this;

	},
	
	makeRotationY: function (theta) {
		var c = Math.cos( theta ), s = Math.sin( theta );
		
		this.set(
			 c, 0, s, 0,
			 0, 1, 0, 0,
			-s, 0, c, 0,
			 0, 0, 0, 1
		);
		
		return this;
	},
	
	makeRotationZ: function (theta) {
		var c = Math.cos( theta ), s = Math.sin( theta );

		this.set(

			c, -s, 0, 0,
			s,  c, 0, 0,
			0,  0, 1, 0,
			0,  0, 0, 1

		);

		return this;

	},
	
	makeRotationAxis: function (axis,angle) {
		var c = Math.cos( angle );
		var s = Math.sin( angle );
		var t = 1 - c;
		var x = axis.x, y = axis.y, z = axis.z;
		var tx = t * x, ty = t * y;
		
		this.set(
			tx * x + c,      tx * y - s * z,  tx * z + s * y,  0,
			tx * y + s * z,  ty * y + c,      ty * z - s * x,  0,
			tx * z - s * y,  ty * z + s * x,  t * z * z + c,   0,
			0,               0,               0,               1
		);
		
		return this;
	},
	
	//Scale
	
	makeScale: function (x,y,z) {
		this.set(
			x, 0, 0, 0,
			0, y, 0, 0,
			0, 0, z, 0,
			0, 0, 0, 1
		);
		
		return this;
	},
	
		//TODO: compose
		//TODO: decompose
	
	//Camera
	
	makeFrustum: function (left,right,bottom,top,near,far) {
		var x = 2 * near / ( right - left );
		var y = 2 * near / ( top - bottom );

		var a = ( right + left ) / ( right - left );
		var b = ( top + bottom ) / ( top - bottom );
		var c = - ( far + near ) / ( far - near );
		var d = - 2 * far * near / ( far - near );

		this.set(
			x, 0,  a, 0,
			0, y,  b, 0,
			0, 0,  c, d,
			0, 0, -1, 0
		);
		
		return this;
	},
	
	makePerspective: function (fov,aspect,near,far) {
		var ymax = near * Math.tan( THREE.Math.degToRad( fov * 0.5 ) );
		var ymin = - ymax;
		var xmin = ymin * aspect;
		var xmax = ymax * aspect;

		return this.makeFrustum( xmin, xmax, ymin, ymax, near, far );
	},
	
	makeOrthographic: function (left,right,top,bottom,near,far) {
		var w = right - left;
		var h = top - bottom;
		var p = far - near;
		
		var x = ( right + left ) / w;
		var y = ( top + bottom ) / h;
		var z = ( far + near ) / p;
		
		this.set(
			2/w, 0,    0,   -x,
			0,   2/h,  0,   -y,
			0,   0,   -2/p, -z,
			0,   0,    0,    1
		);
		
		return this;
	},
	
	/************************
	   QUATERNION FUNCTIONS
	*************************/
	
		//TODO: makeRotationFromQuaternion
	
	/********************
	   EULER FUNCTIONS
	*********************/
	
		//TODO: makeRotationFromEuler
	
	/****************************
	   VECTOR RELATED FUNCTIONS
	*****************************/
	
	extractRotation: function () {
		var v1 = new Vector3();

		return function ( matrix ) {
			var M = this.MD_Array;
			var m = matrix.MD_Array;
			
			var scaleX = 1 / v1.set( m[0][0], m[0][1], m[0][2] ).length();
			var scaleY = 1 / v1.set( m[1][0], m[1][1], m[1][2] ).length();
			var scaleZ = 1 / v1.set( m[2][0], m[2][1], m[2][2] ).length();
			
			for(var i=0; i<M.n; i++) M[0][i] = m[0][i] * scaleX;
			for(var i=0; i<M.n; i++) M[1][i] = m[1][i] * scaleY;
			for(var i=0; i<M.n; i++) M[2][i] = m[2][i] * scaleZ;
			
			return this;
		};
	}(),
	
	lookAt: function() {
		var x = new Vector3();
		var y = new Vector3();
		var z = new Vector3();

		return function ( eye, target, up ) {
			z.subVectors( eye, target ).normalize();
			if ( z.length() === 0 ) z.z = 1;
			
			x.crossVectors( up, z ).normalize();
			
			if ( x.length() === 0 ) {
				z.x += 0.0001; //epsilon fix
				x.crossVectors( up, z ).normalize();
			}
			
			y.crossVectors( z, x );
			
			this.set(
				x.x, y.x, z.x, 0,
				x.y, y.y, z.y, 0,
				x.z, y.z, z.z, 0,
				0,   0,   0,   1
			);
			
			return this;
		};
	}(),
}

//Extend "Matrix3.prototype"
Matrix4.prototype.__proto__ = Matrix3.prototype;