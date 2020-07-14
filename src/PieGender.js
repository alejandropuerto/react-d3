import React, {useRef, useEffect} from 'react'; //hooks
import * as d3 from "d3";

export default function PieGender({data}){
  const canvas = useRef(null); //esto hace referencia a un elemento en el virtual DOM

  useEffect(() => {

    const margin = {
        top: 20,
        right: 20,
        bottom: 20,
        left: 20
      },
      radius = 200,
      width = margin.left + margin.right + (2 * radius),
      height = margin.top + margin.bottom + (2 * radius);
    const color = ["#2C93E8", "#838690", "#F56C4E", "#A60F2B", "#648C85", "#B3F2C9", "#528C18", "#C3F25C"];
    d3.select(canvas.current).select('svg').remove();
    // Generate an array object on genders as a gender
    var gender_count = d3.nest()
      .key(function(d) {
        return d.gender;
      })
      .rollup(function(leaves) {
        return leaves.value;
      })
      .entries(data);

    var gender_arcs = d3.pie()
      .padAngle(.02)
      .value(function(d) {
        return d.gender;
      })
      (gender_count);

    var pie = d3
      .pie()
      .value(function(d) {
        return d.gender;
      })(gender_arcs);

    var arc = d3
      .arc()
      .outerRadius(radius - 10)
      .innerRadius(radius / 2);

    var labelArc = d3
      .arc()
      .outerRadius(radius - 10)
      .innerRadius(radius - 100);

    var svg = d3
      .select("#pie")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + (margin.left + radius) + "," + (margin.top + radius) + ")"); //center of pie

    var g = svg
      .selectAll("arc")
      .data(gender_arcs)
      .enter().append("g")
      .attr("class", "arc");

      g.append("path")
        .attr("d", arc)
        .style("fill", function(d, i) {
          return color[i];
        });

      g.append("text")
        .attr("transform", function(d) {
          return "translate(" + labelArc.centroid(d) + ")";
        })
        .text(function(d) {
          return d.data.key + " = " + d.gender;
        })
        .style("text-anchor", "middle")
        .style("font-size", "15px")
        .style("fill", "white");

      svg.append("text")
        .attr("transform", "translate(0," + (0 - radius) + ")")
        .text("Count occurences of each gender")
        .style("text-anchor", "middle")
        .style("fill", "black");

  }, [data]);

  return (
    <div ref={canvas}>
      {/*Aqui voy a meter mi grafica*/}
    </div>
  );

}
