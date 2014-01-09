var hand_button_flag = false;

function navigation_move(button){ console.log("Moving to: " + button); return false; }
function set_hand_control(flag){ console.log(flag); return false; }

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
	
	$("#zoom_in").mousedown(function(){
		timeout = setInterval(function () {
			var element = $( "#zoom_nav" );
			element.slider( "value", element.slider("option", "value") + 1);
		}, 50);
	})
	
	$('#zoom_in').mouseup(function () { if(typeof timeout !== 'undefined'){ clearInterval(timeout); } return false; });
	$('#zoom_in').mouseout(function () { if(typeof timeout !== 'undefined'){ clearInterval(timeout); } return false; });
	
	$("#zoom_out").mousedown(function(){
		timeout = setInterval(function () {
			var element = $( "#zoom_nav" );
			element.slider( "value", element.slider("option", "value") - 1);
		}, 50);
	})
	
	$('#zoom_out').mouseup(function () { if(typeof timeout !== 'undefined'){ clearInterval(timeout); } return false; });
	$('#zoom_out').mouseout(function () { if(typeof timeout !== 'undefined'){ clearInterval(timeout); } return false; });
	
	//Moving on scene
	
	$('#icons .move_nav').children().mousedown(function () {
		var clicked = null,
			element = $(this);
		var clicked_class = element.attr("class");
		if(clicked_class == "up button")
			clicked = 0;
		else if(clicked_class == "down button")
			clicked = 1;
		else if(clicked_class == "right button")
			clicked = 2;
		else if(clicked_class == "left button")
			clicked = 3
		else{
			hand_button_flag = !hand_button_flag;
			
			if(hand_button_flag) element.addClass("selected");
			else element.removeClass("selected");
			
			set_hand_control(hand_button_flag);
			
			element.mouseup();
		}
		
		if(clicked != null){
			timeout = setInterval(function () {
				navigation_move(clicked)
			}, 50);
		}
		return false;
	});
	
	$('#icons .move_nav').children().mouseup(function () { if(typeof timeout !== 'undefined'){ clearInterval(timeout); } return false; });
	$('#icons .move_nav').children().mouseout(function () { if(typeof timeout !== 'undefined'){ clearInterval(timeout); } return false; });
});