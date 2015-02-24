c_xx= 0;
c_yy= 0;
c_zz= 0;
c_mx= 0 , c_my= 0, c_mz= 0;
c_ostalo = 0;
index = 0;
c_Trans =0,cf_pos = 0;
matrixGeneral = 0;
izbrani=0;

information={translation:{c_xx:0 , c_yy:0, c_zz:0, c_mx:0, c_my:0, c_mz:0 },
			rotation:{c_xx:0 , c_yy:0, c_zz:0, c_mx:0, c_my:0, c_mz:0 },
			scale:{c_xx:1 , c_yy:1, c_zz:1, c_mx:1, c_my:1, c_mz:1 },
			mirror:{c_xx:0 , c_yy:0, c_zz:0, c_mx:0, c_my:0, c_mz:0 },
			shear:{c_xx:0 , c_yy:0, c_zz:0, c_mx:0, c_my:0, c_mz:0 }};	
matrixx = [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1];
matrixy = [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1];
matrixz = [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1];
matrixm = [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1];

function exampleInit() {
	matrixDisableElements("#matrix1",4,4,matrika_dis);
	updateMatrix("#matrix1",4,4,matrixx);
	
	controls.target.set(0,0,0);
	controls.enabled = false;
	controls.noZoom = controls.noPan = controls.noRoll = controls.noRotate = true;
	camera.position.set(250,350,330);

	WorldAXES = new THREE.AxisHelper( 200 );
	scene.add( WorldAXES );
	
	object = new THREE.Mesh( new THREE.CubeGeometry( 100, 100, 100 ), new THREE.MeshNormalMaterial() );
	object.position.set(15,0,0);
	//object.rotateY(Math.PI/4); object.rotateZ(Math.PI/4);
	scene.add( object );
	
	camera1 = new THREE.OrthographicCamera( c_mx, -c_mx, c_mz, -c_mz, 1, 1000 );
	camera1.updateProjectionMatrix ();
}
var matrika_dis = [true,true,true,false,
				 true,true,true,false,
				 true,true,true,false,
				 true,true,true,true];
function exampleRender(){
	if(izbrani == 0){
		switch(index){
			case 0:
				object.position.x = c_xx;
				object.position.y = 0;
				object.position.z = 0;
				break;
			case 1:
				object.position.x = 0;
				object.position.y = c_yy;
				object.position.z = 0;
				break;
			case 2:
				object.position.x = 0;
				object.position.y = 0;
				object.position.z = c_zz;
				break;
			case 3:
				object.position.x = c_mx;
				object.position.y = c_my;
				object.position.z = c_mz;
				break;
		}
	}
	else if(izbrani == 2){
		switch(index){
			case 0:
				if(c_xx == 0){
						c_xx = 1;
				}
				object.scale.y = 1;
				object.scale.z = 1;
				object.scale.x = c_xx;
				break;
			case 1:
				if(c_yy == 0){
						c_yy = 1;
				}
				object.scale.x = 1;
				object.scale.z = 1;
				object.scale.y = c_yy;
				break;
			case 2:
				if(c_zz == 0){
						c_zz = 1;
				}
				object.scale.x = 1;
				object.scale.y = 1;
				object.scale.z = c_zz;
				break;
			case 3:
				if(c_mx == 0){
						c_mx = 1;
				}
				if(c_my == 0){
						c_my = 1;
				}
				if(c_mz == 0){
						c_mz = 1;
				}
				object.scale.x = c_mx;
				object.scale.y = c_my;
				object.scale.z = c_mz;
				break;
		}
	}
}
function updateSettings(){
	matrixDisableElements("#matrix1",4,4,matrika_dis);
	updateMatrix("#matrix1",4,4,matrixGeneral);
}