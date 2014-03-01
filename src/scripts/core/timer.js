var Timer = function(duration) {
	this._start_time = new Date().getTime();
	this._d = duration==null?null:duration;
	this.s = 0;
}

Timer.prototype = {
	start: function() { this.start(null); },
	
	start: function(duration){
		this._start_time = new Date().getTime();
		this._d = duration==null?null:duration;
		this.s = 0;
	},
	
	isEnd: function() {
		if(this._d != null) return this._d == this.s;
		else return false;
	},
	
	isNotEnd: function() {
		if(this._d != null) return this._d > this.s;
		else return false;
	},
	
	step: function(){
		this.s = new Date().getTime()-this._start_time;
		if(this.s >= this._d) this.s = this._d;
		console.log(this.s);
		return this.s;
	},
	
	totalTime: function() { return this._d; },
	
	end: function() {
		this._d = new Date().getTime()-this._start_time;
		return this._d;
	}
}