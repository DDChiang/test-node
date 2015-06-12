$(document).ready(function() {
			$("#menu-button").click(function() { //only works on first one it finds
			$("ul").slideToggle("medium", function() {  
				$(window).resize(function(){  
								
								var w = $(window).width();  
								
								if(w > 200 && $("ul").is(':hidden')) {  
									$("ul").removeAttr('style');  
								}  
			});
			});
			});
			
			
			});  
			
			
			