var startTime	= Date.now();
var $container;
var camera, scene, renderer, stats;
var cube;
console.log(startTime);

init();
animate();

function init(){
	$container = $("#surface");
	camera = new THREE.PerspectiveCamera( 70, $container.width() / $container.height(), 1, 10000 );
	camera.position.set(0,0,300);
	
	controls = new THREE.TrackballControls(camera, $container[0]);
	clock = new THREE.Clock();
	
	scene = new THREE.Scene();
	exampleInit();
	
	if(true) renderer = new THREE.WebGLRenderer( { antialias: true, preserveDrawingBuffer: true} );
	else renderer = new THREE.CanvasRenderer();
	//console.log($container.width());
	renderer.setSize( $container.width(), $container.height() );
	renderer.setClearColor( 0xFFFFFF, 1 );
	
	$container.append( renderer.domElement );
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
	renderer.render( scene, camera );
}