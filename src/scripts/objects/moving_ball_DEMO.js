// auxiliary class for point
var MovingBall = function () {
	IParticle.call( this );
	ICoefficientOfRestitution.call(this);
};

MovingBall.prototype = {
	constructor: MovingBall,
	
	init : function(position, velocity, mass, radius){
		this.position = position;
		this.velocity = velocity;
		this.mass = mass;
		this.radius = radius;
		this.coefficientOfRestitution = 0.5; 
	},
	
	draw : function(){
		drawPoint(this.position, this.radius * 2, {r: 0, g: 0, b: 0, a: 255}, 2); //Same as for circle drawing
		drawArrow(this.position, {x: this.velocity.x, y: -this.velocity.y}, 1, {r: 255, g: 0, b: 0, a: 255}, 8);
	},
	
	isInstanceOf : function(obj){
		return 	obj === MovingBall ||
				(obj === IParticle ? true : IParticle.prototype.isInstanceOf.call(this, obj)) ||
				(obj === ICoefficientOfRestitution ? true : ICoefficientOfRestitution.prototype.isInstanceOf.call(this, obj));
	}
}

MovingBall.prototype.__proto__ = IParticle.prototype;
MovingBall.prototype.__proto__.__proto__ = ICoefficientOfRestitution.prototype;