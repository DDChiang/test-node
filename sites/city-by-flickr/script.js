$(function () {
	
	var loc1 = '';
	
	locationArray = [];
	
	loc = [];
	
	var $lightbox = $('.lightbox');
	
	var $loader = $('.loader');
	
	//locationItems = ['tokyo',  'instanbul', 'singapore', 'bangkok', 'london', 'paris', 'los angeles', 'new york','seoul',  'shanghai'];
	locationItems = ['tokyo', 'jakarta', 'hong kong', 'seoul','london',  'paris', 'singapore', 'los angeles', 'new york'];
	
	for (c = 0; c < locationItems.length; c++)
	{
		var formattedItem = locationItems[c].split(' ').join('+');
		loc.push(formattedItem);
	}
	
	locArrayLength = loc.length;
	
	//gather and finish creating data before drawing charts
	function getData(i) {
		var num = i || 0;
	
		if (num < locArrayLength)	{
	
			request = $.ajax({
					url: 'https://api.flickr.com/services/rest/?method=flickr.places.find&api_key=56c937571053c26be376d441cd45d9de&query='+ loc[num] + '&format=json&nojsoncallback=1',
					type: 'GET',
					dataType : 'json'
				}).success(function(data, status){
					relPlace = data['places']['place'][0];	//flickr returns most relevant on top
				
					//use woe_name instead of "loc[lc]" since ajax has mind o fits own/completes task on its own time
					//$('html').append("<p>" + relPlace["woe_name"] +  ": " + JSON.stringify(relPlace) + "</p>");	
					
					woeID = relPlace.woeid;	
					
					request2 = $.ajax({
						url: 'https://api.flickr.com/services/rest/?method=flickr.places.tagsForPlace&api_key=56c937571053c26be376d441cd45d9de&woe_id='+ woeID + '&format=json&nojsoncallback=1',
						type: 'GET',
						dataType: 'json'
					}).success(function(data, response) {
					
					
					var tags = data['tags']['tag'];	//tags is undefined
				
					//$('.check1').append("<p>" + loc[lc] +  " tags: " +  JSON.stringify(tags) + "</p>");
					//$('html').append("<p>" + tags[0]["_content"] +  " tags: " +  JSON.stringify(tags) + "</p>");
					
					//Crunch Tags to # pics for top 100 tags
					
					var tagCount = 0;
					var tagText = '';
					tagLength = tags.length;
					tc = 0;
					
					for (;tc < tagLength;)
					{
						tagCount+= parseInt(tags[tc].count);
						
						tagText += "#"  + tags[tc]['_content'] + ": " + tags[tc]['count']+ "<br>";
						tc++;
					}
					
					//$('html').append("<p>" + tags[0]["_content"] +  " tags: " + tagCount + " pictures from top 100 tags" + "<br>" + tagText);
					
					
					//push into data
					locationArray.push({
						// location: tags[0]["_content"],
						location: locationItems[num],
						woeID: woeID,
						tagText: tags,
						tagCount: tagCount
					});
					
					//check counter val (if not done ==> keep going, if done ==> fire callback)
					if (num < (locArrayLength-1))
					{
						console.log('less than 1');
					}
					else
					{
						console.log('1');
						returnData();	//fire callback only when counter reaches end
						//don't pass returnData as parameter to whole getData fn since it doesn't know what to look for (remember scoping?)
					}
					
					getData(num+1);	//recursion
					
				});	
			});
		
		}
	
	}

	getData();
	
	
	function returnData() {
		//hide loader
		$loader.fadeOut(300, function() {});
	
		//$('.check_data').append(JSON.stringify(locationArray));
		//console.log(JSON.stringify(locationArray));
		
		//fire d3js to create chart
		maxDataVal = locationArray[0]["tagCount"];
	
		for (c in locationArray)
		{
			if (locationArray[c]["tagCount"] > maxDataVal)
			{
				maxDataVal = locationArray[c]["tagCount"];
			}
			else
			{
				maxDataVal = maxDataVal;
			}
		}
		
		sumTopTagPhotos = 0;
		
		
		//sum
		for (s in locationArray)
		{
			sumTopTagPhotos += locationArray[s].tagCount;
		}
		
		
		
		
		var width = 500;
		var height= 500;
		var radius = Math.min(width, height)/2;
		//var color = d3.scale.category20b();
		var outerRadius = 250;
		//alternative (define own palette by providing range of colors)
		var color = d3.scale.ordinal()
			.range(["#01a4f9",'#000','#01106b',"#128c44", '#dfcf20', '#170b3b',  '#e05025','#ff9900', '#3f3a3d', '#36cc72' ]); 
		
		//scale	//translate range units using domain values
		var myScale = d3.scale.linear().domain([0,maxDataVal]).range([0,2*Math.PI]);
		
		
		// var $container = $('.chart-container')
			// width = $container.width(),
			// height = $container.height(),
			// outerRadius = Math.min(width, height)/2,
			// innerRadius = (outerRadius/2);
			
		// var arc = d3.svg.arc()
			// .innerRadius(innerRadius)
			// .outerRadius(outerRadius)
			// .startAngle(0);	
			
		var pie = d3.select('.pie')
		.attr('width', outerRadius*3)
		.attr('height', outerRadius*3)
		.append('g')
		.attr('transform', 'translate(' + outerRadius*1.6 + ',' + outerRadius*1.6  + ')');
			// .attr('width', '100%')
			// .attr('height', '100%')
			// .attr('viewBox','0 0 '+Math.min(width,height) +' '+Math.min(width,height) )
			// .attr('preserveAspectRatio', 'xMinYMin')
			// .attr('transform', 'translate(' + Math.min(width, height)/2 + ',' + Math.min(width, height)/2 + ')');
		
		
		
		var arc = d3.svg.arc()
			.innerRadius(100)
			.outerRadius(outerRadius);
			
	
		
		//use D#'s layout.pie() fo rstand and end angles of segments	==> creates arc data for us
		var piefy = d3.layout.pie()	
			.value(function(d) {return d.tagCount;})
			.sort(null);
		
		var slices = pie.selectAll('g.slices')
			.data(piefy(locationArray))	//convert numbers inside dataset
			.enter()
			.append('g')
			.attr('class', 'slice-group');

		var div = d3.select('body')
                .append('div')
                .attr('class', 'd3-tip')
                .html(function () {
                    return "he";
                });
		

		slices
			.append('path')
            .attr('fill', function (d, i) {
                return color(i);
            })
			//.attr('d', arc)		//creates actual arc/path
            .transition()   //let's do a transition instead using attrTween that pulls from tweenPie fn
            .duration(1000)
            .attrTween('d', tweenPie)
            .call(endall, function () {    //whatever's specified in this fn gets applied as the callback in the checkEndAll(transition, callback)

                console.log('DONE');

                // Add a legendLabel to each arc slice...
                slices.append("text")
                  .attr("transform", function (d, i) { //set the label's origin to the center of the arc
                     var c = arc.centroid(d),
							x = c[0],
							y = c[1],
							// pythagorean theorem for hypotenuse
							h = Math.sqrt(x*x + y*y);

					  if (i%2==0)
					  {
						return "translate(" + (x / h * 310) + ',' +
                         (y / h * 310) + ")";
					  }
					  else 
					  {
						return "translate(" + (x / h * 350) + ',' +
                         (y / h * 350) + ")";
					  }
                      
                  })
                  .attr("text-anchor", "middle") //center the text on it's origin
                  .style("fill", "white")
                  .style("font", "normal 12px Lato")
                  .style("text-transform", "uppercase")
                  .text(function (d, i) { return locationArray[i].location; }); //get the label from our original data array	
                //why can't it read the original d?

                slices.append('text')
                    .attr('transform', function (d, i) {
                       var c = arc.centroid(d),
							x = c[0],
							y = c[1],
							// pythagorean theorem for hypotenuse
							h = Math.sqrt(x*x + y*y);

                       if (i%2==0)
					  {
						return "translate(" + (x / h * 310) + ',' +
                         (y / h * 310) + ")";
					  }
					  else 
					  {
						return "translate(" + (x / h * 350) + ',' +
                         (y / h * 350) + ")";
					  }
                    })
                    .attr('text-anchor', 'middle')
                    .style('font', 'normal 12px Lato')
                    .style('fill', '#fff')
                    .style("text-transform", "uppercase")
                    .attr('dy', '18px')
                    .text(function (d, i) { return locationArray[i].tagCount + ' photos'; });

					
				slices.append('text')
					.attr('transform', function (d, i) {
						var c = arc.centroid(d),
							x = c[0], 
							y = c[1],
							h = .8 * Math.sqrt(x*x + y*y);
							
						return "translate(" + (x/h * 160) + ',' + (y/h * 160) + ")";
							
					})
					.attr('text-anchor', 'middle')
					.style('font', 'normal 12px Lato')
					.style('fill', '#fff')
					.style('z-index', 2)
					.text(function(d, i) {return Math.round((locationArray[i].tagCount / sumTopTagPhotos)*100) + "%"});

                slices.append('line')
                    .attr({
                        x1: function (d, i) {
                            return arc.centroid(d)[0]*1.3;
                        },
                        y1: function (d, i) {
                            return arc.centroid(d)[1]*1.3;
                        },
                        x2: function (d, i) {
                           c = arc.centroid(d);	//have t include this so can reset for each d
							
                            midAngle = Math.atan2(c[1], c[0]);	//base angle
							
							
							if ((i%2)==0)	//it doesn't know  how to separte it....based on i's... :*
							{		
								return x = Math.cos(midAngle) * 280;
							}							
							else
							{
								return x = Math.cos(midAngle) * 340;
							}
							
                            
                        },
                        y2: function (d, i) {
                            c = arc.centroid(d);	
							
							
                            midAngle = Math.atan2(c[1], c[0]);
							
							if ((i%2)==0)
							{
								 return y = Math.sin(midAngle) * 280;
							}
							else
							{
								return y = Math.sin(midAngle) * 340;
							}
                          
                        },
                        'class': 'label-line'
                    });

                slices.call(div);

                

            });

			slices
				.on('mouseover', function (d, i) {	//what is "D" in this context?	d approx = "piefy(locationArray)[d]"
					console.log(d);
					console.log(i);
                    div.style("opacity", .9)
                        .html('<h2><span>' +  locationArray[i].location + "'s</span> Top 3 tags</h2><br>"
						+ Math.round((locationArray[i].tagCount / sumTopTagPhotos)*100) + "% of World's Popular Photos<br>"
						+"<p>#" + locationArray[i].tagText[0]["_content"] + ": "
						+locationArray[i].tagText[0]["count"] + " photos </p>"
						+"<p>#" + locationArray[i].tagText[1]["_content"] + ": "
						+locationArray[i].tagText[1]["count"] + " photos </p>"
						+"<p>#" + locationArray[i].tagText[2]["_content"] + ": "
						+locationArray[i].tagText[2]["count"] + " photos </p>"
						)
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY) + "px");
					
						
                }).on('mouseout', function () {
                    div.style("opacity", 0);
                });
			
        //transition for pie slice 'path'
		function tweenPie(finish) {
		    var start = {
		        startAngle: 0,
		        endAngle: 0
		    };

		    var i = d3.interpolate(start, finish);
		    return function (d) { return arc(i(d)); };
		}

		function endall(transition, callback) {
		    if (transition.size() === 0) { callback() }
		    var n = 0;
		    transition
                .each(function () { ++n; })
                .each("end", function () { if (!--n) callback.apply(this, arguments); });
		}

       
	}
	
	$('.event_log .title').click(function(e) {
		e.stopPropagation();
		var $content = $(this).next('.box_content').html();
		var $title = $(this).text();
		
		$lightbox.find('h1 span').html($title);
		$lightbox.find('.inner_content').html($content);
		$lightbox.fadeIn(500, function() {});
	});
	
	$('.close').click(function() {
		$lightbox.fadeOut(300, function() {});
	});
	
	$(document).click(function(e) {
		if (!$(e.target).parents('.lightbox').length)
		{
			$lightbox.fadeOut(300, function() {});
			console.log('00');
		}
		else
		{
			console.log('lightbox');
		}
	});
	
});