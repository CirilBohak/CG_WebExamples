var WorldAXES, CameraAXES, ObjectAXES;
var plane,     camera,     object;

var CameraFrustom;
var renderTarget;

var cube; /*For easy access*/

function exampleInit() {
	controls.noZoom = false;
	controls.noPan = true;
	controls.noRoll = true;
	
	controls.target.set(100,230,100);
	GCamera.position.set(250,350,330);
	
	/******* 
	  AXES 
	*******/
	WorldAXES = new THREE.AxisHelper( 100 );
	CameraAXES = new THREE.AxisHelper( 100 );
	ObjectAXES = new THREE.AxisHelper( 100 );
	
	GScene.add( WorldAXES );
	
	/********* 
	  OBJECT 
	**********/
	object = new THREE.Object3D();
	
	object.scale.z = object.scale.x = -1;
	
	var geometry = new THREE.Geometry();
	
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
	
	cube = new THREE.Mesh( 
		geometry,
		new THREE.MeshBasicMaterial({color: 0xee0000, vertexColors: THREE.FaceColors, opacity: 0.7, transparent: true, depthWrite: false, side:THREE.DoubleSide })
	);
	
	object.add(cube);
	object.add(ObjectAXES);
	object.position.set(200,250,100);
	object.rotateY(Math.PI/4); object.rotateZ(Math.PI/4);
	
	GScene.add( object );
	
	/********* 
	  CAMERA 
	**********/
	var WH = 0, WHh;
	var choice = true;
	if(choice){ 
		camera = new THREE.OrthographicCamera( -50, 50, 50, -50, 300, 450 );
		WH = 100;
		WHh = 50;
	}else{ 
		camera = new THREE.PerspectiveCamera( 20, 100/100, 300, 450 );
		WH = Math.tan(camera.fov*Math.PI/180)*150;
		
		if(WH>100) WH = 100;
		WHh = WH * 0.5;
	}
	camera.position.set(-200,250,100);
	camera.lookAt(object.position);
	camera.updateProjectionMatrix();
	
	//console.log(camera.matrixWorld);
	/*  0    0   1   0
		0    1   0   0
		-1   0   0   0
		-200 250 100 1  */
	
	
	CameraFrustom = new CameraHelper(camera, choice);
	camera.add(CameraFrustom);
	camera.add(CameraAXES);
	
	GScene.add( camera );
	
	if(choice){
		var tmp = new THREE.Geometry();
		var material = new THREE.LineBasicMaterial( { color: 0xDDDDDD } );
		
		tmp.vertices.push( new THREE.Vector3(), new THREE.Vector3(WHh,WHh,-150),
						   new THREE.Vector3(), new THREE.Vector3(WHh,-WHh,-150),
						   new THREE.Vector3(), new THREE.Vector3(-WHh,WHh,-150),
						   new THREE.Vector3(), new THREE.Vector3(-WHh,-WHh,-150),
						   new THREE.Vector3(WHh,WHh,-150), new THREE.Vector3(WHh,WHh,-camera.near),
						   new THREE.Vector3(WHh,-WHh,-150), new THREE.Vector3(WHh,-WHh,-camera.near),
						   new THREE.Vector3(-WHh,WHh,-150), new THREE.Vector3(-WHh,WHh,-camera.near),
						   new THREE.Vector3(-WHh,-WHh,-150), new THREE.Vector3(-WHh,-WHh,-camera.near));
		
		camera.add(new THREE.Line( tmp, material, THREE.LinePieces));
	}
	
	/************ 
	  DRAW PLANE 
	*************/
	
	renderTarget = new THREE.WebGLRenderTarget( 512, 512, { format: THREE.RGBFormat } ); renderTarget.offset.set(-4/512,-4/512);
	geometry = new THREE.Geometry();
	
	geometry.vertices.push(
		/*Left*/
		new THREE.Vector3( WHh, -WHh-(80-WHh), 0 ), //0
		new THREE.Vector3( WHh, 80,           0 ), //1
		new THREE.Vector3( 120,  80,           0 ), //2
		new THREE.Vector3( 120,  -WHh-(80-WHh), 0 ), //3
		/*inner box*/
		new THREE.Vector3( WHh,  WHh,  0 ), //4
		new THREE.Vector3( WHh,  -WHh, 0 ), //5
		new THREE.Vector3( -WHh, -WHh, 0 ), //6
		new THREE.Vector3( -WHh, WHh,  0 ), //7
		/*Right*/
		new THREE.Vector3( -WHh, WHh+(80-WHh), 0 ), //8
		new THREE.Vector3( -WHh, -80,         0 ), //9
		new THREE.Vector3( -120,  -80,         0 ), //10
		new THREE.Vector3( -120,  WHh+(80-WHh), 0 )  //11
	);
	/*Left*/
	geometry.faces.push( new THREE.Face3(0,1,2) );
	geometry.faces.push( new THREE.Face3(3,0,2) );
	/*Right*/
	geometry.faces.push( new THREE.Face3(8,9,10) );
	geometry.faces.push( new THREE.Face3(11,8,10) );
	/*TOP*/
	geometry.faces.push( new THREE.Face3(8,1,4) );
	geometry.faces.push( new THREE.Face3(4,7,8) );
	/*BOTTOM*/
	geometry.faces.push( new THREE.Face3(5,3,9) );
	geometry.faces.push( new THREE.Face3(6,5,9) );
	
	geometry.computeFaceNormals(); 
	geometry.computeCentroids();
	
	var plane = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { color: 0xEEEEEE, opacity: 0.8, transparent: true, side:THREE.DoubleSide } ) );
	plane.position.set(-50,250,100);
	plane.rotateY(-Math.PI/2);
	GScene.add(plane);
	
	plane = new THREE.Mesh( new THREE.PlaneGeometry( WH, WH ), new THREE.MeshBasicMaterial( { color: 0xEEEEEE, opacity: 0.8, transparent: true, map: renderTarget, side:THREE.DoubleSide } ) );
	plane.position.set(-50,250,100);
	plane.rotateY(-Math.PI/2);
	GScene.add(plane);
}

function exampleRender() {
	CameraFrustom.update();
	GRenderer.render( GScene, camera, renderTarget, true );
}

// adding new vector to the list
function addVectorToList(vec) {
    vectors.push(vec);
	
    createVectorSelection(vec, vectors.length-1);
	
	updateVectorDropDownLists(vectors.length - 1);	
}

/****************
   CALCULATION
*****************/


	// Cube
	/*var geometry = new THREE.CubeGeometry( 200, 200, 200 );

	for ( var i = 0; i < geometry.faces.length; i += 2 ) {

		var hex = Math.random() * 0xffffff;
		geometry.faces[ i ].color.setHex( hex );
		geometry.faces[ i + 1 ].color.setHex( hex );

	}

	var material = new THREE.MeshBasicMaterial( { vertexColors: THREE.FaceColors, overdraw: 0.5 } );

	cube = new THREE.Mesh( geometry, material );
	cube.position.y = 150;
	scene.add( cube );

	// Plane

	var geometry = new THREE.PlaneGeometry( 200, 200 );
	geometry.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 2 ) );

	var material = new THREE.MeshBasicMaterial( { color: 0xe0e0e0, overdraw: 0.5 } );

	plane = new THREE.Mesh( geometry, material );
	scene.add( plane );*/