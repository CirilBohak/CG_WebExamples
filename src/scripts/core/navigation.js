$(function() {
	$( "#zoom_nav" ).slider({
		orientation: "vertical",
		min: -100, max: 100, value: 0,
		slide: function( event, ui ) {
			/*if(ui.value > 90){ 
				$(this).slider( "value", 90 );
				return false;
			}else if(ui.value < -91){
				$(this).slider( "value", -91 );
				return false;
			}*/
		}
	}); $( "#zoom_nav > a" ).removeAttr("href");
	
	// Hover states on the static widgets
	$( "#icons div.icon" ).hover(
		function() { $( this ).addClass( "ui-state-hover" ); },
		function() { $( this ).removeClass( "ui-state-hover" ); }
	);
	
	//TODO: ----- moving on scene
	$('#Clicker').mousedown(function () {
		//do something here
		timeout = setInterval(function () {
			//do same thing here again
			//console.log("aha");
		}, 50);

		return false;
	});
	$('#Clicker').mouseup(function () {
		clearInterval(timeout);
		return false;
	});
	$('#Clicker').mouseout(function () {
		clearInterval(timeout);
		return false;
	});
});