var WorldAXES, CameraAXES, ObjectAXES;
var plane,     camera,     object;

var CameraFrustom;

var cube; /*For easy access*/

function exampleInit() {
	controls.noZoom = true;
	controls.noPan = true;
	controls.noRoll = true;
	controls.staticMoving = true;
	
	controls.target.set(100,250,100);
	GCamera.position.set(300,300,300);
	
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
	
	cube = new THREE.Mesh( 
		new THREE.CubeGeometry( 20, 20, 20, 1, 1, 1 ), 
		new THREE.MeshBasicMaterial( { color : 0xff0000, wireframe: true } )
	); cube.position.set(10,10,10);
	
	object.add(cube);
	object.add(ObjectAXES);
	object.position.set(200,250,100);
	
	GScene.add( object );
	
	/********* 
	  CAMERA 
	**********/
	if(false) camera = new THREE.OrthographicCamera( -10, 10, 10, -10, 150, 250 );
	else camera = new THREE.PerspectiveCamera( 30, 10/10, 100, 250 );
	camera.position.set(-200,250,100);
	camera.lookAt(object.position);
	camera.updateProjectionMatrix();
	
	CameraFrustom = new CameraHelper(camera);
	camera.add(CameraFrustom);
	camera.add(CameraAXES);
	
	
	GScene.add( camera );
}

function exampleRender() {
	CameraFrustom.update();
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