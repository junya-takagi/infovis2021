class draw_map{
    constructor(config,data){
        this.config = {
            parent:config.parent,
            width:config.width,
            height:config.height,
            margin:config.margin,
            scale:config.scale,
            cscale:config.cscale,
            area:config.areas
        }
        this.data = data;
        this.init();
    }
    init(){
        let self = this;
        self.inner_width = self.config.width-self.config.margin.left-self.config.margin.right;
        self.inner_height= self.config.height-self.config.margin.top-self.config.margin.bottom;
        self.svg = d3.select(self.config.parent)
            .attr("width",self.config.width)
            .attr("height",self.config.height)
        self.japan_map = self.svg.append("g")
            .attr("width",self.inner_width)
            .attr("height",self.inner_height)
            .attr("transform",`translate(0,${self.config.margin.top})`)
        self.projection = d3.geoMercator()
            .center([136.0,35.6])
            .translate([self.config.width*0.5,self.config.height*0.5])
            .scale(self.config.scale)
        self.svg.append("text")
            .attr("x",self.config.width*0.5)
            .attr("y",self.config.height-5)
            .text("Japan Map Made with Natural Earth.")
        self.geoPath = d3.geoPath().projection(self.projection);
        self.pref = []
    }
    update(){
        let self = this;
        self.render()
    }
    render(){
        let self = this;
        let pathes = self.japan_map.selectAll("path")
            .data(self.data.features)
            .join("path") 
        pathes
            .attr("d",self.geoPath)
            .attr("class","map")
            .attr("id",d=>d.properties.name_local)
            .style("stroke","white")
            .style("stroke-width",0.2)
            .style("fill",d=>self.config.cscale(d.properties.region))
            .on("click",function(ev,d){
                if(self.pref.length==0){
                    self.pref.push(d.properties.name_local)
                    d3.select(this).style("fill","yellow")
                    d3.select(this).style("stroke","black")
                }else{
                    if(self.pref[0]==d.properties.name_local){
                        self.pref.pop()
                        d3.select(this).style("fill",d=>self.config.cscale(d.properties.region))
                        d3.select(this).style("stroke","white")
                    }else{
                        console.log(d3.select("path#"+self.pref[0]))
                        d3.select("path#"+self.pref[0]).style("fill",d=>self.config.cscale(d.properties.region))
                        d3.select("path#"+self.pref[0]).style("stroke","white")
                        self.pref.pop()
                        d3.select(this).style("fill","yellow")
                        d3.select(this).select("stroke","black")
                        self.pref.push(d.properties.name_local)
                    }
                }
                Filter("#"+d.properties.name_local)
            })
        
        var zoom = d3.zoom()
        .scaleExtent([1,2.5])
        .on('zoom', function(e){
            self.projection.scale(self.config.scale * e.transform.k);
            pathes.attr("d",self.geoPath)
            const {transform} = e;
            self.japan_map.attr("transform",transform)
        });
        self.svg.call(zoom);


        d3.selectAll(".map")
            .on("mouseover",(e,d)=>{
                d3.select("#tooltip_map")
                    .style("opacity",1)
                    .style("color","black")
                    .html(`<div class="tooltip-label_map"></div>${d.properties.region},${d.properties.name_local}`);
            })
            .on("mousemove",(e)=>{
                const padding=10;
                d3.select("#tooltip_map")
                    .style("left",(e.pageX+padding)+"px")
                    .style("top",(e.pageY+padding)+"px")
            })
            .on("mouseout",()=>{
                d3.select("#tooltip_map")
                    .style("opacity",0)
                d3.selectAll(".map")
                    .style("opacity",1)
            })
    }
}