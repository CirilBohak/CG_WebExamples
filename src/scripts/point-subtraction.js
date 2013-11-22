function exampleInit() {
    addPointToList(new Point(3, 2, 0));
}

function addPointToList(point) {
    points.push(point);
	
    createPointSelection(point, points.length-1);

	updatePointDropDownLists(points.length - 1);
}

function addVectorToList(vec) {
<<<<<<< HEAD
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
                    "<input class=\"vecInput\" type=\"number\" value=\""+vec.locX+"\" min=\"-20\" max=\"20\" step=\"1\" /><br />"+
                    "<input class=\"vecInput\" type=\"number\" value=\""+vec.locY+"\" min=\"-20\" max=\"20\" step=\"1\" />"+
                "</div>"+
                "<div class=\"squareBracket\">"+
                    "]"+
                "</div>"+
            "</div>"+
        "</div>"+
        "<br /><br />");
	if(vectors.length==1) { 
      $("#vectorList").prepend("<br /><p style=\"font-family:Verdana;font-size:11px;font-style:normal\"><b>Note:</b> values do not represent vector components but its location!</p><br />");	
	}
    $("#vec"+ (vectors.length - 1) +" input").on('change', function () { updateVectors(false); });
=======
	vectors.push(vec);
	
	createVectorSelection(vec, vectors.length-1);
>>>>>>> origin/dp3698_E-Learning
}

/****************
   CALCULATION
*****************/
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
		
		var result = new Vector3((	pointB.x-pointA.x), (pointB.y-pointA.y), (pointB.z-pointA.z), 
									pointA.x, pointA.y, pointA.z);	
		
		addVectorToList(result);
	}
}
