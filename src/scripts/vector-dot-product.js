function exampleInit() {
    addVectorToList(new Vector(2, 5, 0, 1, 2, 0));
    addVectorToList(new Vector(6, 3, 0, -2, 2, 0));
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
                    "<input class=\"vecInput\" type=\"number\" value=\""+vec.loc.x+"\" min=\"-20\" max=\"20\" step=\"1\" /><br />"+
                    "<input class=\"vecInput\" type=\"number\" value=\""+vec.loc.y+"\" min=\"-20\" max=\"20\" step=\"1\" />"+
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

function calculateDotProduct() {
	var firstVectorX=parseInt($($("#vec"+$("#firstvector").val()+" input")[0]).val());
	var firstVectorY=parseInt($($("#vec"+$("#firstvector").val()+" input")[1]).val());	
	var secondVectorX=parseInt($($("#vec"+$("#secondvector").val()+" input")[0]).val());
	var secondVectorY=parseInt($($("#vec"+$("#secondvector").val()+" input")[1]).val());
	
	var dotProduct=(firstVectorX*secondVectorX)+(firstVectorY*secondVectorY);
	$("#result").html("<b>Result:</b> ("+firstVectorX+")*("+secondVectorX+") + ("+firstVectorY+")*("+secondVectorY+") = "+dotProduct);
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
function updateDropDownLists(vectorIndex)
{
	$("#firstvector").append('<option value=\"'+vectorIndex+'\">Vector '+vectorIndex+'</option>');	
	$("#secondvector").append('<option value=\"'+vectorIndex+'\">Vector '+vectorIndex+'</option>');	
}
