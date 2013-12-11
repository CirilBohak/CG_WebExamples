/*****************************
      jQueryui functions
******************************/

$(function() {
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