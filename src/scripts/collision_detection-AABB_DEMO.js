var movingBalls = Array();

var startTime = Date.now(),
	nowTimw = 0,
	elapsed_time = 0;

var PPC = new ParticleParticleCollision();

function exampleInit() {
	var ball = new MovingBall();
	ball.init(new Vector3(100,100,0),new Vector3(100,30,0), 100, 50);
	movingBalls.push(ball);
	
	ball = new MovingBall();
	ball.init(new Vector3(100,300,0),new Vector3(100,0,0), 50, 25);
	movingBalls.push(ball);
}

function draw() {
	update();
	
    // clear background
    proc.background(255);
	
	for(var i=0; i<movingBalls.length; i++) movingBalls[i].draw();
}

function update(){
	nowTimw = Date.now();
	elapsed_time = (nowTimw - startTime) * 0.001;
	startTime = nowTimw;
	
	document.getElementById("time").innerHTML = "elapsed time [s]: " + elapsed_time;
	
	for(var i=0; i<movingBalls.length; i++){
		MovementPhysics.simulateMovementOn(movingBalls[i], elapsed_time);
	}
	
	for(var i=0; i<movingBalls.length; i++){
		for(var j=0; j<movingBalls.length; j++){
			if(i != j){
				PPC.collisionBetween(movingBalls[i], movingBalls[j]);
			}
		}
		
		resolveWorldAABBCollision(movingBalls[i], proc.width, proc.height);
	}
}

function resolveWorldAABBCollision(item, width, height){
	if (item.position.x >= width - item.radius && item.velocity.x > 0 ||
		item.position.x <= item.radius && item.velocity.x < 0) item.velocity.x = -item.velocity.x;
	if (item.position.y >= height - item.radius && item.velocity.y > 0 ||
		item.position.y <= item.radius && item.velocity.y < 0) item.velocity.y = -item.velocity.y;
}