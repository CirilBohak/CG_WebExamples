CameraHelper = function ( camera, w, h) {
	THREE.Object3D.call( this );
	
	var geometry = new THREE.Geometry();
	var material = new THREE.LineBasicMaterial( { color: 0xffffff, vertexColors: THREE.VertexColors } );
	var pointMap = {};
	
	// colors
	var hexFrustum = 0x999999;
	var hexCone = 0xDDDDDD;
	var hexPlane = 0xD3D3D3;
	var hexView = 0xDEDEDE;
	
	// near
	addLine( "n1", "n2", hexFrustum );
	addLine( "n2", "n4", hexFrustum );
	addLine( "n4", "n3", hexFrustum );
	addLine( "n3", "n1", hexFrustum );
	
	// far
	addLine( "f1", "f2", hexFrustum );
	addLine( "f2", "f4", hexFrustum );
	addLine( "f4", "f3", hexFrustum );
	addLine( "f3", "f1", hexFrustum );
	
	// sides
	addLine( "n1", "f1", hexFrustum );
	addLine( "n2", "f2", hexFrustum );
	addLine( "n3", "f3", hexFrustum );
	addLine( "n4", "f4", hexFrustum );
	
	// cone
	addLine( "p", "vP1", hexCone );
	addLine( "p", "vP2", hexCone );
	addLine( "p", "vP3", hexCone );
	addLine( "p", "vP4", hexCone );
	
	addLine( "vP1", "n1", hexCone );
	addLine( "vP2", "n2", hexCone );
	addLine( "vP3", "n3", hexCone );
	addLine( "vP4", "n4", hexCone );
		
	//if(camera.fov !== undefined){
	
	function addLine( a, b, hex ) {
		addPoint( a, hex );
		addPoint( b, hex );
	}
	
	function addPoint( id, hex ) {
		geometry.vertices.push( new THREE.Vector3() );
		geometry.colors.push( new THREE.Color( hex ) );
		
		if ( pointMap[ id ] === undefined ) pointMap[ id ] = [];
		
		pointMap[ id ].push( geometry.vertices.length - 1 );
	}
	
	this.LINES = new THREE.Line( geometry, material, THREE.LinePieces );
	this.add(this.LINES);
	
	this.camera = camera;
	this.pointMap = pointMap;
	
	/*****************************
			   VIEW PLANE
	******************************/
	
	if( w !== undefined){
		this.totalW = w;
		this.totalH = h;
		
		this.renderTarget = new THREE.WebGLRenderTarget( 512, 512, { format: THREE.RGBFormat, magFilter: THREE.NearestFilter, minFilter: THREE.LinearMipMapLinearFilter } ); this.renderTarget.offset.set(-4/256,-4/512);
		geometry = new THREE.Geometry();
		
		for(var i=0; i<12; i++) geometry.vertices.push(new THREE.Vector3());
		
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
		geometry.faces.push( new THREE.Face3(5,0,9) );
		geometry.faces.push( new THREE.Face3(6,5,9) );
		
		geometry.computeFaceNormals(); 
		geometry.computeCentroids();
		
		this.plane = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { color: hexPlane, opacity: 0.8, transparent: true, side:THREE.DoubleSide } ) ); 
		this.add(this.plane);
		
		this.PlaneGeometry = new THREE.PlaneGeometry( 1, 1 );
		
		this.PlaneGeometry.vertices[0] = this.plane.geometry.vertices[7]; this.PlaneGeometry.vertices[1] = this.plane.geometry.vertices[4];
		this.PlaneGeometry.vertices[2] = this.plane.geometry.vertices[6]; this.PlaneGeometry.vertices[3] = this.plane.geometry.vertices[5];
		
		this.planeMap = new THREE.Mesh(this.PlaneGeometry , new THREE.MeshBasicMaterial( { color: hexView, opacity: 0.8, transparent: true, map: this.renderTarget, side:THREE.DoubleSide } ) );
		this.add(this.planeMap);
	}
	
	this.update();
};

CameraHelper.prototype = Object.create(  THREE.Object3D.prototype );

