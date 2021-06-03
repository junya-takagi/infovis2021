
var width = 600;
var height = 600;
var scale = 1600;
d3.json("https://junya-takagi.github.io/infovis2021/geo/geojapan.geojson")
.then(createMap);
function createMap(japan){
    var japan_map = d3.select("#japan_map").attr("width",width).attr("height",height);
    var projection = d3.geoMercator()
        .center([136.0, 35.6])
        .translate([width/2,height/2])
        .scale(scale)
    var geoPath = d3.geoPath().projection(projection);
    

    japan_map.selectAll("path").data(japan.features)
        .enter()
        .append("path")
        .attr("d",geoPath)
        .attr("id",function(d){
            console.log(d.properties.name_local)
        })
        .style("stroke","#ffffff")
        .style("stroke-width",0.1)
        .style("fill","#5EAFC6");
}