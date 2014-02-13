window.canvasWidth = 970;
window.canvasHeight = 400;
function init(x,y) {
			 
			    scene = new THREE.Scene();
			    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000);
			 
			    var light = new THREE.AmbientLight( 0xffffff );
			    light.position.set( 0, 1, 1 ).normalize();
			    scene.add(light);
			    prvi = new THREE.Vector2(0,1);
			    drugi = new THREE.Vector2(0, 0);
   			  tretji = new THREE.Vector2(1, 0);
			    cetrti = new THREE.Vector2(1, 1);
			    
			    geometry = new THREE.PlaneGeometry( 40, 40,1,1);
       			    geometry.faceVertexUvs[0] = [[
            			prvi,
            			drugi,
            			tretji,
            			cetrti]];
			 	  texture = THREE.ImageUtils.loadTexture('textures-planar.jpg');
			    texture.wrapS = THREE.RepeatWrapping;
			    texture.wrapT = THREE.ClampToEdgeWrapping;
			    texture.repeat.set(x, y );
			    texture.wrapS = THREE.RepeatWrapping;
			    texture.wrapT = THREE.ClampToEdgeWrapping;
			    texture.mapping = THREE.UVMapping();
			    material = new THREE.MeshLambertMaterial({ ambient:new THREE.Color().setRGB(1,1,1),
			        map: texture, overdraw: true,combine: THREE.MultiplyOperation, shininess: 30
			      });
			    mesh = new THREE.Mesh(geometry, material );
			    mesh.position.z = -50;
			    scene.add( mesh );
			 
			    renderer = new THREE.WebGLRenderer();
			    renderer.setSize( window.canvasWidth, window.canvasHeight );

          $('#canvas').html(renderer.domElement);
			 
			    render();
			}

			function animate() {

			 
			    render();
			    requestAnimationFrame( animate );
			}
			 
			function render() {
			    renderer.render( scene, camera );
			}