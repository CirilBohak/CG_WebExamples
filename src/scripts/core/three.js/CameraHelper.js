/**
 * @author alteredq / http://alteredqualia.com/
 *
 *	- shows frustum, line of sight and up of the camera
 *	- suitable for fast updates
 * 	- based on frustum visualization in lightgl.js shadowmap example
 *		http://evanw.github.com/lightgl.js/tests/shadowmap.html
 */

CameraHelper = function ( camera, flag ) {

	var geometry = new THREE.Geometry();
	var material = new THREE.LineBasicMaterial( { color: 0xffffff, vertexColors: THREE.VertexColors } );

	var pointMap = {};

	// colors

	var hexFrustum = 0x999999;
	var hexCone = 0xDDDDDD;
	var hexUp = 0x00aaff;
	var hexTarget = 0xffffff;
	
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
	if(!flag){
		addLine( "p", "n1", hexCone );
		addLine( "p", "n2", hexCone );
		addLine( "p", "n3", hexCone );
		addLine( "p", "n4", hexCone );
	}
	// up

	/*addLine( "u1", "u2", hexUp );
	addLine( "u2", "u3", hexUp );
	addLine( "u3", "u1", hexUp );*/

	function addLine( a, b, hex ) {

		addPoint( a, hex );
		addPoint( b, hex );

	}

	function addPoint( id, hex ) {

		geometry.vertices.push( new THREE.Vector3() );
		geometry.colors.push( new THREE.Color( hex ) );

		if ( pointMap[ id ] === undefined ) {

			pointMap[ id ] = [];

		}

		pointMap[ id ].push( geometry.vertices.length - 1 );

	}

	THREE.Line.call( this, geometry, material, THREE.LinePieces );

	this.camera = camera;
	this.matrixWorld = camera.matrixWorld;
	this.matrixAutoUpdate = false;

	this.pointMap = pointMap;

	this.update();

};

CameraHelper.prototype = Object.create( THREE.Line.prototype );

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
		

		function setPoint( point, x, y, z ) {

			vector.set( x, y, z );
			projector.unprojectVector( vector, camera );

			var points = scope.pointMap[ point ];

			if ( points !== undefined ) {

				for ( var i = 0, il = points.length; i < il; i ++ ) {

					scope.geometry.vertices[ points[ i ] ].copy( vector );

				}

			}

		}

		this.geometry.verticesNeedUpdate = true;

	};

}();
