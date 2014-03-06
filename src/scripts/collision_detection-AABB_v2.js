var movingBalls = Array();

var startTime = Date.now(),
	nowTimw = 0,
	elapsed_time = 0;

var FPS_Helper;

var debugColor = new Color(200,200,200);

/*World boundaries*/
var world_padding = 20;
var floor = new IAAHalfPlaneCollider(),
	leftWall = new IAAHalfPlaneCollider(),
	rightWall = new IAAHalfPlaneCollider(),
	ceiling = new IAAHalfPlaneCollider();

var ramp = new IHalfPlaneCollider();

/*TODO*/
var wall = new IConvexCollider();
var obsticle = new Obsticle();

function exampleInit() {
	FPS_Helper = new Stats();
	FPS_Helper.domElement.style.position = 'absolute';
	FPS_Helper.domElement.style.bottom = '-65px';
	FPS_Helper.domElement.style.right = '7px';
	document.getElementById("controller").appendChild(FPS_Helper.domElement);
	
	var ball;
	for(var i=0; i< 20; i++){
		var tmpR = randomIntFromInterval(20,40);
		ball = new MovingBall();
		ball.init(	new Vector3(randomIntFromInterval(20,proc.width-20),randomIntFromInterval(20,proc.height-20),0),
					new Vector3(randomIntFromInterval(1,100),randomIntFromInterval(1,100),0), 
					tmpR, tmpR);
		movingBalls.push(ball);
	}
	
	//20 - world padding
	leftWall.aaHalfPlane.initWithDirection(0, world_padding);
	rightWall.aaHalfPlane.initWithDirection(1, -proc.width+world_padding);
	ceiling.aaHalfPlane.initWithDirection(2, world_padding);
	floor.aaHalfPlane.initWithDirection(3, -proc.height+world_padding);
	
	//Special obstacles
	ramp.halfPlane.initWithNormal(new Vector3(-1, -2, 0).normalize(), -proc.height*1.2);
	
	var vert = new Array();
	vert.push(new Vector3(100, 100));
	vert.push(new Vector3(300, 150));
	vert.push(new Vector3(100, 200));
	wall.bounds = ConvexPolygon.polygonWithVertices(vert);
	
	vert = new Array();
	vert.push(new Vector3(-50, -50));
	vert.push(new Vector3(150, 0));
	vert.push(new Vector3(-50, 50));
	obsticle.bounds = ConvexPolygon.polygonWithVertices(vert);
	obsticle.position.set(200, 200, 0);
	obsticle.rotationAngle = Math.PI * 0.5;
	obsticle.angularMass = 50 * 150 * (Math.pow(50,2) + Math.pow(150, 2)) / 12;
	obsticle.angularVelocity = 0;
}

function draw() {
	update();
	
    // clear background
    proc.background(255);
	
	drawAAHalfPlane(leftWall.aaHalfPlane.direction, leftWall.aaHalfPlane.distance, debugColor, 1);
	drawAAHalfPlane(rightWall.aaHalfPlane.direction, rightWall.aaHalfPlane.distance, debugColor, 1);
	drawAAHalfPlane(ceiling.aaHalfPlane.direction, ceiling.aaHalfPlane.distance, debugColor, 1);
	drawAAHalfPlane(floor.aaHalfPlane.direction, floor.aaHalfPlane.distance, debugColor, 1);
	
	drawHalfPlane(ramp.halfPlane.normal, ramp.halfPlane.distance, debugColor, 1);
	
	//drawConvex(wall.bounds.verteces, debugColor, undefined, undefined, 1);
	drawConvex(obsticle.bounds.verteces, debugColor, obsticle.position, obsticle.rotationAngle, 1);
	
	for(var i=0; i<movingBalls.length; i++) movingBalls[i].draw();
}

function update(){
	//Elapsed Time Calculation 
	nowTimw = Date.now();
	elapsed_time = (nowTimw - startTime) * 0.001;
	startTime = nowTimw;
	
	//DEBUG - HTML
	document.getElementById("time").innerHTML = "<h2>Particles #"+movingBalls.length+"</h2><br />Elapsed time [s]: " + precise_round(elapsed_time, 5);
	
	for(var i=0; i<movingBalls.length; i++) MovementPhysics.simulateMovementOn(movingBalls[i], elapsed_time);
	MovementPhysics.simulateMovementOn(obsticle, elapsed_time); //Rotatable 
	
	for(var i=0; i<movingBalls.length; i++){
		for(var j=0; j<movingBalls.length; j++){
			if(i != j){
				ParticleParticleCollision.prototype.collisionBetween(movingBalls[i], movingBalls[j]);
			}
		}
		
		ParticleAAHalfPlaneCollision.prototype.collisionBetween(movingBalls[i], leftWall);
		ParticleAAHalfPlaneCollision.prototype.collisionBetween(movingBalls[i], rightWall);
		ParticleAAHalfPlaneCollision.prototype.collisionBetween(movingBalls[i], ceiling);
		ParticleAAHalfPlaneCollision.prototype.collisionBetween(movingBalls[i], floor);
		
		ParticleHalfPlaneCollision.prototype.collisionBetween(movingBalls[i], ramp);
		
		ParticleConvexCollision.prototype.collisionBetween(movingBalls[i], obsticle);
	}
	
	FPS_Helper.update();
}