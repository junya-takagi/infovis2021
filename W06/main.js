const linear_scale = d3.scaleLinear()
        .domain([0,200])
        .range([50,90])
const input = 50
const output = linear_scale(50)
const width = 256
const height = 256

var xscale = d3.scaleLinear().domain([d3.min(data,d=>d.x),d3.max(data,d=>d.x)]).range([0,width])
var yscale = d3.scaleLinear().domain([d3.min(data,d=>d.y),d3.max(data,d=>d.y)]).range([0,height])


d3.csv("https://junya-takagi.github.io/infovis2021/W06/data.csv")
    .then(data =>{
        data.forEach(d=>{d.x=+d.x;d.y=+d.y})
        ShowScatterPlot(data);
    })
    .catch(error=>{
        console.log(error);
    });
function ShowScatterPlot(data){
    var svg = d3.select("body").append("svg").attr("width",width).attr("height",height)
    svg.selectAll("circle")
       .data(data)
       .enter()
       .append("circle")
       .attr("cx",d=>xscale(d.x))
       .attr("cy",d=>yscale(d.y))
       .attr("r",d=>d.r)
}