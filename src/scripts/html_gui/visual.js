function clear_all_elements(){
	points.splice(0,points.length);
	$("#pointList").html("");
	vectors.splice(0,vectors.length);
	$("#vectorList").html("");
	
	//REMOVE ALL POINTS FROM DROPDOWN MENU
	$("#firstpoint").html("");
	$("#secondpoint").html("");
	
	//REMOVE ALL VECTORS FROM DROPDOWN MENU
	$("#firstvector").html("");
	$("#secondvector").html("");
}

/*********************
        POINTS
**********************/

function createPointSelection(point, index){
	$("#pointList").append(
        "<div onmouseover='points["+index+"].setColor(255,0,0), $(this).css(\"background\",\"#EEE\")' onmouseout='points["+index+"].setColor(0,0,0), $(this).css(\"background\",\"#fff\")' id=\"point"+ index +"\" class=\"vectorItem\" >"+
            "<div class=\"vectorValue\">"+
                "Point " + index + ":"+
                "<br />"+
				"<div class=\"floatLeft space\">"+
					"<table><tr>"+
						"<td class=\"leftMV\"></td>"+
						"<td>"+
							"<div class=\"floatLeft\">"+
								"<input class=\"vecInputCol\" type=\"number\" value=\""+point.x+"\" min=\"-20\" max=\"20\" step=\"1\" /><br />"+
								"<input class=\"vecInputCol\" type=\"number\" value=\""+point.y+"\" min=\"-20\" max=\"20\" step=\"1\" />"+
							"</div>"+
						"</td>"+
						"<td class=\"rightMV\"></td>"+
					"</tr></table>"+
				"</div>"+
				"<div class=\"paddingLeftPoint\">"+
					"<button  id=\"remove\" type=\"button\" onClick=\"removedPointUpdate("+index+")\">Remove</button>"+
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
		updatePointDropDownLists(i);
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
   //console.log("Bla");
}

// update drop down lists when adding a new point
function updatePointDropDownLists(pointIndex) {
	$("#firstpoint").append('<option value=\"'+pointIndex+'\">Point '+pointIndex+'</option>');	
	$("#secondpoint").append('<option value=\"'+pointIndex+'\">Point '+pointIndex+'</option>');	
}

// adding new point to the list 
function addPoint(x, y, z) {
    addPointToList(canvasToGridTransform(new Point(x, y, z)));
}

/*********************
        VECTORS
**********************/

function createVectorSelection(vec, index){
	$("#vectorList").append(
	"<div onmouseover='vectors["+index+"].setColor(255,0,0), $(this).css(\"background\",\"#EEE\")' onmouseout='vectors["+index+"].setColor(0,0,0), $(this).css(\"background\",\"#fff\")' id=\"vec"+ index +"\" class=\"vectorItem\">"+
		"<div class=\"floatLeft vectorValue\">"+
			"Vector " + index + ":"+
			"<br />"+
			"<div class=\"floatLeft space\">"+
				"<table><tr>"+
					"<td class=\"leftMV\"></td>"+
					"<td>"+
						"<div class=\"floatLeft\">"+
							"<input class=\"vecInputCol\" type=\"number\" value=\""+vec.x+"\" min=\"-20\" max=\"20\" step=\"1\" /><br />"+
							"<input class=\"vecInputCol\" type=\"number\" value=\""+vec.y+"\" min=\"-20\" max=\"20\" step=\"1\" />"+
						"</div>"+
					"</td>"+
					"<td class=\"rightMV\"></td>"+
				"</tr></table>"+
			"</div>"+
		"</div>"+
		"<div class=\"vectorValue\">"+
			"Point " + index + ":"+
			"<br />"+
			"<div class=\"floatLeft space\">"+
				"<table><tr>"+
					"<td class=\"leftMV\"></td>"+
					"<td>"+
						"<div class=\"floatLeft\">"+
							"<input class=\"vecInputCol\" type=\"number\" value=\""+vec.loc.x+"\" min=\"-20\" max=\"20\" step=\"1\" /><br />"+
							"<input class=\"vecInputCol\" type=\"number\" value=\""+vec.loc.y+"\" min=\"-20\" max=\"20\" step=\"1\" />"+
						"</div>"+
					"</td>"+
					"<td class=\"rightMV\"></td>"+
				"</tr></table>"+
			"</div>"+
		"</div>"+
		"<div class=\"paddingLeft\">"+
			"<button type=\"button\" onClick=\"vectors["+index+"].negate(),updateVectors(true)\">Negate</button>"+
			"<button id=\"remove\" type=\"button\" onClick=\"removedVectorUpdate("+index+")\">Remove</button>"+
		"</div>"+
	"</div>");
	$("#vec"+ index +" input").on('change', function () { updateVectors(false); });
}

function removedVectorUpdate(index){
	vectors.splice(index,1);
	$("#vectorList").html("");
	//REMOVE ALL VECTORS FROM DROPDOWN MENU
	$("#firstvector").html("");
	$("#secondvector").html("");
	
	for(var i=0; i < vectors.length; i++){
		createVectorSelection(vectors[i], i);
		updateVectorDropDownLists(i);
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
            vec.loc.x = $(vals[2]).val();
            vec.loc.y = $(vals[3]).val();
        }
    } else {
        for (var i = 0; i < vectors.length; i++) {
            var vals = $("#vec"+i+" input");
            var vec = vectors[i];
            $(vals[0]).val(vec.x);
            $(vals[1]).val(vec.y);
            $(vals[2]).val(vec.loc.x);
            $(vals[3]).val(vec.loc.y);
        }
    }
}

// update drop down lists when adding a new point
function updateVectorDropDownLists(vectorIndex) {
	$("#firstvector").append('<option value=\"'+vectorIndex+'\">Vector '+vectorIndex+'</option>');	
	$("#secondvector").append('<option value=\"'+vectorIndex+'\">Vector '+vectorIndex+'</option>');	
}