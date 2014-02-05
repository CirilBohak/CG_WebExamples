/*****************************
      jQueryui functions
******************************/

var picker;

$(function() {
	picker = $('#picker');
	picker.colpick({
		flat:true,
		color: '#00ff00',
		onChange:function(hsb,hex,rgb,fromSetColor) {
			hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
			hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
			drawColorFan(rgb,hsl,hsv);
		},
		onSubmit:function(hsb,hex,rgb,el) {
			showFormula(rgb,hsl,hsv);
		}
	})
	
	picker = picker.children().css("margin", "5px auto 10px auto");
	picker = picker.find( ".colpick_submit" ).html("Calculate");
	
	$( "#tabs_config" ).tabs({
		activate: function(event, ui) {
			var index = ui.newTab.index();
			
			switch(index){
				case 0: break;
				case 1: break;
				default: break;
			}
		}
	});
});