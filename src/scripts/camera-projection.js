var WorldAXES, CameraAXES, ObjectAXES;
var plane,     camera,     object;

/*****************
   true ... ORTO 
  false ... PERSP
******************/
var whichCamera = true; 
var c_auto = true;

var c_width = 100, c_height = 100;
var c_left = -50, c_right = 50, c_top = 50, c_bottom = -50;
var c_near = 300, c_far = 450;
var c_fov = 20, c_aspect = 1.;
var CameraFrustum;

function exampleInit() {
	controls.noZoom = true;
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
	if(whichCamera) camera = new THREE.OrthographicCamera( c_left, c_right, c_top, c_bottom, c_near, c_far );
	else camera = new THREE.PerspectiveCamera( c_fov, c_aspect, c_near, c_far );
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

/****************
   CALCULATION
*****************/

/*function spherical(x,y,z){
	var r = Math.sqrt(x*x + y*y + z*z);
	var theta = Math.acos(z/r);
	var phi = Math.atan(y/x);
	
	var z = new THREE.Vector3(Math.sin(theta)*Math.cos(phi),
								   Math.sin(theta)*Math.sin(phi),
								   Math.cos(theta));
}*/

function updateCamera(){		
	if(whichCamera){ 
		if(c_auto){ camera.left = c_width / - 2; camera.right = c_width / 2; camera.top = c_height / 2; camera.bottom = c_height / -2; }
		else{ camera.left = c_left; camera.right = c_right; camera.top = c_top; camera.bottom = c_bottom; }
	}else{ 
		camera.fov = c_fov;
		if(c_auto) camera.aspect = c_width/c_height;
		else camera.aspect = c_aspect;
	}
	
	camera.near = c_near; camera.far = c_far;
	camera.updateProjectionMatrix();
	
	CameraFrustum.totalW = c_width*0.5+70;
	CameraFrustum.totalH = c_height*0.5+30;
	CameraFrustum.update();
}