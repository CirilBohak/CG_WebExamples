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
	
	/**********
	  CAMERA's 
	***********/
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
	updateCamera();
}

function exampleRender() {
	//cf_orto.update();
	if(whichCamera) GRenderer.render( GScene, c_Orto, cf_orto.renderTarget, true );
	else GRenderer.render( GScene, c_Pers, cf_pers.renderTarget, true );
}

/****************
   CALCULATION
*****************/

//TODO: ....

/********************
   HELPER FUNCTIONS
*********************/


var ortho_eq = ["\\frac{2}{right-left}","","","-\\frac{right+left}{right-left}",
			    "","\\frac{2}{top-bottom}","","-\\frac{top+bottom}{top-bottom}",
			    "","","-\\frac{2}{far-near}","-\\frac{far+near}{far-near}",
			    "","","","1"];
var ortho_dis = [false,true,true,false,
				 true,false,true,false,
				 true,true,false,false,
				 true,true,true,true];
				
var persp_eq = ["2*\\frac{near}{right-left}","","\\frac{right+left}{right-left}","",
			    "","2*\\frac{near}{top-bottom}","\\frac{top+bottom}{top-bottom}","",
			    "","","-\\frac{far+near}{far-near}","-2*\\frac{far*near}{far-near}",
			    "","","-1","0"];
var persp_dis = [false,true,false,true,
				 true,false,false,true,
				 true,true,false,false,
				 true,true,true,true];

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
		
		updateMatrix("#matrix1",4,4,c_Orto.projectionMatrix.clone().transpose().toArray());
		matrixDisableElements("#matrix1",4,4,ortho_dis);
		matrixUpdateMathJaxTooltips("#matrix1_inner",ortho_eq, ortho_dis);
	}else{
		c_Pers.near = c_near; c_Pers.far = c_far;
		
		if(c_auto){ 
			c_aspect = c_width/c_height;
			c_Pers.aspect = c_aspect;
			c_Pers.fov = c_fov;
			
			c_Pers.updateProjectionMatrix();
		}else{
			//c_aspect = Math.abs( c_right - c_left )/Math.abs( c_top - c_bottom );
			//if(c_aspect==0 || isNaN(c_aspect) || !isFinite(c_aspect)) c_aspect = 0.01;
			
			c_Pers.aspect = c_aspect;
			
			c_Pers.updateProjectionMatrix();
		}
		
		cf_pers.totalW = c_width*0.5+70;
		cf_pers.totalH = c_height*0.5+30;
		cf_pers.update();
		
		updateMatrix("#matrix1",4,4,c_Pers.projectionMatrix.clone().transpose().toArray());
		matrixDisableElements("#matrix1",4,4,persp_dis);
		matrixUpdateMathJaxTooltips("#matrix1_inner",persp_eq, persp_dis);
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