d3.csv("https://junya-takagi.github.io/infovis2021/W08/data2.csv")
    .then(data=>{
        data.forEach(d=>{
            d.x = Number(d.x)
            d.y = Number(d.y)
        });
        var config = {
            parent:"#drawing_redion",
            width:512,
            height:512,
            margin:{top:30,right:10,bottom:10,left:50},
            padding:{bottom:20,left:20}
        };
        const line_chart = new Line_chart(config,data)
        line_chart.update()
    })
    .catch(error=>{
        console.log(error)
    })

class Line_chart{
    constructor(config,data){
        this.config = {
            parent:config.parent,
            width:config.width,
            height:config.height,
            margin:config.margin,
            padding:config.padding
        }
        this.data = data;
        this.init()
    }
    init(){
        let self = this;
        self.inner_width = self.config.width-self.config.margin.left-self.config.margin.right
        self.inner_height= self.config.height-self.config.margin.top-self.config.margin.bottom
        console.log(self.inner_width,self.config.width)

        self.svg = d3.select(self.config.parent)
            .attr("width",self.config.width)
            .attr("height",self.config.height)

        self.title = self.svg.append("text")
            .attr("x",self.inner_width*0.5)
            .attr("y",self.config.margin.top*0.5)
            .attr("font-wight","bold")
            .attr("font-size","20px")
            .text("Line chart")

        self.chart = self.svg.append("g")
            .attr("id","chart")
            .attr("width",self.inner_width-self.config.padding.left)
            .attr("height",self.inner_height-self.config.padding.bottom)
            .attr("transform",`translate(${self.config.margin.left},${self.config.margin.top})`)
        
        self.xscale = d3.scaleLinear()
            .range([self.config.padding.left,self.inner_width])
        self.xaxis = d3.axisBottom(self.xscale)
            .ticks(10)
        self.xaxis_group = self.chart.append("g")
            .attr("id","x-axis")
            .attr("transform",`translate(0,${self.inner_height-self.config.padding.bottom})`)

        self.yscale = d3.scaleLinear()
            .range([self.inner_height-self.config.padding.bottom,0])
        self.yaxis = d3.axisLeft(self.yscale)
            .ticks(10)
        self.yaxis_group = self.chart.append("g")
            .attr("id","y-axis")
            .attr("transform",`translate(${self.config.padding.left},0)`)
        self.area = d3.area()
            .x(d=>self.xscale(d.x))
            .y1(d=>self.yscale(d.y))
            .y0(d=>self.yscale(0))
    }
    update(){
        let self = this;
        const xmin = d3.min(self.data,d=>d.x)
        const xmax = d3.max(self.data,d=>d.x)
        self.xscale.domain([0,xmax])
        const ymin = d3.min(self.data,d=>d.y)
        const ymax = d3.max(self.data,d=>d.y)
        self.yscale.domain([0,ymax])
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
            .attr("r","5px")
            .attr("fill","black")

        self.chart.selectAll("path")
            .data(self.data)
            .enter()
            .append("path")
            .attr("d",self.area(self.data))
            .attr("stroke","red")
            .attr("fill","blue")
        self.xaxis_group
            .call(self.xaxis)
        self.yaxis_group
            .call(self.yaxis)
    }
}