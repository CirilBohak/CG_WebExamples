var IRectangleSize = function () {
	this.width = 0.0;
	this.height = 0.0;
};

IRectangleSize.prototype = {
	constructor: IRectangleSize,
	
	isInstanceOf : function(obj){
		return 	obj === IRectangleSize;
	}
}