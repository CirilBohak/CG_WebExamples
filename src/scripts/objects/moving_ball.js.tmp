// auxiliary class for point
var MovingBall = function (x, y, z, r, dx, dy, dz) {
    this.selected = false;
    this.isCollided = false;
	
	this.color = new Color();
	
	this.circle = new Circle(x || 0, y || 0, r); //Center and diameter
	this.AABB = new AABB(this.circle.center.x + this.circle.r, this.circle.center.y + this.circle.r,
						 this.circle.center.x - this.circle.r, this.circle.center.y - this.circle.r);
	
	this.velocity = new Vector3(dx, dy, dz);
	this.acceleration = this.velocity.clone();
	this.mass = this.circle.r;
};

MovingBall.prototype = {
	constructor: MovingBall,
	
	update: function(elapsed_time){ //elapsed time is computed for all objects in main app
		//d = (v + (0.5 * a * t)) * t
		//var direction = this.velocity.clone().add(this.acceleration.clone().multiplyScalar(elapsed_time*0.5)).multiplyScalar(elapsed_time);
		//document.getElementById("time").innerHTML = "elapsed time [s]: " + elapsed_time + "<br />direction: ["+direction.x + ", " + direction.y +"]";
		
		this.circle.center.add(this.velocity.clone().multiplyScalar(elapsed_time));
	},
	
    draw: function () {
		drawPoint(this.circle.center, this.circle.r*2, this.color, 2); //Same as for circle drawing
		drawArrow(this.circle.center, {x: this.velocity.x, y: -this.velocity.y}, 1, {r: 255, g: 0, b: 0, a: 255}, 8);
    },
	
	/*Collision detections*/
	AABB_collision: function(moving_ball){
		return this.AABB.aabb_intersect(moving_ball.AABB);
	},
	
	collision: function(moving_ball){ //circle collision
		return this.circle.circle_intersect(moving_ball.circle);
	},
	
	resolveBoxCollision: function(width, height){
		if (this.circle.center.x >= width - this.circle.r && this.velocity.x > 0 ||
			this.circle.center.x <= this.circle.r && this.velocity.x < 0) this.velocity.x = -this.velocity.x;
		if (this.circle.center.y >= height - this.circle.r && this.velocity.y > 0 ||
			this.circle.center.y <= this.circle.r && this.velocity.y < 0) this.velocity.y = -this.velocity.y;
	},
	
	resolveMovingBallCollision: function(moving_ball, elapsed_time){
		var mass1 = this.mass,
			mass2 = moving_ball.mass;
		var velX1 = this.velocity.x,
			velX2 = moving_ball.velocity.x;
		var velY1 = this.velocity.y,
			velY2 = moving_ball.velocity.y;
		
		var newVelX1 = (velX1 * (mass1 - mass2) + (2 * mass2 * velX2)) / (mass1 + mass2),
			newVelY1 = (velY1 * (mass1 - mass2) + (2 * mass2 * velY2)) / (mass1 + mass2);
			
		var newVelX2 = (velX2 * (mass2 - mass1) + (2 * mass1 * velX1)) / (mass1 + mass2),
			newVelY2 = (velY2 * (mass2 - mass1) + (2 * mass1 * velY1)) / (mass1 + mass2);
		
		this.velocity.set(newVelX1, newVelY1, 0);
		moving_ball.velocity.set(newVelX2, newVelY2, 0);
		
		/*TODO: better fix for already collided*/
		this.update(elapsed_time);
		moving_ball.update(elapsed_time);
	}
}