function exampleInit() {
    addPointToList(new Point(3, 2, 0));
}

function addPointToList(point) {
    points.push(point);
	
    createPointSelection(point, points.length-1);

	updateDropDownLists(points.length - 1);
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
	//REMOVE ALL POINTS FROM DROPDOWN MENU
	$("#firstpoint").html("");
	$("#secondpoint").html("");
	
	for(var i=0; i < points.length; i++){
		createPointSelection(points[i], i);
		updateDropDownLists(i);
	}
	
	updatePoints(true);
}

function subtractPoints() {
	if(points.length === 1) { 
		$("#vectorList").prepend("<br /><p style=\"font-family:Verdana;font-size:11px;font-style:normal\"><b>Note:</b> values do not represent vector components but its location!</p><br />");	
	}else{
		var pointA = new Point(	$($("#point"+$("#firstpoint").val()+" input")[0]).val(),
								$($("#point"+$("#firstpoint").val()+" input")[1]).val(),
								0);
		
		var pointB = new Point(	$($("#point"+$("#secondpoint").val()+" input")[0]).val(),
								$($("#point"+$("#secondpoint").val()+" input")[1]).val(),
								0);
		
		var result = new Vector((pointB.x-pointA.x), (pointB.y-pointA.y), (pointB.z-pointA.z), 
								pointA.x, pointA.y, pointA.z);	
		addVectorToList(result);
	}
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
    //console.log("Bla");
}

// update drop down lists when adding a new point
function updateDropDownLists(pointIndex)
{
	$("#firstpoint").append('<option value=\"'+pointIndex+'\">Point '+pointIndex+'</option>');	
	$("#secondpoint").append('<option value=\"'+pointIndex+'\">Point '+pointIndex+'</option>');	
}

// adding new point to the list 
function addPoint(x, y, z) {
    addPointToList(canvasToGridTransform(new Point(x, y, z)));
}

// ------------- VECTORS ------------

// adding new vector to the list
function addVectorToList(vec) {
    vectors.push(vec);
    createVectorSelection(vec, vectors.length-1);
}

function createVectorSelection(vec, index){
    $("#vectorList").append(
        "<div id=\"vec"+ index +"\" class=\"vectorItem\">"+
            "<div class=\"floatLeft vectorValue\" style=\"display:none;\">"+
                "Vector " + index + ":"+
                "<br />"+
                "<div class=\"squareBracket\">"+
                    "["+
                "</div>"+
                "<div class=\"floatLeft\">"+
                    "<input class=\"vecInput\" type=\"number\" value=\""+vec.x+"\" min=\"-20\" max=\"20\" step=\"1\" /><br />"+
                    "<input class=\"vecInput\" type=\"number\" value=\""+vec.y+"\" min=\"-20\" max=\"20\" step=\"1\" />"+
                "</div>"+
                "<div class=\"squareBracket\">"+
                    "]"+
                "</div>"+
            "</div>"+
            "<div class=\"vectorValue\">"+
                "Vector " + index + ":"+
                "<br />"+
                "<div class=\"squareBracket\">"+
                    "["+
                "</div>"+
                "<div class=\"floatLeft\">"+
                    "<input class=\"vecInput\" type=\"number\" value=\""+vec.loc.x+"\" min=\"-20\" max=\"20\" step=\"1\" /><br />"+
                    "<input class=\"vecInput\" type=\"number\" value=\""+vec.loc.y+"\" min=\"-20\" max=\"20\" step=\"1\" />"+
                "</div>"+
                "<div class=\"squareBracket\">"+
                    "]"+
                "</div>"+
				"<div class=\"paddingLeftPoint\">"+
					"<button type=\"button\" onClick=\"removedVectorUpdate("+index+")\">Remove</button>"+
				"</div>"+
            "</div>"+
        "</div>");
    $("#vec"+ index +" input").on('change', function () { updateVectors(false); });
}

function removedVectorUpdate(index){
	vectors.splice(index,1);
	$("#vectorList").html("");
	
	for(var i=0; i < vectors.length; i++){
		createVectorSelection(vectors[i], i);
	}
	
	updateVectors(true);
}

// updating vector values
function updateVectors(values) {
    if (!values) {
        for (var i = 0; i < vectors.length; i++) {
            var vals = $("#vec"+i+" input");
            var vec = vectors[i];
            vec.x = $(vals[0]).val();
            vec.y = $(vals[1]).val();
            vec.loc.x = $(vals[3]).val();
            vec.loc.y = $(vals[4]).val();
			
			console.log($(vals));
        }
    } else {
        for (var i = 0; i < vectors.length; i++) {
            var vals = $("#vec"+i+" input");
            var vec = vectors[i];
            $(vals[0]).val(vec.x);
            $(vals[1]).val(vec.y);
            $(vals[3]).val(vec.loc.x);
            $(vals[4]).val(vec.loc.y);
	
			console.log($(vals));
        }
    }
}
