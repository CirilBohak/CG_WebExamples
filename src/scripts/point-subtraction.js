function exampleInit() {
    addPointToList(new Point(3, 2, 0));
}

function addPointToList(point) {
    points.push(point);
     $("#pointList").append(
        "<div id=\"point"+ (points.length - 1) +"\" class=\"vectorItem\">"+
            "<div class=\"floatLeft vectorValue\">"+
                "Point " + (points.length - 1) + ":"+
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
            "</div>"+
        "</div>"+
        "<br /><br />");
    $("#point"+ (points.length - 1) +" input").on('change', function () { updatePoints(false); });
	updateDropDownLists(points.length - 1);
}

function subtractPoints() {
	var firstPoint0=$($("#point"+$("#firstpoint").val()+" input")[0]).val();
	var firstPoint1=$($("#point"+$("#firstpoint").val()+" input")[1]).val();
	var secondPoint0=$($("#point"+$("#secondpoint").val()+" input")[0]).val();
	var secondPoint1=$($("#point"+$("#secondpoint").val()+" input")[1]).val();
	
	var vector=new Vector((secondPoint0-firstPoint0), (secondPoint1-firstPoint1), 0, firstPoint0, firstPoint1, 0);
	addVectorToList(vector);
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
    $("#vectorList").append(
        "<div id=\"vec"+ (vectors.length - 1) +"\" class=\"vectorItem\">"+
            "<div class=\"floatLeft vectorValue\" style=\"display:none;\">"+
                "Vector " + (vectors.length - 1) + ":"+
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
                "Vector " + (vectors.length - 1) + ":"+
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
            "</div>"+
        "</div>"+
        "<br /><br />");
    $("#vec"+ (vectors.length - 1) +" input").on('change', function () { updateVectors(false); });
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
