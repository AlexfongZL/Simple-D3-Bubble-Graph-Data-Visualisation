(function(){
	var width = 900,
		height = 700;

	/*var svg = d3.select("#chart")
		.append("svg")
		.attr("height",height)
		.attr("width",width)
		.append("g")
		.attr("transform","translate(0,0)");*/

	var svg = d3.select("#chart")
	    .append("svg")
	    .attr("height", height)
	    .attr("width", width)
	    .attr("viewBox", `0 0 ${width} ${height}`)
	    .attr("preserveAspectRatio","xMidYMid meet")
	    .append("g")
	    .attr("transform", "translate(450,350)");
	

	// import csv file
	d3.queue()
		.defer(d3.csv, "test_data.csv",function(d){
			//data preprocessing
        	d.age = d.age.replace("[","").replace(")","");
			d.time_in_hospital = + d.time_in_hospital;
			
        	return d;//must return something
    	})
		.await(ready)*/

	function ready(error,datapoints){

		var groupByAgeAndtime = d3.nest()
				  .key(function(d) { return d.age; })
				  //.key(function(d) { return d.time_in_hospital; })
				  .rollup(function(v) {
				  	return{
				  		mean_time_in_hospital : d3.mean(v, function(d){ return d.time_in_hospital;})
				  } })
				  .object(datapoints);//specify the dataset used
		
		
		
/**************************************** SCALING PART **************************************************/
		/*var radiusScale = d3.scaleSqrt()
							.domain([d3.min(Object.keys(groupByAgeAndtime), function(d){
							  return groupByAgeAndtime[d];//minimum average time spent
							}),d3.max(Object.keys(groupByAgeAndtime), function(d){
							  return groupByAgeAndtime[d];//maximum average time spent
							})])
							.range([50,150]);*/

		var radiusScale = d3.scaleSqrt()
							.domain([d3.min(Object.values(groupByAgeAndtime), function(d){
								  return d.mean_time_in_hospital;
							}),d3.max(Object.values(groupByAgeAndtime), function(d){
								  return d.mean_time_in_hospital;
							})])
							.range([50,150]);

		//console.log('Keys',Object.keys(groupByAgeAndtime), function(d){ return d.mean_time_in_hospital;});
		//console.log('Values', d3.map(Object.values(groupByAgeAndtime), function(d){ return d.mean_time_in_hospital;}));
		//console.log(groupByAgeAndtime);

// STUCK HERE
		var simulation = d3.forceSimulation()
		.force("x",d3.forceX(width/2).strength(0.05))
		.force("y",d3.forceY(height/2).strength(0.05))
		.force("collide", d3.forceCollide(function(d){
			//console.log(Object.values(groupByAgeAndtime), function(d){ return d.mean_time_in_hospital;});
			return radiusScale(d.mean_time_in_hospital) + 2;
		}))
		
// STUCK HERE
		//console.log(simulation);

		var circles = svg.selectAll(".artist")
		.data(Object.values(groupByAgeAndtime))
		.enter()
		.append("circle")
		.attr("class","artist")// the "artist" will transform into class name in HTML
		.attr("r", function(d){
			return radiusScale(d.mean_time_in_hospital)
		})
		.attr("fill","lightblue")
		.on("click",function(d){
			console.log(d)
		})
		
		// append = add something
		// text
		/*var texts = svg.selectAll(null)
						.data(Object.keys(groupByAgeAndtime))
						.enter()
						.append('text')
						.text(Object.values(groupByAgeAndtime))
						.attr("text-anchor", "middle")
						.attr('color','black')
						.attr('font-size','13')*/

		simulation.nodes(datapoints)
			.on('tick', ticked)

		function ticked(){
			/*texts
				.attr("x",function(d){
					return d.x
				})
				.attr("y", function(d){
					return d.y
				})*/

			circles
				.attr("cx",function(d){
					return d.x
				})
				.attr("cy", function(d){
					return d.y
				})

			
			
		}
	}
})();