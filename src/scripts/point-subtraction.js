function exampleInit() {
    addPointToList(new Point(3, 2));
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
}

function addSubtractedPointToList() {
	var firstPoint0=$($("#point"+$("#firstpoint").val()+" input")[0]).val();
	var firstPoint1=$($("#point"+$("#firstpoint").val()+" input")[1]).val();
	var secondPoint0=$($("#point"+$("#secondpoint").val()+" input")[0]).val();
	var secondPoint1=$($("#point"+$("#secondpoint").val()+" input")[1]).val();
    var point=new Point((firstPoint0-secondPoint0), (firstPoint1-secondPoint1));
    addPointToList(point)
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
function addPoint(x, y) {
    addPointToList(canvasToGridTransform(new Point(x, y)));
}
