class Bar_chart2{
    constructor(config,data){
        this.config = {
            parent: config.parent,
            width: config.width,
            height: config.height,
            margin: config.margin,
            xlabel: config.xlabel,
            ylabel: config.ylabel,
            cscale: config.cscale,
            area:config.area
        };
        this.data = data;
        this.init();
    }
    init(){
        let self = this;

        self.svg = d3.select(self.config.parent)
            .attr("width",self.config.width)
            .attr("height",self.config.height)
        self.chart = self.svg.append("g")
            .attr("id","bar_chart2")
            .attr("transform",`translate(${self.config.margin.left},${self.config.margin.top})`)
        
        self.inner_width = self.config.width-self.config.margin.left-self.config.margin.right;
        self.inner_height= self.config.height-self.config.margin.top-self.config.margin.bottom;

        self.xscale = d3.scaleBand()
            .domain(self.data.map(d=>d.prefecture))
            .range([0,self.inner_width])
            .paddingInner(0.2)
            .paddingOuter(0.1)
        
        self.yscale = d3.scaleLinear()
            .range([self.inner_height,0])

        self.xaxis = d3.axisBottom(self.xscale)
            .tickSize(1)

        self.yaxis = d3.axisLeft(self.yscale)
            .ticks(5)
            .tickSizeOuter(0);
        self.xaxis_group = self.chart.append("g")
            .attr("transform",`translate(0,${self.inner_height})`)
        self.yaxis_group = self.chart.append("g")
            .attr("transform",`translate(0,0)`)
    }
    update(){
        let self = this;
        const ymin = 0;
        const ymax = d3.max(self.data,d=>d.gdp);
        self.yscale.domain([ymin,ymax])
        self.render()
    }
    render(){
        let self = this;

        self.chart.selectAll("bar2")
            .data(self.data)
            .join("rect")
            .attr("class","bar2")
            .attr("x",d=>self.xscale(d.prefecture))
            .attr("y",d=>self.yscale(d.gdp))
            .attr("width",self.xscale.bandwidth())
            .attr("height",d=>self.inner_height-self.yscale(d.gdp))
            .attr("fill","steelblue")
            /*.on("click",function(ev,d){
                const is_active = filter.includes(d[0]);
                if(is_active){
                    filter = filter.filter(f=>f!==d[0]);
                }
                else{
                    filter.push(d[0]);
                }
                Filter();
                d3.select(this).classed("active",!is_active);
            });*/

        d3.select("#bar_chart2").append("text")
            .attr("x",self.inner_width*0.4)
            .attr("y",self.inner_height+self.config.margin.bottom)
            .text(self.config.xlabel)
        self.svg.append("text")
            .attr("transform","rotate(-90)")
            .attr("x",-self.config.height*0.5)
            .attr("y",self.config.margin.left*0.5)
            .text(self.config.ylabel)
    
        self.xaxis_group.call(self.xaxis);
        self.yaxis_group.call(self.yaxis);

    }
}