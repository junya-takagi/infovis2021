class draw_map{
    constructor(config,data){
        this.config = {
            parent:config.parent,
            width:config.width,
            height:config.height,
            maring:config.margin,
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
            .attr("id","japan_map")
            .attr("width",self.config.weight)
            .attr("height",self.config.height)

        self.projection = d3.geoMercator()
            .center([136.0,35.6])
            .translate([self.inner_width*0.5,self.inner_height*0.5])
            .scale(scale)

        self.geoPath = d3.geoPath().projection(projection);
    }
    update(){
        let self = this;
        self.render()
    }
    render(){
        let self = this;
        self.japan_map.selectAll("path")
            .data(japan.features)
            .join()
            .append("path")
            .attr("d",self.geoPath)
            .attr("id",d=>d.properties.name_local)
            .style("stroke","#ffffff")
            .style("stroke-width",0.1)
            .style("fill",d=>self.coloer_scale(d.properties.region))
    }
}