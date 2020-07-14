import React, {useRef, useEffect} from 'react'; //hooks
import * as d3 from "d3";

function Graph(props){
  const canvas = useRef(null); //esto hace referencia a un elemento en el virtual DOM

  useEffect(() => {

    const margin = {top:30, right:30, bottom:70, left:60};
    const width = 460 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    d3.select(canvas.current).select('svg').remove();

    // to filter only the first 10 elements
    /*const topData = d3.sort(function(a, b){
      return d3.descending(+a.members, +b.members);
    }).slice(0,10);*/

    const svg = d3
      .select(canvas.current) //Busca un elemento en el html con la referencia canvas
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`)
    //Eje X
    const x = d3
      .scaleBand()
      .range([0, width])
      .domain(props.data.map((d) => d.title))
      .padding(0.2)
    //agregando eje de X al canvas
    svg
      .append('g')
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", `translate(-10, 0)rotate(-45)`)
      .style("text-anchor", "end")

    const y = d3.scaleLinear().domain([0, d3.max((d)=>d.members)]).range([height, 0])
    //esto agrega el eje y al canvas
    svg.append("g").call(d3.axisLeft(y))

    //Barras
    svg
      .selectAll("mybar")
      .data(props.data) //change props.data for topData when only want the first 10 elements
      .enter()
      .append("rect")
      .attr("x", function (d) {
        return x(d.title);
      })
      .attr("y", (d) => {
        return y(d.members);
      })
      .attr("width", x.bandwidth())
      .attr("height", (d) => {
        return height - y(d.members);
      })
      .attr("fill", "#69b3a2");
  }, [props.data]);



  return (
    <div ref={canvas}>
      {/*Aqui voy a meter mi grafica*/}
    </div>
  );

}
export default Graph;
