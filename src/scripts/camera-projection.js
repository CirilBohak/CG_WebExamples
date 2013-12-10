var WorldAXES,                     ObjectAXES;
var plane,     c_Orto, c_Pers,     object;

var whichCamera = false; 
var c_auto = false;

var c_width = 100, c_height = 100;
var c_left = -50, c_right = 50, c_top = 50, c_bottom = -50;
var c_near = 300, c_far = 450;
var c_fov = 19, c_aspect = 1.;
var cf_orto, cf_pers;

function exampleInit() {
	controls.noZoom = true;
	controls.noPan = controls.noRoll = true;
	controls.target.set(100,230,100);
	GCamera.position.set(250,350,330);
	
	/**************
	  AXES HELPERS
	***************/
		WorldAXES = new THREE.AxisHelper( 100 );
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
	c_Orto = new THREE.OrthographicCamera( c_left, c_right, c_top, c_bottom, c_near, c_far );
	cf_orto = new CameraHelper(c_Orto, c_width*0.5+70, c_height*0.5+30);
	c_Orto.position.set(-200,250,100); c_Orto.lookAt(object.position); c_Orto.updateProjectionMatrix();
	c_Orto.add(cf_orto); c_Orto.add(new THREE.AxisHelper( 100 ));
	GScene.add( c_Orto );
	
	c_Pers = new THREE.PerspectiveCamera( c_fov, c_aspect, c_near, c_far );
	cf_pers = new CameraHelper(c_Pers, c_width*0.5+70, c_height*0.5+30);
	c_Pers.position.set(-200,250,100); c_Pers.lookAt(object.position); c_Pers.updateProjectionMatrix();
	c_Pers.add(cf_pers); c_Pers.add(new THREE.AxisHelper( 100 ));
	GScene.add( c_Pers );
	
	toogle_camera();
}

function exampleRender() {
	//cf_orto.update();
	if(whichCamera) GRenderer.render( GScene, c_Orto, cf_orto.renderTarget, true );
	else GRenderer.render( GScene, c_Pers, cf_pers.renderTarget, true );
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
		if(c_auto){ 
			c_Orto.left = c_width / - 2; c_Orto.right = c_width / 2; c_Orto.top = c_height / 2; c_Orto.bottom = c_height / -2; 
		}else{ 
			c_Orto.left = c_left; c_Orto.right = c_right; c_Orto.top = c_top; c_Orto.bottom = c_bottom; 
		}
		
		c_Orto.near = c_near; c_Orto.far = c_far;
		c_Orto.updateProjectionMatrix();
		
		cf_orto.totalW = c_width*0.5+70;
		cf_orto.totalH = c_height*0.5+30;
		cf_orto.update();
	}else{ 
		c_Pers.fov = c_fov;
		if(c_auto){ 
			c_Pers.aspect = c_width/c_height;
		}else{ 
			c_Pers.aspect = c_aspect;
		}
		
		c_Pers.near = c_near; c_Pers.far = c_far;
		c_Pers.updateProjectionMatrix();
		
		cf_pers.totalW = c_width*0.5+70;
		cf_pers.totalH = c_height*0.5+30;
		cf_pers.update();
	}
}

function resetCamera(camera){
	camera.matrixWorld.identity().setPosition(camera.position);
	camera.quaternion.setFromRotationMatrix(camera.matrixWorld);
	camera.updateProjectionMatrix();
}

function toogle_camera(){
	c_Orto.traverse( function ( object ) { object.visible = !whichCamera; } );
	c_Pers.traverse( function ( object ) { object.visible = whichCamera; } );
	whichCamera = !whichCamera;
}