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
        self.inner_height= self.config.height-self.config.maring.top-self.config.margin.bottom

        self.svg = d3.select(self.config.paretnt)
            .attr("width",self.inner_width)
            .attr("height",self.inner_height)

        self.title = self.svg.append("text")
            .attr("x",self.inner_width*0.5)
            .attr("y",self.config.margin.top*0.5)
            .attr("font-wight","bold")
            .attr("font-size","20px")
            .text("Line chart")

        self.chart = self.svg.append("g")
            .attr("id","chart")
            .attr("transform",`translate(${self.config.margin.left},${self.config.margin.top})`)
        
        self.xscale = d3.scaleLinear()
            .range(0,self.inner_width)
        self.xaxis = d3.axisBottom(self.xscale)
            .ticks(10)
        self.xaxis_group = self.chart.append("g")
            .attr("id","x-axis")
            .attr("transform",`translate(${self.config.padding.left},${self.inner_height})`)

        self.yscale = d3.scaleLinear()
            .range(0,self.inner_height)
        self.yaxis = d3.axisLeft(self.yscale)
            .ticks(10)
        self.yaxis_group = self.chart.append("g")
            .attr("id","y-axis")
            .attr("transform",`translate(${self.config.padding.left},0)`)
    }
    update(){
        let self = this;
        const xmin = d3.min(self.data,d=>d.x)
        const xmax = d3.max(self.data,d=>d.x)
        self.xscale.domain([xmin,xmax])
        const ymin = d3.min(self.data,d=>d.y)
        const ymax = d3.max(self.data,d=>d.y)
        self.xscale.domain([ymin,ymax])
        self.render()
    }
    render(){
        let self = this;

        self.chart.selectAll("path")
            .data(self.data)
            .enter()
            .append("path")
            .attr("d",d=>d3.line().x(d=>d.x).y(d=>d.y))
            .attr("stroke","black")
            .attr("fill","none")
    }
}