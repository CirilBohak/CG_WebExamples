var Easing = function(duration) {
	/*%TODO: ... if needed*/
	this.direction = new THREE.Vector3();
	this.temp = new Array();
	
	this.d = duration;
}

Easing.prototype = {
	resetTimer: function() {
		GLOBAL_EasingTimer.start(this.d);
	},
	
	setDirection: function(direction) {
		this.direction = direction.clone();
		this.resetTimer();
	},
	
	easeInQuad: function (t, b, c) {
		return c*(t/=this.d)*t + b;
	},
	easeOutQuad: function (t, b, c) {
		return -c *(t/=this.d)*(t-2) + b;
	},
	easeInOutQuad: function (t, b, c) {
		if ((t/=this.d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInCubic: function (t, b, c) {
		return c*(t/=this.d)*t*t + b;
	},
	easeOutCubic: function (t, b, c) {
		return c*((t=t/this.d-1)*t*t + 1) + b;
	},
	easeInOutCubic: function (t, b, c) {
		if ((t/=this.d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	easeInQuart: function (t, b, c) {
		return c*(t/=this.d)*t*t*t + b;
	},
	easeOutQuart: function (t, b, c) {
		return -c * ((t=t/this.d-1)*t*t*t - 1) + b;
	},
	easeInOutQuart: function (t, b, c) {
		if ((t/=this.d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	easeInQuint: function (t, b, c) {
		return c*(t/=this.d)*t*t*t*t + b;
	},
	easeOutQuint: function (t, b, c) {
		return c*((t=t/this.d-1)*t*t*t*t + 1) + b;
	},
	easeInOutQuint: function (t, b, c) {
		if ((t/=this.d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},
	easeInSine: function (t, b, c) {
		return -c * Math.cos(t/this.d * (Math.PI/2)) + c + b;
	},
	easeOutSine: function (t, b, c) {
		return c * Math.sin(t/this.d * (Math.PI/2)) + b;
	},
	easeInOutSine: function (t, b, c) {
		return -c/2 * (Math.cos(Math.PI*t/this.d) - 1) + b;
	},
	easeInExpo: function (t, b, c) {
		return (t==0) ? b : c * Math.pow(2, 10 * (t/this.d - 1)) + b;
	},
	easeOutExpo: function (t, b, c) {
		return (t==this.d) ? b+c : c * (-Math.pow(2, -10 * t/this.d) + 1) + b;
	},
	easeInOutExpo: function (t, b, c) {
		if (t==0) return b;
		if (t==this.d) return b+c;
		if ((t/=this.d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function (t, b, c) {
		return -c * (Math.sqrt(1 - (t/=this.d)*t) - 1) + b;
	},
	easeOutCirc: function (t, b, c) {
		return c * Math.sqrt(1 - (t=t/this.d-1)*t) + b;
	},
	easeInOutCirc: function (t, b, c) {
		if ((t/=this.d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	
	/**
	 * Snap in elastic effect.
	 * @method elasticIn
	 * @param {Double} t Time value used to compute current value
	 * @param {Double} b Starting value
	 * @param {Double} c Delta between start and end values
	 * @param {Double} this.d Total length of animation
	 * @param {Double} a Amplitude (optional)
	 * @param {Double} p Period (optional)
	 * @return {Double} The computed value for the current animation frame
	 */
	easeInElastic: function (t, b, c, a, p) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=this.d)==1) return b+c;  if (!p) p=this.d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*this.d-s)*(2*Math.PI)/p )) + b;
	},
	
	/**
	 * Snap out elastic effect.
	 * @method elasticOut
	 * @param {Double} t Time value used to compute current value
	 * @param {Double} b Starting value
	 * @param {Double} c Delta between start and end values
	 * @param {Double} this.d Total length of animation
	 * @param {Double} a Amplitude (optional)
	 * @param {Double} p Period (optional)
	 * @return {Double} The computed value for the current animation frame
	 */
	easeOutElastic: function (t, b, c, a, p) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=this.d)==1) return b+c;  if (!p) p=this.d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*this.d-s)*(2*Math.PI)/p ) + c + b;
	},
	
	/**
	 * Snap both elastic effect.
	 * @method elasticBoth
	 * @param {Double} t Time value used to compute current value
	 * @param {Double} b Starting value
	 * @param {Double} c Delta between start and end values
	 * @param {Double} this.d Total length of animation
	 * @param {Double} a Amplitude (optional)
	 * @param {Double} p Period (optional)
	 * @return {Double} The computed value for the current animation frame
	 */
	easeInOutElastic: function (t, b, c, a, p) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=this.d/2)==2) return b+c;  if (!p) p=this.d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*this.d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*this.d-s)*(2*Math.PI)/p )*.5 + c + b;
	},
	
	/**
	 * Backtracks slightly, then reverses direction and moves to end.
	 * @method backIn
	 * @param {Double} t Time value used to compute current value
	 * @param {Double} b Starting value
	 * @param {Double} c Delta between start and end values
	 * @param {Double} this.d Total length of animation
	 * @param {Double} s Overshoot (optional)
	 * @return {Double} The computed value for the current animation frame
	 */
	easeInBack: function (t, b, c, s) {
		if (s == undefined) s = 1.70158;
		return c*(t/=this.d)*t*((s+1)*t - s) + b;
	},
	
	/**
	 * Overshoots end, then reverses and comes back to end.
	 * @method backOut
	 * @param {Double} t Time value used to compute current value
	 * @param {Double} b Starting value
	 * @param {Double} c Delta between start and end values
	 * @param {Double} this.d Total length of animation
	 * @param {Double} s Overshoot (optional)
	 * @return {Double} The computed value for the current animation frame
	 */
	easeOutBack: function (t, b, c, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/this.d-1)*t*((s+1)*t + s) + 1) + b;
	},
	
	/**
	 * Backtracks slightly, then reverses direction, overshoots end, 
	 * then reverses and comes back to end.
	 * @method backBoth
	 * @param {Double} t Time value used to compute current value
	 * @param {Double} b Starting value
	 * @param {Double} c Delta between start and end values
	 * @param {Double} this.d Total length of animation
	 * @param {Double} s Overshoot (optional)
	 * @return {Double} The computed value for the current animation frame
	 */
	easeInOutBack: function (t, b, c, s) {
		if (s == undefined) s = 1.70158;
		if ((t/=this.d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	
	/**
	 * Bounce off of start.
	 * @method bounceIn
	 * @param {Double} t Time value used to compute current value
	 * @param {Double} b Starting value
	 * @param {Double} c Delta between start and end values
	 * @param {Double} this.d Total length of animation
	 * @return {Double} The computed value for the current animation frame
	 */
	easeInBounce: function (t, b, c) {
		return c - this.easeOutBounce (x-t, 0, c) + b;
	},
	
	/**
	 * Bounces off end.
	 * @method bounceOut
	 * @param {Double} t Time value used to compute current value
	 * @param {Double} b Starting value
	 * @param {Double} c Delta between start and end values
	 * @param {Double} this.d Total length of animation
	 * @return {Double} The computed value for the current animation frame
	 */
	easeOutBounce: function (t, b, c) {
		if ((t/=this.d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	
	/**
	 * Bounces off start and end.
	 * @method bounceBoth
	 * @param {Double} t Time value used to compute current value
	 * @param {Double} b Starting value
	 * @param {Double} c Delta between start and end values
	 * @param {Double} this.d Total length of animation
	 * @return {Double} The computed value for the current animation frame
	 */
	easeInOutBounce: function (t, b, c) {
		if (t < this.d/2) return this.easeInBounce (x, t*2, 0, c) * .5 + b;
		return this.easeOutBounce (x, t*2-this.d, 0, c) * .5 + c*.5 + b;
	}
}