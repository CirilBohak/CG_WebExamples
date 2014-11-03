// auxiliary class for point
var MovingBall = function (x, y, z, l,  dx,dy,dz,   r, g, b) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;

    this.dx = dx;
    this.dy = dy;
    this.dz = dz;

    this.l = l;

    this.selected = false;
    
    this.isCollided = false;

    //Maybe we can find a better solution for colours??? 
    this.r = r || 0;
    this.g = g || 0;
    this.b = b || 0;
};

MovingBall.prototype = {
    constructor: MovingBall,

    /*****************
	   SET FUNCTIONS
	******************/
    set: function (x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    },

    setStepDirection: function(x,y,z){
        this.dx = x;
        this.dy = y;
        this.dz = z;
    },

    //COLOUR
    setColor: function (vector) { //try to fix with color.js
        this.r = vector.x;
        this.g = vector.y;
        this.b = vector.y;
        return this;
    },

    setColor: function (r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
        return this;
    },

    setColorR: function (r) {
        this.r = r;
        return this;
    },

    setColorG: function (g) {
        this.g = g;
        return this;
    },

    setColorB: function (b) {
        this.b = b;
        return this;
    },

    /******************
	   MATH FUNCTIONS
	*******************/
    getBoundingBox: function(){
        var array = new Array();

        array.push( new Point(this.x - this.l/2,this.y - this.l/2));
        array.push( new Point(this.x + this.l/2,this.y + this.l/2));

        return array;
    },
   
    /****************************
	   PROCESSING DRAW FUNCTION
	*****************************/
    draw: function () {
        var pt = gridToCanvasTransformMovingBall(this);
        proc.stroke(this.r, this.g, this.b);
        
        if (alg == 1) {
            proc.stroke(200, 200, 200);
            proc.rect(pt.x - this.l * unit / 2, pt.y - this.l * unit / 2, this.l * unit, this.l * unit);
            
        }

        if (this.selected == true)
            proc.stroke(0, 0, 255);
            else{
                if (this.isCollided == true)
                    proc.stroke(255, 0, 0);
                else
                    proc.stroke(this.r, this.g, this.b);
            }

        proc.ellipse(pt.x, pt.y, unit * this.l, unit * this.l);
    }
}