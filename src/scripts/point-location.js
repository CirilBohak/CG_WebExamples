function exampleInit() {
    addPointToList(new Point(3, 2, 0));
}

function addPointToList(point) {
    points.push(point);
	
    createPointSelection(point, points.length-1);
	
	var target = document.getElementById( "point"+(points.length-1) );
	target.parentNode.scrollTop = target.offsetTop;
}