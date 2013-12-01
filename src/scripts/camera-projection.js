var WorldAXES, CameraAXES, ObjectAXES;
var plane,     camera,     object;

/*****************
   true ... ORTO 
  false ... PERSP
******************/
var whichCamera = false; 

var c_width = 100, c_height = 100;
var c_near = 300, c_far = 450;
var c_fov = 20;
var CameraFrustum;

function exampleInit() {
	controls.noZoom = false;
	controls.noPan = controls.noRoll = true;
	controls.target.set(100,230,100);
	GCamera.position.set(250,350,330);
	
	/**************
	  AXES HELPERS
	***************/
		WorldAXES = new THREE.AxisHelper( 100 );
		CameraAXES = new THREE.AxisHelper( 100 );
		ObjectAXES = new THREE.AxisHelper( 100 );
	GScene.add( WorldAXES );
	
	/***************
	  OBJECT HELPER
	****************/
	object = new BoxObjectHelper();
		object.add(ObjectAXES);
		object.position.set(200,250,100);
		object.rotateY(Math.PI/4); object.rotateZ(Math.PI/4);
	GScene.add( object );
	
	/********
	  CAMERA 
	*********/
	if(whichCamera) camera = new THREE.OrthographicCamera( c_width / - 2, c_width / 2, c_height / 2, c_height / -2, c_near, c_far );
	else camera = new THREE.PerspectiveCamera( c_fov, c_width/c_height, c_near, c_far );
	CameraFrustum = new CameraHelper(camera, c_width*0.5+70, c_height*0.5+30);
	
		camera.position.set(-200,250,100);
		camera.lookAt(object.position);
		camera.updateProjectionMatrix();
	
		camera.add(CameraFrustum);
		camera.add(CameraAXES);
	
	GScene.add( camera );
}

function exampleRender() {
	//CameraFrustum.update();
	GRenderer.render( GScene, camera, CameraFrustum.renderTarget, true );
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

