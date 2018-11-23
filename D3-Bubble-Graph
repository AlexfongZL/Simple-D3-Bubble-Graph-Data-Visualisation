/* --> I'm really lazy to write my own license, so hence I copy from internet and modified it abit.
      This is the link I visited to copy the  license --> http://dbad-license.org/
      Please don't get irritated by it ;-)

# DON'T BE AN IRRESPONSIBLE PUBLIC LICENSE

> Version 3 (final), November 12, 2018

> Copyright (C) [2018] [Alex Fong et. al]

Everyone is permitted to copy and distribute verbatim or modified
copies of this license document.

> DON'T BE AN IRRESPONSIBLE PUBLIC LICENSE
> TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION

1. Do whatever you like with the original work, just don't be IRRESPONSIBLE .

   Being IRRESPONSIBLE includes - but is not limited to - the following instances:

 1a. Outright copyright infringement - Don't just copy this and change the name.
 1b. Selling the unmodified original with no work done what-so-ever, that's REALLY being an IRRESPONSIBLE programmer.
 1c. Modifying the original work to contain hidden harmful content. That would make you a PROPER IRRESPONSIBLE PROGRAMMER.

2. If you become rich through modifications, related works/services, or supporting the original work,
share the love. Only an IRRESPONSIBLE programmer would make loads off this work and not buy the original work's
creator(s) a pint.

3. Code is provided with no warranty. Using somebody else's code and cursing when it goes wrong makes
you a SUPER DUPER EXTREMELY SUPERBLY UNDENIABLY SO VERY ADUHH REAL IRRESPONSIBLE CREATURE. Fix the problem yourself.

---------------------------------------------------------------------------------------------------------
This is the video I watched to learn to make it works--> https://www.youtube.com/watch?v=lPr60pexvEM
Please take note that the D3 version that the video used was version 4. My code here is using
version 5.

These are the questions that I asked in stackOverflow to finish this work:
1) https://stackoverflow.com/questions/52949346/once-i-put-a-function-into-defer-in-d3-the-data-structure-inside-console-log
2) https://stackoverflow.com/questions/52972103/how-to-access-the-processed-dataset-after-nest-function-in-d3-v4
3) https://stackoverflow.com/questions/53007960/complication-in-accessing-objects-value-in-d3-v4
4) https://stackoverflow.com/questions/53183652/return-simulation-and-radius-value-for-bubble-graph-after-applying-nest-in-d3
5) https://stackoverflow.com/questions/53167400/error-in-showing-min-and-max-result-in-d3
6) https://stackoverflow.com/questions/53235795/jquery-cant-run-in-html-in-xampp-localhost

  -------------------------------------------
  |  I BELIEVE YOU WILL GIVE US FULL MARKS! |
  -------------------------------------------

*/

(function() {
  var width = 1290,
    height = 750;

  var color = d3.scaleOrdinal()
      .range(["#efdecd", "#a4c639", "#89cff0", "#f4bbff", "#deb887", "#ffff99", "#fbcce7","#ffbcd9","#7df9ff","#e6e8fa"]);

  var svg = d3.select("#chart")
    .append("svg")
    .attr("height", height)
    .attr("width", width)
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("preserveAspectRatio","xMidYMid meet")
    .append("g")
    .attr("transform", "translate(0,0)");

  //import CSV file  
  d3.csv("diabetic_data.csv")
    .then(function(d) {
      d.forEach(e => {
      	e.age = e.age.replace("[", "").replace(")", "");
      	e.time_in_hospital = + e.time_in_hospital;
			});
      return d;
    })
    .then((data, err) => ready(err, data))

  function ready(error, datapoints) {

    var groupByAgeAndtime = d3.nest()
      .key(function(d) {
        return d.age;
      })
      .rollup(function(v) {
        return {
            mean_time_in_hospital: d3.format(".2f")(d3.mean(v, function(d) {
            return d.time_in_hospital;
          }))
        }
      })
      .object(datapoints);

    var radiusScale = d3.scaleSqrt()
      .domain([d3.min(Object.values(groupByAgeAndtime), function(d) {
        return d.mean_time_in_hospital;
      }), d3.max(Object.values(groupByAgeAndtime), function(d) {
        return d.mean_time_in_hospital;
      })])
      .range([30, 130]);
    var simulation = d3.forceSimulation()
      .force("x", d3.forceX(width / 2).strength(0.05))
      .force("y", d3.forceY(height / 2).strength(0.05))
      .force("collide", d3.forceCollide(function(d) {
        return radiusScale(d.mean_time_in_hospital) + 2;
      }))

      var simulation2 = d3.forceSimulation()
      .force("x", d3.forceX(width / 2).strength(0.05))
      .force("y", d3.forceY(height / 2).strength(0.05))
      .force("collide", d3.forceCollide(function(d) {
        return radiusScale(d.mean_time_in_hospital) + 2;
      }))

      var simulation_txt_mean_time = d3.forceSimulation()
      .force("x", d3.forceX(width / 2).strength(0.05))
      .force("y", d3.forceY(height / 2).strength(0.05))
      .force("collide", d3.forceCollide(function(d) {
        return radiusScale(d.mean_time_in_hospital) + 2;
      }))    

    var circles = svg.selectAll(".artist")
      .data(Object.values(groupByAgeAndtime))
      .enter()
      .append("circle")
      .attr("class", "artist")
      .attr("r", function(d) {
        return radiusScale(d.mean_time_in_hospital)
      })
      .attr("fill",function(d,i)
        {
            return color(i);
        })
      .on("click", function(d) {
        console.log(d)
      })
      
    var nodesData = Object.entries(groupByAgeAndtime)
                          .map(function(e){ return { label: e[0], mean_time_in_hospital: e[1].mean_time_in_hospital } })

     var texts = svg.selectAll('.text')
      .data(nodesData)
      .enter()
      .append('text')
      .text(e=>e.label)
      .attr("text-anchor", "middle")
      .attr('color', 'black')
      .attr('font-size', '15')
      .attr('class','age')

    var texts_mean_time = svg.selectAll('.text')
      .data(nodesData)
      .enter()
      .append('text')
      .text(e=>e.mean_time_in_hospital)
      .attr("text-anchor", "middle")
      .attr('color', 'black')
      .attr('font-size', '13')
      .attr('class','avg_time')

    simulation.nodes(Object.values(groupByAgeAndtime))
      .on('tick', ticked)

    simulation2.nodes(nodesData)
      .on('tick',ticked2)

    function ticked() {
      circles
        .attr("cx", function(d) {
          return d.x
        })
        .attr("cy", function(d) {
          return d.y
        })
    }

    function ticked2() {
      texts
        .attr("x", function(d) {
          return d.x
        })
        .attr("y", function(d) {
          return d.y
        })

      texts_mean_time
        .attr("x", function(d) {
          return d.x
        })
        .attr("y", function(d) {
          return d.y + 20
        })
    }

    //JQuery
    $(".age").prepend("Age: ").css("font-weight","Bold");
    $(".avg_time").prepend("Avg. Time Spent In Hospital: ").append(" hours");
    $(".avg_time");
  }
})();
