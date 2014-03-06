var ConvexPolygon = function () {
	this.verteces = new Array();
	this.edges = new Array();
	this.halfPlanes = new Array();
};
	
ConvexPolygon.polygonWithVertices = function(verteces){
	return new ConvexPolygon().initWithVertices(verteces);
}
	
ConvexPolygon.prototype = {
	constructor: ConvexPolygon,
	
	initWithVertices: function(verteces){
		this.verteces = verteces.concat(); //allocate new array
		
		var edges = new Array(),
			halfPlanes = new Array();
		
		for(var i=0; i<this.verteces.length; i++){
			var j = (i+1) % this.verteces.length;
			
			var edge = new Vector3().subVectors(this.verteces[j],this.verteces[i]);
			this.edges.push(edge);
			
			var normal = new Vector3(edge.y, -edge.x, 0).normalize();
			var distance = new Vector3().dotVectors(this.verteces[i],normal);
			this.halfPlanes.push(HalfPlane.halfPlaneWithNormal(normal, distance));
		}
		
		//this.edges = edges.concat(); //allocate new array
		//this.halfPlanes = halfPlanes.concat(); //allocate new array
		
		return this;
	},
	
	isInstanceOf : function(obj){
		return 	obj === ConvexPolygon;
	}
}