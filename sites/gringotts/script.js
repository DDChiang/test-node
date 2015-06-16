$(window).load(function () {
    $('html').fadeIn('slow', function () { });


});

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

    $('#menu-button').click(function (e) {
        e.stopPropagation();
        if (navHideState) {
            $('#nav ul').slideToggle('medium', function () { });

        }
    });

    $('body').click(function (e) {
        var navHidden = $('#nav ul').is(':hidden');

        if (navHideState) {
            if (!navHidden) {
                $('#nav ul').slideToggle('medium', function () { });
            }
        }

    });

    setHideNav();

    $(window).resize(function () {
        var w = $(window).width();
        setHideNav();

    });

    //regex to check email  format

    function IsEmail(email) {
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
    }

    $('#subscribe-bttn').click(function (e) {
        if (!(IsEmail($("#subscribe-email").val()))) {
            e.preventDefault();
            alert('please enter a valid email address');
        }
        else {
        }

    });

    //show users what links work
    $('#nav a').click(function (e) {
        if ($('.img-panel').length > 0)
        {
            alert('This page does not exist yet. Try clicking START YOUR ACCOUNT instead');
            $('#start-bttn a').css({ 'background': '#4E1402' });
        }
        else
        {
            e.preventDefault();
            alert('This page does not exist yet. Try out the forms');
            $('input').eq(0).focus();

        }

    });

    $('.footer-links-wrapper a').click(function (e) {
        if ($('.img-panel').length > 0) {
            alert('This page does not exist yet. Subscribe for more information');
            $('#subscribe-bttn').css({ 'background': '#4E1402' });
        }
        else {
            e.preventDefault();
            alert('This page does not exist yet. Subscribe for more information');
        }

    });

});