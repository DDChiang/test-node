var fullPageState = false;
var browserW = $(window).width();

function initFullPage() {
    $('#fullpage').fullpage({
        anchors: ['first', 'sec', 'third', 'four', 'five'],
        navigation: true,
        navigationPosition: 'right',
        verticalCenterd: true,
        controlArrows: true,
        verticalCentered: true
    });
}

function changeFullPageState() {
    if (browserW > 648) {
        if (!fullPageState) {
            initFullPage();
            fullPageState = true;
        }
    }
    else {
        if (fullPageState) {
            $.fn.fullpage.destroy('all');
            fullPageState = false;
        }
    }
}

$(function () {
    changeFullPageState()

    $(".image_slider").flexslider({
        animation: 'slide',
        controlNav: false

    });

    //quicklinks
    $(document).click(function () {
        if (!$('#quicklinks ul').is(':hidden'))   //event.target.closest not supported in IE and mobile?
        {
            $('#quicklinks ul').slideToggle('fast', function () { });
        }
    });

    $('#quicklinks').click(function (e) {
        e.stopPropagation();
        $('#quicklinks > ul').slideToggle('fast', function () { });
    });

    $(window).scroll(function () {
        $('#quicklinks > ul').css({ 'display': 'none' });
    });

    //smooth scrolling when click on fake links
    $('#fp-nav-fake a').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });

});

$(window).resize(function () {
    browserW = $(window).width();

    changeFullPageState();

});


