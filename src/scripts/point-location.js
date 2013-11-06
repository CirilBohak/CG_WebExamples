function exampleInit() {
    addPointToList(new Point(3, 2, 0));
}

function addPointToList(point) {
    points.push(point);
    createPointSelection(point, points.length-1);
}

function createPointSelection(point, index){
	$("#pointList").append(
        "<div id=\"point"+ index +"\" class=\"vectorItem\">"+
            "<div class=\"floatLeft vectorValue\">"+
                "Point " + index + ":"+
                "<br />"+
                "<div class=\"squareBracket\">"+
                    "["+
                "</div>"+
                "<div class=\"floatLeft\">"+
                    "<input class=\"vecInput\" type=\"number\" value=\""+point.x+"\" min=\"-20\" max=\"20\" step=\"1\" /><br />"+
                    "<input class=\"vecInput\" type=\"number\" value=\""+point.y+"\" min=\"-20\" max=\"20\" step=\"1\" />"+
                "</div>"+
                "<div class=\"squareBracket\">"+
                    "]"+
                "</div>"+
				"<div class=\"paddingLeftPoint\">"+
					"<button type=\"button\" onClick=\"removedPointUpdate("+index+")\">Remove</button>"+
                "</div>"+
            "</div>"+
        "</div>");
    $("#point"+ index +" input").on('change', function () { updatePoints(false); });
}

function removedPointUpdate(index){
	points.splice(index,1);
	$("#pointList").html("");
	
	for(var i=0; i < points.length; i++){
		createPointSelection(points[i], i);
	}
	
	updatePoints(true);
}

// updating point values
function updatePoints(values) {
    if (!values) {
        for (var i = 0; i < points.length; i++) {
            var vals = $("#point"+i+" input");
            var point = points[i];
            point.x = $(vals[0]).val();
            point.y = $(vals[1]).val();
        }
    } else {
        for (var i = 0; i < points.length; i++) {
            var vals = $("#point"+i+" input");
            var point = points[i];
            $(vals[0]).val(point.x);
            $(vals[1]).val(point.y);
        }
    }
    console.log("Bla");
}

// adding new point to the list 
function addPoint(x, y, z) {
    addPointToList(canvasToGridTransform(new Point(x, y, z)));
}