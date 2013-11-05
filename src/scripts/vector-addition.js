function exampleInit() {
    addVectorToList(new Vector(2, 5, 1, 2));
    addVectorToList(new Vector(6, 3, -2, 2));
}

// adding new vector to the list
function addVectorToList(vec) {
    vectors.push(vec);
    $("#vectorList").append(
        "<div id=\"vec"+ (vectors.length - 1) +"\" class=\"vectorItem\">"+
            "<div class=\"floatLeft vectorValue\">"+
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
                "Point " + (vectors.length - 1) + ":"+
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
            "<div class=\"paddingLeft\">"+
                "<button type=\"button\" onClick=\"vectors["+(vectors.length-1)+"].negate()\">Negate</button>"+
            "</div>"+
        "</div>"+
        "<br /><br />");
    $("#vec"+ (vectors.length - 1) +" input").on('change', function () { updateVectors(false); });
	updateDropDownLists(vectors.length - 1);	
}

function addAddedVectorToList() {
	var firstVectorX=parseInt($($("#vec"+$("#firstvector").val()+" input")[0]).val());
	var firstVectorY=parseInt($($("#vec"+$("#firstvector").val()+" input")[1]).val());
	var firstVectorLocX=parseInt($($("#vec"+$("#firstvector").val()+" input")[2]).val());
	var firstVectorLocY=parseInt($($("#vec"+$("#firstvector").val()+" input")[3]).val());
	var secondVectorX=parseInt($($("#vec"+$("#secondvector").val()+" input")[0]).val());
	var secondVectorY=parseInt($($("#vec"+$("#secondvector").val()+" input")[1]).val());
	
	var point1X=(firstVectorX+secondVectorX);
	var point1Y=(firstVectorY+secondVectorY);
	
	var vector=new Vector(point1X, point1Y, firstVectorLocX, firstVectorLocY,250);
	
	// add temporary vector	
	vectors.push(new Vector(secondVectorX, secondVectorY, (firstVectorX+firstVectorLocX), (firstVectorY+firstVectorLocY), 224, 102, 0));	
	//window.setTimeout(cancelTemporaryVector(vectors.length - 1), 3000);
	setTimeout(function(){vectors.splice((vectors.length),1);updateVectors(false);},2000);	
	
	addVectorToList(vector);
}

// updating vector values
function updateVectors(values,color,color1,color2) {
    if (!values) {
        for (var i = 0; i < vectors.length; i++) {
            var vals = $("#vec"+i+" input");
            var vec = vectors[i];
            vec.x = $(vals[0]).val();
            vec.y = $(vals[1]).val();
            vec.locX = $(vals[2]).val();
            vec.locY = $(vals[3]).val();
			if (color !== undefined) { vec.color=color; }
			if (color1 !== undefined) { vec.color1=color1; }
			if (color2 !== undefined) { vec.color2=color2; }
        }
    } else {
        for (var i = 0; i < vectors.length; i++) {
            var vals = $("#vec"+i+" input");
            var vec = vectors[i];
            $(vals[0]).val(vec.x);
            $(vals[1]).val(vec.y);
            $(vals[2]).val(vec.locX);
            $(vals[3]).val(vec.locY);
        }
    }
}

// update drop down lists when adding a new point
function updateDropDownLists(vectorIndex)
{
	$("#firstvector").append('<option value=\"'+vectorIndex+'\">Vector '+vectorIndex+'</option>');	
	$("#secondvector").append('<option value=\"'+vectorIndex+'\">Vector '+vectorIndex+'</option>');	
}
