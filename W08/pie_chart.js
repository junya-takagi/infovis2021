d3.csv("https://junya-takagi.github.io/infovis2021/W08/data3.csv")
    .then(data=>{
        data.forEach(d=>{
            d.value = Number(d.value)
        });
        var config = {
            parent:"#drawing_redion",
            width:256,
            height:256,
            margin:{top:30,right:10,bottom:10,left:50},
            padding:{bottom:20,left:20}
        };
        const pie_chart = new Pie_chart(config,data)
        pie_chart.update()
    })
    .catch(error=>{
        console.log(error)
    })

class Pie_chart{
    constructor(config,data){
        this.config = {
            parent:config.parent,
            width:config.width,
            height:config.height,
            margin:config.margin,
            padding:config.padding
        }
        this.data = data;
        this.init();
    }
    init(){
        let self = this;
        self.inner_width = self.config.width-self.config.margin.left-self.config.margin.right
        self.inner_height= self.config.height-self.config.margin.bottom-self.config.margin.top 

        self.svg = d3.select(self.config.parent)
            .attr("width",self.config.width)
            .attr("height",self.config.height)
        
        self.title = self.svg.append("text")
            .attr("id","title")
            .attr("x",self.inner_width*0.5)
            .attr("y",self.config.padding.bottom)
            .attr("font-size",20)
            .attr("font-weight","bold")
            .text("Pie chart")
        
        self.chart = self.svg.append("g")
            .attr("id","chart")
            .attr("width",self.inner_width)
            .attr("height",self.inner_width)
            .attr("transform",`translate(${self.config.width/2},${self.config.height/2})`)
        
        self.pie = d3.pie()
            .value(d=>d.value)
        
        self.arc = d3.arc()
            .innerRadius(self.config.width/8)
            .outerRadius(self.config.width/3)

        self.text = d3.arc()
        .innerRadius(self.config.width/8)
        .outerRadius(self.config.width/3)

    }
    update(){
        let self = this;
        self.render()
    }
    render(){
        let self = this;
        
        self.chart.selectAll("pie")
            .data(self.pie(self.data))
            .enter()
            .append("path")
            .attr("id","srice")
            .attr("d",self.arc)
            .attr("stroke","white")
            .attr("stroke-width","2px")
            .attr("fill",d=>self.data.color)

        self.chart.selectAll("pie")
            .data(self.data.label)
            .enter()
            .append('text')
            .text(d => d)
            .attr("transform",d=>`translate(${self.arc.centroid(d)})})`)
            .style("text-anchor", "middle")
            .style("font-size", 5);
    }
}