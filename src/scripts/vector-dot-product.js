function exampleInit() {
    addVectorToList(new Vector(2, 5, 0, 1, 2, 0));
    addVectorToList(new Vector(6, 3, 0, -2, 2, 0));
}

// adding new vector to the list
function addVectorToList(vec) {
    vectors.push(vec);
	
    createVectorSelection(vec, vectors.length-1);
	
	updateDropDownLists(vectors.length - 1);	
}

function createVectorSelection(vec, index){
    $("#vectorList").append(
        "<div onmouseover='vectors["+index+"].setColor(255,0,0), $(this).css(\"background\",\"#EEE\")' onmouseout='vectors["+index+"].setColor(0,0,0), $(this).css(\"background\",\"#fff\")' id=\"vec"+ index +"\" class=\"vectorItem\">"+
            "<div class=\"floatLeft vectorValue\">"+
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
                "Point " + index + ":"+
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
                "<button type=\"button\" onClick=\"vectors["+index+"].negate(),updateVectors(true)\">Negate</button>"+
                "<button type=\"button\" onClick=\"removedVectorUpdate("+index+")\">Remove</button>"+
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
		updateDropDownLists(i);
	}
	
	updateVectors(true);
}

function calculateDotProduct() {
	var vectorA = new Vector(	parseInt($($("#vec"+$("#firstvector").val()+" input")[0]).val()),
								parseInt($($("#vec"+$("#firstvector").val()+" input")[1]).val()),
								0);
	var vectorB = new Vector(	parseInt($($("#vec"+$("#secondvector").val()+" input")[0]).val()),
								parseInt($($("#vec"+$("#secondvector").val()+" input")[1]).val()),
								0);
	
	var dotProduct = new Vector().dotVectors(vectorA,vectorB);
	
	$("#result").html("<b>Result:</b> ("+vectorA.x+")*("+vectorA.y+") + ("+vectorB.x+")*("+vectorB.y+") = "+dotProduct);
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
