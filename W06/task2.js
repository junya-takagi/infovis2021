d3.csv("https://junya-takagi.github.io/infovis2021/W06/data.csv")
    .then(data=>{
        data.forEach(d=>{
            d.x=+d.x;
            d.y=+d.y;
        });
        var config = {
            parent:"#drawing_region",
            width:512,
            height:512,
            margin:{top:50,right:10,bottom:80,left:80},
            padding:{bottom:20,left:20}
        };
        const scatter_plot = new ScatterPlot(config,data)
        scatter_plot.update();
    })
    .catch(error=>{
        console.log(error)
    })

class ScatterPlot{
    constructor(config,data){
        this.config = {
            parent:config.parent,
            width:config.width||512,
            height:config.height||512,
            margin:config.margin||{top:10,right:10,bottom:50,left:50},
            padding:config.padding||{bottom:20,left:20}
        }
        this.data = data;
        this.init()
    }
    init(){
        let self = this;
        
        self.inner_width = self.config.width-self.config.margin.left-self.config.margin.right
        self.inner_height = self.config.height-self.config.margin.top-self.config.margin.bottom

        self.svg = d3.select(self.config.parent)
            .attr("width",self.config.width)
            .attr("height",self.config.height);
        
        self.title = self.svg.append("text")
            .attr("id","title")
            .attr("x",self.inner_width*0.5)
            .attr("y",self.config.margin.top*0.5)
            .attr("font-weight","bold")
            .attr("font-size",20)
            .text("Scatter Plot")
        
        d3.select(self.config.parent).append("text").attr("color","black").text("Scatter Plot")        
        self.chart = self.svg.append("g")
            .attr("id","chart")
            .attr("transform",`translate(${self.config.margin.left},${self.config.margin.top})`);
        
        
        self.xscale = d3.scaleLinear()
            .range([0,self.inner_width])
        self.xaxis = d3.axisBottom(self.xscale)
            .ticks(12);
        self.xaxis_group = self.chart.append("g")
            .attr("transform",`translate(0,${self.inner_height})`)
        
        self.yscale = d3.scaleLinear()
            .range([self.inner_height,0])
        self.yaxis = d3.axisLeft(self.yscale)
            .ticks(6);
        self.yaxis_group = self.chart.append("g")
            .attr("transform",`translate(0,0)`)
    }
    update(){
        let self = this;

        const xmin = d3.min(self.data,d=>d.x);
        const xmax = d3.max(self.data,d=>d.x);
        self.xscale.domain([xmin-self.config.padding.left,xmax]);

        const ymin = d3.min(self.data,d=>d.y);
        const ymax = d3.max(self.data,d=>d.y);
        self.yscale.domain([ymin-self.config.padding.bottom,ymax]);

        self.render();

    }
    render(){
        let self = this;

        self.chart.selectAll("circle")
            .data(self.data)
            .enter()
            .append("circle")
            .attr("cx",d=>self.xscale(d.x))
            .attr("cy",d=>self.yscale(d.y))
            .attr("r",d=>d.r);
        
        self.xaxis_group
            .call(self.xaxis)
            .append("text")
            .attr("x",self.inner_width*0.5)
            .attr("y",40)
            .attr("fill","black")
            .attr("font-size","20px")
            .attr("font-wight","bold")
            .text("X label")
        self.yaxis_group
            .call(self.yaxis)
            .append("text")
            .attr("x",-self.inner_height*0.5)
            .attr("y",-40)
            .attr("transform","rotate(-90)")
            .attr("fill","black")
            .attr("font-size","20px")
            .attr("font-wight","bold")
            .text("Y label")
    }
}
