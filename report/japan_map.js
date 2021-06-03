class draw_map{
    constructor(config){
        this.config = {
            parent:config.parent,
            width:config.width,
            height:config.height,
            maring:config.margin,
            cscale:config.cscale
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
         
    }
}