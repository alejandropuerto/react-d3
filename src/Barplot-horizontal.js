import React, {useRef, useEffect} from 'react'; //hooks
import * as d3 from "d3";

function GraphHorizontal(props){
  const canvas = useRef(null); //esto hace referencia a un elemento en el virtual DOM

  useEffect(() => {

    const margin = {top:30, right:30, bottom:70, left:300};
    const width = 1000;
    const height = 1000 - margin.top - margin.bottom;
    const max_members = d3.max(props.data.map(d => d.members).map(Number));
    console.log(max_members);
    d3.select(canvas.current).select('svg').remove();

    const x_width = (d) => {return x(d.members)}; //change for your x data width
    const y_data = function (d) {return y(d.title)}; //change for your y data
    const y_domain = props.data.map((d) => d.title); //change for your custom y values


    const svg = d3
      .select(canvas.current) //Busca un elemento en el html con la referencia canvas
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`)


    //Eje X
    const x = d3
      .scaleLinear()
      .range([0, width])
      .domain([0, max_members])
    //agregando eje de X al canvas
    svg
      .append('g')
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", `translate(-10, 0)rotate(-45)`)
      .style("text-anchor", "end")



    const y = d3
      .scaleBand()
      .domain(y_domain)
      .range([0, height])
      .padding(0.3)
    //esto agrega el eje y al canvas
    svg
      .append("g")
      .call(d3.axisLeft(y))
      .selectAll("text")
      .attr("transform", `translate(-10, 0)`)
      .style("text-anchor", "end")

    //Barras
    svg
      .selectAll("myRect")
      .data(props.data)
      .enter()
      .append("rect")
      //.attr("x", (d) => { return x(d.height); }) swap this x for the one below for star wars api
      .attr("x", x(0))
      .attr("y", y_data)
      .attr("width", x_width)
      .attr("height", y.bandwidth())
      .attr("fill", "#69b3a2");
      /*
      //add number of members labels on each bar
      svg.selectAll(".text")
    	  .data(props.data)
    	  .enter()
    	  .append("text")
    	  .attr("class","label")
    	  .attr("x", x(0))
    	  .attr("y", function (d) {
            return y(d.title);
        })
    	  .attr("dy", ".75em")
    	  .text(function(d) { return d.members; });
        */

      //add titles
      svg.append("text") //add X axis title
        .attr("text-anchor", "end")
        .attr("x", width - margin.left - margin.right)
        .attr("y", height + margin.top + 30)
        .text("Number of members that added the title to their list");

      /*
      svg.append("text") //add Y-axis title
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-90)")
        .attr("y", -margin.left+20)
        .attr("x", -margin.top)
        .text("Y axis title")
        */

      svg.append("text")//add graph title
          .attr("x", (width / 2))
          .attr("y", 0 - (margin.top / 8))
          .attr("text-anchor", "middle")
          .style("font-size", "28px")
          //.style("text-decoration", "underline") //to underline the title
          .text("Top popular upcoming anime");

  }, [props.data]);



  return (
    <div ref={canvas}>
      {/*Aqui voy a meter mi grafica*/}
    </div>
  );

}

export default GraphHorizontal;

/*
code adapted from:
https://bl.ocks.org/hrecht/f84012ee860cb4da66331f18d588eee3
https://www.d3-graph-gallery.com/graph/barplot_horizontal.html
http://www.cagrimmett.com/til/2016/04/26/responsive-d3-bar-chart.html
*/
