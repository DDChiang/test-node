$(document).ready(function() {
	var $window = $(window);
	var w = $window.width();
	
	
if (w<590) {
	
	$("#slideout_menu_icon, .linker").click(function() { //only works on first one it finds
	    $(".home-navbar").slideToggle("medium", function() {  
	      $(window).resize(function(){  
		    var w = $(window).width();  
		 
			if (w>590 && $(".home-navbar").is(":hidden")) {
			  $(".home-navbar").removeAttr('style'); 
			}
			
		  
	      });
        });
      });
	
	}
	
	
});

