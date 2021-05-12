d3.csv("https://junya-takagi.github.io/infovis2021/W08/data.csv")
    .then(data=>{
        data.forEach(d=>{
            d.value = Number(d.value)
        });
        var config = {
            parent:"#drawing_redion",
            width:512,
            height:256,
            margin:{top:30,right:10,bottom:10,left:50},
            padding:{bottom:20,left:20}
        };
        const bar_chart = new Bar_chart(config,data)
        bar_chart.update()
    })
    .catch(error=>{
        console.log(error)
    })

class Bar_chart{
    constructor(config,data){
        this.config = {
            parent:config.parent,
            width:config.width||512,
            height:config.height||256,
            margin:config.margin||{top:30,right:10,bottom:10,left:50},
            padding:config.padding||{bottom:20,left:20}
        }
        this.data = data;
        this.init()
    }
    init(){
        let self = this;
        self.inner_width = self.config.width-self.config.margin.left-self.config.margin.right
        self.inner_height= self.config.height-self.config.margin.top-self.config.margin.bottom

        self.svg = d3.select(self.config.parent)
            .attr("width",self.config.width)
            .attr("height",self.config.height)

        self.title = self.svg.append("text")
            .attr("id","title")
            .attr("x",self.inner_width*0.5)
            .attr("y",self.config.margin.top*0.5)
            .attr("font-wight","bold")
            .attr("font-size",20)
            .text("Bar chart")
        
        self.chart = self.svg.append("g")
            .attr("id","chart")
            .attr("transform",`translate(${self.config.margin.left},${self.config.margin.top})`)

        self.xscale = d3.scaleLinear()
            .range([0,self.inner_width]);
        self.xaxis = d3.axisBottom(self.xscale)
            .ticks(10);
        self.xaxis_group = self.chart.append("g")
            .attr("transform",`translate(${self.config.padding.left*2},${self.inner_height-self.config.padding.bottom*2.0})`)
        
        self.yscale = d3.scaleBand()
            .domain(self.data.map(d=>d.label))
            .range([0,self.inner_height-self.config.padding.bottom*2])
            .paddingInner(0.1);
        self.yaxis = d3.axisLeft(self.yscale)
        self.yaxis_group = self.chart.append("g")
            .attr("id","yaxis")
            .attr("transform",`translate(${self.config.padding.left*2},0)`)
    }
    update(){
        let self = this;
        const xmax = d3.max(self.data,d=>d.value)
        console.log(self.data)
        self.xscale.domain([0,xmax]);
        self.render()
    }
    render(){
        let self = this;

        self.chart.selectAll("rect")
            .data(self.data)
            .enter()
            .append("rect")
            .attr("x",self.config.padding.left*2)
            .attr("y",d=>self.yscale(d.label))
            .attr("width",d=>self.xscale(d.value))
            .attr("height",self.yscale.bandwidth())
            .attr("fill","green")
        self.xaxis_group
            .call(self.xaxis)
        self.chart.append("text")
            .attr("x",self.inner_width*0.5)
            .attr("y",self.inner_height)
            .attr("fill","black")
            .attr("font-size","20px")
            .text("price")
        self.yaxis_group
            .call(self.yaxis)
        self.chart.append("text")
            .attr("x",-self.inner_height*0.5)
            .attr("y",-30)
            .attr("transform","rotate(-90)")
            .attr("fill","black")
            .attr("font-size","20px")
            .text("goods")
    }
}