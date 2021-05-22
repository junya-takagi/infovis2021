class Bar_chart{
    constructor(config,data){
        this.config = {
            parent:config.parent,
            width:config.width,
            height:config.height,
            margin:config.margin,
            padding:config.padding,
            title:config.title
        }
        this.data = data;
        this.init()
    }
    init(){
        let self = this;
        self.inner_width = self.config.width-self.config.margin.left-self.config.margin.right;
        self.inner_height= self.config.height-self.config.margin.top-self.config.margin.bottom;

        self.svg = d3.select(self.config.parent)
                    .attr("width",self.config.width)
                    .attr("height",self.config.height)

        self.title=self.svg.append("text")
            .attr("x",self.inner_width*0.5).attr("y",self.config.margin.top)
            .attr("font-weight","bold")
            .attr("font-size",20)
            .text(self.config.title)

        self.chart = self.svg.append("g")
            .attr("id","chart")
            .attr("width",self.inner_width)
            .attr("height",self.inner_height)
            .attr("transform",`translate(${self.config.margin.left},${self.config.margin.top})`)

        self.xscale = d3.scaleLinear()
            .range([0,self.inner_width])
        self.xaxis = d3.axisBottom(self.xscale)
            .ticks(8)
        self.xaxis_group = self.chart.append("g")
            .attr("transform",`translate(${self.config.padding.left},${self.inner_height-self.config.padding.bottom})`)
        
        self.yscale = d3.scaleBand()
            .domain(self.data.map(d=>d.label))
            .range([0,self.inner_height-self.config.padding.bottom])
            .paddingInner(0.1)
            .paddingOuter(0.2)
        self.yaxis = d3.axisLeft(self.yscale)
        self.yaxis_group = self.chart.append("g")
            .attr("transform",`translate(${self.config.padding.left},0)`)
        
    }
    update(){
        let self = this;
        var xmax = d3.max(self.data,d=>d.value)
        self.xscale.domain([0,xmax])
        self.render()
    }
    render(){
        let self = this;
        self.chart.selectAll("rect")
            .data(self.data)
            .enter()
            .append("rect")
            .attr("x",d=>self.config.padding.left)
            .attr("y",d=>self.yscale(d.label))
            .attr("width",d=>self.xscale(d.value))
            .attr("height",self.yscale.bandwidth())
            .attr("fill","green")
        self.xaxis_group.call(self.xaxis)
        self.svg
            .append("text")
            .attr("x",self.config.width*0.5)
            .attr("y",self.config.height-10)
            .text("value")
            .attr("font-weight","bold")
            .attr("font-size","15px")
        self.yaxis_group.call(self.yaxis)
    }
    reverse(data){
        let self = this;
        self.yscale.domain(data.map(d=>d.label))
        d3.selectAll("rect")
            .data(data)
            .join("rect")
            .transition().duration(1000)
            .attr("x",d=>self.config.padding.left)
            .attr("y",d=>self.yscale(d.label))
            .attr("width",d=>self.xscale(d.value))
            .attr("height",self.yscale.bandwidth())
            .attr("fill","green")
        self.yaxis_group.call(self.yaxis)
    }
    sort(data){
        let self = this;
        self.yscale.domain(data.map(d=>d.label))
        d3.selectAll("rect")
            .data(data)
            .join("rect")
            .transition().duration(1000)
            .attr("x",d=>self.config.padding.left)
            .attr("y",d=>self.yscale(d.label))
            .attr("width",d=>self.xscale(d.value))
            .attr("height",self.yscale.bandwidth())
            .attr("fill",function(d){
                return "rgb(0,"+self.xscale(d.value)+",0)"
            })
        self.yaxis_group.call(self.yaxis)
    }
}