import React,{useEffect,useRef,useState} from 'react';
import * as d3 from 'd3'
import './App.css';

function App() {
  function color(){
    let letter = "123456789ABCDEF",
    color = "#"

    for(let i =0; i<6; i++){
      color += letter[Math.floor(Math.random() * 16)]
    }
    return color;
  }

  const [data,setData] = useState([
    {
      name:"Kashif",
      value:50,
      children:[
        {
          name:"hassan",
          age:10
        },
        {
          name:"haider",
          age:20
        },
        {
          name:"Ali",
          age:13
        }
      ]
    },
    {
      name:"Ali haider",
      value:30,
      children:[
        {
          name:"A",
          age:15
        },
        {
          name:"B",
          age:24
        },
        {
          name:"C",
          age:19
        }
      ],
    },
])
  const ref = useRef()
  let pie = d3.pie().sort(null).value(function(d,i){return d.value})(data);
  let arc = d3.arc().innerRadius(75).outerRadius(130).padAngle(2).padRadius(3)
  useEffect(()=>{
    let svgElement = d3.select(ref.current)
    let graph = svgElement.append("g").attr("transform","translate(250,270)")
        graph.selectAll("path").data(pie).enter().append("path")
          .attr("d",arc)
          .attr("fill","black")
          .on("click",function(d,i){
            let pieData = d3.pie().sort(null).value(function(d,i){return d.children.map(d=>d.age)})(data);
            graph.selectAll("path").data(pieData).enter().append("path")
              .attr("d",arc)
              .attr("fill","black")


          })
          .transition().duration(d=>(d.value)*30).attr("fill",function(d,i){
            return color(i)
          })


    svgElement.selectAll("text").data(data).enter().append("text")
           .attr("x",219)
           .attr("y",280)
           .text(function(d,i){
             return data[0].value + "%"
           })
           .style("font-weight","bold")
           .style("font-size","40px")
  })

  return(
    <svg
      width="500"
      height="500"
      style={{backgroundColor:"red"}}
      ref={ref}
    />

  );
}

export default App;
