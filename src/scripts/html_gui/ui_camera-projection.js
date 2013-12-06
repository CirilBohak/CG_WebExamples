/*****************************
      jQueryui functions
******************************/
var oldRx = 0, oldRy = 0, oldRz = 0;

$(function() {
	$( "#pX input" ).val( camera.position.x ); $( "#pY input" ).val( camera.position.y ); $( "#pZ input" ).val( camera.position.z );
	$( "#pX input" ).change(function() { camera.position.x = $(this).val(); }); $( "#pY input" ).change(function() { camera.position.y = $(this).val(); }); $( "#pZ input" ).change(function() { camera.position.z = $(this).val(); });
	$( "#pX input" ).tooltip({ offset: [0, 2], effect: 'slide'}); $( "#pY input" ).tooltip({ offset: [0, 2], effect: 'slide'}); $( "#pZ input" ).tooltip({ offset: [0, 2], effect: 'slide'});
	
	$( "#rX input" ).change(function() { 
		/*MathJax.Hub.queue.Push([	"Text",
									MathJax.Hub.getAllJax("camera_rotation")[0],
									"x="+precise_round(degree_to_rad(tmp),2)+"\\text\{ rad\}"]); */
		camera.matrixWorld.identity().setPosition(camera.position);
		camera.quaternion.setFromRotationMatrix(camera.matrixWorld);
		camera.updateProjectionMatrix();
		
		camera.rotateY(degree_to_rad($("#rY input").val()));
		camera.rotateX(degree_to_rad($(this).val()));
		camera.rotateZ(degree_to_rad($("#rZ input").val())); 
	});
	$( "#rY input" ).change(function() { 
		var tmp = $(this).val();
		/*MathJax.Hub.queue.Push([	"Text",
									MathJax.Hub.getAllJax("camera_rotation")[1],
									"y="+precise_round(degree_to_rad(tmp),2)+"\\text\{ rad\}"]); */
		//camera.rotateY(degree_to_rad(tmp-oldRy)); oldRy = tmp; 
		camera.matrixWorld.identity().setPosition(camera.position);
		camera.quaternion.setFromRotationMatrix(camera.matrixWorld);
		camera.updateProjectionMatrix();
		
		camera.rotateY(degree_to_rad($(this).val()));
		camera.rotateX(degree_to_rad($("#rX input").val()));
		camera.rotateZ(degree_to_rad($("#rZ input").val())); 
	}); 
	$( "#rZ input" ).change(function() { 
		var tmp = $(this).val();
		/*MathJax.Hub.queue.Push([	"Text",
									MathJax.Hub.getAllJax("camera_rotation")[2],
									"z="+precise_round(degree_to_rad(tmp),2)+"\\text\{ rad\}"]); */
		//camera.rotateZ(degree_to_rad(tmp-oldRz)); oldRz = tmp; 
		camera.matrixWorld.identity().setPosition(camera.position);
		camera.quaternion.setFromRotationMatrix(camera.matrixWorld);
		camera.updateProjectionMatrix();

		camera.rotateY(degree_to_rad($("#rY input").val()));
		camera.rotateX(degree_to_rad($("#rX input").val()));
		camera.rotateZ(degree_to_rad($(this).val()));  
	});
	
	$( "#rX input" ).tooltip({ offset: [0, 2], effect: 'slide'}); $( "#rY input" ).tooltip({ offset: [0, 2], effect: 'slide'}); $( "#rZ input" ).tooltip({ offset: [0, 2], effect: 'slide'});
	
	$( "#tabs" ).tabs({
		activate: function(event, ui) {
			var index = ui.newTab.index();
			
			switch(index){
				case 0: 
					c_auto = true;
					c_width = Math.min(-c_left, c_right)*2;
					c_height = Math.min(-c_bottom, c_top)*2;
					
					$( "#ui_width_slider" ).slider( "value",  c_width); $( "#ui_width_amount" ).val( c_width );
					$( "#ui_height_slider" ).slider( "value",  c_height); $( "#ui_height_amount" ).val( c_height );
					
					updateCamera(); 
				break;
				case 1: 
					c_auto = false; 
					var c_w2 = c_width*0.5; c_left=-c_w2; c_right = c_w2, c_h2 = c_height*0.5; c_bottom=-c_h2; c_top = c_h2;
					
					$( "#ui_left_slider" ).slider( "value",  c_left); $( "#ui_left_amount" ).val(c_left);
					$( "#ui_right_slider" ).slider( "value",  c_right); $( "#ui_right_amount" ).val(c_left);
					$( "#ui_bottom_slider" ).slider( "value",  c_bottom); $( "#ui_bottom_amount" ).val(c_bottom);
					$( "#ui_top_slider" ).slider( "value",  c_top); $( "#ui_top_amount" ).val(c_top);
					
					updateCamera(); 
				break;
				default: console.log('you need to update $("#tabs") activate!!!');
			}
		}
	});
	
	$( "#matrix4_01 .m00 input" ).tooltip({ offset: [0, 2], effect: 'slide'}); $( "#matrix4_01 .m03 input" ).tooltip({ offset: [0, 2], effect: 'slide'});
	$( "#matrix4_01 .m11 input" ).tooltip({ offset: [0, 2], effect: 'slide'}); $( "#matrix4_01 .m13 input" ).tooltip({ offset: [0, 2], effect: 'slide'});
	$( "#matrix4_01 .m22 input" ).tooltip({ offset: [0, 2], effect: 'slide'}); $( "#matrix4_01 .m23 input" ).tooltip({ offset: [0, 2], effect: 'slide'});
	
	/************
		WIDTH
	*************/
	$( "#ui_width_slider" ).slider({
		range: "min", value: c_width, min: 1, max: 400,
		slide: function( event, ui ) { 
			$( "#ui_width_amount" ).val( ui.value ); c_width = ui.value; updateCamera(); 
		}
	}); $( "#ui_width_slider > a" ).removeAttr("href");
	$( "#ui_width_amount" ).val( $( "#ui_width_slider" ).slider( "value" ) );
	
	$("#ui_width_amount").bind("input", function() {
		var curr_val = $(this).val();
		var min_val = $("#ui_width_slider").slider("option", "min" ), max_val = $("#ui_width_slider").slider("option", "max" );
		
		if(curr_val >= min_val){
			if(curr_val <= max_val) $("#ui_width_slider").slider("value",curr_val);
			else $(this).val(max_val);
		}else $(this).val(min_val);
		
		c_width = Number($(this).val()); updateCamera();
	});
	
	/************
		HEIGHT
	*************/
	$( "#ui_height_slider" ).slider({
		range: "min", value: c_height, min: 1, max: 400,
		slide: function( event, ui ) { 
			$( "#ui_height_amount" ).val( ui.value ); c_height = ui.value; updateCamera(); 
		}
	}); $( "#ui_height_slider > a" ).removeAttr("href");
	$( "#ui_height_amount" ).val( $( "#ui_height_slider" ).slider( "value" ) );
	
	$("#ui_height_amount").bind("input", function() {
		var curr_val = $(this).val();
		var min_val = $("#ui_height_slider").slider("option", "min" ), max_val = $("#ui_height_slider").slider("option", "max" );
		
		if(curr_val >= min_val){
			if(curr_val <= max_val) $("#ui_height_slider").slider("value",curr_val);
			else $(this).val(max_val);
		}else $(this).val(min_val);
		
		c_height = Number($(this).val()); updateCamera();
	});
	
	/************
		LEFT
	*************/
	$( "#ui_left_slider" ).slider({
		range: "min", value: c_left, min: -300, max: 1,
		slide: function( event, ui ) { $( "#ui_left_amount" ).val( ui.value ); c_left = ui.value; updateCamera(); }
	}); $( "#ui_left_slider > a" ).removeAttr("href");
	$( "#ui_left_amount" ).val( $( "#ui_left_slider" ).slider( "value" ) );
	
	$("#ui_left_amount").bind("input", function() {
		var curr_val = $(this).val();
		var min_val = $("#ui_left_slider").slider("option", "min" ), max_val = $("#ui_left_slider").slider("option", "max" );
		
		if(curr_val >= min_val){
			if(curr_val <= max_val) $("#ui_left_slider").slider("value",curr_val);
			else $(this).val(max_val);
		}else $(this).val(min_val);
		
		c_left = Number($(this).val()); updateCamera();
	});
	
	/************
		RIGHT
	*************/
	$( "#ui_right_slider" ).slider({
		range: "min", value: c_right, min: 1, max: 300,
		slide: function( event, ui ) { $( "#ui_right_amount" ).val( ui.value ); c_right = ui.value; updateCamera(); }
	}); $( "#ui_right_slider > a" ).removeAttr("href");
	$( "#ui_right_amount" ).val( $( "#ui_right_slider" ).slider( "value" ) );
	
	$("#ui_right_amount").bind("input", function() {
		var curr_val = $(this).val();
		var min_val = $("#ui_right_slider").slider("option", "min" ), max_val = $("#ui_right_slider").slider("option", "max" );
		
		if(curr_val >= min_val){
			if(curr_val <= max_val) $("#ui_right_slider").slider("value",curr_val);
			else $(this).val(max_val);
		}else $(this).val(min_val);
		
		c_right = Number($(this).val()); updateCamera();
	});
	
	/************
		TOP
	*************/
	$( "#ui_top_slider" ).slider({
		range: "min", value: c_top, min: 1, max: 300,
		slide: function( event, ui ) { $( "#ui_top_amount" ).val( ui.value ); c_top = ui.value; updateCamera(); }
	}); $( "#ui_top_slider > a" ).removeAttr("href");
	$( "#ui_top_amount" ).val( $( "#ui_top_slider" ).slider( "value" ) );
	
	$("#ui_top_amount").bind("input", function() {
		var curr_val = $(this).val();
		var min_val = $("#ui_top_slider").slider("option", "min" ), max_val = $("#ui_top_slider").slider("option", "max" );
		
		if(curr_val >= min_val){
			if(curr_val <= max_val) $("#ui_top_slider").slider("value",curr_val);
			else $(this).val(max_val);
		}else $(this).val(min_val);
		
		c_top = Number($(this).val()); updateCamera();
	});
	
	/************
		BOTTOM
	*************/
	$( "#ui_bottom_slider" ).slider({
		range: "min", value: c_bottom, min: -300, max: 1,
		slide: function( event, ui ) { $( "#ui_bottom_amount" ).val( ui.value ); c_bottom = ui.value; updateCamera(); }
	}); $( "#ui_bottom_slider > a" ).removeAttr("href");
	$( "#ui_bottom_amount" ).val( $( "#ui_bottom_slider" ).slider( "value" ) );
	
	$("#ui_bottom_amount").bind("input", function() {
		var curr_val = $(this).val();
		var min_val = $("#ui_bottom_slider").slider("option", "min" ), max_val = $("#ui_bottom_slider").slider("option", "max" );
		
		if(curr_val >= min_val){
			if(curr_val <= max_val) $("#ui_bottom_slider").slider("value",curr_val);
			else $(this).val(max_val);
		}else $(this).val(min_val);
		
		c_bottom = Number($(this).val()); updateCamera();
	});
	
	/************
		NEAR
	*************/
	$( "#ui_near_slider" ).slider({
		range: "min", value: c_near, min: 1, max: 800,
		slide: function( event, ui ) { 
			if(ui.value > c_far){ 
				$(this).slider("value",c_far);
				$( "#ui_near_amount" ).val( c_far );
				
				c_near = c_far-0.001; updateCamera(); 
				return false;
			}else if(ui.value == c_far) return false;
			else{
				$( "#ui_near_amount" ).val( ui.value );
				
				c_near = ui.value; updateCamera(); 
			}
		}
	}); $( "#ui_near_slider > a" ).removeAttr("href");
	$( "#ui_near_amount" ).val( $( "#ui_near_slider" ).slider( "value" ) );
	
	$('#ui_near_amount').bind("input", function() {
		var curr_val = $(this).val();
		var min_val = $("#ui_near_slider").slider("option", "min" ), max_val = $("#ui_near_slider").slider("option", "max" );
		
		if(curr_val >= min_val){
			if(curr_val <= max_val){ 
				$("#ui_near_slider").slider("value",curr_val);
			}else $(this).val(max_val);
		}else $(this).val(min_val);
		
		c_near = Number($(this).val()); updateCamera();
	});
	
	/************
		FAR
	*************/
	$( "#ui_far_slider" ).slider({
		range: "min", value: c_far, min: 1, max: 800,
		slide: function( event, ui ) { 
			if(ui.value < c_near){ 
				$(this).slider("value",c_near);
				$( "#ui_far_amount" ).val( c_near );
				
				c_far = c_near+0.001; updateCamera(); 
				return false;
			}else if(ui.value == c_near) return false;
			else{ 
				$( "#ui_far_amount" ).val( ui.value );
				
				c_far = ui.value; updateCamera(); 
			}
		}
	}); $( "#ui_far_slider > a" ).removeAttr("href");
	$( "#ui_far_amount" ).val( $( "#ui_far_slider" ).slider( "value" ) );
	
	$('#ui_far_amount').bind('input', function(){ 
		var curr_val = $(this).val();
		var min_val = $('#ui_near_amount').val(), max_val = $("#ui_far_slider").slider("option", "max" );
		
		if(curr_val >= min_val){
			if(curr_val <= max_val) $("#ui_far_slider").slider('value',curr_val);
			else $(this).val(max_val);
		}else $(this).val(min_val);
		
		c_far = Number($(this).val()); updateCamera();
	});
});