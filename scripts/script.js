$(function () {
	console.log("ye");
	$("body").click(function (e) {
		if (e.target.closest("#quicklinks")) {
			console.log("he");
			$("#quicklinks ul").slideToggle("fast", function () { });
		}
		else {
			$("#quicklinks ul").css({"display":"none"});
		}
	});

	$('#quicklinks').click(function () {
	    $(this).slideToggle('fast', function () { });
	});
});