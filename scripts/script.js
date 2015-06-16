$(window).load(function () {
    console.log("hey");

    $(document).click(function () {
        if (!$('#quicklinks ul').is(':hidden'))   //event.target.closest not supported in IE and mobile?
        {
            $('#quicklinks ul').slideToggle('fast', function () { });
            console.log("oop");
        }
    });

    $('#quicklinks').click(function (e) {
        e.stopPropagation();
        $('#quicklinks > ul').slideToggle('fast', function () { });
    });

    $(window).scroll(function () {
        $('#quicklinks > ul').css({ 'display': 'none' });
    });
});