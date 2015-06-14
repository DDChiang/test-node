$(function () {
    $('body').click(function (e) {
        var navHidden = $('#quicklinks ul').is(':hidden');

        if ((!(e.target.closest('#quicklinks'))) && (!navHidden))   //event.target.closest not supported in IE and mobile?
        {
            $('#quicklinks ul').slideToggle('fast', function () { });

        }
    });

	$('#quicklinks').click(function () {
	    $('#quicklinks ul').slideToggle('fast', function () { });
	});

	$(window).scroll(function () {
	    $('#quicklinks ul').css({'display':'none'});
	});
	
});