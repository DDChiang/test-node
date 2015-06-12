$(document).ready(function(){
  var $window = $(window);
  var w = $(window).width();
  
  if (w>486) {
		
		$('section[data-type="background"]').each(function(){
		  var $bgobj = $(this);  //assign the object
		  $(window).scroll(function() {
			var yPos = -($window.scrollTop() / $bgobj.data('speed'));
			//Put together final background position
			var coords = '50% ' + yPos + 'px';
			//Move the background
			$bgobj.css({ backgroundPosition: coords });
		  });
		});
	  
  }
  
  
  //hide #up first
  $("#up").hide();
  
  //fade in #up arrow
  $(function() {
    $(window).scroll(function () {
	  if ($(this).scrollTop() > 100) {
		$('#up').fadeIn();
	  } 
	  else {
	    $('#up').fadeOut();
	  }
	});
	
    //scroll body to 0px on click
	$('#up').click( function() {
	  $('body,html').animate({
	    scrollTop: 0}, 1200);
		
		
	});
  });
  
 
  
});

