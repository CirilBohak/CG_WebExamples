var $container, stats;

var camera, scene, renderer;

var cube, plane;

var targetRotation = 0;
var targetRotationOnMouseDown = 0;

var mouseX = 0;
var mouseXOnMouseDown = 0;

var windowHalfX = 0, windowHalfY = 0;

init();
animate();

function init() {
	$container = $("#surface");
	windowHalfX = $container.width() / 2; windowHalfY = $container.height() / 2;

	camera = new THREE.PerspectiveCamera( 70, $container.width() / $container.height(), 1, 1000 );
	camera.position.y = 150;
	camera.position.z = 500;
	
	scene = new THREE.Scene();

	exampleInit();

	renderer = new THREE.CanvasRenderer();
	renderer.setSize( $container.width(), $container.height() );

	$container.append( renderer.domElement );

	$container.on( 'mousedown', onDocumentMouseDown );
	$container.on( 'touchstart', onDocumentTouchStart );
	$container.on( 'touchmove', onDocumentTouchMove );

	//

	window.addEventListener( 'resize', onWindowResize, false );
}

function animate() {
	requestAnimationFrame( animate );

	render();
}

function render() {
	exampleRender();
	renderer.render( scene, camera );
}

//

function onWindowResize() {
	windowHalfX = $container.width() / 2;
	windowHalfY = $container.height() / 2;
	
	camera.aspect = $container.width() / $container.height();
	camera.updateProjectionMatrix();
	
	renderer.setSize( $container.width(), $container.height() );
}

//

function onDocumentMouseDown( event ) {
	event.preventDefault();

	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
	document.addEventListener( 'mouseup', onDocumentMouseUp, false );
	document.addEventListener( 'mouseout', onDocumentMouseOut, false );

	mouseXOnMouseDown = event.clientX - windowHalfX;
	targetRotationOnMouseDown = targetRotation;
}

function onDocumentMouseMove( event ) {
	mouseX = event.clientX - windowHalfX;

	targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.02;
}

function onDocumentMouseUp( event ) {
	document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
	document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
	document.removeEventListener( 'mouseout', onDocumentMouseOut, false );
}

function onDocumentMouseOut( event ) {
	document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
	document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
	document.removeEventListener( 'mouseout', onDocumentMouseOut, false );
}

function onDocumentTouchStart( event ) {
	if ( event.touches.length === 1 ) {
		event.preventDefault();

		mouseXOnMouseDown = event.touches[ 0 ].pageX - windowHalfX;
		targetRotationOnMouseDown = targetRotation;
	}
}

function onDocumentTouchMove( event ) {
	if ( event.touches.length === 1 ) {
		event.preventDefault();

		mouseX = event.touches[ 0 ].pageX - windowHalfX;
		targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.05;
	}
}