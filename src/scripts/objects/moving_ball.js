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
};

MovingBall.prototype = {
	constructor: MovingBall,
	
	update: function(elapsed_time){ //elapsed time is computed for all objects in main app
		/*TODO*/
	},
	
    draw: function () {
		drawPoint(this.circle.center, this.circle.r, this.color, 2); //Same as for circle drawing
		drawArrow(this.circle.center, this.velocity, 1, {r: 255, g: 0, b: 0, a: 255}, 8);
    },
	
	/*Collision detections*/
	AABB_collision: function(moving_ball){
		return this.AABB.aabb_intersect(moving_ball.AABB);
	},
	
	collision: function(moving_ball){ //circle collision
		return this.circle.circle_intersect(moving_ball.circle);
	}
}