CameraHelper.prototype.update = function () {
	var vector = new THREE.Vector3();
	var camera = new THREE.Camera();
	var projector = new THREE.Projector();
	
	return function () {
		var scope = this;
		var w = 1, h = 1;

		// we need just camera projection matrix
		// world matrix must be identity
		camera.projectionMatrix.copy( this.camera.projectionMatrix );
		
		// near
		setPoint( "n1", -w, -h, -1 );
		setPoint( "n2",  w, -h, -1 );
		setPoint( "n3", -w,  h, -1 );
		setPoint( "n4",  w,  h, -1 );
		
		// far
		setPoint( "f1", -w, -h, 1 );
		setPoint( "f2",  w, -h, 1 );
		setPoint( "f3", -w,  h, 1 );
		setPoint( "f4",  w,  h, 1 );
		
		if( this.totalW !== undefined){
			var near = [];
			var directions = []; //Normalized for multiplication
			for(var i=1; i<=4; i++){
				near[i] = scope.LINES.geometry.vertices[scope.pointMap["n"+i][0]];
				directions[i] = new THREE.Vector3().subVectors(near[i], scope.LINES.geometry.vertices[scope.pointMap["f"+i][0]]).normalize();
			}
			var dist = 0;
			if(directions[1].x==0) dist = -near[1].z*0.5;
			else dist = near[1].length()*0.5;
			
			var viewPlane = [];
			viewPlane.push(setViewPlanePoint("vP1", near[1], directions[1]));
			viewPlane.push(setViewPlanePoint("vP2", near[2], directions[2]));
			viewPlane.push(setViewPlanePoint("vP3", near[3], directions[3]));
			viewPlane.push(setViewPlanePoint("vP4", near[4], directions[4]));
			
			var distZ = -viewPlane[0].clone().projectOnVector({x:0, y:0, z:1}).distanceTo({x:0, y:0, z:0}); //TODO: Better... mathematical calculation error
			
			/*****************************
					   VIEW PLANE
			******************************/
			
			this.plane.position.set(0,0,distZ);
			/*Left*/
			this.plane.geometry.vertices[0].set( viewPlane[3].x>this.totalW?this.totalW:viewPlane[3].x, -this.totalH, 0 );
			this.plane.geometry.vertices[1].set( viewPlane[1].x>this.totalW?this.totalW:viewPlane[1].x, this.totalH,  0 );
			this.plane.geometry.vertices[2].set( this.totalW,    this.totalH,  0 );
			this.plane.geometry.vertices[3].set( this.totalW,    -this.totalH, 0 );
			/*inner box*/
			this.plane.geometry.vertices[4].set( viewPlane[3].x>this.totalW?this.totalW:viewPlane[3].x,   viewPlane[3].y>this.totalH?this.totalH:viewPlane[3].y,   0 );
			this.plane.geometry.vertices[5].set( viewPlane[1].x>this.totalW?this.totalW:viewPlane[1].x,   viewPlane[1].y<-this.totalH?-this.totalH:viewPlane[1].y, 0 );
			this.plane.geometry.vertices[6].set( viewPlane[0].x<-this.totalW?-this.totalW:viewPlane[0].x, viewPlane[0].y<-this.totalH?-this.totalH:viewPlane[0].y, 0 );
			this.plane.geometry.vertices[7].set( viewPlane[2].x<-this.totalW?-this.totalW:viewPlane[2].x, viewPlane[2].y>this.totalH?this.totalH:viewPlane[2].y,   0 );
			/*Right*/
			this.plane.geometry.vertices[8].set(  viewPlane[0].x<-this.totalW?-this.totalW:viewPlane[0].x, this.totalH,  0 );
			this.plane.geometry.vertices[9].set(  viewPlane[2].x<-this.totalW?-this.totalW:viewPlane[2].x, -this.totalH, 0 );
			this.plane.geometry.vertices[10].set( -this.totalW,   -this.totalH, 0 );
			this.plane.geometry.vertices[11].set( -this.totalW,   this.totalH,  0 );
			this.plane.geometry.verticesNeedUpdate = true;
			
			this.PlaneGeometry.verticesNeedUpdate = true;
			this.planeMap.position.set(0,0,distZ);
			this.planeMap.material.needsUpdate = true;
			
		}
		
		function setPoint( point, x, y, z ) {
			vector.set( x, y, z );
			projector.unprojectVector( vector, camera );
			
			var points = scope.pointMap[ point ];
			
			if ( points !== undefined ) {
				for ( var i = 0, il = points.length; i < il; i ++ ) {
					scope.LINES.geometry.vertices[ points[ i ] ].copy( vector );
				}
			}
		}
		
		function setViewPlanePoint( point, from, to ){
			var points = scope.pointMap[point];
			
			vector.set(to.x, to.y, to.z); vector.multiplyScalar(dist); vector.add(from);
			
			if ( points !== undefined ) {
				for ( var i = 0, il = points.length; i < il; i ++ ) {
					scope.LINES.geometry.vertices[ points[ i ] ].copy( vector );
				}
			}
			
			return vector.clone();
		}
		
		this.LINES.geometry.verticesNeedUpdate = true;
	};
}();
