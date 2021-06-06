class Scatter_plot{
    constructor(config,data){
        this.config = {
            parent:config.parent,
            width:config.width,
            height:config.height,
            margin:config.margin,
            label_space:config.label_space,
            title:config.title,
            xlabel:config.xlabel,
            ylabel:config.ylabel,
            cscale:config.cscale
        };
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
        
        self.title = self.svg.append("text")
                .attr("x",self.inner_width*0.35)
                .attr("y",self.config.margin.top*0.5)
                .attr("font-size",20)
                .attr("font-weight","bold")
                .text(self.config.title)
        
        self.chart = self.svg.append("g")
            .attr("id","scatter_plot")
            .attr("width",self.inner_width)
            .attr("height",self.inner_height)
            .attr("transform",`translate(${self.config.margin.left},${self.config.margin.top})`)
        
        self.xscale = d3.scaleLinear().range([0,self.inner_width])
        self.xaxis = d3.axisBottom(self.xscale).ticks(8).tickSize(5).tickPadding(5);
        self.xaxis_group = self.chart.append("g")
                .attr("transform",`translate(0,${self.inner_height})`)

        self.yscale = d3.scaleLinear()
            .range([self.inner_height,0])
        self.yaxis = d3.axisLeft(self.yscale).ticks(8).tickSize(5).tickPadding(5);
        self.yaxis_group = self.chart.append("g")
            .attr("transform",`translate(0,0)`)
        
        self.cvalue = d=>d.area
        var ymin = d3.min(self.data,d=>d.aging_rate)
        var xmin = d3.min(self.data,d=>d.gdp)
        var ymax = d3.max(self.data,d=>d.aging_rate)
        var xmax = d3.max(self.data,d=>d.gdp)
        self.xscale.domain([0,xmax])
        self.yscale.domain([ymin-2,ymax])
        self.label_space = 30
    }
    update(){
        let self = this;
        self.render()
    }
    render(){
        let self = this;
        let circles = self.chart.selectAll("circle")
            .data(self.data)
            .join("circle")
        circles
            .attr("cx",d=>self.xscale(d.gdp))
            .attr("cy",d=>self.yscale(d.aging_rate))
            .attr("r","7px")
            .attr("id",d=>d.prefecture)
            .attr("fill",d=>self.config.cscale(self.cvalue(d)))
            .style("opacity",0.75)
        d3.select("#scatter_plot").append("text")
            .attr("x",self.inner_width*0.35)
            .attr("y",self.inner_height+self.config.margin.bottom+self.label_space)
            .text(self.config.xlabel)

        self.svg.append("text")
            .attr("transform","rotate(-90)")
            .attr("x",-self.config.height*0.5)
            .attr("y",self.config.margin.left*0.5)
            .attr('text-anchor', 'middle')
            .text(self.config.ylabel)

        self.xaxis_group.call(self.xaxis)
        self.yaxis_group.call(self.yaxis)

        d3.selectAll("circle")
            .on("mouseover",(e,d)=>{
                d3.select("#tooltip")
                    .style("opacity",1)
                    .html(`<div class="tooltip-label"></div>(${d.prefecture},${d.gdp+"兆円"},${d.aging_rate+"%"})`);
            })
            .on("mousemove",(e)=>{
                const padding=10;
                d3.select("#tooltip")
                    .style("left",(e.pageX+padding)+"px")
                    .style("top",(e.pageY+padding)+"px")
            })
            .on("mouseout",()=>{
                d3.select("#tooltip")
                    .style("opacity",0)
            })
    }
    show(id){
        var obj = d3.select("#scatter_plot").select(id)
        obj.transition().duration(1000).attr("r","20px");
    }
    close(id){
        let self = this
        var  obj = d3.select("#scatter_plot").select(id)
        obj.transition().duration(1000).attr("r","7px")
    }
}