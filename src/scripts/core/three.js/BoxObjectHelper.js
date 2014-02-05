BoxObjectHelper = function ( ) {
	THREE.Object3D.call( this );
	this.scale.z = this.scale.x = -1;
	
	var geometry = new THREE.Geometry();
	var material = new THREE.MeshBasicMaterial({color: 0xee0000, vertexColors: THREE.FaceColors, opacity: 0.7, transparent: true, depthWrite: false, side:THREE.DoubleSide })
	
	geometry.vertices.push(
		/* #RIGHT# */
			/*BOTTOM 10x20*/
		new THREE.Vector3( 0,  0,  0 ), //0
		new THREE.Vector3( 0,  10, 0 ), //1
		new THREE.Vector3( 20, 10, 0 ), //2
		new THREE.Vector3( 20, 0,  0 ), //3
			/*TOP BOX 10x10*/
		new THREE.Vector3( 0,  20, 0 ), //4
		new THREE.Vector3( 10, 20, 0 ), //5
		new THREE.Vector3( 10, 10, 0 ), //6
			/*TOP TRIANGLE*/
		new THREE.Vector3( 10, 20, 0 ), //7
		new THREE.Vector3( 20, 10, 0 ), //8
		
		/* #LEFT# */
			/*BOTTOM 10x20*/
		new THREE.Vector3( 0,  0,  20 ), //9
		new THREE.Vector3( 0,  10, 20 ), //10
		new THREE.Vector3( 20, 10, 20 ), //11
		new THREE.Vector3( 20, 0,  20 ), //12
			/*TOP BOX 10x10*/
		new THREE.Vector3( 0,  20, 20 ), //13
		new THREE.Vector3( 10, 20, 20 ), //14
		new THREE.Vector3( 10, 10, 20 ), //15
			/*TOP TRIANGLE*/
		new THREE.Vector3( 10, 10, 10 ), //16
		new THREE.Vector3( 10, 20, 10 ), //17
		new THREE.Vector3( 20, 10, 10 )  //18
	);
	
	var tmpF;
	
	/* #RIGHT# */
		/*BOTTOM 10x20*/
	tmpF = new THREE.Face3(0,1,2); tmpF.color.setHex(0x880000);
	geometry.faces.push( tmpF );
	tmpF = new THREE.Face3(3,0,2); tmpF.color.setHex(0x880000);
	geometry.faces.push( tmpF );
		/*TOP BOX 10x10*/
	tmpF = new THREE.Face3(1,4,5); tmpF.color.setHex(0x880000);
	geometry.faces.push( tmpF );
	tmpF = new THREE.Face3(6,1,5); tmpF.color.setHex(0x880000);
	geometry.faces.push( tmpF );
		/*TOP TRIANGLE*/
	tmpF = new THREE.Face3(6,7,8); tmpF.color.setHex(0x880000);
	geometry.faces.push( tmpF );
	
	/* #LEFT# */
		/*BOTTOM 10x20*/
	tmpF = new THREE.Face3(10,9,11); tmpF.color.setHex(0x880000);
	geometry.faces.push( tmpF );
	tmpF = new THREE.Face3(9,12,11); tmpF.color.setHex(0x880000);
	geometry.faces.push( tmpF );
		/*TOP BOX 10x10*/
	tmpF = new THREE.Face3(13,10,14); tmpF.color.setHex(0x880000);
	geometry.faces.push( tmpF );
	tmpF = new THREE.Face3(10,15,14); tmpF.color.setHex(0x880000);
	geometry.faces.push( tmpF );
		/*TOP TRIANGLE*/
	tmpF = new THREE.Face3(17,16,18); tmpF.color.setHex(0x880000);
	geometry.faces.push( tmpF );
	
	/* #FRONT# */
		/*BOTTOM 10x20*/
	tmpF = new THREE.Face3(12,3, 2); tmpF.color.setHex(0xDD0000);
	geometry.faces.push( tmpF );
	tmpF = new THREE.Face3(11,12,2); tmpF.color.setHex(0xDD0000);
	geometry.faces.push( tmpF );
		/*TOP BOX 10x10*/
	tmpF = new THREE.Face3(14,15,16); tmpF.color.setHex(0xDD0000);
	geometry.faces.push( tmpF );
	tmpF = new THREE.Face3(17,14,16); tmpF.color.setHex(0xDD0000);
	geometry.faces.push( tmpF );
		/*TOP TRIANGLE CAP*/
	tmpF = new THREE.Face3(7,17,18); tmpF.color.setHex(0xDD0000);
	geometry.faces.push( tmpF );
	tmpF = new THREE.Face3(7,18,8); tmpF.color.setHex(0xDD0000);
	geometry.faces.push( tmpF );
	
	/* #BACK# */
	tmpF = new THREE.Face3(0,9,13); tmpF.color.setHex(0xDD0000);
	geometry.faces.push( tmpF );
	tmpF = new THREE.Face3(4,0,13); tmpF.color.setHex(0xDD0000);
	geometry.faces.push( tmpF );
	
	/* #BOTTOM# */
	tmpF = new THREE.Face3(0,3,9); tmpF.color.setHex(0xAA0000);
	geometry.faces.push( tmpF );
	tmpF = new THREE.Face3(3,12,9); tmpF.color.setHex(0xAA0000);
	geometry.faces.push( tmpF );
	
	/* #TOP# */
		/*10x20*/
	tmpF = new THREE.Face3(5,4,13); tmpF.color.setHex(0xAA0000);
	geometry.faces.push( tmpF );
	tmpF = new THREE.Face3(14,5,13); tmpF.color.setHex(0xAA0000);
	geometry.faces.push( tmpF );
		/*BOX 10x10*/
	tmpF = new THREE.Face3(11,18,16); tmpF.color.setHex(0xAA0000);
	geometry.faces.push( tmpF );
	tmpF = new THREE.Face3(11,16,15); tmpF.color.setHex(0xAA0000);
	geometry.faces.push( tmpF );
	
	geometry.computeFaceNormals(); 
	geometry.computeCentroids();
	
	this.MashBox = new THREE.Mesh( geometry, material);
	this.add(this.MashBox);
};

BoxObjectHelper.prototype = Object.create( THREE.Object3D.prototype );

BoxObjectHelper.prototype.update = function () {
	/*... Make if needed ...*/
}();
