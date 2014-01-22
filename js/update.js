function NY(year){
	g.selectAll("circle")
		.remove();

	var yearPicked=year;
	var totalPopNY=0;

	document.getElementById("yearClicked").innerHTML =year;
	
	d3.json("data/data.json", function(error,data){

	var popData=data.filter(function(d) {
		return(d.town=="New-York" && d.year==yearPicked && d.measure=="Population")});

	var pop=data.filter(function(d) {
		return(d.measure=="Population")});

	var minPop = d3.min(pop.map(function(d) {return (d.value);} ));
	var maxPop = d3.max(pop.map(function(d) {return (d.value);} ));

	console.log(minPop);
	console.log(maxPop);

	var area = d3.scale.linear().domain([minPop,maxPop]).range([10,200]);


	popData.forEach(function(d) { totalPopNY = totalPopNY + d.value; });
	console.log(totalPopNY);

	totalPopNY =  totalPopNY + " inhabitants";

	document.getElementById("popNY").innerHTML =totalPopNY;

	var denData=data.filter(function(d) {
		return(d.town=="New-York" && d.year==yearPicked && d.measure=="Density")});
	
	var den=data.filter(function(d) {
		return(d.measure=="Density")});

	var minDen = d3.min(den.map(function(d) {return (d.value);} ));
	var maxDen = d3.max(den.map(function(d) {return (d.value);} ));

	console.log(minDen);
	console.log(maxDen);

	//var color = d3.scale.linear().domain([minDen,maxDen]).range(["#ece7f2","#3182bd"]);
	var color = d3.scale.threshold()
	    .domain([minDen-1,minDen+(maxDen-minDen)/9,minDen+2*(maxDen-minDen)/9,minDen+3*(maxDen-minDen)/9,minDen+4*(maxDen-minDen)/9,minDen+5*(maxDen-minDen)/9,minDen+6*(maxDen-minDen)/9,minDen+7*(maxDen-minDen)/9,minDen+8*(maxDen-minDen)/9,maxDen+1])
	    .range(["#fff","#fcfbfd", "#efedf5", "#dadaeb", "#bcbddc", "#9e9ac8", "#807dba","#6a51a3","#54278f","#3f007d"]);


	d3.json("data/boroughs.json", function(error, nyb) {	
  		var rateById = {};
		denData.forEach(function(d) { rateById[d.loc] = d.value; });

		boroughs.selectAll("path")
			.data(nyb.features)
		    .transition().duration(1500)
	        .style("fill", function(d) { return color(rateById[d.id]); });
			//.style("fill", function(d) {return color(d.value);} );
	});

	var circleNY=g.selectAll("a.node")
		.data(popData)
        .enter().append("a")
        .attr("class","nodes");

	circleNY.append("circle") 
	    .attr("cx", function(d) {
	      return projection([d.lon,d.lat])[0];
	    })
	    .attr("cy", function(d) {
	      return projection([d.lon,d.lat])[1];
	    })
	    .transition().duration(1500)
	    .attr("r",function(d){return Math.sqrt(area(d.value)/Math.PI);})
	    .style("fill", "red");

	g.selectAll("circle")
		.on("mouseover", function(d) {



			var xPosition = parseFloat(d3.select(this).attr("cx"))+10+document.getElementById("area1").offsetLeft;
									      
			var yPosition = parseFloat(d3.select(this).attr("cy"))+10+document.getElementById("area1").offsetTop  ;

			//Update the tooltip position and value
			d3.select("#tooltip")
		        .style("left", xPosition + "px")
		        .style("top", yPosition + "px") 
		        .select("#locationTooltip")
		        .text(d.loc);


			d3.select("#tooltip")
		        .select("#valueTooltip")
		        .text(d.value);

			d3.select("#tooltip").classed("hidden", false);
		})
		.on("mouseout", function() {
			d3.select("#tooltip").classed("hidden", true);
		})
	});
	Paris(yearPicked);
};

function Paris(year){
	g2.selectAll("circle")
		.remove();


	var yearPicked=year;
	var totalPopParis=0;

	d3.json("data/data.json", function(error,data){

	var popData=data.filter(function(d) {
		return(d.town=="Paris" && d.year==yearPicked && d.measure=="Population")});

	var pop=data.filter(function(d) {
		return(d.measure=="Population")});

	var minPop = d3.min(pop.map(function(d) {return (d.value);} ));
	var maxPop = d3.max(pop.map(function(d) {return (d.value);} ));

	console.log(minPop);
	console.log(maxPop);

	var radius2 = d3.scale.linear().domain([minPop,maxPop]).range([10,200]);

	popData.forEach(function(d) { totalPopParis = totalPopParis + d.value; });
	console.log(totalPopParis);

	totalPopParis =  totalPopParis + " inhabitants";


	document.getElementById("popParis").innerHTML =totalPopParis;

	var denDataP=data.filter(function(d) {
		return(d.town=="Paris" && d.year==yearPicked && d.measure=="Density")});
	
	var den=data.filter(function(d) {
		return(d.measure=="Density")});

	var minDen = d3.min(den.map(function(d) {return (d.value);} ));
	var maxDen = d3.max(den.map(function(d) {return (d.value);} ));

	console.log(minDen);
	console.log(maxDen);

	var color2 = d3.scale.threshold()
	    .domain([minDen-1,minDen+(maxDen-minDen)/9,minDen+2*(maxDen-minDen)/9,minDen+3*(maxDen-minDen)/9,minDen+4*(maxDen-minDen)/9,minDen+5*(maxDen-minDen)/9,minDen+6*(maxDen-minDen)/9,minDen+7*(maxDen-minDen)/9,minDen+8*(maxDen-minDen)/9,maxDen+1])
	    .range(["#fff","#fcfbfd", "#efedf5", "#dadaeb", "#bcbddc", "#9e9ac8", "#807dba","#6a51a3","#54278f","#3f007d"]);


	d3.json("data/paris.json", function(error, parisA) {	
  		var rateById2 = {};
		denDataP.forEach(function(d) { rateById2[d.loc] = d.value; });

		arrondissements.selectAll("path")
			.data(parisA.features)
		    .transition().duration(1500)
			.style("fill", function(d) {return color2(rateById2[d.id]);} );
	});

	var circleP=g2.selectAll("a.node")
		.data(popData)
        .enter().append("a")
        .attr("class","nodes");

	circleP.append("circle") 
	    .attr("cx", function(d) {
	      return projection2([d.lon,d.lat])[0];
	    })
	    .attr("cy", function(d) {
	      return projection2([d.lon,d.lat])[1];
	    })
	    .transition().duration(1500)
	    .attr("r",function(d){return Math.sqrt(radius2(d.value)/Math.PI);})
	    .style("fill", "red");

		g2.selectAll("circle")
		.on("mouseover", function(d) {



			var xPosition = parseFloat(d3.select(this).attr("cx"))+10+document.getElementById("area2").offsetLeft;
									      
			var yPosition = parseFloat(d3.select(this).attr("cy"))+10+document.getElementById("area2").offsetTop  ;

			//Update the tooltip position and value
			d3.select("#tooltip")
		        .style("left", xPosition + "px")
		        .style("top", yPosition + "px") 
		        .select("#locationTooltip")
		        .text(d.loc);


			d3.select("#tooltip")
		        .select("#valueTooltip")
		        .text(d.value);

			d3.select("#tooltip").classed("hidden", false);
		})
		.on("mouseout", function() {
			d3.select("#tooltip").classed("hidden", true);
		})
	
	    
	});


};