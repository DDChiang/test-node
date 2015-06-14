$(function () {
    var navHideState = false;
    var w = $(window).width();

    function setHideNav() {
        var w = $(window).width();

        if (w < 612) {
            navHideState = true;
        }
        else {
            navHideState = false;
            $('#nav ul').css({'display':''});
        }
    }

    $('#menu-button').click(function () {
        if (navHideState) {
            $('#nav ul').slideToggle('medium', function () { });

        }
    });

    $('body').click(function (e) {
        var navHidden = $('#nav ul').is(':hidden');

        if (navHideState) {
            if ((!(e.target.closest('.header'))) && (!navHidden)) {
                $('#nav ul').slideToggle('medium', function () { });
            }
        }

    });

    setHideNav();

    $(window).resize(function () {
        var w = $(window).width();
        setHideNav();

    });
});


