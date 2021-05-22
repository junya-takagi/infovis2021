
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
            ylabel:config.ylabel
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
                .attr("x",self.inner_width*0.5)
                .attr("y",self.config.margin.top*0.5)
                .attr("font-size",20)
                .attr("font-weight","bold")
                .text(self.config.title)
        
        self.chart = self.svg.append("g")
            .attr("width",self.inner_width)
            .attr("height",self.inner_height)
            .attr("transform",`translate(${self.config.margin.left},${self.config.margin.top})`)
        
        self.xscale = d3.scaleLinear().range([0,self.inner_width])
        self.xaxis = d3.axisBottom(self.xscale).ticks(8)
        self.xaxis_group = self.chart.append("g")
                .attr("transform",`translate(0,${self.inner_height})`)

        self.yscale = d3.scaleLinear()
            .range([self.inner_height,0])
        self.yaxis = d3.axisLeft(self.yscale).ticks(8)
        self.yaxis_group = self.chart.append("g")
            .attr("transform",`translate(0,0)`)
    }
    update(){
        let self = this;
        var ymin = d3.min(self.data,d=>d.y)
        var xmin = d3.min(self.data,d=>d.x)
        var ymax = d3.max(self.data,d=>d.y)
        var xmax = d3.max(self.data,d=>d.x)
        self.xscale.domain([xmin-self.config.label_space,xmax])
        self.yscale.domain([ymin-self.config.label_space,ymax])
        self.render()
    }
    render(){
        let self = this;
        self.chart.selectAll("circle")
            .data(self.data)
            .enter()
            .append("circle")
            .attr("cx",d=>self.xscale(d.x))
            .attr("cy",d=>self.yscale(d.y))
            .attr("r","10px")
            .attr("fill","black")

        self.svg.append("text")
            .attr("x",self.inner_width*0.5+self.config.margin.left)
            .attr("y",self.config.height-20)
            .text(self.config.xlabel)

        self.svg.append("text")
            .attr("transform","rotate(-90)")
            .attr("x",-self.config.height*0.5)
            .attr("y",self.config.margin.left*0.5)
            .attr('text-anchor', 'middle')
            .text(self.config.ylabel)

        self.xaxis_group.call(self.xaxis)
        self.yaxis_group.call(self.yaxis)
    }
}