var $container, stats, controls, clock;

var GCamera, GScene, GRenderer;

init();
animate();

function init() {
	$container = $("#surface");
	
	GCamera = new THREE.PerspectiveCamera( 70, $container.width() / $container.height(), 1, 1000 );
	GCamera.position.set(0,0,300);
	
	controls = new THREE.TrackballControls(GCamera, $container[0]);
	clock = new THREE.Clock();
	
	GScene = new THREE.Scene();
	
	
	exampleInit();
	
	
	if(false) GRenderer = new THREE.WebGLRenderer( { antialias: true} );
	else GRenderer = new THREE.CanvasRenderer();
	GRenderer.setSize( $container.width(), $container.height() );
	GRenderer.setClearColor( 0xffffff, 1 );
	
	$container.append( GRenderer.domElement );

	window.addEventListener( 'resize', onWindowResize, false );
}

function animate() {
	requestAnimationFrame( animate );

	render();
}

function render() {
	// Fetch the delta from THREE.js' clock.
    var delta = clock.getDelta();
    // Pass it to the camera controller.
    controls.update(delta);
	
	exampleRender();
	
	GRenderer.render( GScene, GCamera );
}

//

function onWindowResize() {
	GCamera.aspect = $container.width() / $container.height();
	GCamera.updateProjectionMatrix();
	
	GRenderer.setSize( $container.width(), $container.height() );
}