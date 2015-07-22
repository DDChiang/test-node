var polarData = [
    {
        value: 300,
        color: "#f05a28",
        highlight: "#ff9900",
        label: "rabbit",
		labelColor : 'white',
		labelFontSize : '16'
    },
    {
        value: 400,
        color: "#00a79d",
        highlight: "#171616",
        label: "wompers",
		labelColor : 'white',
		labelFontSize : '16'
    },
    {
        value: 200,
        color: "#fbaf3f",
        highlight: "#fcca86",
        label: "wackos",
		labelColor : 'white',
		labelFontSize : '16'
    },
    {
        value: 100,
        color: "#2e3092",
        highlight: "#282c72",
        label: "greens",
		labelColor : 'white',
		labelFontSize : '16'
    }
];

var allShowing = false;

$(function () {
	//random color gen
	var digits = ["a","b","c","d","e","f",0,1,2,3,4,5,6,7,8,9];
	
	var ranDigit = function() {
		ranInt = Math.round(Math.random()*( 15-0) + 0);
		return digits[ranInt];
	}
	
	//init chart
	var grabPolar = $('#grabPolar').get(0).getContext('2d');
	
	var polarChart = new Chart(grabPolar).PolarArea(polarData, {
		percentageInnerCutout: 30,
		animateRotate: true,
		animateScale: true,
		segmentStrokeWidth : 3,
		segmentStrokeColor: 'rgba(0,0,0,0)',
		scaleBackdropColor : "rgba(255,255,255,0.5)",
		responsive: true,
		legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"
	});
	
	
	$(".legend div").html(polarChart.generateLegend());
	
	
	function deleteSegment(actSegLabel) {
		polarChartL = polarChart.segments.length;
		polarChartSeg = polarChart.segments;
		
		//compare and do stuff
		for (x=0; x <polarChartL; x++)
		{
			if (actSegLabel == polarChart.segments[x].label)
			{
				polarChart.removeData(x);
			    //polarChart.generateLegend();
				alert(actSegLabel + 'has been deleted');

				$('#options_panel').fadeOut('medium', function () {});
				$(".legend div").html(polarChart.generateLegend());
			}
		}
	}
	
	function updateSegment(actSegLabel) {
	    segVal = parseInt($('input[name="updateSegVal"]').val());
		polarChartL = polarChart.segments.length;
		polarChartSeg = polarChart.segments;
		
		
		if (!isNaN(segVal))
		{
			
			for (u=0; u < polarChartL; u++)
			{
				
				if (actSegLabel == polarChartSeg[u].label)
				{
					polarChartSeg[u].value = segVal;	//can directly update pie or polarChart seg val
					
				}
			}
			polarChart.update();
		}
		else
		{
			alert("enter a number! :(");
		}
	}
	
	var optPanel = $('#options_panel');
	
	var actSegLabel;
	var editable = false;
	
	
	$('#grabPolar').click(function(e) {
		var polarChartActivePnt = polarChart.getSegmentsAtEvent(e);
		actSegLabel = polarChartActivePnt[0].label;
		
		
		if (($('.menu').not(':hidden')) &&(!optPanel.is('show')))
		{
		    //$('.menu').slideToggle('medium', function () { });
			optPanel.addClass('show');
			editable = true;
			//console.log("editable");
		}
		if (($('.menu').is(':hidden')) && (!optPanel.is('show')))
		{
		    $('.menu').slideToggle('medium', function () { });
		    optPanel.addClass('show');
		    //console.log("show edits!");
		}

	});
	
	
	$('#removeSeg').click(function() {
		//polarChart.removeData();	//by default: remove last segment created
		
		if (editable)
		{
			deleteSegment(actSegLabel);
			
			editable = false;
			$('#options_panel').removeClass('show');('medium', function () {
			    alert(actSegLabel + ' has been deleted');
			});
		}
		else
		{
			alert("nothing to delete!");
		}
		
	});
	
	
	
	$('#segUpdate').click(function() {
	
		if (editable)
		{
			updateSegment(actSegLabel);
		}
		
	});
	
	var segC = 1;
	
	$('#addSeg').click(function() {
		newSegVal = parseInt($('input[name="newSegVal"]').val());
		newSegLab = $('input[name="newSegLab"]').val();
		
		
		
		if (!isNaN(newSegVal)&&(newSegLab.length>0))
		{
			
			ranHex = [ranDigit(),ranDigit(),ranDigit(),ranDigit(),ranDigit(),ranDigit()];
			ranHex2 = [ranDigit(),ranDigit(),ranDigit(),ranDigit(),ranDigit(),ranDigit()];
			
			ranColor ="#"+ranHex.join('');
			ranHexHighLight="#"+ ranHex2.join('');
			//console.log(ranColor);
			
			polarChart.addData({
				value: newSegVal,
				color: ranColor,
				highlight: ranHexHighLight,
				label: newSegLab
			});
			
			polarChart.update();
			
			$(".legend div").html(polarChart.generateLegend());	//update legend
			
			//$("ul.polararea-legend").append("<li><span style=\'background-color:"+ranColor+"'></span>"+newSegLab+"</li>");
			
			segC++;
			
			ranHex = [0, 0, 0, 0, 0, 0];
			$('input[name="newSegVal"]').val('');
			$('input[name="newSegLab"]').val('');
		}
		else
		{
			alert("Enter correct values!");
		}	
		
	});
	
	$("#close_panel").click(function() {
		$("#options_panel").removeClass('show');
		
		//reset values
		editable = false;
	});

	$("#add_bttn").click(function () {
	    if (allShowing)
	    {
	        $('.menu').slideToggle('medium', function () { });
	       
	    }
	    else
	    {
	        $('.add_panel').slideToggle('medium', function () { });
	        $('.menu').css({'display': 'none'});
	    }

	    allShowing = false;
	});

	$("#edit_bttn").click(function () {
	    if (allShowing) {
	        $('.add_panel').slideToggle('medium', function () { });
	        
	    }
	    else {
	        $('.menu').slideToggle('medium', function () { });
	        $('.add_panel').css({ 'display': 'none' });
	    }

	    allShowing = false;

	});
    

	$("#menu_bttn").click(function () {
	    panel1 = $('.add_panel');
	    panel2 = $('.menu');
	    allPanels = $('.add_panel, .menu');

	    if ((panel1.is(':hidden')) && (panel2.is(':hidden')))
	    {
	        allPanels.slideToggle('medium', function () { });
	        allShowing = true;
	      
	    }

	    else if ((panel1.is(':hidden')) && (panel2.not(':hidden')))
	    {
	        panel1.slideToggle('medium', function () { });
	        allShowing = true;
	       
	    }
	    else if ((panel1.not(':hidden')) && (panel2.is(':hidden'))) {
	        panel2.slideToggle('medium', function () { });
	        allShowing = true;
	        
	    }
	    else
	    {
	        allPanels.slideToggle('medium', function () { });
	        allShowing = false;
	       
	    }
	    
	});
	
	$('button#info').click(function (e) {
	    e.stopPropagation();

	    if (!infoShow)
	    {
	        $('.info_box').fadeIn('medium', function () { });
	        infoShow = true;
	    }

	});

	$('button#close_info').click(function () {
	    $('.info_box').fadeOut('medium', function () { });
	    infoShow = false;
	});



    $('body').click(function (e) {
        if (!e.target.closest('.info_box')) {
            $('.info_box').fadeOut('fast', function () { });
            infoShow = false;
	    }
	   
	});

});
