d3.csv("https://junya-takagi.github.io/infovis2021/W08/data3.csv")
    .then(data=>{
        data.forEach(d=>{
            d.value = Number(d.value)
            d.color = d.color
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
            .innerRadius(20)
            .outerRadius(self.config.width/3)
        self.text= d3.arc()
            .innerRadius(0)
            .outerRadius(self.config.width/2.5)

    }
    update(){
        let self = this;
        self.render()
    }
    render(){
        let self = this;
        
        var piegroup = 
        self.chart.selectAll(".pie")
            .data(self.pie(self.data))
            .enter()
            .append("g")
            .attr("class","pie")
            .attr("fill",d=>d.data.color)

        piegroup.append("path")
            .attr("d",self.arc)
            .attr("stroke","white")

        piegroup.append("text")
            .attr("fill","black")
            .attr("transform",function(d){
                return "translate("+self.text.centroid(d)+")";
            })
            .attr("font","3px")
            .attr("text-anchor","middle")
            .text(d=>d.data.label)
    }
}