const width = 640;
const height= 480;
scale = 1500;
d3.json("https://junya-takagi.github.io/infovis2021/geo/geojapan.geojson",createMap);
function createMap(japan){
    var projection = d3.geoMercator()
        .translate([width/2,height/2])
    var geoPath = d3.geoPath().projection(projection);
    japan_map = d3.select("#japan_map").attr("width",width).attr("height",height);

    var map = japan_map.selectAll("path").data(japan.features)
        .enter()
        .append("path")
        .attr("d",geoPath)
        .style("stroke","#ffffff")
        .style("stroke-width",0.1)
        .style("fill","steelblue")
}