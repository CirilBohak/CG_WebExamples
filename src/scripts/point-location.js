function exampleInit() {
    addPointToList(new Point(3, 2, 0));
}

function addPointToList(point) {
    points.push(point);
	
    createPointSelection(point, points.length-1);
}